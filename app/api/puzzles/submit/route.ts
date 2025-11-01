import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

const puzzleSchema = z.object({
  email: z.string().email().optional(),
  puzzle_id: z.string().min(1, 'Puzzle ID is required'),
  score: z.number().optional(),
  time_taken: z.number().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = puzzleSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || 'Invalid request data' },
        { status: 400 }
      )
    }

    const { email, puzzle_id, score, time_taken, metadata } = validation.data

    // Insert puzzle completion
    const { data: completion, error: insertError } = await supabase
      .from('puzzle_completions')
      .insert({
        email: email || null,
        puzzle_id,
        score: score || null,
        time_taken: time_taken || null,
        metadata: metadata || null,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error submitting puzzle:', insertError)
      return NextResponse.json(
        { error: 'Failed to submit puzzle' },
        { status: 500 }
      )
    }

    // Track analytics event
    try {
      await supabase.from('analytics_events').insert({
        event_type: 'puzzle_completed',
        event_data: { puzzle_id, score, time_taken },
        user_email: email || null,
        created_at: new Date().toISOString(),
      })
    } catch (analyticsError) {
      console.error('Error tracking analytics:', analyticsError)
      // Don't fail the submission if analytics fails
    }

    return NextResponse.json({
      success: true,
      message: 'Puzzle completed successfully!',
      data: completion,
    })
  } catch (error) {
    console.error('Puzzle submission error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const puzzleId = searchParams.get('puzzle_id')

    let query = supabase
      .from('puzzle_completions')
      .select('*')
      .order('completed_at', { ascending: false })

    if (email) {
      query = query.eq('email', email)
    }

    if (puzzleId) {
      query = query.eq('puzzle_id', puzzleId)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching puzzle completions:', error)
      return NextResponse.json(
        { error: 'Failed to fetch completions' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data,
      count: data?.length || 0,
    })
  } catch (error) {
    console.error('Puzzle fetch error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}

