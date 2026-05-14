'use client'
import dynamic from 'next/dynamic'

const InlineMath = dynamic(
  () => import('react-katex').then(m => ({ default: m.InlineMath })),
  { ssr: false, loading: () => <span style={{fontFamily:'monospace',background:'#f0f4ff',padding:'2px 8px',borderRadius:4}}>{'{loading...}'}</span> }
)

interface Props { formula: string; title?: string; display?: boolean }

export default function FormulaBlock({ formula, title, display = false }: Props) {
  if (!formula) return null

  const isLatex = /[\\^_{}]|\\frac|\\sqrt|\\sum|\\int|\\alpha|\\beta|\\theta|\\pi/.test(formula)

  return (
    <div style={{ background: '#f0f4ff', border: '1.5px solid #c7d2fe', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1rem' }}>
      {title && (
        <div style={{ fontSize: 13, fontWeight: 700, color: '#3730a3', marginBottom: '0.5rem' }}>
          📐 {title}
        </div>
      )}
      <div style={{ textAlign: 'center', padding: '0.5rem 0', overflowX: 'auto' }}>
        {isLatex ? (
          <InlineMath math={formula} />
        ) : (
          <span style={{ fontFamily: 'monospace', fontSize: 18, color: '#1e1b4b', fontWeight: 600 }}>
            {formula}
          </span>
        )}
      </div>
    </div>
  )
}
