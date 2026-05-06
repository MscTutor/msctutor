'use client'
// components/calculators/PercentCalc.tsx

import { useState } from 'react'

export default function PercentCalc() {
  const [a, setA] = useState(''); const [b, setB] = useState('')

  const pct    = a && b ? `${((+a / +b) * 100).toFixed(2)}%` : ''
  const ofVal  = a && b ? (((+a / 100) * +b)).toFixed(4).replace(/\.?0+$/,'') : ''
  const change = a && b ? (((+b - +a) / +a) * 100).toFixed(2) + '%' : ''

  return (
    <div style={{ maxWidth: 420 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 4 }}>Value A</label>
          <input type="number" value={a} onChange={e => setA(e.target.value)} placeholder="e.g. 25" style={{ width: '100%', padding: '0.75rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 16, boxSizing: 'border-box' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 4 }}>Value B</label>
          <input type="number" value={b} onChange={e => setB(e.target.value)} placeholder="e.g. 200" style={{ width: '100%', padding: '0.75rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 16, boxSizing: 'border-box' }} />
        </div>
      </div>
      {a && b && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {[
            { label: 'A is what % of B', value: pct },
            { label: 'A% of B', value: ofVal },
            { label: '% change from A to B', value: change },
            { label: 'A + A% = ', value: a ? (+a + (+a * +b) / 100).toFixed(2) : '' },
            { label: 'GST (B%) on A', value: a && b ? `₹${((+a * +b) / 100).toFixed(2)} (Total: ₹${(+a + (+a * +b) / 100).toFixed(2)})` : '' },
          ].map(r => r.value ? (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: '#f9fafb', borderRadius: 10 }}>
              <span style={{ fontSize: 14, color: '#374151' }}>{r.label}</span>
              <span style={{ fontWeight: 800, color: '#1a3a6b', fontSize: 16 }}>{r.value}</span>
            </div>
          ) : null)}
        </div>
      )}
    </div>
  )
}
