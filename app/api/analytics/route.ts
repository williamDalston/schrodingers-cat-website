import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event_type, event_data, user_email, page_path } = body

    if (!event_type) {
      return NextResponse.json(
        { error: 'event_type is required' },
        { status: 400 }
      )
    }

    // Get additional request metadata
    const userAgent = request.headers.get('user-agent') || null
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      null

    // Insert analytics event
    const { error } = await supabase
      .from('analytics_events')
      .insert({
        event_type,
        event_data: event_data || null,
        user_email: user_email || null,
        page_path: page_path || null,
        user_agent: userAgent,
        ip_address: ipAddress,
        created_at: new Date().toISOString(),
      })

    if (error) {
      console.error('Error tracking analytics:', error)
      return NextResponse.json(
        { error: 'Failed to track event' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Event tracked successfully',
    })
  } catch (error) {
    console.error('Analytics tracking error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const eventType = searchParams.get('event_type')
    const limit = parseInt(searchParams.get('limit') || '100')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase
      .from('analytics_events')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (eventType) {
      query = query.eq('event_type', eventType)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching analytics:', error)
      return NextResponse.json(
        { error: 'Failed to fetch analytics' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data,
      count: data?.length || 0,
    })
  } catch (error) {
    console.error('Analytics fetch error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}

