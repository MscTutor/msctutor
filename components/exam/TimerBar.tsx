'use client'
// components/exam/TimerBar.tsx — Countdown timer with color change

import { useEffect, useState } from 'react'

interface Props { totalSeconds: number; onExpire: () => void }

export default function TimerBar({ totalSeconds, onExpire }: Props) {
  const [left, setLeft] = useState(totalSeconds)

  useEffect(() => {
    const t = setInterval(() => {
      setLeft(s => {
        if (s <= 1) { clearInterval(t); onExpire(); return 0 }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [onExpire])

  const mins    = Math.floor(left / 60).toString().padStart(2, '0')
  const secs    = (left % 60).toString().padStart(2, '0')
  const pct     = (left / totalSeconds) * 100
  const isWarn  = left < 300  // < 5 min
  const isDanger= left < 60   // < 1 min

  const barColor = isDanger ? '#dc2626' : isWarn ? '#f59e0b' : '#22c55e'
  const textColor= isDanger ? '#dc2626' : isWarn ? '#92400e' : '#111'

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 0.5 }}>Time Remaining</span>
        <span style={{ fontSize: 22, fontWeight: 900, fontFamily: 'monospace', color: textColor, letterSpacing: 2, animation: isDanger ? 'blink 1s infinite' : 'none' }}>
          {mins}:{secs}
        </span>
      </div>
      <div style={{ height: 6, background: '#f3f4f6', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: barColor, borderRadius: 3, transition: 'width 1s linear, background 0.5s' }} />
      </div>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  )
}
