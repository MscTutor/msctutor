'use client'
// app/parent/page.tsx — Full Parent Dashboard Portal

import { useState, useEffect } from 'react'
import Link from 'next/link'

// ── MOCK DATA (replaces DB until Prisma connected) ─────────────────────────
const CHILDREN = [
  {
    id: 'c1',
    name: 'Aryan Sharma',
    class: 8,
    section: 'A',
    rollNo: 12,
    school: 'Delhi Public School',
    avatar: '👦',
    overallGrade: 'A',
    attendance: 92,
    rank: 4,
    totalStudents: 45,
    studyStreak: 14,
    subjects: [
      { name: 'Mathematics', icon: '📐', score: 87, grade: 'A', lastTest: '84/100', trend: 'up', color: '#3b82f6' },
      { name: 'Science',     icon: '🔬', score: 91, grade: 'A+', lastTest: '91/100', trend: 'up', color: '#10b981' },
      { name: 'English',     icon: '📖', score: 78, grade: 'B+', lastTest: '76/100', trend: 'stable', color: '#f59e0b' },
      { name: 'Hindi',       icon: '🖊️', score: 82, grade: 'A', lastTest: '80/100', trend: 'up', color: '#8b5cf6' },
      { name: 'Social Sci.', icon: '🌍', score: 75, grade: 'B+', lastTest: '73/100', trend: 'down', color: '#ec4899' },
    ],
    recentActivity: [
      { time: '2h ago',  icon: '✅', text: 'Completed Chapter 5 — Squares & Square Roots', type: 'chapter' },
      { time: '5h ago',  icon: '🏆', text: 'Scored 91% in Science Quiz: Microorganisms', type: 'quiz' },
      { time: '1d ago',  icon: '📚', text: 'Studied 45 min — Mathematics', type: 'study' },
      { time: '1d ago',  icon: '✏️', text: 'Submitted Homework: Chapter 4 Exercises', type: 'hw' },
      { time: '2d ago',  icon: '🎯', text: 'Practice Test: 78/100 in English Grammar', type: 'test' },
      { time: '3d ago',  icon: '🔥', text: 'Maintained 14-day study streak!', type: 'streak' },
    ],
    weeklyStudy: [40, 55, 30, 65, 45, 70, 50], // minutes per day (Mon–Sun)
    upcomingTests: [
      { subject: 'Mathematics', topic: 'Algebraic Identities', date: 'Tomorrow', icon: '📐' },
      { subject: 'Science',     topic: 'Combustion & Flame',   date: '20 May',  icon: '🔬' },
      { subject: 'English',     topic: 'Chapter 6 Grammar',    date: '22 May',  icon: '📖' },
    ],
    pendingHomework: [
      { subject: 'Hindi',       task: 'निबंध — जल संरक्षण', due: 'Tomorrow' },
      { subject: 'Social Sci.', task: 'Map Work — Chapter 3', due: '21 May'   },
    ],
    teacherMessages: [
      { teacher: 'Mrs. Priya Singh', subject: 'Mathematics', time: '2d ago', msg: 'Aryan is doing great in Algebra. Please encourage daily practice.', read: false },
      { teacher: 'Mr. Rajesh Kumar', subject: 'Science',     time: '4d ago', msg: 'Excellent performance in the lab experiment. Keep it up!',         read: true  },
    ],
    monthlyAttendance: [
      { month: 'Jan', pct: 95 }, { month: 'Feb', pct: 88 }, { month: 'Mar', pct: 92 },
      { month: 'Apr', pct: 90 }, { month: 'May', pct: 96 },
    ],
  },
  {
    id: 'c2',
    name: 'Priya Sharma',
    class: 5,
    section: 'B',
    rollNo: 7,
    school: 'Delhi Public School',
    avatar: '👧',
    overallGrade: 'A+',
    attendance: 97,
    rank: 1,
    totalStudents: 40,
    studyStreak: 22,
    subjects: [
      { name: 'Mathematics', icon: '📐', score: 96, grade: 'A+', lastTest: '96/100', trend: 'up',     color: '#3b82f6' },
      { name: 'EVS',         icon: '🌿', score: 94, grade: 'A+', lastTest: '93/100', trend: 'up',     color: '#10b981' },
      { name: 'English',     icon: '📖', score: 89, grade: 'A',  lastTest: '88/100', trend: 'stable', color: '#f59e0b' },
      { name: 'Hindi',       icon: '🖊️', score: 92, grade: 'A+', lastTest: '91/100', trend: 'up',     color: '#8b5cf6' },
    ],
    recentActivity: [
      { time: '1h ago',  icon: '🌟', text: 'Topped Class 5 Weekly Quiz — 96%', type: 'quiz' },
      { time: '3h ago',  icon: '📚', text: 'Completed EVS Chapter 9 — Plants Around Us', type: 'chapter' },
      { time: '1d ago',  icon: '🎯', text: 'Practice Test: 94/100 in Mathematics', type: 'test' },
      { time: '2d ago',  icon: '🔥', text: '22-day study streak achieved!', type: 'streak' },
    ],
    weeklyStudy: [35, 40, 45, 55, 50, 60, 40],
    upcomingTests: [
      { subject: 'Mathematics', topic: 'Large Numbers',     date: '19 May', icon: '📐' },
      { subject: 'EVS',         topic: 'Our Environment',   date: '23 May', icon: '🌿' },
    ],
    pendingHomework: [
      { subject: 'English', task: 'Write a story (100 words)', due: '20 May' },
    ],
    teacherMessages: [
      { teacher: 'Mrs. Anita Gupta', subject: 'Class Teacher', time: '1d ago', msg: 'Priya is our class topper this month! She is an inspiration to others.', read: false },
    ],
    monthlyAttendance: [
      { month: 'Jan', pct: 98 }, { month: 'Feb', pct: 96 }, { month: 'Mar', pct: 97 },
      { month: 'Apr', pct: 98 }, { month: 'May', pct: 100 },
    ],
  },
]

// ── MINI BAR CHART ─────────────────────────────────────────────────────────
function WeeklyStudyBar({ data }: { data: number[] }) {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
  const max = Math.max(...data, 1)
  const today = new Date().getDay() // 0=Sun
  const todayIdx = today === 0 ? 6 : today - 1
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:6, height:70 }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
          <div style={{ width:'100%', background: i === todayIdx ? '#1a3a6b' : '#93c5fd', borderRadius:'4px 4px 0 0', height: `${Math.round((v/max)*54)}px`, minHeight:4, transition:'height .4s ease' }} title={`${v} min`} />
          <span style={{ fontSize:9, color:'#6b7280', fontWeight: i === todayIdx ? 700 : 400 }}>{days[i]}</span>
        </div>
      ))}
    </div>
  )
}

// ── ATTENDANCE TREND ───────────────────────────────────────────────────────
function AttendanceLine({ data }: { data: {month:string; pct:number}[] }) {
  const w = 260, h = 60, pad = 20
  const minPct = Math.min(...data.map(d => d.pct), 70)
  const maxPct = 100
  const xStep = (w - 2*pad) / (data.length - 1)
  const yScale = (v: number) => h - pad - ((v - minPct) / (maxPct - minPct)) * (h - 2*pad)
  const pts = data.map((d, i) => `${pad + i*xStep},${yScale(d.pct)}`).join(' ')
  return (
    <svg width={w} height={h} style={{ overflow:'visible' }}>
      <polyline points={pts} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinejoin="round" />
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={pad + i*xStep} cy={yScale(d.pct)} r="4" fill="#1a3a6b" />
          <text x={pad + i*xStep} y={h - 2} textAnchor="middle" fontSize="9" fill="#6b7280">{d.month}</text>
          <text x={pad + i*xStep} y={yScale(d.pct) - 8} textAnchor="middle" fontSize="9" fill="#1a3a6b" fontWeight="700">{d.pct}%</text>
        </g>
      ))}
    </svg>
  )
}

// ── SUBJECT SCORE BAR ──────────────────────────────────────────────────────
function ScoreBar({ score, color }: { score:number; color:string }) {
  return (
    <div style={{ flex:1, height:8, background:'#f3f4f6', borderRadius:4, overflow:'hidden' }}>
      <div style={{ height:'100%', width:`${score}%`, background:color, borderRadius:4, transition:'width .6s ease' }} />
    </div>
  )
}

// ── GRADE BADGE ────────────────────────────────────────────────────────────
function GradeBadge({ grade }: { grade:string }) {
  const c = grade.includes('+') ? '#22c55e' : grade === 'A' ? '#3b82f6' : grade === 'B+' ? '#f59e0b' : '#6b7280'
  return <span style={{ background:`${c}18`, color:c, borderRadius:6, padding:'2px 7px', fontWeight:800, fontSize:12 }}>{grade}</span>
}

// ── TREND ICON ─────────────────────────────────────────────────────────────
function Trend({ dir }: { dir:string }) {
  if (dir === 'up')     return <span style={{ color:'#22c55e', fontSize:14 }}>↑</span>
  if (dir === 'down')   return <span style={{ color:'#ef4444', fontSize:14 }}>↓</span>
  return <span style={{ color:'#6b7280', fontSize:14 }}>→</span>
}

// ── CIRCULAR PROGRESS ─────────────────────────────────────────────────────
function CircleProgress({ pct, size=80, stroke=7, color='#3b82f6', label='' }: { pct:number; size?:number; stroke?:number; color?:string; label?:string }) {
  const r = (size - stroke * 2) / 2
  const circ = 2 * Math.PI * r
  return (
    <svg width={size} height={size} style={{ flexShrink:0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f3f4f6" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={circ * (1 - pct/100)}
        strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition:'stroke-dashoffset .8s ease' }} />
      <text x={size/2} y={size/2 - 5} textAnchor="middle" fontSize="16" fontWeight="800" fill="#1a3a6b" fontFamily="Sora,sans-serif">{pct}%</text>
      {label && <text x={size/2} y={size/2 + 12} textAnchor="middle" fontSize="9" fill="#6b7280" fontFamily="Sora,sans-serif">{label}</text>}
    </svg>
  )
}

// ── NOTIFICATION DATA ──────────────────────────────────────────────────────
const NOTIFICATIONS = [
  { id:1, icon:'📢', text:'Parent-Teacher meeting on 24 May at 10 AM', time:'1h ago',  unread:true  },
  { id:2, icon:'📝', text:'Aryan\'s Unit Test result uploaded — 84/100',  time:'3h ago',  unread:true  },
  { id:3, icon:'💳', text:'School fee due on 31 May — ₹4,200',           time:'1d ago',  unread:true  },
  { id:4, icon:'✅', text:'Priya ranked #1 in Class 5 monthly test',      time:'2d ago',  unread:false },
  { id:5, icon:'📅', text:'Holiday on 20 May — School closed',            time:'3d ago',  unread:false },
]

// ══════════════════════════════════════════════════════════════════════════
export default function ParentDashboard() {
  const [activeChild, setActiveChild] = useState(0)
  const [activeTab,   setActiveTab]   = useState<'overview'|'subjects'|'activity'|'attendance'|'messages'>('overview')
  const [showNotif,   setShowNotif]   = useState(false)

  const child = CHILDREN[activeChild]
  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length

  // click outside to close notif
  useEffect(() => {
    const h = (e: MouseEvent) => { if (!(e.target as Element).closest('.notif-wrap')) setShowNotif(false) }
    document.addEventListener('click', h)
    return () => document.removeEventListener('click', h)
  }, [])

  const TABS = [
    { id:'overview',   label:'📊 Overview'    },
    { id:'subjects',   label:'📚 Subjects'    },
    { id:'activity',   label:'🕐 Activity'    },
    { id:'attendance', label:'📅 Attendance'  },
    { id:'messages',   label:'💬 Messages'    },
  ] as const

  return (
    <div style={{ minHeight:'100vh', background:'#f0f4f8', fontFamily:'Sora,Inter,sans-serif' }}>

      {/* ── TOP HEADER ─────────────────────────────────────────────────── */}
      <div style={{ background:'linear-gradient(135deg,#1a3a6b 0%,#0e2347 100%)', color:'#fff', padding:'20px 20px 0' }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>

          {/* Top bar */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <Link href="/" style={{ color:'rgba(255,255,255,.7)', textDecoration:'none', fontSize:13 }}>← MscTutor</Link>
              <span style={{ color:'rgba(255,255,255,.3)' }}>|</span>
              <span style={{ fontWeight:800, fontSize:18 }}>👨‍👩‍👧‍👦 Parent Dashboard</span>
            </div>

            {/* Notification bell */}
            <div className="notif-wrap" style={{ position:'relative' }}>
              <button onClick={() => setShowNotif(!showNotif)}
                style={{ position:'relative', width:40, height:40, borderRadius:10, border:'1.5px solid rgba(255,255,255,.25)', background:'rgba(255,255,255,.1)', color:'#fff', cursor:'pointer', fontSize:18, display:'flex', alignItems:'center', justifyContent:'center' }}>
                🔔
                {unreadCount > 0 && (
                  <span style={{ position:'absolute', top:-4, right:-4, background:'#ef4444', color:'#fff', borderRadius:'50%', width:18, height:18, fontSize:10, fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid #0e2347' }}>{unreadCount}</span>
                )}
              </button>

              {/* Notification dropdown */}
              {showNotif && (
                <div style={{ position:'absolute', top:'calc(100% + 8px)', right:0, width:320, background:'#fff', borderRadius:14, boxShadow:'0 12px 40px rgba(0,0,0,.18)', border:'1px solid #e5e7eb', zIndex:500, overflow:'hidden' }}>
                  <div style={{ padding:'12px 16px', borderBottom:'1px solid #f3f4f6', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontWeight:800, color:'#1a3a6b', fontSize:14 }}>Notifications</span>
                    <span style={{ fontSize:11, color:'#6b7280' }}>{unreadCount} unread</span>
                  </div>
                  {NOTIFICATIONS.map(n => (
                    <div key={n.id} style={{ padding:'11px 16px', borderBottom:'1px solid #f9fafb', background: n.unread ? '#eff6ff' : '#fff', display:'flex', gap:10, alignItems:'flex-start', cursor:'pointer' }}>
                      <span style={{ fontSize:18, flexShrink:0 }}>{n.icon}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:12, color:'#374151', lineHeight:1.4, fontWeight: n.unread ? 700 : 400 }}>{n.text}</div>
                        <div style={{ fontSize:10, color:'#9ca3af', marginTop:2 }}>{n.time}</div>
                      </div>
                      {n.unread && <div style={{ width:7, height:7, borderRadius:'50%', background:'#3b82f6', flexShrink:0, marginTop:4 }} />}
                    </div>
                  ))}
                  <div style={{ padding:'10px 16px', textAlign:'center' }}>
                    <button style={{ fontSize:12, color:'#1a3a6b', fontWeight:700, background:'none', border:'none', cursor:'pointer' }}>View all notifications →</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Child selector */}
          <div style={{ display:'flex', gap:10, marginBottom:20 }}>
            {CHILDREN.map((c, i) => (
              <button key={c.id} onClick={() => { setActiveChild(i); setActiveTab('overview') }}
                style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 14px', borderRadius:10, border: i === activeChild ? '2px solid #f59e0b' : '2px solid rgba(255,255,255,.2)', background: i === activeChild ? 'rgba(245,158,11,.15)' : 'rgba(255,255,255,.08)', color:'#fff', cursor:'pointer', transition:'all .2s' }}>
                <span style={{ fontSize:22 }}>{c.avatar}</span>
                <div style={{ textAlign:'left' }}>
                  <div style={{ fontSize:13, fontWeight:700 }}>{c.name}</div>
                  <div style={{ fontSize:10, color:'rgba(255,255,255,.65)' }}>Class {c.class}{c.section} • Roll #{c.rollNo}</div>
                </div>
              </button>
            ))}
            <Link href="/contact"
              style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:10, border:'2px dashed rgba(255,255,255,.25)', background:'transparent', color:'rgba(255,255,255,.6)', textDecoration:'none', fontSize:12 }}>
              + Add Child
            </Link>
          </div>

          {/* Quick stats strip */}
          <div style={{ display:'flex', gap:14, paddingBottom:20, overflowX:'auto' }}>
            {[
              { label:'Attendance',   value:`${child.attendance}%`,         icon:'📅', color:'#22c55e' },
              { label:'Overall Grade', value: child.overallGrade,            icon:'🏆', color:'#f59e0b' },
              { label:'Class Rank',   value:`${child.rank}/${child.totalStudents}`, icon:'🎯', color:'#3b82f6' },
              { label:'Study Streak', value:`${child.studyStreak} days`,      icon:'🔥', color:'#ef4444' },
              { label:'School',       value: child.school.split(' ').slice(0,2).join(' '), icon:'🏫', color:'#8b5cf6' },
            ].map(s => (
              <div key={s.label} style={{ background:'rgba(255,255,255,.1)', backdropFilter:'blur(6px)', borderRadius:12, padding:'10px 14px', minWidth:110, flexShrink:0 }}>
                <div style={{ fontSize:20, marginBottom:4 }}>{s.icon}</div>
                <div style={{ fontSize:16, fontWeight:800, color:s.color }}>{s.value}</div>
                <div style={{ fontSize:10, color:'rgba(255,255,255,.6)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display:'flex', gap:2, borderBottom:'2px solid rgba(255,255,255,.1)', overflowX:'auto' }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                style={{ padding:'10px 16px', background:'none', border:'none', color: activeTab === t.id ? '#f59e0b' : 'rgba(255,255,255,.6)', fontWeight: activeTab === t.id ? 800 : 500, fontSize:13, cursor:'pointer', borderBottom: activeTab === t.id ? '2.5px solid #f59e0b' : '2.5px solid transparent', whiteSpace:'nowrap', fontFamily:'inherit' }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ────────────────────────────────────────────────────── */}
      <div style={{ maxWidth:900, margin:'0 auto', padding:'24px 16px' }}>

        {/* ═══ OVERVIEW TAB ═════════════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div style={{ display:'grid', gap:18 }}>

            {/* Row 1: Attendance + Weekly Study */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
              <div style={{ background:'#fff', borderRadius:16, padding:18, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
                <h3 style={{ margin:'0 0 14px', fontSize:14, fontWeight:800, color:'#1a3a6b', display:'flex', alignItems:'center', gap:6 }}>
                  📅 Attendance — {child.name.split(' ')[0]}
                </h3>
                <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                  <CircleProgress pct={child.attendance} color={child.attendance >= 90 ? '#22c55e' : child.attendance >= 75 ? '#f59e0b' : '#ef4444'} label="present" />
                  <div>
                    <div style={{ fontSize:22, fontWeight:900, color:'#1a3a6b' }}>{child.attendance}%</div>
                    <div style={{ fontSize:12, color:'#6b7280', marginTop:2 }}>
                      {child.attendance >= 90 ? '✅ Excellent attendance!' : child.attendance >= 75 ? '⚠️ Needs improvement' : '❌ Below minimum (75%)'}
                    </div>
                    <div style={{ fontSize:11, color:'#9ca3af', marginTop:6 }}>Min. required: 75%</div>
                  </div>
                </div>
              </div>

              <div style={{ background:'#fff', borderRadius:16, padding:18, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
                <h3 style={{ margin:'0 0 14px', fontSize:14, fontWeight:800, color:'#1a3a6b', display:'flex', alignItems:'center', gap:6 }}>
                  📊 Weekly Study (minutes)
                </h3>
                <WeeklyStudyBar data={child.weeklyStudy} />
                <div style={{ fontSize:11, color:'#6b7280', marginTop:8, textAlign:'center' }}>
                  Total this week: {child.weeklyStudy.reduce((a,b)=>a+b,0)} min
                </div>
              </div>
            </div>

            {/* Row 2: Top subjects snapshot */}
            <div style={{ background:'#fff', borderRadius:16, padding:18, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
              <h3 style={{ margin:'0 0 14px', fontSize:14, fontWeight:800, color:'#1a3a6b' }}>📚 Subject Performance</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {child.subjects.map(s => (
                  <div key={s.name} style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <span style={{ fontSize:18, width:24, textAlign:'center' }}>{s.icon}</span>
                    <span style={{ fontSize:13, fontWeight:600, color:'#374151', width:100, flexShrink:0 }}>{s.name}</span>
                    <ScoreBar score={s.score} color={s.color} />
                    <span style={{ fontSize:13, fontWeight:700, color:'#1a3a6b', width:34, textAlign:'right', flexShrink:0 }}>{s.score}%</span>
                    <GradeBadge grade={s.grade} />
                    <Trend dir={s.trend} />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 3: Upcoming tests + Pending HW */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
              <div style={{ background:'#fff', borderRadius:16, padding:18, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
                <h3 style={{ margin:'0 0 12px', fontSize:14, fontWeight:800, color:'#1a3a6b' }}>📝 Upcoming Tests</h3>
                {child.upcomingTests.length === 0
                  ? <p style={{ fontSize:12, color:'#9ca3af' }}>No upcoming tests</p>
                  : child.upcomingTests.map((t, i) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom: i < child.upcomingTests.length-1 ? '1px solid #f3f4f6' : 'none' }}>
                      <span style={{ fontSize:20 }}>{t.icon}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:12, fontWeight:700, color:'#374151' }}>{t.subject}</div>
                        <div style={{ fontSize:11, color:'#6b7280' }}>{t.topic}</div>
                      </div>
                      <span style={{ fontSize:11, fontWeight:700, color: t.date === 'Tomorrow' ? '#ef4444' : '#f59e0b', background: t.date === 'Tomorrow' ? '#fef2f2' : '#fffbeb', padding:'3px 8px', borderRadius:6 }}>{t.date}</span>
                    </div>
                  ))
                }
              </div>

              <div style={{ background:'#fff', borderRadius:16, padding:18, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
                <h3 style={{ margin:'0 0 12px', fontSize:14, fontWeight:800, color:'#1a3a6b' }}>✏️ Pending Homework</h3>
                {child.pendingHomework.length === 0
                  ? <div style={{ display:'flex', alignItems:'center', gap:8, padding:'12px', background:'#f0fdf4', borderRadius:10, color:'#22c55e', fontSize:13, fontWeight:700 }}>🎉 All homework done!</div>
                  : child.pendingHomework.map((h, i) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom: i < child.pendingHomework.length-1 ? '1px solid #f3f4f6' : 'none' }}>
                      <span style={{ fontSize:20 }}>📌</span>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:12, fontWeight:700, color:'#374151' }}>{h.subject}</div>
                        <div style={{ fontSize:11, color:'#6b7280' }}>{h.task}</div>
                      </div>
                      <span style={{ fontSize:11, fontWeight:700, color:'#ef4444', background:'#fef2f2', padding:'3px 8px', borderRadius:6 }}>Due {h.due}</span>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Row 4: Teacher message preview + Quick links */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
              <div style={{ background:'#fff', borderRadius:16, padding:18, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
                <h3 style={{ margin:'0 0 12px', fontSize:14, fontWeight:800, color:'#1a3a6b' }}>💬 Latest from Teachers</h3>
                {child.teacherMessages.slice(0,2).map((m, i) => (
                  <div key={i} style={{ background: m.read ? '#f9fafb' : '#eff6ff', borderRadius:10, padding:12, marginBottom:i < 1 ? 10 : 0, border:`1px solid ${m.read ? '#f3f4f6' : '#bfdbfe'}` }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                      <span style={{ fontSize:12, fontWeight:800, color:'#1a3a6b' }}>{m.teacher}</span>
                      <span style={{ fontSize:10, color:'#9ca3af' }}>{m.time}</span>
                    </div>
                    <div style={{ fontSize:11, color:'#374151', lineHeight:1.5 }}>&ldquo;{m.msg}&rdquo;</div>
                    {!m.read && <div style={{ fontSize:10, color:'#3b82f6', fontWeight:700, marginTop:4 }}>● New</div>}
                  </div>
                ))}
              </div>

              <div style={{ background:'#fff', borderRadius:16, padding:18, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
                <h3 style={{ margin:'0 0 12px', fontSize:14, fontWeight:800, color:'#1a3a6b' }}>⚡ Quick Actions</h3>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                  {[
                    { label:'View Report Card', icon:'📋', href:'/contact', color:'#eff6ff', text:'#1a3a6b' },
                    { label:'Message Teacher', icon:'✉️', href:'/contact', color:'#f0fdf4', text:'#166534' },
                    { label:'Fee Payment',     icon:'💳', href:'/contact', color:'#fff7ed', text:'#c2410c' },
                    { label:'Study Material',  icon:'📚', href:`/class/${child.class}`, color:'#fdf4ff', text:'#7e22ce' },
                    { label:'Take Mock Test',  icon:'🎯', href:'/competitive', color:'#fef2f2', text:'#991b1b' },
                    { label:'Ask AI Tutor',    icon:'🤖', href:'/ask', color:'#f0f9ff', text:'#0369a1' },
                  ].map(a => (
                    <Link key={a.label} href={a.href}
                      style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4, padding:'10px 6px', background:a.color, borderRadius:10, textDecoration:'none', textAlign:'center' }}>
                      <span style={{ fontSize:20 }}>{a.icon}</span>
                      <span style={{ fontSize:10, fontWeight:700, color:a.text, lineHeight:1.2 }}>{a.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ SUBJECTS TAB ══════════════════════════════════════════════ */}
        {activeTab === 'subjects' && (
          <div style={{ display:'grid', gap:14 }}>
            <div style={{ background:'#fff', borderRadius:16, padding:20, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
              <h2 style={{ margin:'0 0 18px', fontSize:16, fontWeight:800, color:'#1a3a6b' }}>📚 Subject-wise Detailed Report — {child.name}</h2>
              <div style={{ display:'grid', gap:14 }}>
                {child.subjects.map(s => (
                  <div key={s.name} style={{ border:`1.5px solid ${s.color}22`, borderRadius:14, padding:16, background:`${s.color}08` }}>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <span style={{ fontSize:28 }}>{s.icon}</span>
                        <div>
                          <div style={{ fontSize:15, fontWeight:800, color:'#1a3a6b' }}>{s.name}</div>
                          <div style={{ fontSize:11, color:'#6b7280' }}>Last test: {s.lastTest}</div>
                        </div>
                      </div>
                      <div style={{ textAlign:'right' }}>
                        <GradeBadge grade={s.grade} />
                        <div style={{ fontSize:11, color:'#6b7280', marginTop:4, display:'flex', alignItems:'center', gap:4, justifyContent:'flex-end' }}>
                          <Trend dir={s.trend} />
                          {s.trend === 'up' ? 'Improving' : s.trend === 'down' ? 'Needs attention' : 'Stable'}
                        </div>
                      </div>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                      <div style={{ flex:1, height:10, background:'#f3f4f6', borderRadius:5, overflow:'hidden' }}>
                        <div style={{ height:'100%', width:`${s.score}%`, background:s.color, borderRadius:5, transition:'width .6s ease' }} />
                      </div>
                      <span style={{ fontSize:16, fontWeight:900, color:s.color, flexShrink:0 }}>{s.score}%</span>
                    </div>
                    <div style={{ display:'flex', gap:10, marginTop:12 }}>
                      <Link href={`/class/${child.class}`}
                        style={{ fontSize:11, color:s.color, fontWeight:700, textDecoration:'none', background:`${s.color}15`, padding:'4px 10px', borderRadius:7 }}>
                        Study Material →
                      </Link>
                      <Link href="/ask"
                        style={{ fontSize:11, color:'#6b7280', fontWeight:700, textDecoration:'none', background:'#f3f4f6', padding:'4px 10px', borderRadius:7 }}>
                        AI Help →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ ACTIVITY TAB ══════════════════════════════════════════════ */}
        {activeTab === 'activity' && (
          <div style={{ display:'grid', gap:14 }}>
            <div style={{ background:'#fff', borderRadius:16, padding:20, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
              <h2 style={{ margin:'0 0 18px', fontSize:16, fontWeight:800, color:'#1a3a6b' }}>🕐 Recent Activity — {child.name}</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
                {child.recentActivity.map((a, i) => (
                  <div key={i} style={{ display:'flex', gap:14, padding:'14px 0', borderBottom: i < child.recentActivity.length-1 ? '1px solid #f3f4f6' : 'none' }}>
                    <div style={{ width:36, height:36, borderRadius:10, background: a.type==='quiz'?'#eff6ff':a.type==='chapter'?'#f0fdf4':a.type==='streak'?'#fff7ed':'#fdf4ff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>
                      {a.icon}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, color:'#374151', fontWeight:600, lineHeight:1.4 }}>{a.text}</div>
                      <div style={{ fontSize:11, color:'#9ca3af', marginTop:3 }}>{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Study time this week */}
            <div style={{ background:'#fff', borderRadius:16, padding:20, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
              <h3 style={{ margin:'0 0 16px', fontSize:14, fontWeight:800, color:'#1a3a6b' }}>⏱️ Study Time This Week</h3>
              <WeeklyStudyBar data={child.weeklyStudy} />
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:12, padding:'12px 14px', background:'#f0f9ff', borderRadius:10 }}>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:18, fontWeight:800, color:'#1a3a6b' }}>{child.weeklyStudy.reduce((a,b)=>a+b,0)}</div>
                  <div style={{ fontSize:10, color:'#6b7280' }}>Total min</div>
                </div>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:18, fontWeight:800, color:'#22c55e' }}>{Math.round(child.weeklyStudy.reduce((a,b)=>a+b,0)/7)}</div>
                  <div style={{ fontSize:10, color:'#6b7280' }}>Avg/day</div>
                </div>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:18, fontWeight:800, color:'#f59e0b' }}>{child.studyStreak}</div>
                  <div style={{ fontSize:10, color:'#6b7280' }}>Day streak 🔥</div>
                </div>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:18, fontWeight:800, color:'#8b5cf6' }}>{Math.max(...child.weeklyStudy)}</div>
                  <div style={{ fontSize:10, color:'#6b7280' }}>Best day min</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ ATTENDANCE TAB ═══════════════════════════════════════════ */}
        {activeTab === 'attendance' && (
          <div style={{ display:'grid', gap:14 }}>
            <div style={{ background:'#fff', borderRadius:16, padding:20, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
              <h2 style={{ margin:'0 0 18px', fontSize:16, fontWeight:800, color:'#1a3a6b' }}>📅 Attendance Report — {child.name}</h2>
              <div style={{ display:'flex', alignItems:'center', gap:28, marginBottom:24 }}>
                <CircleProgress pct={child.attendance} size={100} stroke={9} color={child.attendance >= 90 ? '#22c55e' : '#f59e0b'} label="overall" />
                <div>
                  <div style={{ fontSize:28, fontWeight:900, color:'#1a3a6b' }}>{child.attendance}%</div>
                  <div style={{ fontSize:13, color:'#6b7280', marginTop:4 }}>Overall attendance this year</div>
                  <div style={{ marginTop:10, display:'flex', gap:8 }}>
                    {child.attendance >= 90
                      ? <span style={{ background:'#f0fdf4', color:'#166534', padding:'4px 12px', borderRadius:8, fontSize:12, fontWeight:700 }}>✅ Excellent</span>
                      : <span style={{ background:'#fffbeb', color:'#92400e', padding:'4px 12px', borderRadius:8, fontSize:12, fontWeight:700 }}>⚠️ Needs Attention</span>
                    }
                  </div>
                </div>
              </div>

              <h3 style={{ fontSize:14, fontWeight:700, color:'#374151', marginBottom:12 }}>Monthly Trend</h3>
              <div style={{ overflowX:'auto', paddingBottom:8 }}>
                <AttendanceLine data={child.monthlyAttendance} />
              </div>

              <div style={{ marginTop:20, display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))', gap:10 }}>
                {child.monthlyAttendance.map(m => (
                  <div key={m.month} style={{ background: m.pct >= 90 ? '#f0fdf4' : '#fffbeb', border:`1px solid ${m.pct>=90?'#bbf7d0':'#fde68a'}`, borderRadius:10, padding:'10px 14px', textAlign:'center' }}>
                    <div style={{ fontSize:18, fontWeight:900, color: m.pct >= 90 ? '#166534' : '#92400e' }}>{m.pct}%</div>
                    <div style={{ fontSize:12, color:'#6b7280', fontWeight:600 }}>{m.month} 2026</div>
                    <div style={{ fontSize:10, marginTop:2 }}>{m.pct >= 90 ? '✅' : '⚠️'}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop:18, background:'#f8faff', border:'1px solid #e0e7ff', borderRadius:12, padding:14, fontSize:12, color:'#374151', lineHeight:1.7 }}>
                <strong>📌 Attendance Policy:</strong><br/>
                Minimum 75% attendance required to appear in board/annual exams.
                Students with less than 75% may be barred from exams as per school rules.
              </div>
            </div>
          </div>
        )}

        {/* ═══ MESSAGES TAB ═════════════════════════════════════════════ */}
        {activeTab === 'messages' && (
          <div style={{ display:'grid', gap:14 }}>
            <div style={{ background:'#fff', borderRadius:16, padding:20, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
              <h2 style={{ margin:'0 0 18px', fontSize:16, fontWeight:800, color:'#1a3a6b' }}>💬 Teacher Messages</h2>
              {child.teacherMessages.map((m, i) => (
                <div key={i} style={{ background: m.read ? '#f9fafb' : '#eff6ff', border:`1.5px solid ${m.read?'#f3f4f6':'#bfdbfe'}`, borderRadius:14, padding:16, marginBottom:12 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                    <div>
                      <div style={{ fontSize:13, fontWeight:800, color:'#1a3a6b' }}>{m.teacher}</div>
                      <div style={{ fontSize:11, color:'#6b7280' }}>{m.subject}</div>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      <div style={{ fontSize:11, color:'#9ca3af' }}>{m.time}</div>
                      {!m.read && <span style={{ fontSize:10, color:'#3b82f6', fontWeight:700, background:'#eff6ff', padding:'2px 8px', borderRadius:6, marginTop:4, display:'inline-block' }}>New</span>}
                    </div>
                  </div>
                  <div style={{ fontSize:13, color:'#374151', lineHeight:1.6, fontStyle:'italic' }}>&ldquo;{m.msg}&rdquo;</div>
                  <div style={{ marginTop:12 }}>
                    <Link href="/contact"
                      style={{ fontSize:12, fontWeight:700, color:'#1a3a6b', textDecoration:'none', background:'#eff6ff', padding:'6px 14px', borderRadius:8, display:'inline-block' }}>
                      Reply →
                    </Link>
                  </div>
                </div>
              ))}

              <div style={{ borderTop:'1px solid #f3f4f6', paddingTop:16, marginTop:4 }}>
                <h3 style={{ fontSize:14, fontWeight:800, color:'#374151', marginBottom:12 }}>📢 School Announcements</h3>
                {NOTIFICATIONS.map(n => (
                  <div key={n.id} style={{ display:'flex', gap:10, alignItems:'flex-start', padding:'10px 0', borderBottom:'1px solid #f9fafb' }}>
                    <span style={{ fontSize:18, flexShrink:0 }}>{n.icon}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:12, color:'#374151', fontWeight: n.unread ? 700 : 400 }}>{n.text}</div>
                      <div style={{ fontSize:10, color:'#9ca3af', marginTop:2 }}>{n.time}</div>
                    </div>
                    {n.unread && <div style={{ width:8, height:8, borderRadius:'50%', background:'#3b82f6', flexShrink:0, marginTop:4 }} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── FOOTER NOTE ────────────────────────────────────────────────── */}
      <div style={{ maxWidth:900, margin:'0 auto', padding:'0 16px 32px', textAlign:'center' }}>
        <p style={{ fontSize:11, color:'#9ca3af' }}>
          Data syncs from school records. For queries, contact school administration or{' '}
          <Link href="/contact" style={{ color:'#1a3a6b', fontWeight:700 }}>reach MscTutor support</Link>.
        </p>
      </div>
    </div>
  )
}
