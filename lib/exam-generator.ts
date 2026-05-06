// lib/exam-generator.ts — AI exam paper generator

import { deepseekChat } from './deepseek'

export interface ExamQuestion {
  order: number
  type: 'mcq' | 'short' | 'long'
  questionText: string
  options?: string[]
  correctAnswer: string
  explanation: string
  marks: number
  chapter: string
}

export interface ExamConfig {
  classLevel: string
  subject: string
  board: string
  medium: 'Hindi' | 'English'
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed'
  totalQ: number
  questionTypes: string[]
}

export async function generateExamPaper(config: ExamConfig): Promise<ExamQuestion[]> {
  const mcqCount  = config.questionTypes.includes('mcq')   ? Math.ceil(config.totalQ * 0.6) : 0
  const shortCount = config.questionTypes.includes('short') ? Math.ceil(config.totalQ * 0.3) : 0
  const longCount  = config.questionTypes.includes('long')  ? config.totalQ - mcqCount - shortCount : 0

  const prompt = `You are an expert ${config.board} examiner for Class ${config.classLevel} ${config.subject}.
Generate ${config.totalQ} exam questions in ${config.medium} medium.
Difficulty: ${config.difficulty}
Distribution: ${mcqCount} MCQ (2 marks each), ${shortCount} Short Answer (3 marks each), ${longCount} Long Answer (5 marks each)

Return ONLY a valid JSON array, no other text:
[
  {
    "order": 1,
    "type": "mcq",
    "questionText": "Full question text here",
    "options": ["A. option1", "B. option2", "C. option3", "D. option4"],
    "correctAnswer": "A. option1",
    "explanation": "Brief explanation of correct answer",
    "marks": 2,
    "chapter": "Chapter name"
  }
]

Rules:
- Make questions authentic ${config.board} Class ${config.classLevel} style
- Cover different chapters from the syllabus
- MCQ must have exactly 4 options starting with A., B., C., D.
- Short answers: no options needed
- Long answers: no options needed
- Questions in ${config.medium} language only`

  const raw = await deepseekChat(prompt)
  const clean = raw.replace(/```json|```/g, '').trim()

  try {
    const questions: ExamQuestion[] = JSON.parse(clean)
    return questions.slice(0, config.totalQ)
  } catch {
    throw new Error('Failed to parse AI-generated exam questions')
  }
}

export function calculateDuration(totalQ: number, types: string[]): number {
  let minutes = 0
  if (types.includes('mcq'))   minutes += totalQ * 0.6 * 1.5
  if (types.includes('short')) minutes += totalQ * 0.3 * 4
  if (types.includes('long'))  minutes += totalQ * 0.1 * 10
  return Math.ceil(minutes / 5) * 5 // round to nearest 5
}
