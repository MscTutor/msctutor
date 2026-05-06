// components/content/ConceptBlock.tsx

interface Props { title: string; content: string; color?: string; index?: number }

const COLORS = ['#1a3a6b','#0a5e3f','#7c3400','#6b21a8','#0369a1']

export default function ConceptBlock({ title, content, color, index = 0 }: Props) {
  const c = color ?? COLORS[index % COLORS.length]
  return (
    <div style={{ background: '#fff', borderRadius: 14, border: `1.5px solid ${c}22`, borderLeft: `4px solid ${c}`, padding: '1.1rem 1.25rem', marginBottom: '0.75rem' }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: c, margin: '0 0 0.5rem' }}>{title}</h3>
      <p style={{ color: '#374151', fontSize: 15, lineHeight: 1.7, margin: 0 }}>{content}</p>
    </div>
  )
}
