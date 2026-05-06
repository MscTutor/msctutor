'use client'
// app/admin/content/upload-pdf/page.tsx

import { useState, useRef } from 'react'
import { BOARDS, SUBJECTS }  from '@/lib/constants'

export default function UploadPDFPage() {
  const [file,    setFile]    = useState<File | null>(null)
  const [form,    setForm]    = useState({ subject: 'mathematics', classLevel: '9', board: 'CBSE' })
  const [result,  setResult]  = useState<{ pagesCreated: number; pages: string[] } | null>(null)
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function upload() {
    if (!file) return
    setLoading(true)
    const fd = new FormData()
    fd.append('pdf', file)
    fd.append('subject',    form.subject)
    fd.append('classLevel', form.classLevel)
    fd.append('board',      form.board)
    fd.append('uploadedBy', 'admin')
    fd.append('role',       'admin')
    try {
      const res  = await fetch('/api/upload/pdf', { method: 'POST', body: fd })
      const data = await res.json()
      setResult(data)
    } catch { alert('Upload failed') }
    setLoading(false)
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 700 }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111', margin: '0 0 0.5rem' }}>PDF → Auto Pages</h1>
      <p style={{ color: '#6b7280', fontSize: 14, marginBottom: '1.5rem' }}>Upload a textbook PDF — system auto-creates chapter pages with AI content and free diagrams.</p>

      {result ? (
        <div style={{ background: '#dcfce7', border: '1.5px solid #bbf7d0', borderRadius: 16, padding: '1.5rem' }}>
          <div style={{ fontSize: 48, textAlign: 'center' }}>✅</div>
          <h2 style={{ textAlign: 'center', color: '#166534', fontSize: 20, fontWeight: 800 }}>{result.pagesCreated} pages created!</h2>
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {result.pages.map(p => (
              <a key={p} href={p} target="_blank" style={{ color: '#166534', fontSize: 13, fontFamily: 'monospace' }}>{p}</a>
            ))}
          </div>
          <button onClick={() => { setFile(null); setResult(null) }} style={{ display: 'block', marginTop: '1.25rem', background: '#166534', color: '#fff', border: 'none', borderRadius: 10, padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', width: '100%' }}>Upload Another PDF</button>
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 4 }}>Subject</label>
              <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} style={{ width: '100%', padding: '0.65rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 13, background: '#fff' }}>
                {SUBJECTS.map(s => <option key={s.slug} value={s.slug}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 4 }}>Class</label>
              <select value={form.classLevel} onChange={e => setForm(f => ({ ...f, classLevel: e.target.value }))} style={{ width: '100%', padding: '0.65rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 13, background: '#fff' }}>
                {['6','7','8','9','10','11','12'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 4 }}>Board</label>
              <select value={form.board} onChange={e => setForm(f => ({ ...f, board: e.target.value }))} style={{ width: '100%', padding: '0.65rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 13, background: '#fff' }}>
                {BOARDS.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
          </div>

          <div onClick={() => fileRef.current?.click()} style={{ border: '2px dashed #d1d5db', borderRadius: 14, padding: '2.5rem', textAlign: 'center', cursor: 'pointer', background: file ? '#f0f4ff' : '#f9fafb', marginBottom: '1rem' }}>
            <div style={{ fontSize: 48, marginBottom: '0.5rem' }}>📄</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#111' }}>{file ? file.name : 'Click to select PDF'}</div>
            {file && <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>{(file.size / 1024 / 1024).toFixed(2)} MB</div>}
            <input ref={fileRef} type="file" accept=".pdf" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && setFile(e.target.files[0])} />
          </div>

          <button onClick={upload} disabled={!file || loading} style={{ width: '100%', padding: '0.9rem', background: !file || loading ? '#9ca3af' : '#1a3a6b', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: !file || loading ? 'default' : 'pointer' }}>
            {loading ? '⏳ Processing PDF (may take 2-3 min)...' : '🤖 Upload & Auto-Generate Pages'}
          </button>
        </div>
      )}
    </div>
  )
}
