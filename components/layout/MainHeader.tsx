'use client'
// components/layout/MainHeader.tsx — Enhanced header with voice search

import Link                          from 'next/link'
import { useRouter }                 from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

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

const SUGGESTIONS = [
  "Newton's second law class 9",
  "Quadratic formula derivation",
  "Photosynthesis equation",
  "Ohm's law explanation",
  "Class 10 trigonometry",
  "Integration by parts",
  "Periodic table elements",
  "Vedic math tricks",
]

export default function MainHeader() {
  const router  = useRouter()
  const [query,     setQuery]     = useState('')
  const [listening, setListening] = useState(false)
  const [showSug,   setShowSug]   = useState(false)
  const [pulse,     setPulse]     = useState(false)
  const inputRef  = useRef<HTMLInputElement>(null)
  const recogRef  = useRef<BrowserSpeechRecognition | null>(null)

  const filtered = SUGGESTIONS.filter(s => query && s.toLowerCase().includes(query.toLowerCase()))

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      setShowSug(false)
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  function startVoice() {
    const browserWindow = window as Window & {
      SpeechRecognition?: BrowserSpeechRecognitionCtor
      webkitSpeechRecognition?: BrowserSpeechRecognitionCtor
    }
    const SR = browserWindow.SpeechRecognition || browserWindow.webkitSpeechRecognition
    if (!SR) { alert('Voice search ke liye Chrome browser use karein!'); return }

    const recog       = new SR()
    recog.lang        = 'hi-IN'
    recog.continuous  = false
    recog.interimResults = true
    recogRef.current  = recog

    recog.onstart  = () => { setListening(true); setPulse(true) }
    recog.onend    = () => { setListening(false); setPulse(false) }
    recog.onerror  = () => { setListening(false); setPulse(false) }

    recog.onresult = (e: BrowserSpeechRecognitionEvent) => {
      const text = Array.from(e.results).map(r => r[0].transcript).join('')
      setQuery(text)
      if (e.results[e.results.length - 1].isFinal && text.trim()) {
        recog.stop()
        router.push(`/search?q=${encodeURIComponent(text.trim())}`)
      }
    }
    recog.start()
  }

  function stopVoice() {
    recogRef.current?.stop()
    setListening(false); setPulse(false)
  }

  // Close suggestions on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!(e.target as Element).closest('.search-wrapper')) setShowSug(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  return (
    <header style={{
      background: '#fff', borderBottom: '1px solid #e5e7eb',
      display: 'flex', alignItems: 'center',
      padding: '0 1.25rem', height: 60, gap: 14,
      boxShadow: '0 2px 12px rgba(26,58,107,.07)',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <style>{`
        @keyframes pulse-mic { 0%,100%{box-shadow:0 0 0 0 rgba(220,38,38,.4)} 70%{box-shadow:0 0 0 10px rgba(220,38,38,0)} }
        .header-search:focus { border-color:#1a3a6b !important; box-shadow: 0 0 0 3px rgba(26,58,107,.1) !important; }
        .sug-item:hover { background:#f0f4ff; }
      `}</style>

      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#1a3a6b,#0e2347)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 18, boxShadow: '0 3px 10px rgba(26,58,107,.3)' }}>M</div>
        <span style={{ fontWeight: 900, fontSize: 20, color: '#1a3a6b', letterSpacing: -0.5 }}>
          Msc<span style={{ color: '#f59e0b' }}>Tutor</span>
        </span>
      </Link>

      {/* Search bar with voice */}
      <form onSubmit={handleSearch} className="search-wrapper" style={{ flex: 1, maxWidth: 560, margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #e5e7eb', borderRadius: 12, background: '#f8faff', overflow: 'visible', transition: 'border-color .2s' }}>
          {/* Search icon */}
          <span style={{ paddingLeft: 12, color: '#9ca3af', fontSize: 16, flexShrink: 0 }}>🔍</span>

          {/* Input */}
          <input
            ref={inputRef}
            className="header-search"
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setShowSug(true) }}
            onFocus={() => setShowSug(true)}
            placeholder={listening ? '🎤 Sun raha hoon...' : 'Search questions, chapters, topics... (ya Jarvis se bolo)'}
            style={{ flex: 1, border: 'none', background: 'transparent', padding: '10px 8px', fontSize: 14, outline: 'none', color: '#111', fontFamily: 'inherit' }}
          />

          {/* Voice button */}
          <button
            type="button"
            onClick={listening ? stopVoice : startVoice}
            title={listening ? 'Voice band karo' : 'Voice se search karo'}
            style={{
              width: 36, height: 36, borderRadius: 8, border: 'none',
              background: listening ? '#dc2626' : '#e8eef8', color: listening ? '#fff' : '#1a3a6b',
              cursor: 'pointer', fontSize: 16, margin: '0 4px', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: pulse ? 'pulse-mic 1s infinite' : 'none',
              transition: 'background .2s',
            }}
          >
            🎤
          </button>

          {/* Search submit */}
          <button
            type="submit"
            style={{ width: 36, height: 36, borderRadius: '0 10px 10px 0', border: 'none', background: '#1a3a6b', color: '#fff', cursor: 'pointer', fontSize: 15, marginRight: 0, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            →
          </button>
        </div>

        {/* Voice indicator banner */}
        {listening && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#dc2626', color: '#fff', borderRadius: '0 0 12px 12px', padding: '6px 14px', fontSize: 13, fontWeight: 700, textAlign: 'center', zIndex: 200, boxShadow: '0 4px 12px rgba(220,38,38,.3)' }}>
            🎤 Bol raha hoon sunna band karo... &nbsp;
            <button onClick={stopVoice} style={{ background: 'rgba(255,255,255,.25)', border: 'none', color: '#fff', borderRadius: 6, padding: '2px 8px', cursor: 'pointer', fontSize: 12 }}>Band Karo</button>
          </div>
        )}

        {/* Suggestions dropdown */}
        {showSug && (filtered.length > 0 || !query) && (
          <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, background: '#fff', borderRadius: 14, boxShadow: '0 8px 30px rgba(0,0,0,.12)', border: '1px solid #e5e7eb', zIndex: 200, overflow: 'hidden' }}>
            {!query && (
              <div style={{ padding: '8px 14px 4px', fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: .5 }}>Popular searches</div>
            )}
            {(query ? filtered : SUGGESTIONS.slice(0, 6)).map(s => (
              <button key={s} className="sug-item"
                onClick={() => { setQuery(s); setShowSug(false); router.push(`/search?q=${encodeURIComponent(s)}`) }}
                style={{ width: '100%', textAlign: 'left', padding: '9px 14px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 14, color: '#374151', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'inherit' }}>
                <span style={{ color: '#9ca3af', fontSize: 12 }}>🔍</span> {s}
              </button>
            ))}
            <div style={{ borderTop: '1px solid #f3f4f6', padding: '8px 14px' }}>
              <button onClick={() => { setShowSug(false); router.push('/ask') }}
                style={{ fontSize: 12, color: '#1a3a6b', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>
                🤖 AI se seedha poochho →
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Action buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <Link href="/calculators"
          title="Calculators"
          style={{ width: 36, height: 36, borderRadius: 10, background: '#f8faff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: 17, transition: 'background .15s' }}>
          🧮
        </Link>
        <Link href="/formulas"
          title="Formula Bank"
          style={{ width: 36, height: 36, borderRadius: 10, background: '#f8faff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: 17 }}>
          📐
        </Link>
        <Link href="/ask"
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'linear-gradient(135deg,#1a3a6b,#0e2347)', color: '#fff', borderRadius: 12, padding: '8px 16px', textDecoration: 'none', fontWeight: 700, fontSize: 13, boxShadow: '0 3px 10px rgba(26,58,107,.3)', whiteSpace: 'nowrap' }}>
          📝 Ask AI
        </Link>
      </div>
    </header>
  )
}
