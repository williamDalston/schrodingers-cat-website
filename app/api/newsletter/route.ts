import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Validation schema
const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const validation = newsletterSchema.safeParse(body)

    if (!validation.success) {
      const firstIssue = validation.error.issues[0]
      return NextResponse.json(
        { error: firstIssue?.message || 'Invalid request data' },
        { status: 400 }
      )
    }

    const { email, name } = validation.data

    // Check if email already exists in database
    const { data: existing } = await supabase
      .from('newsletter_subscriptions')
      .select('*')
      .eq('email', email)
      .single()

    if (existing && !existing.unsubscribed_at) {
      return NextResponse.json(
        { message: 'You are already subscribed!' },
        { status: 200 }
      )
    }

    // If they were previously subscribed and unsubscribed, update the record
    if (existing && existing.unsubscribed_at) {
      const { error: updateError } = await supabase
        .from('newsletter_subscriptions')
        .update({
          subscribed_at: new Date().toISOString(),
          confirmed: true,
          unsubscribed_at: null,
        })
        .eq('email', email)

      if (updateError) {
        console.error('Error updating subscription:', updateError)
        return NextResponse.json(
          { error: 'Failed to update subscription. Please try again.' },
          { status: 500 }
        )
      }
    } else {
      // Insert new subscription
      const { error: insertError } = await supabase
        .from('newsletter_subscriptions')
        .insert({
          email,
          name: name || null,
          subscribed_at: new Date().toISOString(),
          confirmed: true,
        })

      if (insertError) {
        console.error('Error inserting subscription:', insertError)
        return NextResponse.json(
          { error: 'Failed to subscribe. Please try again.' },
          { status: 500 }
        )
      }
    }

    // Send welcome email via Resend
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Schrödinger's Cat"

    // Send notification to admin when someone subscribes
    const adminEmail = 'faradaybach@gmail.com'
    
    try {
      if (resend) {
        // Send welcome email to subscriber
        await resend.emails.send({
          from: `${siteName} <${fromEmail}>`,
          to: email,
          subject: 'Welcome to Daily Curiosity! 🧪',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                }
                .header {
                  text-align: center;
                  padding: 30px 0;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  border-radius: 10px;
                  margin-bottom: 30px;
                }
                .header h1 {
                  color: white;
                  margin: 0;
                  font-size: 28px;
                }
                .content {
                  background: #f9fafb;
                  padding: 30px;
                  border-radius: 10px;
                  margin-bottom: 20px;
                }
                .button {
                  display: inline-block;
                  padding: 12px 30px;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  color: white;
                  text-decoration: none;
                  border-radius: 6px;
                  font-weight: 600;
                  margin: 20px 0;
                }
                .footer {
                  text-align: center;
                  padding-top: 20px;
                  font-size: 14px;
                  color: #666;
                }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>🧪 Welcome to Daily Curiosity!</h1>
              </div>
              <div class="content">
                ${name ? `<p><strong>Hi ${name}!</strong></p>` : '<p><strong>Hi there!</strong></p>'}
                <p>You're all set to receive your daily dose of fascinating science, thought experiments, and mind-bending paradoxes!</p>
                <p>Every day, we'll send you something curious, something beautiful, and something that might just make you see the world a little differently.</p>
                <p style="text-align: center;">
                  <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com'}" class="button">Start Exploring</a>
                </p>
                <p><strong>What's next?</strong></p>
                <ul>
                  <li>📖 Explore our paradox library</li>
                  <li>🧩 Try our weekly puzzles</li>
                  <li>🛍️ Browse beautiful science products</li>
                  <li>📧 Look for tomorrow's curiosity in your inbox</li>
                </ul>
              </div>
              <div class="footer">
                <p>Thank you for joining us on this curious journey!</p>
                <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com'}/newsletter/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe</a> | <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com'}">Visit Site</a></p>
              </div>
            </body>
          </html>
        `,
        })

        // Send notification to admin
        await resend.emails.send({
          from: `${siteName} <${fromEmail}>`,
          to: adminEmail,
          subject: '🎉 New Newsletter Subscription',
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                  }
                  .content {
                    background: #f9fafb;
                    padding: 30px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                  }
                  .info {
                    background: #e0f2fe;
                    padding: 15px;
                    border-radius: 6px;
                    margin: 15px 0;
                  }
                </style>
              </head>
              <body>
                <div class="content">
                  <h2>New Newsletter Subscriber! 🎉</h2>
                  <div class="info">
                    <p><strong>Email:</strong> ${email}</p>
                    ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
                    <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                  </div>
                  <p>Total subscribers are stored in the Supabase database.</p>
                </div>
              </body>
            </html>
          `,
        })
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      // Don't fail the subscription if email fails
    }

    // Track analytics event
    try {
      await supabase.from('analytics_events').insert({
        event_type: 'newsletter_signup',
        event_data: { email },
        user_email: email,
        created_at: new Date().toISOString(),
      })
    } catch (analyticsError) {
      console.error('Error tracking analytics:', analyticsError)
      // Don't fail the subscription if analytics fails
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed! Check your email for a welcome message.',
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    )
  }
}

// Optional: Unsubscribe endpoint
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Mark as unsubscribed
    const { error } = await supabase
      .from('newsletter_subscriptions')
      .update({ unsubscribed_at: new Date().toISOString() })
      .eq('email', email)

    if (error) {
      console.error('Error unsubscribing:', error)
      return NextResponse.json(
        { error: 'Failed to unsubscribe. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'You have been unsubscribed successfully.',
    })
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    )
  }
}
