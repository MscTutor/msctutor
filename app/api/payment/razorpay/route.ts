// app/api/payment/razorpay/route.ts — Razorpay payment (India)

import { NextRequest }  from 'next/server'
import { ok, err, serverErr, requireAuth, parseBody, requireFields } from '@/lib/api-middleware'
import { logger }       from '@/lib/logger'

const PLAN_CREDITS: Record<string, { credits: number; amount: number; label: string }> = {
  starter: { credits: 100,  amount: 4900,  label: 'Starter Plan' },
  basic:   { credits: 300,  amount: 9900,  label: 'Basic Plan'   },
  pro:     { credits: 1500, amount: 29900, label: 'Pro Plan'     },
}

export async function POST(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req)
    if (response) return response

    const body = await parseBody(req)
    if (!body) return err('Invalid JSON')

    const missing = requireFields(body, ['plan'])
    if (missing) return err(missing)

    const plan = PLAN_CREDITS[String(body.plan)]
    if (!plan) return err('Invalid plan. Choose: starter, basic, or pro')

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      // Fallback: return demo order for testing
      logger.warn('Razorpay not configured — returning demo order')
      return ok({
        orderId:  'demo_order_' + Date.now(),
        amount:   plan.amount,
        currency: 'INR',
        keyId:    'demo_key',
        demo:     true,
        message:  'Demo mode: Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to enable real payments',
      })
    }

    const Razorpay = (await import('razorpay')).default
    const rzp      = new Razorpay({
      key_id:     process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const order = await rzp.orders.create({
      amount:   plan.amount,
      currency: 'INR',
      notes:    { userId: user!.uid, plan: body.plan as string, credits: String(plan.credits) },
    })

    logger.info('Razorpay order created', { orderId: order.id, plan: body.plan, userId: user!.uid })
    return ok({ orderId: order.id, amount: plan.amount, currency: 'INR', keyId: process.env.RAZORPAY_KEY_ID, plan: body.plan, credits: plan.credits, label: plan.label })
  } catch (e) { return serverErr(e, 'POST /api/payment/razorpay') }
}

export async function PUT(req: NextRequest) {
  // Payment verification after success
  try {
    const { user, response } = await requireAuth(req)
    if (response) return response

    const body = await parseBody(req)
    if (!body) return err('Invalid JSON')

    const missing = requireFields(body, ['orderId', 'paymentId', 'signature', 'plan'])
    if (missing) return err(missing)

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return err('Payment verification not configured', 500)
    }

    // Verify signature
    const crypto     = await import('crypto')
    const expected   = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${body.orderId}|${body.paymentId}`)
      .digest('hex')

    if (expected !== body.signature) {
      logger.warn('Invalid Razorpay signature', { userId: user!.uid })
      return err('Payment verification failed. Signature mismatch.', 400)
    }

    const plan = PLAN_CREDITS[String(body.plan)]
    if (!plan) return err('Invalid plan')

    // Add credits to user
    await dbSafe(async () => {
      const { default: prisma } = await import('@/lib/prisma')
      return prisma.user.update({
        where: { firebaseUid: user!.uid },
        data:  {
          credits:  { increment: plan.credits },
          plan:     String(body.plan),
        },
      })
    })

    logger.info('Payment verified and credits added', { userId: user!.uid, plan: body.plan, credits: plan.credits })
    return ok({ success: true, credits: plan.credits, plan: body.plan, message: `${plan.credits} credits added!` })
  } catch (e) { return serverErr(e, 'PUT /api/payment/razorpay') }
}

async function dbSafe<T>(op: () => Promise<T>): Promise<T | null> {
  try { return await op() } catch { return null }
}
