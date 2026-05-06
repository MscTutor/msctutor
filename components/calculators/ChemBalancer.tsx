'use client'
// components/calculators/ChemBalancer.tsx — Ask AI to balance equations

import { useState } from 'react'

export default function ChemBalancer() {
  const [equation, setEquation] = useState('')
  const [result,   setResult]   = useState('')
  const [loading,  setLoading]  = useState(false)

  const EXAMPLES = ['H2 + O2 → H2O', 'CH4 + O2 → CO2 + H2O', 'Fe + O2 → Fe2O3', 'Al + HCl → AlCl3 + H2', 'C3H8 + O2 → CO2 + H2O']

  async function balance() {
    if (!equation.trim()) return
    setLoading(true)
    try {
      const res  = await fetch('/api/ask', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ question: `Balance this chemical equation and explain the steps: ${equation}. Show the balanced equation first, then explain how you balanced each element.` }),
      })
      const data = await res.json()
      setResult(data.solution ?? 'Could not balance equation')
    } catch { setResult('Error: Could not process equation') }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 560 }}>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Chemical Equation</label>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <input value={equation} onChange={e => setEquation(e.target.value)} placeholder="e.g. H2 + O2 → H2O" onKeyDown={e => e.key === 'Enter' && balance()}
            style={{ flex: 1, padding: '0.85rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 12, fontSize: 16, fontFamily: 'monospace' }} />
          <button onClick={balance} disabled={loading || !equation.trim()}
            style={{ padding: '0.85rem 1.25rem', background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: 14, whiteSpace: 'nowrap' }}>
            {loading ? '⏳' : '⚗️ Balance'}
          </button>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
          {EXAMPLES.map(ex => (
            <button key={ex} onClick={() => setEquation(ex)}
              style={{ padding: '3px 10px', borderRadius: 20, border: '1px solid #e5e7eb', background: '#f9fafb', color: '#6b7280', fontSize: 12, cursor: 'pointer' }}>
              {ex}
            </button>
          ))}
        </div>
      </div>

      {result && (
        <div style={{ background: '#f0f4ff', border: '1.5px solid #c7d2fe', borderRadius: 14, padding: '1.25rem' }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#3730a3', marginBottom: '0.75rem' }}>⚗️ Balanced Equation & Explanation</div>
          <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{result}</div>
        </div>
      )}
    </div>
  )
}
