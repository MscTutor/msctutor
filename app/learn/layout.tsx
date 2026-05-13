// app/learn/layout.tsx — Server layout for chapter learn pages
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'Learn Chapter | MscTutor', template: '%s | MscTutor' },
  description: 'Learn NCERT chapters with AI explanations, formulas, experiments and practice questions.',
  robots: { index: true, follow: true },
}
export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
