// components/ui/Skeleton.tsx — Shimmer loading placeholder
// Use whenever async data is pending. Drives `.skeleton` in globals.css.

import type { CSSProperties } from 'react'

interface Props {
  height?: number | string
  width?: number | string
  radius?: number
  className?: string
  style?: CSSProperties
}

export function Skeleton({ height = 16, width = '100%', radius = 8, className = '', style = {} }: Props) {
  return (
    <div
      className={`skeleton ${className}`}
      role="status"
      aria-label="Loading"
      style={{ height, width, borderRadius: radius, ...style }}
    />
  )
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div role="status" aria-label="Loading content">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} height={12} width={i === lines - 1 ? '70%' : '100%'} radius={4} style={{ marginBottom: 8 }} />
      ))}
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 16 }}
         role="status" aria-label="Loading card">
      <Skeleton height={120} radius={10} style={{ marginBottom: 12 }} />
      <Skeleton height={18} width="60%" radius={4} style={{ marginBottom: 8 }} />
      <SkeletonText lines={2} />
    </div>
  )
}
