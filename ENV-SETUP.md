# Environment Variables Setup

Create a `.env.local` file in the project root with the following variables:

```bash
# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_optional_for_admin_operations

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Site Configuration
NEXT_PUBLIC_SITE_NAME="Schrödinger's Cat"
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Analytics (Google Analytics 4)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Payment Processing (FanBasis) - for future use
FANBASIS_API_KEY=your_fanbasis_api_key
FANBASIS_WEBHOOK_SECRET=your_webhook_secret

# PayPal (Backup) - for future use
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```

## Setup Instructions

### 1. Supabase Setup
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Copy your project URL and anon key
4. Run the SQL migration script in `lib/database-schema.sql` to create tables

### 2. Resend Setup
1. Go to [resend.com](https://resend.com) and create an account
2. Add and verify your domain (or use their test domain for development)
3. Create an API key
4. Use `onboarding@resend.dev` for development/testing

### 3. Google Analytics 4 Setup
1. Go to [analytics.google.com](https://analytics.google.com) and create a free account
2. Create a new GA4 property for your website
3. Copy your Measurement ID (starts with `G-`)
4. Add it to your `.env.local` as `NEXT_PUBLIC_GA_MEASUREMENT_ID`
5. The Analytics component will automatically track page views and custom events

### 4. Local Development
- Copy the environment variables to `.env.local`
- Run `npm run dev` to start the development server
- The application will connect to your Supabase database and Resend account
