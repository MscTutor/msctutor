// components/question/SolutionBlock.tsx — Step-by-step solution display

interface Props {
  solution:  string
  steps?:    string[]
  subject?:  string
}

export default function SolutionBlock({ solution, steps, subject }: Props) {
  const lines = steps?.length
    ? steps
    : solution.split(/\n+/).filter(l => l.trim())

  const isNumbered = (l: string) => /^\d+[\.\)]\s/.test(l.trim())
  const isFormula  = (l: string) => /[=+\-×÷√∫∑∞]/.test(l) && l.length < 80

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111', margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ background: '#1a3a6b', color: '#fff', width: 28, height: 28, borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>✓</span>
        Step-by-Step Solution
        {subject && <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 400 }}>· {subject}</span>}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {lines.map((line, i) => {
          const clean = line.replace(/^\d+[\.\)]\s/, '').trim()
          if (!clean) return null

          if (isNumbered(line)) return (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '0.75rem 1rem', background: '#f9fafb', borderRadius: 10, borderLeft: '3px solid #1a3a6b' }}>
              <span style={{ width: 24, height: 24, borderRadius: 6, background: '#1a3a6b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, flexShrink: 0 }}>
                {i + 1}
              </span>
              <span style={{ fontSize: 15, color: '#111', lineHeight: 1.6 }}>{clean}</span>
            </div>
          )

          if (isFormula(line)) return (
            <div key={i} style={{ padding: '0.65rem 1.1rem', background: '#f0f4ff', border: '1px solid #c7d2fe', borderRadius: 10, fontFamily: 'monospace', fontSize: 15, color: '#3730a3', textAlign: 'center' }}>
              {clean}
            </div>
          )

          return (
            <p key={i} style={{ fontSize: 15, color: '#374151', lineHeight: 1.7, margin: 0, padding: '0.25rem 0' }}>{clean}</p>
          )
        })}
      </div>
    </div>
  )
}
