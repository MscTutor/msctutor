import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getUnifiedChapterById, getUnifiedFormulaBySlug } from '@/lib/global-content'

interface Props {
  params: { classId: string; subject: string; chapterId: string; formulaSlug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const formula = getUnifiedFormulaBySlug(params.classId, params.subject, params.chapterId, params.formulaSlug)
  return {
    title: formula?.name ?? 'Formula detail',
    description: formula?.formula ?? 'Formula detail page',
  }
}

export default function FormulaDetailPage({ params }: Props) {
  const chapter = getUnifiedChapterById(params.classId, params.subject, params.chapterId)
  const formula = getUnifiedFormulaBySlug(params.classId, params.subject, params.chapterId, params.formulaSlug)

  if (!chapter || !formula) notFound()

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem 4rem' }}>
      <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 6, fontSize: 13, color: '#6b7280', marginBottom: '1.25rem' }}>
        <Link href={`/learn/${params.classId}/${params.subject}/${params.chapterId}`}>{chapter.title}</Link>
        <span>›</span>
        <span>{formula.name}</span>
      </nav>

      <div style={{ background: '#fff', border: '1px solid #dde5f5', borderRadius: 24, padding: '1.5rem', marginBottom: '1rem' }}>
        <div style={{ fontSize: 12, color: '#1a3a6b', fontWeight: 800, marginBottom: 8 }}>Formula deep page</div>
        <h1 style={{ margin: '0 0 0.75rem', color: '#0f1f3d' }}>{formula.name}</h1>
        <div style={{ fontFamily: 'monospace', fontSize: 24, fontWeight: 700, color: '#111827', background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: 18, padding: '1rem 1.1rem', marginBottom: '1rem' }}>
          {formula.latex ?? formula.formula}
        </div>
        <p style={{ color: '#374151', lineHeight: 1.8, margin: 0 }}>
          This formula belongs to the chapter "{chapter.title}" in Class {params.classId} {chapter.subjectName}. Use it after identifying the right variables, matching the chapter context, and writing the substitution clearly.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <section style={{ background: '#fff', border: '1px solid #dde5f5', borderRadius: 24, padding: '1.5rem' }}>
          <h2 style={{ marginTop: 0, color: '#1a3a6b' }}>How to use it</h2>
          <ol style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 1.85, color: '#374151' }}>
            <li>Identify the quantity you need to find.</li>
            <li>Check the related variables and units from the question.</li>
            <li>Substitute values carefully into the formula.</li>
            <li>Simplify step by step and write the final statement.</li>
          </ol>
        </section>

        <section style={{ background: '#fff', border: '1px solid #dde5f5', borderRadius: 24, padding: '1.5rem' }}>
          <h2 style={{ marginTop: 0, color: '#1a3a6b' }}>Worked cue</h2>
          <div style={{ color: '#374151', lineHeight: 1.8 }}>
            {formula.example ?? 'Open the related topic examples to see this formula in action.'}
          </div>
          {formula.note && (
            <div style={{ marginTop: 12, color: '#5a6a8a', fontSize: 14 }}>
              <strong>Rule note:</strong> {formula.note}
            </div>
          )}
        </section>
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Link href={`/learn/${params.classId}/${params.subject}/${params.chapterId}`} style={{ textDecoration: 'none', background: '#f3f4f6', color: '#111827', borderRadius: 12, padding: '10px 16px', fontWeight: 800 }}>
          Back to chapter
        </Link>
        <Link href="/ask" style={{ textDecoration: 'none', background: '#1a3a6b', color: '#fff', borderRadius: 12, padding: '10px 16px', fontWeight: 800 }}>
          Ask AI about this formula
        </Link>
      </div>
    </div>
  )
}
