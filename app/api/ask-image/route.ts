// app/api/ask-image/route.ts — Secure image upload + AI

import { NextResponse }      from 'next/server'
import { askAITutor }        from '@/lib/ai-tutor'
import { validateUpload }    from '@/lib/security/upload-validator'
import { audit }             from '@/lib/security/audit-log'
import { checkRateLimit }    from '@/lib/security/rate-limiter'
import { sanitizeText }      from '@/lib/security/input-sanitizer'
import { logger }            from '@/lib/logger'

export const runtime     = 'nodejs'
export const maxDuration = 60

function getIP(req: Request): string {
  const fwd = new Headers(req.headers).get('x-forwarded-for')
  return fwd?.split(',')[0]?.trim() ?? '127.0.0.1'
}

export async function POST(req: Request) {
  const ip = getIP(req)

  // Strict rate limit: 5/min
  const rl = checkRateLimit(`ask-image:${ip}`, 'strict')
  if (!rl.allowed) {
    await audit.rateLimitHit(ip, '/api/ask-image')
    return NextResponse.json({ error: 'Too many image requests. Please wait.', retryAfter: rl.retryAfter }, { status: 429 })
  }

  try {
    const form = await req.formData().catch(() => null)
    if (!form) return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })

    const file   = form.get('image') as File | null
    const prompt = sanitizeText(String(form.get('prompt') ?? ''), { maxLength: 1000, checkPrompt: true }).clean
    const userId = String(form.get('userId') ?? '')

    if (!file) return NextResponse.json({ error: 'No image file provided' }, { status: 400 })

    // Full upload validation
    const validation = await validateUpload(file, 'image')
    if (!validation.valid) {
      await audit.invalidUpload(userId || undefined, ip, validation.error!, file.name)
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    // Convert to base64
    const buffer = Buffer.from(await file.arrayBuffer())
    const base64 = buffer.toString('base64')

    if (!process.env.DEEPSEEK_API_KEY) {
      return NextResponse.json({
        solution: 'Demo mode: Configure DEEPSEEK_API_KEY for real image analysis.',
        answer:   'Image received. AI analysis requires API key configuration.',
        steps:    [{ step: 1, title: 'Setup Required', content: 'Add DEEPSEEK_API_KEY to environment.' }],
      })
    }

    const result = await askAITutor({ type: 'image', base64, mimeType: file.type, prompt, language: 'en' })

    // Save question (non-blocking)
    setImmediate(async () => {
      try {
        const { default: prisma } = await import('@/lib/prisma')
        await prisma.question.create({
          data: { slug: `img-${Date.now()}`, title: prompt || 'Image question', solution: result.answer.slice(0, 5000), source: 'image', isPublic: false },
        })
      } catch {}
    })

    return NextResponse.json({ ...result, solution: result.answer })
  } catch (e: unknown) {
    logger.apiError('/api/ask-image', e)
    return NextResponse.json({
      solution: 'Unable to process image. Please try typing your question instead.',
      answer:   'Image processing failed.',
    }, { status: 500 })
  }
}
