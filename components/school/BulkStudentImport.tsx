'use client'
// components/school/BulkStudentImport.tsx — CSV upload for students

import { useState, useRef } from 'react'

interface Props { classId?: number; onImported: (count: number) => void }

export default function BulkStudentImport({ classId, onImported }: Props) {
  const [file,      setFile]      = useState<File | null>(null)
  const [importing, setImporting] = useState(false)
  const [preview,   setPreview]   = useState<{ name: string; roll?: string; phone?: string }[]>([])
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    const { default: Papa } = await import('papaparse')
    Papa.parse(f, {
      header: true, skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as Record<string, string>[]
        setPreview(rows.slice(0, 5).map(r => ({ name: r.name ?? r.Name ?? '', roll: r.roll_number ?? r['Roll No'] ?? '', phone: r.phone ?? '' })))
      },
    })
  }

  async function doImport() {
    if (!file) return
    setImporting(true)
    const { default: Papa } = await import('papaparse')
    Papa.parse(file, {
      header: true, skipEmptyLines: true,
      complete: async (results) => {
        const rows = results.data as Record<string, string>[]
        const students = rows.map(r => ({
          name:        r.name ?? r.Name ?? '',
          rollNumber:  r.roll_number ?? r['Roll No'] ?? undefined,
          phone:       r.phone ?? undefined,
          parentPhone: r.parent_phone ?? undefined,
        })).filter(s => s.name)
        const res  = await fetch('/api/school/student', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ students }) })
        const data = await res.json()
        onImported(data.created ?? 0)
        setFile(null); setPreview([]); setImporting(false)
      },
    })
  }

  return (
    <div>
      <div onClick={() => fileRef.current?.click()} style={{ border: '2px dashed #d1d5db', borderRadius: 14, padding: '2rem', textAlign: 'center', cursor: 'pointer', background: '#f9fafb', marginBottom: '1rem' }}>
        <div style={{ fontSize: 36, marginBottom: '0.5rem' }}>📥</div>
        <div style={{ fontWeight: 700, fontSize: 15, color: '#111' }}>{file ? file.name : 'Click to upload CSV'}</div>
        <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Columns: name, roll_number, phone, parent_phone</div>
        <input ref={fileRef} type="file" accept=".csv" style={{ display: 'none' }} onChange={handleFile} />
      </div>

      {preview.length > 0 && (
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden', marginBottom: '1rem' }}>
          <div style={{ padding: '0.75rem 1rem', background: '#f9fafb', fontSize: 13, fontWeight: 700, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
            Preview (first 5 rows):
          </div>
          {preview.map((s, i) => (
            <div key={i} style={{ padding: '0.6rem 1rem', borderBottom: '1px solid #f3f4f6', fontSize: 13, color: '#374151', display: 'flex', gap: '1rem' }}>
              <span style={{ fontWeight: 600 }}>{s.name}</span>
              {s.roll  && <span style={{ color: '#6b7280' }}>Roll: {s.roll}</span>}
              {s.phone && <span style={{ color: '#6b7280' }}>📱 {s.phone}</span>}
            </div>
          ))}
        </div>
      )}

      {file && (
        <button onClick={doImport} disabled={importing}
          style={{ width: '100%', padding: '0.85rem', background: importing ? '#93c5fd' : '#1a3a6b', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: importing ? 'default' : 'pointer' }}>
          {importing ? '⏳ Importing...' : '📥 Import All Students'}
        </button>
      )}
    </div>
  )
}
