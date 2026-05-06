// app/api/payment/razorpay/route.ts — Razorpay order create + verify

import { NextResponse } from 'next/server'
import Razorpay         from 'razorpay'
import crypto           from 'crypto'
import { prisma }       from '@/lib/prisma'
import { getAuthUser }  from '@/lib/auth'
import { PLANS }        from '@/lib/constants'

export const dynamic = 'force-dynamic'

function getRazorpayClient() {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    return null
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  })
}

// POST /api/payment/razorpay — create order
export async function POST(req: Request) {
  try {
    const razorpay = getRazorpayClient()
    if (!razorpay) {
      return NextResponse.json({ error: 'Razorpay is not configured yet' }, { status: 503 })
    }

    const user = await getAuthUser(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { plan } = await req.json()
    const planData = PLANS[plan as keyof typeof PLANS]
    if (!planData || planData.price === 0) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const order = await razorpay.orders.create({
      amount:   planData.price * 100, // paise
      currency: 'INR',
      receipt:  `rcpt_${user.uid}_${Date.now()}`,
      notes:    { uid: user.uid, plan },
    })

    return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency })
  } catch (err) {
    console.error('razorpay create error:', err)
    return NextResponse.json({ error: 'Payment initiation failed' }, { status: 500 })
  }
}

// PUT /api/payment/razorpay — verify payment
export async function PUT(req: Request) {
  try {
    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: 'Razorpay is not configured yet' }, { status: 503 })
    }

    const user = await getAuthUser(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = await req.json()

    const body      = razorpay_order_id + '|' + razorpay_payment_id
    const expected  = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET ?? '')
      .update(body)
      .digest('hex')

    if (expected !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const planData = PLANS[plan as keyof typeof PLANS]
    await prisma.user.update({
      where: { firebaseUid: user.uid },
      data:  { plan, credits: { increment: planData.credits } },
    })

    return NextResponse.json({ success: true, plan, credits: planData.credits })
  } catch (err) {
    console.error('razorpay verify error:', err)
    return NextResponse.json({ error: 'Payment verification failed' }, { status: 500 })
  }
}
