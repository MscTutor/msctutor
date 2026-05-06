'use client'
// components/calculators/StatsCalc.tsx

import { useState } from 'react'

export default function StatsCalc() {
  const [input, setInput] = useState('')

  const nums = input.split(/[\s,]+/).map(Number).filter(n => !isNaN(n) && input.trim())
  const n    = nums.length

  function mean()   { return n ? nums.reduce((a, b) => a + b, 0) / n : 0 }
  function median() { const s = [...nums].sort((a,b) => a-b); return n % 2 ? s[Math.floor(n/2)] : (s[n/2-1]+s[n/2])/2 }
  function mode()   { const freq: Record<number,number> = {}; nums.forEach(x => { freq[x] = (freq[x]||0)+1 }); const max = Math.max(...Object.values(freq)); return Object.keys(freq).filter(k => freq[+k] === max).join(', ') }
  function sd()     { const m = mean(); return Math.sqrt(nums.reduce((a,b) => a+(b-m)**2,0)/n) }
  function range()  { return n ? Math.max(...nums) - Math.min(...nums) : 0 }

  const stats = n > 0 ? [
    { label: 'Count (n)',          value: n },
    { label: 'Sum',                value: nums.reduce((a,b)=>a+b,0).toFixed(4).replace(/\.?0+$/,'') },
    { label: 'Mean (Average)',     value: mean().toFixed(4).replace(/\.?0+$/,'') },
    { label: 'Median',            value: median().toFixed(4).replace(/\.?0+$/,'') },
    { label: 'Mode',              value: mode() },
    { label: 'Std Deviation (σ)', value: sd().toFixed(4).replace(/\.?0+$/,'') },
    { label: 'Variance (σ²)',     value: (sd()**2).toFixed(4).replace(/\.?0+$/,'') },
    { label: 'Range',             value: range() },
    { label: 'Min',               value: Math.min(...nums) },
    { label: 'Max',               value: Math.max(...nums) },
  ] : []

  return (
    <div style={{ maxWidth: 480 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Enter numbers (comma or space separated)</label>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="e.g. 12, 15, 18, 22, 8, 35" rows={3}
        style={{ width: '100%', padding: '0.85rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 12, fontSize: 15, boxSizing: 'border-box', resize: 'vertical', fontFamily: 'monospace' }} />
      {stats.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
          {stats.map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 1rem', background: '#f9fafb', borderRadius: 10 }}>
              <span style={{ fontSize: 14, color: '#374151' }}>{s.label}</span>
              <span style={{ fontWeight: 800, color: '#1a3a6b', fontSize: 15, fontFamily: 'monospace' }}>{s.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
