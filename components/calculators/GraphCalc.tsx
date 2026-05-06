'use client'
// components/calculators/GraphCalc.tsx — Simple function plotter

import { useEffect, useRef, useState } from 'react'

export default function GraphCalc() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [fn,    setFn]    = useState('x^2')
  const [xMin,  setXMin]  = useState('-10')
  const [xMax,  setXMax]  = useState('10')
  const [error, setError] = useState('')

  function plot() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W = canvas.width, H = canvas.height
    ctx.clearRect(0, 0, W, H)

    const xmin = parseFloat(xMin) || -10
    const xmax = parseFloat(xMax) || 10
    const toX = (x: number) => ((x - xmin) / (xmax - xmin)) * W
    const toY = (y: number) => H / 2 - (y * H / (xmax - xmin))

    // Grid
    ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 1
    for (let x = Math.ceil(xmin); x <= xmax; x++) {
      ctx.beginPath(); ctx.moveTo(toX(x), 0); ctx.lineTo(toX(x), H); ctx.stroke()
    }
    // Axes
    ctx.strokeStyle = '#374151'; ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(0, H/2); ctx.lineTo(W, H/2); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(toX(0), 0); ctx.lineTo(toX(0), H); ctx.stroke()

    // Plot
    try {
      const safe = fn.replace(/\^/g,'**').replace(/sin/g,'Math.sin').replace(/cos/g,'Math.cos').replace(/tan/g,'Math.tan').replace(/sqrt/g,'Math.sqrt').replace(/log/g,'Math.log').replace(/abs/g,'Math.abs')
      ctx.strokeStyle = '#1a3a6b'; ctx.lineWidth = 2.5
      ctx.beginPath()
      let first = true
      for (let px = 0; px < W; px++) {
        const x = xmin + (px / W) * (xmax - xmin)
        // eslint-disable-next-line no-eval
        const y = eval(safe.replace(/x/g, `(${x})`))
        if (!isFinite(y)) { first = true; continue }
        if (first) { ctx.moveTo(px, toY(y)); first = false }
        else ctx.lineTo(px, toY(y))
      }
      ctx.stroke()
      setError('')
    } catch { setError('Invalid function — check syntax') }
  }

  useEffect(() => { plot() }, [fn, xMin, xMax]) // eslint-disable-line

  return (
    <div style={{ maxWidth: 560 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '0.6rem', marginBottom: '0.75rem', alignItems: 'end' }}>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 4 }}>f(x) =</label>
          <input value={fn} onChange={e => setFn(e.target.value)} placeholder="x^2" style={{ width: '100%', padding: '0.7rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 16, fontFamily: 'monospace', boxSizing: 'border-box' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 4 }}>x min</label>
          <input type="number" value={xMin} onChange={e => setXMin(e.target.value)} style={{ width: 64, padding: '0.7rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 4 }}>x max</label>
          <input type="number" value={xMax} onChange={e => setXMax(e.target.value)} style={{ width: 64, padding: '0.7rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14 }} />
        </div>
      </div>

      {error && <div style={{ color: '#dc2626', fontSize: 13, marginBottom: '0.5rem' }}>{error}</div>}

      <canvas ref={canvasRef} width={520} height={320}
        style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: 12, background: '#fff', display: 'block' }} />

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
        {['x^2','sin(x)','cos(x)','x^3-3*x','1/x','sqrt(x)','tan(x)'].map(f => (
          <button key={f} onClick={() => setFn(f)} style={{ padding: '4px 10px', borderRadius: 20, border: '1px solid #e5e7eb', background: '#f9fafb', color: '#374151', fontSize: 12, cursor: 'pointer', fontFamily: 'monospace' }}>{f}</button>
        ))}
      </div>
    </div>
  )
}
