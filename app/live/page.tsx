'use client'
// app/live/page.tsx — Live Classes Hub + Recordings

import { useState } from 'react'
import Link from 'next/link'

// ── Types ──────────────────────────────────────────────────────────────────
interface LiveClass {
  id: string
  title: string
  subject: string
  teacher: string
  class: string
  date: string
  time: string
  duration: string
  status: 'live' | 'upcoming' | 'recorded'
  viewers?: number
  recordingUrl?: string
  thumbnail: string
  description: string
  tags: string[]
}

// ── Mock Data ──────────────────────────────────────────────────────────────
const CLASSES: LiveClass[] = [
  {
    id: 'lc1',
    title: 'Quadratic Equations — Complete Revision',
    subject: 'Mathematics', teacher: 'Mr. Ramesh Gupta', class: 'Class 10',
    date: '14 May 2026', time: '7:00 PM', duration: '1h 20m',
    status: 'live', viewers: 284, thumbnail: '📐',
    description: 'Full revision of quadratic equations — discriminant, nature of roots, factorization methods, and word problems.',
    tags: ['Class 10', 'Math', 'Boards'],
  },
  {
    id: 'lc2',
    title: 'Chemical Reactions & Equations — Class 10',
    subject: 'Science', teacher: 'Mrs. Sunita Rao', class: 'Class 10',
    date: '14 May 2026', time: '5:00 PM', duration: '1h 15m',
    status: 'upcoming', thumbnail: '⚗️',
    description: 'Types of chemical reactions, balancing equations, oxidation and reduction with examples from NCERT.',
    tags: ['Class 10', 'Science', 'Chemistry'],
  },
  {
    id: 'lc3',
    title: 'Electricity — Ohm\'s Law & Circuits',
    subject: 'Physics', teacher: 'Mr. Vikram Singh', class: 'Class 10',
    date: '13 May 2026', time: '6:30 PM', duration: '1h 05m',
    status: 'recorded', recordingUrl: '#',
    thumbnail: '⚡',
    description: 'Ohm\'s law derivation, series and parallel circuits, resistance, power and practical problems.',
    tags: ['Class 10', 'Physics', 'Electricity'],
  },
  {
    id: 'lc4',
    title: 'Triangles — Similarity & Pythagoras Theorem',
    subject: 'Mathematics', teacher: 'Mrs. Priya Mehta', class: 'Class 9',
    date: '13 May 2026', time: '4:00 PM', duration: '1h 30m',
    status: 'recorded', recordingUrl: '#',
    thumbnail: '📐',
    description: 'Criteria for similarity of triangles, Pythagoras theorem proof, and application problems.',
    tags: ['Class 9', 'Math', 'Geometry'],
  },
  {
    id: 'lc5',
    title: 'Light — Reflection & Refraction Deep Dive',
    subject: 'Physics', teacher: 'Mr. Vikram Singh', class: 'Class 10',
    date: '12 May 2026', time: '7:00 PM', duration: '1h 40m',
    status: 'recorded', recordingUrl: '#',
    thumbnail: '💡',
    description: 'Mirror formula, lens formula, magnification, total internal reflection and real-life applications.',
    tags: ['Class 10', 'Physics', 'Light'],
  },
  {
    id: 'lc6',
    title: 'Periodic Table & Chemical Properties',
    subject: 'Chemistry', teacher: 'Mrs. Kavita Joshi', class: 'Class 11',
    date: '11 May 2026', time: '5:30 PM', duration: '1h 25m',
    status: 'recorded', recordingUrl: '#',
    thumbnail: '🧪',
    description: 'Periodicity, electronic configuration trends, ionization energy, electronegativity across periods and groups.',
    tags: ['Class 11', 'Chemistry', 'JEE'],
  },
  {
    id: 'lc7',
    title: 'Integration Techniques — JEE Foundation',
    subject: 'Mathematics', teacher: 'Mr. Anand Kumar', class: 'Class 12',
    date: '15 May 2026', time: '8:00 PM', duration: '1h 30m',
    status: 'upcoming', thumbnail: '∫',
    description: 'Substitution, integration by parts, partial fractions — JEE-level problems solved live.',
    tags: ['Class 12', 'Math', 'JEE'],
  },
  {
    id: 'lc8',
    title: 'Integers & Number Line — Class 7',
    subject: 'Mathematics', teacher: 'Mrs. Rekha Sharma', class: 'Class 7',
    date: '15 May 2026', time: '4:30 PM', duration: '50m',
    status: 'upcoming', thumbnail: '🔢',
    description: 'Understanding integers, number line operations, addition and subtraction of integers with visual methods.',
    tags: ['Class 7', 'Math', 'Basics'],
  },
]

const SCHEDULES = [
  { day: 'Mon', slots: ['4:00 PM — Class 7 Math', '6:30 PM — Class 9 Science', '8:00 PM — Class 12 JEE Math'] },
  { day: 'Tue', slots: ['4:30 PM — Class 8 Science', '7:00 PM — Class 10 Physics'] },
  { day: 'Wed', slots: ['5:00 PM — Class 10 Chemistry', '7:30 PM — Class 11 JEE Chemistry'] },
  { day: 'Thu', slots: ['4:00 PM — Class 6 Math', '6:00 PM — Class 9 Math', '8:00 PM — Class 12 Biology'] },
  { day: 'Fri', slots: ['5:30 PM — Class 10 Math Revision', '7:00 PM — Class 11 Physics'] },
  { day: 'Sat', slots: ['10:00 AM — Olympiad Prep', '2:00 PM — NTSE Science', '5:00 PM — Class 10 Doubts'] },
  { day: 'Sun', slots: ['11:00 AM — Weekly Revision All Classes', '4:00 PM — JEE/NEET Strategy'] },
]

const SUBJECTS = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Science', 'Biology']
const CLASSES_FILTER = ['All Classes', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12']
const STATUSES = ['All', 'Live', 'Upcoming', 'Recorded']

// ── StatusBadge ────────────────────────────────────────────────────────────
function StatusBadge({ status, viewers }: { status: LiveClass['status']; viewers?: number }) {
  if (status === 'live') return (
    <div style={{ display:'flex', alignItems:'center', gap:5 }}>
      <span style={{ display:'inline-flex', alignItems:'center', gap:4, background:'#ef4444', color:'#fff', borderRadius:6, padding:'3px 9px', fontSize:11, fontWeight:800 }}>
        <span style={{ width:7, height:7, borderRadius:'50%', background:'#fff', animation:'pulse-live 1s infinite', display:'inline-block' }} />
        LIVE
      </span>
      {viewers && <span style={{ fontSize:11, color:'#6b7280' }}>👥 {viewers}</span>}
    </div>
  )
  if (status === 'upcoming') return (
    <span style={{ background:'#fbbf24', color:'#78350f', borderRadius:6, padding:'3px 9px', fontSize:11, fontWeight:800 }}>⏰ UPCOMING</span>
  )
  return (
    <span style={{ background:'#e0e7ff', color:'#3730a3', borderRadius:6, padding:'3px 9px', fontSize:11, fontWeight:800 }}>🎬 RECORDED</span>
  )
}

// ══════════════════════════════════════════════════════════════════════════
export default function LiveClassesPage() {
  const [filterSubject, setFilterSubject] = useState('All')
  const [filterClass,   setFilterClass]   = useState('All Classes')
  const [filterStatus,  setFilterStatus]  = useState('All')
  const [activeTab,     setActiveTab]     = useState<'classes'|'schedule'|'recordings'>('classes')

  const filtered = CLASSES.filter(c => {
    if (filterSubject !== 'All' && c.subject !== filterSubject) return false
    if (filterClass !== 'All Classes' && c.class !== filterClass) return false
    if (filterStatus !== 'All' && c.status.toLowerCase() !== filterStatus.toLowerCase()) return false
    return true
  })

  const liveNow    = CLASSES.filter(c => c.status === 'live')
  const recordings = CLASSES.filter(c => c.status === 'recorded')
  const upcoming   = CLASSES.filter(c => c.status === 'upcoming')

  return (
    <div style={{ minHeight:'100vh', background:'#f0f4f8', fontFamily:'Sora,Inter,sans-serif' }}>
      <style>{`
        @keyframes pulse-live { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes pulse-ring  { 0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,.4)} 70%{box-shadow:0 0 0 10px rgba(239,68,68,0)} }
      `}</style>

      {/* ── HEADER ──────────────────────────────────────────────────── */}
      <div style={{ background:'linear-gradient(135deg,#1a3a6b 0%,#0e2347 100%)', color:'#fff', padding:'24px 20px 0' }}>
        <div style={{ maxWidth:1000, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
            <div>
              <Link href="/" style={{ color:'rgba(255,255,255,.6)', textDecoration:'none', fontSize:13 }}>← Home</Link>
              <h1 style={{ margin:'8px 0 4px', fontSize:26, fontWeight:900 }}>🎥 Live Classes &amp; Recordings</h1>
              <p style={{ margin:0, fontSize:14, color:'rgba(255,255,255,.7)' }}>
                Live sessions, scheduled classes, and full recording library — Class 6 to 12 + JEE/NEET
              </p>
            </div>
            {liveNow.length > 0 && (
              <div style={{ background:'rgba(239,68,68,.15)', border:'1.5px solid rgba(239,68,68,.4)', borderRadius:12, padding:'10px 16px', textAlign:'center', animation:'pulse-ring 2s infinite' }}>
                <div style={{ fontSize:22, fontWeight:900, color:'#fca5a5' }}>{liveNow.length}</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,.7)' }}>class{liveNow.length>1?'es':''} live now</div>
              </div>
            )}
          </div>

          {/* Stats strip */}
          <div style={{ display:'flex', gap:16, marginBottom:20 }}>
            {[
              { label:'Live Now',    value: liveNow.length,     icon:'🔴', color:'#fca5a5' },
              { label:'Upcoming',   value: upcoming.length,    icon:'⏰', color:'#fde68a' },
              { label:'Recordings', value: recordings.length,  icon:'🎬', color:'#a5b4fc' },
              { label:'Teachers',   value: [...new Set(CLASSES.map(c=>c.teacher))].length, icon:'👨‍🏫', color:'#86efac' },
            ].map(s => (
              <div key={s.label} style={{ background:'rgba(255,255,255,.1)', borderRadius:10, padding:'8px 14px', flexShrink:0 }}>
                <div style={{ fontSize:16, fontWeight:800, color:s.color }}>{s.icon} {s.value}</div>
                <div style={{ fontSize:10, color:'rgba(255,255,255,.6)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display:'flex', gap:2, borderBottom:'2px solid rgba(255,255,255,.1)' }}>
            {([['classes','📚 All Classes'],['recordings','🎬 Recordings'],['schedule','📅 Schedule']] as const).map(([id, label]) => (
              <button key={id} onClick={() => setActiveTab(id)}
                style={{ padding:'10px 18px', background:'none', border:'none', color: activeTab===id ? '#f59e0b' : 'rgba(255,255,255,.6)', fontWeight: activeTab===id ? 800 : 500, fontSize:13, cursor:'pointer', borderBottom: activeTab===id ? '2.5px solid #f59e0b' : '2.5px solid transparent', fontFamily:'inherit', whiteSpace:'nowrap' }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ─────────────────────────────────────────────────── */}
      <div style={{ maxWidth:1000, margin:'0 auto', padding:'24px 16px' }}>

        {/* ═══ ALL CLASSES TAB ════════════════════════════════════════ */}
        {activeTab === 'classes' && (
          <div>
            {/* LIVE NOW banner */}
            {liveNow.length > 0 && (
              <div style={{ background:'linear-gradient(135deg,#dc2626,#b91c1c)', borderRadius:16, padding:16, marginBottom:20, color:'#fff' }}>
                <div style={{ fontSize:14, fontWeight:800, marginBottom:12 }}>
                  🔴 LIVE NOW — Join these classes instantly!
                </div>
                {liveNow.map(c => (
                  <div key={c.id} style={{ display:'flex', alignItems:'center', gap:14, background:'rgba(255,255,255,.1)', borderRadius:12, padding:12, marginBottom:8 }}>
                    <span style={{ fontSize:30 }}>{c.thumbnail}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:14, fontWeight:700 }}>{c.title}</div>
                      <div style={{ fontSize:12, color:'rgba(255,255,255,.75)' }}>{c.teacher} · {c.class} · {c.duration}</div>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      <div style={{ fontSize:12, color:'rgba(255,255,255,.75)', marginBottom:6 }}>👥 {c.viewers} watching</div>
                      <button style={{ background:'#fff', color:'#dc2626', padding:'7px 18px', borderRadius:10, border:'none', fontWeight:800, fontSize:12, cursor:'pointer' }}>
                        Join Now →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Filters */}
            <div style={{ display:'flex', gap:10, marginBottom:18, flexWrap:'wrap' }}>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                style={{ padding:'7px 12px', borderRadius:9, border:'1.5px solid #e5e7eb', background:'#fff', fontSize:12, cursor:'pointer', fontFamily:'inherit' }}>
                {STATUSES.map(s => <option key={s} value={s}>{s === 'All' ? 'All Status' : s}</option>)}
              </select>
              <select value={filterSubject} onChange={e => setFilterSubject(e.target.value)}
                style={{ padding:'7px 12px', borderRadius:9, border:'1.5px solid #e5e7eb', background:'#fff', fontSize:12, cursor:'pointer', fontFamily:'inherit' }}>
                {SUBJECTS.map(s => <option key={s} value={s}>{s === 'All' ? 'All Subjects' : s}</option>)}
              </select>
              <select value={filterClass} onChange={e => setFilterClass(e.target.value)}
                style={{ padding:'7px 12px', borderRadius:9, border:'1.5px solid #e5e7eb', background:'#fff', fontSize:12, cursor:'pointer', fontFamily:'inherit' }}>
                {CLASSES_FILTER.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Class cards grid */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))', gap:14 }}>
              {filtered.map(c => (
                <div key={c.id} style={{ background:'#fff', borderRadius:16, overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,.06)', border: c.status==='live' ? '2px solid #ef4444' : '1px solid #e5e7eb', transition:'transform .2s,box-shadow .2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow='0 8px 24px rgba(0,0,0,.12)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform='none'; (e.currentTarget as HTMLElement).style.boxShadow='0 2px 12px rgba(0,0,0,.06)' }}>

                  {/* Thumbnail */}
                  <div style={{ height:90, background: c.status==='live' ? 'linear-gradient(135deg,#dc2626,#991b1b)' : c.status==='upcoming' ? 'linear-gradient(135deg,#f59e0b,#d97706)' : 'linear-gradient(135deg,#1a3a6b,#0e2347)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:44, position:'relative' }}>
                    {c.thumbnail}
                    <div style={{ position:'absolute', top:10, left:10 }}>
                      <StatusBadge status={c.status} viewers={c.viewers} />
                    </div>
                    {c.status === 'recorded' && (
                      <div style={{ position:'absolute', bottom:8, right:10, fontSize:11, color:'rgba(255,255,255,.7)', background:'rgba(0,0,0,.3)', padding:'2px 8px', borderRadius:6 }}>
                        ⏱ {c.duration}
                      </div>
                    )}
                  </div>

                  <div style={{ padding:14 }}>
                    <div style={{ fontSize:14, fontWeight:800, color:'#1a3a6b', marginBottom:5, lineHeight:1.3 }}>{c.title}</div>
                    <div style={{ fontSize:11, color:'#6b7280', marginBottom:8 }}>👨‍🏫 {c.teacher} · {c.class}</div>
                    <div style={{ fontSize:11, color:'#374151', lineHeight:1.5, marginBottom:10 }}>{c.description}</div>
                    <div style={{ display:'flex', gap:4, flexWrap:'wrap', marginBottom:12 }}>
                      {c.tags.map(t => (
                        <span key={t} style={{ background:'#eff6ff', color:'#1d4ed8', borderRadius:6, padding:'2px 7px', fontSize:10, fontWeight:600 }}>{t}</span>
                      ))}
                    </div>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <div style={{ fontSize:11, color:'#9ca3af' }}>{c.date} · {c.time}</div>
                      {c.status === 'live' && (
                        <button style={{ background:'#dc2626', color:'#fff', padding:'7px 16px', borderRadius:9, border:'none', fontWeight:800, fontSize:12, cursor:'pointer' }}>
                          🔴 Join Live
                        </button>
                      )}
                      {c.status === 'upcoming' && (
                        <button style={{ background:'#f59e0b', color:'#fff', padding:'7px 16px', borderRadius:9, border:'none', fontWeight:800, fontSize:12, cursor:'pointer' }}>
                          🔔 Set Reminder
                        </button>
                      )}
                      {c.status === 'recorded' && (
                        <button style={{ background:'#1a3a6b', color:'#fff', padding:'7px 16px', borderRadius:9, border:'none', fontWeight:800, fontSize:12, cursor:'pointer' }}>
                          ▶ Watch
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign:'center', padding:'40px 20px', color:'#6b7280' }}>
                <div style={{ fontSize:40, marginBottom:10 }}>🔍</div>
                <div style={{ fontSize:14, fontWeight:600 }}>No classes match your filters</div>
                <button onClick={() => { setFilterSubject('All'); setFilterClass('All Classes'); setFilterStatus('All') }}
                  style={{ marginTop:12, background:'#1a3a6b', color:'#fff', padding:'8px 20px', borderRadius:10, border:'none', cursor:'pointer', fontWeight:700, fontSize:13, fontFamily:'inherit' }}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* ═══ RECORDINGS TAB ═════════════════════════════════════════ */}
        {activeTab === 'recordings' && (
          <div>
            <div style={{ background:'#fff', borderRadius:16, padding:20, marginBottom:16, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
              <h2 style={{ margin:'0 0 6px', fontSize:18, fontWeight:800, color:'#1a3a6b' }}>🎬 Recording Library</h2>
              <p style={{ margin:'0 0 18px', fontSize:13, color:'#6b7280' }}>
                Watch recorded sessions anytime, pause and rewind at your own pace.
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:12 }}>
                {recordings.map(c => (
                  <div key={c.id} style={{ border:'1px solid #e5e7eb', borderRadius:12, overflow:'hidden', cursor:'pointer', transition:'box-shadow .2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow='0 6px 20px rgba(0,0,0,.1)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow='none'}>
                    <div style={{ height:80, background:'linear-gradient(135deg,#1a3a6b,#254f97)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:36, position:'relative' }}>
                      {c.thumbnail}
                      <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0)', transition:'background .2s' }}>
                        <div style={{ width:36, height:36, borderRadius:'50%', background:'rgba(255,255,255,.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>▶</div>
                      </div>
                      <span style={{ position:'absolute', bottom:6, right:8, fontSize:10, color:'rgba(255,255,255,.8)', background:'rgba(0,0,0,.4)', padding:'1px 6px', borderRadius:4 }}>{c.duration}</span>
                    </div>
                    <div style={{ padding:12 }}>
                      <div style={{ fontSize:12, fontWeight:800, color:'#1a3a6b', marginBottom:4, lineHeight:1.3 }}>{c.title}</div>
                      <div style={{ fontSize:10, color:'#6b7280' }}>{c.teacher} · {c.class}</div>
                      <div style={{ fontSize:10, color:'#9ca3af', marginTop:4 }}>{c.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background:'linear-gradient(135deg,#eff6ff,#dbeafe)', border:'1px solid #bfdbfe', borderRadius:16, padding:20 }}>
              <h3 style={{ margin:'0 0 8px', fontSize:15, fontWeight:800, color:'#1a3a6b' }}>🔒 How to Access Recordings</h3>
              <ul style={{ margin:0, paddingLeft:18, color:'#374151', fontSize:13, lineHeight:2 }}>
                <li>All recordings available free for registered students</li>
                <li>Download PDF notes for each session from class page</li>
                <li>Ask AI tutor doubts about any recorded lesson</li>
                <li>Recordings available for 30 days after session</li>
              </ul>
              <Link href="/dashboard"
                style={{ display:'inline-block', marginTop:14, background:'#1a3a6b', color:'#fff', padding:'9px 20px', borderRadius:10, textDecoration:'none', fontWeight:700, fontSize:13 }}>
                Go to My Dashboard →
              </Link>
            </div>
          </div>
        )}

        {/* ═══ SCHEDULE TAB ═══════════════════════════════════════════ */}
        {activeTab === 'schedule' && (
          <div>
            <div style={{ background:'#fff', borderRadius:16, padding:20, boxShadow:'0 2px 12px rgba(0,0,0,.06)', marginBottom:16 }}>
              <h2 style={{ margin:'0 0 6px', fontSize:18, fontWeight:800, color:'#1a3a6b' }}>📅 Weekly Class Schedule</h2>
              <p style={{ margin:'0 0 18px', fontSize:13, color:'#6b7280' }}>
                Regular sessions every day. Set reminders to never miss a class.
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:12 }}>
                {SCHEDULES.map(s => (
                  <div key={s.day} style={{ border:'1px solid #e5e7eb', borderRadius:12, overflow:'hidden' }}>
                    <div style={{ background:'#1a3a6b', color:'#fff', padding:'8px 14px', fontWeight:800, fontSize:14 }}>{s.day}</div>
                    <div style={{ padding:12 }}>
                      {s.slots.map((slot, i) => (
                        <div key={i} style={{ fontSize:11, color:'#374151', padding:'5px 0', borderBottom: i < s.slots.length-1 ? '1px solid #f3f4f6' : 'none', lineHeight:1.4 }}>
                          {slot}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              <div style={{ background:'#fff', borderRadius:16, padding:18, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
                <h3 style={{ margin:'0 0 12px', fontSize:14, fontWeight:800, color:'#1a3a6b' }}>🔔 Set Reminder</h3>
                <p style={{ fontSize:12, color:'#6b7280', margin:'0 0 14px' }}>Get notified 15 minutes before class starts.</p>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  <select style={{ padding:'8px 12px', borderRadius:9, border:'1.5px solid #e5e7eb', fontSize:12, fontFamily:'inherit' }}>
                    <option>Select a class...</option>
                    {upcoming.map(c => <option key={c.id}>{c.title} — {c.date} {c.time}</option>)}
                  </select>
                  <button style={{ background:'#1a3a6b', color:'#fff', padding:'9px', borderRadius:9, border:'none', fontWeight:700, fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>
                    🔔 Set Reminder
                  </button>
                </div>
              </div>

              <div style={{ background:'#fff', borderRadius:16, padding:18, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
                <h3 style={{ margin:'0 0 12px', fontSize:14, fontWeight:800, color:'#1a3a6b' }}>👩‍🏫 For Teachers</h3>
                <p style={{ fontSize:12, color:'#6b7280', margin:'0 0 14px' }}>Start your live session, manage recordings, share notes.</p>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  <Link href="/teacher/dashboard"
                    style={{ background:'#0a5e3f', color:'#fff', padding:'9px 14px', borderRadius:9, textDecoration:'none', fontWeight:700, fontSize:13, textAlign:'center', display:'block' }}>
                    🎙️ Start Live Class
                  </Link>
                  <Link href="/teacher/dashboard"
                    style={{ background:'#eff6ff', color:'#1a3a6b', padding:'9px 14px', borderRadius:9, textDecoration:'none', fontWeight:700, fontSize:13, textAlign:'center', display:'block' }}>
                    📋 Manage My Classes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
