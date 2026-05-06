'use client'
// components/content/DiagramFetcher.tsx — Auto-fetch from Wikimedia/NASA with attribution

import { useEffect, useState } from 'react'

interface ImageResult { url: string; source: string; attribution?: string }
interface Props { query: string; subject?: string; className?: string }

export default function DiagramFetcher({ query, subject, className }: Props) {
  const [images,  setImages]  = useState<ImageResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = encodeURIComponent(query)
    const s = subject ?? 'general'
    fetch(`/api/images/free?q=${q}&subject=${s}`)
      .then(r => r.json())
      .then(d => { if (d.url) setImages([d]) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [query, subject])

  if (loading) return (
    <div className={className} style={{ height: 180, background: 'linear-gradient(90deg,#f3f4f6,#e5e7eb,#f3f4f6)', borderRadius: 12, animation: 'shimmer 1.5s infinite' }}>
      <style>{`@keyframes shimmer{0%{background-position:200%}100%{background-position:-200%}}`}</style>
    </div>
  )
  if (!images.length) return null

  return (
    <div className={className} style={{ marginBottom: '1.25rem' }}>
      {images.map((img, i) => (
        <div key={i}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.url} alt={query} style={{ width: '100%', maxHeight: 300, objectFit: 'contain', borderRadius: 12, border: '1px solid #e5e7eb', background: '#f9fafb' }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
          {img.attribution && (
            <p style={{ fontSize: 11, color: '#9ca3af', margin: '0.3rem 0 0', textAlign: 'center' }}>
              📷 {img.source} · {img.attribution}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
