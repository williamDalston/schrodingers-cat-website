import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

const progressSchema = z.object({
  email: z.string().email(),
  curiosities_read: z.number().optional(),
  puzzles_completed: z.number().optional(),
  total_points: z.number().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('email', email)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // No row found - return empty progress
        return NextResponse.json({
          success: true,
          data: {
            email,
            curiosities_read: 0,
            puzzles_completed: 0,
            total_points: 0,
            achievements: null,
          },
        })
      }

      console.error('Error fetching progress:', error)
      return NextResponse.json(
        { error: 'Failed to fetch progress' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error('Progress fetch error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = progressSchema.safeParse(body)

    if (!validation.success) {
      const firstIssue = validation.error.issues[0]
      return NextResponse.json(
        { error: firstIssue?.message || 'Invalid request data' },
        { status: 400 }
      )
    }

    const { email, curiosities_read, puzzles_completed, total_points } = validation.data

    // Upsert progress
    const { data: progress, error } = await supabase
      .from('user_progress')
      .upsert({
        email,
        curiosities_read,
        puzzles_completed,
        total_points,
        last_activity: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error('Error updating progress:', error)
      return NextResponse.json(
        { error: 'Failed to update progress' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Progress updated successfully',
      data: progress,
    })
  } catch (error) {
    console.error('Progress update error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

