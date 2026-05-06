'use client'
// components/calculators/GeometryCalc.tsx

import { useState } from 'react'

type Shape = 'circle' | 'rectangle' | 'triangle' | 'sphere' | 'cylinder' | 'cone'

const SHAPES: { id: Shape; label: string; emoji: string }[] = [
  { id: 'circle',    label: 'Circle',    emoji: '⭕' },
  { id: 'rectangle', label: 'Rectangle', emoji: '▭'  },
  { id: 'triangle',  label: 'Triangle',  emoji: '△'  },
  { id: 'sphere',    label: 'Sphere',    emoji: '🔵' },
  { id: 'cylinder',  label: 'Cylinder',  emoji: '🟫' },
  { id: 'cone',      label: 'Cone',      emoji: '📐' },
]

export default function GeometryCalc() {
  const [shape, setShape] = useState<Shape>('circle')
  const [vals,  setVals]  = useState<Record<string, string>>({})

  const v = (k: string) => parseFloat(vals[k] ?? '') || 0
  const π = Math.PI
  const fmt = (n: number) => n.toFixed(4).replace(/\.?0+$/, '')

  const INPUTS: Record<Shape, string[]> = {
    circle:    ['Radius (r)'],
    rectangle: ['Length (l)', 'Width (w)'],
    triangle:  ['Base (b)', 'Height (h)', 'Side a', 'Side b', 'Side c'],
    sphere:    ['Radius (r)'],
    cylinder:  ['Radius (r)', 'Height (h)'],
    cone:      ['Radius (r)', 'Height (h)'],
  }

  function results(): { label: string; value: string }[] {
    const r = v('Radius (r)'), l = v('Length (l)'), w = v('Width (w)'), b = v('Base (b)'), h = v('Height (h)')
    const a = v('Side a'), sb = v('Side b'), sc = v('Side c')
    switch (shape) {
      case 'circle':    return [{ label: 'Area', value: fmt(π*r*r) }, { label: 'Circumference', value: fmt(2*π*r) }, { label: 'Diameter', value: fmt(2*r) }]
      case 'rectangle': return [{ label: 'Area', value: fmt(l*w) }, { label: 'Perimeter', value: fmt(2*(l+w)) }, { label: 'Diagonal', value: fmt(Math.sqrt(l*l+w*w)) }]
      case 'triangle':  { const s=(a+sb+sc)/2; return [{ label: 'Area (½bh)', value: fmt(0.5*b*h) }, { label: "Area (Heron's)", value: a&&sb&&sc ? fmt(Math.sqrt(s*(s-a)*(s-sb)*(s-sc))) : '—' }, { label: 'Perimeter', value: a&&sb&&sc ? fmt(a+sb+sc) : '—' }] }
      case 'sphere':    return [{ label: 'Volume', value: fmt((4/3)*π*r**3) }, { label: 'Surface Area', value: fmt(4*π*r*r) }]
      case 'cylinder':  return [{ label: 'Volume', value: fmt(π*r*r*h) }, { label: 'Lateral SA', value: fmt(2*π*r*h) }, { label: 'Total SA', value: fmt(2*π*r*(r+h)) }]
      case 'cone':      { const sl=Math.sqrt(r*r+h*h); return [{ label: 'Volume', value: fmt((1/3)*π*r*r*h) }, { label: 'Slant Height', value: fmt(sl) }, { label: 'Total SA', value: fmt(π*r*(r+sl)) }] }
      default: return []
    }
  }

  const inputs = INPUTS[shape]
  const res    = results()

  return (
    <div style={{ maxWidth: 480 }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {SHAPES.map(s => (
          <button key={s.id} onClick={() => { setShape(s.id); setVals({}) }}
            style={{ padding: '0.5rem 0.9rem', borderRadius: 20, border: shape === s.id ? '2px solid #1a3a6b' : '1.5px solid #e5e7eb', background: shape === s.id ? '#e8eef8' : '#fff', color: shape === s.id ? '#1a3a6b' : '#374151', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>
            {s.emoji} {s.label}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
        {inputs.map(inp => (
          <div key={inp}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 4 }}>{inp}</label>
            <input type="number" value={vals[inp] ?? ''} onChange={e => setVals(v => ({ ...v, [inp]: e.target.value }))}
              style={{ width: '100%', padding: '0.7rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 15, boxSizing: 'border-box' }} />
          </div>
        ))}
      </div>
      {res.length > 0 && res.some(r => r.value !== '—' && r.value !== '0') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {res.map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: '#e8eef8', borderRadius: 10 }}>
              <span style={{ fontSize: 14, color: '#374151' }}>{r.label}</span>
              <span style={{ fontWeight: 800, color: '#1a3a6b', fontSize: 16, fontFamily: 'monospace' }}>{r.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
