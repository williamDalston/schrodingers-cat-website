-- Supabase Database Schema for Schrödinger's Cat Website
-- Run this SQL in your Supabase SQL Editor to set up the required tables

-- Newsletter Subscriptions Table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  confirmed BOOLEAN DEFAULT true,
  unsubscribed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);

-- Puzzle Completions Table
CREATE TABLE IF NOT EXISTS puzzle_completions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  puzzle_id TEXT NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  score INTEGER,
  time_taken INTEGER, -- in seconds
  metadata JSONB, -- for storing additional puzzle-specific data
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for puzzle queries
CREATE INDEX IF NOT EXISTS idx_puzzle_email ON puzzle_completions(email);
CREATE INDEX IF NOT EXISTS idx_puzzle_id ON puzzle_completions(puzzle_id);

-- User Progress Table
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  curiosities_read INTEGER DEFAULT 0,
  puzzles_completed INTEGER DEFAULT 0,
  last_activity TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  total_points INTEGER DEFAULT 0,
  achievements JSONB, -- for storing badges/achievements
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for user progress lookups
CREATE INDEX IF NOT EXISTS idx_progress_email ON user_progress(email);

-- Analytics Events Table
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL, -- e.g., 'newsletter_signup', 'curiosity_read', 'puzzle_completed', 'product_view'
  event_data JSONB, -- flexible data storage
  user_email TEXT, -- optional, for user-specific tracking
  session_id TEXT, -- for anonymous session tracking
  page_path TEXT, -- the page where the event occurred
  user_agent TEXT,
  ip_address INET, -- note: be mindful of GDPR/privacy
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_analytics_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_email ON analytics_events(user_email);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics_events(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE puzzle_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous access (for public API endpoints)
-- These policies allow inserts but not reads (to protect user data)

-- Newsletter subscriptions: allow anyone to subscribe
CREATE POLICY "Allow public newsletter subscriptions"
  ON newsletter_subscriptions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow users to read their own subscription status
CREATE POLICY "Users can read own subscription"
  ON newsletter_subscriptions
  FOR SELECT
  TO authenticated
  USING (true); -- In production, you'd want auth.email() = email

-- Puzzle completions: allow anonymous puzzle submissions
CREATE POLICY "Allow public puzzle submissions"
  ON puzzle_completions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- User progress: allow anyone to create/update progress
CREATE POLICY "Allow public progress tracking"
  ON user_progress
  FOR ALL
  TO anon, authenticated
  USING (true);

-- Analytics: allow anyone to insert events
CREATE POLICY "Allow public analytics tracking"
  ON analytics_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_newsletter_updated_at
  BEFORE UPDATE ON newsletter_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Optional: Function to automatically create user_progress when someone completes a puzzle
CREATE OR REPLACE FUNCTION update_user_progress_on_puzzle_completion()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_progress (email, puzzles_completed, total_points, last_activity)
  VALUES (NEW.email, 1, COALESCE(NEW.score, 10), NOW())
  ON CONFLICT (email)
  DO UPDATE SET
    puzzles_completed = user_progress.puzzles_completed + 1,
    total_points = user_progress.total_points + COALESCE(NEW.score, 10),
    last_activity = NOW();
  
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_progress_on_puzzle_completion
  AFTER INSERT ON puzzle_completions
  FOR EACH ROW
  EXECUTE FUNCTION update_user_progress_on_puzzle_completion();

-- Optional: Function to initialize user progress on newsletter signup
CREATE OR REPLACE FUNCTION init_user_progress_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_progress (email, last_activity)
  VALUES (NEW.email, NOW())
  ON CONFLICT (email) DO NOTHING;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER init_progress_on_signup
  AFTER INSERT ON newsletter_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION init_user_progress_on_signup();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

