import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE } from '@/lib/constants'
import { getUnifiedSubjectForClass } from '@/lib/global-content'
import { getSubjectPageParams, REVALIDATE } from '@/lib/static-params'
import { buildSubjectMetadata } from '@/lib/seo/metadata'

export function generateStaticParams() { return getSubjectPageParams() }
export const revalidate = REVALIDATE.SUBJECT_PAGE

interface Props {
  params: { classId: string; subject: string }
}

const SUBJECT_META: Record<string, { name: string; icon: string; color: string; bg: string; border: string }> = {
  mathematics: { name: 'Mathematics', icon: '➕', color: '#1a3a6b', bg: '#e8eef8', border: '#c7d5f0' },
  science: { name: 'Science', icon: '⚗️', color: '#0369a1', bg: '#eff6ff', border: '#bae6fd' },
  physics: { name: 'Physics', icon: '🔬', color: '#0369a1', bg: '#eff6ff', border: '#bae6fd' },
  chemistry: { name: 'Chemistry', icon: '🧪', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' },
  biology: { name: 'Biology', icon: '🧬', color: '#0a5e3f', bg: '#e8f5ef', border: '#bbf7d0' },
  english: { name: 'English', icon: '📝', color: '#1e3a5f', bg: '#f0f4ff', border: '#c7d2fe' },
  hindi: { name: 'Hindi', icon: '🇮🇳', color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
  evs: { name: 'EVS', icon: '🌿', color: '#0a5e3f', bg: '#e8f5ef', border: '#bbf7d0' },
  'social-science': { name: 'Social Science', icon: '🌍', color: '#065f46', bg: '#e8f5ef', border: '#a7f3d0' },
  accountancy: { name: 'Accountancy', icon: '📒', color: '#7c3400', bg: '#fdf0e6', border: '#fcd9a6' },
  'business-studies': { name: 'Business Studies', icon: '💼', color: '#7c3400', bg: '#fdf0e6', border: '#fcd9a6' },
  economics: { name: 'Economics', icon: '💹', color: '#065f46', bg: '#e8f5ef', border: '#a7f3d0' },
  history: { name: 'History', icon: '📜', color: '#78350f', bg: '#fef3c7', border: '#fde68a' },
  'political-science': { name: 'Political Science', icon: '🏛️', color: '#1e3a5f', bg: '#f0f4ff', border: '#c7d2fe' },
  geography: { name: 'Geography', icon: '🗺️', color: '#065f46', bg: '#e8f5ef', border: '#a7f3d0' },
  sociology: { name: 'Sociology', icon: '👥', color: '#4a1942', bg: '#fdf4ff', border: '#e9d5ff' },
  'computer-science': { name: 'Computer Science', icon: '🖥️', color: '#0369a1', bg: '#eff6ff', border: '#bae6fd' },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildSubjectMetadata(params.classId, params.subject)
}

export default function ClassSubjectPage({ params }: Props) {
  const subject = getUnifiedSubjectForClass(params.classId, params.subject)
  if (!subject) notFound()

  const meta = SUBJECT_META[params.subject] ?? { name: subject.name, icon: subject.icon ?? '📚', color: '#1a3a6b', bg: '#e8eef8', border: '#c7d5f0' }
  const totalFormulas = subject.chapters.reduce((sum, chapter) => sum + chapter.formulas.length, 0)
  const totalExperiments = subject.chapters.reduce((sum, chapter) => sum + chapter.experiments.length, 0)
  const totalVideos = subject.chapters.reduce((sum, chapter) => sum + chapter.videos.length, 0)

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fc' }}>
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '10px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 6, fontSize: 13, color: '#6b7280', flexWrap: 'wrap', alignItems: 'center' }}>
          <Link href="/" style={{ color: meta.color, textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <span>›</span>
          <Link href="/class" style={{ color: meta.color, textDecoration: 'none', fontWeight: 600 }}>Classes</Link>
          <span>›</span>
          <Link href={`/class/${params.classId}`} style={{ color: meta.color, textDecoration: 'none', fontWeight: 600 }}>Class {params.classId}</Link>
          <span>›</span>
          <span style={{ color: '#374151', fontWeight: 700 }}>{meta.icon} {meta.name}</span>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 20px' }}>
        <div style={{ background: `linear-gradient(135deg, ${meta.color} 0%, ${meta.color}dd 100%)`, borderRadius: 20, padding: '2rem', marginBottom: '1.5rem', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 56 }}>{meta.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 700, padding: '3px 12px', borderRadius: 20 }}>Class {params.classId}</span>
                <span style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 700, padding: '3px 12px', borderRadius: 20 }}>Global-ready</span>
                <span style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 700, padding: '3px 12px', borderRadius: 20 }}>AI Support</span>
              </div>
              <h1 style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 900, margin: '0 0 8px', lineHeight: 1.2 }}>
                Class {params.classId} - {subject.name}
              </h1>
              <p style={{ opacity: 0.85, fontSize: 15, margin: 0, maxWidth: 720, lineHeight: 1.6 }}>
                Complete NCERT syllabus — all chapters, topics, formulas and experiments. Click any chapter to start learning with AI support.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Chapters', value: subject.chapters.length },
              { label: 'Formulas', value: totalFormulas },
              { label: 'Experiments', value: totalExperiments },
              { label: 'Videos', value: totalVideos },
              { label: 'AI Help', value: 'Enabled' },
            ].map((item) => (
              <div key={item.label} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '8px 16px', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ fontSize: 18, fontWeight: 900 }}>{item.value}</div>
                <div style={{ fontSize: 11, opacity: 0.8 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <Link href={`/mock-test?class=${params.classId}&subject=${params.subject}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', background: meta.color, color: '#fff', borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>
            AI Mock Test
          </Link>
          <Link href={`/formulas?class=${params.classId}&subject=${params.subject}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', background: '#fff', color: meta.color, borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: 14, border: `1.5px solid ${meta.color}` }}>
            Formula Bank
          </Link>
          <Link href="/ask" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', background: '#f3f4f6', color: '#111', borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: 14, border: '1.5px solid #e5e7eb' }}>
            Ask AI
          </Link>
        </div>

        {/* Syllabus overview bar */}
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6b7280', marginBottom: 6, fontWeight: 600 }}>
              <span>Syllabus Coverage</span>
              <span>{subject.chapters.filter(c => c.isRich).length}/{subject.chapters.length} chapters with full content</span>
            </div>
            <div style={{ height: 7, background: '#f3f4f6', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: `linear-gradient(90deg, ${meta.color}, ${meta.color}cc)`, borderRadius: 4, width: `${Math.round((subject.chapters.filter(c => c.isRich).length / Math.max(subject.chapters.length, 1)) * 100)}%`, transition: 'width 0.6s ease' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: meta.color }}>{totalFormulas}</div>
              <div style={{ fontSize: 10, color: '#6b7280' }}>Formulas</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#0a5e3f' }}>{totalExperiments}</div>
              <div style={{ fontSize: 10, color: '#6b7280' }}>Experiments</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#dc2626' }}>{totalVideos}</div>
              <div style={{ fontSize: 10, color: '#6b7280' }}>Videos</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {subject.chapters.map((chapter, index) => (
            <div
              key={chapter.id}
              style={{
                background: '#fff',
                borderRadius: 14,
                border: `1.5px solid ${chapter.isRich ? meta.border : '#e5e7eb'}`,
                padding: '1rem 1.25rem',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: 14,
                alignItems: 'center',
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: chapter.isRich ? meta.bg : '#f9fafb', border: `1.5px solid ${chapter.isRich ? meta.border : '#e5e7eb'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: chapter.isRich ? meta.color : '#9ca3af', fontSize: 16 }}>
                {chapter.chapterNo ?? index + 1}
              </div>

              <div style={{ minWidth: 0 }}>
                <Link href={`/learn/${params.classId}/${params.subject}/${chapter.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: '#111', marginBottom: 5 }}>{chapter.title}</div>
                </Link>
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8, lineHeight: 1.5 }}>
                  {chapter.description.slice(0, 150)}
                </div>

                {chapter.topics.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
                    {chapter.topics.map((topic) => (
                      <Link
                        key={topic.slug}
                        href={`/learn/${params.classId}/${params.subject}/${chapter.id}/topic/${topic.slug}`}
                        style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', background: meta.bg, color: meta.color, borderRadius: 20, border: `1px solid ${meta.border}`, textDecoration: 'none' }}
                      >
                        {topic.title}
                      </Link>
                    ))}
                  </div>
                )}

                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {chapter.formulas.length > 0 && <span style={{ fontSize: 10, background: '#f0f4ff', color: '#3730a3', padding: '2px 7px', borderRadius: 20, border: '1px solid #c7d2fe', fontWeight: 700 }}>📐 {chapter.formulas.length} formulas</span>}
                  {chapter.experiments.length > 0 && <span style={{ fontSize: 10, background: '#e8f5ef', color: '#0a5e3f', padding: '2px 7px', borderRadius: 20, border: '1px solid #bbf7d0', fontWeight: 700 }}>🧪 {chapter.experiments.length} experiments</span>}
                  {chapter.videos.length > 0 && <span style={{ fontSize: 10, background: '#fee2e2', color: '#dc2626', padding: '2px 7px', borderRadius: 20, border: '1px solid #fecaca', fontWeight: 700 }}>▶ {chapter.videos.length} videos</span>}
                  {chapter.isRich && <span style={{ fontSize: 10, background: '#dcfce7', color: '#166534', padding: '2px 7px', borderRadius: 20, border: '1px solid #bbf7d0', fontWeight: 700 }}>Full Content</span>}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Link href={`/learn/${params.classId}/${params.subject}/${chapter.id}`} style={{ fontSize: 12, background: meta.bg, color: meta.color, padding: '5px 12px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>
                  Learn
                </Link>
                <Link href={`/mock-test?class=${params.classId}&subject=${params.subject}&chapter=${chapter.id}`} style={{ fontSize: 12, background: '#fff0f0', color: '#dc2626', padding: '5px 12px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>
                  Test
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
