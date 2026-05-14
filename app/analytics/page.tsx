'use client'
// app/analytics/page.tsx — Real-time Student Performance Analytics

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ── Simulated real-time data ───────────────────────────────────────────────
function getRealTimeMetrics() {
  return {
    todayStudyMin:  Math.floor(60 + Math.random() * 30),
    questionsToday: Math.floor(12 + Math.random() * 8),
    accuracy:       Math.floor(72 + Math.random() * 18),
    streak:         14,
    liveUsers:      Math.floor(1240 + Math.random() * 80),
  }
}

// ── Monthly study data (mock) ──────────────────────────────────────────────
const MONTHLY_STUDY = [
  { month:'Jan', hours:28 }, { month:'Feb', hours:35 }, { month:'Mar', hours:42 },
  { month:'Apr', hours:38 }, { month:'May', hours:52 }, { month:'Jun', hours:31 },
  { month:'Jul', hours:45 }, { month:'Aug', hours:58 }, { month:'Sep', hours:44 },
  { month:'Oct', hours:62 }, { month:'Nov', hours:55 }, { month:'Dec', hours:0 },
]

const SUBJECT_SCORES = [
  { subject:'Mathematics', score:87, change:+5,  color:'#3b82f6',  icon:'📐', chapters:14, done:9  },
  { subject:'Science',     score:91, change:+8,  color:'#10b981',  icon:'🔬', chapters:16, done:12 },
  { subject:'English',     score:78, change:-2,  color:'#f59e0b',  icon:'📖', chapters:10, done:7  },
  { subject:'Hindi',       score:82, change:+3,  color:'#8b5cf6',  icon:'🖊️', chapters:8,  done:5  },
  { subject:'Social Sci.', score:75, change:+1,  color:'#ec4899',  icon:'🌍', chapters:12, done:8  },
  { subject:'Sanskrit',    score:70, change:0,   color:'#14b8a6',  icon:'📜', chapters:6,  done:4  },
]

const QUIZ_HISTORY = [
  { date:'14 May', subject:'Science',     score:91, total:100, time:'18 min', questions:20 },
  { date:'13 May', subject:'Mathematics', score:84, total:100, time:'24 min', questions:25 },
  { date:'12 May', subject:'English',     score:76, total:100, time:'20 min', questions:20 },
  { date:'11 May', subject:'Social Sci.', score:73, total:100, time:'22 min', questions:25 },
  { date:'10 May', subject:'Hindi',       score:82, total:100, time:'16 min', questions:20 },
  { date:'9 May',  subject:'Mathematics', score:80, total:100, time:'28 min', questions:30 },
  { date:'8 May',  subject:'Science',     score:88, total:100, time:'19 min', questions:20 },
]

const TOPIC_MASTERY = [
  { topic:'Quadratic Equations',   subject:'Math',    mastery:90, status:'mastered' },
  { topic:'Ohm\'s Law',            subject:'Physics', mastery:85, status:'mastered' },
  { topic:'Photosynthesis',        subject:'Science', mastery:78, status:'good'     },
  { topic:'Grammar — Tenses',      subject:'English', mastery:65, status:'learning' },
  { topic:'Mughal Empire',         subject:'History', mastery:58, status:'learning' },
  { topic:'Algebraic Identities',  subject:'Math',    mastery:45, status:'weak'     },
  { topic:'Trigonometry',          subject:'Math',    mastery:30, status:'weak'     },
  { topic:'Light & Optics',        subject:'Physics', mastery:72, status:'good'     },
]

const WEEKLY_ACTIVITY = [
  { day:'Mon', questions:18, studyMin:45, quizScore:84 },
  { day:'Tue', questions:12, studyMin:30, quizScore:78 },
  { day:'Wed', questions:22, studyMin:60, quizScore:91 },
  { day:'Thu', questions:8,  studyMin:20, quizScore:0  },
  { day:'Fri', questions:25, studyMin:65, quizScore:88 },
  { day:'Sat', questions:30, studyMin:80, quizScore:82 },
  { day:'Sun', questions:15, studyMin:35, quizScore:76 },
]

const BADGES_EARNED = [
  { icon:'🔥', name:'14-Day Streak',    date:'14 May', rarity:'epic'   },
  { icon:'🏆', name:'Science Star',     date:'12 May', rarity:'rare'   },
  { icon:'⚡', name:'Speed Solver',     date:'10 May', rarity:'uncommon'},
  { icon:'📚', name:'Chapter Champion', date:'8 May',  rarity:'common' },
  { icon:'🎯', name:'Perfect Score',    date:'6 May',  rarity:'epic'   },
]

const RANK_HISTORY = [
  { week:'W1 Apr', rank:12 }, { week:'W2 Apr', rank:9 },
  { week:'W3 Apr', rank:7  }, { week:'W4 Apr', rank:5 },
  { week:'W1 May', rank:4  }, { week:'W2 May', rank:4 },
]

// ── SVG Charts ─────────────────────────────────────────────────────────────
function BarChart({ data, valueKey, labelKey, color='#3b82f6', height=120 }:
  { data: Record<string,any>[]; valueKey:string; labelKey:string; color?:string; height?:number }) {
  const max = Math.max(...data.map(d => d[valueKey]), 1)
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:4, height, overflow:'hidden' }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:2, height:'100%', justifyContent:'flex-end' }}>
          <div style={{ width:'100%', background:color, borderRadius:'3px 3px 0 0', height:`${Math.max((d[valueKey]/max)*90,2)}%`, minHeight:3, transition:'height .5s ease', opacity: d[valueKey] === 0 ? 0.2 : 1 }} title={`${d[valueKey]}`} />
          <span style={{ fontSize:9, color:'#9ca3af', textAlign:'center', lineHeight:1 }}>{d[labelKey]}</span>
        </div>
      ))}
    </div>
  )
}

function LineChart({ data, valueKey, labelKey, color='#3b82f6', height=80 }:
  { data: Record<string,any>[]; valueKey:string; labelKey:string; color?:string; height?:number }) {
  const values = data.map(d => d[valueKey])
  const min = Math.min(...values) - 2
  const max = Math.max(...values) + 2
  const w = 280, pad = 14
  const xStep = (w - 2*pad) / (data.length - 1)
  const yScale = (v: number) => (height - pad) - ((v - min) / (max - min)) * (height - 2*pad)
  const pts = data.map((d, i) => `${pad + i*xStep},${yScale(d[valueKey])}`).join(' ')
  return (
    <svg width={w} height={height} style={{ overflow:'visible', width:'100%' }} viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`${pad},${height} ${pts} ${pad+(data.length-1)*xStep},${height}`}
        fill={`url(#grad-${color.replace('#','')})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={pad + i*xStep} cy={yScale(d[valueKey])} r="4" fill="#fff" stroke={color} strokeWidth="2" />
          <text x={pad + i*xStep} y={height + 2} textAnchor="middle" fontSize="9" fill="#9ca3af">{d[labelKey]}</text>
        </g>
      ))}
    </svg>
  )
}

function DonutChart({ pct, color='#3b82f6', size=80, label='' }: { pct:number; color?:string; size?:number; label?:string }) {
  const r = (size - 12) / 2, circ = 2 * Math.PI * r
  return (
    <svg width={size} height={size}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f3f4f6" strokeWidth={10} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={10}
        strokeDasharray={circ} strokeDashoffset={circ * (1 - pct/100)}
        strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition:'stroke-dashoffset .8s ease' }} />
      <text x={size/2} y={size/2 + 1} textAnchor="middle" fontSize="14" fontWeight="800" fill="#1a3a6b" fontFamily="Sora,sans-serif">{pct}%</text>
      {label && <text x={size/2} y={size/2+13} textAnchor="middle" fontSize="8" fill="#6b7280" fontFamily="Sora,sans-serif">{label}</text>}
    </svg>
  )
}

// ── Mastery Status Colors ──────────────────────────────────────────────────
const MASTERY_COLORS: Record<string,{bg:string;text:string;label:string}> = {
  mastered: { bg:'#f0fdf4', text:'#166534', label:'✅ Mastered' },
  good:     { bg:'#eff6ff', text:'#1d4ed8', label:'📈 Good'     },
  learning: { bg:'#fffbeb', text:'#92400e', label:'📖 Learning' },
  weak:     { bg:'#fef2f2', text:'#991b1b', label:'⚠️ Weak'    },
}

const TABS = [
  { id:'overview',   label:'📊 Overview'   },
  { id:'subjects',   label:'📚 Subjects'   },
  { id:'quizzes',    label:'🎯 Quizzes'    },
  { id:'mastery',    label:'🧠 Mastery'    },
  { id:'badges',     label:'🏆 Badges'     },
] as const

type TabId = typeof TABS[number]['id']

// ══════════════════════════════════════════════════════════════════════════
export default function AnalyticsPage() {
  const [activeTab,   setActiveTab]   = useState<TabId>('overview')
  const [metrics,     setMetrics]     = useState(getRealTimeMetrics())
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isLive,      setIsLive]      = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval>|null>(null)

  // Real-time metric refresh every 8 seconds
  useEffect(() => {
    if (!isLive) { if (intervalRef.current) clearInterval(intervalRef.current); return }
    intervalRef.current = setInterval(() => {
      setMetrics(getRealTimeMetrics())
      setLastUpdated(new Date())
    }, 8000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isLive])

  const avgScore = Math.round(SUBJECT_SCORES.reduce((a,s)=>a+s.score,0)/SUBJECT_SCORES.length)
  const avgQuiz  = Math.round(QUIZ_HISTORY.reduce((a,q)=>a+q.score,0)/QUIZ_HISTORY.length)

  return (
    <div style={{ minHeight:'100vh', background:'#f0f4f8', fontFamily:'Sora,Inter,sans-serif' }}>

      {/* ── HEADER ──────────────────────────────────────────────────── */}
      <div style={{ background:'linear-gradient(135deg,#1a3a6b 0%,#0e2347 100%)', color:'#fff', padding:'24px 20px 0' }}>
        <div style={{ maxWidth:1000, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16, flexWrap:'wrap', gap:10 }}>
            <div>
              <Link href="/" style={{ color:'rgba(255,255,255,.6)', textDecoration:'none', fontSize:13 }}>← Home</Link>
              <h1 style={{ margin:'8px 0 4px', fontSize:26, fontWeight:900 }}>📊 Performance Analytics</h1>
              <p style={{ margin:0, fontSize:13, color:'rgba(255,255,255,.7)' }}>
                Real-time learning insights — track progress, mastery, quiz scores & streaks
              </p>
            </div>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:8 }}>
              {/* Live toggle */}
              <button onClick={() => setIsLive(v => !v)}
                style={{ display:'flex', alignItems:'center', gap:7, background: isLive ? 'rgba(34,197,94,.2)' : 'rgba(255,255,255,.1)', border:`1.5px solid ${isLive?'#22c55e':'rgba(255,255,255,.2)'}`, borderRadius:10, padding:'6px 13px', color:'#fff', cursor:'pointer', fontSize:12, fontWeight:700, fontFamily:'inherit' }}>
                <span style={{ width:8, height:8, borderRadius:'50%', background: isLive ? '#22c55e' : '#6b7280', animation: isLive ? 'blink 1s infinite' : 'none' }} />
                {isLive ? 'Live' : 'Paused'}
              </button>
              <div style={{ fontSize:10, color:'rgba(255,255,255,.5)' }}>
                Updated: {lastUpdated.toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Real-time metrics strip */}
          <div style={{ display:'flex', gap:12, marginBottom:20, overflowX:'auto', paddingBottom:4 }}>
            {[
              { label:'Study Today',   value:`${metrics.todayStudyMin} min`,   icon:'⏱️', color:'#a5f3fc' },
              { label:'Questions Done', value: metrics.questionsToday,          icon:'✅', color:'#86efac' },
              { label:'Live Accuracy', value:`${metrics.accuracy}%`,           icon:'🎯', color:'#fde68a' },
              { label:'Day Streak',    value:`${metrics.streak} 🔥`,           icon:'🔥', color:'#fca5a5' },
              { label:'Active Learners', value: metrics.liveUsers.toLocaleString(), icon:'👥', color:'#c4b5fd' },
            ].map(m => (
              <div key={m.label} style={{ background:'rgba(255,255,255,.1)', borderRadius:10, padding:'10px 14px', flexShrink:0, minWidth:110, transition:'all .3s' }}>
                <div style={{ fontSize:11, color:'rgba(255,255,255,.55)', marginBottom:3 }}>{m.icon} {m.label}</div>
                <div style={{ fontSize:18, fontWeight:900, color:m.color }}>{m.value}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display:'flex', gap:2, borderBottom:'2px solid rgba(255,255,255,.1)', overflowX:'auto' }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                style={{ padding:'10px 16px', background:'none', border:'none', color: activeTab===t.id ? '#f59e0b' : 'rgba(255,255,255,.6)', fontWeight: activeTab===t.id ? 800 : 500, fontSize:13, cursor:'pointer', borderBottom: activeTab===t.id ? '2.5px solid #f59e0b' : '2.5px solid transparent', fontFamily:'inherit', whiteSpace:'nowrap' }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes countUp { from{transform:translateY(4px);opacity:0} to{transform:translateY(0);opacity:1} }
      `}</style>

      {/* ── CONTENT ─────────────────────────────────────────────────── */}
      <div style={{ maxWidth:1000, margin:'0 auto', padding:'24px 16px' }}>

        {/* ═══ OVERVIEW ══════════════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div style={{ display:'grid', gap:16 }}>

            {/* Summary cards row */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:12 }}>
              {[
                { label:'Average Score',  value:`${avgScore}%`,  icon:'📊', color:'#3b82f6', bg:'#eff6ff'  },
                { label:'Quiz Average',   value:`${avgQuiz}%`,   icon:'🎯', color:'#22c55e', bg:'#f0fdf4'  },
                { label:'Class Rank',     value:'#4 / 45',        icon:'🏆', color:'#f59e0b', bg:'#fffbeb'  },
                { label:'Topics Done',    value:'49 / 86',        icon:'✅', color:'#8b5cf6', bg:'#fdf4ff'  },
                { label:'Study Hours',    value:'52h this mo.',   icon:'⏱️', color:'#ec4899', bg:'#fdf2f8'  },
                { label:'Badges Earned',  value:BADGES_EARNED.length, icon:'🎖️', color:'#14b8a6', bg:'#f0fdfa' },
              ].map(c => (
                <div key={c.label} style={{ background:'#fff', borderRadius:14, padding:'14px 16px', boxShadow:'0 2px 12px rgba(0,0,0,.06)', border:`1.5px solid ${c.color}22` }}>
                  <div style={{ fontSize:22, marginBottom:6 }}>{c.icon}</div>
                  <div style={{ fontSize:20, fontWeight:900, color:c.color, animation:'countUp .4s ease' }}>{c.value}</div>
                  <div style={{ fontSize:11, color:'#6b7280', marginTop:2 }}>{c.label}</div>
                </div>
              ))}
            </div>

            {/* Row 2: Quiz score line + Study hours bar */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              <div style={{ background:'#fff', borderRadius:16, padding:18, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
                <div style={{ fontSize:13, fontWeight:800, color:'#1a3a6b', marginBottom:14 }}>📈 Quiz Score Trend (last 7)</div>
                <LineChart data={QUIZ_HISTORY.slice().reverse()} valueKey="score" labelKey="date" color="#3b82f6" />
              </div>
              <div style={{ background:'#fff', borderRadius:16, padding:18, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
                <div style={{ fontSize:13, fontWeight:800, color:'#1a3a6b', marginBottom:14 }}>📚 Monthly Study Hours</div>
                <BarChart data={MONTHLY_STUDY.filter(m => m.hours > 0)} valueKey="hours" labelKey="month" color="#8b5cf6" height={100} />
              </div>
            </div>

            {/* Row 3: Weekly activity + Rank trend */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              <div style={{ background:'#fff', borderRadius:16, padding:18, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
                <div style={{ fontSize:13, fontWeight:800, color:'#1a3a6b', marginBottom:14 }}>📅 Questions Solved This Week</div>
                <BarChart data={WEEKLY_ACTIVITY} valueKey="questions" labelKey="day" color="#10b981" height={100} />
              </div>
              <div style={{ background:'#fff', borderRadius:16, padding:18, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
                <div style={{ fontSize:13, fontWeight:800, color:'#1a3a6b', marginBottom:14 }}>🏆 Class Rank Over Weeks</div>
                <LineChart data={RANK_HISTORY} valueKey="rank" labelKey="week" color="#f59e0b" />
                <div style={{ fontSize:11, color:'#6b7280', marginTop:6, textAlign:'center' }}>Lower rank = better position</div>
              </div>
            </div>

            {/* Row 4: Donut subject overview */}
            <div style={{ background:'#fff', borderRadius:16, padding:20, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
              <div style={{ fontSize:13, fontWeight:800, color:'#1a3a6b', marginBottom:16 }}>🍩 Subject Score Overview</div>
              <div style={{ display:'flex', gap:20, flexWrap:'wrap', justifyContent:'center' }}>
                {SUBJECT_SCORES.map(s => (
                  <div key={s.subject} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                    <DonutChart pct={s.score} color={s.color} size={76} />
                    <div style={{ fontSize:11, fontWeight:700, color:'#374151', textAlign:'center' }}>{s.icon} {s.subject}</div>
                    <div style={{ fontSize:10, color: s.change >= 0 ? '#22c55e' : '#ef4444', fontWeight:700 }}>
                      {s.change >= 0 ? `↑ +${s.change}%` : `↓ ${s.change}%`} this month
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ SUBJECTS TAB ══════════════════════════════════════════ */}
        {activeTab === 'subjects' && (
          <div style={{ display:'grid', gap:14 }}>
            {SUBJECT_SCORES.map(s => (
              <div key={s.subject} style={{ background:'#fff', borderRadius:16, padding:18, boxShadow:'0 2px 12px rgba(0,0,0,.06)', border:`1.5px solid ${s.color}22` }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14, flexWrap:'wrap', gap:10 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <span style={{ fontSize:30 }}>{s.icon}</span>
                    <div>
                      <div style={{ fontSize:16, fontWeight:800, color:'#1a3a6b' }}>{s.subject}</div>
                      <div style={{ fontSize:11, color:'#6b7280' }}>{s.done}/{s.chapters} chapters completed</div>
                    </div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                    <DonutChart pct={s.score} color={s.color} size={64} />
                    <div>
                      <div style={{ fontSize:18, fontWeight:900, color:s.color }}>{s.score}%</div>
                      <div style={{ fontSize:12, color: s.change >= 0 ? '#22c55e' : '#ef4444', fontWeight:700 }}>
                        {s.change >= 0 ? `↑ +${s.change}%` : `↓ ${s.change}%`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chapter completion bar */}
                <div style={{ marginBottom:10 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'#6b7280', marginBottom:4 }}>
                    <span>Chapter Progress</span>
                    <span>{s.done}/{s.chapters}</span>
                  </div>
                  <div style={{ height:8, background:'#f3f4f6', borderRadius:4, overflow:'hidden' }}>
                    <div style={{ height:'100%', width:`${(s.done/s.chapters)*100}%`, background:s.color, borderRadius:4, transition:'width .6s ease' }} />
                  </div>
                </div>

                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/class/8`}
                    style={{ fontSize:11, color:s.color, fontWeight:700, textDecoration:'none', background:`${s.color}12`, padding:'4px 11px', borderRadius:7 }}>
                    Study Now →
                  </Link>
                  <Link href="/ask"
                    style={{ fontSize:11, color:'#6b7280', fontWeight:700, textDecoration:'none', background:'#f3f4f6', padding:'4px 11px', borderRadius:7 }}>
                    Ask AI Doubt →
                  </Link>
                  <Link href="/competitive"
                    style={{ fontSize:11, color:'#1a3a6b', fontWeight:700, textDecoration:'none', background:'#eff6ff', padding:'4px 11px', borderRadius:7 }}>
                    Practice Test →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══ QUIZZES TAB ═══════════════════════════════════════════ */}
        {activeTab === 'quizzes' && (
          <div style={{ display:'grid', gap:14 }}>
            {/* Score trend chart */}
            <div style={{ background:'#fff', borderRadius:16, padding:20, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
              <h2 style={{ margin:'0 0 16px', fontSize:16, fontWeight:800, color:'#1a3a6b' }}>📈 Quiz Score Trend</h2>
              <LineChart data={QUIZ_HISTORY.slice().reverse()} valueKey="score" labelKey="date" color="#3b82f6" height={100} />
            </div>

            {/* Quiz history table */}
            <div style={{ background:'#fff', borderRadius:16, padding:20, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
              <h2 style={{ margin:'0 0 16px', fontSize:16, fontWeight:800, color:'#1a3a6b' }}>📋 Quiz History</h2>
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                  <thead>
                    <tr style={{ borderBottom:'2px solid #f3f4f6' }}>
                      {['Date','Subject','Score','Questions','Time','Grade'].map(h => (
                        <th key={h} style={{ padding:'8px 12px', textAlign:'left', color:'#6b7280', fontWeight:700, fontSize:12, whiteSpace:'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {QUIZ_HISTORY.map((q, i) => {
                      const grade = q.score >= 90 ? 'A+' : q.score >= 80 ? 'A' : q.score >= 70 ? 'B+' : 'B'
                      const gradeColor = q.score >= 90 ? '#22c55e' : q.score >= 80 ? '#3b82f6' : q.score >= 70 ? '#f59e0b' : '#ef4444'
                      return (
                        <tr key={i} style={{ borderBottom:'1px solid #f9fafb', transition:'background .15s' }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background='#f9fafb'}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background='transparent'}>
                          <td style={{ padding:'10px 12px', color:'#374151', whiteSpace:'nowrap' }}>{q.date}</td>
                          <td style={{ padding:'10px 12px', fontWeight:600, color:'#1a3a6b' }}>{q.subject}</td>
                          <td style={{ padding:'10px 12px' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                              <div style={{ height:6, width:60, background:'#f3f4f6', borderRadius:3, overflow:'hidden' }}>
                                <div style={{ height:'100%', width:`${q.score}%`, background: gradeColor, borderRadius:3 }} />
                              </div>
                              <span style={{ fontWeight:800, color:gradeColor }}>{q.score}/{q.total}</span>
                            </div>
                          </td>
                          <td style={{ padding:'10px 12px', color:'#6b7280' }}>{q.questions} Q</td>
                          <td style={{ padding:'10px 12px', color:'#6b7280' }}>{q.time}</td>
                          <td style={{ padding:'10px 12px' }}>
                            <span style={{ background:`${gradeColor}18`, color:gradeColor, borderRadius:6, padding:'2px 8px', fontWeight:800, fontSize:12 }}>{grade}</span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop:16, padding:'12px 14px', background:'#f8faff', borderRadius:10, display:'flex', gap:20, flexWrap:'wrap' }}>
                <div><span style={{ fontSize:12, color:'#6b7280' }}>Average: </span><strong style={{ color:'#1a3a6b' }}>{avgQuiz}%</strong></div>
                <div><span style={{ fontSize:12, color:'#6b7280' }}>Best: </span><strong style={{ color:'#22c55e' }}>{Math.max(...QUIZ_HISTORY.map(q=>q.score))}%</strong></div>
                <div><span style={{ fontSize:12, color:'#6b7280' }}>Total quizzes: </span><strong style={{ color:'#1a3a6b' }}>{QUIZ_HISTORY.length}</strong></div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ MASTERY TAB ═══════════════════════════════════════════ */}
        {activeTab === 'mastery' && (
          <div style={{ display:'grid', gap:14 }}>
            <div style={{ background:'#fff', borderRadius:16, padding:20, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
              <h2 style={{ margin:'0 0 6px', fontSize:16, fontWeight:800, color:'#1a3a6b' }}>🧠 Topic Mastery Map</h2>
              <p style={{ margin:'0 0 18px', fontSize:12, color:'#6b7280' }}>
                Mastery level for each topic based on quiz performance and chapter completion.
              </p>
              <div style={{ display:'grid', gap:10 }}>
                {TOPIC_MASTERY.sort((a,b) => b.mastery - a.mastery).map(t => {
                  const m = MASTERY_COLORS[t.status]
                  return (
                    <div key={t.topic} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', background:m.bg, borderRadius:12, border:`1px solid ${m.text}22` }}>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, fontWeight:700, color:'#1a3a6b' }}>{t.topic}</div>
                        <div style={{ fontSize:11, color:'#6b7280' }}>{t.subject}</div>
                      </div>
                      <div style={{ width:140 }}>
                        <div style={{ display:'flex', justifyContent:'space-between', fontSize:10, color:'#6b7280', marginBottom:3 }}>
                          <span>{m.label}</span>
                          <span style={{ fontWeight:700, color:m.text }}>{t.mastery}%</span>
                        </div>
                        <div style={{ height:7, background:'rgba(0,0,0,.07)', borderRadius:4, overflow:'hidden' }}>
                          <div style={{ height:'100%', width:`${t.mastery}%`, background:m.text, borderRadius:4, transition:'width .6s ease' }} />
                        </div>
                      </div>
                      {t.status === 'weak' && (
                        <Link href="/ask" style={{ fontSize:11, fontWeight:700, color:'#dc2626', textDecoration:'none', background:'#fef2f2', padding:'4px 10px', borderRadius:7, whiteSpace:'nowrap' }}>
                          Get Help →
                        </Link>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10 }}>
              {Object.entries(MASTERY_COLORS).map(([key, val]) => {
                const count = TOPIC_MASTERY.filter(t => t.status === key).length
                return (
                  <div key={key} style={{ background:'#fff', borderRadius:12, padding:'14px', textAlign:'center', boxShadow:'0 2px 8px rgba(0,0,0,.05)', border:`1.5px solid ${val.text}22` }}>
                    <div style={{ fontSize:22, fontWeight:900, color:val.text }}>{count}</div>
                    <div style={{ fontSize:11, color:'#6b7280', marginTop:2 }}>{val.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ═══ BADGES TAB ════════════════════════════════════════════ */}
        {activeTab === 'badges' && (
          <div style={{ display:'grid', gap:14 }}>
            <div style={{ background:'#fff', borderRadius:16, padding:20, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
              <h2 style={{ margin:'0 0 6px', fontSize:16, fontWeight:800, color:'#1a3a6b' }}>🏆 Badges & Achievements</h2>
              <p style={{ margin:'0 0 20px', fontSize:12, color:'#6b7280' }}>Keep learning to unlock more badges!</p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:12 }}>
                {BADGES_EARNED.map((b, i) => {
                  const colors: Record<string,{bg:string;border:string;text:string}> = {
                    epic:     { bg:'#fdf4ff', border:'#e879f9', text:'#7e22ce' },
                    rare:     { bg:'#eff6ff', border:'#60a5fa', text:'#1d4ed8' },
                    uncommon: { bg:'#f0fdf4', border:'#4ade80', text:'#166534' },
                    common:   { bg:'#f9fafb', border:'#d1d5db', text:'#374151' },
                  }
                  const c = colors[b.rarity]
                  return (
                    <div key={i} style={{ background:c.bg, border:`2px solid ${c.border}`, borderRadius:14, padding:'16px 12px', textAlign:'center' }}>
                      <div style={{ fontSize:36, marginBottom:8 }}>{b.icon}</div>
                      <div style={{ fontSize:13, fontWeight:800, color:'#1a3a6b', marginBottom:3 }}>{b.name}</div>
                      <div style={{ fontSize:10, color:'#9ca3af', marginBottom:6 }}>{b.date}</div>
                      <span style={{ fontSize:10, fontWeight:700, color:c.text, background:`${c.border}22`, padding:'2px 8px', borderRadius:6 }}>
                        {b.rarity.toUpperCase()}
                      </span>
                    </div>
                  )
                })}

                {/* Locked badges */}
                {[
                  { icon:'💎', name:'Diamond Scholar', hint:'Score 95%+ in 5 subjects' },
                  { icon:'🌟', name:'All-Rounder',     hint:'Complete all chapters in any class' },
                  { icon:'⚡', name:'Lightning Brain',  hint:'Solve 50 questions in one day' },
                ].map((b, i) => (
                  <div key={`locked-${i}`} style={{ background:'#f9fafb', border:'2px dashed #d1d5db', borderRadius:14, padding:'16px 12px', textAlign:'center', opacity:.6 }}>
                    <div style={{ fontSize:36, marginBottom:8, filter:'grayscale(1)' }}>{b.icon}</div>
                    <div style={{ fontSize:13, fontWeight:700, color:'#9ca3af', marginBottom:3 }}>{b.name}</div>
                    <div style={{ fontSize:10, color:'#9ca3af', lineHeight:1.4 }}>{b.hint}</div>
                    <span style={{ fontSize:10, fontWeight:700, color:'#9ca3af', background:'#f3f4f6', padding:'2px 8px', borderRadius:6, display:'inline-block', marginTop:6 }}>🔒 LOCKED</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard teaser */}
            <div style={{ background:'linear-gradient(135deg,#1a3a6b,#0e2347)', borderRadius:16, padding:20, color:'#fff' }}>
              <h3 style={{ margin:'0 0 8px', fontSize:15, fontWeight:800 }}>🏅 Class Leaderboard</h3>
              <p style={{ margin:'0 0 16px', fontSize:12, color:'rgba(255,255,255,.7)' }}>
                You are ranked <strong style={{ color:'#f59e0b' }}>#4 in your class</strong>. Keep going to reach the top!
              </p>
              <Link href="/dashboard/leaderboard"
                style={{ display:'inline-block', background:'#f59e0b', color:'#1a3a6b', padding:'9px 20px', borderRadius:10, textDecoration:'none', fontWeight:800, fontSize:13 }}>
                View Full Leaderboard →
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
