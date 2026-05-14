'use client'
// app/learn/[classId]/[subject]/[chapterId]/page.tsx
// PREMIUM INTERACTIVE CHAPTER PAGE — Industry EdTech Level

import {
  useState, useEffect, useCallback, useRef, useMemo,
  type FormEvent,
} from 'react'
import Link      from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import {
  getUnifiedChapterById,
  getUnifiedSubjectForClass,
  type NormalizedChapter,
} from '@/lib/global-content'
import {
  getOrCreateProfile, saveProfile,
  updateChapterProgress, updateTopicMastery,
} from '@/lib/adaptive/learner-profile'
import { DynamicKatex } from '@/components/LazyComponents'

// ─── FORMULA DISPLAY ─────────────────────────────────────────────
function FormulaDisplay({ formula }: { formula: string }) {
  const isLatex = /[\\^_{}]|\\frac|\\sqrt|\\sum|\\int/.test(formula)
  if (!isLatex) {
    return <span style={{fontFamily:'monospace',fontSize:15,fontWeight:700,color:'#1e1b4b'}}>{formula}</span>
  }
  return <DynamicKatex math={formula} />
}

// ─── TYPES ───────────────────────────────────────────────────────
type Tab = 'overview'|'learn'|'formulas'|'experiments'|'videos'|'revise'|'ask'

// ─── SUBJECT THEMES ───────────────────────────────────────────────
const THEME: Record<string, {
  primary: string; light: string; border: string
  gradient: string; icon: string; darkText: string
}> = {
  mathematics:    { primary:'#1e40af', light:'#dbeafe', border:'#bfdbfe', gradient:'linear-gradient(135deg,#1e3a8a 0%,#1d4ed8 100%)', icon:'📐', darkText:'#1e3a8a' },
  physics:        { primary:'#0369a1', light:'#e0f2fe', border:'#bae6fd', gradient:'linear-gradient(135deg,#075985 0%,#0284c7 100%)', icon:'⚡', darkText:'#075985' },
  chemistry:      { primary:'#6d28d9', light:'#ede9fe', border:'#ddd6fe', gradient:'linear-gradient(135deg,#4c1d95 0%,#7c3aed 100%)', icon:'⚗️', darkText:'#4c1d95' },
  biology:        { primary:'#065f46', light:'#d1fae5', border:'#a7f3d0', gradient:'linear-gradient(135deg,#064e3b 0%,#059669 100%)', icon:'🧬', darkText:'#064e3b' },
  science:        { primary:'#0369a1', light:'#e0f2fe', border:'#bae6fd', gradient:'linear-gradient(135deg,#075985 0%,#0284c7 100%)', icon:'🔬', darkText:'#075985' },
  english:        { primary:'#1e3a5f', light:'#eff6ff', border:'#bfdbfe', gradient:'linear-gradient(135deg,#1e3a5f 0%,#2563eb 100%)', icon:'📖', darkText:'#1e3a5f' },
  hindi:          { primary:'#991b1b', light:'#fee2e2', border:'#fecaca', gradient:'linear-gradient(135deg,#7f1d1d 0%,#dc2626 100%)', icon:'📝', darkText:'#7f1d1d' },
  'social-science':{ primary:'#065f46', light:'#d1fae5', border:'#a7f3d0', gradient:'linear-gradient(135deg,#064e3b 0%,#10b981 100%)', icon:'🌍', darkText:'#064e3b' },
  history:        { primary:'#92400e', light:'#fef3c7', border:'#fde68a', gradient:'linear-gradient(135deg,#78350f 0%,#d97706 100%)', icon:'📜', darkText:'#78350f' },
  geography:      { primary:'#065f46', light:'#d1fae5', border:'#a7f3d0', gradient:'linear-gradient(135deg,#064e3b 0%,#059669 100%)', icon:'🗺️', darkText:'#064e3b' },
  economics:      { primary:'#065f46', light:'#d1fae5', border:'#a7f3d0', gradient:'linear-gradient(135deg,#064e3b 0%,#059669 100%)', icon:'📊', darkText:'#064e3b' },
  accountancy:    { primary:'#92400e', light:'#fef3c7', border:'#fde68a', gradient:'linear-gradient(135deg,#78350f 0%,#b45309 100%)', icon:'🧾', darkText:'#78350f' },
  'computer-science': { primary:'#374151', light:'#f3f4f6', border:'#e5e7eb', gradient:'linear-gradient(135deg,#111827 0%,#374151 100%)', icon:'💻', darkText:'#111827' },
}
const DEFAULT_THEME = THEME.mathematics

// ─── DIFFICULTY ───────────────────────────────────────────────────
function getDifficulty(chapterNo = 1, classStr = '9') {
  const cls = parseInt(classStr, 10)
  if (cls <= 7 || chapterNo <= 2) return { level:'Beginner',     icon:'🌱', color:'#059669', bg:'#d1fae5', bar:'#22c55e' }
  if (cls <= 9 || chapterNo <= 6) return { level:'Intermediate', icon:'🔥', color:'#d97706', bg:'#fef3c7', bar:'#f59e0b' }
  return                                  { level:'Advanced',     icon:'⚡', color:'#dc2626', bg:'#fee2e2', bar:'#ef4444' }
}

// ─── ESTIMATES ────────────────────────────────────────────────────
function estMinutes(t: number, f: number, e: number) {
  return Math.max(15, t * 8 + f * 3 + e * 12)
}

// ─── OBJECTIVES generator ────────────────────────────────────────
function makeObjectives(ch: NormalizedChapter): string[] {
  const o: string[] = []
  if (ch.topics.length)      o.push(`Understand ${ch.topics.slice(0,2).map(t=>t.title).join(' and ')}`)
  if (ch.formulas.length)    o.push(`Apply ${ch.formulas.length} key formula${ch.formulas.length>1?'s':''}`)
  if (ch.experiments.length) o.push(`Perform ${ch.experiments.length} practised experiment${ch.experiments.length>1?'s':''}`)
  if (ch.keyTerms.length)    o.push(`Define: ${ch.keyTerms.slice(0,3).join(', ')}`)
  o.push('Solve NCERT exercises confidently')
  return o.slice(0, 5)
}

// ─── PREREQUISITES ────────────────────────────────────────────────
const PREREQ_MAP: Record<string, string[][]> = {
  mathematics: [[],['Number Systems'],['Number Systems, Polynomials'],['Polynomials, Coordinate Geometry'],['Triangles, Lines & Angles'],['Coordinate Geometry'],['Polynomials, Quadratic Equations']],
  physics:     [[],['Basic motion'],['Motion concepts'],['Newton\'s Laws'],['Work & Energy'],['Rotational Motion'],['Gravitation, SHM']],
  chemistry:   [[],['Matter & its states'],['Atomic structure basics'],['Periodic table concepts'],['Chemical bonding'],['Acids & Bases'],['Organic basics']],
  biology:     [[],['Cell basics'],['Tissues'],['Control & coordination'],['Reproduction basics'],['Heredity'],['Evolution basics']],
}
function getPrereqs(subject: string, chNo = 1, cls = '9'): string[] {
  const list = PREREQ_MAP[subject] ?? []
  if (chNo <= 1) return [`Basic ${subject} from Class ${parseInt(cls)-1}`]
  return list[chNo-1] ?? [`Chapter ${chNo-1} concepts`]
}

// ─── CHECKPOINT GENERATOR ─────────────────────────────────────────
function makeCheckpoints(ch: NormalizedChapter) {
  return ch.topics.slice(0, 4).map((topic, i) => {
    const excerpt = topic.content.slice(0, 55) + '…'
    return {
      id: `cp${i}`,
      q:  `Which statement best describes "${topic.title}"?`,
      opts: [
        excerpt,
        'A purely theoretical concept with no real application',
        'Only relevant to advanced university-level study',
        'Introduced in Class 2 with no further extension',
      ],
      correct: 0,
      explain: topic.content.slice(0, 180) + '…',
    }
  })
}

// ─── DEMO UID ─────────────────────────────────────────────────────
function uid() {
  if (typeof window==='undefined') return 'demo'
  let id = localStorage.getItem('msc_demo_uid')
  if (!id) { id = 'demo_'+Math.random().toString(36).slice(2,10); localStorage.setItem('msc_demo_uid',id) }
  return id
}

// ═══════════════════════════════════════════════════════════════════
export default function ChapterPage() {
  const params      = useParams()
  const router      = useRouter()
  const classId     = String(params.classId ?? '9')
  const subSlug     = String(params.subject  ?? 'mathematics')
  const chapId      = String(params.chapterId ?? '')

  const theme = THEME[subSlug] ?? DEFAULT_THEME
  const subject = getUnifiedSubjectForClass(classId, subSlug)
  const chapter = getUnifiedChapterById(classId, subSlug, chapId)

  // ── derived ──
  const chapIdx    = useMemo(()=>subject?.chapters.findIndex(c=>c.id===chapId)??-1,[chapId, subject])
  const prevChap   = subject?.chapters[chapIdx-1]
  const nextChap   = subject?.chapters[chapIdx+1]
  const diff       = getDifficulty(chapter?.chapterNo, classId)
  const estTime    = chapter ? estMinutes(chapter.topics.length, chapter.formulas.length, chapter.experiments.length) : 25
  const objectives = useMemo(()=>chapter?makeObjectives(chapter):[], [chapter])
  const prereqs    = chapter ? getPrereqs(subSlug, chapter.chapterNo, classId) : []
  const checkpts   = useMemo(()=>chapter?makeCheckpoints(chapter):[], [chapter])

  // ── state ──
  const [tab,         setTab]       = useState<Tab>('overview')
  const [topicsDone,  setDone]      = useState<Set<string>>(new Set())
  const [openTopic,   setOpenTopic] = useState<string|null>(null)
  const [openFormula, setOpenForm]  = useState<string|null>(null)
  const [flipped,     setFlipped]   = useState<string|null>(null)
  const [cpAnswers,   setCpAns]     = useState<Record<string,(number|null)>>({})
  const [aiQ,         setAiQ]       = useState('')
  const [aiA,         setAiA]       = useState('')
  const [aiLoading,   setAiLoad]    = useState(false)
  const [copied,      setCopied]    = useState<string|null>(null)
  const [nextRec,     setNextRec]   = useState<string|null>(null)
  const [showBadge,   setShowBadge] = useState(false)
  const startMs  = useRef(Date.now())
  const areaRef  = useRef<HTMLTextAreaElement>(null)

  // ── progress ──
  const totalTopics  = chapter?.topics.length ?? 0
  const doneCount    = topicsDone.size
  const pct          = totalTopics > 0 ? Math.round((doneCount/totalTopics)*100) : 0
  const circumference = 2 * Math.PI * 36

  // ── load saved progress ──
  useEffect(() => {
    const key   = `cp_${classId}_${subSlug}_${chapId}`
    const saved = localStorage.getItem(key)
    if (saved) {
      try { setDone(new Set(JSON.parse(saved))) } catch {}
    }
    const prof = getOrCreateProfile(uid(), 'Student', classId)
    const weak = Object.values(prof.topicMastery)
      .filter(t=>t.subject===subSlug && t.needsRevision)
      .sort((a,b)=>a.averageScore-b.averageScore)[0]
    if (weak) setNextRec(`Revise: ${weak.topicName}`)
    else if (nextChap) setNextRec(`Next: ${nextChap.title}`)
  }, [classId, subSlug, chapId, nextChap])

  // ── celebrate on 100% ──
  useEffect(()=>{
    if(pct===100 && totalTopics>0) { setShowBadge(true); setTimeout(()=>setShowBadge(false),4000) }
  },[pct, totalTopics])

  // ── mark topic done ──
  const markDone = useCallback((title: string)=>{
    const next = new Set([...topicsDone, title])
    setDone(next)
    const key = `cp_${classId}_${subSlug}_${chapId}`
    localStorage.setItem(key, JSON.stringify([...next]))
    if (!chapter) return
    const prof = getOrCreateProfile(uid(),'Student',classId)
    const p1   = updateTopicMastery(prof,{
      topicId:title,topicName:title,subject:subSlug,classLevel:classId,
      chapterId:chapId,chapterName:chapter.title,correct:true,
      timeSpentMin: Math.round((Date.now()-startMs.current)/60000)||1,
    })
    const p2 = updateChapterProgress(p1,chapId,subSlug,classId,chapter.title,
      chapter.topics.length,next.size,undefined,
      Math.round((Date.now()-startMs.current)/60000)||1)
    saveProfile(p2)
  },[topicsDone,classId,subSlug,chapId,chapter])

  // ── ask AI ──
  const ask = useCallback(async(q:string)=>{
    if(!q.trim()||aiLoading) return
    setAiLoad(true); setAiA('')
    try {
      const r = await fetch('/api/ask',{
        method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          question:`${q} (Class ${classId} ${subSlug}${chapter?`, Chapter: ${chapter.title}`:''})`,
          subject:subSlug, classLevel:classId,
        }),
      })
      const d = await r.json()
      setAiA(d.solution ?? d.answer ?? 'Sorry, could not get an answer. Please try again.')
    } catch { setAiA('Connection error. Please check your internet and try again.') }
    setAiLoad(false)
  },[aiLoading,classId,subSlug,chapter])

  const copyText = useCallback((text:string,id:string)=>{
    navigator.clipboard?.writeText(text).then(()=>{
      setCopied(id); setTimeout(()=>setCopied(null),2000)
    }).catch(()=>{})
  },[])

  // ─── NOT FOUND ────────────────────────────────────────────────
  if (!chapter || !subject) return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'1rem',textAlign:'center',padding:'2rem'}}>
      <div style={{fontSize:72}}>📚</div>
      <h2 style={{fontSize:22,fontWeight:900,color:'#111',margin:0}}>Chapter content coming soon</h2>
      <p style={{color:'#6b7280',fontSize:15,maxWidth:400}}>Rich content is being added. Ask AI anything about this topic right now!</p>
      <div style={{display:'flex',gap:'0.75rem'}}>
        <Link href="/ask" style={{padding:'10px 24px',background:'#1e40af',color:'#fff',borderRadius:12,textDecoration:'none',fontWeight:700}}>🤖 Ask AI</Link>
        <Link href={`/class/${classId}/${subSlug}`} style={{padding:'10px 24px',background:'#f3f4f6',color:'#374151',borderRadius:12,textDecoration:'none',fontWeight:700}}>← Back</Link>
      </div>
    </div>
  )

  // ─── QUICK-ASK helper ─────────────────────────────────────────
  const qaAndSwitch = (q:string)=>{ setAiQ(q); setTab('ask'); ask(q) }

  // ─── STYLES ───────────────────────────────────────────────────
  const S = {
    card: { background:'#fff', borderRadius:16, border:'1.5px solid #e5e7eb', padding:'1.25rem' } as React.CSSProperties,
    pill: (active=false): React.CSSProperties => ({ padding:'4px 12px', borderRadius:20, fontSize:12, fontWeight:700,
      background: active? theme.primary : theme.light,
      color:      active? '#fff'         : theme.darkText,
      border:     `1.5px solid ${theme.border}`, cursor:'pointer', fontFamily:'inherit' }),
    btn: (variant:'primary'|'outline'|'ghost'='primary'): React.CSSProperties => ({
      padding:'9px 20px', borderRadius:11, fontWeight:700, cursor:'pointer', fontFamily:'inherit', fontSize:14, border:'none',
      background: variant==='primary'? theme.primary : variant==='outline'? 'transparent' : '#f3f4f6',
      color:      variant==='primary'? '#fff'         : variant==='outline'? theme.primary : '#374151',
      ...(variant==='outline'?{border:`2px solid ${theme.primary}`}:{}),
    }),
  }

  return (
    <div style={{minHeight:'100vh',background:'#f0f4f8',fontFamily:'system-ui,sans-serif'}}>

{/* ───────── GLOBAL STYLES ───────── */}
<style>{`
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  @keyframes ping{0%{transform:scale(1);opacity:1}75%,100%{transform:scale(2);opacity:0}}
  @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes pulse2{0%,100%{opacity:1}50%{opacity:.4}}
  @keyframes slidein{from{transform:translateX(100%);opacity:0}to{transform:none;opacity:1}}
  .tab{border:none;background:transparent;cursor:pointer;font-family:inherit;padding:11px 16px;font-size:13px;font-weight:600;color:#6b7280;border-bottom:3px solid transparent;transition:all .18s;white-space:nowrap;position:relative}
  .tab.on{color:${theme.primary};border-bottom-color:${theme.primary}}
  .tab:hover:not(.on){color:#374151;background:rgba(0,0,0,.03)}
  .topic{background:#fff;border-radius:14px;border:2px solid #e5e7eb;transition:all .2s;overflow:hidden}
  .topic.done{border-color:${theme.primary};background:${theme.light}}
  .topic:not(.done):hover{border-color:${theme.primary}66;box-shadow:0 4px 20px rgba(0,0,0,.08)}
  .fcrd{perspective:800px;cursor:pointer;user-select:none}
  .fcrd-inner{transition:transform .55s cubic-bezier(.4,0,.2,1);transform-style:preserve-3d;position:relative;min-height:130px}
  .fcrd.flip .fcrd-inner{transform:rotateY(180deg)}
  .fcrd-f,.fcrd-b{position:absolute;inset:0;backface-visibility:hidden;border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1.1rem;text-align:center;min-height:130px}
  .fcrd-b{transform:rotateY(180deg)}
  .optbtn{width:100%;text-align:left;padding:11px 15px;border:2px solid #e5e7eb;border-radius:10px;cursor:pointer;font-family:inherit;font-size:13.5px;transition:all .15s;background:#fff;line-height:1.5}
  .optbtn:not([disabled]):hover{border-color:${theme.primary}55;background:${theme.light}}
  .ring{transform:rotate(-90deg);transform-origin:center;transition:stroke-dashoffset .9s cubic-bezier(.4,0,.2,1)}
  .chip{padding:5px 13px;border-radius:20px;background:${theme.light};border:1.5px solid ${theme.border};color:${theme.darkText};font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .15s;white-space:nowrap}
  .chip:hover{background:${theme.primary};color:#fff;border-color:${theme.primary}}
  .fcard{background:#fff;border-radius:14px;border:2px solid #e5e7eb;overflow:hidden;transition:border-color .2s}
  .fcard:hover{border-color:${theme.primary}55}
  .expcard{background:#fff;border-radius:16px;border:2px solid #e5e7eb;overflow:hidden}
`}</style>

{/* ═══ HEADER ═══════════════════════════════════════════════════ */}
<div style={{background:theme.gradient,color:'#fff',position:'relative',overflow:'hidden'}}>
  {/* decorative blur orbs */}
  <div style={{position:'absolute',top:-60,right:-60,width:220,height:220,borderRadius:'50%',background:'rgba(255,255,255,.07)',pointerEvents:'none'}}/>
  <div style={{position:'absolute',bottom:-40,left:60,width:160,height:160,borderRadius:'50%',background:'rgba(255,255,255,.05)',pointerEvents:'none'}}/>

  {/* breadcrumb */}
  <div style={{padding:'10px 1.5rem',fontSize:12,opacity:.8,display:'flex',gap:6,alignItems:'center',flexWrap:'wrap',position:'relative'}}>
    <Link href="/" style={{color:'rgba(255,255,255,.8)',textDecoration:'none'}}>Home</Link>›
    <Link href={`/class/${classId}`} style={{color:'rgba(255,255,255,.8)',textDecoration:'none'}}>Class {classId}</Link>›
    <Link href={`/class/${classId}/${subSlug}`} style={{color:'rgba(255,255,255,.8)',textDecoration:'none'}}>{subject.name}</Link>›
    <span style={{opacity:.65}}>Ch.{chapter.chapterNo}</span>
  </div>

  {/* main header row */}
  <div style={{padding:'0.75rem 1.5rem 1.25rem',display:'flex',gap:'1.5rem',alignItems:'flex-start',flexWrap:'wrap',position:'relative'}}>
    {/* left info */}
    <div style={{flex:1,minWidth:260}}>
      {/* badges row */}
      <div style={{display:'flex',gap:7,flexWrap:'wrap',marginBottom:10}}>
        <span style={{background:'rgba(255,255,255,.2)',borderRadius:20,padding:'3px 12px',fontSize:12,fontWeight:700}}>
          {theme.icon} {subject.name}
        </span>
        <span style={{background:diff.bg,color:diff.color,borderRadius:20,padding:'3px 12px',fontSize:12,fontWeight:700}}>
          {diff.icon} {diff.level}
        </span>
        <span style={{background:'rgba(255,255,255,.16)',borderRadius:20,padding:'3px 12px',fontSize:12}}>
          ⏱ ~{estTime} min
        </span>
        {chapter.isRich && (
          <span style={{background:'rgba(251,191,36,.25)',color:'#fef08a',borderRadius:20,padding:'3px 12px',fontSize:12,fontWeight:700}}>
            ✦ Rich Content
          </span>
        )}
      </div>

      <h1 style={{fontSize:'clamp(20px,3.5vw,30px)',fontWeight:900,margin:'0 0 8px',lineHeight:1.15,letterSpacing:'-0.3px'}}>
        Chapter {chapter.chapterNo}: {chapter.title}
      </h1>
      <p style={{opacity:.85,fontSize:14,margin:0,lineHeight:1.65,maxWidth:560}}>{chapter.description}</p>
    </div>

    {/* progress ring */}
    <div style={{flexShrink:0,textAlign:'center'}}>
      <svg width="90" height="90" viewBox="0 0 90 90">
        <circle cx="45" cy="45" r="36" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="7"/>
        <circle
          className="ring" cx="45" cy="45" r="36" fill="none"
          stroke={pct===100?'#4ade80':'rgba(255,255,255,.92)'} strokeWidth="7"
          strokeDasharray={circumference}
          strokeDashoffset={circumference*(1-pct/100)}
          strokeLinecap="round"
        />
        <text x="45" y="43" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">{pct}%</text>
        <text x="45" y="57" textAnchor="middle" fill="rgba(255,255,255,.7)" fontSize="9.5">done</text>
      </svg>
      <div style={{fontSize:11,opacity:.7,marginTop:4}}>{doneCount}/{totalTopics} topics</div>
    </div>
  </div>

  {/* stats bar */}
  <div style={{background:'rgba(0,0,0,.14)',borderTop:'1px solid rgba(255,255,255,.1)',display:'flex',gap:'1.5rem',padding:'7px 1.5rem',overflowX:'auto',position:'relative'}}>
    {[
      {icon:'📖',label:'Topics',    n:chapter.topics.length},
      {icon:'📐',label:'Formulas',  n:chapter.formulas.length},
      {icon:'🔬',label:'Experiments',n:chapter.experiments.length},
      {icon:'🎬',label:'Videos',    n:chapter.videos.length},
      {icon:'🔑',label:'Key Terms', n:chapter.keyTerms.length},
      {icon:'💡',label:'Quick Facts',n:chapter.quickFacts.length},
    ].map(s=>(
      <div key={s.label} style={{display:'flex',alignItems:'center',gap:5,fontSize:12.5,opacity:.88,flexShrink:0}}>
        <span>{s.icon}</span>
        <strong>{s.n}</strong>
        <span style={{opacity:.75}}>{s.label}</span>
      </div>
    ))}
  </div>

  {/* AI recommendation banner */}
  {nextRec && (
    <div style={{background:'rgba(0,0,0,.18)',borderTop:'1px solid rgba(255,255,255,.08)',padding:'8px 1.5rem',display:'flex',alignItems:'center',gap:10,flexWrap:'wrap',position:'relative'}}>
      <span style={{fontSize:13,opacity:.82}}>🤖 AI suggests:</span>
      <button
        onClick={()=>{
          if(nextRec.startsWith('Next:')&&nextChap) router.push(`/learn/${classId}/${subSlug}/${nextChap.id}`)
          else { setTab('revise') }
        }}
        style={{background:'rgba(255,255,255,.18)',border:'1px solid rgba(255,255,255,.3)',color:'#fff',borderRadius:20,padding:'4px 14px',fontSize:13,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}
      >
        {nextRec} →
      </button>
    </div>
  )}
</div>

{/* ═══ TABS ══════════════════════════════════════════════════════ */}
<div style={{background:'#fff',borderBottom:'1.5px solid #e5e7eb',overflowX:'auto',position:'sticky',top:0,zIndex:50,boxShadow:'0 2px 8px rgba(0,0,0,.06)'}}>
  <div style={{display:'flex',padding:'0 0.5rem',minWidth:'max-content'}}>
    {([
      {id:'overview',   label:'🗺 Overview'},
      {id:'learn',      label:'📖 Learn',       badge:totalTopics},
      {id:'formulas',   label:'📐 Formulas',    badge:chapter.formulas.length},
      {id:'experiments',label:'🔬 Experiments', badge:chapter.experiments.length},
      {id:'videos',     label:'🎬 Videos',      badge:chapter.videos.length},
      {id:'revise',     label:'🔄 Revise'},
      {id:'ask',        label:'🤖 Ask AI'},
    ] as const).map(t=>(
      <button key={t.id} onClick={()=>setTab(t.id)} className={`tab${tab===t.id?' on':''}`}>
        {t.label}
        {'badge' in t && (t as {badge:number}).badge > 0 && (
          <span style={{marginLeft:5,background:tab===t.id?theme.primary:'#e5e7eb',color:tab===t.id?'#fff':'#6b7280',borderRadius:20,padding:'1px 7px',fontSize:10,fontWeight:800}}>
            {(t as {badge:number}).badge}
          </span>
        )}
      </button>
    ))}
  </div>
</div>

{/* ═══ CONTENT AREA ══════════════════════════════════════════════ */}
<div style={{maxWidth:980,margin:'0 auto',padding:'1.5rem 1rem 3rem'}}>

{/* completion badge toast */}
{showBadge && (
  <div style={{position:'fixed',top:80,right:20,zIndex:999,background:'linear-gradient(135deg,#059669,#10b981)',color:'#fff',borderRadius:16,padding:'1rem 1.5rem',boxShadow:'0 8px 32px rgba(5,150,105,.4)',animation:'slidein .35s ease',display:'flex',alignItems:'center',gap:12}}>
    <span style={{fontSize:36}}>🎉</span>
    <div>
      <div style={{fontWeight:900,fontSize:16}}>Chapter Complete!</div>
      <div style={{fontSize:13,opacity:.9}}>All topics done. Time to revise!</div>
    </div>
  </div>
)}

{/* ── OVERVIEW TAB ─────────────────────────────────────────────── */}
{tab==='overview' && (
<div style={{display:'grid',gap:'1.1rem',animation:'fadeUp .3s ease'}}>

  {/* hero row */}
  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.1rem'}}>

    {/* objectives */}
    <div style={{...S.card,gridColumn:'1/-1'}}>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:'1rem'}}>
        <div style={{width:40,height:40,borderRadius:12,background:theme.light,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>🎯</div>
        <div>
          <div style={{fontWeight:800,fontSize:16,color:'#111'}}>Learning Objectives</div>
          <div style={{fontSize:12,color:'#6b7280'}}>By end of this chapter you will:</div>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:8}}>
        {objectives.map((o,i)=>(
          <div key={i} style={{display:'flex',alignItems:'flex-start',gap:10,padding:'10px 13px',background:theme.light,borderRadius:11,border:`1px solid ${theme.border}`}}>
            <div style={{width:24,height:24,borderRadius:'50%',background:theme.primary,color:'#fff',fontSize:11,fontWeight:900,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}>{i+1}</div>
            <span style={{fontSize:13.5,color:'#374151',lineHeight:1.5}}>{o}</span>
          </div>
        ))}
      </div>
    </div>

    {/* prerequisites */}
    <div style={S.card}>
      <div style={{fontWeight:800,fontSize:15,marginBottom:'0.875rem',display:'flex',alignItems:'center',gap:8}}>
        <span style={{fontSize:20}}>🔗</span> Prerequisites
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:7}}>
        {prereqs.length===0
          ? <div style={{fontSize:13,color:'#9ca3af',padding:'8px 0'}}>No prerequisites — start here!</div>
          : prereqs.map((p,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:9,padding:'9px 13px',background:'#fef3c7',borderRadius:10,border:'1px solid #fde68a'}}>
              <span style={{fontSize:15}}>📌</span>
              <span style={{fontSize:13.5,color:'#78350f',fontWeight:600}}>{p}</span>
            </div>
          ))
        }
      </div>
    </div>

    {/* stats */}
    <div style={S.card}>
      <div style={{fontWeight:800,fontSize:15,marginBottom:'0.875rem',display:'flex',alignItems:'center',gap:8}}>
        <span style={{fontSize:20}}>📊</span> Chapter Stats
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {[
          {l:'Difficulty',  v:<span style={{background:diff.bg,color:diff.color,padding:'2px 10px',borderRadius:20,fontSize:12,fontWeight:700}}>{diff.icon} {diff.level}</span>},
          {l:'Est. Time',   v:<strong>{estTime} min</strong>},
          {l:'Topics',      v:<strong>{chapter.topics.length}</strong>},
          {l:'Formulas',    v:<strong>{chapter.formulas.length}</strong>},
          {l:'Experiments', v:<strong>{chapter.experiments.length}</strong>},
          {l:'Progress',    v:<strong style={{color:theme.primary}}>{pct}%</strong>},
        ].map(row=>(
          <div key={row.l} style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:13.5}}>
            <span style={{color:'#6b7280'}}>{row.l}</span>
            <span style={{fontSize:14}}>{row.v}</span>
          </div>
        ))}
        <div style={{height:7,background:'#f3f4f6',borderRadius:4,overflow:'hidden',marginTop:2}}>
          <div style={{height:'100%',width:`${pct}%`,background:diff.bar,borderRadius:4,transition:'width .8s ease'}}/>
        </div>
      </div>
    </div>
  </div>

  {/* quick facts */}
  {chapter.quickFacts.length>0 && (
    <div style={{background:theme.gradient,borderRadius:16,padding:'1.25rem',color:'#fff'}}>
      <div style={{fontWeight:800,fontSize:15,marginBottom:'0.875rem',display:'flex',alignItems:'center',gap:8}}>
        <span style={{fontSize:22}}>💡</span> Did You Know?
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))',gap:10}}>
        {chapter.quickFacts.map((f,i)=>(
          <div key={i} style={{background:'rgba(255,255,255,.13)',borderRadius:11,padding:'10px 13px',fontSize:13.5,lineHeight:1.55,backdropFilter:'blur(4px)'}}>
            <span style={{marginRight:7,opacity:.7}}>✦</span>{f}
          </div>
        ))}
      </div>
    </div>
  )}

  {/* key terms */}
  {chapter.keyTerms.length>0 && (
    <div style={S.card}>
      <div style={{fontWeight:800,fontSize:15,marginBottom:'0.875rem',display:'flex',alignItems:'center',gap:8}}>
        <span style={{fontSize:20}}>🔑</span> Key Terms
        <span style={{fontSize:12,fontWeight:400,color:'#9ca3af'}}>(click any term for AI explanation)</span>
      </div>
      <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
        {chapter.keyTerms.map(t=>(
          <button key={t} className="chip"
            onClick={()=>qaAndSwitch(`What is ${t}? Explain with a real-life example for Class ${classId} student.`)}>
            {t}
          </button>
        ))}
      </div>
    </div>
  )}

  {/* CTA row */}
  <div style={{display:'flex',gap:'0.875rem',justifyContent:'center',flexWrap:'wrap',paddingTop:'0.5rem'}}>
    <button onClick={()=>setTab('learn')} style={{...S.btn('primary'),padding:'13px 36px',fontSize:15,boxShadow:`0 4px 20px ${theme.primary}44`}}>
      🚀 Start Learning →
    </button>
    <button onClick={()=>setTab('revise')} style={{...S.btn('outline'),padding:'13px 28px',fontSize:15}}>
      🔄 Quick Revision
    </button>
    <button onClick={()=>qaAndSwitch(`Give a complete overview of the chapter "${chapter.title}" for Class ${classId} ${subject.name}. Include key concepts and most important points.`)}
      style={{...S.btn('ghost'),padding:'13px 24px',fontSize:15}}>
      🤖 AI Summary
    </button>
  </div>
</div>
)}

{/* ── LEARN TAB ─────────────────────────────────────────────────── */}
{tab==='learn' && (
<div style={{animation:'fadeUp .3s ease'}}>
  {/* progress header */}
  <div style={{...S.card,marginBottom:'1.1rem',display:'flex',alignItems:'center',gap:'1.25rem',flexWrap:'wrap'}}>
    <div style={{flex:1}}>
      <div style={{fontSize:12.5,color:'#6b7280',marginBottom:6,fontWeight:600}}>
        Chapter Progress — {pct}% Complete ({doneCount}/{totalTopics} topics)
      </div>
      <div style={{height:9,background:'#f3f4f6',borderRadius:5,overflow:'hidden'}}>
        <div style={{height:'100%',width:`${pct}%`,background:`linear-gradient(90deg,${diff.bar},${theme.primary})`,borderRadius:5,transition:'width .6s ease'}}/>
      </div>
    </div>
    <button onClick={()=>setTab('revise')} style={S.btn('outline')}>🔄 Test Knowledge</button>
  </div>

  {/* topics list */}
  <div style={{display:'flex',flexDirection:'column',gap:'0.875rem'}}>
    {chapter.topics.map((topic, idx)=>{
      const done = topicsDone.has(topic.title)
      const open = openTopic===topic.title
      return (
        <div key={topic.title} className={`topic${done?' done':''}`}>
          {/* header */}
          <div onClick={()=>setOpenTopic(open?null:topic.title)}
            style={{padding:'1rem 1.25rem',display:'flex',alignItems:'center',gap:13,cursor:'pointer'}}>
            {/* step badge */}
            <div style={{
              width:38,height:38,borderRadius:'50%',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',
              fontWeight:900,fontSize:14,transition:'all .3s',
              background:done?theme.primary:'#f3f4f6',
              color:done?'#fff':'#374151',
              boxShadow:done?`0 0 0 3px ${theme.primary}33`:undefined,
            }}>
              {done?'✓':idx+1}
            </div>

            {/* title + preview */}
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:800,fontSize:15.5,color:done?theme.primary:'#111',display:'flex',alignItems:'center',gap:8}}>
                {topic.title}
                {done && <span style={{background:'#d1fae5',color:'#059669',fontSize:10,fontWeight:700,padding:'1px 8px',borderRadius:20}}>✓ Done</span>}
              </div>
              {!open && (
                <div style={{fontSize:12.5,color:'#9ca3af',marginTop:3,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                  {topic.content.slice(0,90)}…
                </div>
              )}
            </div>

            {/* actions */}
            <div style={{display:'flex',gap:6,flexShrink:0,alignItems:'center'}}>
              {!done && (
                <button onClick={e=>{e.stopPropagation();markDone(topic.title)}}
                  style={{...S.pill(),padding:'5px 14px',fontSize:12}}>
                  ✓ Done
                </button>
              )}
              <button onClick={e=>{e.stopPropagation();qaAndSwitch(`Explain "${topic.title}" from Class ${classId} ${subject.name} with a simple real-life Indian example. Use step-by-step format.`)}}
                style={{padding:'5px 12px',borderRadius:9,border:'none',background:'#e8eef8',color:'#1e40af',fontSize:12,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>
                🤖 AI
              </button>
              <span style={{fontSize:15,color:'#9ca3af',transform:open?'rotate(180deg)':'none',transition:'transform .2s',display:'block'}}>▼</span>
            </div>
          </div>

          {/* expanded body */}
          {open && (
            <div style={{padding:'0 1.25rem 1.25rem',animation:'fadeUp .22s ease'}}>
              {/* chapter image if available */}
              {topic.image && (
                <img src={topic.image} alt={topic.title} loading="lazy"
                  style={{width:'100%',maxHeight:220,objectFit:'cover',borderRadius:12,marginBottom:'0.875rem',border:'1px solid #e5e7eb'}}
                  onError={e=>{(e.target as HTMLImageElement).style.display='none'}}/>
              )}
              <div style={{background:'#f9fafb',borderRadius:12,padding:'1rem 1.25rem',fontSize:14,lineHeight:1.8,color:'#374151',border:'1px solid #f3f4f6',whiteSpace:'pre-wrap'}}>
                {topic.content}
              </div>

              {/* action buttons */}
              <div style={{display:'flex',gap:8,marginTop:'0.875rem',flexWrap:'wrap'}}>
                {!done && (
                  <button onClick={()=>markDone(topic.title)} style={S.btn('primary')}>
                    ✓ Mark as Done
                  </button>
                )}
                <button onClick={()=>qaAndSwitch(`Give me 2 practice questions on "${topic.title}" (Class ${classId} ${subject.name}) with solutions.`)}
                  style={S.btn('outline')}>✏️ Practice Qs</button>
                <button onClick={()=>qaAndSwitch(`Explain "${topic.title}" using the simplest possible analogy that a Class ${classId} Indian student can understand.`)}
                  style={S.btn('ghost')}>💡 Simpler</button>
                <button onClick={()=>qaAndSwitch(`What are the common mistakes students make in "${topic.title}"? How to avoid them?`)}
                  style={S.btn('ghost')}>⚠️ Common Errors</button>
              </div>
            </div>
          )}
        </div>
      )
    })}
  </div>

  {/* completion CTA */}
  {pct>=75 && (
    <div style={{marginTop:'1.5rem',background:'linear-gradient(135deg,#059669,#10b981)',borderRadius:16,padding:'1.5rem',textAlign:'center',color:'#fff',animation:'fadeUp .3s ease'}}>
      <div style={{fontSize:40,marginBottom:8,animation:pct===100?'bounce 1s infinite':undefined}}>
        {pct===100?'🏆':'🎯'}
      </div>
      <div style={{fontWeight:900,fontSize:18,marginBottom:6}}>
        {pct===100?'Chapter Complete!':` ${pct}% Done — Almost there!`}
      </div>
      <p style={{opacity:.9,fontSize:14,margin:'0 0 1rem'}}>
        {pct===100?'Excellent! Test your knowledge with revision.':'Finish remaining topics then take the revision quiz!'}
      </p>
      <div style={{display:'flex',gap:'0.75rem',justifyContent:'center',flexWrap:'wrap'}}>
        <button onClick={()=>setTab('revise')} style={{padding:'10px 28px',background:'#fff',color:'#059669',border:'none',borderRadius:12,fontWeight:800,cursor:'pointer',fontFamily:'inherit',fontSize:15}}>
          🔄 Revision Quiz →
        </button>
        {nextChap && (
          <Link href={`/learn/${classId}/${subSlug}/${nextChap.id}`}
            style={{padding:'10px 24px',background:'rgba(255,255,255,.2)',color:'#fff',borderRadius:12,textDecoration:'none',fontWeight:700,fontSize:14}}>
            Next Chapter →
          </Link>
        )}
      </div>
    </div>
  )}
</div>
)}

{/* ── FORMULAS TAB ─────────────────────────────────────────────── */}
{tab==='formulas' && (
<div style={{animation:'fadeUp .3s ease'}}>
  {chapter.formulas.length===0?(
    <div style={{textAlign:'center',padding:'4rem 1rem',color:'#9ca3af'}}>
      <div style={{fontSize:60}}>📐</div>
      <div style={{fontWeight:700,fontSize:16,marginTop:12,color:'#374151'}}>No formulas in this chapter</div>
      <button onClick={()=>qaAndSwitch(`List all important formulas for "${chapter.title}" Class ${classId} ${subject.name} with examples.`)}
        style={{...S.btn('primary'),marginTop:16}}>🤖 Ask AI for Formulas</button>
    </div>
  ):(
    <div style={{display:'flex',flexDirection:'column',gap:'0.875rem'}}>
      {chapter.formulas.map((f,i)=>{
        const isOpen = openFormula===f.name
        return (
          <div key={f.name} className="fcard">
            <div onClick={()=>setOpenForm(isOpen?null:f.name)} style={{padding:'1rem 1.25rem',display:'flex',alignItems:'center',gap:13,cursor:'pointer'}}>
              {/* index circle */}
              <div style={{width:34,height:34,borderRadius:10,background:theme.light,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:13,color:theme.primary,flexShrink:0,border:`1.5px solid ${theme.border}`}}>
                {i+1}
              </div>

              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:800,fontSize:15,color:'#111',marginBottom:4}}>{f.name}</div>
                {/* formula display */}
                <div style={{overflowX:'auto',padding:'4px 0'}}>
                  <FormulaDisplay formula={f.formula} />
                </div>
              </div>

              <div style={{display:'flex',gap:6,flexShrink:0,alignItems:'center'}}>
                <button onClick={e=>{e.stopPropagation();copyText(f.formula,f.name)}}
                  style={{padding:'5px 12px',background:copied===f.name?'#d1fae5':'#f3f4f6',color:copied===f.name?'#059669':'#374151',border:'none',borderRadius:8,fontSize:12,fontWeight:700,cursor:'pointer',fontFamily:'inherit',transition:'all .2s'}}>
                  {copied===f.name?'✓ Copied!':'📋 Copy'}
                </button>
                <span style={{fontSize:15,color:'#9ca3af',transform:isOpen?'rotate(180deg)':'none',transition:'transform .2s'}}>▼</span>
              </div>
            </div>

            {isOpen && (
              <div style={{padding:'0 1.25rem 1.25rem',borderTop:'1px solid #f3f4f6',animation:'fadeUp .2s ease'}}>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.875rem',marginTop:'0.875rem'}}>
                  {f.example && (
                    <div style={{background:'#f9fafb',borderRadius:11,padding:'0.875rem',border:'1px solid #f3f4f6'}}>
                      <div style={{fontSize:11,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:.5,marginBottom:6}}>Example</div>
                      <div style={{fontSize:13.5,color:'#374151',lineHeight:1.65}}>{f.example}</div>
                    </div>
                  )}
                  {f.note && (
                    <div style={{background:'#fef3c7',borderRadius:11,padding:'0.875rem',border:'1px solid #fde68a'}}>
                      <div style={{fontSize:11,fontWeight:700,color:'#92400e',textTransform:'uppercase',letterSpacing:.5,marginBottom:6}}>⚠️ Note</div>
                      <div style={{fontSize:13.5,color:'#78350f',lineHeight:1.65}}>{f.note}</div>
                    </div>
                  )}
                </div>
                <button onClick={()=>qaAndSwitch(`Explain formula "${f.formula}" for ${f.name} with 3 solved NCERT-style examples for Class ${classId} ${subject.name}.`)}
                  style={{...S.btn('outline'),marginTop:'0.875rem',fontSize:13}}>
                  🤖 More Examples
                </button>
              </div>
            )}
          </div>
        )
      })}

      {/* formula summary sheet button */}
      <div style={{...S.card,textAlign:'center',marginTop:'0.5rem'}}>
        <div style={{fontSize:13.5,color:'#6b7280',marginBottom:12}}>Want a quick reference sheet of all formulas?</div>
        <button onClick={()=>qaAndSwitch(`Create a concise formula sheet for "${chapter.title}" (Class ${classId} ${subject.name}) with all formulas and one-line notes.`)}
          style={S.btn('primary')}>
          🤖 Generate Formula Sheet
        </button>
      </div>
    </div>
  )}
</div>
)}

{/* ── EXPERIMENTS TAB ──────────────────────────────────────────── */}
{tab==='experiments' && (
<div style={{animation:'fadeUp .3s ease'}}>
  {chapter.experiments.length===0?(
    <div style={{textAlign:'center',padding:'4rem 1rem',color:'#9ca3af'}}>
      <div style={{fontSize:60}}>🔬</div>
      <div style={{fontWeight:700,fontSize:16,marginTop:12,color:'#374151'}}>No experiments in this chapter</div>
    </div>
  ):(
    <div style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
      {chapter.experiments.map((exp,i)=>(
        <div key={exp.title} className="expcard">
          {/* exp header */}
          <div style={{background:'linear-gradient(135deg,#065f46,#059669)',padding:'1rem 1.25rem',color:'#fff'}}>
            <div style={{display:'flex',alignItems:'flex-start',gap:13}}>
              <div style={{width:36,height:36,borderRadius:'50%',background:'rgba(255,255,255,.2)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14,flexShrink:0}}>
                {i+1}
              </div>
              <div>
                <div style={{fontWeight:800,fontSize:16,marginBottom:3}}>🔬 {exp.title}</div>
                <div style={{fontSize:13,opacity:.87}}>Aim: {exp.objective}</div>
              </div>
            </div>
          </div>

          <div style={{padding:'1.25rem'}}>
            {/* materials */}
            <div style={{marginBottom:'1rem'}}>
              <div style={{fontWeight:700,fontSize:14,marginBottom:8,display:'flex',alignItems:'center',gap:6}}>
                🧰 Materials Required
              </div>
              <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>
                {exp.materials.map(m=>(
                  <span key={m} style={{padding:'3px 11px',background:'#f3f4f6',borderRadius:20,fontSize:12.5,color:'#374151',border:'1px solid #e5e7eb'}}>{m}</span>
                ))}
              </div>
            </div>

            {/* steps */}
            <div style={{marginBottom:'1rem'}}>
              <div style={{fontWeight:700,fontSize:14,marginBottom:10,display:'flex',alignItems:'center',gap:6}}>
                📋 Procedure ({exp.steps.length} Steps)
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                {exp.steps.map((step,si)=>(
                  <div key={si} style={{display:'flex',gap:12,alignItems:'flex-start'}}>
                    <div style={{width:26,height:26,borderRadius:'50%',background:'#065f46',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:900,flexShrink:0,marginTop:1}}>
                      {si+1}
                    </div>
                    <div style={{fontSize:13.5,color:'#374151',lineHeight:1.6,paddingTop:3}}>{step}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* result */}
            <div style={{background:'#d1fae5',borderRadius:11,padding:'0.875rem 1rem',border:'1.5px solid #a7f3d0',marginBottom:exp.safetyNote?'0.875rem':0}}>
              <div style={{fontWeight:700,fontSize:13,color:'#065f46',marginBottom:5}}>✅ Expected Result</div>
              <div style={{fontSize:13.5,color:'#374151',lineHeight:1.6}}>{exp.result}</div>
            </div>

            {exp.safetyNote && (
              <div style={{background:'#fee2e2',borderRadius:11,padding:'0.875rem 1rem',border:'1.5px solid #fecaca'}}>
                <div style={{fontWeight:700,fontSize:13,color:'#991b1b',marginBottom:5}}>⚠️ Safety Note</div>
                <div style={{fontSize:13.5,color:'#374151',lineHeight:1.6}}>{exp.safetyNote}</div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )}
</div>
)}

{/* ── VIDEOS TAB ───────────────────────────────────────────────── */}
{tab==='videos' && (
<div style={{animation:'fadeUp .3s ease'}}>
  {chapter.videos.length===0?(
    <div style={{textAlign:'center',padding:'4rem 1rem',color:'#9ca3af'}}>
      <div style={{fontSize:60}}>🎬</div>
      <div style={{fontWeight:700,fontSize:16,marginTop:12,color:'#374151'}}>No videos curated yet</div>
      <a href={`https://www.youtube.com/results?search_query=class+${classId}+${subSlug}+${encodeURIComponent(chapter.title)}+NCERT+explained`}
        target="_blank" rel="noopener noreferrer"
        style={{display:'inline-block',marginTop:16,padding:'10px 24px',background:'#dc2626',color:'#fff',borderRadius:12,textDecoration:'none',fontWeight:700,fontSize:14}}>
        🎬 Search on YouTube →
      </a>
    </div>
  ):(
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'1rem'}}>
      {chapter.videos.map(v=>(
        <div key={v.url} style={{background:'#fff',borderRadius:14,border:'1.5px solid #e5e7eb',overflow:'hidden',boxShadow:'0 2px 8px rgba(0,0,0,.05)'}}>
          <div style={{position:'relative',paddingBottom:'56.25%',background:'#111'}}>
            <iframe
              src={v.url.includes('youtube.com/embed')? v.url : v.url.replace('watch?v=','embed/')}
              title={v.title} allowFullScreen loading="lazy"
              allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
              style={{position:'absolute',inset:0,width:'100%',height:'100%',border:'none'}}
            />
          </div>
          <div style={{padding:'0.875rem 1rem'}}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:5,lineHeight:1.4}}>{v.title}</div>
            <div style={{display:'flex',gap:10,fontSize:12,color:'#6b7280'}}>
              {v.duration && <span>⏱ {v.duration}</span>}
              {v.source   && <span>📺 {v.source}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
)}

{/* ── REVISE TAB ───────────────────────────────────────────────── */}
{tab==='revise' && (
<div style={{animation:'fadeUp .3s ease',display:'flex',flexDirection:'column',gap:'1.5rem'}}>

  {/* summary */}
  <div style={{...S.card,background:theme.gradient,color:'#fff',borderColor:'transparent'}}>
    <div style={{fontWeight:800,fontSize:16,marginBottom:'0.875rem',display:'flex',alignItems:'center',gap:8}}>
      <span style={{fontSize:22}}>📋</span> Chapter Summary
    </div>
    <div style={{display:'flex',flexDirection:'column',gap:8}}>
      {chapter.topics.slice(0,6).map((t,i)=>(
        <div key={i} style={{display:'flex',gap:11,padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,.12)'}}>
          <span style={{width:22,height:22,background:'rgba(255,255,255,.2)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:900,flexShrink:0,marginTop:2}}>{i+1}</span>
          <div>
            <div style={{fontWeight:700,fontSize:13.5}}>{t.title}</div>
            <div style={{fontSize:12.5,opacity:.8,lineHeight:1.5,marginTop:2}}>{t.content.slice(0,100)}…</div>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* flip cards */}
  {chapter.keyTerms.length>0 && (
    <div>
      <div style={{fontWeight:800,fontSize:16,marginBottom:'0.875rem',display:'flex',alignItems:'center',gap:8}}>
        <span style={{fontSize:22}}>🃏</span> Flash Cards
        <span style={{fontSize:12,fontWeight:400,color:'#6b7280'}}>(click to flip)</span>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(175px,1fr))',gap:'0.875rem'}}>
        {chapter.keyTerms.slice(0,9).map(term=>{
          const related = chapter.topics.find(t=>t.content.toLowerCase().includes(term.toLowerCase()))
          return (
            <div key={term} className={`fcrd${flipped===term?' flip':''}`}
              onClick={()=>setFlipped(flipped===term?null:term)}>
              <div className="fcrd-inner">
                <div className="fcrd-f" style={{background:theme.light,border:`2px solid ${theme.border}`,color:theme.primary}}>
                  <div style={{fontWeight:900,fontSize:16}}>{term}</div>
                  <div style={{fontSize:10,marginTop:8,opacity:.65,background:'rgba(0,0,0,.07)',padding:'2px 8px',borderRadius:20}}>tap to reveal</div>
                </div>
                <div className="fcrd-b" style={{background:theme.primary,color:'#fff'}}>
                  <div style={{fontSize:12.5,lineHeight:1.55}}>
                    {related?.content.slice(0,90)??`Key concept in ${chapter.title}`}…
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )}

  {/* checkpoints */}
  {checkpts.length>0 && (
    <div>
      <div style={{fontWeight:800,fontSize:16,marginBottom:'0.875rem',display:'flex',alignItems:'center',gap:8}}>
        <span style={{fontSize:22}}>✅</span> Knowledge Checkpoints
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
        {checkpts.map(cp=>{
          const picked = cpAnswers[cp.id]??null
          return (
            <div key={cp.id} style={S.card}>
              <div style={{fontWeight:700,fontSize:15,marginBottom:'0.875rem',lineHeight:1.45,color:'#111'}}>{cp.q}</div>
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                {cp.opts.map((opt,oi)=>{
                  let bg='#fff',border='2px solid #e5e7eb',color='#374151'
                  if(picked!==null){
                    if(oi===cp.correct){bg='#dcfce7';border='2px solid #22c55e';color='#166534'}
                    else if(oi===picked){bg='#fee2e2';border='2px solid #ef4444';color='#dc2626'}
                  }
                  return (
                    <button key={oi} disabled={picked!==null}
                      className="optbtn" style={{background:bg,border,color,fontWeight:picked!==null&&(oi===cp.correct||oi===picked)?700:400}}>
                      <strong style={{marginRight:10}}>{String.fromCharCode(65+oi)}.</strong>{opt}
                    </button>
                  )
                })}
              </div>
              {picked!==null && (
                <div style={{marginTop:'0.875rem',padding:'11px 15px',borderRadius:11,fontSize:13.5,lineHeight:1.6,
                  background:picked===cp.correct?'#dcfce7':'#fef3c7',
                  border:`1.5px solid ${picked===cp.correct?'#86efac':'#fde68a'}`,
                  color:picked===cp.correct?'#166534':'#92400e'}}>
                  <strong>{picked===cp.correct?'✅ Correct! ':'💡 '}</strong>{cp.explain}
                </div>
              )}
              {picked===null && (
                <div style={{marginTop:8}}>
                  <button onClick={()=>setCpAns(p=>({...p,[cp.id]:cp.correct}))}
                    style={{fontSize:12,color:'#6b7280',background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',textDecoration:'underline'}}>
                    Show Answer
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )}

  {/* quick facts revisit */}
  {chapter.quickFacts.length>0 && (
    <div style={S.card}>
      <div style={{fontWeight:800,fontSize:15,marginBottom:'0.875rem',display:'flex',alignItems:'center',gap:8}}>
        <span style={{fontSize:20}}>💡</span> Quick Facts to Remember
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        {chapter.quickFacts.map((f,i)=>(
          <div key={i} style={{display:'flex',gap:10,padding:'9px 13px',background:'#fef3c7',borderRadius:10,border:'1px solid #fde68a',fontSize:13.5,color:'#374151',lineHeight:1.5}}>
            <span style={{fontWeight:900,color:'#d97706',flexShrink:0}}>{i+1}.</span>{f}
          </div>
        ))}
      </div>
    </div>
  )}
</div>
)}

{/* ── ASK AI TAB ───────────────────────────────────────────────── */}
{tab==='ask' && (
<div style={{animation:'fadeUp .3s ease'}}>
  {/* chips */}
  <div style={{...S.card,marginBottom:'1rem'}}>
    <div style={{fontSize:12.5,fontWeight:700,color:'#6b7280',marginBottom:9}}>Quick questions about this chapter:</div>
    <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>
      {[
        `Summarise "${chapter.title}" in 5 key points`,
        `What are the most important exam topics in "${chapter.title}"?`,
        `Common mistakes in "${chapter.title}" and how to avoid them`,
        chapter.formulas.length>0 ? `When to use which formula in "${chapter.title}"?` : `Give 3 examples from "${chapter.title}"`,
        `Create a mind map for "${chapter.title}"`,
        `Exam-style questions for "${chapter.title}"`,
      ].map(q=>(
        <button key={q} className="chip" onClick={()=>{setAiQ(q);ask(q)}}>{q}</button>
      ))}
    </div>
  </div>

  {/* input */}
  <div style={{...S.card,marginBottom:'1rem'}}>
    <textarea ref={areaRef} value={aiQ} onChange={e=>setAiQ(e.target.value)}
      onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();ask(aiQ)}}}
      placeholder={`Ask anything about ${chapter.title}... (Enter to send)`}
      rows={3}
      style={{width:'100%',border:'2px solid #e5e7eb',borderRadius:11,padding:'10px 13px',fontSize:14,resize:'none',fontFamily:'inherit',outline:'none',boxSizing:'border-box',lineHeight:1.6,transition:'border-color .2s'}}
      onFocus={e=>(e.target.style.borderColor=theme.primary)}
      onBlur={e=>(e.target.style.borderColor='#e5e7eb')}
    />
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
      <span style={{fontSize:12,color:'#9ca3af'}}>⏎ Enter to send · Shift+Enter for new line</span>
      <button onClick={()=>ask(aiQ)} disabled={!aiQ.trim()||aiLoading}
        style={{...S.btn('primary'),padding:'9px 24px',opacity:!aiQ.trim()||aiLoading?.6:1,fontSize:14}}>
        {aiLoading?'⏳ Thinking…':'🤖 Ask AI →'}
      </button>
    </div>
  </div>

  {/* answer */}
  {(aiLoading||aiA) && (
    <div style={{...S.card,border:`2px solid ${theme.border}`,animation:'fadeUp .3s ease'}}>
      <div style={{display:'flex',alignItems:'center',gap:11,marginBottom:'0.875rem',paddingBottom:'0.75rem',borderBottom:'1px solid #f3f4f6'}}>
        <div style={{width:36,height:36,borderRadius:'50%',background:theme.light,border:`1.5px solid ${theme.border}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>🤖</div>
        <div>
          <div style={{fontWeight:800,color:'#111',fontSize:15}}>AI Teacher</div>
          <div style={{fontSize:12,color:'#9ca3af'}}>Class {classId} · {subject.name}</div>
        </div>
        {aiLoading && <div style={{marginLeft:'auto',fontSize:12,color:theme.primary,animation:'pulse2 1s infinite'}}>Thinking…</div>}
      </div>

      {aiLoading?(
        <div style={{display:'flex',gap:5,padding:'0.5rem 0'}}>
          {[0,1,2].map(i=>(
            <span key={i} style={{width:9,height:9,background:theme.primary,borderRadius:'50%',display:'inline-block',animation:`pulse2 .8s ${i*.2}s infinite`}}/>
          ))}
        </div>
      ):(
        <>
          <div style={{fontSize:14.5,lineHeight:1.85,color:'#374151',whiteSpace:'pre-wrap'}}>{aiA}</div>
          <div style={{display:'flex',gap:8,marginTop:'1rem',flexWrap:'wrap'}}>
            <button onClick={()=>copyText(aiA,'ai-answer')}
              style={{...S.btn('ghost'),fontSize:12,padding:'6px 14px'}}>
              {copied==='ai-answer'?'✓ Copied!':'📋 Copy'}
            </button>
            <button onClick={()=>ask(`${aiQ} — please explain in even simpler terms with a real-life Indian example`)}
              style={{...S.btn('ghost'),fontSize:12,padding:'6px 14px'}}>
              💡 Simpler
            </button>
            <button onClick={()=>ask(`Give 3 practice questions on this topic with full solutions`)}
              style={{...S.btn('ghost'),fontSize:12,padding:'6px 14px'}}>
              ✏️ Practice Qs
            </button>
          </div>
        </>
      )}
    </div>
  )}
</div>
)}

<div style={{textAlign:'center',marginTop:'1.5rem',marginBottom:'1rem'}}>
  <button
    onClick={() => window.print()}
    style={{
      padding:'9px 22px',
      background:'#f0f4ff',
      color:'#1a3a6b',
      border:'1.5px solid #c7d2fe',
      borderRadius:11,
      fontWeight:700,
      cursor:'pointer',
      fontFamily:'inherit',
      fontSize:13,
      display:'inline-flex',
      alignItems:'center',
      gap:6,
    }}
  >
    🖨️ Print / Save as PDF
  </button>
</div>

{/* ── CHAPTER NAV ─────────────────────────────────────────────── */}
<div style={{display:'flex',justifyContent:'space-between',gap:'0.75rem',marginTop:'2.5rem',paddingTop:'1.5rem',borderTop:'2px solid #e5e7eb'}}>
  {prevChap?(
    <Link href={`/learn/${classId}/${subSlug}/${prevChap.id}`}
      style={{display:'flex',alignItems:'center',gap:10,padding:'12px 20px',background:'#fff',border:'2px solid #e5e7eb',borderRadius:13,textDecoration:'none',color:'#374151',fontWeight:700,fontSize:14,maxWidth:'45%',flex:1,transition:'border-color .2s'}}
      onMouseEnter={e=>(e.currentTarget.style.borderColor=theme.primary)}
      onMouseLeave={e=>(e.currentTarget.style.borderColor='#e5e7eb')}>
      <span style={{fontSize:20}}>←</span>
      <div style={{minWidth:0}}>
        <div style={{fontSize:10.5,color:'#9ca3af',marginBottom:2}}>Previous Chapter</div>
        <div style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>Ch.{prevChap.chapterNo}: {prevChap.title}</div>
      </div>
    </Link>
  ):<div/>}

  {nextChap?(
    <Link href={`/learn/${classId}/${subSlug}/${nextChap.id}`}
      style={{display:'flex',alignItems:'center',justifyContent:'flex-end',gap:10,padding:'12px 20px',background:theme.primary,color:'#fff',borderRadius:13,textDecoration:'none',fontWeight:700,fontSize:14,maxWidth:'45%',flex:1,boxShadow:`0 4px 16px ${theme.primary}44`}}>
      <div style={{minWidth:0,textAlign:'right'}}>
        <div style={{fontSize:10.5,opacity:.8,marginBottom:2}}>Next Chapter</div>
        <div style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>Ch.{nextChap.chapterNo}: {nextChap.title}</div>
      </div>
      <span style={{fontSize:20}}>→</span>
    </Link>
  ):(
    <Link href={`/class/${classId}/${subSlug}`}
      style={{padding:'12px 24px',background:'#d1fae5',color:'#065f46',borderRadius:13,textDecoration:'none',fontWeight:800,fontSize:14,border:'2px solid #a7f3d0'}}>
      ✅ Subject Complete!
    </Link>
  )}
</div>
</div>
</div>
  )
}
