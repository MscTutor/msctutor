'use client'
// app/error.tsx — Centralized error boundary (preserves existing)

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({
  error, reset,
}: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') console.error('Global Error:', error)
  }, [error])

  return (
    <div style={{ minHeight:'100vh', background:'#f8f9fc', display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem', fontFamily:'system-ui,sans-serif' }}>
      <div style={{ maxWidth:480, textAlign:'center' }}>
        <div style={{ fontSize:64, marginBottom:'1rem' }}>⚠️</div>
        <h1 style={{ fontSize:22, fontWeight:900, color:'#111', margin:'0 0 0.5rem' }}>Something went wrong</h1>
        <p style={{ color:'#6b7280', fontSize:15, lineHeight:1.6, marginBottom:'1.5rem' }}>
          An unexpected error occurred. Our team has been notified.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <div style={{ background:'#fee2e2', borderRadius:12, padding:'1rem', marginBottom:'1.5rem', textAlign:'left' }}>
            <div style={{ fontSize:11, fontWeight:700, color:'#dc2626', marginBottom:4 }}>Dev Error:</div>
            <div style={{ fontSize:12, color:'#dc2626', fontFamily:'monospace', wordBreak:'break-word' }}>{error.message}</div>
          </div>
        )}
        <div style={{ display:'flex', gap:'0.75rem', justifyContent:'center', flexWrap:'wrap' }}>
          <button onClick={reset} style={{ padding:'10px 24px', background:'#1a3a6b', color:'#fff', border:'none', borderRadius:12, fontWeight:700, cursor:'pointer', fontSize:15 }}>
            🔄 Try Again
          </button>
          <Link href="/" style={{ padding:'10px 24px', background:'#f3f4f6', color:'#374151', borderRadius:12, fontWeight:700, fontSize:15, textDecoration:'none', display:'inline-block' }}>
            🏠 Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
