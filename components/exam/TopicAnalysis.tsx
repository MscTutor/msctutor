// components/exam/TopicAnalysis.tsx — Bar chart weak topics

interface TopicData { correct: number; total: number }
interface Props     { analysis: Record<string, TopicData> }

export default function TopicAnalysis({ analysis }: Props) {
  if (!analysis || !Object.keys(analysis).length) return null

  const sorted = Object.entries(analysis).sort(([,a],[,b]) => (a.correct/a.total) - (b.correct/b.total))

  return (
    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1.5rem' }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111', margin: '0 0 1.25rem' }}>📊 Topic Analysis</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {sorted.map(([chapter, data]) => {
          const pct   = Math.round((data.correct / data.total) * 100)
          const color = pct >= 70 ? '#22c55e' : pct >= 40 ? '#f59e0b' : '#ef4444'
          const label = pct >= 70 ? '✓ Strong' : pct >= 40 ? '⚠ Average' : '✗ Weak'
          return (
            <div key={chapter}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                <div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{chapter}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color, marginLeft: 8, padding: '2px 8px', background: `${color}22`, borderRadius: 20 }}>{label}</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color }}>{data.correct}/{data.total} ({pct}%)</span>
              </div>
              <div style={{ height: 10, background: '#f3f4f6', borderRadius: 5, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 5, transition: 'width 0.8s ease' }} />
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: '#fef3c7', borderRadius: 10, fontSize: 13, color: '#92400e' }}>
        💡 <strong>Tip:</strong> Focus on topics marked as &quot;Weak&quot; — practice more questions from those chapters.
      </div>
    </div>
  )
}
