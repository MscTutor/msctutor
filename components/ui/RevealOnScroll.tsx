'use client'
// components/ui/RevealOnScroll.tsx
// Wraps children in a div that fades + slides up when entering viewport.
// CSS in globals.css (`.reveal` / `.reveal.is-visible`).
// Respects prefers-reduced-motion (instant show).

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react'

interface Props {
  children: ReactNode
  delay?: number      // ms
  className?: string
  style?: CSSProperties
  as?: 'div' | 'section' | 'article'
}

export default function RevealOnScroll({ children, delay = 0, className = '', style = {}, as: Tag = 'div' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setVisible(true); return }

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay)
          observer.disconnect()
        }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' })

    observer.observe(node)
    return () => observer.disconnect()
  }, [delay])

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  )
}
