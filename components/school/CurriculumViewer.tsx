// components/school/CurriculumViewer.tsx — Chapter-by-chapter sidebar

import Link from 'next/link'

interface Chapter { id: number; title: string; slug: string; order: number; isCompleted?: boolean }
interface Subject  { name: string; chapters: Chapter[] }
interface Props    { subjects: Subject[]; classId: string | number; activeSlug?: string }

export default function CurriculumViewer({ subjects, classId, activeSlug }: Props) {
  return (
    <div style={{ background: '#1a3a6b', color: '#fff', height: '100%', overflow: 'auto', minWidth: 240 }}>
      <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #ffffff22', fontWeight: 700, fontSize: 15 }}>📚 Curriculum</div>
      {subjects.map(subject => (
        <div key={subject.name}>
          <div style={{ padding: '0.6rem 1.25rem', fontSize: 11, fontWeight: 700, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 8 }}>
            {subject.name}
          </div>
          {subject.chapters.map(ch => (
            <Link key={ch.id} href={`/teacher/class/${classId}/teach/${ch.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ padding: '0.65rem 1.25rem', display: 'flex', alignItems: 'center', gap: 8, background: ch.slug === activeSlug ? '#ffffff22' : 'transparent', borderLeft: ch.slug === activeSlug ? '3px solid #fff' : '3px solid transparent', cursor: 'pointer' }}>
                <span style={{ fontSize: 13, color: ch.isCompleted ? '#4ade80' : '#93c5fd', flexShrink: 0 }}>{ch.isCompleted ? '✅' : '○'}</span>
                <span style={{ fontSize: 13, color: ch.slug === activeSlug ? '#fff' : '#cbd5e1', lineHeight: 1.4 }}>{ch.order}. {ch.title}</span>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}
