// components/content/FormulaGrid.tsx — Formula bank grid display

import FormulaBlock from '@/components/question/FormulaBlock'

interface Formula { id: number; name: string; latex: string; description?: string | null; chapter?: { title: string } | null }
interface Props   { formulas: Formula[]; subject?: string }

export default function FormulaGrid({ formulas, subject }: Props) {
  if (!formulas.length) return null

  return (
    <section style={{ marginBottom: '1.5rem' }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111', margin: '0 0 1rem' }}>
        📐 Formula Bank {subject ? `— ${subject}` : ''}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.75rem' }}>
        {formulas.map(f => (
          <div key={f.id}>
            <FormulaBlock formula={f.latex || f.name} title={f.name} />
            {f.description && <p style={{ fontSize: 12, color: '#6b7280', margin: '0.25rem 0 0', paddingLeft: '0.5rem' }}>{f.description}</p>}
            {f.chapter && <p style={{ fontSize: 11, color: '#9ca3af', margin: '0.2rem 0 0', paddingLeft: '0.5rem' }}>Chapter: {f.chapter.title}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
