'use client'
// components/LazyLoad.tsx — Intersection Observer lazy loading
// Renders children only when visible in viewport

import { useEffect, useRef, useState, type ReactNode } from 'react'

interface Props {
  children:    ReactNode
  fallback?:   ReactNode
  threshold?:  number       // 0-1, how much must be visible
  rootMargin?: string       // e.g. "100px" to load slightly before visible
  once?:       boolean      // Only trigger once (default true)
  className?:  string
  style?:      React.CSSProperties
}

export default function LazyLoad({
  children,
  fallback,
  threshold  = 0.1,
  rootMargin = '200px',   // Pre-load 200px before visible
  once       = true,
  className,
  style,
}: Props) {
  const ref     = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Check if already visible on mount
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight + 200) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return (
    <div ref={ref} className={className} style={style}>
      {visible ? children : (fallback ?? <div style={{ minHeight: 100 }} />)}
    </div>
  )
}

// ── FADE-IN ON SCROLL ─────────────────────────────────────────────
export function FadeInOnScroll({
  children,
  delay = 0,
  className,
  style,
}: {
  children: ReactNode
  delay?:   number
  className?: string
  style?:   React.CSSProperties
}) {
  const ref  = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect() } }, { threshold: 0.1, rootMargin: '50px' })
    ob.observe(el)
    return () => ob.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:    vis ? 1 : 0,
        transform:  vis ? 'none' : 'translateY(20px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
