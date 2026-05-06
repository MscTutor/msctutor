// app/subject/page.tsx — All subjects grid

import type { Metadata }  from 'next'
import Link               from 'next/link'
import { SITE } from '@/lib/constants'
import { getAllUnifiedSubjects } from '@/lib/global-content'

export const metadata: Metadata = {
  title:       `All Subjects — ${SITE.name}`,
  description: 'Browse all subjects: Mathematics, Physics, Chemistry, Biology, Commerce, Economics and more. Free NCERT solutions for Class 1-12.',
  alternates:  { canonical: `${SITE.url}/subject` },
}

const BRANCH_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  math:       { bg: '#e8eef8', color: '#1a3a6b', border: '#1a3a6b' },
  science:    { bg: '#e8f5ef', color: '#0a5e3f', border: '#0a5e3f' },
  commerce:   { bg: '#fdf0e6', color: '#7c3400', border: '#7c3400' },
  humanities: { bg: '#fdf4ff', color: '#6b21a8', border: '#6b21a8' },
  tech:       { bg: '#eff6ff', color: '#1d4ed8', border: '#1d4ed8' },
  language:   { bg: '#fff1f2', color: '#be123c', border: '#be123c' },
}

const BRANCH_LABELS: Record<string, string> = {
  math: 'Mathematics', science: 'Science', commerce: 'Commerce',
  humanities: 'Humanities', tech: 'Technology', language: 'Languages',
}

export default function SubjectPage() {
  const subjects = getAllUnifiedSubjects()
  const byBranch: Record<string, typeof subjects> = {}
  for (const s of subjects) {
    if (!byBranch[s.branch]) byBranch[s.branch] = []
    byBranch[s.branch].push(s)
  }

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#111', margin: 0 }}>All Subjects</h1>
        <p style={{ color: '#6b7280', marginTop: 8, fontSize: 16 }}>Choose a subject to explore chapters, formulas & AI solutions</p>
      </div>

      {Object.entries(byBranch).map(([branch, subjects]) => {
        const c = BRANCH_COLORS[branch] ?? BRANCH_COLORS.math
        return (
          <section key={branch} style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
              <div style={{ width: 4, height: 24, background: c.color, borderRadius: 2 }} />
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111', margin: 0 }}>{BRANCH_LABELS[branch] ?? branch}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
              {subjects.map(s => (
                <Link key={s.slug} href={`/subject/${s.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: c.bg, border: `1.5px solid ${c.border}22`,
                    borderRadius: 14, padding: '1.25rem', transition: 'all 0.15s',
                    display: 'flex', alignItems: 'center', gap: 12,
                  }}>
                    <div style={{ fontSize: 32 }}>{s.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16, color: c.color }}>{s.name}</div>
                      <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>Class 1–12 · NCERT</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </main>
  )
}
