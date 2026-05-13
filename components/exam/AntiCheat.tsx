'use client'
// components/exam/AntiCheat.tsx
// Anti-tab-switch, fullscreen enforcement for exams

import { useEffect, useState, useCallback } from 'react'

interface Props {
  examId: string
  onViolation?: (count: number, reason: string) => void
  maxViolations?: number
  onForceSubmit?: () => void
}

export default function AntiCheat({ examId, onViolation, maxViolations = 3, onForceSubmit }: Props) {
  const [violations,   setViolations]   = useState(0)
  const [showWarning,  setShowWarning]  = useState(false)
  const [warningMsg,   setWarningMsg]   = useState('')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [blocked,      setBlocked]      = useState(false)

  const triggerViolation = useCallback((reason: string) => {
    setViolations(prev => {
      const newCount = prev + 1
      setWarningMsg(reason)
      setShowWarning(true)
      onViolation?.(newCount, reason)

      // Auto hide warning after 4 seconds
      setTimeout(() => setShowWarning(false), 4000)

      // Force submit if max violations reached
      if (newCount >= maxViolations) {
        setBlocked(true)
        setTimeout(() => onForceSubmit?.(), 3000)
      }
      return newCount
    })
  }, [onViolation, maxViolations, onForceSubmit])

  // Tab switch detection
  useEffect(() => {
    function handleVisibilityChange() {
      if (document.hidden) {
        triggerViolation('⚠️ Tab switch detected! Stay on exam tab.')
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [triggerViolation])

  // Window blur detection (switching apps)
  useEffect(() => {
    function handleBlur() {
      triggerViolation('⚠️ Window focus lost! Do not leave the exam.')
    }
    window.addEventListener('blur', handleBlur)
    return () => window.removeEventListener('blur', handleBlur)
  }, [triggerViolation])

  // Right-click disable
  useEffect(() => {
    function handleContextMenu(e: MouseEvent) {
      e.preventDefault()
      triggerViolation('⚠️ Right-click is disabled during exam!')
    }
    document.addEventListener('contextmenu', handleContextMenu)
    return () => document.removeEventListener('contextmenu', handleContextMenu)
  }, [triggerViolation])

  // Copy-paste disable
  useEffect(() => {
    function handleCopy(e: ClipboardEvent) {
      e.preventDefault()
      triggerViolation('⚠️ Copy/paste is disabled during exam!')
    }
    document.addEventListener('copy',  handleCopy)
    document.addEventListener('paste', handleCopy)
    document.addEventListener('cut',   handleCopy)
    return () => {
      document.removeEventListener('copy',  handleCopy)
      document.removeEventListener('paste', handleCopy)
      document.removeEventListener('cut',   handleCopy)
    }
  }, [triggerViolation])

  // Keyboard shortcuts block (F12, Ctrl+Shift+I, Ctrl+U etc.)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const blocked = [
        e.key === 'F12',
        e.ctrlKey && e.shiftKey && e.key === 'I',
        e.ctrlKey && e.shiftKey && e.key === 'J',
        e.ctrlKey && e.key === 'u',
        e.ctrlKey && e.key === 'U',
        e.altKey && e.key === 'F4',
        e.key === 'F5',
        e.ctrlKey && e.key === 'r',
      ]
      if (blocked.some(Boolean)) {
        e.preventDefault()
        triggerViolation('⚠️ Developer tools / shortcuts are blocked during exam!')
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [triggerViolation])

  // Fullscreen change detection
  useEffect(() => {
    function handleFullscreenChange() {
      const isFs = !!document.fullscreenElement
      setIsFullscreen(isFs)
      if (!isFs && violations > 0) {
        triggerViolation('⚠️ Fullscreen exited! Please go fullscreen to continue.')
      }
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [violations, triggerViolation])

  function enterFullscreen() {
    document.documentElement.requestFullscreen?.().catch(() => {})
  }

  const remaining = maxViolations - violations
  const pct       = (violations / maxViolations) * 100

  return (
    <>
      {/* Violations indicator — top right of screen */}
      <div style={{
        position: 'fixed', top: 12, right: 80, zIndex: 9999,
        background: violations === 0 ? '#dcfce7' : violations < maxViolations ? '#fef3c7' : '#fee2e2',
        border: `1.5px solid ${violations === 0 ? '#22c55e' : violations < maxViolations ? '#f59e0b' : '#dc2626'}`,
        borderRadius: 10, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 6,
        fontSize: 12, fontWeight: 700,
        color: violations === 0 ? '#166534' : violations < maxViolations ? '#92400e' : '#dc2626',
      }}>
        <span>{violations === 0 ? '✅' : violations < maxViolations ? '⚠️' : '🚨'}</span>
        <span>
          {violations === 0
            ? 'No violations'
            : `${violations} violation${violations > 1 ? 's' : ''} — ${remaining} left`}
        </span>
      </div>

      {/* Fullscreen button if not fullscreen */}
      {!isFullscreen && (
        <div style={{
          position: 'fixed', bottom: 80, right: 24, zIndex: 9998,
          background: '#1a3a6b', color: '#fff', borderRadius: 12,
          padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 13, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(26,58,107,.35)',
        }} onClick={enterFullscreen}>
          ⛶ Enter Fullscreen
        </div>
      )}

      {/* Warning popup */}
      {showWarning && (
        <div style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          zIndex: 99999, background: '#fff', borderRadius: 20,
          padding: '2rem', maxWidth: 420, width: '90vw',
          boxShadow: '0 20px 60px rgba(0,0,0,.25)',
          border: `2px solid ${violations >= maxViolations ? '#dc2626' : '#f59e0b'}`,
          animation: 'shake 0.3s ease',
          textAlign: 'center',
        }}>
          <style>{`
            @keyframes shake {
              0%,100%{transform:translate(-50%,-50%)}
              20%{transform:translate(-48%,-50%)}
              40%{transform:translate(-52%,-50%)}
              60%{transform:translate(-48%,-50%)}
              80%{transform:translate(-52%,-50%)}
            }
          `}</style>
          <div style={{ fontSize: 52, marginBottom: '1rem' }}>
            {violations >= maxViolations ? '🚨' : '⚠️'}
          </div>
          <h3 style={{
            fontSize: 18, fontWeight: 900, marginBottom: 8,
            color: violations >= maxViolations ? '#dc2626' : '#92400e'
          }}>
            {violations >= maxViolations ? 'Exam Terminated!' : 'Warning!'}
          </h3>
          <p style={{ color: '#374151', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
            {warningMsg}
          </p>
          <div style={{ background: '#f9fafb', borderRadius: 10, padding: '10px', marginBottom: '1rem' }}>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>Violations</div>
            <div style={{ height: 8, background: '#e5e7eb', borderRadius: 4 }}>
              <div style={{
                height: '100%', borderRadius: 4,
                background: pct < 60 ? '#f59e0b' : '#dc2626',
                width: `${pct}%`, transition: 'width 0.3s',
              }} />
            </div>
            <div style={{ fontSize: 12, color: violations >= maxViolations ? '#dc2626' : '#92400e', marginTop: 4, fontWeight: 700 }}>
              {violations}/{maxViolations} — {violations >= maxViolations ? 'Exam will submit automatically' : `${remaining} more will auto-submit`}
            </div>
          </div>
          {violations < maxViolations && (
            <button onClick={() => setShowWarning(false)}
              style={{ padding: '10px 24px', background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              I Understand — Continue
            </button>
          )}
        </div>
      )}

      {/* Blocked overlay */}
      {blocked && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999999,
          background: 'rgba(0,0,0,0.92)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: '3rem', maxWidth: 420, textAlign: 'center' }}>
            <div style={{ fontSize: 64 }}>🚨</div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: '#dc2626', margin: '1rem 0 0.5rem' }}>Exam Terminated</h2>
            <p style={{ color: '#374151', fontSize: 14, lineHeight: 1.6 }}>
              Maximum violations reached. Your exam is being submitted automatically with answers filled so far.
            </p>
            <div style={{ marginTop: '1.5rem', padding: '12px', background: '#fee2e2', borderRadius: 10, fontSize: 13, color: '#dc2626', fontWeight: 700 }}>
              Auto-submitting in 3 seconds...
            </div>
          </div>
        </div>
      )}
    </>
  )
}
