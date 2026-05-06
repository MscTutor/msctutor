import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getGeneratedTopicExamples, getUnifiedChapterById, getUnifiedTopicBySlug } from '@/lib/global-content'

interface Props {
  params: { classId: string; subject: string; chapterId: string; topicSlug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const topic = getUnifiedTopicBySlug(params.classId, params.subject, params.chapterId, params.topicSlug)
  const chapter = getUnifiedChapterById(params.classId, params.subject, params.chapterId)

  return {
    title: topic && chapter ? `${topic.title} - ${chapter.title} - Class ${params.classId}` : 'Topic page',
    description: topic?.content ?? chapter?.description ?? 'Topic learning page',
  }
}

export default function TopicDetailPage({ params }: Props) {
  const chapter = getUnifiedChapterById(params.classId, params.subject, params.chapterId)
  const topic = getUnifiedTopicBySlug(params.classId, params.subject, params.chapterId, params.topicSlug)
  const examples = getGeneratedTopicExamples(params.classId, params.subject, params.chapterId, params.topicSlug)

  if (!chapter || !topic) notFound()

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1rem 4rem' }}>
      <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 6, fontSize: 13, color: '#6b7280', marginBottom: '1.25rem' }}>
        <Link href="/">Home</Link>
        <span>›</span>
        <Link href={`/class/${params.classId}/${params.subject}`}>Class {params.classId} {chapter.subjectName}</Link>
        <span>›</span>
        <Link href={`/learn/${params.classId}/${params.subject}/${params.chapterId}`}>{chapter.title}</Link>
        <span>›</span>
        <span>{topic.title}</span>
      </nav>

      <div style={{ background: '#fff', border: '1px solid #dde5f5', borderRadius: 24, overflow: 'hidden', marginBottom: '1.5rem' }}>
        {chapter.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={chapter.imageUrl} alt={chapter.title} style={{ width: '100%', display: 'block', borderBottom: '1px solid #e5e7eb' }} />
        )}
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
            <span style={{ background: '#e8eef8', color: '#1a3a6b', borderRadius: 999, padding: '4px 10px', fontSize: 12, fontWeight: 800 }}>Class {params.classId}</span>
            <span style={{ background: '#e8eef8', color: '#1a3a6b', borderRadius: 999, padding: '4px 10px', fontSize: 12, fontWeight: 800 }}>{chapter.subjectName}</span>
            <span style={{ background: '#f3f4f6', color: '#374151', borderRadius: 999, padding: '4px 10px', fontSize: 12, fontWeight: 700 }}>{chapter.title}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 38px)', margin: '0 0 0.5rem', color: '#0f1f3d' }}>{topic.title}</h1>
          <p style={{ margin: 0, color: '#5a6a8a', fontSize: 15, lineHeight: 1.8 }}>{topic.content}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.25rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <section style={{ background: '#fff', border: '1px solid #dde5f5', borderRadius: 18, padding: '1rem 1.1rem' }}>
            <h2 style={{ marginTop: 0, color: '#1a3a6b' }}>How to study this topic</h2>
            <ol style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 1.8, color: '#374151', fontSize: 14 }}>
              <li>Read the core explanation once without solving.</li>
              <li>Open the formula links below and connect them with the topic meaning.</li>
              <li>Practice the 10 example pages one by one.</li>
              <li>Use the AI ask page for text, voice or image-based doubts.</li>
            </ol>
          </section>

          <section style={{ background: '#fff', border: '1px solid #dde5f5', borderRadius: 18, padding: '1rem 1.1rem' }}>
            <h2 style={{ marginTop: 0, color: '#1a3a6b' }}>10 example pages</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {examples.map((example) => (
                <Link
                  key={example.slug}
                  href={`/learn/${params.classId}/${params.subject}/${params.chapterId}/topic/${params.topicSlug}/example/${example.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div style={{ border: '1px solid #e5e7eb', borderRadius: 14, padding: '0.9rem', background: '#f9fafb', minHeight: 110 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#1a3a6b', marginBottom: 6 }}>{example.title}</div>
                    <div style={{ fontSize: 13, lineHeight: 1.6, color: '#374151' }}>{example.problem}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <section style={{ background: '#fff', border: '1px solid #dde5f5', borderRadius: 18, padding: '1rem 1.1rem' }}>
            <h2 style={{ marginTop: 0, color: '#1a3a6b' }}>Related formulas</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {chapter.formulas.map((formula) => (
                <Link
                  key={formula.slug}
                  href={`/learn/${params.classId}/${params.subject}/${params.chapterId}/formula/${formula.slug}`}
                  style={{ textDecoration: 'none', color: '#111827', border: '1px solid #e5e7eb', borderRadius: 14, padding: '0.85rem', background: '#f8fafc' }}
                >
                  <div style={{ fontSize: 12, color: '#1a3a6b', fontWeight: 800, marginBottom: 4 }}>{formula.name}</div>
                  <div style={{ fontFamily: 'monospace', fontSize: 14 }}>{formula.latex ?? formula.formula}</div>
                </Link>
              ))}
              {chapter.formulas.length === 0 && <div style={{ color: '#6b7280', fontSize: 14 }}>No direct formula mapped yet.</div>}
            </div>
          </section>

          <section style={{ background: '#fff', border: '1px solid #dde5f5', borderRadius: 18, padding: '1rem 1.1rem' }}>
            <h2 style={{ marginTop: 0, color: '#1a3a6b' }}>Ask in any mode</h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#5a6a8a' }}>
              Text, voice, image and PDF-based doubt solving already flows through the AI ask experience. Use it with this topic context.
            </p>
            <Link href="/ask" style={{ display: 'inline-block', marginTop: 8, textDecoration: 'none', background: '#1a3a6b', color: '#fff', borderRadius: 12, padding: '10px 16px', fontWeight: 800 }}>
              Open Ask AI
            </Link>
          </section>

          <section style={{ background: '#fff', border: '1px solid #dde5f5', borderRadius: 18, padding: '1rem 1.1rem' }}>
            <h2 style={{ marginTop: 0, color: '#1a3a6b' }}>Video support</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {chapter.videos.map((video) => (
                <a key={video.url} href={video.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#111827', border: '1px solid #e5e7eb', borderRadius: 14, padding: '0.85rem', background: '#f8fafc' }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{video.title}</div>
                  <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>{video.source}</div>
                </a>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
