// app/ai-teacher/layout.tsx — Server component for AI Teacher metadata + schema

import type { Metadata }   from 'next'
import { buildMetadata }   from '@/lib/seo/metadata'
import { JsonLd, courseSchema, faqSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = buildMetadata({
  pageKey: 'aiTeacher',
  path:    '/ai-teacher',
})

const AI_TEACHER_FAQS = [
  { question: 'How is AI Teacher different from Ask AI?', answer: 'AI Teacher remembers your entire learning history, detects weak topics, adapts to your level, and uses pedagogical methods like Bloom\'s taxonomy and Socratic questioning. Ask AI answers individual questions without memory.' },
  { question: 'Does AI Teacher remember my progress?', answer: 'Yes! AI Teacher stores your topic mastery, accuracy, weak areas and revision schedule. It uses this to personalize every session.' },
  { question: 'Can AI Teacher help with revision?', answer: 'Yes! The Revision tab shows topics due for revision using spaced repetition — the most effective memory technique.' },
  { question: 'Is AI Teacher available in Hindi?', answer: 'Yes! AI Teacher responds in all 12 supported languages including Hindi, Bengali, Tamil, Telugu, Gujarati, Marathi, Punjabi, Urdu, Assamese, Arabic and French.' },
  { question: 'What modes does AI Teacher have?', answer: 'Four modes: Explain (concepts), Quiz (MCQ testing), Practice (solve problems together), and Revision (spaced repetition of weak topics).' },
]

export default function AITeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd data={[
        courseSchema({
          name:        'MscTutor Adaptive AI Teacher',
          description: 'Personalized AI tutoring for Class 6-12 NCERT with adaptive learning, memory, and 12 language support.',
          classLevel:  '6-12',
          subject:     'All Subjects',
          url:         `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://msctutor.in'}/ai-teacher`,
        }),
        faqSchema(AI_TEACHER_FAQS),
      ]} />
    </>
  )
}
