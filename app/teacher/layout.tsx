import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Teacher Dashboard | MscTutor',
  description: 'Teacher tools — manage classes, attendance, homework and exams.',
  robots: { index: false, follow: false },
}
export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
