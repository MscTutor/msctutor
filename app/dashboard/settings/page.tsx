'use client'
// app/dashboard/settings/page.tsx

import { useState } from 'react'
import { LANGUAGES } from '@/lib/constants'

export default function SettingsPage() {
  const [name,     setName]     = useState('')
  const [lang,     setLang]     = useState('en')
  const [notifs,   setNotifs]   = useState(true)
  const [saved,    setSaved]    = useState(false)

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <main style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', margin: '0 0 1.5rem' }}>Settings</h1>
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.5rem' }}>
        <form onSubmit={handleSave}>
          {saved && <div style={{ background: '#dcfce7', color: '#166534', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: 14, fontWeight: 600 }}>✓ Settings saved!</div>}

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Display Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 15, boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Preferred Language</label>
            <select value={lang} onChange={e => setLang(e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 15, background: '#fff' }}>
              {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name} — {l.nativeName}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: '#f9fafb', borderRadius: 10 }}>
            <div>
              <div style={{ fontWeight: 600, color: '#111', fontSize: 14 }}>Push Notifications</div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>Attendance, exam results, homework alerts</div>
            </div>
            <button type="button" onClick={() => setNotifs(!notifs)} style={{ width: 48, height: 26, borderRadius: 13, border: 'none', background: notifs ? '#1a3a6b' : '#d1d5db', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: notifs ? 25 : 3, transition: 'left 0.2s' }} />
            </button>
          </div>

          <button type="submit" style={{ width: '100%', padding: '0.85rem', background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            Save Settings
          </button>
        </form>
      </div>
    </main>
  )
}
