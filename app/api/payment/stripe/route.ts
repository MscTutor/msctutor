// app/api/payment/stripe/route.ts — Stripe checkout session

import { NextResponse } from 'next/server'
import Stripe           from 'stripe'
import { prisma }       from '@/lib/prisma'
import { getAuthUser }  from '@/lib/auth'
import { PLANS, SITE }  from '@/lib/constants'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', { apiVersion: '2024-04-10' })

const STRIPE_PRICES: Record<string, number> = {
  starter: 49,
  basic:   99,
  pro:     299,
}

export async function POST(req: Request) {
  try {
    const user = await getAuthUser(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { plan } = await req.json()
    const amount   = STRIPE_PRICES[plan]
    if (!amount)   return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency:     'inr',
          unit_amount:  amount * 100,
          product_data: { name: `MscTutor ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan` },
        },
        quantity: 1,
      }],
      mode:        'payment',
      success_url: `${SITE.url}/dashboard/credits?success=1&plan=${plan}`,
      cancel_url:  `${SITE.url}/pricing?cancelled=1`,
      metadata:    { uid: user.uid, plan },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('stripe error:', err)
    return NextResponse.json({ error: 'Stripe session failed' }, { status: 500 })
  }
}

// Stripe webhook
export async function PUT(req: Request) {
  const body = await req.text()
  const sig  = req.headers.get('stripe-signature') ?? ''

  try {
    const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET ?? '')

    if (event.type === 'checkout.session.completed') {
      const session  = event.data.object as Stripe.Checkout.Session
      const { uid, plan } = session.metadata ?? {}
      if (uid && plan) {
        const planData = PLANS[plan as keyof typeof PLANS]
        await prisma.user.update({
          where: { firebaseUid: uid },
          data:  { plan, credits: { increment: planData?.credits ?? 0 } },
        })
      }
    }
    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('stripe webhook error:', err)
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }
}
