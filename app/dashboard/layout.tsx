import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Student Dashboard | MscTutor',
  description: 'Your personal learning dashboard — track progress, view history, manage credits.',
  robots: { index: false, follow: false },
}
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
