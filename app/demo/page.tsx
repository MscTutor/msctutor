import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/constants'
import { getPlatformContentStats } from '@/lib/global-content'

export const metadata: Metadata = {
  title: `Platform Demo - ${SITE.name}`,
  description: 'Live demo overview of syllabus coverage, dashboards, auth flows and current implementation status.',
}

const STATUS_ITEMS = [
  { label: 'Student dashboard', status: 'Ready UI / partial live data', href: '/dashboard' },
  { label: 'Teacher dashboard', status: 'Ready UI / partial live data', href: '/teacher/dashboard' },
  { label: 'School dashboard', status: 'Ready UI / partial live data', href: '/school-dashboard' },
  { label: 'Admin dashboard', status: 'Ready / DB-backed where available', href: '/admin' },
  { label: 'Login page', status: 'Ready UI / Firebase env required', href: '/login' },
  { label: 'Register page', status: 'Ready UI / Firebase env required', href: '/register' },
  { label: 'Ask AI', status: 'Ready / API env required', href: '/ask' },
  { label: 'Class-wise learning', status: 'Improved and wired', href: '/class' },
  { label: 'Subject-wise browsing', status: 'Improved and wired', href: '/subject' },
]

export default function DemoPage() {
  const stats = getPlatformContentStats()

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1rem 4rem' }}>
      <section style={{ background: 'linear-gradient(135deg,#102a56,#254f97)', color: '#fff', borderRadius: 24, padding: '2rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 700 }}>
            <h1 style={{ fontSize: 34, fontWeight: 900, margin: '0 0 10px' }}>MscTutor Demo Overview</h1>
            <p style={{ margin: 0, lineHeight: 1.7, opacity: 0.9 }}>
              This demo shows the current working foundation for global chapter-wise education, AI support,
              multi-role dashboards and scalable content expansion.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <Link href="/class" style={{ background: '#fff', color: '#102a56', textDecoration: 'none', padding: '10px 16px', borderRadius: 12, fontWeight: 800 }}>Explore Classes</Link>
            <Link href="/subject" style={{ background: '#ffffff22', color: '#fff', textDecoration: 'none', padding: '10px 16px', borderRadius: 12, fontWeight: 800, border: '1px solid #ffffff44' }}>Explore Subjects</Link>
          </div>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: '1.5rem' }}>
        {[
          { label: 'Classes', value: stats.classes },
          { label: 'Subjects', value: stats.subjects },
          { label: 'Chapters', value: stats.chapters },
          { label: 'Formulas', value: stats.formulas },
          { label: 'Experiments', value: stats.experiments },
          { label: 'Videos', value: stats.videos },
        ].map((item) => (
          <div key={item.label} style={{ background: '#fff', borderRadius: 16, border: '1px solid #dde5f5', padding: '1rem' }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#102a56' }}>{item.value}</div>
            <div style={{ fontSize: 13, color: '#6b7280' }}>{item.label}</div>
          </div>
        ))}
      </section>

      <section style={{ background: '#fff', borderRadius: 18, border: '1px solid #dde5f5', padding: '1rem 1.1rem', marginBottom: '1.5rem' }}>
        <h2 style={{ marginTop: 0, fontSize: 20, color: '#111827' }}>Current readiness</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
          {STATUS_ITEMS.map((item) => (
            <Link key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{ border: '1px solid #e5e7eb', borderRadius: 14, padding: '0.9rem' }}>
                <div style={{ fontWeight: 800, color: '#111827', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 13, color: '#6b7280' }}>{item.status}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ background: '#fff', borderRadius: 18, border: '1px solid #dde5f5', padding: '1rem 1.1rem' }}>
        <h2 style={{ marginTop: 0, fontSize: 20, color: '#111827' }}>Content target note</h2>
        <p style={{ color: '#4b5563', lineHeight: 1.75 }}>
          Your requested target of 50,000 chapters, 5,000 formulas and 5,000 experiments is a large content-production
          program. The current implementation now has a stronger rendering foundation so that massive content imports,
          generators, seeding pipelines and editorial review can scale on top of it cleanly.
        </p>
      </section>
    </main>
  )
}
