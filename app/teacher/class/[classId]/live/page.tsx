'use client'
// app/teacher/class/[classId]/live/page.tsx — Jitsi Meet live class + recording controls

import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

declare global {
  interface Window {
    JitsiMeetExternalAPI: new (d: string, o: Record<string, unknown>) => {
      dispose: () => void
      executeCommand?: (cmd: string, ...args: unknown[]) => void
      getNumberOfParticipants?: () => number
      addListener?: (event: string, fn: (...a: unknown[]) => void) => void
    }
  }
}

interface RecordingEntry {
  id: string
  title: string
  date: string
  duration: string
  size: string
  url: string
}

export default function LiveClassPage() {
  const { classId } = useParams()
  const jitsiRef = useRef<HTMLDivElement>(null)
  const apiRef   = useRef<{ dispose: () => void; executeCommand?: (cmd: string, ...args: unknown[]) => void; addListener?: (event: string, fn: (...a: unknown[]) => void) => void } | null>(null)

  const [started,      setStarted]      = useState(false)
  const [roomName,     setRoomName]     = useState('')
  const [userName,     setUserName]     = useState('Teacher')
  const [isRecording,  setIsRecording]  = useState(false)
  const [recordStart,  setRecordStart]  = useState<Date | null>(null)
  const [elapsed,      setElapsed]      = useState('00:00')
  const [participants, setParticipants] = useState(1)
  const [isMuted,      setIsMuted]      = useState(false)
  const [isVideoOff,   setIsVideoOff]   = useState(false)
  const [copied,       setCopied]       = useState(false)
  const [showRecordings, setShowRecordings] = useState(false)

  // Past recordings (mock — would come from storage API)
  const [recordings] = useState<RecordingEntry[]>([
    { id:'r1', title:`Class ${classId} — Session 3`, date:'13 May 2026', duration:'1h 12m', size:'420 MB', url:'#' },
    { id:'r2', title:`Class ${classId} — Session 2`, date:'10 May 2026', duration:'58m',    size:'310 MB', url:'#' },
    { id:'r3', title:`Class ${classId} — Session 1`, date:'7 May 2026',  duration:'1h 05m', size:'380 MB', url:'#' },
  ])

  useEffect(() => {
    const code = `msctutor-class-${classId}-${new Date().toISOString().split('T')[0]}`
    setRoomName(code)
  }, [classId])

  // Elapsed recording timer
  useEffect(() => {
    if (!isRecording || !recordStart) return
    const id = setInterval(() => {
      const diff = Math.floor((Date.now() - recordStart.getTime()) / 1000)
      const m = String(Math.floor(diff / 60)).padStart(2,'0')
      const s = String(diff % 60).padStart(2,'0')
      setElapsed(`${m}:${s}`)
    }, 1000)
    return () => clearInterval(id)
  }, [isRecording, recordStart])

  useEffect(() => {
    if (!started || !jitsiRef.current) return

    const script = document.createElement('script')
    script.src = 'https://meet.jit.si/external_api.js'
    script.onload = () => {
      if (!jitsiRef.current) return
      const api = new window.JitsiMeetExternalAPI('meet.jit.si', {
        roomName,
        parentNode:  jitsiRef.current,
        width:       '100%',
        height:      520,
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          disableDeepLinking:  true,
          prejoinPageEnabled:  false,
          enableRecording:     true,
          localRecording: { enabled: true, format: 'webm' },
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: ['microphone','camera','chat','raisehand','sharescreen','participants-pane','tileview','recording'],
          SHOW_JITSI_WATERMARK:       false,
          SHOW_WATERMARK_FOR_GUESTS:  false,
        },
        userInfo: { displayName: userName },
      })
      apiRef.current = api as any

      api.addListener('participantJoined', () => {
        setParticipants(p => p + 1)
      })
      api.addListener('participantLeft', () => {
        setParticipants(p => Math.max(1, p - 1))
      })
      api.addListener('audioMuteStatusChanged', (data: any) => {
        setIsMuted(data?.muted ?? false)
      })
      api.addListener('videoMuteStatusChanged', (data: any) => {
        setIsVideoOff(data?.muted ?? false)
      })
    }
    document.body.appendChild(script)
    return () => {
      apiRef.current?.dispose()
      if (document.body.contains(script)) document.body.removeChild(script)
    }
  }, [started, roomName, userName])

  function toggleRecording() {
    if (!isRecording) {
      setIsRecording(true)
      setRecordStart(new Date())
      setElapsed('00:00')
      // Jitsi local recording API
      apiRef.current?.executeCommand?.('localRecordingStart')
    } else {
      setIsRecording(false)
      setRecordStart(null)
      apiRef.current?.executeCommand?.('localRecordingStop')
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(`https://meet.jit.si/${roomName}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // ── PRE-START SCREEN ─────────────────────────────────────────────────────
  if (!started) return (
    <main style={{ maxWidth:580, margin:'3rem auto', padding:'0 1rem', fontFamily:'Sora,Inter,sans-serif' }}>
      <nav style={{ fontSize:13, color:'#6b7280', marginBottom:'1.5rem' }}>
        <Link href={`/teacher/class/${classId}`} style={{ color:'#1a3a6b', textDecoration:'none' }}>← Back to Class</Link>
      </nav>

      <div style={{ background:'#fff', borderRadius:20, border:'1px solid #e5e7eb', padding:'2.5rem', boxShadow:'0 4px 20px rgba(0,0,0,.07)' }}>
        <div style={{ textAlign:'center', marginBottom:24 }}>
          <div style={{ fontSize:56, marginBottom:8 }}>📹</div>
          <h1 style={{ fontSize:22, fontWeight:900, color:'#1a3a6b', margin:'0 0 6px' }}>Start Live Class</h1>
          <p style={{ color:'#6b7280', fontSize:13, margin:0 }}>Powered by Jitsi Meet — free video, recording, screen share</p>
        </div>

        <div style={{ marginBottom:14 }}>
          <label style={{ display:'block', fontSize:13, fontWeight:700, color:'#374151', marginBottom:5 }}>Your Display Name</label>
          <input value={userName} onChange={e => setUserName(e.target.value)}
            style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #d1d5db', borderRadius:10, fontSize:14, boxSizing:'border-box', fontFamily:'inherit' }} />
        </div>

        <div style={{ background:'#f0f9ff', border:'1px solid #bae6fd', borderRadius:12, padding:14, marginBottom:20 }}>
          <div style={{ fontSize:12, color:'#0369a1', fontWeight:700, marginBottom:5 }}>🔗 Student Join Link:</div>
          <div style={{ fontFamily:'monospace', fontSize:12, color:'#0c4a6e', wordBreak:'break-all', marginBottom:8 }}>meet.jit.si/{roomName}</div>
          <button onClick={copyLink}
            style={{ background: copied ? '#22c55e' : '#0369a1', color:'#fff', border:'none', borderRadius:7, padding:'5px 14px', fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'inherit', transition:'background .2s' }}>
            {copied ? '✅ Copied!' : '📋 Copy Link'}
          </button>
        </div>

        {/* Features list */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:22 }}>
          {[
            { icon:'🎙️', label:'HD Audio & Video'  },
            { icon:'📺', label:'Screen Sharing'    },
            { icon:'🔴', label:'Local Recording'   },
            { icon:'💬', label:'Live Chat'         },
            { icon:'✋', label:'Raise Hand'        },
            { icon:'👥', label:'Participants Panel' },
          ].map(f => (
            <div key={f.label} style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, color:'#374151' }}>
              <span style={{ fontSize:16 }}>{f.icon}</span> {f.label}
            </div>
          ))}
        </div>

        <button onClick={() => setStarted(true)}
          style={{ width:'100%', padding:'13px', background:'linear-gradient(135deg,#1a3a6b,#0e2347)', color:'#fff', border:'none', borderRadius:12, fontSize:15, fontWeight:800, cursor:'pointer', fontFamily:'inherit', boxShadow:'0 4px 14px rgba(26,58,107,.3)' }}>
          🎬 Start Live Class Now
        </button>
        <p style={{ fontSize:11, color:'#9ca3af', textAlign:'center', marginTop:8 }}>No download · Works in Chrome, Firefox, Safari</p>

        {/* Past recordings */}
        {recordings.length > 0 && (
          <div style={{ marginTop:24, borderTop:'1px solid #f3f4f6', paddingTop:18 }}>
            <button onClick={() => setShowRecordings(v => !v)}
              style={{ background:'none', border:'none', fontSize:14, fontWeight:800, color:'#1a3a6b', cursor:'pointer', padding:0, fontFamily:'inherit', display:'flex', alignItems:'center', gap:6 }}>
              🎬 Past Recordings ({recordings.length}) {showRecordings ? '▲' : '▼'}
            </button>
            {showRecordings && (
              <div style={{ marginTop:12, display:'flex', flexDirection:'column', gap:8 }}>
                {recordings.map(r => (
                  <div key={r.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', background:'#f9fafb', borderRadius:10, border:'1px solid #e5e7eb' }}>
                    <span style={{ fontSize:22 }}>🎥</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:12, fontWeight:700, color:'#1a3a6b' }}>{r.title}</div>
                      <div style={{ fontSize:10, color:'#9ca3af' }}>{r.date} · {r.duration} · {r.size}</div>
                    </div>
                    <a href={r.url} style={{ fontSize:11, color:'#1a3a6b', fontWeight:700, textDecoration:'none', background:'#eff6ff', padding:'4px 10px', borderRadius:7 }}>▶ Play</a>
                    <a href={r.url} download style={{ fontSize:11, color:'#22c55e', fontWeight:700, textDecoration:'none', background:'#f0fdf4', padding:'4px 10px', borderRadius:7 }}>⬇ Save</a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )

  // ── LIVE SCREEN ──────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth:1100, margin:'0 auto', padding:'1.5rem 1rem', fontFamily:'Sora,Inter,sans-serif' }}>

      {/* Control bar */}
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14, flexWrap:'wrap' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, flex:1, minWidth:200 }}>
          <span style={{ width:10, height:10, borderRadius:'50%', background:'#ef4444', animation:'pulse-live 1s infinite', flexShrink:0 }} />
          <h1 style={{ fontSize:16, fontWeight:800, color:'#1a3a6b', margin:0 }}>LIVE — Class {classId}</h1>
          <span style={{ background:'#f0fdf4', color:'#166534', borderRadius:7, padding:'2px 10px', fontSize:12, fontWeight:700 }}>
            👥 {participants} student{participants !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Recording toggle */}
        <button onClick={toggleRecording}
          style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 16px', borderRadius:10, border:'none', background: isRecording ? '#dc2626' : '#1a3a6b', color:'#fff', fontWeight:800, fontSize:13, cursor:'pointer', fontFamily:'inherit', animation: isRecording ? 'pulse-btn 2s infinite' : 'none' }}>
          {isRecording ? `⏹ Stop Recording  ${elapsed}` : '🔴 Start Recording'}
        </button>

        {/* Share link */}
        <button onClick={copyLink}
          style={{ padding:'7px 14px', borderRadius:10, border:'1.5px solid #e5e7eb', background: copied?'#22c55e':'#fff', color: copied?'#fff':'#374151', fontWeight:700, fontSize:13, cursor:'pointer', fontFamily:'inherit', transition:'all .2s' }}>
          {copied ? '✅ Copied!' : '🔗 Share Link'}
        </button>

        <button onClick={() => setStarted(false)}
          style={{ padding:'7px 14px', borderRadius:10, border:'1.5px solid #fecaca', background:'#fee2e2', color:'#dc2626', fontWeight:800, fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>
          ⏹ End Class
        </button>
      </div>

      {isRecording && (
        <div style={{ background:'#fef2f2', border:'1.5px solid #fecaca', borderRadius:10, padding:'8px 14px', marginBottom:12, display:'flex', alignItems:'center', gap:10, fontSize:13 }}>
          <span style={{ width:9, height:9, borderRadius:'50%', background:'#ef4444', animation:'blink 1s infinite' }} />
          <strong style={{ color:'#dc2626' }}>Recording in progress — {elapsed}</strong>
          <span style={{ color:'#9ca3af', fontSize:11 }}>Saved locally. Upload after class ends.</span>
        </div>
      )}

      {/* Jitsi iframe container */}
      <div ref={jitsiRef} style={{ borderRadius:16, overflow:'hidden', border:'1.5px solid #e5e7eb', boxShadow:'0 4px 20px rgba(0,0,0,.08)' }} />

      {/* Teacher quick tools */}
      <div style={{ marginTop:14, display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:10 }}>
        {[
          { href:`/teacher/class/${classId}/homework`, icon:'📋', label:'Set Homework',   bg:'#eff6ff', color:'#1a3a6b' },
          { href:`/teacher/class/${classId}/exam`,     icon:'📝', label:'Create Quiz',    bg:'#f0fdf4', color:'#166534' },
          { href:`/teacher/class/${classId}/attendance`,icon:'📅', label:'Take Attendance',bg:'#fffbeb', color:'#92400e' },
          { href:`/teacher/class/${classId}/curriculum`,icon:'📚', label:'Chapter Notes',  bg:'#fdf4ff', color:'#7e22ce' },
        ].map(a => (
          <Link key={a.label} href={a.href}
            style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 14px', background:a.bg, borderRadius:12, textDecoration:'none', fontWeight:700, fontSize:12, color:a.color }}>
            <span style={{ fontSize:20 }}>{a.icon}</span>{a.label}
          </Link>
        ))}
      </div>

      <style>{`
        @keyframes pulse-live { 0%,100%{opacity:1} 50%{opacity:.2} }
        @keyframes pulse-btn  { 0%,100%{box-shadow:0 0 0 0 rgba(220,38,38,.4)} 70%{box-shadow:0 0 0 8px rgba(220,38,38,0)} }
        @keyframes blink      { 0%,100%{opacity:1} 50%{opacity:.3} }
      `}</style>
    </div>
  )
}
