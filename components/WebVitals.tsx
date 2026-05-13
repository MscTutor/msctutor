'use client'
// components/WebVitals.tsx — Core Web Vitals reporting (FREE)

import { useEffect } from 'react'

interface Metric {
  name:  string
  value: number
  id:    string
  delta: number
}

function sendToAnalytics(metric: Metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    const label = metric.value < 100 ? '✅' : metric.value < 200 ? '⚠️' : '❌'
    console.log(`${label} ${metric.name}: ${Math.round(metric.value)}ms`)
    return
  }

  // In production: send to your analytics endpoint
  // Can also send to: Vercel Analytics, Google Analytics, etc.
  const body = JSON.stringify({
    name:  metric.name,
    value: metric.value,
    id:    metric.id,
    page:  window.location.pathname,
  })

  // Use sendBeacon for reliability (works even during page unload)
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics/vitals', body)
  }
}

export function reportWebVitals(metric: Metric) {
  sendToAnalytics(metric)
}

export default function WebVitals() {
  useEffect(() => {
    // Dynamic import to avoid blocking initial load
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(sendToAnalytics)
      onINP(sendToAnalytics)
      onFCP(sendToAnalytics)
      onLCP(sendToAnalytics)
      onTTFB(sendToAnalytics)
    }).catch(() => {
      // web-vitals not available — skip
    })
  }, [])

  return null
}

// ── PERFORMANCE MARKS ─────────────────────────────────────────────
export function markPerformance(name: string) {
  if (typeof window !== 'undefined' && window.performance?.mark) {
    window.performance.mark(name)
  }
}
