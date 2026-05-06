// app/api/admin/content/route.ts — AI content generation for admin

import { NextResponse }        from 'next/server'
import { getAuthUser, isAdmin } from '@/lib/auth'
import { deepseekChat }        from '@/lib/deepseek'
import { prisma }              from '@/lib/prisma'
import { generateSlug }        from '@/lib/slug'

// POST /api/admin/content — AI generate full subject content
export async function POST(req: Request) {
  try {
    const user = await getAuthUser(req)
    if (!isAdmin(user)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { action, subject, classLevel, board, medium, topic } = await req.json()

    // ── ACTION: Generate full subject ────────────────────────
    if (action === 'generate-subject') {
      const prompt = `List all NCERT chapters for Class ${classLevel} ${subject} (${board} board).
Return ONLY valid JSON array (no markdown):
[{"chapterNumber":1,"title":"...","topics":["..."],"keyFormulas":["..."]}]`

      const raw      = await deepseekChat(prompt)
      const clean    = raw.replace(/```json|```/g, '').trim()
      const chapters = JSON.parse(clean) as { chapterNumber: number; title: string; topics: string[]; keyFormulas?: string[] }[]

      const subjectRecord = await prisma.subject.findFirst({ where: { name: { contains: subject } } })
      const created: string[] = []

      for (const ch of chapters.slice(0, 20)) {
        const slug = await generateSlug(`${ch.title}-class-${classLevel}`)
        const existing = await prisma.chapter.findUnique({ where: { slug } })
        if (existing) { created.push(slug); continue }

        await prisma.chapter.create({
          data: {
            title:       ch.title,
            slug,
            subjectId:   subjectRecord?.id,
            classLevel,
            board,
            order:       ch.chapterNumber,
            description: `NCERT Class ${classLevel} ${subject} — ${ch.title}`,
            concepts:    JSON.stringify((ch.topics ?? []).map((t: string) => ({ title: t, content: '' }))),
            metaTitle:   `${ch.title} — Class ${classLevel} ${subject} | MscTutor`,
            metaDesc:    `NCERT Class ${classLevel} ${subject}: ${ch.title}. Free explanations, formulas and mock tests.`,
            isPublic:    true,
            isApproved:  true,
          } as any,
        })
        created.push(slug)
      }

      return NextResponse.json({ success: true, created: created.length, chapters: created })
    }

    // ── ACTION: Generate single chapter content ───────────────
    if (action === 'generate-chapter' && topic) {
      const prompt = `Create detailed educational content for "${topic}" — Class ${classLevel} ${subject} (${board}).
Return ONLY valid JSON (no markdown):
{
  "chapterTitle": "...",
  "description": "2-sentence description",
  "concepts": [{"title":"...","content":"Detailed explanation (3-4 sentences)"}],
  "formulas": [{"name":"...","latex":"...","description":"When to use"}],
  "solvedExamples": [{"question":"...","solution":"...","steps":["step1","step2","step3"]}],
  "keyTerms": ["term1","term2"],
  "metaTitle": "...",
  "metaDesc": "155 chars max"
}`
      const raw  = await deepseekChat(prompt, 3000)
      const data = JSON.parse(raw.replace(/```json|```/g, '').trim())
      return NextResponse.json({ success: true, data })
    }

    // ── ACTION: Generate practice questions ───────────────────
    if (action === 'generate-questions') {
      const prompt = `Generate 10 practice questions for "${topic}" Class ${classLevel} ${subject}.
Mix: 5 MCQ + 3 short answer + 2 long answer.
Return ONLY valid JSON array:
[{"type":"mcq","question":"...","options":["A...","B...","C...","D..."],"answer":"A...","explanation":"...","difficulty":"easy|medium|hard"}]`

      const raw       = await deepseekChat(prompt, 2500)
      const questions = JSON.parse(raw.replace(/```json|```/g, '').trim())
      return NextResponse.json({ success: true, questions })
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch (err) {
    console.error('admin/content error:', err)
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Generation failed' }, { status: 500 })
  }
}
