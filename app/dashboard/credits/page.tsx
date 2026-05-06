'use client'
// app/dashboard/credits/page.tsx

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PLANS } from '@/lib/constants'

export default function CreditsPage() {
  const [credits, setCredits] = useState<number | null>(null)
  const [plan,    setPlan]    = useState('free')

  useEffect(() => {
    fetch('/api/credits', { headers: { authorization: 'Bearer token' } })
      .then(r => r.json()).then(d => { setCredits(d.credits); setPlan(d.plan ?? 'free') }).catch(() => {})
  }, [])

  const planColors: Record<string, string> = { free: '#6b7280', starter: '#1a3a6b', basic: '#7c3aed', pro: '#dc2626' }

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', margin: '0 0 1.5rem' }}>Credits & Plans</h1>

      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: `${planColors[plan]}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>⚡</div>
        <div>
          <div style={{ fontSize: 32, fontWeight: 900, color: planColors[plan] }}>{credits ?? '...'}</div>
          <div style={{ fontSize: 14, color: '#6b7280' }}>Credits remaining · <span style={{ fontWeight: 700, color: planColors[plan], textTransform: 'capitalize' }}>{plan} plan</span></div>
        </div>
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111', marginBottom: '1rem' }}>Upgrade Plan</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        {Object.entries(PLANS).map(([key, p]) => (
          <div key={key} style={{ background: '#fff', borderRadius: 14, border: key === plan ? '2px solid #1a3a6b' : '1px solid #e5e7eb', padding: '1.25rem', textAlign: 'center' }}>
            {key === plan && <div style={{ background: '#1a3a6b', color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 6, display: 'inline-block', marginBottom: 8 }}>CURRENT</div>}
            <div style={{ fontSize: 18, fontWeight: 800, color: '#111', textTransform: 'capitalize' }}>{key}</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: '#1a3a6b', margin: '0.5rem 0' }}>₹{p.price}<span style={{ fontSize: 12, fontWeight: 400, color: '#6b7280' }}>/{p.period}</span></div>
            <div style={{ fontSize: 13, color: '#6b7280' }}>{p.credits} credits/{p.period}</div>
            {key !== plan && p.price > 0 && (
              <Link href="/pricing" style={{ display: 'block', marginTop: '0.75rem', background: '#1a3a6b', color: '#fff', borderRadius: 8, padding: '0.6rem', textDecoration: 'none', fontSize: 13, fontWeight: 700 }}>Upgrade</Link>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
