'use client'
// components/ask/PDFUpload.tsx

import { useState, useRef } from 'react'

interface Props {
  onResult:  (solution: string, slug: string) => void
  onLoading: (v: boolean) => void
}

export default function PDFUpload({ onResult, onLoading }: Props) {
  const [file,     setFile]     = useState<File | null>(null)
  const [question, setQuestion] = useState('')
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function handleDrop(e: React.DragEvent) {
    e.preventDefault(); setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f?.type === 'application/pdf') setFile(f)
  }

  async function handleSolve() {
    if (!file) return
    onLoading(true)
    try {
      const fd = new FormData()
      fd.append('pdf', file)
      if (question) fd.append('question', question)
      const res  = await fetch('/api/ask-pdf', { method: 'POST', body: fd })
      const data = await res.json()
      onResult(data.solution ?? 'Could not process PDF', data.slug ?? '')
    } catch {
      onResult('PDF processing failed. Please try again.', '')
    } finally {
      onLoading(false)
    }
  }

  if (file) return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0.85rem 1.1rem', background: '#f0f4ff', border: '1.5px solid #c7d2fe', borderRadius: 12, marginBottom: '0.75rem' }}>
        <span style={{ fontSize: 28 }}>📄</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: '#111' }}>{file.name}</div>
          <div style={{ fontSize: 12, color: '#6b7280' }}>{(file.size / 1024).toFixed(0)} KB</div>
        </div>
        <button onClick={() => setFile(null)} style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: 18, cursor: 'pointer', padding: '0 4px' }}>✕</button>
      </div>
      <input
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="What would you like to know from this PDF? (optional)"
        style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', marginBottom: '0.75rem' }}
      />
      <button onClick={handleSolve} style={{ width: '100%', padding: '0.85rem', background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
        🤖 Analyze This PDF
      </button>
    </div>
  )

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => fileRef.current?.click()}
      style={{
        border:       `2px dashed ${dragging ? '#1a3a6b' : '#d1d5db'}`,
        borderRadius: 14,
        padding:      '2.5rem 2rem',
        textAlign:    'center',
        background:   dragging ? '#e8eef8' : '#f9fafb',
        cursor:       'pointer',
        transition:   'all 0.15s',
      }}
    >
      <div style={{ fontSize: 52, marginBottom: '0.75rem' }}>📄</div>
      <p style={{ fontWeight: 700, fontSize: 16, color: '#111', margin: '0 0 0.4rem' }}>Drop your PDF here</p>
      <p style={{ color: '#6b7280', fontSize: 14, margin: '0 0 1rem' }}>or click to browse files</p>
      <div style={{ display: 'inline-block', padding: '0.6rem 1.25rem', background: '#1a3a6b', color: '#fff', borderRadius: 10, fontWeight: 700, fontSize: 14 }}>Choose PDF</div>
      <p style={{ fontSize: 12, color: '#9ca3af', marginTop: '0.75rem' }}>Max 20MB · Textbook chapters, notes, question papers</p>
      <input ref={fileRef} type="file" accept=".pdf" style={{ display: 'none' }} onChange={e => { if (e.target.files?.[0]) setFile(e.target.files[0]) }} />
    </div>
  )
}
