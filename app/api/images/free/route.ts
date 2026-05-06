// app/api/images/free/route.ts — Fetch free image from Wikimedia Commons

import { NextResponse } from 'next/server'
import { getFreeImage } from '@/lib/free-images'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const query   = searchParams.get('q') ?? ''
    const subject = searchParams.get('subject') ?? 'general'

    if (!query) return NextResponse.json({ error: 'Query required' }, { status: 400 })

    const image = await getFreeImage(query, subject)
    return NextResponse.json(image)
  } catch (err) {
    console.error('images/free error:', err)
    return NextResponse.json({ error: 'Image fetch failed' }, { status: 500 })
  }
}
