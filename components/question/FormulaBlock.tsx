// components/question/FormulaBlock.tsx — KaTeX formula render

interface Props { formula: string; title?: string }

export default function FormulaBlock({ formula, title }: Props) {
  if (!formula) return null
  return (
    <div style={{ background: '#f0f4ff', border: '1.5px solid #c7d2fe', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1rem' }}>
      {title && <div style={{ fontSize: 13, fontWeight: 700, color: '#3730a3', marginBottom: '0.4rem' }}>📐 {title}</div>}
      <div style={{ fontFamily: 'monospace', fontSize: 18, color: '#1e1b4b', textAlign: 'center', padding: '0.5rem 0' }}>
        {formula}
      </div>
    </div>
  )
}
