import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getGeneratedTopicExampleBySlug, getUnifiedChapterById, getUnifiedFormulaBySlug, getUnifiedTopicBySlug } from '@/lib/global-content'

interface Props {
  params: { classId: string; subject: string; chapterId: string; topicSlug: string; exampleSlug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const example = getGeneratedTopicExampleBySlug(params.classId, params.subject, params.chapterId, params.topicSlug, params.exampleSlug)
  return {
    title: example?.title ?? 'Example page',
    description: example?.problem ?? 'Worked example page',
  }
}

export default function TopicExamplePage({ params }: Props) {
  const chapter = getUnifiedChapterById(params.classId, params.subject, params.chapterId)
  const topic = getUnifiedTopicBySlug(params.classId, params.subject, params.chapterId, params.topicSlug)
  const example = getGeneratedTopicExampleBySlug(params.classId, params.subject, params.chapterId, params.topicSlug, params.exampleSlug)
  const formula = example?.formulaSlug ? getUnifiedFormulaBySlug(params.classId, params.subject, params.chapterId, example.formulaSlug) : null

  if (!chapter || !topic || !example) notFound()

  return (
    <div style={{ maxWidth: 920, margin: '0 auto', padding: '2rem 1rem 4rem' }}>
      <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 6, fontSize: 13, color: '#6b7280', marginBottom: '1.25rem' }}>
        <Link href={`/learn/${params.classId}/${params.subject}/${params.chapterId}`}>{chapter.title}</Link>
        <span>›</span>
        <Link href={`/learn/${params.classId}/${params.subject}/${params.chapterId}/topic/${params.topicSlug}`}>{topic.title}</Link>
        <span>›</span>
        <span>{example.title}</span>
      </nav>

      <div style={{ background: '#fff', border: '1px solid #dde5f5', borderRadius: 24, padding: '1.5rem', marginBottom: '1rem' }}>
        <div style={{ fontSize: 12, color: '#1a3a6b', fontWeight: 800, marginBottom: 8 }}>Worked Example</div>
        <h1 style={{ margin: '0 0 0.75rem', color: '#0f1f3d' }}>{example.title}</h1>
        <p style={{ margin: 0, color: '#374151', lineHeight: 1.8 }}>{example.problem}</p>
      </div>

      <div style={{ background: '#fff', border: '1px solid #dde5f5', borderRadius: 24, padding: '1.5rem', marginBottom: '1rem' }}>
        <h2 style={{ marginTop: 0, color: '#1a3a6b' }}>Step-by-step solution path</h2>
        <ol style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 1.85, color: '#374151' }}>
          {example.steps.map((step) => <li key={step}>{step}</li>)}
        </ol>
        <div style={{ marginTop: '1rem', background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: 16, padding: '1rem' }}>
          <div style={{ fontWeight: 800, color: '#1a3a6b', marginBottom: 6 }}>Final learning answer</div>
          <div style={{ color: '#374151', lineHeight: 1.8 }}>{example.answer}</div>
        </div>
      </div>

      {formula && (
        <div style={{ background: '#fff', border: '1px solid #dde5f5', borderRadius: 24, padding: '1.5rem', marginBottom: '1rem' }}>
          <h2 style={{ marginTop: 0, color: '#1a3a6b' }}>Related formula</h2>
          <Link href={`/learn/${params.classId}/${params.subject}/${params.chapterId}/formula/${formula.slug}`} style={{ textDecoration: 'none' }}>
            <div style={{ border: '1px solid #e5e7eb', borderRadius: 16, padding: '1rem', background: '#f8fafc' }}>
              <div style={{ fontSize: 12, color: '#1a3a6b', fontWeight: 800, marginBottom: 6 }}>{formula.name}</div>
              <div style={{ fontFamily: 'monospace', fontSize: 16, color: '#111827' }}>{formula.latex ?? formula.formula}</div>
            </div>
          </Link>
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Link href={`/learn/${params.classId}/${params.subject}/${params.chapterId}/topic/${params.topicSlug}`} style={{ textDecoration: 'none', background: '#f3f4f6', color: '#111827', borderRadius: 12, padding: '10px 16px', fontWeight: 800 }}>
          Back to topic
        </Link>
        <Link href="/ask" style={{ textDecoration: 'none', background: '#1a3a6b', color: '#fff', borderRadius: 12, padding: '10px 16px', fontWeight: 800 }}>
          Ask AI this example
        </Link>
      </div>
    </div>
  )
}
