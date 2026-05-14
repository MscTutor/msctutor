'use client'
// app/teacher/class/[classId]/live/page.tsx
// Live class with MediaRecorder + IndexedDB browser-local recording storage

import { useEffect, useRef, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

/* ── Jitsi type ─────────────────────────────────────────────────────────── */
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

/* ── IndexedDB helpers ──────────────────────────────────────────────────── */
const DB_NAME    = 'msctutor_recordings'
const DB_VERSION = 1
const STORE_NAME = 'recordings'

interface IDBRecording {
  id:       string
  classId:  string
  title:    string
  date:     string
  duration: number   // seconds
  blob:     Blob
  mimeType: string
  createdAt: number  // epoch
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = e => {
      const db = (e.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' })
        store.createIndex('classId', 'classId', { unique: false })
        store.createIndex('createdAt', 'createdAt', { unique: false })
      }
    }
    req.onsuccess = e => resolve((e.target as IDBOpenDBRequest).result)
    req.onerror   = () => reject(req.error)
  })
}

async function saveRecordingToDB(rec: IDBRecording): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx    = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    const req   = store.put(rec)
    req.onsuccess = () => resolve()
    req.onerror   = () => reject(req.error)
  })
}

async function getRecordingsFromDB(classId: string): Promise<IDBRecording[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx    = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    const idx   = store.index('classId')
    const req   = idx.getAll(classId)
    req.onsuccess = () => resolve((req.result as IDBRecording[]).sort((a, b) => b.createdAt - a.createdAt))
    req.onerror   = () => reject(req.error)
  })
}

async function deleteRecordingFromDB(id: string): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(STORE_NAME, 'readwrite')
    const req = tx.objectStore(STORE_NAME).delete(id)
    req.onsuccess = () => resolve()
    req.onerror   = () => reject(req.error)
  })
}

function fmtDuration(sec: number): string {
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  if (h > 0) return `${h}h ${String(m).padStart(2,'0')}m`
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
}

function fmtSize(bytes: number): string {
  if (bytes > 1024 * 1024 * 1024) return `${(bytes / (1024**3)).toFixed(1)} GB`
  if (bytes > 1024 * 1024)        return `${(bytes / (1024**2)).toFixed(1)} MB`
  if (bytes > 1024)               return `${(bytes / 1024).toFixed(0)} KB`
  return `${bytes} B`
}

/* ── Main component ─────────────────────────────────────────────────────── */
export default function LiveClassPage() {
  const { classId } = useParams()
  const cid = Array.isArray(classId) ? classId[0] : classId ?? 'X'

  const jitsiRef   = useRef<HTMLDivElement>(null)
  const apiRef     = useRef<{ dispose: () => void; executeCommand?: (cmd: string, ...args: unknown[]) => void; addListener?: (event: string, fn: (...a: unknown[]) => void) => void } | null>(null)
  const mediaRecRef   = useRef<MediaRecorder | null>(null)
  const chunksRef     = useRef<Blob[]>([])
  const recStartRef   = useRef<Date | null>(null)

  const [started,        setStarted]       = useState(false)
  const [roomName,       setRoomName]      = useState('')
  const [userName,       setUserName]      = useState('Teacher')
  const [isRecording,    setIsRecording]   = useState(false)
  const [elapsed,        setElapsed]       = useState('00:00')
  const [participants,   setParticipants]  = useState(1)
  const [isMuted,        setIsMuted]       = useState(false)
  const [isVideoOff,     setIsVideoOff]    = useState(false)
  const [copied,         setCopied]        = useState(false)
  const [showRecordings, setShowRecordings]= useState(false)
  const [recordings,     setRecordings]    = useState<IDBRecording[]>([])
  const [savingRec,      setSavingRec]     = useState(false)
  const [playingId,      setPlayingId]     = useState<string | null>(null)
  const [playUrl,        setPlayUrl]       = useState<string>('')
  const [recError,       setRecError]      = useState('')

  /* Load recordings from IndexedDB */
  const loadRecordings = useCallback(async () => {
    try {
      const recs = await getRecordingsFromDB(cid)
      setRecordings(recs)
    } catch { /* IndexedDB not available on this browser */ }
  }, [cid])

  useEffect(() => {
    const code = `msctutor-class-${cid}-${new Date().toISOString().split('T')[0]}`
    setRoomName(code)
    loadRecordings()
  }, [cid, loadRecordings])

  /* Elapsed timer */
  useEffect(() => {
    if (!isRecording) return
    const id = setInterval(() => {
      const diff = recStartRef.current ? Math.floor((Date.now() - recStartRef.current.getTime()) / 1000) : 0
      setElapsed(fmtDuration(diff))
    }, 1000)
    return () => clearInterval(id)
  }, [isRecording])

  /* Jitsi setup */
  useEffect(() => {
    if (!started || !jitsiRef.current) return

    const script    = document.createElement('script')
    script.src      = 'https://meet.jit.si/external_api.js'
    script.onload   = () => {
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
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: ['microphone','camera','chat','raisehand','sharescreen','participants-pane','tileview'],
          SHOW_JITSI_WATERMARK:      false,
          SHOW_WATERMARK_FOR_GUESTS: false,
        },
        userInfo: { displayName: userName },
      })
      apiRef.current = api as typeof apiRef.current

      api.addListener?.('participantJoined', () => setParticipants(p => p + 1))
      api.addListener?.('participantLeft',   () => setParticipants(p => Math.max(1, p - 1)))
      api.addListener?.('audioMuteStatusChanged', (data: unknown) => setIsMuted((data as any)?.muted ?? false))
      api.addListener?.('videoMuteStatusChanged', (data: unknown) => setIsVideoOff((data as any)?.muted ?? false))
    }
    document.body.appendChild(script)
    return () => {
      apiRef.current?.dispose()
      if (document.body.contains(script)) document.body.removeChild(script)
    }
  }, [started, roomName, userName])

  /* ── MediaRecorder recording ────────────────────────────────────────────── */
  async function startBrowserRecording() {
    setRecError('')
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      })

      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')
        ? 'video/webm;codecs=vp9,opus'
        : MediaRecorder.isTypeSupported('video/webm')
          ? 'video/webm'
          : 'video/mp4'

      const mr = new MediaRecorder(stream, { mimeType })
      chunksRef.current = []
      recStartRef.current = new Date()

      mr.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data) }

      mr.onstop = async () => {
        setSavingRec(true)
        const blob     = new Blob(chunksRef.current, { type: mimeType })
        const duration = recStartRef.current
          ? Math.floor((Date.now() - recStartRef.current.getTime()) / 1000)
          : 0
        const rec: IDBRecording = {
          id:        `rec-${Date.now()}`,
          classId:   cid,
          title:     `Class ${cid} — ${new Date().toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}`,
          date:      new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' }),
          duration,
          blob,
          mimeType,
          createdAt: Date.now(),
        }
        try {
          await saveRecordingToDB(rec)
          await loadRecordings()
        } catch {
          setRecError('Could not save to IndexedDB — try downloading the file manually.')
        }
        setSavingRec(false)

        // Stop all tracks
        stream.getTracks().forEach(t => t.stop())
      }

      mr.start(1000) // collect chunks every 1s
      mediaRecRef.current = mr
      setIsRecording(true)
      setElapsed('00:00')
    } catch (err: unknown) {
      if ((err as DOMException)?.name === 'NotAllowedError') {
        setRecError('Screen sharing permission denied. Please allow screen capture in the browser popup.')
      } else {
        setRecError('Could not start recording. Make sure screen sharing is supported in your browser.')
      }
    }
  }

  function stopBrowserRecording() {
    mediaRecRef.current?.stop()
    mediaRecRef.current = null
    setIsRecording(false)
  }

  function toggleRecording() {
    if (isRecording) stopBrowserRecording()
    else startBrowserRecording()
  }

  function copyLink() {
    navigator.clipboard.writeText(`https://meet.jit.si/${roomName}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function deleteRecording(id: string) {
    await deleteRecordingFromDB(id)
    setRecordings(r => r.filter(x => x.id !== id))
    if (playingId === id) { setPlayingId(null); setPlayUrl('') }
  }

  function playRecording(rec: IDBRecording) {
    if (playUrl) URL.revokeObjectURL(playUrl)
    const url = URL.createObjectURL(rec.blob)
    setPlayUrl(url)
    setPlayingId(rec.id)
    setShowRecordings(true)
  }

  function downloadRecording(rec: IDBRecording) {
    const url = URL.createObjectURL(rec.blob)
    const a   = document.createElement('a')
    a.href    = url
    a.download = `${rec.title.replace(/\s+/g,'_')}.webm`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 60000)
  }

  /* ── PRE-START SCREEN ──────────────────────────────────────────────────── */
  if (!started) return (
    <main style={{ maxWidth:600, margin:'3rem auto', padding:'0 1rem', fontFamily:'Sora,Inter,sans-serif' }}>
      <nav style={{ fontSize:13, color:'#6b7280', marginBottom:'1.5rem' }}>
        <Link href={`/teacher/class/${cid}`} style={{ color:'#1a3a6b', textDecoration:'none' }}>← Back to Class</Link>
      </nav>

      <div style={{ background:'#fff', borderRadius:20, border:'1px solid #e5e7eb', padding:'2.5rem', boxShadow:'0 4px 20px rgba(0,0,0,.07)' }}>
        <div style={{ textAlign:'center', marginBottom:24 }}>
          <div style={{ fontSize:56, marginBottom:8 }}>📹</div>
          <h1 style={{ fontSize:22, fontWeight:900, color:'#1a3a6b', margin:'0 0 6px' }}>Start Live Class</h1>
          <p style={{ color:'#6b7280', fontSize:13, margin:0 }}>Powered by Jitsi Meet · Recordings saved locally in your browser</p>
        </div>

        <div style={{ marginBottom:14 }}>
          <label style={{ display:'block', fontSize:13, fontWeight:700, color:'#374151', marginBottom:5 }}>Your Display Name</label>
          <input value={userName} onChange={e => setUserName(e.target.value)}
            style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #d1d5db', borderRadius:10, fontSize:14, boxSizing:'border-box', fontFamily:'inherit' }} />
        </div>

        <div style={{ background:'#f0f9ff', border:'1px solid #bae6fd', borderRadius:12, padding:14, marginBottom:16 }}>
          <div style={{ fontSize:12, color:'#0369a1', fontWeight:700, marginBottom:5 }}>🔗 Student Join Link:</div>
          <div style={{ fontFamily:'monospace', fontSize:11, color:'#0c4a6e', wordBreak:'break-all', marginBottom:8 }}>meet.jit.si/{roomName}</div>
          <button onClick={copyLink}
            style={{ background: copied?'#22c55e':'#0369a1', color:'#fff', border:'none', borderRadius:7, padding:'5px 14px', fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'inherit', transition:'background .2s' }}>
            {copied ? '✅ Copied!' : '📋 Copy Link'}
          </button>
        </div>

        {/* Recording info box */}
        <div style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:12, padding:14, marginBottom:20 }}>
          <div style={{ fontSize:12, fontWeight:800, color:'#166534', marginBottom:4 }}>💾 Local Recording — No Cloud Needed</div>
          <div style={{ fontSize:11, color:'#15803d', lineHeight:1.6 }}>
            Recordings are saved directly in your browser storage (IndexedDB). No file is uploaded to any server.
            You can replay and download them anytime from this page.
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:22 }}>
          {[
            { icon:'🎙️', label:'HD Audio & Video'  },
            { icon:'📺', label:'Screen Sharing'    },
            { icon:'💾', label:'Local Recording'   },
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
        <p style={{ fontSize:11, color:'#9ca3af', textAlign:'center', marginTop:8 }}>No download · Works in Chrome, Firefox, Edge</p>

        {/* Past recordings from IndexedDB */}
        {recordings.length > 0 && (
          <div style={{ marginTop:24, borderTop:'1px solid #f3f4f6', paddingTop:18 }}>
            <button onClick={() => setShowRecordings(v => !v)}
              style={{ background:'none', border:'none', fontSize:14, fontWeight:800, color:'#1a3a6b', cursor:'pointer', padding:0, fontFamily:'inherit', display:'flex', alignItems:'center', gap:6 }}>
              💾 Saved Recordings ({recordings.length}) {showRecordings ? '▲' : '▼'}
            </button>

            {showRecordings && (
              <>
                {/* Video player */}
                {playingId && playUrl && (
                  <div style={{ marginTop:12, background:'#000', borderRadius:12, overflow:'hidden' }}>
                    <video src={playUrl} controls autoPlay style={{ width:'100%', maxHeight:300 }} />
                  </div>
                )}

                <div style={{ marginTop:10, display:'flex', flexDirection:'column', gap:8 }}>
                  {recordings.map(r => (
                    <div key={r.id} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', background: playingId===r.id?'#eff6ff':'#f9fafb', borderRadius:10, border:`1px solid ${playingId===r.id?'#bfdbfe':'#e5e7eb'}` }}>
                      <span style={{ fontSize:22 }}>🎥</span>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:12, fontWeight:700, color:'#1a3a6b', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.title}</div>
                        <div style={{ fontSize:10, color:'#9ca3af' }}>
                          {r.date} · {fmtDuration(r.duration)} · {fmtSize(r.blob.size)}
                        </div>
                      </div>
                      <button onClick={() => playRecording(r)}
                        style={{ fontSize:11, color:'#1a3a6b', fontWeight:700, background:'#eff6ff', border:'none', padding:'4px 9px', borderRadius:7, cursor:'pointer', whiteSpace:'nowrap' }}>
                        ▶ Play
                      </button>
                      <button onClick={() => downloadRecording(r)}
                        style={{ fontSize:11, color:'#166534', fontWeight:700, background:'#f0fdf4', border:'none', padding:'4px 9px', borderRadius:7, cursor:'pointer', whiteSpace:'nowrap' }}>
                        ⬇ Save
                      </button>
                      <button onClick={() => deleteRecording(r.id)}
                        style={{ fontSize:11, color:'#dc2626', fontWeight:700, background:'#fef2f2', border:'none', padding:'4px 9px', borderRadius:7, cursor:'pointer' }}
                        title="Delete recording">
                        🗑
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {recordings.length === 0 && (
          <div style={{ marginTop:20, textAlign:'center', fontSize:12, color:'#d1d5db' }}>
            No recordings yet. Start a class and record it — files stay in your browser.
          </div>
        )}
      </div>
    </main>
  )

  /* ── LIVE SCREEN ─────────────────────────────────────────────────────────── */
  return (
    <div style={{ maxWidth:1100, margin:'0 auto', padding:'1.5rem 1rem', fontFamily:'Sora,Inter,sans-serif' }}>

      {/* Control bar */}
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14, flexWrap:'wrap' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, flex:1, minWidth:200 }}>
          <span style={{ width:10, height:10, borderRadius:'50%', background:'#ef4444', animation:'pulse-live 1s infinite', flexShrink:0 }} />
          <h1 style={{ fontSize:16, fontWeight:800, color:'#1a3a6b', margin:0 }}>LIVE — Class {cid}</h1>
          <span style={{ background:'#f0fdf4', color:'#166534', borderRadius:7, padding:'2px 10px', fontSize:12, fontWeight:700 }}>
            👥 {participants} student{participants !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Recording toggle — MediaRecorder based */}
        <button onClick={toggleRecording} disabled={savingRec}
          style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 16px', borderRadius:10, border:'none', background: isRecording?'#dc2626':'#1a3a6b', color:'#fff', fontWeight:800, fontSize:13, cursor: savingRec?'wait':'pointer', fontFamily:'inherit', animation: isRecording?'pulse-btn 2s infinite':'none', opacity: savingRec?0.7:1 }}>
          {savingRec ? '💾 Saving…' : isRecording ? `⏹ Stop  ${elapsed}` : '🔴 Record Screen'}
        </button>

        <button onClick={copyLink}
          style={{ padding:'7px 14px', borderRadius:10, border:'1.5px solid #e5e7eb', background: copied?'#22c55e':'#fff', color: copied?'#fff':'#374151', fontWeight:700, fontSize:13, cursor:'pointer', fontFamily:'inherit', transition:'all .2s' }}>
          {copied ? '✅ Copied!' : '🔗 Share Link'}
        </button>

        <button onClick={() => { setStarted(false); loadRecordings() }}
          style={{ padding:'7px 14px', borderRadius:10, border:'1.5px solid #fecaca', background:'#fee2e2', color:'#dc2626', fontWeight:800, fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>
          ⏹ End Class
        </button>
      </div>

      {/* Recording status bar */}
      {isRecording && (
        <div style={{ background:'#fef2f2', border:'1.5px solid #fecaca', borderRadius:10, padding:'8px 14px', marginBottom:12, display:'flex', alignItems:'center', gap:10, fontSize:13 }}>
          <span style={{ width:9, height:9, borderRadius:'50%', background:'#ef4444', animation:'blink 1s infinite', flexShrink:0 }} />
          <strong style={{ color:'#dc2626' }}>Recording — {elapsed}</strong>
          <span style={{ color:'#9ca3af', fontSize:11 }}>File saved to your browser storage (IndexedDB). No upload needed.</span>
        </div>
      )}

      {savingRec && (
        <div style={{ background:'#f0fdf4', border:'1.5px solid #bbf7d0', borderRadius:10, padding:'8px 14px', marginBottom:12, fontSize:13, color:'#15803d', fontWeight:700 }}>
          💾 Saving recording to browser storage…
        </div>
      )}

      {recError && (
        <div style={{ background:'#fef2f2', border:'1.5px solid #fecaca', borderRadius:10, padding:'10px 14px', marginBottom:12, fontSize:12, color:'#dc2626' }}>
          ⚠️ {recError}
        </div>
      )}

      {/* Jitsi container */}
      <div ref={jitsiRef} style={{ borderRadius:16, overflow:'hidden', border:'1.5px solid #e5e7eb', boxShadow:'0 4px 20px rgba(0,0,0,.08)' }} />

      {/* Quick tools */}
      <div style={{ marginTop:14, display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:10 }}>
        {[
          { href:`/teacher/class/${cid}/homework`,   icon:'📋', label:'Set Homework',    bg:'#eff6ff', color:'#1a3a6b' },
          { href:`/teacher/class/${cid}/exam`,        icon:'📝', label:'Create Quiz',     bg:'#f0fdf4', color:'#166534' },
          { href:`/teacher/class/${cid}/attendance`,  icon:'📅', label:'Take Attendance', bg:'#fffbeb', color:'#92400e' },
          { href:`/teacher/class/${cid}/curriculum`,  icon:'📚', label:'Chapter Notes',   bg:'#fdf4ff', color:'#7e22ce' },
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
