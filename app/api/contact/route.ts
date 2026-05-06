import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
    }
    // Send via Resend email (if configured)
    if (process.env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
        body: JSON.stringify({
          from:    process.env.EMAIL_FROM ?? 'noreply@msctutor.in',
          to:      ['contact@msctutor.in'],
          subject: `[MscTutor Contact] ${subject ?? 'New Message'} — ${name}`,
          text:    `From: ${name} <${email}>\n\n${message}`,
        }),
      })
    }
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
