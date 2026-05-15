// app/api/razorpay/webhook/route.ts
// Razorpay webhook handler — verifies signature, updates DB
// Webhook URL: https://msctutor.in/api/razorpay/webhook

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { logger } from '@/lib/logger'

export async function POST(req: NextRequest) {
  try {
    const body      = await req.text()
    const signature = req.headers.get('x-razorpay-signature') ?? ''
    const secret    = process.env.RAZORPAY_WEBHOOK_SECRET ?? ''

    if (!secret) {
      logger.error('RAZORPAY_WEBHOOK_SECRET not set')
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
    }

    // Verify signature
    const expected = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex')

    if (expected !== signature) {
      logger.warn('Razorpay webhook: invalid signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const event = JSON.parse(body)
    logger.info('Razorpay webhook received', { event: event.event })

    // Handle payment captured
    if (event.event === 'payment.captured') {
      const payment = event.payload?.payment?.entity
      const notes   = payment?.notes ?? {}
      const userId  = notes.userId as string | undefined
      const plan    = notes.plan   as string | undefined
      const credits = parseInt(notes.credits ?? '0', 10)

      if (userId && credits > 0) {
        await dbSafe(async () => {
          const { default: prisma } = await import('@/lib/prisma')
          return prisma.user.update({
            where: { firebaseUid: userId },
            data:  {
              credits: { increment: credits },
              plan:    plan ?? 'basic',
            },
          })
        })
        logger.info('Credits added via webhook', { userId, credits, plan })
      }
    }

    // Handle payment failed
    if (event.event === 'payment.failed') {
      const payment = event.payload?.payment?.entity
      logger.warn('Payment failed', { paymentId: payment?.id, reason: payment?.error_reason })
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (e) {
    logger.error('Razorpay webhook error', e)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function dbSafe<T>(op: () => Promise<T>): Promise<T | null> {
  try { return await op() } catch { return null }
}
