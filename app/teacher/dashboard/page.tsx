'use client'
// app/teacher/dashboard/page.tsx — Fully translated Teacher Dashboard

import { useState }       from 'react'
import { useTranslations } from '@/lib/use-translations'
import { useAuth }         from '@/lib/use-auth'
import AuthGuard           from '@/components/AuthGuard'
import Link                from 'next/link'

function TeacherContent() {
  const { t } = useTranslations()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview'|'homework'|'attendance'|'exam'>('overview')

  const tabs = [
    { id:'overview',   icon:'📊', label:t('common.all')     },
    { id:'homework',   icon:'📚', label:t('teacher.homework')     },
    { id:'attendance', icon:'✅', label:t('teacher.attendance')    },
    { id:'exam',       icon:'📝', label:t('teacher.exam')          },
  ] as const

  const stats = [
    { label:t('teacher.totalStudents'), val:'34',  icon:'👨‍🎓', color:'#2563eb', bg:'#eff6ff' },
    { label:t('teacher.presentToday'),  val:'28',  icon:'✅',   color:'#059669', bg:'#d1fae5' },
    { label:t('teacher.absentToday'),   val:'6',   icon:'❌',   color:'#dc2626', bg:'#fee2e2' },
    { label:t('teacher.averageScore'),  val:'74%', icon:'🎯',   color:'#d97706', bg:'#fef3c7' },
  ]

  return (
    <div style={{ minHeight:'100vh', background:'#f0f4f8' }}>
      {/* Header */}
      <div style={{ background:'linear-gradient(135deg,#064e34,#059669)', color:'#fff', padding:'1.5rem 1.5rem 3rem' }}>
        <div style={{ maxWidth:1000, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div>
            <div style={{ opacity:.8, fontSize:13, marginBottom:4 }}>{t('teacher.dashboard')}</div>
            <h1 style={{ fontSize:24, fontWeight:900, margin:0 }}>{user?.name ?? t('common.loading')}</h1>
            {user?.subject && <div style={{ marginTop:4, fontSize:13, opacity:.8 }}>{user.subject} {user.classLevel ? `· Class ${user.classLevel}` : ''}</div>}
            {user?.profileId && <div style={{ fontSize:11, opacity:.6, fontFamily:'monospace', marginTop:4 }}>ID: {user.profileId}</div>}
          </div>
          <Link href="/ai-teacher" style={{ padding:'8px 16px', background:'rgba(255,255,255,.15)', color:'#fff', borderRadius:10, textDecoration:'none', fontSize:13, fontWeight:700, border:'1px solid rgba(255,255,255,.25)' }}>
            🤖 {t('teacher.smartTeach')}
          </Link>
        </div>
      </div>

      <div style={{ maxWidth:1000, margin:'-1.5rem auto 0', padding:'0 1.5rem 2rem', position:'relative', zIndex:1 }}>

        {/* Stats */}
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
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}
                style={{ padding:'12px 20px', border:'none', background:activeTab===tab.id?'#f0fdf4':'transparent', color:activeTab===tab.id?'#059669':'#6b7280', fontWeight:activeTab===tab.id?700:500, cursor:'pointer', fontFamily:'inherit', fontSize:13, whiteSpace:'nowrap', borderBottom:`2px solid ${activeTab===tab.id?'#059669':'transparent'}` }}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div style={{ padding:'1.5rem' }}>
            {activeTab === 'overview' && (
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                {[
                  { href:'/teacher/homework',   icon:'📚', label:t('teacher.assignHomework'),  color:'#2563eb', bg:'#eff6ff' },
                  { href:'/teacher/attendance',  icon:'✅', label:t('teacher.markAttendance'),  color:'#059669', bg:'#d1fae5' },
                  { href:'/teacher/exam',        icon:'📝', label:t('teacher.exam'),             color:'#7c3aed', bg:'#f5f3ff' },
                  { href:'/teacher/live-class',  icon:'📹', label:t('teacher.liveClass'),        color:'#d97706', bg:'#fef3c7' },
                  { href:'/teacher/report',      icon:'📊', label:t('teacher.viewReport'),       color:'#dc2626', bg:'#fee2e2' },
                  { href:'/ai-teacher',          icon:'🤖', label:t('teacher.generatePlan'),     color:'#0e7490', bg:'#ecfeff' },
                ].map(l => (
                  <Link key={l.href} href={l.href} style={{ padding:'1rem', background:l.bg, borderRadius:12, textDecoration:'none', display:'flex', alignItems:'center', gap:12 }}>
                    <span style={{ fontSize:28 }}>{l.icon}</span>
                    <span style={{ fontSize:14, fontWeight:700, color:l.color }}>{l.label}</span>
                  </Link>
                ))}
              </div>
            )}

            {activeTab === 'homework' && (
              <div>
                <h3 style={{ fontSize:16, fontWeight:800, margin:'0 0 1rem' }}>📚 {t('teacher.assignHomework')}</h3>
                <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                  {[{label:'Class 10 Physics — Newton\'s Laws', due:'Tomorrow', submitted:22, total:34},
                    {label:'Class 9 Maths — Quadratic Equations', due:'In 3 days', submitted:15, total:30}].map((hw,i) => (
                    <div key={i} style={{ padding:'1rem', background:'#f9fafb', borderRadius:12, border:'1px solid #f3f4f6' }}>
                      <div style={{ fontWeight:700, fontSize:14 }}>{hw.label}</div>
                      <div style={{ fontSize:12, color:'#6b7280', marginTop:4 }}>
                        {t('teacher.homeworkDue')}: {hw.due} · {t('teacher.submitted')}: {hw.submitted}/{hw.total}
                      </div>
                      <div style={{ height:4, background:'#e5e7eb', borderRadius:2, marginTop:8 }}>
                        <div style={{ height:'100%', width:`${(hw.submitted/hw.total)*100}%`, background:'#059669', borderRadius:2 }} />
                      </div>
                    </div>
                  ))}
                  <Link href="/teacher/homework/new" style={{ padding:'10px', background:'#059669', color:'#fff', borderRadius:10, textDecoration:'none', textAlign:'center', fontWeight:700, fontSize:14 }}>
                    + {t('teacher.assignHomework')}
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'attendance' && (
              <div>
                <h3 style={{ fontSize:16, fontWeight:800, margin:'0 0 1rem' }}>✅ {t('teacher.markAttendance')}</h3>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {['Amit Kumar','Priya Sharma','Rahul Singh','Neha Gupta','Arjun Patel'].map((name,i) => (
                    <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 14px', background:'#f9fafb', borderRadius:10 }}>
                      <div style={{ fontWeight:600, fontSize:14 }}>{name}</div>
                      <div style={{ display:'flex', gap:6 }}>
                        {[['P',t('teacher.present'),'#059669'],['A',t('teacher.absent'),'#dc2626'],['L',t('teacher.late'),'#d97706']].map(([code,label,col]) => (
                          <button key={code} style={{ padding:'4px 12px', border:`1.5px solid ${col}`, borderRadius:8, background:'transparent', color:col, fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
                            {code}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button style={{ marginTop:8, padding:'10px', background:'#059669', color:'#fff', border:'none', borderRadius:10, fontWeight:700, cursor:'pointer', fontSize:14, fontFamily:'inherit' }}>
                    {t('teacher.saveAttendance')}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'exam' && (
              <div style={{ textAlign:'center', padding:'2rem 0' }}>
                <div style={{ fontSize:56, marginBottom:'1rem' }}>📝</div>
                <h3 style={{ fontWeight:800, fontSize:18 }}>{t('teacher.exam')}</h3>
                <p style={{ color:'#6b7280', marginBottom:'1.5rem' }}>{t('teacher.generatePlan')}</p>
                <Link href="/teacher/exam/new" style={{ padding:'12px 28px', background:'#7c3aed', color:'#fff', borderRadius:12, textDecoration:'none', fontWeight:700, fontSize:15 }}>
                  + {t('teacher.addQuestion')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TeacherDashboardPage() {
  return (
    <AuthGuard allowedRoles={['teacher','super_admin','content_admin']}>
      <TeacherContent />
    </AuthGuard>
  )
}
