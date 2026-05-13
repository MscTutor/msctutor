'use client'
// app/ai-teacher/page.tsx — Adaptive AI Teacher with student memory

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import {
  getOrCreateProfile, saveProfile, updateTopicMastery,
  startSession, addMessageToSession, saveSessionToProfile,
  detectWeakTopics, getRevisionRecommendations, getLearningInsights,
  type LearnerProfile, type ConversationMemory,
} from '@/lib/adaptive/learner-profile'
import type { TutorMessage, AdaptiveTutorResponse } from '@/lib/adaptive/adaptive-tutor'

// ── CONSTANTS ────────────────────────────────────────────
const SUBJECTS = ['Mathematics','Physics','Chemistry','Biology','English','Hindi','Social Science','Accountancy','Economics','Computer Science']
const CLASSES  = ['6','7','8','9','10','11','12']
const MODES    = [
  { id:'explain', icon:'📖', label:'Explain Mode',   desc:'I explain concepts' },
  { id:'quiz',    icon:'❓', label:'Quiz Mode',       desc:'Test your knowledge' },
  { id:'practice',icon:'✏️', label:'Practice Mode',  desc:'Solve problems together' },
  { id:'revision',icon:'🔄', label:'Revision Mode',  desc:'Revise weak topics' },
]

// Demo user for unauthenticated session
function getDemoUserId() {
  if (typeof window === 'undefined') return 'demo_user'
  let id = localStorage.getItem('msc_demo_uid')
  if (!id) { id = 'demo_' + Math.random().toString(36).slice(2,10); localStorage.setItem('msc_demo_uid', id) }
  return id
}

export default function AITeacherPage() {
  const [profile,       setProfile]       = useState<LearnerProfile | null>(null)
  const [session,       setSession]       = useState<ConversationMemory | null>(null)
  const [messages,      setMessages]      = useState<TutorMessage[]>([])
  const [input,         setInput]         = useState('')
  const [loading,       setLoading]       = useState(false)
  const [started,       setStarted]       = useState(false)
  const [subject,       setSubject]       = useState('Mathematics')
  const [classLevel,    setClassLevel]    = useState('10')
  const [mode,          setMode]          = useState('explain')
  const [activeTab,     setActiveTab]     = useState<'chat'|'progress'|'revision'|'plan'>('chat')
  const [quizQ,         setQuizQ]         = useState<{question:string;options:string[];answer:string;explanation:string;hint:string} | null>(null)
  const [quizPicked,    setQuizPicked]    = useState<string | null>(null)
  const [quizLoading,   setQuizLoading]   = useState(false)
  const [topicInput,    setTopicInput]    = useState('')
  const [insights,      setInsights]      = useState<ReturnType<typeof getLearningInsights> | null>(null)
  const [studyPlan,     setStudyPlan]     = useState<{weeklyPlan:{day:string;topic:string;activity:string;duration:number}[];focusAreas:string[];dailyGoal:string} | null>(null)
  const [planLoading,   setPlanLoading]   = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLTextAreaElement>(null)

  // Load profile on mount
  useEffect(() => {
    const uid  = getDemoUserId()
    const prof = getOrCreateProfile(uid, 'Student', classLevel)
    setProfile(prof)
    setInsights(getLearningInsights(prof))
  }, [classLevel])

  // Scroll to bottom
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  // Start session
  function startLearning() {
    if (!profile) return
    const sess = startSession(subject, topicInput || subject, classLevel)
    setSession(sess)
    setStarted(true)
    setMessages([])

    // Greeting based on profile
    const weakTopics = detectWeakTopics(profile, subject)
    const revisions  = getRevisionRecommendations(profile)
    const isNew      = profile.totalQuestions === 0

    let greeting = ''
    if (isNew) {
      greeting = `Namaste ${profile.name}! 👋 I'm your AI ${subject} teacher for Class ${classLevel}.\n\nLet's start your learning journey! What topic would you like to explore today? You can also just ask me any question — I'm here to help! 😊`
    } else if (mode === 'revision' && revisions.length > 0) {
      greeting = `Welcome back, ${profile.name}! 🌟\n\nBased on your previous sessions, let's revise:\n${revisions.slice(0,3).map(t => `• ${t.topicName} (${t.subject})`).join('\n')}\n\nWhich topic shall we start with?`
    } else if (weakTopics.length > 0) {
      greeting = `Hello ${profile.name}! 👋 Great to see you back!\n\nI noticed you found ${weakTopics[0].topicName} a bit challenging last time. Want to work on that today, or explore something new in ${subject}?`
    } else {
      const subPerf = profile.subjectPerformance[subject]
      const score   = subPerf?.averageScore ?? 0
      greeting = `Hello ${profile.name}! 🎯\n\n${score > 70 ? `Great progress in ${subject}! You're at ${Math.round(score)}% accuracy. ` : ''}What shall we learn today in ${subject}? Ask me anything!`
    }

    const firstMsg: TutorMessage = {
      role: 'teacher', text: greeting,
      timestamp: new Date().toISOString(),
      metadata: { difficulty:'medium', topicsCovered:[], wasConfused:false, responseType:'explanation', followupQuestions:[], keyConceptsUsed:[] }
    }
    setMessages([firstMsg])
  }

  // Send message
  const sendMessage = useCallback(async (text?: string) => {
    const q = (text ?? input).trim()
    if (!q || loading || !profile) return
    setInput('')

    const userMsg: TutorMessage = { role:'student', text:q, timestamp:new Date().toISOString() }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const res = await fetch('/api/learning/chat', {
        method:  'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({
          message:     q,
          profile,
          subject,
          classLevel,
          chapterName: topicInput || subject,
          topicName:   topicInput || undefined,
          language:    profile.language,
          history:     messages.slice(-12),
        }),
      })

      if (!res.ok) throw new Error('API error')
      const data: AdaptiveTutorResponse = await res.json()

      const teacherMsg: TutorMessage = {
        role: 'teacher', text: data.text,
        timestamp: new Date().toISOString(),
        metadata: {
          difficulty:        data.difficultyUsed ?? 'medium',
          topicsCovered:     data.topicsCovered ?? [],
          wasConfused:       q.toLowerCase().includes('don\'t understand') || q.toLowerCase().includes('confused'),
          responseType:      'explanation',
          followupQuestions: data.followupQuestions ?? [],
          keyConceptsUsed:   [],
        }
      }
      setMessages(prev => [...prev, teacherMsg])

      // Update profile with interaction
      const isCorrect = !q.toLowerCase().includes('wrong') && !q.toLowerCase().includes('mistake')
      const updatedProfile = updateTopicMastery(profile, {
        topicId:     topicInput || subject,
        topicName:   topicInput || subject,
        subject,
        classLevel,
        chapterId:   topicInput || subject,
        chapterName: topicInput || subject,
        correct:     isCorrect,
        timeSpentMin: 1,
      })
      setProfile(updatedProfile)
      saveProfile(updatedProfile)
      setInsights(getLearningInsights(updatedProfile))

      // Update session
      if (session) {
        let s = addMessageToSession(session, 'student', q)
        s = addMessageToSession(s, 'teacher', data.text)
        setSession(s)
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'teacher',
        text: '⚠️ Connection issue. Please check your internet and try again!',
        timestamp: new Date().toISOString(),
      }])
    }
    setLoading(false)
    inputRef.current?.focus()
  }, [input, loading, profile, subject, classLevel, topicInput, messages, session])

  // Generate quiz question
  async function generateQuiz() {
    if (!profile || !topicInput) { alert('Please enter a topic name first!'); return }
    setQuizLoading(true); setQuizQ(null); setQuizPicked(null)
    try {
      const res = await fetch('/api/learning/quiz', {
        method:  'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ profile, subject, classLevel, topicName:topicInput, language:profile.language }),
      })
      const data = await res.json()
      setQuizQ(data)
    } catch { alert('Quiz generation failed. Try again!') }
    setQuizLoading(false)
  }

  // Answer quiz
  function answerQuiz(opt: string) {
    if (!quizQ || quizPicked) return
    setQuizPicked(opt)
    const correct = opt === quizQ.answer
    if (profile && topicInput) {
      const up = updateTopicMastery(profile, {
        topicId:topicInput, topicName:topicInput, subject, classLevel,
        chapterId:topicInput, chapterName:topicInput, correct, timeSpentMin:2,
        score: correct ? 100 : 0,
      })
      setProfile(up); saveProfile(up); setInsights(getLearningInsights(up))
    }
  }

  // Get study plan
  async function getStudyPlan() {
    if (!profile) return
    setPlanLoading(true)
    try {
      const res = await fetch('/api/learning/study-plan', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ profile, language:profile.language }),
      })
      const data = await res.json()
      setStudyPlan(data)
    } catch {}
    setPlanLoading(false)
  }

  // Quick topic chips
  const QUICK_TOPICS: Record<string, string[]> = {
    Mathematics: ['Quadratic Equations','Trigonometry','Probability','Circles','Statistics'],
    Physics:     ['Newton\'s Laws','Electricity','Light','Gravitation','Sound'],
    Chemistry:   ['Atoms','Chemical Reactions','Acids & Bases','Carbon','Metals'],
    Biology:     ['Cell','Photosynthesis','Genetics','Digestive System','Nervous System'],
    default:     ['Introduction','Key Concepts','Important Formulas','Examples','Practice'],
  }
  const quickTopics = QUICK_TOPICS[subject] ?? QUICK_TOPICS.default

  const weakTopics  = profile ? detectWeakTopics(profile, subject) : []
  const revisions   = profile ? getRevisionRecommendations(profile) : []
  const accuracy    = profile?.subjectPerformance[subject]?.averageScore ?? 0
  const totalQ      = profile?.totalQuestions ?? 0

  // ── SETUP SCREEN ──────────────────────────────────────
  if (!started) return (
    <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#0f172a,#1e3a5f)',display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem 1rem'}}>
      <style>{`.card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(8px);border-radius:16px;padding:1.25rem}.btn-sel{border:1.5px solid rgba(255,255,255,.2);border-radius:12px;padding:10px 14px;cursor:pointer;font-family:inherit;transition:all .2s;text-align:left}.btn-sel:hover{background:rgba(255,255,255,.12)}.btn-sel.active{background:rgba(99,179,237,.2);border-color:#63b3ed}`}</style>
      <div style={{width:'100%',maxWidth:640,color:'#fff'}}>
        <div style={{textAlign:'center',marginBottom:'2rem'}}>
          <div style={{fontSize:60,marginBottom:12}}>👩‍🏫</div>
          <h1 style={{fontSize:28,fontWeight:900,margin:'0 0 8px'}}>AI Teacher</h1>
          <p style={{color:'rgba(255,255,255,.7)',fontSize:15}}>Adaptive learning — remembers your progress, teaches at your level</p>
          {profile && totalQ > 0 && (
            <div style={{display:'inline-flex',gap:16,background:'rgba(255,255,255,.08)',borderRadius:20,padding:'8px 20px',marginTop:12,fontSize:13}}>
              <span>📊 {totalQ} questions answered</span>
              <span>🎯 {Math.round(accuracy)}% accuracy</span>
              <span>🔥 {profile.streakDays} day streak</span>
            </div>
          )}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem',marginBottom:'1.25rem'}}>
          <div className="card">
            <div style={{fontSize:12,fontWeight:700,color:'rgba(255,255,255,.5)',textTransform:'uppercase',letterSpacing:.8,marginBottom:10}}>Subject</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
              {SUBJECTS.slice(0,6).map(s => (
                <button key={s} onClick={()=>setSubject(s)} className={`btn-sel${subject===s?' active':''}`} style={{fontSize:12,fontWeight:subject===s?700:500,color:subject===s?'#63b3ed':'rgba(255,255,255,.8)'}}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <div style={{fontSize:12,fontWeight:700,color:'rgba(255,255,255,.5)',textTransform:'uppercase',letterSpacing:.8,marginBottom:10}}>Class</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:6}}>
              {CLASSES.map(c => (
                <button key={c} onClick={()=>setClassLevel(c)} className={`btn-sel${classLevel===c?' active':''}`} style={{fontSize:14,fontWeight:700,textAlign:'center',color:classLevel===c?'#63b3ed':'rgba(255,255,255,.8)',padding:'8px 0'}}>
                  {c}
                </button>
              ))}
            </div>

            <div style={{marginTop:10}}>
              <div style={{fontSize:12,fontWeight:700,color:'rgba(255,255,255,.5)',marginBottom:6}}>Mode</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:4}}>
                {MODES.map(m => (
                  <button key={m.id} onClick={()=>setMode(m.id)} className={`btn-sel${mode===m.id?' active':''}`} style={{fontSize:12,color:mode===m.id?'#63b3ed':'rgba(255,255,255,.7)',padding:'6px 8px'}}>
                    {m.icon} {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{marginBottom:'1.25rem'}}>
          <div style={{fontSize:12,fontWeight:700,color:'rgba(255,255,255,.5)',textTransform:'uppercase',letterSpacing:.8,marginBottom:8}}>Topic (optional)</div>
          <input value={topicInput} onChange={e=>setTopicInput(e.target.value)}
            placeholder={`e.g. Newton's Laws, Quadratic Equations, Photosynthesis...`}
            style={{width:'100%',background:'rgba(255,255,255,.08)',border:'1px solid rgba(255,255,255,.15)',borderRadius:10,padding:'10px 14px',color:'#fff',fontSize:14,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}} />
          <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:8}}>
            {quickTopics.map(t => (
              <button key={t} onClick={()=>setTopicInput(t)}
                style={{fontSize:11,padding:'3px 10px',background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.15)',borderRadius:20,color:'rgba(255,255,255,.7)',cursor:'pointer',fontFamily:'inherit'}}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Revision & weak topics hints */}
        {profile && weakTopics.length > 0 && (
          <div className="card" style={{marginBottom:'1.25rem',borderColor:'rgba(251,191,36,.3)'}}>
            <div style={{fontSize:12,fontWeight:700,color:'#fbbf24',marginBottom:8}}>⚠️ Topics that need practice</div>
            <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
              {weakTopics.slice(0,4).map(t => (
                <button key={t.topicId} onClick={()=>{setTopicInput(t.topicName);setMode('revision')}}
                  style={{fontSize:12,padding:'4px 12px',background:'rgba(251,191,36,.1)',border:'1px solid rgba(251,191,36,.3)',borderRadius:20,color:'#fbbf24',cursor:'pointer',fontFamily:'inherit'}}>
                  {t.topicName} ({Math.round(t.averageScore)}%)
                </button>
              ))}
            </div>
          </div>
        )}

        <button onClick={startLearning}
          style={{width:'100%',padding:'16px',background:'linear-gradient(135deg,#3b82f6,#2563eb)',color:'#fff',border:'none',borderRadius:14,fontSize:17,fontWeight:800,cursor:'pointer',fontFamily:'inherit',boxShadow:'0 4px 20px rgba(59,130,246,.4)'}}>
          {mode==='revision' && revisions.length>0 ? '🔄 Start Revision Session' : '🚀 Start Learning Now'}
        </button>
        <p style={{textAlign:'center',fontSize:12,color:'rgba(255,255,255,.4)',marginTop:8}}>Your progress is saved automatically · Free forever</p>
      </div>
    </div>
  )

  // ── LEARNING SCREEN ────────────────────────────────────
  return (
    <div style={{display:'flex',flexDirection:'column',height:'100vh',background:'#f0f4f8'}}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .msg{animation:fadeUp .25s ease}
        .tab-btn{padding:8px 16px;border:none;background:transparent;cursor:pointer;font-family:inherit;font-size:13px;font-weight:600;color:#6b7280;border-bottom:2px solid transparent;transition:all .15s}
        .tab-btn.on{color:#2563eb;border-bottom-color:#2563eb}
        .quick-chip{padding:5px 12px;background:#fff;border:1px solid #e5e7eb;border-radius:20px;font-size:12px;cursor:pointer;font-family:inherit;color:#374151;transition:all .15s}
        .quick-chip:hover{background:#e8eef8;border-color:#2563eb;color:#2563eb}
        .opt-btn{width:100%;text-align:left;padding:10px 14px;border:1.5px solid #e5e7eb;border-radius:10px;cursor:pointer;font-family:inherit;font-size:14px;transition:all .15s;background:#fff}
        .opt-btn:hover{border-color:#2563eb;background:#eff6ff}
      `}</style>

      {/* ── HEADER ── */}
      <div style={{background:'linear-gradient(135deg,#1e3a6b,#2563eb)',color:'#fff',padding:'0.75rem 1rem',display:'flex',alignItems:'center',gap:10}}>
        <button onClick={()=>setStarted(false)} style={{background:'rgba(255,255,255,.15)',border:'none',color:'#fff',borderRadius:8,padding:'5px 10px',cursor:'pointer',fontSize:13}}>←</button>
        <div style={{width:36,height:36,borderRadius:'50%',background:'#f59e0b',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>👩‍🏫</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontWeight:800,fontSize:14}}>AI {subject} Teacher · Class {classLevel}</div>
          <div style={{fontSize:11,opacity:.75}}>
            {mode==='quiz'?'❓ Quiz Mode': mode==='revision'?'🔄 Revision Mode': mode==='practice'?'✏️ Practice Mode':'📖 Explain Mode'}
            {topicInput && ` · ${topicInput}`}
          </div>
        </div>
        <div style={{display:'flex',gap:4}}>
          {profile && (
            <div style={{background:'rgba(255,255,255,.15)',borderRadius:10,padding:'4px 10px',fontSize:12,fontWeight:700}}>
              🎯 {Math.round(profile.subjectPerformance[subject]?.averageScore ?? 0)}%
            </div>
          )}
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{background:'#fff',borderBottom:'1px solid #e5e7eb',display:'flex',padding:'0 1rem',overflowX:'auto'}}>
        <button className={`tab-btn${activeTab==='chat'?' on':''}`}       onClick={()=>setActiveTab('chat')}>💬 Chat</button>
        <button className={`tab-btn${activeTab==='progress'?' on':''}`}   onClick={()=>setActiveTab('progress')}>📊 Progress</button>
        <button className={`tab-btn${activeTab==='revision'?' on':''}`}   onClick={()=>setActiveTab('revision')}>🔄 Revision{revisions.length>0&&<span style={{marginLeft:4,background:'#ef4444',color:'#fff',borderRadius:10,padding:'1px 6px',fontSize:10}}>{revisions.length}</span>}</button>
        <button className={`tab-btn${activeTab==='plan'?' on':''}`}        onClick={()=>{setActiveTab('plan');if(!studyPlan&&profile)getStudyPlan()}}>📅 Study Plan</button>
      </div>

      {/* ── CHAT TAB ── */}
      {activeTab === 'chat' && (
        <>
          {/* Messages */}
          <div style={{flex:1,overflowY:'auto',padding:'1rem',display:'flex',flexDirection:'column',gap:'0.75rem'}}>
            {messages.map((msg, i) => (
              <div key={i} className="msg" style={{display:'flex',flexDirection:'column',alignItems:msg.role==='student'?'flex-end':'flex-start'}}>
                <div style={{display:'flex',alignItems:'flex-end',gap:8,flexDirection:msg.role==='student'?'row-reverse':'row'}}>
                  {msg.role==='teacher' && (
                    <div style={{width:30,height:30,borderRadius:'50%',background:'#f59e0b',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,flexShrink:0}}>👩‍🏫</div>
                  )}
                  <div style={{
                    maxWidth:'80%',padding:'10px 14px',
                    borderRadius:msg.role==='student'?'16px 16px 4px 16px':'16px 16px 16px 4px',
                    background:msg.role==='student'?'#2563eb':'#fff',
                    color:msg.role==='student'?'#fff':'#111',
                    fontSize:14,lineHeight:1.7,
                    boxShadow:'0 1px 4px rgba(0,0,0,.08)',
                    border:msg.role==='teacher'?'1px solid #e5e7eb':'none',
                    whiteSpace:'pre-wrap',wordBreak:'break-word',
                  }}>
                    {msg.text}
                  </div>
                </div>

                {/* Follow-up questions */}
                {msg.role==='teacher' && msg.metadata?.followupQuestions && msg.metadata.followupQuestions.length>0 && i===messages.length-1 && (
                  <div style={{marginTop:6,paddingLeft:38,display:'flex',gap:5,flexWrap:'wrap'}}>
                    {msg.metadata.followupQuestions.slice(0,3).map(q => (
                      <button key={q} onClick={()=>sendMessage(q)} className="quick-chip"
                        style={{fontSize:11,padding:'3px 10px',background:'#eff6ff',borderColor:'#bfdbfe',color:'#2563eb'}}>
                        {q.slice(0,40)}...
                      </button>
                    ))}
                  </div>
                )}
                <div style={{fontSize:10,color:'#9ca3af',marginTop:2,paddingInline:msg.role==='teacher'?38:0}}>
                  {new Date(msg.timestamp).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{display:'flex',alignItems:'flex-end',gap:8}}>
                <div style={{width:30,height:30,borderRadius:'50%',background:'#f59e0b',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>👩‍🏫</div>
                <div style={{background:'#fff',padding:'10px 14px',borderRadius:'16px 16px 16px 4px',border:'1px solid #e5e7eb',display:'flex',gap:4,alignItems:'center'}}>
                  {[0,1,2].map(i=><span key={i} style={{width:7,height:7,background:'#2563eb',borderRadius:'50%',display:'inline-block',animation:`spin .8s ${i*.2}s infinite`}} />)}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quiz mode */}
          {mode==='quiz' && (
            <div style={{padding:'0 1rem',marginBottom:'0.5rem'}}>
              {!quizQ ? (
                <button onClick={generateQuiz} disabled={quizLoading}
                  style={{width:'100%',padding:'10px',background:quizLoading?'#9ca3af':'#2563eb',color:'#fff',border:'none',borderRadius:10,fontWeight:700,cursor:quizLoading?'default':'pointer',fontSize:14,fontFamily:'inherit'}}>
                  {quizLoading?'⏳ Generating question...':'❓ Generate Quiz Question'}
                </button>
              ) : (
                <div style={{background:'#fff',borderRadius:14,border:'1px solid #e5e7eb',padding:'1rem',marginBottom:'0.5rem'}}>
                  <div style={{fontSize:14,fontWeight:700,marginBottom:10,lineHeight:1.5}}>{quizQ.question}</div>
                  {!quizPicked && quizQ.hint && (
                    <div style={{fontSize:12,color:'#6b7280',marginBottom:8,fontStyle:'italic'}}>💡 Hint: {quizQ.hint}</div>
                  )}
                  <div style={{display:'flex',flexDirection:'column',gap:6}}>
                    {quizQ.options.map(opt => {
                      let bg='#fff',border='1.5px solid #e5e7eb',color='#374151'
                      if (quizPicked) {
                        if (opt===quizQ.answer)       { bg='#dcfce7';border='2px solid #22c55e';color='#166534' }
                        else if (opt===quizPicked)    { bg='#fee2e2';border='2px solid #ef4444';color='#dc2626' }
                      }
                      return (
                        <button key={opt} onClick={()=>answerQuiz(opt)} disabled={!!quizPicked} className="opt-btn"
                          style={{background:bg,borderColor:border,color,fontWeight:opt===quizPicked||opt===quizQ.answer?700:400}}>
                          {opt} {quizPicked&&opt===quizQ.answer?'✓':''}
                        </button>
                      )
                    })}
                  </div>
                  {quizPicked && (
                    <div style={{marginTop:10,background:quizPicked===quizQ.answer?'#dcfce7':'#fef3c7',borderRadius:10,padding:'10px 12px',fontSize:13}}>
                      <strong>{quizPicked===quizQ.answer?'✅ Correct!':'❌ Not quite.'}</strong> {quizQ.explanation}
                      <button onClick={()=>{setQuizQ(null);setQuizPicked(null)}}
                        style={{marginTop:8,width:'100%',padding:'8px',background:'#2563eb',color:'#fff',border:'none',borderRadius:8,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>
                        Next Question →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Quick topics */}
          <div style={{padding:'6px 10px',background:'#fff',borderTop:'1px solid #f3f4f6',display:'flex',gap:5,overflowX:'auto',flexShrink:0}}>
            {quickTopics.map(t => (
              <button key={t} onClick={()=>sendMessage(`Explain ${t}`)} className="quick-chip">{t}</button>
            ))}
          </div>

          {/* Input */}
          <div style={{padding:'10px 12px',background:'#fff',borderTop:'1px solid #e5e7eb',display:'flex',gap:8,alignItems:'flex-end',flexShrink:0}}>
            <textarea ref={inputRef} value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMessage()}}}
              placeholder={`Ask your ${subject} teacher anything...`} rows={1}
              style={{flex:1,padding:'10px 14px',border:'1.5px solid #e5e7eb',borderRadius:12,fontSize:14,resize:'none',fontFamily:'inherit',outline:'none',maxHeight:100,overflowY:'auto',lineHeight:1.5}}
              onInput={e=>{const t=e.target as HTMLTextAreaElement;t.style.height='auto';t.style.height=Math.min(t.scrollHeight,100)+'px'}} />
            <button onClick={()=>sendMessage()} disabled={!input.trim()||loading}
              style={{width:42,height:42,borderRadius:'50%',border:'none',background:input.trim()&&!loading?'#2563eb':'#e5e7eb',color:'#fff',cursor:input.trim()&&!loading?'pointer':'default',fontSize:18,flexShrink:0,transition:'background .2s'}}>
              ➤
            </button>
          </div>
        </>
      )}

      {/* ── PROGRESS TAB ── */}
      {activeTab==='progress' && profile && insights && (
        <div style={{flex:1,overflowY:'auto',padding:'1rem'}}>
          {/* Overall stats */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'0.75rem',marginBottom:'1rem'}}>
            {[
              {label:'Questions',val:profile.totalQuestions,icon:'❓',color:'#2563eb',bg:'#eff6ff'},
              {label:'Accuracy',val:`${Math.round((profile.correctAnswers/Math.max(profile.totalQuestions,1))*100)}%`,icon:'🎯',color:'#059669',bg:'#d1fae5'},
              {label:'Streak',val:`${profile.streakDays}d`,icon:'🔥',color:'#d97706',bg:'#fef3c7'},
              {label:'Time',val:`${profile.totalTimeMin}m`,icon:'⏱️',color:'#7c3aed',bg:'#ede9fe'},
            ].map(s=>(
              <div key={s.label} style={{background:s.bg,borderRadius:12,padding:'12px',textAlign:'center'}}>
                <div style={{fontSize:22}}>{s.icon}</div>
                <div style={{fontSize:20,fontWeight:900,color:s.color}}>{s.val}</div>
                <div style={{fontSize:11,color:'#6b7280'}}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Insights */}
          <div style={{background:'#fff',borderRadius:14,border:'1px solid #e5e7eb',padding:'1rem',marginBottom:'1rem'}}>
            <div style={{fontWeight:800,fontSize:15,marginBottom:10}}>💡 Learning Insights</div>
            <div style={{fontSize:14,color:'#2563eb',fontWeight:700,marginBottom:8}}>{insights.motivation}</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.75rem'}}>
              <div style={{background:'#f0fdf4',borderRadius:10,padding:'10px'}}>
                <div style={{fontSize:12,fontWeight:700,color:'#059669',marginBottom:6}}>💪 Strengths</div>
                {insights.strengths.length>0 ? insights.strengths.map(s=>(
                  <div key={s} style={{fontSize:12,color:'#374151',marginBottom:3}}>✓ {s}</div>
                )) : <div style={{fontSize:12,color:'#9ca3af'}}>Keep practicing!</div>}
              </div>
              <div style={{background:'#fff7ed',borderRadius:10,padding:'10px'}}>
                <div style={{fontSize:12,fontWeight:700,color:'#d97706',marginBottom:6}}>📚 Improve</div>
                {insights.improvements.length>0 ? insights.improvements.map(s=>(
                  <div key={s} style={{fontSize:12,color:'#374151',marginBottom:3}}>→ {s}</div>
                )) : <div style={{fontSize:12,color:'#9ca3af'}}>Great work!</div>}
              </div>
            </div>
          </div>

          {/* Topic mastery list */}
          <div style={{background:'#fff',borderRadius:14,border:'1px solid #e5e7eb',overflow:'hidden'}}>
            <div style={{padding:'10px 14px',background:'#f9fafb',fontWeight:700,fontSize:14,borderBottom:'1px solid #e5e7eb'}}>📖 Topic Mastery</div>
            {Object.values(profile.topicMastery).length===0 ? (
              <div style={{padding:'2rem',textAlign:'center',color:'#9ca3af',fontSize:14}}>Start chatting to track your progress!</div>
            ) : Object.values(profile.topicMastery).slice(0,10).map(t=>{
              const pct = t.totalAttempts>0?Math.round((t.correctAttempts/t.totalAttempts)*100):0
              const col = pct>=80?'#059669':pct>=60?'#d97706':'#ef4444'
              return (
                <div key={t.topicId} style={{padding:'10px 14px',borderBottom:'1px solid #f3f4f6',display:'flex',alignItems:'center',gap:10}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:700}}>{t.topicName}</div>
                    <div style={{fontSize:11,color:'#9ca3af'}}>{t.subject} · {t.totalAttempts} attempts · Last: {new Date(t.lastAttempted).toLocaleDateString()}</div>
                    <div style={{height:4,background:'#f3f4f6',borderRadius:2,marginTop:4}}>
                      <div style={{height:'100%',width:`${pct}%`,background:col,borderRadius:2,transition:'width .6s ease'}} />
                    </div>
                  </div>
                  <div style={{textAlign:'center',minWidth:50}}>
                    <div style={{fontSize:16,fontWeight:900,color:col}}>{pct}%</div>
                    <div style={{fontSize:10,color:'#9ca3af',textTransform:'capitalize'}}>{t.mastery}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── REVISION TAB ── */}
      {activeTab==='revision' && profile && (
        <div style={{flex:1,overflowY:'auto',padding:'1rem'}}>
          {revisions.length===0 && weakTopics.length===0 ? (
            <div style={{textAlign:'center',padding:'3rem',color:'#6b7280'}}>
              <div style={{fontSize:56}}>🎉</div>
              <div style={{fontWeight:800,fontSize:18,marginBottom:8,color:'#111'}}>All caught up!</div>
              <p style={{fontSize:14}}>No revision due. Keep exploring new topics!</p>
            </div>
          ) : (
            <>
              {revisions.length>0 && (
                <>
                  <div style={{fontWeight:800,fontSize:16,marginBottom:'0.75rem',color:'#dc2626'}}>⏰ Revision Due Now</div>
                  {revisions.map(t=>(
                    <div key={t.topicId} style={{background:'#fff',borderRadius:12,border:'1.5px solid #fecdd3',padding:'1rem',marginBottom:'0.75rem',display:'flex',alignItems:'center',gap:12}}>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:700,fontSize:15}}>{t.topicName}</div>
                        <div style={{fontSize:12,color:'#6b7280'}}>{t.subject} · {Math.round(t.averageScore)}% accuracy</div>
                      </div>
                      <button onClick={()=>{setTopicInput(t.topicName);setActiveTab('chat');sendMessage(`Let's revise ${t.topicName}`)}}
                        style={{padding:'7px 14px',background:'#dc2626',color:'#fff',border:'none',borderRadius:9,fontWeight:700,cursor:'pointer',fontSize:13,fontFamily:'inherit'}}>
                        Revise →
                      </button>
                    </div>
                  ))}
                </>
              )}
              {weakTopics.length>0 && (
                <>
                  <div style={{fontWeight:800,fontSize:16,marginBottom:'0.75rem',marginTop:'1rem',color:'#d97706'}}>⚠️ Needs Practice</div>
                  {weakTopics.map(t=>(
                    <div key={t.topicId} style={{background:'#fff',borderRadius:12,border:'1.5px solid #fde68a',padding:'1rem',marginBottom:'0.75rem',display:'flex',alignItems:'center',gap:12}}>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:700,fontSize:15}}>{t.topicName}</div>
                        <div style={{fontSize:12,color:'#6b7280'}}>{t.subject} · {t.wrongAttempts} wrong / {t.totalAttempts} total</div>
                      </div>
                      <button onClick={()=>{setTopicInput(t.topicName);setActiveTab('chat');sendMessage(`Help me understand ${t.topicName} better`)}}
                        style={{padding:'7px 14px',background:'#d97706',color:'#fff',border:'none',borderRadius:9,fontWeight:700,cursor:'pointer',fontSize:13,fontFamily:'inherit'}}>
                        Practice →
                      </button>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      )}

      {/* ── STUDY PLAN TAB ── */}
      {activeTab==='plan' && (
        <div style={{flex:1,overflowY:'auto',padding:'1rem'}}>
          {planLoading ? (
            <div style={{textAlign:'center',padding:'3rem'}}>
              <div style={{width:40,height:40,border:'3px solid #e5e7eb',borderTopColor:'#2563eb',borderRadius:'50%',animation:'spin .8s linear infinite',margin:'0 auto 1rem'}} />
              <div style={{color:'#6b7280'}}>Generating your personalized study plan...</div>
            </div>
          ) : !studyPlan ? (
            <div style={{textAlign:'center',padding:'2rem'}}>
              <div style={{fontSize:48,marginBottom:'1rem'}}>📅</div>
              <button onClick={getStudyPlan} style={{padding:'12px 28px',background:'#2563eb',color:'#fff',border:'none',borderRadius:12,fontWeight:700,cursor:'pointer',fontSize:15,fontFamily:'inherit'}}>
                Generate My Study Plan
              </button>
            </div>
          ) : (
            <>
              <div style={{background:'linear-gradient(135deg,#2563eb,#1d4ed8)',borderRadius:14,padding:'1rem',marginBottom:'1rem',color:'#fff'}}>
                <div style={{fontSize:13,opacity:.8,marginBottom:4}}>Daily Goal</div>
                <div style={{fontWeight:800,fontSize:16}}>{studyPlan.dailyGoal}</div>
                {studyPlan.focusAreas.length>0 && (
                  <div style={{marginTop:8,display:'flex',gap:6,flexWrap:'wrap'}}>
                    {studyPlan.focusAreas.map(a=>(
                      <span key={a} style={{background:'rgba(255,255,255,.2)',borderRadius:20,padding:'2px 10px',fontSize:12}}>{a}</span>
                    ))}
                  </div>
                )}
              </div>
              {studyPlan.weeklyPlan.map(day=>(
                <div key={day.day} style={{background:'#fff',borderRadius:12,border:'1px solid #e5e7eb',padding:'1rem',marginBottom:'0.625rem',display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:80,flexShrink:0}}>
                    <div style={{fontWeight:800,fontSize:13,color:'#2563eb'}}>{day.day}</div>
                    <div style={{fontSize:11,color:'#9ca3af'}}>{day.duration} min</div>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:14}}>{day.topic}</div>
                    <div style={{fontSize:12,color:'#6b7280',marginTop:2}}>{day.activity}</div>
                  </div>
                  <button onClick={()=>{setTopicInput(day.topic);setActiveTab('chat');sendMessage(`Let's study ${day.topic}`)}}
                    style={{padding:'6px 12px',background:'#eff6ff',color:'#2563eb',border:'1px solid #bfdbfe',borderRadius:8,fontWeight:700,cursor:'pointer',fontSize:12,fontFamily:'inherit',flexShrink:0}}>
                    Start →
                  </button>
                </div>
              ))}
              <button onClick={getStudyPlan} style={{width:'100%',marginTop:'0.5rem',padding:'10px',background:'#f3f4f6',color:'#374151',border:'1px solid #e5e7eb',borderRadius:10,fontWeight:600,cursor:'pointer',fontSize:14,fontFamily:'inherit'}}>
                🔄 Regenerate Plan
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
