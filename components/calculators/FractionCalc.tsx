'use client'
// components/calculators/FractionCalc.tsx

import { useState } from 'react'

function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b) }
function simplify(n: number, d: number) { const g = gcd(Math.abs(n), Math.abs(d)); return { n: n / g, d: d / g } }

export default function FractionCalc() {
  const [n1, setN1] = useState(''); const [d1, setD1] = useState('1')
  const [n2, setN2] = useState(''); const [d2, setD2] = useState('1')
  const [op, setOp] = useState('+')

  function compute() {
    const a = parseInt(n1), b = parseInt(d1), c = parseInt(n2), d = parseInt(d2)
    if (!a || !b || !c || !d || b === 0 || d === 0) return null
    let rn = 0, rd = 0
    if (op === '+') { rn = a * d + c * b; rd = b * d }
    else if (op === '-') { rn = a * d - c * b; rd = b * d }
    else if (op === '×') { rn = a * c; rd = b * d }
    else if (op === '÷') { rn = a * d; rd = b * c }
    if (rd === 0) return null
    const s = simplify(rn, rd)
    return { n: s.n, d: s.d, decimal: (s.n / s.d).toFixed(6).replace(/\.?0+$/, '') }
  }

  const result = compute()

  return (
    <div style={{ maxWidth: 480 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <input type="number" value={n1} onChange={e => setN1(e.target.value)} style={{ width: 72, padding: '0.6rem', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 20, textAlign: 'center' }} />
          <div style={{ height: 3, width: 72, background: '#1a3a6b', borderRadius: 2 }} />
          <input type="number" value={d1} onChange={e => setD1(e.target.value)} style={{ width: 72, padding: '0.6rem', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 20, textAlign: 'center' }} />
        </div>

        <select value={op} onChange={e => setOp(e.target.value)} style={{ fontSize: 22, fontWeight: 800, padding: '0.5rem', border: '1.5px solid #d1d5db', borderRadius: 10, background: '#fff', color: '#1a3a6b' }}>
          {['+','-','×','÷'].map(o => <option key={o} value={o}>{o}</option>)}
        </select>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <input type="number" value={n2} onChange={e => setN2(e.target.value)} style={{ width: 72, padding: '0.6rem', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 20, textAlign: 'center' }} />
          <div style={{ height: 3, width: 72, background: '#1a3a6b', borderRadius: 2 }} />
          <input type="number" value={d2} onChange={e => setD2(e.target.value)} style={{ width: 72, padding: '0.6rem', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 20, textAlign: 'center' }} />
        </div>
      </div>

      {result && (
        <div style={{ background: '#e8eef8', borderRadius: 14, padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 8 }}>Result</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, marginBottom: 8 }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#1a3a6b' }}>{result.n}</div>
            <div style={{ height: 3, width: 60, background: '#1a3a6b' }} />
            <div style={{ fontSize: 28, fontWeight: 900, color: '#1a3a6b' }}>{result.d}</div>
          </div>
          <div style={{ fontSize: 16, color: '#374151' }}>= {result.decimal}</div>
        </div>
      )}
    </div>
  )
}
