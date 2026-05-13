import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'School Dashboard | MscTutor',
  description: 'School management — teachers, students, attendance and analytics.',
  robots: { index: false, follow: false },
}
export default function SchoolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
