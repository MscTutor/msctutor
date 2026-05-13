'use client'
// app/school-dashboard/page.tsx — Fully translated School Dashboard

import { useState }       from 'react'
import { useTranslations } from '@/lib/use-translations'
import { useAuth }         from '@/lib/use-auth'
import AuthGuard           from '@/components/AuthGuard'
import Link                from 'next/link'

function SchoolContent() {
  const { t } = useTranslations()
  const { user } = useAuth()
  const [tab, setTab] = useState<'overview'|'teachers'|'students'|'notices'>('overview')
  const [copiedId, setCopiedId] = useState(false)

  const schoolId = user?.profileId ?? 'SCH-XXXX-YYYY'

  function copyId() {
    navigator.clipboard.writeText(schoolId).then(() => { setCopiedId(true); setTimeout(()=>setCopiedId(false),2000) })
  }

  const stats = [
    { label:t('school.activeTeachers'), val:'12',  icon:'👩‍🏫', color:'#2563eb', bg:'#eff6ff' },
    { label:t('school.activeStudents'), val:'340', icon:'🎓',   color:'#059669', bg:'#d1fae5' },
    { label:t('school.attendanceRate'), val:'87%', icon:'✅',   color:'#d97706', bg:'#fef3c7' },
    { label:t('school.avgAccuracy'),    val:'71%', icon:'🎯',   color:'#7c3aed', bg:'#f5f3ff' },
  ]

  return (
    <div style={{ minHeight:'100vh', background:'#f0f4f8' }}>
      <div style={{ background:'linear-gradient(135deg,#7c3400,#c2410c)', color:'#fff', padding:'1.5rem 1.5rem 3rem' }}>
        <div style={{ maxWidth:1000, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div>
            <div style={{ opacity:.8, fontSize:13, marginBottom:4 }}>🏫 {t('school.dashboard')}</div>
            <h1 style={{ fontSize:24, fontWeight:900, margin:0 }}>{user?.schoolName ?? user?.name ?? t('common.loading')}</h1>
            <div style={{ marginTop:8, display:'flex', gap:8, alignItems:'center' }}>
              <span style={{ fontFamily:'monospace', fontSize:13, opacity:.8 }}>{t('school.profileId')}: {schoolId}</span>
              <button onClick={copyId} style={{ padding:'3px 10px', background:'rgba(255,255,255,.2)', border:'1px solid rgba(255,255,255,.3)', color:'#fff', borderRadius:6, cursor:'pointer', fontSize:12, fontFamily:'inherit' }}>
                {copiedId ? `✓ ${t('common.copied')}` : t('school.copyId')}
              </button>
            </div>
            <div style={{ fontSize:11, opacity:.6, marginTop:4 }}>{t('school.shareId')}</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1000, margin:'-1.5rem auto 0', padding:'0 1.5rem 2rem', zIndex:1, position:'relative' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'0.875rem', marginBottom:'1.25rem' }}>
          {stats.map(s => (
            <div key={s.label} style={{ background:'#fff', borderRadius:14, border:`1.5px solid ${s.bg}`, padding:'1rem', boxShadow:'0 2px 8px rgba(0,0,0,.06)' }}>
              <div style={{ fontSize:22 }}>{s.icon}</div>
              <div style={{ fontSize:24, fontWeight:900, color:s.color, margin:'4px 0' }}>{s.val}</div>
              <div style={{ fontSize:12, color:'#6b7280' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ background:'#fff', borderRadius:16, border:'1px solid #e5e7eb', overflow:'hidden' }}>
          <div style={{ display:'flex', borderBottom:'1px solid #e5e7eb', overflowX:'auto' }}>
            {[
              {id:'overview', icon:'📊', label: t('common.all')},
              {id:'teachers', icon:'👩‍🏫', label: t('school.teachers')},
              {id:'students', icon:'🎓', label: t('school.students')},
              {id:'notices',  icon:'📢', label: t('school.notices')},
            ].map(tb => (
              <button key={tb.id} onClick={()=>setTab(tb.id as typeof tab)}
                style={{ padding:'12px 20px', border:'none', background:tab===tb.id?'#fff7ed':'transparent', color:tab===tb.id?'#c2410c':'#6b7280', fontWeight:tab===tb.id?700:500, cursor:'pointer', fontFamily:'inherit', fontSize:13, borderBottom:`2px solid ${tab===tb.id?'#c2410c':'transparent'}`, whiteSpace:'nowrap' }}>
                {tb.icon} {tb.label}
              </button>
            ))}
          </div>

          <div style={{ padding:'1.5rem' }}>
            {tab === 'overview' && (
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.875rem' }}>
                {[
                  { href:'/school-dashboard/teachers', icon:'👩‍🏫', label:t('school.addTeacher'),       color:'#2563eb', bg:'#eff6ff' },
                  { href:'/school-dashboard/students', icon:'🎓',   label:t('school.addStudent'),       color:'#059669', bg:'#d1fae5' },
                  { href:'/school-dashboard/notices',  icon:'📢',   label:t('school.addNotice'),        color:'#d97706', bg:'#fef3c7' },
                  { href:'/school-dashboard/leaderboard', icon:'🏆', label:t('school.leaderboard'),    color:'#7c3aed', bg:'#f5f3ff' },
                  { href:'/school-dashboard/attendance', icon:'✅',  label:t('school.attendance'),      color:'#0e7490', bg:'#ecfeff' },
                  { href:'/school-dashboard/results',  icon:'📊',   label:t('school.results'),          color:'#c2410c', bg:'#fff7ed' },
                ].map(l => (
                  <Link key={l.href} href={l.href} style={{ padding:'1rem', background:l.bg, borderRadius:12, textDecoration:'none', display:'flex', alignItems:'center', gap:12 }}>
                    <span style={{ fontSize:26 }}>{l.icon}</span>
                    <span style={{ fontWeight:700, fontSize:14, color:l.color }}>{l.label}</span>
                  </Link>
                ))}
              </div>
            )}

            {tab === 'teachers' && (
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1rem' }}>
                  <h3 style={{ fontSize:16, fontWeight:800, margin:0 }}>👩‍🏫 {t('school.teachers')}</h3>
                  <Link href="/school-dashboard/teachers/add" style={{ padding:'8px 16px', background:'#2563eb', color:'#fff', borderRadius:9, textDecoration:'none', fontWeight:700, fontSize:13 }}>
                    + {t('school.addTeacher')}
                  </Link>
                </div>
                {['Ms. Priya Sharma — Mathematics','Mr. Rahul Kumar — Physics','Ms. Neha Singh — Chemistry','Mr. Amit Gupta — Biology'].map((name,i) => (
                  <div key={i} style={{ padding:'10px 14px', background:'#f9fafb', borderRadius:10, marginBottom:6, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontSize:14, fontWeight:600 }}>{name}</span>
                    <span style={{ fontSize:11, background:'#d1fae5', color:'#059669', borderRadius:20, padding:'2px 10px', fontWeight:700 }}>{t('common.online')}</span>
                  </div>
                ))}
              </div>
            )}

            {tab === 'students' && (
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1rem' }}>
                  <h3 style={{ fontSize:16, fontWeight:800, margin:0 }}>🎓 {t('school.students')}</h3>
                  <div style={{ display:'flex', gap:8 }}>
                    <Link href="/school-dashboard/students/bulk" style={{ padding:'7px 14px', background:'#f3f4f6', color:'#374151', borderRadius:9, textDecoration:'none', fontWeight:600, fontSize:13 }}>
                      {t('school.bulkImport')}
                    </Link>
                    <Link href="/school-dashboard/students/add" style={{ padding:'7px 14px', background:'#059669', color:'#fff', borderRadius:9, textDecoration:'none', fontWeight:700, fontSize:13 }}>
                      + {t('school.addStudent')}
                    </Link>
                  </div>
                </div>
                {['Amit Kumar — Class 10A','Priya Sharma — Class 9B','Rohan Singh — Class 11C','Neha Patel — Class 12A'].map((name,i) => (
                  <div key={i} style={{ padding:'10px 14px', background:'#f9fafb', borderRadius:10, marginBottom:6, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontSize:14, fontWeight:600 }}>{name}</span>
                    <span style={{ fontSize:12, color:'#6b7280' }}>72% {t('dashboard.accuracy')}</span>
                  </div>
                ))}
              </div>
            )}

            {tab === 'notices' && (
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1rem' }}>
                  <h3 style={{ fontSize:16, fontWeight:800, margin:0 }}>📢 {t('school.notices')}</h3>
                  <Link href="/school-dashboard/notices/new" style={{ padding:'8px 16px', background:'#d97706', color:'#fff', borderRadius:9, textDecoration:'none', fontWeight:700, fontSize:13 }}>
                    + {t('school.addNotice')}
                  </Link>
                </div>
                {[
                  { title:'Annual Sports Day — December 15', type:'event', date:'2 days ago' },
                  { title:'Mid-term Exam Schedule Released', type:'exam',  date:'5 days ago' },
                  { title:'Parent-Teacher Meeting Next Week',  type:'general', date:'1 week ago' },
                ].map((n,i) => (
                  <div key={i} style={{ padding:'12px 14px', background:'#f9fafb', borderRadius:10, marginBottom:6, borderLeft:`3px solid ${n.type==='exam'?'#dc2626':n.type==='event'?'#2563eb':'#d97706'}` }}>
                    <div style={{ fontWeight:700, fontSize:14 }}>{n.title}</div>
                    <div style={{ fontSize:11, color:'#9ca3af', marginTop:4 }}>{n.date} · {n.type}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SchoolDashboardPage() {
  return (
    <AuthGuard allowedRoles={['school_admin','super_admin']}>
      <SchoolContent />
    </AuthGuard>
  )
}
