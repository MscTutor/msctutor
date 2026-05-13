// app/class/12/humanities/page.tsx
// Class 12 Humanities — History, Political Science, Geography, Sociology

import type { Metadata } from 'next'
import Link from 'next/link'
import { CLASS_12_HUMANITIES } from '@/lib/ncert-syllabus-commerce'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Class 12 Humanities — NCERT Syllabus | ${SITE.name}`,
  description: 'Class 12 Humanities stream — History, Political Science, Geography, Sociology. Complete NCERT syllabus with AI explanations.',
}

const SUBJECT_ICONS: Record<string, string> = {
  history: '📜', 'political-science': '🏛️', geography: '🗺️',
  sociology: '👥', english: '📝', hindi: '🇮🇳', psychology: '🧠',
}
const SUBJECT_COLORS: Record<string, string> = {
  history: '#78350f', 'political-science': '#1e3a5f', geography: '#065f46',
  sociology: '#4a1942', english: '#1e3a5f', hindi: '#dc2626', psychology: '#7c3aed',
}

export default function Class12HumanitiesPage() {
  const subjects = CLASS_12_HUMANITIES?.subjects ?? []

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fc' }}>
      {/* Breadcrumb */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '10px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 6, fontSize: 13, color: '#6b7280', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#065f46', textDecoration: 'none', fontWeight: 600 }}>Home</Link> ›
          <Link href="/class" style={{ color: '#065f46', textDecoration: 'none', fontWeight: 600 }}>Classes</Link> ›
          <Link href="/class/12" style={{ color: '#065f46', textDecoration: 'none', fontWeight: 600 }}>Class 12</Link> ›
          <span style={{ color: '#374151', fontWeight: 700 }}>Humanities Stream</span>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 20px' }}>

        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg,#065f46,#064e34)', borderRadius: 20, padding: '2rem', marginBottom: '1.5rem', color: '#fff', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 56 }}>🌍</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 700, padding: '3px 12px', borderRadius: 20 }}>Class 12</span>
                <span style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 700, padding: '3px 12px', borderRadius: 20 }}>Humanities Stream</span>
                <span style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 700, padding: '3px 12px', borderRadius: 20 }}>NCERT · CBSE</span>
              </div>
              <h1 style={{ fontSize: 30, fontWeight: 900, margin: '0 0 8px', lineHeight: 1.2 }}>Class 12 — Humanities</h1>
              <p style={{ opacity: 0.85, fontSize: 14, margin: 0, maxWidth: 560, lineHeight: 1.6 }}>
                History, Political Science, Geography, Sociology — complete NCERT syllabus with AI explanations, notes and mock tests.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Subjects', val: subjects.length || 4 },
              { label: 'Total Chapters', val: subjects.reduce((s, sub) => s + sub.chapters.length, 0) || '80+' },
              { label: 'AI Explanations', val: '✓ Free' },
              { label: 'Mock Tests', val: '✓ Available' },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', borderRadius: 12, padding: '8px 16px', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ fontSize: 18, fontWeight: 900 }}>{s.val}</div>
                <div style={{ fontSize: 11, opacity: 0.8, marginTop: 1 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <Link href="/mock-test?class=12&stream=humanities" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', background: '#065f46', color: '#fff', borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>📋 AI Mock Test</Link>
          <Link href="/formulas?class=12&stream=humanities" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', background: '#fff', color: '#065f46', borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: 14, border: '1.5px solid #065f46' }}>📝 Key Concepts</Link>
          <Link href="/ask" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', background: '#f3f4f6', color: '#111', borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: 14, border: '1.5px solid #e5e7eb' }}>🤖 Ask AI Doubt</Link>
        </div>

        {/* Subjects Grid */}
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111', margin: '0 0 1rem' }}>📚 Select a Subject</h2>

        {subjects.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {subjects.map(subject => {
              const color = SUBJECT_COLORS[subject.slug] ?? '#065f46'
              const icon  = SUBJECT_ICONS[subject.slug]  ?? '📚'
              return (
                <Link key={subject.slug} href={`/class/12/${subject.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#fff', borderRadius: 16, border: `1.5px solid ${color}22`, padding: '1.25rem', display: 'flex', alignItems: 'center', gap: 14, transition: 'all 0.15s', cursor: 'pointer' }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{icon}</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 16, color: '#111' }}>{subject.name}</div>
                      <div style={{ fontSize: 12, color: '#6b7280', marginTop: 3 }}>{subject.chapters.length} chapters · NCERT</div>
                      <div style={{ fontSize: 11, color, fontWeight: 700, marginTop: 3 }}>View Syllabus →</div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          /* Fallback if CLASS_12_HUMANITIES is empty */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {[
              { slug: 'history',            name: 'History',           icon: '📜', color: '#78350f', chapters: 15 },
              { slug: 'political-science',  name: 'Political Science', icon: '🏛️', color: '#1e3a5f', chapters: 9  },
              { slug: 'geography',          name: 'Geography',         icon: '🗺️', color: '#065f46', chapters: 12 },
              { slug: 'sociology',          name: 'Sociology',         icon: '👥', color: '#4a1942', chapters: 9  },
              { slug: 'english',            name: 'English',           icon: '📝', color: '#1e3a5f', chapters: 8  },
              { slug: 'hindi',              name: 'Hindi',             icon: '🇮🇳', color: '#dc2626', chapters: 10 },
            ].map(s => (
              <Link key={s.slug} href={`/class/12/${s.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', borderRadius: 16, border: `1.5px solid ${s.color}22`, padding: '1.25rem', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 16, color: '#111' }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: '#6b7280', marginTop: 3 }}>{s.chapters} chapters · NCERT</div>
                    <div style={{ fontSize: 11, color: s.color, fontWeight: 700, marginTop: 3 }}>View Syllabus →</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Career Guidance */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.5rem' }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#111', margin: '0 0 1rem' }}>🎯 Career Options after Class 12 Humanities</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {[
              { field: 'Law (LLB)', exam: 'CLAT / AILET',       icon: '⚖️' },
              { field: 'Civil Services', exam: 'UPSC IAS/IPS',  icon: '🏛️' },
              { field: 'Journalism',    exam: 'IIMC Entrance',  icon: '📰' },
              { field: 'History/Archaeology', exam: 'CUET',     icon: '🏺' },
              { field: 'Social Work',   exam: 'University Exam',icon: '🤝' },
              { field: 'Teaching (B.Ed)', exam: 'CTET',         icon: '👩‍🏫' },
            ].map(c => (
              <div key={c.field} style={{ background: '#f9fafb', borderRadius: 12, padding: '0.875rem', border: '1px solid #f3f4f6' }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{c.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#111' }}>{c.field}</div>
                <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Exam: {c.exam}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg,#065f46,#064e34)', borderRadius: 16, padding: '1.5rem', marginTop: '1.5rem', textAlign: 'center', color: '#fff' }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 0.5rem' }}>Have a doubt in Class 12 Humanities?</h3>
          <p style={{ opacity: 0.85, fontSize: 14, margin: '0 0 1rem' }}>Ask any History, PolSci, Geography question — AI answers instantly, free!</p>
          <Link href="/ask" style={{ display: 'inline-block', background: '#fff', color: '#065f46', padding: '0.75rem 2rem', borderRadius: 12, textDecoration: 'none', fontWeight: 800, fontSize: 15 }}>
            🤖 Ask AI Now — Free!
          </Link>
        </div>
      </div>
    </div>
  )
}
