// app/api/translate/route.ts — MyMemory translation API (FREE, no key needed)

import { NextResponse } from 'next/server'
import { translate }    from '@/lib/translate'

export async function POST(req: Request) {
  try {
    const { text, targetLang } = await req.json()
    if (!text || !targetLang) {
      return NextResponse.json({ error: 'text and targetLang required' }, { status: 400 })
    }
    const translated = await translate(text, targetLang)
    return NextResponse.json({ translated })
  } catch (err) {
    console.error('translate error:', err)
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 })
  }
}
