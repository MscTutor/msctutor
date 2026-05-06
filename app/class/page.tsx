import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/constants'
import { getAllUnifiedClasses } from '@/lib/global-content'

export const metadata: Metadata = {
  title: `All Classes - ${SITE.name}`,
  description: 'Select your class from 1 to 12 and explore chapter-wise learning, formulas, experiments, videos and AI doubt support.',
  alternates: { canonical: `${SITE.url}/class` },
}

const COLORS = ['#1a3a6b', '#0a5e3f', '#7c3400', '#6b21a8', '#1d4ed8', '#be123c', '#065f46', '#92400e']

export default function ClassPage() {
  const classes = getAllUnifiedClasses()

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#111', margin: 0 }}>Select Your Class</h1>
        <p style={{ color: '#6b7280', marginTop: 8, fontSize: 16 }}>
          Global-ready chapter-wise learning from Class 1 to 12 with AI explanations
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
        {classes.map((catalog, index) => {
          const color = COLORS[index % COLORS.length]
          const topSubjects = catalog.subjects.slice(0, 3).map((subject) => subject.name)

          return (
            <Link key={catalog.classLevel} href={`/class/${catalog.classLevel}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: `${color}11`,
                border: `1.5px solid ${color}33`,
                borderRadius: 16,
                padding: '1.5rem',
                minHeight: 178,
              }}>
                <div style={{ fontSize: 36, fontWeight: 900, color, marginBottom: 6 }}>
                  {catalog.classLevel}
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#111' }}>{catalog.label}</div>
                <div style={{ fontSize: 12, color: '#6b7280', marginTop: 6, lineHeight: 1.5 }}>
                  {topSubjects.join(' · ')}
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, color, fontWeight: 700 }}>{catalog.subjects.length} subjects</span>
                  <span style={{ fontSize: 11, color: '#6b7280' }}>
                    {catalog.subjects.reduce((count, subject) => count + subject.chapters.length, 0)} chapters
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
