'use client'
// components/ui/CountUp.tsx
// Animated number counter that starts when the element enters the viewport.
// Respects prefers-reduced-motion automatically.

import { useEffect, useRef, useState } from 'react'

interface Props {
  end: number
  duration?: number      // milliseconds
  prefix?: string
  suffix?: string
  className?: string
}

export default function CountUp({ end, duration = 1400, prefix = '', suffix = '', className = '' }: Props) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Skip animation for reduced motion users
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setValue(end); return }

    const node = ref.current
    if (!node) return

    const animate = () => {
      if (startedRef.current) return
      startedRef.current = true
      const startAt = performance.now()
      const step = (now: number) => {
        const progress = Math.min(1, (now - startAt) / duration)
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(end * eased))
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          animate()
          observer.disconnect()
        }
      }
    }, { threshold: 0.3 })

    observer.observe(node)
    return () => observer.disconnect()
  }, [end, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{value.toLocaleString('en-IN')}{suffix}
    </span>
  )
}
