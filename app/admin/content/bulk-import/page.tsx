'use client'
// app/admin/content/bulk-import/page.tsx

import { useState, useRef } from 'react'

export default function BulkImportPage() {
  const [file,     setFile]     = useState<File | null>(null)
  const [result,   setResult]   = useState<{ created: number; errors?: string[] } | null>(null)
  const [loading,  setLoading]  = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleImport() {
    if (!file) return
    setLoading(true)
    const fd = new FormData()
    fd.append('csv', file)
    try {
      const res  = await fetch('/api/upload/pdf', { method: 'POST', body: fd })
      const data = await res.json()
      setResult(data)
    } catch { setResult({ created: 0, errors: ['Import failed'] }) }
    setLoading(false)
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 700 }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111', margin: '0 0 0.5rem' }}>Bulk Import Questions</h1>
      <p style={{ color: '#6b7280', fontSize: 14, marginBottom: '1.5rem' }}>Upload a CSV file to create multiple question pages at once.</p>

      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: '0.75rem' }}>CSV Format</h2>
        <div style={{ background: '#f9fafb', borderRadius: 10, padding: '1rem', fontFamily: 'monospace', fontSize: 13, color: '#374151', lineHeight: 1.8 }}>
          question,subject,class,board,answer,difficulty<br/>
          What is Newton second law?,physics,9,CBSE,F=ma,medium<br/>
          Solve 2x+5=11,mathematics,8,CBSE,x=3,easy
        </div>
      </div>

      {result ? (
        <div style={{ background: result.created > 0 ? '#dcfce7' : '#fee2e2', borderRadius: 14, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: 36 }}>{result.created > 0 ? '✅' : '❌'}</div>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginTop: '0.5rem', color: result.created > 0 ? '#166534' : '#dc2626' }}>
            {result.created} questions imported
          </h2>
          {result.errors && <p style={{ color: '#dc2626', fontSize: 13 }}>{result.errors.join(', ')}</p>}
          <button onClick={() => { setFile(null); setResult(null) }} style={{ marginTop: '1rem', background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 10, padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Import Another</button>
        </div>
      ) : (
        <div>
          <div onClick={() => fileRef.current?.click()} style={{ border: '2px dashed #d1d5db', borderRadius: 14, padding: '3rem', textAlign: 'center', cursor: 'pointer', background: file ? '#f0f4ff' : '#f9fafb' }}>
            <div style={{ fontSize: 48, marginBottom: '0.75rem' }}>{file ? '📊' : '📥'}</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#111' }}>{file ? file.name : 'Click to select CSV file'}</div>
            {file && <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>{(file.size / 1024).toFixed(0)} KB</div>}
            <input ref={fileRef} type="file" accept=".csv" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && setFile(e.target.files[0])} />
          </div>
          {file && (
            <button onClick={handleImport} disabled={loading} style={{ width: '100%', marginTop: '1rem', padding: '0.9rem', background: loading ? '#93c5fd' : '#1a3a6b', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
              {loading ? '⏳ Importing...' : '📥 Start Import'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
