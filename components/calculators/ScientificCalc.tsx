'use client'
// components/calculators/ScientificCalc.tsx

import { useState } from 'react'

export default function ScientificCalc() {
  const [expr,   setExpr]   = useState('')
  const [result, setResult] = useState('')

  function press(val: string) {
    if (val === '=') {
      try {
        const safe = expr.replace(/sin/g,'Math.sin').replace(/cos/g,'Math.cos').replace(/tan/g,'Math.tan').replace(/log/g,'Math.log10').replace(/ln/g,'Math.log').replace(/√/g,'Math.sqrt').replace(/π/g,'Math.PI').replace(/\^/g,'**')
        // eslint-disable-next-line no-eval
        const ans = eval(safe)
        setResult(String(Math.round(ans * 1e10) / 1e10))
        setExpr(String(Math.round(ans * 1e10) / 1e10))
      } catch { setResult('Error') }
    } else if (val === 'C') { setExpr(''); setResult('') }
    else if (val === '⌫') { setExpr(e => e.slice(0, -1)) }
    else { setExpr(e => e + val) }
  }

  const ROWS = [
    ['sin(','cos(','tan(','log(','ln('],
    ['√(','π','(',')','^'],
    ['7','8','9','÷','C'],
    ['4','5','6','×','⌫'],
    ['1','2','3','-','='],
    ['0','.','00','+','='],
  ]

  const SPECIAL = new Set(['=','C','÷','×','+','-'])

  return (
    <div style={{ maxWidth: 340, margin: '0 auto' }}>
      <div style={{ background: '#1a3a6b', borderRadius: 14, padding: '1rem 1.25rem', marginBottom: '0.75rem', minHeight: 70 }}>
        <div style={{ color: '#93c5fd', fontSize: 13, minHeight: 20 }}>{expr}</div>
        <div style={{ color: '#fff', fontSize: 28, fontWeight: 700, fontFamily: 'monospace', textAlign: 'right' }}>{result || '0'}</div>
      </div>
      {ROWS.map((row, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: `repeat(${row.length}, 1fr)`, gap: 6, marginBottom: 6 }}>
          {row.map(k => (
            <button key={k} onClick={() => press(k === '÷' ? '/' : k === '×' ? '*' : k)}
              style={{ padding: '0.7rem 0.25rem', borderRadius: 10, border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer', background: k === '=' ? '#1a3a6b' : SPECIAL.has(k) ? '#e8eef8' : '#f3f4f6', color: k === '=' ? '#fff' : SPECIAL.has(k) ? '#1a3a6b' : '#111' }}>
              {k}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}
