'use client'
// components/calculators/UnitConverter.tsx

import { useState } from 'react'

type Category = 'length' | 'weight' | 'temperature' | 'area' | 'volume'

const UNITS: Record<Category, { label: string; units: { name: string; factor: number; offset?: number }[] }> = {
  length:      { label: 'Length',      units: [{ name: 'Meter', factor: 1 }, { name: 'Kilometer', factor: 0.001 }, { name: 'Centimeter', factor: 100 }, { name: 'Millimeter', factor: 1000 }, { name: 'Foot', factor: 3.28084 }, { name: 'Inch', factor: 39.3701 }, { name: 'Mile', factor: 0.000621371 }] },
  weight:      { label: 'Weight',      units: [{ name: 'Kilogram', factor: 1 }, { name: 'Gram', factor: 1000 }, { name: 'Milligram', factor: 1e6 }, { name: 'Pound', factor: 2.20462 }, { name: 'Ounce', factor: 35.274 }, { name: 'Ton', factor: 0.001 }] },
  temperature: { label: 'Temperature', units: [{ name: 'Celsius', factor: 1 }, { name: 'Fahrenheit', factor: 1 }, { name: 'Kelvin', factor: 1 }] },
  area:        { label: 'Area',        units: [{ name: 'Sq Meter', factor: 1 }, { name: 'Sq Kilometer', factor: 1e-6 }, { name: 'Sq Foot', factor: 10.7639 }, { name: 'Acre', factor: 0.000247105 }, { name: 'Hectare', factor: 1e-4 }] },
  volume:      { label: 'Volume',      units: [{ name: 'Liter', factor: 1 }, { name: 'Milliliter', factor: 1000 }, { name: 'Cubic Meter', factor: 0.001 }, { name: 'Gallon (US)', factor: 0.264172 }, { name: 'Cup', factor: 4.22675 }] },
}

function convertTemp(val: number, from: string, to: string): number {
  let celsius = val
  if (from === 'Fahrenheit') celsius = (val - 32) * 5 / 9
  else if (from === 'Kelvin') celsius = val - 273.15
  if (to === 'Celsius') return celsius
  if (to === 'Fahrenheit') return celsius * 9 / 5 + 32
  return celsius + 273.15
}

export default function UnitConverter() {
  const [cat,   setCat]   = useState<Category>('length')
  const [from,  setFrom]  = useState(0)
  const [to,    setTo]    = useState(1)
  const [input, setInput] = useState('')

  const units = UNITS[cat].units
  const fromU = units[from]
  const toU   = units[to]

  let result = ''
  if (input) {
    const val = parseFloat(input)
    if (!isNaN(val)) {
      if (cat === 'temperature') {
        result = convertTemp(val, fromU.name, toU.name).toFixed(4)
      } else {
        const base = val / fromU.factor
        result = (base * toU.factor).toFixed(6).replace(/\.?0+$/, '')
      }
    }
  }

  return (
    <div style={{ maxWidth: 480 }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {(Object.entries(UNITS) as [Category, typeof UNITS[Category]][]).map(([k, v]) => (
          <button key={k} onClick={() => { setCat(k); setFrom(0); setTo(1); setInput('') }}
            style={{ padding: '0.5rem 1rem', borderRadius: 20, border: cat === k ? '2px solid #1a3a6b' : '1.5px solid #e5e7eb', background: cat === k ? '#e8eef8' : '#fff', color: cat === k ? '#1a3a6b' : '#374151', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>
            {v.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 4 }}>From</label>
          <select value={from} onChange={e => setFrom(parseInt(e.target.value))} style={{ width: '100%', padding: '0.65rem 0.75rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, background: '#fff' }}>
            {units.map((u, i) => <option key={i} value={i}>{u.name}</option>)}
          </select>
        </div>
        <div style={{ fontSize: 20, color: '#6b7280', marginTop: 18 }}>⇄</div>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 4 }}>To</label>
          <select value={to} onChange={e => setTo(parseInt(e.target.value))} style={{ width: '100%', padding: '0.65rem 0.75rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, background: '#fff' }}>
            {units.map((u, i) => <option key={i} value={i}>{u.name}</option>)}
          </select>
        </div>
      </div>

      <input type="number" value={input} onChange={e => setInput(e.target.value)} placeholder={`Enter value in ${fromU.name}`}
        style={{ width: '100%', padding: '0.85rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 12, fontSize: 16, boxSizing: 'border-box', marginBottom: '0.75rem' }} />

      {result && (
        <div style={{ background: '#e8eef8', borderRadius: 12, padding: '1.1rem 1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#6b7280' }}>{input} {fromU.name} =</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#1a3a6b' }}>{result}</div>
          <div style={{ fontSize: 15, color: '#374151', fontWeight: 600 }}>{toU.name}</div>
        </div>
      )}
    </div>
  )
}
