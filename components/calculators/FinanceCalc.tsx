'use client'
// components/calculators/FinanceCalc.tsx

import { useState } from 'react'

type Mode = 'simple' | 'compound' | 'gst' | 'emi'

export default function FinanceCalc() {
  const [mode, setMode] = useState<Mode>('simple')
  const [v, setV] = useState<Record<string, string>>({})
  const get = (k: string) => parseFloat(v[k] ?? '') || 0
  const fmt = (n: number) => '₹' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const field = (label: string, placeholder?: string) => (
    <div key={label}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 4 }}>{label}</label>
      <input type="number" value={v[label] ?? ''} onChange={e => setV(x => ({ ...x, [label]: e.target.value }))} placeholder={placeholder}
        style={{ width: '100%', padding: '0.7rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 15, boxSizing: 'border-box' }} />
    </div>
  )

  function results(): { label: string; value: string }[] {
    const p = get('Principal (₹)'), r = get('Rate (% per year)'), t = get('Time (years)'), n = get('Times Compounded/year') || 1
    const amount = get('Amount (₹)'), gst = get('GST Rate (%)'), loan = get('Loan Amount (₹)'), tenure = get('Tenure (months)'), emiR = get('Rate (% per year)')/1200
    switch (mode) {
      case 'simple':
        return [
          { label: 'Simple Interest', value: fmt((p*r*t)/100) },
          { label: 'Total Amount',    value: fmt(p + (p*r*t)/100) },
        ]
      case 'compound': {
        const ca = p * Math.pow(1 + r/(n*100), n*t)
        return [
          { label: 'Total Amount',   value: fmt(ca) },
          { label: 'Compound Interest', value: fmt(ca - p) },
        ]
      }
      case 'gst':
        return [
          { label: 'GST Amount',     value: fmt((amount * gst) / 100) },
          { label: 'Total with GST', value: fmt(amount + (amount * gst) / 100) },
          { label: 'Base (excl. GST)', value: fmt(amount / (1 + gst/100)) },
        ]
      case 'emi': {
        const emi = emiR ? loan * emiR * Math.pow(1+emiR, tenure) / (Math.pow(1+emiR, tenure) - 1) : loan / tenure
        return [
          { label: 'Monthly EMI',      value: fmt(emi) },
          { label: 'Total Payment',    value: fmt(emi * tenure) },
          { label: 'Total Interest',   value: fmt(emi * tenure - loan) },
        ]
      }
    }
  }

  const TABS: { id: Mode; label: string }[] = [{ id: 'simple', label: 'Simple Interest' }, { id: 'compound', label: 'Compound Interest' }, { id: 'gst', label: 'GST Calculator' }, { id: 'emi', label: 'EMI Calculator' }]

  const FIELDS: Record<Mode, string[]> = {
    simple:   ['Principal (₹)', 'Rate (% per year)', 'Time (years)'],
    compound: ['Principal (₹)', 'Rate (% per year)', 'Time (years)', 'Times Compounded/year'],
    gst:      ['Amount (₹)', 'GST Rate (%)'],
    emi:      ['Loan Amount (₹)', 'Rate (% per year)', 'Tenure (months)'],
  }

  const res = results()

  return (
    <div style={{ maxWidth: 480 }}>
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => { setMode(t.id); setV({}) }}
            style={{ padding: '0.45rem 0.9rem', borderRadius: 20, border: mode === t.id ? '2px solid #1a3a6b' : '1.5px solid #e5e7eb', background: mode === t.id ? '#e8eef8' : '#fff', color: mode === t.id ? '#1a3a6b' : '#374151', fontWeight: 700, cursor: 'pointer', fontSize: 12 }}>
            {t.label}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
        {FIELDS[mode].map(f => field(f))}
      </div>
      {res.some(r => r.value !== '₹NaN' && !r.value.includes('NaN')) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {res.filter(r => !r.value.includes('NaN')).map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: '#e8eef8', borderRadius: 10 }}>
              <span style={{ fontSize: 14, color: '#374151' }}>{r.label}</span>
              <span style={{ fontWeight: 800, color: '#1a3a6b', fontSize: 16 }}>{r.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
