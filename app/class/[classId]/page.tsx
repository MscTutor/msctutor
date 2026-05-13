import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE } from '@/lib/constants'
import { getUnifiedClassCatalog } from '@/lib/global-content'
import { STATIC_CLASSES, REVALIDATE, getStaticClassMeta } from '@/lib/static-params'
import { buildClassMetadata } from '@/lib/seo/metadata'
import { JsonLd, breadcrumbSchema, courseSchema } from '@/lib/seo/structured-data'

// ── STATIC GENERATION ─────────────────────────────────────────────
export function generateStaticParams() {
  return STATIC_CLASSES.map(classId => ({ classId }))
}
export const revalidate = REVALIDATE.CLASS_PAGE

interface Props {
  params: { classId: string }
}

const BRANCH_INFO: Record<string, { label: string; color: string; bg: string }> = {
  math: { label: 'Mathematics', color: '#1a3a6b', bg: '#e8eef8' },
  science: { label: 'Science', color: '#0369a1', bg: '#eff6ff' },
  commerce: { label: 'Commerce', color: '#7c3400', bg: '#fdf0e6' },
  humanities: { label: 'Humanities', color: '#065f46', bg: '#e8f5ef' },
  language: { label: 'Languages', color: '#be123c', bg: '#fff1f2' },
  tech: { label: 'Technology', color: '#1d4ed8', bg: '#eff6ff' },
  general: { label: 'Core Subjects', color: '#4b5563', bg: '#f3f4f6' },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildClassMetadata(params.classId)
}

export default function ClassPage({ params }: Props) {
  const catalog = getUnifiedClassCatalog(params.classId)
  if (!catalog) notFound()

  const byBranch = catalog.subjects.reduce<Record<string, typeof catalog.subjects>>((acc, subject) => {
    const branch = subject.branch ?? 'general'
    if (!acc[branch]) acc[branch] = []
    acc[branch].push(subject)
    return acc
  }, {})

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1rem' }}>
      <nav style={{ fontSize: 13, color: '#6b7280', marginBottom: '1.25rem', display: 'flex', gap: 6 }}>
        <Link href="/" style={{ color: '#1a3a6b', textDecoration: 'none' }}>Home</Link> ›
        <Link href="/class" style={{ color: '#1a3a6b', textDecoration: 'none' }}>Classes</Link> ›
        <span>{catalog.label}</span>
      </nav>

      <div style={{ background: 'linear-gradient(135deg,#1a3a6b,#0e2347)', borderRadius: 20, padding: '2rem', marginBottom: '2rem', color: '#fff' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, margin: '0 0 0.5rem' }}>{catalog.label}</h1>
        <p style={{ opacity: 0.84, fontSize: 15, margin: '0 0 1rem' }}>{catalog.description}</p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ background: '#ffffff22', padding: '8px 16px', borderRadius: 10, fontWeight: 700, fontSize: 13 }}>
            {catalog.subjects.length} subjects
          </span>
          <span style={{ background: '#ffffff22', padding: '8px 16px', borderRadius: 10, fontWeight: 700, fontSize: 13 }}>
            {catalog.subjects.reduce((count, subject) => count + subject.chapters.length, 0)} chapters
          </span>
          <Link href={`/mock-test?class=${catalog.classLevel}`} style={{ background: '#f59e0b', color: '#111', padding: '8px 18px', borderRadius: 10, textDecoration: 'none', fontWeight: 800, fontSize: 14 }}>
            AI Mock Test
          </Link>
          <Link href="/ask" style={{ background: '#ffffff22', color: '#fff', padding: '8px 18px', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 14, border: '1.5px solid #ffffff44' }}>
            Ask AI Doubt
          </Link>
        </div>
      </div>

      {/* Learning Journey Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { icon: '📚', label: 'Total Chapters', value: catalog.subjects.reduce((s, sub) => s + sub.chapters.length, 0), color: '#1a3a6b', bg: '#e8eef8' },
          { icon: '🔬', label: 'Subjects', value: catalog.subjects.length, color: '#0369a1', bg: '#e0f2fe' },
          { icon: '🤖', label: 'AI Support', value: '24/7', color: '#065f46', bg: '#d1fae5' },
          { icon: '📋', label: 'Exam Ready', value: 'CBSE', color: '#7c3400', bg: '#fdf0e6' },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, borderRadius: 14, padding: '1.1rem', textAlign: 'center', border: `1.5px solid ${s.color}22` }}>
            <div style={{ fontSize: 26 }}>{s.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: s.color, margin: '4px 0 2px' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#6b7280', fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {Object.entries(byBranch).map(([branch, subjects]) => {
        const branchInfo = BRANCH_INFO[branch] ?? BRANCH_INFO.general
        const totalChapters = subjects.reduce((s, sub) => s + sub.chapters.length, 0)

        return (
          <section key={branch} style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: '1rem', paddingBottom: 10, borderBottom: `2px solid ${branchInfo.color}22` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 4, height: 24, background: branchInfo.color, borderRadius: 2 }} />
                <h2 style={{ fontSize: 18, fontWeight: 800, color: branchInfo.color, margin: 0 }}>{branchInfo.label}</h2>
              </div>
              <span style={{ fontSize: 12, color: '#6b7280', background: '#f3f4f6', padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>
                {subjects.length} subject{subjects.length !== 1 ? 's' : ''} · {totalChapters} chapters
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '1rem' }}>
              {subjects.map((subject) => (
                <Link key={subject.slug} href={`/class/${catalog.classLevel}/${subject.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#fff', borderRadius: 14, border: `1.5px solid ${branchInfo.color}22`, padding: '1rem', display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.2s', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: branchInfo.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                      {subject.icon ?? '📚'}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: '#111' }}>{subject.name}</div>
                      <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3 }}>{subject.chapters.length} chapters</div>
                      {/* Mini progress bar placeholder */}
                      <div style={{ height: 3, background: '#f3f4f6', borderRadius: 2, marginTop: 6, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: '0%', background: branchInfo.color, borderRadius: 2 }} />
                      </div>
                    </div>
                    <span style={{ fontSize: 16, color: '#9ca3af', flexShrink: 0 }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
      <JsonLd data={[
        breadcrumbSchema([{ name:'Home', url:'/' }, { name:'Classes', url:'/class' }, { name:`Class ${catalog.classLevel}`, url:`/class/${catalog.classLevel}` }]),
        courseSchema({ name:`Class ${catalog.classLevel} NCERT Complete Course`, description:`Complete NCERT syllabus for Class ${catalog.classLevel} with AI-powered explanations, formulas and mock tests.`, classLevel:catalog.classLevel, subject:'All Subjects', url:`${process.env.NEXT_PUBLIC_APP_URL ?? 'https://msctutor.in'}/class/${catalog.classLevel}` }),
      ]} />
    </main>
  )
}
