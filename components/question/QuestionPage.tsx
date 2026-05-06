// components/question/QuestionPage.tsx — Full auto-generated question page

import Link             from 'next/link'
import SolutionBlock    from './SolutionBlock'
import FormulaBlock     from './FormulaBlock'
import DiagramBlock     from './DiagramBlock'
import RelatedQuestions from './RelatedQuestions'
import PracticeBlock    from './PracticeBlock'
import CommentSection   from '@/components/comments/CommentSection'

interface Question {
  id: number; slug: string; title: string; solution: string
  formula?: string | null; diagramUrl?: string | null
  subject?: { name: string; slug: string } | null
  chapter?:  { title: string; slug: string } | null
  classLevel?: string | null; board?: string | null
  views: number; helpful: number; rating: number
  relatedSlugs?: string | null
}
interface Related { slug: string; title: string }
interface Props { question: Question; related: Related[] }

export default function QuestionPage({ question, related }: Props) {
  const branch = question.subject?.name?.toLowerCase().includes('math') ? 'math'
    : question.subject?.name?.toLowerCase().includes('science') || question.subject?.name?.toLowerCase().includes('physics') || question.subject?.name?.toLowerCase().includes('chemistry') || question.subject?.name?.toLowerCase().includes('biology') ? 'science'
    : question.subject?.name?.toLowerCase().includes('commerce') || question.subject?.name?.toLowerCase().includes('account') ? 'commerce'
    : 'general'

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1.5rem 1rem' }}>
      {/* Breadcrumb */}
      <nav style={{ fontSize: 13, color: '#6b7280', marginBottom: '1.25rem', display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        <Link href="/" style={{ color: '#1a3a6b' }}>Home</Link> ›
        {question.subject && <><Link href={`/subject/${question.subject.slug}`} style={{ color: '#1a3a6b' }}>{question.subject.name}</Link> ›</>}
        {question.chapter  && <><Link href={`/subject/${question.subject?.slug}/chapter/${question.chapter.slug}`} style={{ color: '#1a3a6b' }}>{question.chapter.title}</Link> ›</>}
        <span style={{ color: '#9ca3af' }}>Question</span>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem', alignItems: 'start' }}>
        {/* Main */}
        <div>
          {/* Question header */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              {question.subject   && <span style={{ background: '#e8eef8', color: '#1a3a6b', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>{question.subject.name}</span>}
              {question.classLevel && <span style={{ background: '#f3f4f6', color: '#374151', fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>Class {question.classLevel}</span>}
              {question.board     && <span style={{ background: '#f3f4f6', color: '#374151', fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>{question.board}</span>}
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111', lineHeight: 1.4, margin: '0 0 1rem' }}>{question.title}</h1>
            <div style={{ display: 'flex', gap: '1rem', fontSize: 13, color: '#9ca3af' }}>
              <span>👁 {question.views} views</span>
              <span>👍 {question.helpful} helpful</span>
              {question.rating > 0 && <span>⭐ {question.rating.toFixed(1)}</span>}
            </div>
          </div>

          {/* Solution */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1.25rem' }}>
            <SolutionBlock solution={question.solution} subject={question.subject?.name} />
            {question.formula   && <FormulaBlock formula={question.formula} title="Key Formula" />}
            {(question.diagramUrl || question.subject) && (
              <DiagramBlock query={question.title} subject={question.subject?.name} fallbackUrl={question.diagramUrl ?? undefined} />
            )}
          </div>

          {/* Practice */}
          <PracticeBlock topic={question.title} subject={question.subject?.name} />

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {[
              { label: '🔊 Read Aloud', action: () => { const u = new SpeechSynthesisUtterance(question.solution); window.speechSynthesis.speak(u) } },
              { label: '📋 Copy',       action: () => navigator.clipboard.writeText(question.solution) },
              { label: '🔗 Share',      action: () => navigator.share?.({ title: question.title, url: window.location.href }) },
            ].map(b => (
              <button key={b.label} onClick={b.action}
                style={{ padding: '0.6rem 1.1rem', background: '#f3f4f6', border: '1.5px solid #e5e7eb', borderRadius: 10, fontSize: 14, fontWeight: 600, color: '#374151', cursor: 'pointer' }}>
                {b.label}
              </button>
            ))}
          </div>

          {/* Related */}
          <RelatedQuestions questions={related} subject={question.subject?.name} />

          {/* Comments */}
          <CommentSection branch={branch} questionId={question.id} />
        </div>

        {/* Sidebar */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'sticky', top: '5rem' }}>
          {question.formula && (
            <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '1rem' }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#111', marginBottom: '0.5rem' }}>Quick Formula</div>
              <div style={{ fontFamily: 'monospace', fontSize: 15, color: '#1a3a6b', textAlign: 'center' }}>{question.formula}</div>
            </div>
          )}
          {question.subject && (
            <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '1rem' }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#111', marginBottom: '0.75rem' }}>Explore More</div>
              <Link href={`/subject/${question.subject.slug}`} style={{ display: 'block', padding: '0.6rem 1rem', background: '#e8eef8', color: '#1a3a6b', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 600, marginBottom: '0.5rem' }}>
                All {question.subject.name} chapters →
              </Link>
              <Link href="/mock-test" style={{ display: 'block', padding: '0.6rem 1rem', background: '#e8f5ef', color: '#0a5e3f', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
                Take Mock Test →
              </Link>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
