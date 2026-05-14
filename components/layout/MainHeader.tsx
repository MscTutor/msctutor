'use client'
// components/layout/MainHeader.tsx — With Language Switcher + AI Teacher + Notification Bell

import Link                from 'next/link'
import { useRouter }       from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import LanguageSwitcher    from './LanguageSwitcher'

// ── Notification data ────────────────────────────────────────────────────
const HEADER_NOTIFS = [
  { id:1, icon:'📢', text:'Parent-Teacher meeting on 24 May at 10 AM', time:'1h ago',  unread:true  },
  { id:2, icon:'🏆', text:'New badge earned: "7-Day Streak Champion"',  time:'3h ago',  unread:true  },
  { id:3, icon:'📝', text:'New mock test available — Class 10 Science',  time:'5h ago',  unread:true  },
  { id:4, icon:'🎉', text:'Your class rank improved to #4 this week',    time:'1d ago',  unread:false },
  { id:5, icon:'📅', text:'Live class scheduled: Math Revision — 7 PM',  time:'2d ago',  unread:false },
]

declare global {
  interface Window { SpeechRecognition: any; webkitSpeechRecognition: any }
}

const SUGGESTIONS = [
  "Newton's second law class 9",
  "Quadratic formula derivation",
  "Photosynthesis equation class 7",
  "Ohm's law explanation class 10",
  "Trigonometry formulas class 10",
]

export default function MainHeader() {
  const router   = useRouter()
  const [query,     setQuery]     = useState('')
  const [listening, setListening] = useState(false)
  const [showSug,   setShowSug]   = useState(false)
  const [showNotif, setShowNotif] = useState(false)
  const [notifs,    setNotifs]    = useState(HEADER_NOTIFS)
  const recogRef = useRef<any>(null)
  const filtered   = SUGGESTIONS.filter(s => query && s.toLowerCase().includes(query.toLowerCase()))
  const unreadCount = notifs.filter(n => n.unread).length

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) { setShowSug(false); router.push(`/search?q=${encodeURIComponent(query.trim())}`) }
  }

  function startVoice() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) {
      setQuery('⚠️ Mic not supported — use Chrome')
      setTimeout(() => setQuery(''), 3000)
      return
    }
    // Auto-detect language from stored locale
    const localeMap: Record<string, string> = {
      hi:'hi-IN', en:'en-IN', bn:'bn-IN', gu:'gu-IN',
      mr:'mr-IN', ta:'ta-IN', te:'te-IN', pa:'pa-IN', ur:'ur-PK',
    }
    const locale = (typeof window !== 'undefined' ? localStorage.getItem('msc_locale') : null) ?? 'hi'
    const r = new SR()
    r.lang = localeMap[locale] ?? 'hi-IN'
    r.interimResults = true
    r.continuous = false
    recogRef.current = r
    r.onstart  = () => setListening(true)
    r.onend    = () => setListening(false)
    r.onerror  = () => { setListening(false); setQuery(''); }
    r.onresult = (e: any) => {
      const t = Array.from(e.results as SpeechRecognitionResultList).map((r: any) => r[0].transcript).join('')
      setQuery(t)
      if ((e.results as SpeechRecognitionResultList)[e.results.length-1].isFinal)
        router.push(`/search?q=${encodeURIComponent(t)}`)
    }
    r.start()
  }

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.srch-wrap'))  setShowSug(false)
      if (!(e.target as Element).closest('.notif-bell')) setShowNotif(false)
    }
    document.addEventListener('click', h)
    return () => document.removeEventListener('click', h)
  }, [])

  function markAllRead() {
    setNotifs(prev => prev.map(n => ({ ...n, unread: false })))
  }

  return (
    <header style={{ background:'#fff', borderBottom:'1px solid #e5e7eb', display:'flex', alignItems:'center', padding:'0 16px', height:58, gap:10, boxShadow:'0 2px 10px rgba(26,58,107,.07)', position:'sticky', top:0, zIndex:100 }}>
      <style>{`@keyframes pulse-mic{0%,100%{box-shadow:0 0 0 0 rgba(220,38,38,.4)}70%{box-shadow:0 0 0 8px rgba(220,38,38,0)}}`}</style>

      {/* Logo */}
      <Link href="/" style={{ display:'flex', alignItems:'center', gap:6, textDecoration:'none', flexShrink:0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/msctutor-logo.png" alt="MscTutor" style={{ width:46, height:46, objectFit:'contain', borderRadius:10, flexShrink:0 }} />
        <span style={{ fontWeight:900, fontSize:19, color:'#1a3a6b', letterSpacing:-0.5 }}>Msc<span style={{ color:'#f59e0b' }}>Tutor</span></span>
      </Link>

      {/* Search */}
      <form onSubmit={handleSearch} className="srch-wrap" style={{ flex:1, maxWidth:480, margin:'0 auto', position:'relative' }}>
        <div style={{ display:'flex', alignItems:'center', border:'2px solid #e5e7eb', borderRadius:11, background:'#f8faff', height:38 }}>
          <span style={{ paddingLeft:10, color:'#9ca3af', fontSize:15 }}>🔍</span>
          <input value={query} onChange={e=>{setQuery(e.target.value);setShowSug(true)}} onFocus={()=>setShowSug(true)}
            placeholder={listening?'🎤 Listening...':'Search questions, chapters...'}
            style={{ flex:1, border:'none', background:'transparent', padding:'0 8px', fontSize:13, outline:'none', color:'#111', fontFamily:'inherit' }} />
          <button type="button" onClick={listening?()=>{recogRef.current?.stop()}:startVoice}
            style={{ width:34, height:34, borderRadius:7, border:'none', background:listening?'#dc2626':'#e8eef8', color:listening?'#fff':'#1a3a6b', cursor:'pointer', fontSize:15, margin:'0 3px', display:'flex', alignItems:'center', justifyContent:'center', animation:listening?'pulse-mic 1s infinite':'none' }}>
            🎤
          </button>
          <button type="submit" style={{ width:34, height:34, borderRadius:'0 9px 9px 0', border:'none', background:'#1a3a6b', color:'#fff', cursor:'pointer', fontSize:13, display:'flex', alignItems:'center', justifyContent:'center' }}>→</button>
        </div>

        {/* Suggestions */}
        {showSug && (filtered.length > 0 || !query) && (
          <div style={{ position:'absolute', top:'calc(100% + 4px)', left:0, right:0, background:'#fff', borderRadius:12, boxShadow:'0 8px 28px rgba(0,0,0,.12)', border:'1px solid #e5e7eb', zIndex:200, overflow:'hidden' }}>
            {(query ? filtered : SUGGESTIONS.slice(0,5)).map(s => (
              <button key={s} onClick={()=>{setQuery(s);setShowSug(false);router.push(`/search?q=${encodeURIComponent(s)}`)}}
                style={{ width:'100%', textAlign:'left', padding:'8px 14px', border:'none', background:'transparent', cursor:'pointer', fontSize:13, color:'#374151', fontFamily:'inherit', display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ color:'#9ca3af', fontSize:12 }}>🔍</span>{s}
              </button>
            ))}
            <div style={{ borderTop:'1px solid #f3f4f6', padding:'7px 14px', display:'flex', gap:10 }}>
              <button onClick={()=>{setShowSug(false);router.push('/ask')}} style={{ fontSize:11, color:'#1a3a6b', background:'none', border:'none', cursor:'pointer', fontWeight:700 }}>🤖 Ask AI →</button>
              <button onClick={()=>{setShowSug(false);router.push('/ai-teacher')}} style={{ fontSize:11, color:'#0a5e3f', background:'none', border:'none', cursor:'pointer', fontWeight:700 }}>👩‍🏫 AI Teacher →</button>
            </div>
          </div>
        )}
      </form>

      {/* Right buttons */}
      <div style={{ display:'flex', alignItems:'center', gap:6, flexShrink:0 }}>
        {/* AI Teacher button */}
        <Link href="/ai-teacher"
          style={{ display:'flex', alignItems:'center', gap:5, padding:'6px 12px', background:'linear-gradient(135deg,#0a5e3f,#064e34)', color:'#fff', borderRadius:10, textDecoration:'none', fontWeight:700, fontSize:12, whiteSpace:'nowrap' }}>
          👩‍🏫 AI Teacher
        </Link>

        {/* Language Switcher */}
        <LanguageSwitcher variant="compact" />

        {/* Notification Bell */}
        <div className="notif-bell" style={{ position:'relative' }}>
          <button onClick={() => setShowNotif(v => !v)}
            style={{ position:'relative', width:36, height:36, borderRadius:9, border:'1.5px solid #e5e7eb', background:'#f8faff', color:'#1a3a6b', cursor:'pointer', fontSize:17, display:'flex', alignItems:'center', justifyContent:'center', transition:'background .15s' }}>
            🔔
            {unreadCount > 0 && (
              <span style={{ position:'absolute', top:-5, right:-5, background:'#ef4444', color:'#fff', borderRadius:'50%', width:17, height:17, fontSize:9, fontWeight:900, display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid #fff', lineHeight:1 }}>
                {unreadCount}
              </span>
            )}
          </button>

          {showNotif && (
            <div style={{ position:'absolute', top:'calc(100% + 8px)', right:0, width:310, background:'#fff', borderRadius:14, boxShadow:'0 12px 40px rgba(0,0,0,.15)', border:'1px solid #e5e7eb', zIndex:300, overflow:'hidden' }}>
              <div style={{ padding:'11px 14px', borderBottom:'1px solid #f3f4f6', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontWeight:800, color:'#1a3a6b', fontSize:13 }}>🔔 Notifications</span>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} style={{ fontSize:10, color:'#3b82f6', fontWeight:700, background:'none', border:'none', cursor:'pointer' }}>Mark all read</button>
                )}
              </div>
              {notifs.map(n => (
                <div key={n.id}
                  style={{ padding:'10px 14px', borderBottom:'1px solid #f9fafb', background: n.unread ? '#eff6ff' : '#fff', display:'flex', gap:9, alignItems:'flex-start', cursor:'pointer' }}
                  onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? {...x, unread:false} : x))}>
                  <span style={{ fontSize:16, flexShrink:0, marginTop:1 }}>{n.icon}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:11, color:'#374151', lineHeight:1.4, fontWeight: n.unread ? 700 : 400 }}>{n.text}</div>
                    <div style={{ fontSize:10, color:'#9ca3af', marginTop:2 }}>{n.time}</div>
                  </div>
                  {n.unread && <div style={{ width:7, height:7, borderRadius:'50%', background:'#3b82f6', flexShrink:0, marginTop:5 }} />}
                </div>
              ))}
              <div style={{ padding:'9px 14px', borderTop:'1px solid #f3f4f6', display:'flex', gap:10 }}>
                <Link href="/parent" onClick={() => setShowNotif(false)}
                  style={{ fontSize:11, color:'#1a3a6b', fontWeight:700, textDecoration:'none' }}>Parent Portal →</Link>
                <Link href="/dashboard" onClick={() => setShowNotif(false)}
                  style={{ fontSize:11, color:'#6b7280', fontWeight:700, textDecoration:'none' }}>My Dashboard →</Link>
              </div>
            </div>
          )}
        </div>

        {/* Ask AI */}
        <Link href="/ask"
          style={{ display:'flex', alignItems:'center', gap:5, background:'linear-gradient(135deg,#1a3a6b,#0e2347)', color:'#fff', borderRadius:10, padding:'7px 14px', textDecoration:'none', fontWeight:700, fontSize:13, whiteSpace:'nowrap', boxShadow:'0 2px 8px rgba(26,58,107,.25)' }}>
          📝 Ask AI
        </Link>
      </div>
    </header>
  )
}
