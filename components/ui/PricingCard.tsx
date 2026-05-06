// components/ui/PricingCard.tsx

import Link from 'next/link'

interface Props {
  name:        string
  price:       number
  period:      string
  credits:     number
  features:    string[]
  highlighted?: boolean
  ctaLabel?:   string
  ctaHref?:    string
  badge?:      string
}

export default function PricingCard({ name, price, period, credits, features, highlighted, ctaLabel, ctaHref, badge }: Props) {
  return (
    <div style={{
      background:   '#fff',
      borderRadius: 18,
      border:       highlighted ? '2px solid #1a3a6b' : '1.5px solid #e5e7eb',
      padding:      '1.75rem',
      position:     'relative',
      display:      'flex',
      flexDirection:'column',
    }}>
      {badge && (
        <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#1a3a6b', color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 16px', borderRadius: 20, whiteSpace: 'nowrap' }}>
          {badge}
        </div>
      )}
      <div style={{ fontWeight: 800, fontSize: 18, color: '#111', textTransform: 'capitalize', marginBottom: '0.25rem' }}>{name}</div>
      <div style={{ marginBottom: '1rem' }}>
        <span style={{ fontSize: 36, fontWeight: 900, color: highlighted ? '#1a3a6b' : '#111' }}>
          {price === 0 ? 'Free' : `₹${price}`}
        </span>
        {price > 0 && <span style={{ fontSize: 14, color: '#6b7280' }}>/{period}</span>}
      </div>
      <div style={{ fontSize: 13, color: '#6b7280', marginBottom: '1.25rem' }}>
        {credits} credits/{period}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, marginBottom: '1.5rem' }}>
        {features.map(f => (
          <div key={f} style={{ display: 'flex', gap: 8, fontSize: 14, color: '#374151', alignItems: 'flex-start' }}>
            <span style={{ color: '#22c55e', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
            <span>{f}</span>
          </div>
        ))}
      </div>
      <Link href={ctaHref ?? '/pricing'}
        style={{
          display:      'block', textAlign: 'center',
          padding:      '0.8rem',
          background:   highlighted ? '#1a3a6b' : '#f3f4f6',
          color:        highlighted ? '#fff' : '#111',
          borderRadius: 12, textDecoration: 'none',
          fontWeight:   700, fontSize: 15,
        }}>
        {ctaLabel ?? (price === 0 ? 'Get Started Free' : `Get ${name}`)}
      </Link>
    </div>
  )
}
