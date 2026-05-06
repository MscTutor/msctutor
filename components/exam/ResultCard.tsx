// components/exam/ResultCard.tsx — Score + grade display

import Link from 'next/link'

interface Props {
  score:      number
  totalMarks: number
  percentage: number
  timeTaken:  number
  title:      string
  attemptId:  number
  onReview?:  () => void
}

function getGrade(pct: number) {
  if (pct >= 90) return { label: 'A+', color: '#166534', bg: '#dcfce7', msg: 'Outstanding! 🎉' }
  if (pct >= 80) return { label: 'A',  color: '#16a34a', bg: '#dcfce7', msg: 'Excellent! 🌟' }
  if (pct >= 70) return { label: 'B+', color: '#65a30d', bg: '#ecfccb', msg: 'Very Good! 👏' }
  if (pct >= 60) return { label: 'B',  color: '#84cc16', bg: '#ecfccb', msg: 'Good work! 👍' }
  if (pct >= 50) return { label: 'C',  color: '#d97706', bg: '#fef3c7', msg: 'Keep practising 💪' }
  if (pct >= 40) return { label: 'D',  color: '#ea580c', bg: '#fff7ed', msg: 'Needs improvement 📚' }
  return               { label: 'F',  color: '#dc2626', bg: '#fee2e2', msg: 'Revise the topics 📖' }
}

export default function ResultCard({ score, totalMarks, percentage, timeTaken, title, attemptId, onReview }: Props) {
  const pct   = Math.round(percentage)
  const g     = getGrade(pct)
  const mins  = Math.floor(timeTaken / 60)
  const secs  = timeTaken % 60

  return (
    <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #e5e7eb', padding: '2.5rem', textAlign: 'center', maxWidth: 480, margin: '0 auto' }}>
      <h1 style={{ fontSize: 20, fontWeight: 800, color: '#111', margin: '0 0 1.5rem' }}>{title}</h1>

      {/* Grade circle */}
      <div style={{ width: 120, height: 120, borderRadius: '50%', border: `6px solid ${g.color}`, background: g.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
        <div style={{ fontSize: 32, fontWeight: 900, color: g.color, lineHeight: 1 }}>{g.label}</div>
        <div style={{ fontSize: 14, color: g.color, fontWeight: 600 }}>{pct}%</div>
      </div>
      <div style={{ fontSize: 15, color: g.color, fontWeight: 700, marginBottom: '1.5rem' }}>{g.msg}</div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Score',      value: `${score}/${totalMarks}` },
          { label: 'Percentage', value: `${pct}%`                },
          { label: 'Time',       value: `${mins}m ${secs}s`      },
        ].map(s => (
          <div key={s.label} style={{ background: '#f9fafb', borderRadius: 12, padding: '0.85rem' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#111' }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/mock-test" style={{ padding: '0.75rem 1.25rem', background: '#1a3a6b', color: '#fff', borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>
          Take Another
        </Link>
        {onReview && (
          <button onClick={onReview} style={{ padding: '0.75rem 1.25rem', background: '#f3f4f6', color: '#111', border: '1.5px solid #e5e7eb', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
            Review Answers
          </button>
        )}
        <Link href={`/mock-test/result/${attemptId}`} style={{ padding: '0.75rem 1.25rem', background: '#e8f5ef', color: '#0a5e3f', borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>
          Full Analysis
        </Link>
      </div>
    </div>
  )
}
