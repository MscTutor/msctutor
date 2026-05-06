'use client'

import { useMemo, useState } from 'react'
import { BOARDS, SUBJECTS } from '@/lib/constants'

type Mode = 'ai' | 'manual'

export default function AddChapterPage() {
  const [mode, setMode] = useState<Mode>('ai')
  const [form, setForm] = useState({
    topic: '',
    subject: 'mathematics',
    classLevel: '9',
    board: 'CBSE',
    medium: 'English',
    description: '',
    concepts: '',
    formulas: '',
    keyTerms: '',
    videoType: 'youtube',
    videoTitle: '',
    videoUrl: '',
    videoDuration: '',
  })
  const [result, setResult] = useState<{ slug?: string; title?: string; data?: unknown } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const draftPreview = useMemo(() => ({
    chapterTitle: form.topic || 'Untitled Chapter',
    description: form.description || `Class ${form.classLevel} ${form.subject} chapter draft`,
    concepts: form.concepts.split('\n').map((item) => item.trim()).filter(Boolean).map((title) => ({ title, content: 'Add detailed explanation here.' })),
    formulas: form.formulas.split('\n').map((item) => item.trim()).filter(Boolean).map((item) => ({ name: item, latex: item, description: 'Add use case and derivation note here.' })),
    keyTerms: form.keyTerms.split(',').map((item) => item.trim()).filter(Boolean),
    video: {
      type: form.videoType,
      title: form.videoTitle,
      url: form.videoUrl,
      duration: form.videoDuration,
    },
  }), [form])

  async function generate(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (mode === 'manual') {
        setResult({ title: draftPreview.chapterTitle, data: draftPreview })
        setLoading(false)
        return
      }

      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: `Generate complete chapter content for "${form.topic}" Class ${form.classLevel} ${form.subject} ${form.board} in ${form.medium}. Include concepts, formulas, examples, video suggestions and key terms.`,
        }),
      })
      const data = await response.json()
      if (data.slug || data.title || data.solution) {
        setResult(data)
      } else {
        setError(data.error ?? 'Generation failed')
      }
    } catch {
      setError('Network error')
    }

    setLoading(false)
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 980 }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111', margin: '0 0 0.75rem' }}>Add Chapter Content</h1>
      <p style={{ color: '#6b7280', margin: '0 0 1.5rem', fontSize: 14 }}>
        Blueprint-aligned chapter creator with AI generation mode and manual mode for chapter details, formulas, key terms, and video metadata.
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {(['ai', 'manual'] as const).map((entry) => (
          <button
            key={entry}
            onClick={() => setMode(entry)}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: 10,
              border: mode === entry ? '2px solid #1a3a6b' : '1.5px solid #e5e7eb',
              background: mode === entry ? '#e8eef8' : '#fff',
              color: mode === entry ? '#1a3a6b' : '#6b7280',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            {entry === 'ai' ? 'AI Generate' : 'Manual Draft'}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '1.25rem', alignItems: 'start' }}>
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.5rem' }}>
          <form onSubmit={generate}>
            {error && <div style={{ background: '#fee2e2', color: '#dc2626', borderRadius: 10, padding: '0.75rem', fontSize: 14, marginBottom: '1rem' }}>{error}</div>}

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Topic / Chapter Title</label>
              <input
                value={form.topic}
                onChange={(event) => setForm((current) => ({ ...current, topic: event.target.value }))}
                placeholder="e.g. Chemical Reactions and Equations"
                required
                style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              {[['subject', 'Subject', SUBJECTS.map((subject) => subject.slug)], ['board', 'Board', BOARDS], ['classLevel', 'Class', ['1','2','3','4','5','6','7','8','9','10','11','12']], ['medium', 'Medium', ['English', 'Hindi']]].map(([key, label, options]) => (
                <div key={String(key)}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{String(label)}</label>
                  <select
                    value={form[key as keyof typeof form]}
                    onChange={(event) => setForm((current) => ({ ...current, [key as string]: event.target.value }))}
                    style={{ width: '100%', padding: '0.7rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, background: '#fff' }}
                  >
                    {(options as string[]).map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Description</label>
              <textarea
                value={form.description}
                onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                placeholder="Write the chapter summary and learning goal."
                style={{ width: '100%', minHeight: 88, padding: '0.8rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Concepts (one per line)</label>
                <textarea
                  value={form.concepts}
                  onChange={(event) => setForm((current) => ({ ...current, concepts: event.target.value }))}
                  placeholder={'Concept 1\nConcept 2\nConcept 3'}
                  style={{ width: '100%', minHeight: 120, padding: '0.8rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', resize: 'vertical' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Formulas / reactions (one per line)</label>
                <textarea
                  value={form.formulas}
                  onChange={(event) => setForm((current) => ({ ...current, formulas: event.target.value }))}
                  placeholder={'a^2 + b^2 = c^2\nH2 + O2 -> H2O'}
                  style={{ width: '100%', minHeight: 120, padding: '0.8rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', resize: 'vertical' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Key terms (comma separated)</label>
              <input
                value={form.keyTerms}
                onChange={(event) => setForm((current) => ({ ...current, keyTerms: event.target.value }))}
                placeholder="atom, molecule, balancing, reactant"
                style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: 14, padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#111', marginBottom: 10 }}>Video details</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Video type</label>
                  <select
                    value={form.videoType}
                    onChange={(event) => setForm((current) => ({ ...current, videoType: event.target.value }))}
                    style={{ width: '100%', padding: '0.7rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, background: '#fff' }}
                  >
                    <option value="youtube">YouTube</option>
                    <option value="ai-animation">AI animation</option>
                    <option value="external">External link</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Duration</label>
                  <input
                    value={form.videoDuration}
                    onChange={(event) => setForm((current) => ({ ...current, videoDuration: event.target.value }))}
                    placeholder="12 min"
                    style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 15, boxSizing: 'border-box' }}
                  />
                </div>
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Video title</label>
                <input
                  value={form.videoTitle}
                  onChange={(event) => setForm((current) => ({ ...current, videoTitle: event.target.value }))}
                  placeholder="Chapter explainer video"
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 15, boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Video URL / ID</label>
                <input
                  value={form.videoUrl}
                  onChange={(event) => setForm((current) => ({ ...current, videoUrl: event.target.value }))}
                  placeholder="https://www.youtube.com/watch?v=..."
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 15, boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '0.9rem', background: loading ? '#93c5fd' : '#1a3a6b', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: loading ? 'default' : 'pointer' }}
            >
              {loading ? 'Working...' : mode === 'ai' ? 'Generate Chapter with AI' : 'Prepare Manual Draft'}
            </button>
          </form>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1rem' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#111', marginBottom: 8 }}>Preview</div>
            <div style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.7 }}>
              <div><strong>Title:</strong> {draftPreview.chapterTitle}</div>
              <div><strong>Concepts:</strong> {draftPreview.concepts.length}</div>
              <div><strong>Formulas:</strong> {draftPreview.formulas.length}</div>
              <div><strong>Key terms:</strong> {draftPreview.keyTerms.length}</div>
              <div><strong>Video:</strong> {draftPreview.video.title || 'Not added yet'}</div>
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1rem' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#111', marginBottom: 8 }}>Result</div>
            {result ? (
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: 12, lineHeight: 1.6, color: '#374151' }}>
                {JSON.stringify(result, null, 2)}
              </pre>
            ) : (
              <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.7 }}>
                AI mode chapter generation ko trigger karega. Manual mode chapter draft, formulas, key terms, aur video metadata ka preview ready karega.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
