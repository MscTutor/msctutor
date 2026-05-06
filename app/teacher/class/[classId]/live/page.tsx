'use client'
// app/teacher/class/[classId]/live/page.tsx — Jitsi Meet live class

import { useEffect, useRef, useState } from 'react'
import { useParams }                   from 'next/navigation'
import Link                            from 'next/link'

declare global {
  interface Window {
    JitsiMeetExternalAPI: new (domain: string, options: Record<string, unknown>) => { dispose: () => void }
  }
}

export default function LiveClassPage() {
  const { classId }  = useParams()
  const jitsiRef     = useRef<HTMLDivElement>(null)
  const apiRef       = useRef<{ dispose: () => void } | null>(null)
  const [started,    setStarted]    = useState(false)
  const [roomName,   setRoomName]   = useState('')
  const [userName,   setUserName]   = useState('Teacher')

  useEffect(() => {
    const code = `msctutor-class-${classId}-${new Date().toISOString().split('T')[0]}`
    setRoomName(code)
  }, [classId])

  useEffect(() => {
    if (!started || !jitsiRef.current) return

    const script = document.createElement('script')
    script.src   = 'https://meet.jit.si/external_api.js'
    script.onload = () => {
      if (!jitsiRef.current) return
      apiRef.current = new window.JitsiMeetExternalAPI('meet.jit.si', {
        roomName,
        parentNode: jitsiRef.current,
        width:      '100%',
        height:     560,
        configOverwrite: {
          startWithAudioMuted:   false,
          startWithVideoMuted:   false,
          disableDeepLinking:    true,
          prejoinPageEnabled:    false,
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS:       ['microphone','camera','chat','raisehand','sharescreen','participants-pane','tileview'],
          SHOW_JITSI_WATERMARK:  false,
          SHOW_WATERMARK_FOR_GUESTS: false,
        },
        userInfo: { displayName: userName },
      })
    }
    document.body.appendChild(script)
    return () => { apiRef.current?.dispose(); document.body.removeChild(script) }
  }, [started, roomName, userName])

  if (!started) return (
    <main style={{ maxWidth: 560, margin: '4rem auto', padding: '0 1rem' }}>
      <nav style={{ fontSize: 13, color: '#6b7280', marginBottom: '1.5rem' }}>
        <Link href={`/teacher/class/${classId}`} style={{ color: '#1a3a6b' }}>← Back to Class</Link>
      </nav>
      <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #e5e7eb', padding: '2.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: 56, marginBottom: '1rem' }}>📹</div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111' }}>Start Live Class</h1>
        <p style={{ color: '#6b7280', fontSize: 14, margin: '0.5rem 0 1.5rem' }}>Powered by Jitsi Meet — 100% free, no account needed</p>

        <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Your Name</label>
          <input value={userName} onChange={e => setUserName(e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, boxSizing: 'border-box' }} />
        </div>

        <div style={{ background: '#f9fafb', borderRadius: 12, padding: '1rem', marginBottom: '1.5rem', textAlign: 'left' }}>
          <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Room link to share with students:</div>
          <div style={{ fontFamily: 'monospace', fontSize: 13, color: '#1a3a6b', wordBreak: 'break-all' }}>meet.jit.si/{roomName}</div>
          <button onClick={() => navigator.clipboard.writeText(`https://meet.jit.si/${roomName}`)} style={{ marginTop: 8, background: 'transparent', border: '1px solid #d1d5db', borderRadius: 6, padding: '4px 10px', fontSize: 12, cursor: 'pointer', color: '#6b7280' }}>📋 Copy Link</button>
        </div>

        <button onClick={() => setStarted(true)} style={{ width: '100%', padding: '1rem', background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
          🎬 Start Live Class
        </button>
        <p style={{ fontSize: 12, color: '#9ca3af', marginTop: '0.75rem' }}>No download required · Works in Chrome, Firefox, Safari</p>
      </div>
    </main>
  )

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1.5rem 1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: '#111', margin: 0 }}>🔴 Live Class — Class {classId}</h1>
        <button onClick={() => setStarted(false)} style={{ background: '#fee2e2', color: '#dc2626', border: '1.5px solid #fecaca', borderRadius: 8, padding: '0.5rem 1rem', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>End Class</button>
      </div>
      <div ref={jitsiRef} style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid #e5e7eb' }} />
    </div>
  )
}
