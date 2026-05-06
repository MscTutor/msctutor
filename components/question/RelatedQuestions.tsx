// components/question/RelatedQuestions.tsx

import Link from 'next/link'

interface Question { slug: string; title: string }
interface Props { questions: Question[]; subject?: string }

export default function RelatedQuestions({ questions, subject }: Props) {
  if (!questions.length) return null
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111', margin: '0 0 0.75rem' }}>
        🔗 Related Questions {subject ? `in ${subject}` : ''}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {questions.slice(0, 5).map(q => (
          <Link key={q.slug} href={`/question/${q.slug}`}
            style={{ padding: '0.7rem 1rem', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 10, textDecoration: 'none', color: '#1a3a6b', fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>{q.title.slice(0, 70)}{q.title.length > 70 ? '…' : ''}</span>
            <span style={{ color: '#9ca3af', marginLeft: 8 }}>›</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
