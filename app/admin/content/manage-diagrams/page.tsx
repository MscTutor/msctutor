'use client'
// app/admin/content/manage-diagrams/page.tsx
// Admin can add/manage diagrams for chapters

import { useState } from 'react'
import Link from 'next/link'

interface Diagram {
  id: number
  title: string
  chapter: string
  subject: string
  class: string
  url: string
  type: 'image' | 'svg' | 'gif'
  source: string
  license: string
  addedOn: string
}

type DiagramForm = Omit<Diagram, 'id' | 'addedOn'>

const SAMPLE_DIAGRAMS: Diagram[] = [
  { id: 1, title: 'Photosynthesis Process', chapter: 'Life Processes', subject: 'Biology', class: '10', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Photosynthesis.gif/320px-Photosynthesis.gif', type: 'gif', source: 'Wikimedia Commons', license: 'CC-BY', addedOn: '2025-01-15' },
  { id: 2, title: 'Water Cycle Diagram', chapter: 'Natural Resources', subject: 'Science', class: '9', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Water_cycle.png/320px-Water_cycle.png', type: 'image', source: 'Wikimedia Commons', license: 'CC0', addedOn: '2025-01-16' },
  { id: 3, title: 'Newton Laws Motion', chapter: 'Force and Laws', subject: 'Physics', class: '9', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Newtons_law_animation.gif/320px-Newtons_law_animation.gif', type: 'gif', source: 'Wikimedia Commons', license: 'CC-BY', addedOn: '2025-01-17' },
]

export default function ManageDiagrams() {
  const [diagrams, setDiagrams]   = useState<Diagram[]>(SAMPLE_DIAGRAMS)
  const [showAdd,  setShowAdd]    = useState(false)
  const [search,   setSearch]     = useState('')
  const [filter,   setFilter]     = useState('all')
  const [form,     setForm]       = useState<DiagramForm>({ title: '', chapter: '', subject: 'Mathematics', class: '9', url: '', type: 'image', source: 'Wikimedia Commons', license: 'CC0' })
  const [preview,  setPreview]    = useState<Diagram | null>(null)

  const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Science', 'Social Science', 'English', 'Hindi']
  const CLASSES  = ['1','2','3','4','5','6','7','8','9','10','11','12']
  const TYPES    = ['all', 'image', 'svg', 'gif']

  const filtered = diagrams.filter(d => {
    const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase()) || d.chapter.toLowerCase().includes(search.toLowerCase())
    const matchType   = filter === 'all' || d.type === filter
    return matchSearch && matchType
  })

  function addDiagram() {
    if (!form.title || !form.url) return
    const newDiagram: Diagram = { id: Date.now(), ...form, addedOn: new Date().toISOString().split('T')[0] }
    setDiagrams(prev => [newDiagram, ...prev])
    setShowAdd(false)
    setForm({ title: '', chapter: '', subject: 'Mathematics', class: '9', url: '', type: 'image', source: 'Wikimedia Commons', license: 'CC0' })
  }

  function deleteDiagram(id: number) {
    if (confirm('Delete this diagram?')) setDiagrams(prev => prev.filter(d => d.id !== id))
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fc' }}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/admin" style={{ color: '#1a3a6b', textDecoration: 'none', fontSize: 14 }}>← Admin</Link>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 20, fontWeight: 900, color: '#111', margin: 0 }}>🖼️ Manage Diagrams</h1>
          <p style={{ color: '#6b7280', fontSize: 13, margin: '2px 0 0' }}>Add copyright-free diagrams, GIFs and SVGs for chapters</p>
        </div>
        <button onClick={() => setShowAdd(true)}
          style={{ padding: '9px 18px', background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
          + Add Diagram
        </button>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1.5rem 1rem' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Total Diagrams', val: diagrams.length,                                     bg: '#e8eef8', color: '#1a3a6b' },
            { label: 'Images',         val: diagrams.filter(d => d.type === 'image').length,     bg: '#eff6ff', color: '#0369a1' },
            { label: 'GIF Animations', val: diagrams.filter(d => d.type === 'gif').length,       bg: '#e8f5ef', color: '#0a5e3f' },
            { label: 'SVG Diagrams',   val: diagrams.filter(d => d.type === 'svg').length,       bg: '#f5f3ff', color: '#7c3aed' },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, borderRadius: 14, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: s.color, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search diagrams..."
            style={{ flex: 1, minWidth: 200, padding: '9px 14px', border: '1.5px solid #e5e7eb', borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
          <div style={{ display: 'flex', gap: 4, background: '#fff', borderRadius: 10, padding: 4, border: '1px solid #e5e7eb' }}>
            {TYPES.map(t => (
              <button key={t} onClick={() => setFilter(t)}
                style={{ padding: '6px 12px', borderRadius: 7, border: 'none', fontWeight: 700, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', background: filter === t ? '#1a3a6b' : 'transparent', color: filter === t ? '#fff' : '#6b7280', textTransform: 'capitalize' }}>
                {t === 'all' ? 'All' : t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Diagram Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {filtered.map(d => (
            <div key={d.id} style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
              {/* Preview */}
              <div style={{ height: 160, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}
                onClick={() => setPreview(d)}>
                <img src={d.url} alt={d.title} loading="lazy"
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                <div style={{ position: 'absolute', top: 8, right: 8 }}>
                  <span style={{ background: d.type === 'gif' ? '#e8f5ef' : d.type === 'svg' ? '#f5f3ff' : '#e8eef8', color: d.type === 'gif' ? '#0a5e3f' : d.type === 'svg' ? '#7c3aed' : '#1a3a6b', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 20 }}>
                    {d.type.toUpperCase()}
                  </span>
                </div>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.opacity = '1'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0.3)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.opacity = '0'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0)' }}>
                  <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>🔍 Preview</span>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '0.875rem' }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#111', marginBottom: 4 }}>{d.title}</div>
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>{d.chapter} • {d.subject} • Class {d.class}</div>
                <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
                  <span style={{ fontSize: 10, background: '#f3f4f6', color: '#374151', padding: '2px 6px', borderRadius: 20 }}>{d.license}</span>
                  <span style={{ fontSize: 10, background: '#f3f4f6', color: '#374151', padding: '2px 6px', borderRadius: 20 }}>{d.source}</span>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <a href={d.url} target="_blank" rel="noopener noreferrer"
                    style={{ flex: 1, padding: '6px', background: '#e8eef8', color: '#1a3a6b', borderRadius: 8, textAlign: 'center', textDecoration: 'none', fontSize: 12, fontWeight: 700 }}>
                    🔗 View
                  </a>
                  <button onClick={() => deleteDiagram(d.id)}
                    style={{ padding: '6px 10px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
            <div style={{ fontSize: 48, marginBottom: '1rem' }}>🖼️</div>
            <p>No diagrams found. Add your first diagram!</p>
          </div>
        )}

        {/* Wikimedia Search Help */}
        <div style={{ marginTop: '1.5rem', background: '#e8eef8', borderRadius: 14, padding: '1.25rem', border: '1px solid #c7d5f0' }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#1a3a6b', marginBottom: 8 }}>💡 Free Copyright Diagram Sources</div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {[
              { label: '🖼️ Wikimedia Commons', url: 'https://commons.wikimedia.org' },
              { label: '📚 PhET Simulations', url: 'https://phet.colorado.edu' },
              { label: '🔬 Open Clip Art', url: 'https://openclipart.org' },
              { label: '🎨 Pixabay Science', url: 'https://pixabay.com/vectors' },
            ].map(s => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                style={{ padding: '7px 14px', background: '#fff', borderRadius: 8, textDecoration: 'none', color: '#1a3a6b', fontSize: 13, fontWeight: 700, border: '1px solid #c7d5f0' }}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Add Diagram Modal */}
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: '2rem', width: '100%', maxWidth: 540, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>+ Add New Diagram</h2>
              <button onClick={() => setShowAdd(false)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#6b7280' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {[
                { label: 'Title *', key: 'title', placeholder: 'e.g. Photosynthesis Diagram' },
                { label: 'Chapter Name', key: 'chapter', placeholder: 'e.g. Life Processes' },
                { label: 'Image/GIF URL *', key: 'url', placeholder: 'https://upload.wikimedia.org/...' },
                { label: 'Source', key: 'source', placeholder: 'e.g. Wikimedia Commons' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 4 }}>{f.label}</label>
                  <input value={(form as Record<string, string>)[f.key]} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e5e7eb', borderRadius: 10, fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 4 }}>Type</label>
                  <select value={form.type} onChange={e => setForm(prev => ({ ...prev, type: e.target.value as 'image' | 'svg' | 'gif' }))}
                    style={{ width: '100%', padding: '9px', border: '1.5px solid #e5e7eb', borderRadius: 10, fontSize: 13 }}>
                    <option value="image">Image</option>
                    <option value="gif">GIF</option>
                    <option value="svg">SVG</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 4 }}>Subject</label>
                  <select value={form.subject} onChange={e => setForm(prev => ({ ...prev, subject: e.target.value }))}
                    style={{ width: '100%', padding: '9px', border: '1.5px solid #e5e7eb', borderRadius: 10, fontSize: 13 }}>
                    {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 4 }}>Class</label>
                  <select value={form.class} onChange={e => setForm(prev => ({ ...prev, class: e.target.value }))}
                    style={{ width: '100%', padding: '9px', border: '1.5px solid #e5e7eb', borderRadius: 10, fontSize: 13 }}>
                    {CLASSES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 4 }}>License</label>
                <select value={form.license} onChange={e => setForm(prev => ({ ...prev, license: e.target.value }))}
                  style={{ width: '100%', padding: '9px', border: '1.5px solid #e5e7eb', borderRadius: 10, fontSize: 13 }}>
                  <option value="CC0">CC0 — Public Domain</option>
                  <option value="CC-BY">CC-BY — Attribution</option>
                  <option value="CC-BY-SA">CC-BY-SA</option>
                  <option value="CC-BY-NC">CC-BY-NC</option>
                </select>
              </div>
              {/* URL Preview */}
              {form.url && (
                <div style={{ background: '#f9fafb', borderRadius: 10, padding: '0.75rem', textAlign: 'center' }}>
                  <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>Preview:</div>
                  <img src={form.url} alt="preview" style={{ maxWidth: '100%', maxHeight: 150, objectFit: 'contain' }}
                    onError={e => { (e.target as HTMLImageElement).alt = 'Invalid URL — image not found' }} />
                </div>
              )}
              <button onClick={addDiagram}
                style={{ padding: '12px', background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 800, cursor: 'pointer', fontSize: 15, fontFamily: 'inherit' }}>
                ✅ Add Diagram
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {preview && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          onClick={() => setPreview(null)}>
          <div style={{ background: '#fff', borderRadius: 20, padding: '1.5rem', maxWidth: 600, width: '100%' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800 }}>{preview.title}</h3>
              <button onClick={() => setPreview(null)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}>✕</button>
            </div>
            <img src={preview.url} alt={preview.title} style={{ width: '100%', maxHeight: 350, objectFit: 'contain', borderRadius: 12 }} />
            <div style={{ marginTop: '1rem', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ background: '#e8eef8', color: '#1a3a6b', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>{preview.subject} — Class {preview.class}</span>
              <span style={{ background: '#f3f4f6', color: '#374151', fontSize: 12, padding: '4px 10px', borderRadius: 20 }}>{preview.license}</span>
              <span style={{ background: '#f3f4f6', color: '#374151', fontSize: 12, padding: '4px 10px', borderRadius: 20 }}>{preview.source}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
