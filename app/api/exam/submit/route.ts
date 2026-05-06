import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { examId, answers, userId, userName, timeTaken } = await req.json()

    const exam = await prisma.examPaper.findUnique({
      where: { id: Number(examId) },
      include: { questions: true },
    })
    if (!exam) return NextResponse.json({ error: 'Exam not found' }, { status: 404 })

    const parsedAnswers: Record<string, string> = typeof answers === 'string' ? JSON.parse(answers) : answers

    // Auto-grade
    let score = 0
    const analysis: Record<string, { correct: number; wrong: number; total: number }> = {}

    exam.questions.forEach(q => {
      const chapter = q.chapter ?? 'General'
      if (!analysis[chapter]) analysis[chapter] = { correct: 0, wrong: 0, total: 0 }
      analysis[chapter].total++

      const given = parsedAnswers[String(q.id)] ?? ''
      const isCorrect = given.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase() ||
                        given.trim()[0]?.toUpperCase() === q.correctAnswer.trim()[0]?.toUpperCase()
      if (isCorrect) {
        score += q.marks
        analysis[chapter].correct++
      } else {
        analysis[chapter].wrong++
      }
    })

    const totalMarks = exam.questions.reduce((s, q) => s + q.marks, 0)
    const percentage = totalMarks > 0 ? Math.round((score / totalMarks) * 100) : 0

    // Grade
    let grade = 'F'
    if (percentage >= 90) grade = 'A+'
    else if (percentage >= 80) grade = 'A'
    else if (percentage >= 70) grade = 'B+'
    else if (percentage >= 60) grade = 'B'
    else if (percentage >= 50) grade = 'C'
    else if (percentage >= 33) grade = 'D'

    const attempt = await prisma.examAttempt.create({
      data: {
        examId:      Number(examId),
        userId:      userId ?? 'anonymous',
        userName:    userName ?? 'Student',
        answers:     JSON.stringify(parsedAnswers),
        score,
        totalMarks,
        percentage,
        timeTaken:   timeTaken ?? 0,
        analysis:    JSON.stringify(analysis),
        submittedAt: new Date(),
      },
    })

    return NextResponse.json({ attempt, score, totalMarks, percentage, grade, analysis })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
