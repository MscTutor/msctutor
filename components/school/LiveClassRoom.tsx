'use client'
// components/school/LiveClassRoom.tsx — Jitsi Meet embed component

import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window { JitsiMeetExternalAPI: new (d: string, o: Record<string, unknown>) => { dispose: () => void } }
}

interface Props { roomName: string; userName: string; isTeacher?: boolean; onEnd?: () => void }

export default function LiveClassRoom({ roomName, userName, isTeacher, onEnd }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const apiRef       = useRef<{ dispose: () => void } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const script  = document.createElement('script')
    script.src    = 'https://meet.jit.si/external_api.js'
    script.onload = () => {
      if (!containerRef.current) return
      apiRef.current = new window.JitsiMeetExternalAPI('meet.jit.si', {
        roomName,
        parentNode: containerRef.current,
        width: '100%', height: 520,
        configOverwrite: {
          startWithAudioMuted: !isTeacher,
          startWithVideoMuted: !isTeacher,
          disableDeepLinking: true,
          prejoinPageEnabled: false,
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: isTeacher
            ? ['microphone','camera','chat','raisehand','sharescreen','participants-pane','tileview','hangup']
            : ['microphone','camera','chat','raisehand','tileview','hangup'],
          SHOW_JITSI_WATERMARK: false,
        },
        userInfo: { displayName: userName },
      })
      setLoading(false)
    }
    document.body.appendChild(script)
    return () => { apiRef.current?.dispose(); if (document.body.contains(script)) document.body.removeChild(script) }
  }, [roomName, userName, isTeacher])

  return (
    <div>
      {loading && (
        <div style={{ height: 520, background: '#111827', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: 16 }}>
          <div>📹 Connecting to live class...</div>
        </div>
      )}
      <div ref={containerRef} style={{ borderRadius: 14, overflow: 'hidden', display: loading ? 'none' : 'block' }} />
      {onEnd && (
        <button onClick={onEnd} style={{ marginTop: '0.75rem', background: '#fee2e2', color: '#dc2626', border: '1.5px solid #fecaca', borderRadius: 10, padding: '0.65rem 1.25rem', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
          🔴 End Class
        </button>
      )}
    </div>
  )
}
