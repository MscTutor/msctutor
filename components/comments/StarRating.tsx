'use client'
// components/comments/StarRating.tsx

import { useState } from 'react'

interface Props { value?: number; onChange?: (v: number) => void; readonly?: boolean; size?: number }

export default function StarRating({ value = 0, onChange, readonly, size = 22 }: Props) {
  const [hover, setHover] = useState(0)
  const active = hover || value

  return (
    <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {[1,2,3,4,5].map(n => (
        <span key={n}
          onMouseEnter={() => !readonly && setHover(n)}
          onMouseLeave={() => !readonly && setHover(0)}
          onClick={() => !readonly && onChange?.(n)}
          style={{ fontSize: size, cursor: readonly ? 'default' : 'pointer', color: n <= active ? '#f59e0b' : '#d1d5db', lineHeight: 1, userSelect: 'none', transition: 'color 0.1s' }}>
          ★
        </span>
      ))}
    </div>
  )
}
