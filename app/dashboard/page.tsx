'use client'
// app/dashboard/page.tsx — Intelligence-upgraded (extends existing architecture)

import { useState, useEffect }   from 'react'
import Link                       from 'next/link'
import { useTranslations }        from '@/lib/use-translations'
import { useAuth }                from '@/lib/use-auth'
import AuthGuard                  from '@/components/AuthGuard'
import { useLearningAnalytics }   from '@/lib/use-learning-analytics'
import { BADGES }                 from '@/lib/gamification'
import type { TopicMastery }      from '@/lib/adaptive/learner-profile'

// ── HELPERS ───────────────────────────────────────────────────────
function heatColor(acc: number) {
  if (acc >= 80) return '#22c55e'
  if (acc >= 60) return '#f59e0b'
  if (acc >= 40) return '#f97316'
  return '#ef4444'
}

// ── LEVEL RING ────────────────────────────────────────────────────
function LevelRing({ pct, level, title }: { pct:number; level:number; title:string }) {
  const r = 36, circ = 2 * Math.PI * r
  return (
    <svg width="90" height="90" viewBox="0 0 90 90" style={{ flexShrink:0 }}>
      <circle cx="45" cy="45" r={r} fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="6"/>
      <circle cx="45" cy="45" r={r} fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="6"
        strokeDasharray={circ} strokeDashoffset={circ*(1-pct/100)}
        strokeLinecap="round" transform="rotate(-90 45 45)"
        style={{transition:'stroke-dashoffset 1s ease'}}/>
      <text x="45" y="42" textAnchor="middle" fill="white" fontSize="18" fontWeight="900" fontFamily="Sora,sans-serif">{level}</text>
      <text x="45" y="57" textAnchor="middle" fill="rgba(255,255,255,.75)" fontSize="9" fontFamily="Sora,sans-serif">{title}</text>
    </svg>
  )
}

// ── BADGE CHIP ────────────────────────────────────────────────────
function BadgeChip({ id }: { id:string }) {
  const b = BADGES.find(x => x.id === id)
  if (!b) return null
  const c = { common:'#6b7280', uncommon:'#059669', rare:'#2563eb', epic:'#7c3aed' }[b.rarity]
  return (
    <div title={b.description} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2,padding:'8px 10px',background:`${c}11`,border:`1.5px solid ${c}33`,borderRadius:10,cursor:'default',minWidth:60,textAlign:'center'}}>
      <span style={{fontSize:22}}>{b.icon}</span>
      <span style={{fontSize:10,fontWeight:700,color:c,lineHeight:1.2}}>{b.name}</span>
    </div>
  )
}

// ── HEATMAP CARD ──────────────────────────────────────────────────
function HeatmapCard({ subject,avgAccuracy,questionsAsked,weeklyTrend }: {subject:string;avgAccuracy:number;questionsAsked:number;weeklyTrend:string}) {
  const col = heatColor(avgAccuracy)
  const ti  = weeklyTrend==='up'?'↑':weeklyTrend==='down'?'↓':'→'
  const tc  = weeklyTrend==='up'?'#22c55e':weeklyTrend==='down'?'#ef4444':'#6b7280'
  return (
    <div style={{background:'#fff',borderRadius:10,border:`2px solid ${col}33`,padding:'10px 12px'}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
        <span style={{fontSize:12,fontWeight:700,color:'#374151',textTransform:'capitalize'}}>{subject}</span>
        <span style={{fontSize:11,fontWeight:700,color:tc}}>{ti}</span>
      </div>
      <div style={{fontSize:20,fontWeight:900,color:col}}>{avgAccuracy}%</div>
      <div style={{height:4,background:'#f3f4f6',borderRadius:2,marginTop:5,overflow:'hidden'}}>
        <div style={{height:'100%',width:`${avgAccuracy}%`,background:col,borderRadius:2,transition:'width .8s ease'}}/>
      </div>
      <div style={{fontSize:10,color:'#9ca3af',marginTop:4}}>{questionsAsked} questions</div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
function DashboardContent() {
  const { t }     = useTranslations()
  const { user }  = useAuth()
  const analytics = useLearningAnalytics(user?.uid)
  const [toast,   setToast]   = useState<string|null>(null)
  const [cleared, setCleared] = useState(false)

  const hour     = new Date().getHours()
  const greetKey = hour<12?'goodMorning':hour<17?'goodAfternoon':'goodEvening'

  // Badge toast
  useEffect(() => {
    const nb = analytics.gamification?.newBadges?.[0]
    if (nb && !cleared) { setToast(nb); setTimeout(()=>{setToast(null);setCleared(true)},4000) }
  }, [analytics.gamification, cleared])

  const stats = [
    { label:t('dashboard.totalQuestions'), val:analytics.totalQuestions||(user?.credits??0), icon:'❓', color:'#2563eb', bg:'#eff6ff' },
    { label:t('dashboard.accuracy'),       val:analytics.loaded?`${analytics.accuracy}%`:'—', icon:'🎯', color:'#059669', bg:'#d1fae5' },
    { label:t('dashboard.streak'),         val:analytics.loaded?`${analytics.streakDays}d`:'0d', icon:'🔥', color:'#d97706', bg:'#fef3c7' },
    { label:'XP',                          val:analytics.xp, icon:'⚡', color:'#7c3aed', bg:'#f5f3ff' },
  ]

  const quickLinks = [
    { href:'/ask',        icon:'🤖', label:t('nav.askAI'),     color:'#2563eb', bg:'#eff6ff' },
    { href:'/ai-teacher', icon:'👩‍🏫', label:t('nav.aiTeacher'), color:'#059669', bg:'#d1fae5' },
    { href:'/mock-test',  icon:'📝', label:t('nav.mockTest'),  color:'#7c3aed', bg:'#f5f3ff' },
    { href:'/formulas',   icon:'📐', label:t('nav.formulas'),  color:'#d97706', bg:'#fef3c7' },
  ]

  return (
    <div style={{minHeight:'100vh',background:'#f0f4f8'}}>
      <style>{`@keyframes slideIn{from{transform:translateX(120%);opacity:0}to{transform:none;opacity:1}}`}</style>

      {/* Badge toast */}
      {toast && (() => { const b=BADGES.find(x=>x.id===toast); return b?(
        <div style={{position:'fixed',top:80,right:20,zIndex:999,background:'linear-gradient(135deg,#7c3aed,#a855f7)',color:'#fff',borderRadius:16,padding:'1rem 1.25rem',boxShadow:'0 8px 32px rgba(124,58,237,.4)',display:'flex',alignItems:'center',gap:12,animation:'slideIn .35s ease',maxWidth:280}}>
          <span style={{fontSize:32}}>{b.icon}</span>
          <div><div style={{fontWeight:900,fontSize:14}}>Badge Earned!</div><div style={{fontSize:13,fontWeight:700}}>{b.name}</div><div style={{fontSize:11,opacity:.85}}>{b.description}</div></div>
          <button onClick={()=>setToast(null)} style={{background:'none',border:'none',color:'#fff',cursor:'pointer',fontSize:16,opacity:.7}}>✕</button>
        </div>
      ):null })()}

      {/* Header */}
      <div style={{background:'linear-gradient(135deg,#1e3a6b,#2563eb)',color:'#fff',padding:'1.5rem 1.5rem 3rem'}}>
        <div style={{maxWidth:1000,margin:'0 auto'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:12}}>
            <div>
              <div style={{opacity:.8,fontSize:14,marginBottom:4}}>{t(`dashboard.${greetKey}`)},</div>
              <h1 style={{fontSize:24,fontWeight:900,margin:'0 0 4px'}}>{user?.name??t('common.loading')}</h1>
              {user?.profileId&&<div style={{fontSize:11,opacity:.6,fontFamily:'monospace'}}>ID: {user.profileId}</div>}
              {analytics.loaded&&analytics.motivationalMsg&&<div style={{marginTop:8,fontSize:13,opacity:.85,maxWidth:400}}>{analytics.motivationalMsg}</div>}
            </div>
            <div style={{display:'flex',alignItems:'center',gap:14,flexWrap:'wrap'}}>
              {analytics.loaded&&<LevelRing pct={analytics.levelPct} level={analytics.level} title={analytics.levelTitle}/>}
              <Link href="/ai-teacher" style={{padding:'8px 14px',background:'rgba(255,255,255,.15)',color:'#fff',borderRadius:10,textDecoration:'none',fontSize:13,fontWeight:700,border:'1px solid rgba(255,255,255,.25)'}}>
                👩‍🏫 {t('nav.aiTeacher')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1000,margin:'-1.5rem auto 0',padding:'0 1.5rem 2rem',position:'relative',zIndex:1}}>

        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'0.875rem',marginBottom:'1.25rem'}}>
          {stats.map(s=>(
            <div key={s.label} style={{background:'#fff',borderRadius:14,border:`1.5px solid ${s.bg}`,padding:'1rem',boxShadow:'0 2px 8px rgba(0,0,0,.06)'}}>
              <div style={{fontSize:24}}>{s.icon}</div>
              <div style={{fontSize:22,fontWeight:900,color:s.color,margin:'4px 0 2px'}}>{s.val}</div>
              <div style={{fontSize:12,color:'#6b7280'}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* XP bar */}
        {analytics.loaded&&(
          <div style={{background:'#fff',borderRadius:14,border:'1px solid #e5e7eb',padding:'0.875rem 1.25rem',marginBottom:'1.25rem',display:'flex',alignItems:'center',gap:'1rem'}}>
            <div style={{flex:1}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'#6b7280',marginBottom:5,fontWeight:600}}>
                <span>Level {analytics.level} — {analytics.levelTitle}</span>
                <span>{analytics.xp} / {analytics.levelNext} XP</span>
              </div>
              <div style={{height:7,background:'#f3f4f6',borderRadius:4,overflow:'hidden'}}>
                <div style={{height:'100%',width:`${analytics.levelPct}%`,background:'linear-gradient(90deg,#7c3aed,#a855f7)',borderRadius:4,transition:'width .8s ease'}}/>
              </div>
            </div>
            <span style={{fontSize:11,color:'#7c3aed',fontWeight:700,whiteSpace:'nowrap'}}>{analytics.levelPct}% to next</span>
          </div>
        )}

        {/* Credits warning */}
        {(user?.credits??5)<=2&&(
          <div style={{background:'#fef3c7',border:'1.5px solid #f59e0b',borderRadius:12,padding:'0.875rem 1.25rem',marginBottom:'1.25rem',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <div style={{fontWeight:700,color:'#92400e',fontSize:14}}>⚠️ {t('dashboard.freeCredits')}: {user?.credits??0}</div>
              <div style={{fontSize:12,color:'#78350f'}}>{t('dashboard.premiumRequired')}</div>
            </div>
            <Link href="/pricing" style={{padding:'7px 16px',background:'#f59e0b',color:'#fff',borderRadius:9,textDecoration:'none',fontWeight:700,fontSize:13}}>
              {t('dashboard.upgrade')} →
            </Link>
          </div>
        )}

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.25rem',marginBottom:'1.25rem'}}>
          {/* Quick links */}
          <div style={{background:'#fff',borderRadius:16,border:'1px solid #e5e7eb',padding:'1.25rem'}}>
            <h2 style={{fontSize:15,fontWeight:800,margin:'0 0 0.875rem',color:'#111'}}>🚀 {t('dashboard.continueLearn')}</h2>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.75rem'}}>
              {quickLinks.map(l=>(
                <Link key={l.href} href={l.href} style={{padding:'0.875rem',background:l.bg,borderRadius:12,textDecoration:'none',display:'flex',flexDirection:'column',gap:5}}>
                  <span style={{fontSize:24}}>{l.icon}</span>
                  <span style={{fontSize:12,fontWeight:700,color:l.color}}>{l.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Revision reminders */}
          <div style={{background:'#fff',borderRadius:16,border:'1px solid #e5e7eb',padding:'1.25rem'}}>
            <h2 style={{fontSize:15,fontWeight:800,margin:'0 0 0.875rem',color:'#111'}}>🔄 {t('aiTeacher.revision.dueNow')}</h2>
            {analytics.revisionsdue.length===0?(
              <div style={{textAlign:'center',padding:'1.5rem 0',color:'#9ca3af',fontSize:13}}>
                <div style={{fontSize:32,marginBottom:6}}>✅</div>
                {t('aiTeacher.revision.allCaughtUp')}
              </div>
            ):(
              <div style={{display:'flex',flexDirection:'column',gap:6}}>
                {analytics.revisionsdue.slice(0,4).map((t2:TopicMastery)=>(
                  <Link key={t2.topicId} href={`/ai-teacher?topic=${encodeURIComponent(t2.topicName)}&mode=revision`}
                    style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 12px',background:'#fef3c7',borderRadius:9,textDecoration:'none',border:'1px solid #fde68a'}}>
                    <span style={{fontSize:13,color:'#78350f',fontWeight:600}}>{t2.topicName}</span>
                    <span style={{fontSize:11,color:'#d97706',fontWeight:700}}>{Math.round(t2.averageScore)}% →</span>
                  </Link>
                ))}
                {analytics.revisionsdue.length>4&&<div style={{fontSize:11,color:'#9ca3af',textAlign:'center'}}>+{analytics.revisionsdue.length-4} more</div>}
              </div>
            )}
          </div>
        </div>

        {/* Subject heatmap */}
        {analytics.subjectHeatmap.length>0&&(
          <div style={{background:'#fff',borderRadius:16,border:'1px solid #e5e7eb',padding:'1.25rem',marginBottom:'1.25rem'}}>
            <h2 style={{fontSize:15,fontWeight:800,margin:'0 0 0.875rem',color:'#111'}}>🌡️ Subject Performance Heatmap</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))',gap:'0.75rem'}}>
              {analytics.subjectHeatmap.map(s=><HeatmapCard key={s.subject} {...s}/>)}
            </div>
          </div>
        )}

        {/* Weak topics */}
        {analytics.weakTopics.length>0&&(
          <div style={{background:'#fff',borderRadius:16,border:'1.5px solid #fecdd3',padding:'1.25rem',marginBottom:'1.25rem'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.875rem'}}>
              <h2 style={{fontSize:15,fontWeight:800,margin:0,color:'#991b1b'}}>⚠️ {t('aiTeacher.weakTopics')}</h2>
              <Link href="/ai-teacher?mode=revision" style={{fontSize:12,color:'#2563eb',textDecoration:'none',fontWeight:600}}>{t('aiTeacher.revision.revise')} all →</Link>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'0.75rem'}}>
              {analytics.weakTopics.slice(0,6).map((topic:TopicMastery)=>(
                <Link key={topic.topicId} href={`/ai-teacher?topic=${encodeURIComponent(topic.topicName)}&mode=revision`}
                  style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'9px 12px',background:'#fff5f5',border:'1.5px solid #fecdd3',borderRadius:10,textDecoration:'none'}}>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:'#111'}}>{topic.topicName}</div>
                    <div style={{fontSize:11,color:'#6b7280'}}>{topic.subject}</div>
                  </div>
                  <span style={{fontSize:12,fontWeight:900,color:'#dc2626',background:'#fee2e2',padding:'2px 8px',borderRadius:20}}>{Math.round(topic.averageScore)}%</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Badges */}
        {analytics.gamification&&analytics.gamification.badges.length>0&&(
          <div style={{background:'#fff',borderRadius:16,border:'1px solid #e5e7eb',padding:'1.25rem',marginBottom:'1.25rem'}}>
            <h2 style={{fontSize:15,fontWeight:800,margin:'0 0 0.875rem',color:'#111'}}>🏅 Your Badges</h2>
            <div style={{display:'flex',gap:'0.75rem',flexWrap:'wrap'}}>
              {analytics.gamification.badges.map(id=><BadgeChip key={id} id={id}/>)}
            </div>
          </div>
        )}

        {/* History */}
        <div style={{background:'#fff',borderRadius:16,border:'1px solid #e5e7eb',padding:'1.25rem'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.875rem'}}>
            <h2 style={{fontSize:15,fontWeight:800,margin:0,color:'#111'}}>📋 {t('dashboard.history')}</h2>
            <Link href="/dashboard/history" style={{fontSize:12,color:'#2563eb',textDecoration:'none',fontWeight:600}}>{t('common.showMore')} →</Link>
          </div>
          <div style={{textAlign:'center',padding:'1.5rem 0',color:'#9ca3af'}}>
            <div style={{fontSize:36,marginBottom:6}}>🤖</div>
            <div style={{fontSize:13}}>{t('dashboard.noHistory')}</div>
            <Link href="/ask" style={{marginTop:10,display:'inline-block',padding:'7px 18px',background:'#2563eb',color:'#fff',borderRadius:9,textDecoration:'none',fontSize:13,fontWeight:700}}>
              {t('nav.askAI')} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <AuthGuard allowedRoles={['student','teacher','school_admin','super_admin','content_admin']}>
      <DashboardContent />
    </AuthGuard>
  )
}
