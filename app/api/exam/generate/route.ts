import { NextRequest, NextResponse } from 'next/server'
import { generateExamPaper } from '@/lib/deepseek'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { subject, classLevel, board, medium, difficulty, totalQ } = await req.json()

    if (!subject || !classLevel || !board) {
      return NextResponse.json({ error: 'Subject, class, and board are required' }, { status: 400 })
    }

    // Generate questions via AI
    const questions = await generateExamPaper({ subject, classLevel, board, medium: medium ?? 'English', difficulty: difficulty ?? 'mixed', totalQ: Number(totalQ ?? 20) })

    // Save exam to DB
    const shareCode = `MSC${Date.now().toString(36).toUpperCase()}`
    const exam = await prisma.examPaper.create({
      data: {
        title:        `${board} Class ${classLevel} ${subject} — AI Generated`,
        classLevel,
        board,
        medium:       medium ?? 'English',
        difficulty:   difficulty ?? 'mixed',
        totalQ:       questions.length,
        totalMarks:   questions.reduce((s: number, q: any) => s + (q.marks ?? 2), 0),
        duration:     questions.length * 2,
        shareCode,
        isPublic:     true,
        isAIGenerated:true,
        createdBy:    'ai-system',
        questions: {
          create: questions.map((q: any, i: number) => ({
            order:        i + 1,
            type:         q.type ?? 'mcq',
            questionText: q.questionText,
            options:      q.options ? JSON.stringify(q.options) : null,
            correctAnswer:q.correctAnswer,
            explanation:  q.explanation ?? '',
            marks:        q.marks ?? 2,
            chapter:      q.chapter ?? '',
            difficulty:   q.difficulty ?? 'medium',
          })),
        },
      },
      include: { questions: { orderBy: { order: 'asc' } } },
    })

    return NextResponse.json({ exam, shareCode })
  } catch (err: any) {
    console.error('Exam generate error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
