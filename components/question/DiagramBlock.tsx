'use client'
// components/question/DiagramBlock.tsx — Free image from Wikimedia/NASA

import { useEffect, useState } from 'react'

interface ImageResult { url: string; source: string; attribution?: string }
interface Props { query: string; subject?: string; fallbackUrl?: string }

export default function DiagramBlock({ query, subject, fallbackUrl }: Props) {
  const [image,   setImage]   = useState<ImageResult | null>(fallbackUrl ? { url: fallbackUrl, source: 'stored' } : null)
  const [loading, setLoading] = useState(!fallbackUrl)

  useEffect(() => {
    if (fallbackUrl || !query) return
    fetch(`/api/images/free?q=${encodeURIComponent(query)}&subject=${subject ?? 'general'}`)
      .then(r => r.json())
      .then(d => { if (d.url) setImage(d) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [query, subject, fallbackUrl])

  if (loading) return (
    <div style={{ height: 180, background: '#f3f4f6', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: 14 }}>
      Loading diagram…
    </div>
  )

  if (!image) return null

  return (
    <div style={{ marginBottom: '1rem' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.url}
        alt={query}
        style={{ width: '100%', maxHeight: 280, objectFit: 'contain', borderRadius: 12, border: '1px solid #e5e7eb', background: '#f9fafb' }}
        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
      />
      {image.attribution && (
        <p style={{ fontSize: 11, color: '#9ca3af', margin: '0.3rem 0 0', textAlign: 'center' }}>
          Source: {image.source} · {image.attribution}
        </p>
      )}
    </div>
  )
}
