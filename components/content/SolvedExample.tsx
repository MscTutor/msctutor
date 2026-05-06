// components/content/SolvedExample.tsx

interface Props { question: string; solution: string; steps?: string[]; index?: number }

export default function SolvedExample({ question, solution, steps, index = 1 }: Props) {
  const lines = steps?.length
    ? steps
    : solution.split('\n').filter(l => l.trim())

  return (
    <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '1.25rem', marginBottom: '1rem' }}>
      <div style={{ display: 'inline-block', background: '#0a5e3f', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 6, marginBottom: '0.75rem' }}>
        Example {index}
      </div>
      <p style={{ fontWeight: 600, color: '#111', fontSize: 15, lineHeight: 1.5, margin: '0 0 0.85rem' }}>
        <span style={{ color: '#0a5e3f', marginRight: 6 }}>Q.</span>{question}
      </p>
      <div style={{ background: '#f0f9f4', borderRadius: 10, padding: '0.85rem 1rem' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#0a5e3f', marginBottom: '0.4rem' }}>Solution:</div>
        {lines.map((line, i) => (
          line.trim() ? (
            <p key={i} style={{ color: '#374151', fontSize: 14, lineHeight: 1.6, margin: '0 0 0.35rem' }}>{line.trim()}</p>
          ) : null
        ))}
      </div>
    </div>
  )
}
