'use client'
// components/ask/VoiceInput.tsx — Web Speech API voice input

import { useState, useRef } from 'react'

interface Props {
  onResult:  (solution: string, slug: string) => void
  onLoading: (v: boolean) => void
}

type BrowserSpeechRecognitionResult = {
  0: { transcript: string }
}

type BrowserSpeechRecognitionEvent = {
  results: ArrayLike<BrowserSpeechRecognitionResult>
}

type BrowserSpeechRecognition = {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((event: BrowserSpeechRecognitionEvent) => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
  start: () => void
  stop: () => void
}

type BrowserSpeechRecognitionCtor = new () => BrowserSpeechRecognition

export default function VoiceInput({ onResult, onLoading }: Props) {
  const [recording,   setRecording]   = useState(false)
  const [transcript,  setTranscript]  = useState('')
  const [language,    setLanguage]    = useState('en-IN')
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null)

  const LANGS = [
    { code: 'en-IN', label: 'English (India)' },
    { code: 'hi-IN', label: 'हिंदी' },
    { code: 'bn-IN', label: 'বাংলা' },
    { code: 'te-IN', label: 'తెలుగు' },
    { code: 'mr-IN', label: 'मराठी' },
    { code: 'ta-IN', label: 'தமிழ்' },
  ]

  function startRecording() {
    const SR =
      ((window as Window & {
        SpeechRecognition?: BrowserSpeechRecognitionCtor
        webkitSpeechRecognition?: BrowserSpeechRecognitionCtor
      }).SpeechRecognition) ||
      ((window as Window & {
        SpeechRecognition?: BrowserSpeechRecognitionCtor
        webkitSpeechRecognition?: BrowserSpeechRecognitionCtor
      }).webkitSpeechRecognition)
    if (!SR) { alert('Voice input not supported in this browser. Try Chrome.'); return }
    const rec = new SR()
    rec.lang       = language
    rec.continuous = false
    rec.interimResults = true

    rec.onresult = (e: BrowserSpeechRecognitionEvent) => {
      const t = Array.from(e.results).map(r => r[0].transcript).join('')
      setTranscript(t)
    }
    rec.onend = () => setRecording(false)
    rec.onerror = () => { setRecording(false) }

    recognitionRef.current = rec
    rec.start()
    setRecording(true)
  }

  function stopRecording() {
    recognitionRef.current?.stop()
    setRecording(false)
  }

  async function handleSolve() {
    if (!transcript.trim()) return
    onLoading(true)
    try {
      const res  = await fetch('/api/ask-voice', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ transcript, language: language.split('-')[0] }),
      })
      const data = await res.json()
      onResult(data.solution ?? 'No answer received', data.slug ?? '')
    } catch {
      onResult('Voice processing failed. Please try again.', '')
    } finally {
      onLoading(false)
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <select
        value={language}
        onChange={e => setLanguage(e.target.value)}
        style={{ padding: '0.6rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, marginBottom: '1.5rem', background: '#fff' }}
      >
        {LANGS.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
      </select>

      <div style={{ marginBottom: '1.5rem' }}>
        <button
          onClick={recording ? stopRecording : startRecording}
          style={{
            width: 88, height: 88, borderRadius: '50%',
            background:  recording ? '#dc2626' : '#1a3a6b',
            color:       '#fff', border: 'none',
            fontSize:    32, cursor: 'pointer',
            animation:   recording ? 'pulse 1.5s infinite' : 'none',
            boxShadow:   recording ? '0 0 0 8px rgba(220,38,38,0.2)' : 'none',
            transition:  'all 0.2s',
          }}
        >
          {recording ? '⏹' : '🎤'}
        </button>
        <p style={{ color: '#6b7280', fontSize: 14, marginTop: '0.75rem' }}>
          {recording ? '🔴 Listening… Click to stop' : 'Click to start speaking'}
        </p>
      </div>

      {transcript && (
        <div style={{ background: '#f9fafb', border: '1.5px solid #e5e7eb', borderRadius: 12, padding: '1rem', marginBottom: '1rem', textAlign: 'left' }}>
          <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6 }}>Your question:</div>
          <p style={{ fontSize: 15, color: '#111', margin: 0, lineHeight: 1.6 }}>{transcript}</p>
          <button onClick={() => setTranscript('')} style={{ marginTop: '0.5rem', fontSize: 12, color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>✕ Clear</button>
        </div>
      )}

      {transcript && (
        <button onClick={handleSolve} style={{ width: '100%', padding: '0.85rem', background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
          🤖 Solve This Question
        </button>
      )}

      <style>{`@keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(220,38,38,0.4) } 50% { box-shadow: 0 0 0 12px rgba(220,38,38,0) } }`}</style>
    </div>
  )
}
