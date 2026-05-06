// app/student-school/dashboard/page.tsx
import type { Metadata } from 'next'
import Link              from 'next/link'
export const metadata: Metadata = { title: 'Student Dashboard — School' }
export default function StudentSchoolDashboard() {
  const links = [
    { href: '/student-school/my-class',    emoji: '🏫', label: 'My Class',   desc: 'View classmates & teachers' },
    { href: '/student-school/curriculum',  emoji: '📚', label: 'Curriculum', desc: 'Study material & chapters' },
    { href: '/student-school/attendance',  emoji: '✅', label: 'Attendance', desc: 'My attendance record' },
    { href: '/student-school/homework',    emoji: '📝', label: 'Homework',   desc: 'Pending & submitted tasks' },
    { href: '/student-school/exams',       emoji: '📋', label: 'Exams',      desc: 'Take & view past exams' },
    { href: '/student-school/notices',     emoji: '🔔', label: 'Notices',    desc: 'School announcements' },
  ]
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', margin: '0 0 1.5rem' }}>My School</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {links.map(l => (
          <Link key={l.href} href={l.href} style={{ textDecoration: 'none' }}>
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: '1.5rem', textAlign: 'center', transition: 'box-shadow 0.15s' }}>
              <div style={{ fontSize: 36, marginBottom: '0.5rem' }}>{l.emoji}</div>
              <div style={{ fontWeight: 700, color: '#111', fontSize: 15 }}>{l.label}</div>
              <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>{l.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
