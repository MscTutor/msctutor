'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getUnifiedChapterById, getUnifiedSubjectForClass } from '@/lib/global-content'

type Tab = 'learn' | 'formulas' | 'experiments' | 'videos' | 'ask'

const META: Record<string, { name: string; color: string; bg: string; border: string }> = {
  mathematics: { name: 'Mathematics', color: '#1a3a6b', bg: '#e8eef8', border: '#c7d5f0' },
  science: { name: 'Science', color: '#0369a1', bg: '#eff6ff', border: '#bae6fd' },
  physics: { name: 'Physics', color: '#0369a1', bg: '#eff6ff', border: '#bae6fd' },
  chemistry: { name: 'Chemistry', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' },
  biology: { name: 'Biology', color: '#0a5e3f', bg: '#e8f5ef', border: '#bbf7d0' },
  english: { name: 'English', color: '#1e3a5f', bg: '#f0f4ff', border: '#c7d2fe' },
  hindi: { name: 'Hindi', color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
  evs: { name: 'EVS', color: '#0a5e3f', bg: '#e8f5ef', border: '#bbf7d0' },
  'social-science': { name: 'Social Science', color: '#065f46', bg: '#e8f5ef', border: '#a7f3d0' },
  accountancy: { name: 'Accountancy', color: '#7c3400', bg: '#fdf0e6', border: '#fcd9a6' },
  economics: { name: 'Economics', color: '#065f46', bg: '#e8f5ef', border: '#a7f3d0' },
  history: { name: 'History', color: '#78350f', bg: '#fef3c7', border: '#fde68a' },
}

export default function LearnPage() {
  const params = useParams()
  const classId = params.classId as string
  const subjectSlug = params.subject as string
  const chapterId = params.chapterId as string

  const meta = META[subjectSlug] ?? { name: subjectSlug, color: '#1a3a6b', bg: '#e8eef8', border: '#c7d5f0' }
  const subject = getUnifiedSubjectForClass(classId, subjectSlug)
  const chapter = getUnifiedChapterById(classId, subjectSlug, chapterId)
  const [tab, setTab] = useState<Tab>('learn')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  const chapterIndex = useMemo(
    () => subject?.chapters.findIndex((item) => item.id === chapterId) ?? -1,
    [chapterId, subject?.chapters],
  )

  if (!chapter || !subject) {
    return (
      <div style={{ maxWidth: 700, margin: '4rem auto', padding: '0 1rem', textAlign: 'center', color: '#6b7280' }}>
        <div style={{ fontSize: 64 }}>📚</div>
        <h2 style={{ margin: '1rem 0 0.5rem' }}>Chapter not found</h2>
        <p style={{ marginBottom: '1.5rem' }}>This chapter is not mapped yet. You can still ask AI about the topic.</p>
        <Link href="/ask" style={{ background: '#1a3a6b', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: 12, textDecoration: 'none', fontWeight: 700 }}>
          Ask AI
        </Link>
      </div>
    )
  }

  async function askAI(event: FormEvent) {
    event.preventDefault()
    if (!question.trim()) return
    setLoading(true)
    setAnswer('')

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: `${question} (Context: Class ${classId}, Subject ${subject.name}, Chapter ${chapter.title})`,
        }),
      })
      const data = await response.json()
      setAnswer(data.solution ?? data.answer ?? 'No answer returned.')
    } catch {
      setAnswer('Network error while contacting AI.')
    } finally {
      setLoading(false)
    }
  }

  const tabs: Array<{ id: Tab; label: string }> = [
    { id: 'learn', label: 'Learn' },
    { id: 'formulas', label: `Formulas (${chapter.formulas.length})` },
    { id: 'experiments', label: `Experiments (${chapter.experiments.length})` },
    { id: 'videos', label: `Videos (${chapter.videos.length})` },
    { id: 'ask', label: 'Ask AI' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fc' }}>
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '10px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 6, fontSize: 12, color: '#6b7280', flexWrap: 'wrap', alignItems: 'center' }}>
          <Link href="/" style={{ color: meta.color, textDecoration: 'none' }}>Home</Link> ›
          <Link href={`/class/${classId}`} style={{ color: meta.color, textDecoration: 'none' }}>Class {classId}</Link> ›
          <Link href={`/class/${classId}/${subjectSlug}`} style={{ color: meta.color, textDecoration: 'none' }}>{subject.name}</Link> ›
          <span style={{ color: '#374151', fontWeight: 700 }}>{chapter.title}</span>
        </div>
      </div>

      <div style={{ background: `linear-gradient(135deg, ${meta.color} 0%, ${meta.color}cc 100%)`, color: '#fff', padding: '1.75rem 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 700, padding: '3px 12px', borderRadius: 20 }}>Class {classId}</span>
            <span style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 700, padding: '3px 12px', borderRadius: 20 }}>{subject.name}</span>
            {chapter.isRich && <span style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 700, padding: '3px 12px', borderRadius: 20 }}>Full Content</span>}
          </div>
          <h1 style={{ fontSize: 'clamp(20px, 4vw, 32px)', fontWeight: 900, margin: '0 0 8px', lineHeight: 1.25 }}>{chapter.title}</h1>
          <p style={{ opacity: 0.88, fontSize: 14, margin: 0, maxWidth: 720, lineHeight: 1.6 }}>{chapter.description}</p>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 24px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 0, overflowX: 'auto' }}>
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              style={{
                padding: '12px 18px',
                border: 'none',
                borderBottom: tab === item.id ? `3px solid ${meta.color}` : '3px solid transparent',
                background: 'transparent',
                color: tab === item.id ? meta.color : '#6b7280',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 20px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem' }}>
        <div>
          {tab === 'learn' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {chapter.topics.map((topic, index) => (
                <section key={`${topic.title}-${index}`} style={{ background: '#fff', border: `1.5px solid ${meta.border}`, borderRadius: 16, padding: '1rem 1.1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, color: meta.color, margin: 0 }}>{topic.title}</h2>
                    <Link href={`/learn/${classId}/${subjectSlug}/${chapter.id}/topic/${topic.slug}`} style={{ fontSize: 12, fontWeight: 800, color: meta.color, textDecoration: 'none', background: meta.bg, border: `1px solid ${meta.border}`, borderRadius: 999, padding: '5px 10px' }}>
                      Open topic page
                    </Link>
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.75, color: '#374151', margin: 0 }}>{topic.content}</p>
                  {topic.image && (
                    <div style={{ marginTop: 12 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={topic.image} alt={topic.title} loading="lazy" style={{ maxWidth: '100%', borderRadius: 12, border: '1px solid #e5e7eb' }} />
                    </div>
                  )}
                </section>
              ))}
            </div>
          )}

          {tab === 'formulas' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
              {chapter.formulas.length === 0 && <div style={{ color: '#6b7280' }}>No formulas added yet for this chapter.</div>}
              {chapter.formulas.map((formula, index) => (
                <div key={`${formula.name}-${index}`} style={{ background: '#fff', border: '1px solid #dde5f5', borderRadius: 16, padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start', marginBottom: 6 }}>
                    <div style={{ fontSize: 12, color: meta.color, fontWeight: 800 }}>{formula.name}</div>
                    <Link href={`/learn/${classId}/${subjectSlug}/${chapter.id}/formula/${formula.slug}`} style={{ fontSize: 11, color: meta.color, textDecoration: 'none', fontWeight: 800 }}>
                      Open detail
                    </Link>
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 700, color: '#111827', background: '#f8fafc', borderRadius: 10, padding: '10px 12px' }}>
                    {formula.latex ?? formula.formula}
                  </div>
                  {formula.example && <div style={{ fontSize: 12, color: '#6b7280', marginTop: 8 }}>{formula.example}</div>}
                </div>
              ))}
            </div>
          )}

          {tab === 'experiments' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {chapter.experiments.length === 0 && <div style={{ color: '#6b7280' }}>No experiments added yet for this chapter.</div>}
              {chapter.experiments.map((experiment, index) => (
                <div key={`${experiment.title}-${index}`} style={{ background: '#fff', border: '1px solid #dde5f5', borderRadius: 16, padding: '1rem' }}>
                  <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0a5e3f', margin: '0 0 0.5rem' }}>{experiment.title}</h2>
                  <p style={{ margin: '0 0 0.75rem', color: '#374151', fontSize: 14 }}><strong>Objective:</strong> {experiment.objective}</p>
                  <p style={{ margin: '0 0 0.5rem', color: '#374151', fontSize: 14 }}><strong>Materials:</strong> {experiment.materials.join(', ')}</p>
                  <ol style={{ margin: '0 0 0.75rem 1rem', color: '#374151', fontSize: 14, lineHeight: 1.7 }}>
                    {experiment.steps.map((step) => <li key={step}>{step}</li>)}
                  </ol>
                  <p style={{ margin: '0 0 0.35rem', color: '#374151', fontSize: 14 }}><strong>Result:</strong> {experiment.result}</p>
                  {experiment.safetyNote && <p style={{ margin: 0, color: '#b45309', fontSize: 13 }}><strong>Safety:</strong> {experiment.safetyNote}</p>}
                </div>
              ))}
            </div>
          )}

          {tab === 'videos' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
              {chapter.videos.length === 0 && <div style={{ color: '#6b7280' }}>No video links added yet for this chapter.</div>}
              {chapter.videos.map((video, index) => (
                <a key={`${video.title}-${index}`} href={video.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#fff', border: '1px solid #dde5f5', borderRadius: 16, padding: '1rem', minHeight: 140 }}>
                    <div style={{ fontSize: 12, color: '#dc2626', fontWeight: 800, marginBottom: 8 }}>VIDEO</div>
                    <div style={{ color: '#111827', fontWeight: 700, lineHeight: 1.45 }}>{video.title}</div>
                    <div style={{ marginTop: 8, fontSize: 12, color: '#6b7280' }}>{video.source ?? 'External source'}</div>
                    {video.duration && <div style={{ marginTop: 4, fontSize: 12, color: '#6b7280' }}>{video.duration}</div>}
                  </div>
                </a>
              ))}
            </div>
          )}

          {tab === 'ask' && (
            <div style={{ background: '#fff', border: '1px solid #dde5f5', borderRadius: 18, padding: '1rem' }}>
              <h2 style={{ fontSize: 20, fontWeight: 900, color: '#111827', marginTop: 0 }}>Ask about this chapter</h2>
              <form onSubmit={askAI}>
                <textarea
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  placeholder="Type your doubt here. You can ask concept, formula, exam question, summary, or explanation."
                  style={{ width: '100%', minHeight: 140, resize: 'vertical', border: '1.5px solid #dbe2f0', borderRadius: 12, padding: 14, fontSize: 14, fontFamily: 'inherit', outline: 'none' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ color: '#6b7280', fontSize: 12 }}>Context-aware AI help for this chapter</div>
                  <button type="submit" disabled={loading} style={{ background: meta.color, color: '#fff', border: 'none', borderRadius: 12, padding: '10px 18px', fontWeight: 800, cursor: 'pointer' }}>
                    {loading ? 'Thinking...' : 'Ask AI'}
                  </button>
                </div>
              </form>

              {answer && (
                <div style={{ marginTop: 18, background: '#f8fafc', border: '1px solid #dde5f5', borderRadius: 14, padding: 14, whiteSpace: 'pre-wrap', lineHeight: 1.7, color: '#374151', fontSize: 14 }}>
                  {answer}
                </div>
              )}
            </div>
          )}
        </div>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: '#fff', border: '1px solid #dde5f5', borderRadius: 16, padding: '1rem' }}>
            <div style={{ fontWeight: 800, color: '#111827', marginBottom: 10 }}>Chapter summary</div>
            <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.7 }}>
              <div>{chapter.topics.length} topics</div>
              <div>{chapter.formulas.length} formulas</div>
              <div>{chapter.experiments.length} experiments</div>
              <div>{chapter.videos.length} videos</div>
              <div>{chapter.keyTerms.length} key terms</div>
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #dde5f5', borderRadius: 16, padding: '1rem' }}>
            <div style={{ fontWeight: 800, color: '#111827', marginBottom: 10 }}>Navigate chapters</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {chapterIndex > 0 && (
                <Link href={`/learn/${classId}/${subjectSlug}/${subject.chapters[chapterIndex - 1].id}`} style={{ color: meta.color, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>
                  ← {subject.chapters[chapterIndex - 1].title}
                </Link>
              )}
              {chapterIndex >= 0 && chapterIndex < subject.chapters.length - 1 && (
                <Link href={`/learn/${classId}/${subjectSlug}/${subject.chapters[chapterIndex + 1].id}`} style={{ color: meta.color, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>
                  {subject.chapters[chapterIndex + 1].title} →
                </Link>
              )}
            </div>
          </div>

          {chapter.keyTerms.length > 0 && (
            <div style={{ background: '#fff', border: '1px solid #dde5f5', borderRadius: 16, padding: '1rem' }}>
              <div style={{ fontWeight: 800, color: '#111827', marginBottom: 10 }}>Key terms</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {chapter.keyTerms.map((term) => (
                  <span key={term} style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.border}`, borderRadius: 999, padding: '5px 10px', fontSize: 12, fontWeight: 700 }}>
                    {term}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
