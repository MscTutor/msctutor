// app/api/ask-voice/route.ts — Fixed: validation + safe DB + fallback

import { NextResponse } from 'next/server'
import { deepseekChat } from '@/lib/deepseek'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)
    if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

    const { transcript, userId, language = 'en' } = body

    if (!transcript?.trim()) {
      return NextResponse.json({ error: 'No voice transcript provided' }, { status: 400 })
    }
    if (transcript.length > 2000) {
      return NextResponse.json({ error: 'Transcript too long (max 2000 chars)' }, { status: 400 })
    }

    // No API key fallback
    if (!process.env.DEEPSEEK_API_KEY) {
      return NextResponse.json({
        solution: `Demo mode: You said "${transcript}". Add DEEPSEEK_API_KEY for real AI answers.`,
        answer:   'Demo mode active. Configure API key for live responses.',
        transcript,
      })
    }

    const langNote = language === 'hi' ? 'Answer in Hindi (Hinglish is okay).' : 'Answer in clear English.'
    const prompt   = `You are MscTutor AI — expert Indian school teacher.
Student asked via voice: "${transcript}"
${langNote}
Give a clear, step-by-step answer. Include:
1. Direct answer first
2. Explanation with steps
3. Formula if applicable
4. NCERT reference if relevant
Keep response concise and student-friendly.`

    let solution: string
    try {
      solution = await deepseekChat(prompt, 1500)
    } catch (aiErr: any) {
      // AI call failed — return helpful fallback
      return NextResponse.json({
        solution: `I heard: "${transcript}". I'm having trouble connecting to AI right now. Please try again in a moment or type your question.`,
        answer:   'AI temporarily unavailable.',
        transcript,
      })
    }

    // Save to DB safely
    try {
      const { default: prisma } = await import('@/lib/prisma')
      await prisma.question.create({
        data: {
          slug:     'voice-' + Date.now(),
          title:    transcript.slice(0, 500),
          solution: solution.slice(0, 5000),
          source:   'voice',
          userId:   userId ?? undefined,
          language,
          isPublic: true,
        },
      })
    } catch { /* DB not configured — skip */ }

    return NextResponse.json({ solution, answer: solution, transcript })
  } catch (err: any) {
    console.error('ask-voice error:', err)
    return NextResponse.json({
      solution: 'Voice processing failed. Please type your question instead.',
      answer:   'Error processing voice input.',
    }, { status: 500 })
  }
}
