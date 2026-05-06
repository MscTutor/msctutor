'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import toast from 'react-hot-toast'
import type { Metadata } from 'next'

type View = 'setup' | 'exam' | 'result'

interface Question {
  id: number; order: number; questionText: string
  options?: string[]; correctAnswer: string; explanation?: string
  marks: number; chapter?: string; type: string
}
interface ExamData  { id: number; title: string; duration: number; totalMarks: number; questions: Question[] }
interface ResultData { score: number; totalMarks: number; percentage: number; grade: string; analysis: Record<string, any>; timeTaken: number }

const BOARDS    = ['CBSE','ICSE','UP Board','MP Board','Maharashtra Board','Bihar Board','NCERT']
const CLASSES   = ['6','7','8','9','10','11','12']
const SUBJECTS  = ['Mathematics','Physics','Chemistry','Biology','Science','Commerce','Economics','Accountancy','English','Computer Science']
const MEDIUMS   = ['English','Hindi']
const DIFFS     = ['Mixed','Easy','Medium','Hard']
const Q_COUNTS  = [10,20,30,40]

export default function MockTestPage() {
  const [view,    setView]    = useState<View>('setup')
  const [exam,    setExam]    = useState<ExamData | null>(null)
  const [result,  setResult]  = useState<ResultData | null>(null)
  const [loading, setLoading] = useState(false)

  // Setup state
  const [board,   setBoard]   = useState('CBSE')
  const [cls,     setCls]     = useState('10')
  const [subject, setSubject] = useState('Mathematics')
  const [medium,  setMedium]  = useState('English')
  const [diff,    setDiff]    = useState('Mixed')
  const [qCount,  setQCount]  = useState(20)

  // Exam state
  const [current,   setCurrent]   = useState(0)
  const [answers,   setAnswers]   = useState<Record<string, string>>({})
  const [marked,    setMarked]    = useState<Set<number>>(new Set())
  const [timeLeft,  setTimeLeft]  = useState(0)
  const [elapsed,   setElapsed]   = useState(0)
  const timerRef = useRef<any>(null)

  const startTimer = useCallback((duration: number) => {
    setTimeLeft(duration * 60)
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); submitExam(); return 0 }
        return t - 1
      })
      setElapsed(e => e + 1)
    }, 1000)
  }, [])

  useEffect(() => () => clearInterval(timerRef.current), [])

  async function generateExam() {
    setLoading(true)
    try {
      const res  = await fetch('/api/exam/generate', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ subject, classLevel: cls, board, medium, difficulty: diff.toLowerCase(), totalQ: qCount }),
      })
      const data = await res.json()
      if (data.error) { toast.error(data.error); return }
      setExam(data.exam)
      setAnswers({}); setMarked(new Set()); setCurrent(0)
      setView('exam')
      startTimer(data.exam.duration)
      toast.success(`✅ ${data.exam.questions.length} questions ready!`)
    } catch { toast.error('Error generating exam. Try again.') }
    finally   { setLoading(false) }
  }

  async function submitExam() {
    clearInterval(timerRef.current)
    if (!exam) return
    try {
      const res  = await fetch('/api/exam/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ examId: exam.id, answers, userName: 'Student', timeTaken: elapsed }),
      })
      const data = await res.json()
      setResult(data)
      setView('result')
    } catch { toast.error('Submit error') }
  }

  const fmt = (s: number) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`
  const timerWarn = timeLeft > 0 && timeLeft <= 300

  // ── SETUP VIEW ────────────────────────────────────────
  if (view === 'setup') return (
    <div className="max-w-[760px] mx-auto px-5 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 bg-primary-600/8 border border-primary-600/15 rounded-full px-4 py-1.5 text-[12.5px] text-primary-600 font-semibold mb-4">
          🤖 AI-Powered Mock Test
        </div>
        <h1 className="font-head text-[32px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff] mb-2">
          Practice Makes Perfect
        </h1>
        <p className="text-[15px] text-[#5a6a8a]">AI generates a real {board} exam paper in seconds</p>
      </div>

      {/* Config card */}
      <div className="bg-white dark:bg-[#111827] rounded-[24px] p-7 border-[1.5px] border-[#dde5f5] dark:border-[#1e2d4a] shadow-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <SelectField label="📋 Board" value={board} onChange={setBoard} options={BOARDS} />
          <SelectField label="🎓 Class" value={cls}   onChange={setCls}   options={CLASSES.map(c => ({ label: `Class ${c}`, value: c }))} />
          <SelectField label="📚 Subject" value={subject} onChange={setSubject} options={SUBJECTS} />
          <SelectField label="🌐 Medium"  value={medium}  onChange={setMedium}  options={MEDIUMS} />
          <SelectField label="⚡ Difficulty" value={diff} onChange={setDiff} options={DIFFS} />
          <SelectField label="❓ Questions"  value={String(qCount)} onChange={v => setQCount(Number(v))} options={Q_COUNTS.map(q => ({ label: `${q} Questions (~${q*2} min)`, value: String(q) }))} />
        </div>

        {/* Preview */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: '❓', label: 'Questions', value: qCount },
            { icon: '⏱️', label: 'Duration',  value: `${qCount*2} min` },
            { icon: '🎯', label: 'Total Marks',value: qCount*2 },
          ].map(s => (
            <div key={s.label} className="bg-[#f8faff] dark:bg-[#1a2236] rounded-[14px] p-3 text-center border border-[#dde5f5]">
              <div className="text-[22px] mb-1">{s.icon}</div>
              <div className="font-head text-[18px] font-extrabold text-primary-600">{s.value}</div>
              <div className="text-[11px] text-[#5a6a8a]">{s.label}</div>
            </div>
          ))}
        </div>

        <button
          onClick={generateExam}
          disabled={loading}
          className="w-full py-4 rounded-[14px] bg-gradient-to-r from-primary-600 to-primary-glow text-white font-head font-bold text-[16px] shadow-[0_4px_20px_rgba(26,58,107,.35)] hover:shadow-[0_6px_28px_rgba(26,58,107,.45)] hover:-translate-y-0.5 disabled:opacity-70 disabled:translate-y-0 transition"
        >
          {loading
            ? <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Generating Paper with AI...
              </span>
            : '🤖 Generate Paper with AI →'
          }
        </button>
        <p className="text-center text-[12px] text-[#5a6a8a] mt-3">Questions auto-matched to {board} syllabus</p>
      </div>
    </div>
  )

  // ── EXAM VIEW ─────────────────────────────────────────
  if (view === 'exam' && exam) {
    const q   = exam.questions[current]
    const opts = q.options ? (typeof q.options === 'string' ? JSON.parse(q.options) : q.options) : []

    return (
      <div className="flex flex-col h-[calc(100vh-154px)]">
        {/* Top bar */}
        <div className={`flex items-center justify-between px-5 py-2.5 border-b ${timerWarn ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900' : 'bg-white dark:bg-[#111827] border-[#dde5f5]'}`}>
          <div className="text-[13px] font-semibold text-[#0f1f3d] dark:text-[#e8eeff]">
            {exam.title}
          </div>
          <div className={`font-head font-extrabold text-[20px] ${timerWarn ? 'text-red-500 animate-pulse-ring rounded-lg px-3 py-1' : 'text-[#0f1f3d] dark:text-[#e8eeff]'}`}>
            ⏱️ {fmt(timeLeft)}
          </div>
          <button
            onClick={() => { if (confirm('Submit exam now?')) submitExam() }}
            className="bg-red-500 hover:bg-red-600 text-white rounded-xl px-4 py-2 text-[13px] font-head font-bold transition"
          >
            Submit →
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Question area */}
          <div className="flex-1 overflow-y-auto p-5">
            <div className="max-w-[680px] mx-auto">
              {/* Progress */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[13px] text-[#5a6a8a]">Q {current + 1} of {exam.questions.length}</span>
                <div className="flex-1 h-1.5 bg-[#dde5f5] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary-600 to-primary-glow rounded-full transition-all" style={{ width: `${((current+1)/exam.questions.length)*100}%` }} />
                </div>
                <span className="text-[13px] font-semibold text-primary-600">{q.marks} marks</span>
              </div>

              {/* Question card */}
              <div className="bg-white dark:bg-[#111827] rounded-[20px] p-6 border-[1.5px] border-[#dde5f5] dark:border-[#1e2d4a] mb-5 shadow-card">
                <p className="text-[16px] text-[#0f1f3d] dark:text-[#e8eeff] leading-relaxed font-medium">{q.questionText}</p>
              </div>

              {/* Options */}
              {opts.length > 0 && (
                <div className="space-y-2.5 mb-6">
                  {opts.map((opt: string, i: number) => {
                    const selected = answers[String(q.id)] === opt
                    return (
                      <button
                        key={i}
                        onClick={() => setAnswers(prev => ({ ...prev, [String(q.id)]: opt }))}
                        className={`w-full text-left flex items-center gap-3 p-4 rounded-[14px] border-2 transition ${
                          selected
                            ? 'border-primary-600 bg-primary-600/8 dark:bg-primary-600/12 text-[#0f1f3d] dark:text-[#e8eeff] font-semibold'
                            : 'border-[#dde5f5] dark:border-[#1e2d4a] bg-white dark:bg-[#111827] text-[#0f1f3d] dark:text-[#e8eeff] hover:border-primary-600/40'
                        }`}
                      >
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold flex-shrink-0 font-head transition ${selected ? 'bg-primary-600 text-white' : 'bg-[#f0f4ff] dark:bg-[#1a2236] text-[#5a6a8a]'}`}>
                          {['A','B','C','D'][i]}
                        </span>
                        <span className="text-[14px] leading-snug">{opt.replace(/^[A-D]\.\s*/,'')}</span>
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => setCurrent(c => Math.max(0, c - 1))}
                  disabled={current === 0}
                  className="px-5 py-2.5 rounded-xl border-2 border-[#dde5f5] text-[#5a6a8a] disabled:opacity-40 hover:border-primary-600 hover:text-primary-600 transition text-[13px] font-semibold"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => {
                    const newMarked = new Set(marked)
                    if (marked.has(q.id)) newMarked.delete(q.id); else newMarked.add(q.id)
                    setMarked(newMarked)
                  }}
                  className={`px-5 py-2.5 rounded-xl border-2 transition text-[13px] font-semibold ${marked.has(q.id) ? 'border-amber-400 bg-amber-50 text-amber-600' : 'border-[#dde5f5] text-[#5a6a8a] hover:border-amber-400'}`}
                >
                  {marked.has(q.id) ? '🔖 Marked' : '🔖 Mark'}
                </button>
                {current < exam.questions.length - 1
                  ? <button onClick={() => setCurrent(c => c + 1)} className="px-5 py-2.5 rounded-xl bg-primary-600 text-white font-semibold text-[13px] hover:bg-primary-500 transition">Next →</button>
                  : <button onClick={() => { if (confirm('Submit exam?')) submitExam() }} className="px-5 py-2.5 rounded-xl bg-green-500 text-white font-semibold text-[13px] hover:bg-green-600 transition">✅ Submit</button>
                }
              </div>
            </div>
          </div>

          {/* Question palette */}
          <div className="w-[180px] flex-shrink-0 bg-white dark:bg-[#111827] border-l border-[#dde5f5] p-3 overflow-y-auto hidden md:block">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#5a6a8a] mb-2">Questions</div>
            <div className="grid grid-cols-4 gap-1.5">
              {exam.questions.map((sq, i) => {
                const answered = Boolean(answers[String(sq.id)])
                const isMarked = marked.has(sq.id)
                return (
                  <button
                    key={sq.id}
                    onClick={() => setCurrent(i)}
                    className={`w-8 h-8 rounded-lg text-[12px] font-bold transition ${
                      i === current     ? 'bg-primary-600 text-white ring-2 ring-primary-glow'
                      : isMarked        ? 'bg-amber-400 text-white'
                      : answered        ? 'bg-green-500 text-white'
                      : 'bg-[#f0f4ff] dark:bg-[#1a2236] text-[#5a6a8a] hover:bg-[#dde5f5]'
                    }`}
                  >{i + 1}</button>
                )
              })}
            </div>
            <div className="mt-4 space-y-1.5">
              {[
                { color: 'bg-primary-600', label: 'Current'  },
                { color: 'bg-green-500',   label: 'Answered' },
                { color: 'bg-amber-400',   label: 'Marked'   },
                { color: 'bg-[#f0f4ff]',   label: 'Pending'  },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div className={`w-3 h-3 rounded-sm ${l.color}`} />
                  <span className="text-[11px] text-[#5a6a8a]">{l.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <div className="text-[11px] text-[#5a6a8a]">Answered</div>
              <div className="font-head text-[18px] font-extrabold text-primary-600">{Object.keys(answers).length}/{exam.questions.length}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── RESULT VIEW ───────────────────────────────────────
  if (view === 'result' && result) {
    const gradeColor = result.grade.startsWith('A') ? 'text-green-600' : result.grade.startsWith('B') ? 'text-blue-600' : result.grade.startsWith('C') ? 'text-amber-600' : 'text-red-600'
    const analysis   = result.analysis as Record<string, { correct: number; wrong: number; total: number }>

    return (
      <div className="max-w-[760px] mx-auto px-5 py-10">
        <div className="text-center mb-8">
          <div className="text-[56px] mb-2">
            {result.percentage >= 80 ? '🏆' : result.percentage >= 60 ? '⭐' : result.percentage >= 33 ? '✅' : '📖'}
          </div>
          <h1 className="font-head text-[30px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff] mb-1">
            Result
          </h1>
        </div>

        {/* Score card */}
        <div className="bg-white dark:bg-[#111827] rounded-[24px] p-7 border-[1.5px] border-[#dde5f5] dark:border-[#1e2d4a] shadow-card mb-6">
          <div className="flex items-center justify-around mb-6 flex-wrap gap-5">
            <div className="text-center">
              <div className="font-head text-[42px] font-black text-primary-600">{result.score}/{result.totalMarks}</div>
              <div className="text-[13px] text-[#5a6a8a]">Score</div>
            </div>
            <div className="text-center">
              <div className={`font-head text-[52px] font-black ${gradeColor}`}>{result.grade}</div>
              <div className="text-[13px] text-[#5a6a8a]">Grade</div>
            </div>
            <div className="text-center">
              <div className="font-head text-[42px] font-black text-amber-500">{result.percentage}%</div>
              <div className="text-[13px] text-[#5a6a8a]">Percentage</div>
            </div>
            <div className="text-center">
              <div className="font-head text-[28px] font-extrabold text-[#5a6a8a]">{fmt(result.timeTaken)}</div>
              <div className="text-[13px] text-[#5a6a8a]">Time Taken</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-4 bg-[#dde5f5] rounded-full overflow-hidden mb-2">
            <div
              className={`h-full rounded-full transition-all ${result.percentage >= 80 ? 'bg-green-500' : result.percentage >= 60 ? 'bg-blue-500' : result.percentage >= 33 ? 'bg-amber-500' : 'bg-red-500'}`}
              style={{ width: `${result.percentage}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-[#5a6a8a]">
            <span>0%</span><span>Pass: 33%</span><span>Good: 60%</span><span>100%</span>
          </div>
        </div>

        {/* Topic analysis */}
        {Object.keys(analysis).length > 0 && (
          <div className="bg-white dark:bg-[#111827] rounded-[24px] p-6 border-[1.5px] border-[#dde5f5] dark:border-[#1e2d4a] mb-6">
            <h2 className="font-head text-[16px] font-bold mb-4">📊 Topic-wise Analysis</h2>
            <div className="space-y-3">
              {Object.entries(analysis).map(([chapter, stats]) => {
                const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
                return (
                  <div key={chapter}>
                    <div className="flex justify-between text-[13px] mb-1">
                      <span className="font-medium text-[#0f1f3d] dark:text-[#e8eeff]">{chapter}</span>
                      <span className="text-[#5a6a8a]">{stats.correct}/{stats.total} correct ({pct}%)</span>
                    </div>
                    <div className="h-2.5 bg-[#dde5f5] rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${pct >= 80 ? 'bg-green-500' : pct >= 60 ? 'bg-blue-500' : pct >= 40 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 flex-wrap justify-center">
          <button onClick={() => { setView('setup'); setExam(null); setResult(null) }} className="flex items-center gap-1.5 px-6 py-3 rounded-[14px] bg-primary-600 text-white font-head font-bold text-[14px] hover:opacity-90 transition">
            🔄 Take Another Test
          </button>
          <button onClick={() => toast.success('Result shared! ✓')} className="flex items-center gap-1.5 px-6 py-3 rounded-[14px] border-2 border-[#dde5f5] dark:border-[#1e2d4a] text-[#0f1f3d] dark:text-[#e8eeff] font-head font-bold text-[14px] hover:border-primary-600 transition">
            📤 Share Result
          </button>
        </div>
      </div>
    )
  }

  return null
}

// ── Helpers ───────────────────────────────────────────
function SelectField({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void
  options: string[] | { label: string; value: string }[]
}) {
  return (
    <div>
      <label className="text-[12px] font-bold text-[#5a6a8a] mb-1 block">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 border-2 border-[#dde5f5] dark:border-[#1e2d4a] rounded-[12px] bg-[#f8faff] dark:bg-[#1a2236] text-[#0f1f3d] dark:text-[#e8eeff] text-[14px] font-medium outline-none focus:border-primary-glow transition"
      >
        {options.map(o => {
          const v = typeof o === 'string' ? o : o.value
          const l = typeof o === 'string' ? o : o.label
          return <option key={v} value={v}>{l}</option>
        })}
      </select>
    </div>
  )
}
