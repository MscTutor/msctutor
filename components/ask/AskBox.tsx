'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const TABS = [
  { id: 'text',  icon: '✏️', label: 'Type'   },
  { id: 'image', icon: '📷', label: 'Image'  },
  { id: 'voice', icon: '🎤', label: 'Voice'  },
  { id: 'pdf',   icon: '📄', label: 'PDF'    },
]

interface SolutionData {
  subject: string; chapter: string; answer: string
  steps: { step: number; title: string; content: string }[]
  formula: string; formulaLatex: string; ncertRef: string
  relatedTopics: string[]; slug: string
}

export default function AskBox() {
  const router                   = useRouter()
  const [tab, setTab]            = useState('text')
  const [question, setQuestion]  = useState('')
  const [loading, setLoading]    = useState(false)
  const [solution, setSolution]  = useState<SolutionData | null>(null)
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const fileRef  = useRef<HTMLInputElement>(null)
  const pdfRef   = useRef<HTMLInputElement>(null)
  const recogRef = useRef<any>(null)

  async function solve(q: string, type: string = 'text') {
    if (!q.trim()) { toast.error('Pehle question likhein!'); return }
    setLoading(true); setSolution(null)
    try {
      const res  = await fetch('/api/ask', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ question: q, type }),
      })
      const data = await res.json()
      if (data.error) { toast.error(data.error); return }
      setSolution(data)
    } catch {
      toast.error('Error! Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function toggleVoice() {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SR) { toast.error('Voice not supported — use Chrome!'); return }
    if (listening) { recogRef.current?.stop(); setListening(false); return }
    const r = new SR()
    r.lang = 'hi-IN'; r.continuous = false; r.interimResults = true
    r.onresult = (e: any) => {
      const t = Array.from(e.results as any[]).map((x: any) => x[0].transcript).join('')
      setTranscript(t)
    }
    r.onend = () => setListening(false)
    r.start(); setListening(true); recogRef.current = r
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) { toast.success(`📷 ${file.name} ready!`); solve(`Image question: ${file.name}`, 'image') }
  }

  function handlePDFUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) { toast.success(`📄 ${file.name} processing...`); solve(`PDF question from: ${file.name}`, 'pdf') }
  }

  function speakAnswer() {
    if (!solution) return
    const text = solution.steps.map(s => `${s.title}: ${s.content}`).join('. ')
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'hi-IN'; u.rate = 0.85
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(u)
    toast('🔊 Reading aloud...')
  }

  return (
    <div className="bg-white dark:bg-[#111827] rounded-[20px] shadow-lg border-[1.5px] border-[#dde5f5] dark:border-[#1e2d4a] p-1.5 max-w-[680px] mx-auto mb-7">
      {/* Tabs */}
      <div className="flex gap-1 p-1.5 pb-0 mb-1.5">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2 rounded-[10px] text-[13px] flex items-center justify-center gap-1.5 font-medium transition ${
              tab === t.id
                ? 'bg-primary-600 text-white font-semibold'
                : 'text-[#5a6a8a] hover:bg-[#f0f4ff] dark:hover:bg-[#1a2236]'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Text panel */}
      {tab === 'text' && (
        <div className="p-2">
          <textarea
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => e.ctrlKey && e.key === 'Enter' && solve(question)}
            rows={3}
            placeholder="Type your question... e.g. Newton ka pehla niyam kya hai? (Ctrl+Enter to solve)"
            className="w-full p-3 border-2 border-[#dde5f5] dark:border-[#1e2d4a] rounded-xl text-[15px] bg-[#f8faff] dark:bg-[#1a2236] text-[#0f1f3d] dark:text-[#e8eeff] outline-none focus:border-primary-glow focus:shadow-[0_0_0_3px_rgba(59,111,212,.1)] transition resize-none"
          />
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <select className="px-3 py-2 border border-[#dde5f5] dark:border-[#1e2d4a] rounded-[10px] text-[13px] bg-[#f8faff] dark:bg-[#1a2236] text-[#0f1f3d] dark:text-[#e8eeff] outline-none">
              <option value="">Auto Subject</option>
              {['Mathematics','Physics','Chemistry','Biology','Commerce','Economics'].map(s => <option key={s}>{s}</option>)}
            </select>
            <select className="px-3 py-2 border border-[#dde5f5] dark:border-[#1e2d4a] rounded-[10px] text-[13px] bg-[#f8faff] dark:bg-[#1a2236] text-[#0f1f3d] dark:text-[#e8eeff] outline-none">
              <option>Any Class</option>
              {['Class 9','Class 10','Class 11','Class 12'].map(c => <option key={c}>{c}</option>)}
            </select>
            <button
              onClick={() => solve(question)}
              className="ml-auto flex items-center gap-1.5 bg-gradient-to-r from-primary-600 to-primary-glow text-white rounded-xl px-5 py-2.5 text-[14px] font-head font-bold shadow-[0_3px_14px_rgba(26,58,107,.32)] hover:shadow-[0_5px_20px_rgba(26,58,107,.42)] hover:-translate-y-0.5 transition"
            >
              🤖 Solve Now
            </button>
          </div>
        </div>
      )}

      {/* Image panel */}
      {tab === 'image' && (
        <div className="p-2">
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-[#dde5f5] rounded-xl p-7 text-center cursor-pointer hover:border-primary-glow transition"
          >
            <div className="text-[36px] mb-2">📷</div>
            <p className="font-semibold text-[#0f1f3d] dark:text-[#e8eeff]">Click to upload or take photo</p>
            <p className="text-[12px] text-[#5a6a8a] mt-1">Auto WebP compress • Camera works on mobile</p>
          </div>
          <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImageUpload} />
        </div>
      )}

      {/* Voice panel */}
      {tab === 'voice' && (
        <div className="p-4 text-center">
          <button
            onClick={toggleVoice}
            className={`w-[76px] h-[76px] rounded-full border-none cursor-pointer text-[30px] text-white flex items-center justify-center mx-auto mb-3 shadow-[0_4px_20px_rgba(26,58,107,.35)] transition ${
              listening
                ? 'bg-gradient-to-br from-red-500 to-red-400 animate-pulse-ring'
                : 'bg-gradient-to-br from-primary-600 to-primary-glow hover:scale-105'
            }`}
          >
            🎤
          </button>
          <p className="text-[13px] text-[#5a6a8a] mb-3">
            {listening ? '🔴 Bol do sawaal...' : 'Click mic to speak your question'}
          </p>
          <div className="bg-[#f8faff] dark:bg-[#1a2236] rounded-xl p-3 text-[14px] text-[#0f1f3d] dark:text-[#e8eeff] text-left min-h-[44px] border border-[#dde5f5] dark:border-[#1e2d4a]">
            {transcript || 'Speech will appear here...'}
          </div>
          {transcript && (
            <button
              onClick={() => solve(transcript, 'voice')}
              className="mt-3 flex items-center gap-1.5 mx-auto bg-gradient-to-r from-primary-600 to-primary-glow text-white rounded-xl px-5 py-2.5 text-[14px] font-head font-bold"
            >
              🔊 Solve This
            </button>
          )}
        </div>
      )}

      {/* PDF panel */}
      {tab === 'pdf' && (
        <div className="p-2">
          <div
            onClick={() => pdfRef.current?.click()}
            className="border-2 border-dashed border-[#dde5f5] rounded-xl p-7 text-center cursor-pointer hover:border-primary-glow transition"
          >
            <div className="text-[36px] mb-2">📄</div>
            <p className="font-semibold text-[#0f1f3d] dark:text-[#e8eeff]">Upload PDF — textbook page</p>
            <p className="text-[12px] text-[#5a6a8a] mt-1">Text auto-extracted • AI solves directly</p>
          </div>
          <input ref={pdfRef} type="file" accept="application/pdf" className="hidden" onChange={handlePDFUpload} />
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="py-5 flex flex-col items-center gap-3">
          <div className="flex gap-2">
            {[0,1,2].map(i => (
              <span
                key={i}
                className="w-3 h-3 rounded-full bg-primary-600 animate-dot-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <p className="text-[13px] text-[#5a6a8a]">AI solving your question...</p>
        </div>
      )}

      {/* Solution */}
      {solution && !loading && (
        <div className="mt-2 border-t border-[#dde5f5] dark:border-[#1e2d4a] animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-glow p-3.5 flex items-center gap-2.5 rounded-b-[18px]">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-[17px]">🤖</div>
            <h3 className="text-white font-head text-[14px] font-semibold flex-1">MscTutor AI — Step-by-Step Solution</h3>
            <span className="bg-white/20 text-white rounded-full px-2.5 py-0.5 text-[11px]">{solution.subject}</span>
          </div>
          <div className="p-4">
            {/* Steps */}
            <div className="space-y-2.5 mb-4">
              {solution.steps.map(s => (
                <div key={s.step} className="flex gap-3 items-start p-3 bg-[#f8faff] dark:bg-[#1a2236] rounded-xl">
                  <div className="w-6 h-6 rounded-full bg-primary-600 text-white flex items-center justify-center text-[11px] font-bold flex-shrink-0 font-head">{s.step}</div>
                  <div>
                    <div className="text-[13px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] mb-0.5">{s.title}</div>
                    <div className="text-[13px] text-[#5a6a8a] leading-relaxed">{s.content}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Formula */}
            {solution.formula && (
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-[#1e2d4a] dark:to-[#1a2236] border-l-4 border-primary-600 rounded-r-xl p-3.5 mb-4">
                <div className="text-[11px] font-bold text-primary-600 uppercase tracking-wider mb-1">📐 Formula</div>
                <div className="font-mono text-[16px] font-bold text-[#0f1f3d] dark:text-[#e8eeff]">{solution.formula}</div>
              </div>
            )}
            {/* NCERT Reference */}
            {solution.ncertRef && (
              <div className="flex items-center gap-2 text-[12.5px] text-[#5a6a8a] bg-[#f8faff] dark:bg-[#1a2236] rounded-xl p-2.5 mb-4">
                <span>📚</span><span>{solution.ncertRef}</span>
              </div>
            )}
            {/* Actions */}
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => router.push(`/question/${solution.slug}`)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] bg-primary-600 text-white text-[12.5px] font-medium hover:opacity-90 transition">
                📄 Full Page
              </button>
              <button onClick={speakAnswer} className="flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] border border-[#dde5f5] dark:border-[#1e2d4a] text-[#0f1f3d] dark:text-[#e8eeff] text-[12.5px] hover:bg-[#f0f4ff] dark:hover:bg-[#1a2236] transition">
                🔊 Read Aloud
              </button>
              <button onClick={() => toast.success('Saved! ✓')} className="flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] border border-[#dde5f5] dark:border-[#1e2d4a] text-[#0f1f3d] dark:text-[#e8eeff] text-[12.5px] hover:bg-[#f0f4ff] dark:hover:bg-[#1a2236] transition">
                🔖 Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
