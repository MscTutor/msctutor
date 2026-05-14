'use client'
// components/layout/JarvisAssistant.tsx
// Jarvis voice command + AI chatbox — floating on all pages

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface Message { role: 'user' | 'ai'; text: string; time: string }

type BrowserSpeechRecognitionResult = {
  0: { transcript: string }
  isFinal?: boolean
}

type BrowserSpeechRecognitionEvent = {
  results: ArrayLike<BrowserSpeechRecognitionResult>
}

type BrowserSpeechRecognition = {
  lang: string
  continuous: boolean
  interimResults: boolean
  onstart: (() => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
  onresult: ((event: BrowserSpeechRecognitionEvent) => void) | null
  start: () => void
  stop: () => void
}

type BrowserSpeechRecognitionCtor = new () => BrowserSpeechRecognition

export default function JarvisAssistant() {
  const router = useRouter()
  const [open,       setOpen]       = useState(false)
  const [mode,       setMode]       = useState<'chat'|'voice'>('chat')
  const [messages,   setMessages]   = useState<Message[]>([
    { role: 'ai', text: '👋 Namaste! Main Jarvis hoon — MscTutor ka AI assistant. Koi bhi sawaal poochho ya boliye "open mathematics class 10" jaisi command!', time: now() }
  ])
  const [input,      setInput]      = useState('')
  const [loading,    setLoading]    = useState(false)
  const [listening,  setListening]  = useState(false)
  const [transcript, setTranscript] = useState('')
  const [pulse,      setPulse]      = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const recogRef  = useRef<BrowserSpeechRecognition | null>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  function now() { return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }

  // Auto-scroll to bottom
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  // Handle navigation commands
  const handleCommand = useCallback((text: string) => {
    const t = text.toLowerCase()
    if (t.includes('open') || t.includes('go to') || t.includes('show') || t.includes('kholo') || t.includes('dikhao')) {
      if (t.includes('home') || t.includes('ghar'))        { router.push('/');               return '🏠 Home page khol raha hoon!' }
      if (t.includes('mock test') || t.includes('test'))   { router.push('/mock-test');       return '📋 Mock Test khol raha hoon!' }
      if (t.includes('formula'))                            { router.push('/formulas');        return '📐 Formula bank khol raha hoon!' }
      if (t.includes('calculator'))                         { router.push('/calculators');     return '🔢 Calculator khol raha hoon!' }
      if (t.includes('community'))                          { router.push('/community');       return '💬 Community khol raha hoon!' }
      if (t.includes('live'))                               { router.push('/live');            return '🎥 Live Classes khol raha hoon!' }
      if (t.includes('parent'))                             { router.push('/parent');          return '👨‍👩‍👧 Parent Dashboard khol raha hoon!' }
      if (t.includes('analytic') || t.includes('progress')) { router.push('/analytics');      return '📊 Analytics khol raha hoon!' }
      if (t.includes('competitive') || t.includes('ntse') || t.includes('olympiad')) { router.push('/competitive'); return '🏆 Competitive Exams khol raha hoon!' }
      if (t.includes('jee') || t.includes('neet'))         { router.push('/jee-neet');        return '🏆 JEE/NEET page khol raha hoon!' }
      if (t.includes('report') || t.includes('card'))      { router.push('/report');          return '📋 Report Card khol raha hoon!' }
      if (t.includes('dashboard'))                          { router.push('/dashboard');       return '📊 Dashboard khol raha hoon!' }
      if (t.includes('class 12'))  { router.push('/class/12');              return '📚 Class 12 page khol raha hoon!' }
      if (t.includes('class 11'))  { router.push('/class/11');              return '📚 Class 11 page khol raha hoon!' }
      if (t.includes('class 10'))  { router.push('/class/10');              return '📚 Class 10 page khol raha hoon!' }
      if (t.includes('class 9'))   { router.push('/class/9');               return '📚 Class 9 page khol raha hoon!' }
      if (t.includes('class 8'))   { router.push('/class/8');               return '📚 Class 8 page khol raha hoon!' }
      if (t.includes('class 7'))   { router.push('/class/7');               return '📚 Class 7 page khol raha hoon!' }
      if (t.includes('class 6'))   { router.push('/class/6');               return '📚 Class 6 page khol raha hoon!' }
      if (t.includes('physics'))   { router.push('/class/11/physics');      return '🔬 Physics khol raha hoon!' }
      if (t.includes('chemistry')) { router.push('/class/11/chemistry');    return '🧪 Chemistry khol raha hoon!' }
      if (t.includes('biology'))   { router.push('/class/11/biology');      return '🧬 Biology khol raha hoon!' }
      if (t.includes('math'))      { router.push('/class/10/mathematics');  return '➕ Mathematics khol raha hoon!' }
      if (t.includes('hindi'))     { router.push('/class/10/hindi');        return '🇮🇳 Hindi khol raha hoon!' }
      if (t.includes('english'))   { router.push('/class/10/english');      return '📖 English khol raha hoon!' }
      if (t.includes('science'))   { router.push('/class/10/science');      return '⚗️ Science khol raha hoon!' }
    }
    if (t.includes('search') || t.includes('khojo') || t.includes('dhundo')) {
      const query = t.replace(/search|for|about|khojo|dhundo/gi, '').trim()
      if (query) { router.push(`/search?q=${encodeURIComponent(query)}`); return `🔍 "${query}" search kar raha hoon!` }
    }
    return null
  }, [router])

  // AI response
  async function askAI(question: string) {
    setLoading(true)
    const cmdResponse = handleCommand(question)
    if (cmdResponse) {
      setMessages(m => [...m, { role: 'ai', text: cmdResponse, time: now() }])
      setLoading(false)
      return
    }
    try {
      const res  = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question + ' (give a concise helpful answer in 2-4 sentences, in Hindi or English based on question language)' }),
      })
      const data = await res.json()
      const ans  = data.solution ?? data.answer ?? 'Sorry, abhi answer nahi mil saka. Please dobara try karein!'
      setMessages(m => [...m, { role: 'ai', text: ans.slice(0, 500), time: now() }])
    } catch {
      setMessages(m => [...m, { role: 'ai', text: '⚠️ Network error. Internet connection check karein!', time: now() }])
    }
    setLoading(false)
  }

  function send() {
    const q = input.trim()
    if (!q) return
    setMessages(m => [...m, { role: 'user', text: q, time: now() }])
    setInput('')
    askAI(q)
  }

  // Voice recognition
  function startVoice() {
    const browserWindow = window as Window & {
      SpeechRecognition?: BrowserSpeechRecognitionCtor
      webkitSpeechRecognition?: BrowserSpeechRecognitionCtor
    }
    const SR = browserWindow.SpeechRecognition || browserWindow.webkitSpeechRecognition
    if (!SR) {
      setMessages(m => [...m, { role: 'ai', text: '⚠️ Aapka browser voice recognition support nahi karta. Chrome ya Edge use karein!', time: now() }])
      setMode('chat')
      return
    }

    // Auto-detect language from stored locale
    const localeMap: Record<string, string> = {
      hi: 'hi-IN', en: 'en-IN', bn: 'bn-IN', gu: 'gu-IN',
      mr: 'mr-IN', ta: 'ta-IN', te: 'te-IN', pa: 'pa-IN', ur: 'ur-PK',
    }
    const locale = (typeof window !== 'undefined' ? localStorage.getItem('msc_locale') : null) ?? 'hi'
    const lang = localeMap[locale] ?? 'hi-IN'

    const recog = new SR()
    recog.lang           = lang
    recog.interimResults = true
    recog.continuous     = false
    recogRef.current     = recog

    recog.onstart  = () => { setListening(true); setPulse(true) }
    recog.onend    = () => { setListening(false); setPulse(false) }
    recog.onerror  = () => {
      setListening(false)
      setPulse(false)
      setTranscript('')
      setMessages(m => [...m, { role: 'ai', text: '🎤 Voice input nahi sun paya. Mic ki permission check karein aur dobara try karein.', time: now() }])
      setMode('chat')
    }
    recog.onresult = (e: BrowserSpeechRecognitionEvent) => {
      const t = Array.from(e.results).map(r => r[0].transcript).join('')
      setTranscript(t)
      if (e.results[e.results.length - 1].isFinal) {
        setMessages(m => [...m, { role: 'user', text: t, time: now() }])
        setTranscript('')
        setMode('chat')
        askAI(t)
        recog.stop()
      }
    }
    recog.start()
  }

  function stopVoice() {
    recogRef.current?.stop()
    setListening(false)
    setPulse(false)
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          width: 58, height: 58, borderRadius: '50%',
          background: open ? '#dc2626' : 'linear-gradient(135deg,#1a3a6b,#0e2347)',
          border: 'none', cursor: 'pointer', color: '#fff',
          fontSize: 24, boxShadow: '0 4px 20px rgba(26,58,107,.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s', transform: open ? 'scale(1.05) rotate(45deg)' : 'scale(1)',
        }}
        title={open ? 'Close Jarvis' : 'Open Jarvis AI Assistant'}
      >
        {open ? '✕' : '🤖'}
      </button>

      {/* Jarvis panel */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 92, right: 24, zIndex: 9998,
          width: 360, maxWidth: 'calc(100vw - 48px)',
          background: '#fff', borderRadius: 20,
          boxShadow: '0 8px 40px rgba(0,0,0,.18), 0 2px 8px rgba(0,0,0,.1)',
          border: '1px solid #e5e7eb',
          display: 'flex', flexDirection: 'column',
          maxHeight: '70vh', overflow: 'hidden',
          animation: 'slideUp .25s ease',
        }}>
          <style>{`
            @keyframes slideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
            @keyframes pulseRing { 0%{box-shadow:0 0 0 0 rgba(220,38,38,.4)} 70%{box-shadow:0 0 0 16px rgba(220,38,38,0)} 100%{box-shadow:0 0 0 0 rgba(220,38,38,0)} }
            .chat-msg-ai { background:#f0f4ff; border-radius:0 14px 14px 14px; }
            .chat-msg-user { background:#1a3a6b; color:#fff; border-radius:14px 14px 0 14px; margin-left:auto; }
          `}</style>

          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg,#1a3a6b,#0e2347)', padding: '14px 16px', borderRadius: '20px 20px 0 0', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🤖</div>
            <div>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: 15 }}>Jarvis — AI Assistant</div>
              <div style={{ color: '#93c5fd', fontSize: 11 }}>Voice • Chat • Navigation</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
              <button onClick={() => setMode(m => m === 'chat' ? 'voice' : 'chat')}
                style={{ background: mode === 'voice' ? '#dc2626' : '#ffffff22', color: '#fff', border: 'none', borderRadius: 8, padding: '4px 10px', cursor: 'pointer', fontSize: 13 }}>
                {mode === 'voice' ? '💬 Chat' : '🎤 Voice'}
              </button>
            </div>
          </div>

          {/* Voice mode */}
          {mode === 'voice' && (
            <div style={{ padding: '2rem', textAlign: 'center', background: '#f8f9fc' }}>
              <div style={{ fontSize: 13, color: '#6b7280', marginBottom: '1rem' }}>
                Bol sakte ho:<br/>
                <span style={{ color: '#1a3a6b', fontWeight: 600 }}>"Class 10 mathematics kholo"</span><br/>
                <span style={{ color: '#1a3a6b', fontWeight: 600 }}>"Newton's law explain karo"</span><br/>
                <span style={{ color: '#1a3a6b', fontWeight: 600 }}>"Mock test start karo"</span>
              </div>
              {transcript && <div style={{ background: '#e8eef8', borderRadius: 10, padding: '8px 12px', fontSize: 13, marginBottom: '1rem', color: '#1a3a6b' }}>"{transcript}"</div>}
              <button
                onClick={listening ? stopVoice : startVoice}
                style={{
                  width: 72, height: 72, borderRadius: '50%', border: 'none', cursor: 'pointer',
                  background: listening ? '#dc2626' : '#1a3a6b', color: '#fff', fontSize: 28,
                  animation: pulse ? 'pulseRing 1.2s infinite' : 'none',
                  transition: 'background 0.2s',
                }}
              >
                {listening ? '⏹' : '🎤'}
              </button>
              <div style={{ fontSize: 12, color: '#6b7280', marginTop: 8 }}>
                {listening ? '🔴 Sun raha hoon...' : 'Baat karne ke liye tap karein'}
              </div>
            </div>
          )}

          {/* Chat messages */}
          {mode === 'chat' && (
            <>
              <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, minHeight: 240, maxHeight: 360 }}>
                {messages.map((msg, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                    <div className={msg.role === 'user' ? 'chat-msg-user' : 'chat-msg-ai'}
                      style={{ padding: '8px 12px', fontSize: 13, lineHeight: 1.6, maxWidth: '88%', wordBreak: 'break-word' }}>
                      {msg.text}
                    </div>
                    <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 2, paddingInline: 4 }}>{msg.time}</div>
                  </div>
                ))}
                {loading && (
                  <div className="chat-msg-ai" style={{ padding: '8px 12px', fontSize: 13, display: 'flex', gap: 4, alignItems: 'center', width: 'fit-content' }}>
                    {[0,1,2].map(i => (
                      <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#1a3a6b', display: 'inline-block', animation: `bounce .8s ${i * 0.2}s infinite` }} />
                    ))}
                    <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}`}</style>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Quick commands */}
              <div style={{ padding: '6px 12px', display: 'flex', gap: 6, flexWrap: 'wrap', borderTop: '1px solid #f3f4f6' }}>
                {[
                  { label: '📋 Mock Test', cmd: 'open mock test' },
                  { label: '📐 Formulas',  cmd: 'open formula bank' },
                  { label: '🔬 Physics',   cmd: 'open class 11 physics' },
                  { label: '➕ Maths',     cmd: 'open class 10 mathematics' },
                  { label: '🏆 JEE/NEET', cmd: 'open jee neet' },
                  { label: '🎥 Live',      cmd: 'open live classes' },
                ].map(({ label, cmd }) => (
                  <button key={label} onClick={() => {
                    setMessages(m => [...m, { role: 'user', text: cmd, time: now() }])
                    askAI(cmd)
                  }}
                    style={{ fontSize: 11, padding: '3px 8px', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 20, cursor: 'pointer', color: '#374151' }}>
                    {label}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div style={{ padding: '10px 12px', borderTop: '1px solid #f3f4f6', display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send()}
                  placeholder="Kuch bhi poochho ya command do..."
                  style={{ flex: 1, padding: '8px 12px', border: '1.5px solid #e5e7eb', borderRadius: 12, fontSize: 13, outline: 'none', fontFamily: 'inherit' }}
                />
                <button onClick={() => { setMode('voice'); startVoice() }}
                  style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', background: '#e8eef8', color: '#1a3a6b', cursor: 'pointer', fontSize: 16, flexShrink: 0 }}>
                  🎤
                </button>
                <button onClick={send} disabled={!input.trim() || loading}
                  style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', background: input.trim() ? '#1a3a6b' : '#e5e7eb', color: '#fff', cursor: input.trim() ? 'pointer' : 'default', fontSize: 16, flexShrink: 0 }}>
                  ➤
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
