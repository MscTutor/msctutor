// components/content/ChapterPage.tsx — Full chapter with all sections

import Link         from 'next/link'
import FormulaBlock from '@/components/question/FormulaBlock'
import DiagramBlock from '@/components/question/DiagramBlock'

interface Concept    { title: string; content: string }
interface Formula    { name: string; latex: string; description?: string }
interface Example    { question: string; solution: string; steps?: string[] }
interface Experiment { title: string; objective: string; materials: string; procedure: string; result: string }

interface Chapter {
  id: number; title: string; slug: string; description?: string | null
  classLevel?: string | null; board?: string | null
  subject?: { name: string; slug: string; color?: string | null } | null
  concepts?:    Concept[]
  formulas?:    Formula[]
  examples?:    Example[]
  experiments?: Experiment[]
  diagrams?:    { imageUrl: string; title: string; attribution?: string | null }[]
}

interface Props { chapter: Chapter }

const CONCEPT_COLORS = ['#1a3a6b', '#0a5e3f', '#7c3400', '#6b21a8', '#0369a1']

export default function ChapterPage({ chapter }: Props) {
  const color = chapter.subject?.color ?? '#1a3a6b'

  return (
    <article>
      {/* Hero */}
      <div style={{ background: `${color}11`, border: `1px solid ${color}22`, borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          {chapter.subject && (
            <Link href={`/subject/${chapter.subject.slug}`}
              style={{ fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: color, color: '#fff', textDecoration: 'none' }}>
              {chapter.subject.name}
            </Link>
          )}
          {chapter.classLevel && <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: '#f3f4f6', color: '#374151' }}>Class {chapter.classLevel}</span>}
          {chapter.board      && <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: '#f3f4f6', color: '#374151' }}>{chapter.board}</span>}
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', lineHeight: 1.3, margin: '0 0 0.5rem' }}>{chapter.title}</h1>
        {chapter.description && <p style={{ color: '#6b7280', fontSize: 15, margin: 0, lineHeight: 1.6 }}>{chapter.description}</p>}
      </div>

      {/* Diagram */}
      {chapter.diagrams?.[0] && (
        <DiagramBlock query={chapter.title} subject={chapter.subject?.name} fallbackUrl={chapter.diagrams[0].imageUrl} />
      )}
      {!chapter.diagrams?.[0] && (
        <DiagramBlock query={chapter.title} subject={chapter.subject?.name} />
      )}

      {/* Key Concepts */}
      {chapter.concepts && chapter.concepts.length > 0 && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111', margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 28, height: 28, background: color, borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14 }}>🔑</span>
            Key Concepts
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {chapter.concepts.map((c, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 14, border: `1.5px solid ${CONCEPT_COLORS[i % CONCEPT_COLORS.length]}22`, borderLeft: `4px solid ${CONCEPT_COLORS[i % CONCEPT_COLORS.length]}`, padding: '1.1rem 1.25rem' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: CONCEPT_COLORS[i % CONCEPT_COLORS.length], margin: '0 0 0.5rem' }}>{c.title}</h3>
                <p style={{ color: '#374151', fontSize: 15, lineHeight: 1.7, margin: 0 }}>{c.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Formulas */}
      {chapter.formulas && chapter.formulas.length > 0 && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111', margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 28, height: 28, background: '#6b21a8', borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14 }}>📐</span>
            Formulas
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {chapter.formulas.map((f, i) => (
              <FormulaBlock key={i} formula={f.latex || f.name} title={f.name} />
            ))}
          </div>
        </section>
      )}

      {/* Solved Examples */}
      {chapter.examples && chapter.examples.length > 0 && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111', margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 28, height: 28, background: '#0a5e3f', borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14 }}>✏️</span>
            Solved Examples
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {chapter.examples.map((ex, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '1.25rem' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0a5e3f', marginBottom: '0.5rem' }}>Example {i + 1}</div>
                <p style={{ fontWeight: 600, color: '#111', fontSize: 15, margin: '0 0 0.75rem', lineHeight: 1.5 }}>Q: {ex.question}</p>
                <div style={{ background: '#f0f9f4', borderRadius: 10, padding: '0.85rem 1rem' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#0a5e3f', marginBottom: 4 }}>Solution:</div>
                  <p style={{ color: '#374151', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{ex.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experiments (for Science) */}
      {chapter.experiments && chapter.experiments.length > 0 && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111', margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 28, height: 28, background: '#7c3400', borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14 }}>🧪</span>
            Experiments
          </h2>
          {chapter.experiments.map((exp, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '1.25rem', marginBottom: '0.75rem' }}>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: '#7c3400', margin: '0 0 0.75rem' }}>{exp.title}</h3>
              {[['Objective', exp.objective], ['Materials', exp.materials], ['Procedure', exp.procedure], ['Result', exp.result]].map(([label, text]) => (
                <div key={label as string} style={{ marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#7c3400' }}>{label as string}: </span>
                  <span style={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>{text as string}</span>
                </div>
              ))}
            </div>
          ))}
        </section>
      )}
    </article>
  )
}
