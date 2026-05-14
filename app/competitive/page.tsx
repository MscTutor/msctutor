'use client'
// app/competitive/page.tsx — Competitive Exams Preparation Hub
// NTSE, Olympiads (IMO, NSO, IEO), UPSC, SSC, NDA, CLAT, CA Foundation

import React, { useState } from 'react'
import Link from 'next/link'

const EXAMS = [
  {
    id: 'ntse',
    name: 'NTSE',
    fullName: 'National Talent Search Examination',
    icon: '🏆',
    color: '#1e40af',
    light: '#dbeafe',
    border: '#bfdbfe',
    eligibility: 'Class 10 students',
    conductedBy: 'NCERT',
    stages: 'Stage 1 (State) → Stage 2 (National)',
    scholarshipPerMonth: '₹1,250/month (Class 11-12), ₹2,000/month (UG/PG)',
    pattern: 'MAT (Mental Ability Test) + SAT (Scholastic Aptitude Test)',
    marks: '200 (100 MAT + 100 SAT)',
    subjects: ['Mental Ability', 'Mathematics', 'Science', 'Social Science', 'English & Hindi'],
    tips: [
      'MAT is as important as SAT — practice puzzles, patterns, series',
      'NCERT books of Class 9-10 are the base for SAT',
      'Previous year NTSE papers (last 10 years) are essential',
      'Mental ability: practice 30 mins daily — Logical reasoning, Analogies, Series',
    ],
  },
  {
    id: 'olympiad',
    name: 'Science Olympiads',
    fullName: 'IMO / NSO / IEO / NCO — SOF Olympiads',
    icon: '🥇',
    color: '#d97706',
    light: '#fef3c7',
    border: '#fde68a',
    eligibility: 'Class 1-12',
    conductedBy: 'Science Olympiad Foundation (SOF)',
    stages: 'Level 1 (School) → Level 2 (State/National)',
    scholarshipPerMonth: 'Cash prizes + medals + scholarships',
    pattern: 'MCQ based, 60 minutes',
    marks: '40-50 questions × 1-3 marks each',
    subjects: ['IMO (Maths)', 'NSO (Science)', 'IEO (English)', 'NCO (Cyber/Computer)'],
    tips: [
      'Start from Class 3 — early practice builds strong foundation',
      'SOF practice papers from official website are most useful',
      'Focus on tricky application-based questions, not just memory',
      'Class-appropriate reasoning and logical thinking practice daily',
    ],
  },
  {
    id: 'upsc',
    name: 'UPSC Civil Services',
    fullName: 'Union Public Service Commission — IAS/IPS/IFS',
    icon: '🏛️',
    color: '#065f46',
    light: '#d1fae5',
    border: '#a7f3d0',
    eligibility: 'Graduate (any stream), Age 21-32',
    conductedBy: 'UPSC (Union Public Service Commission)',
    stages: 'Prelims → Mains → Interview/Personality Test',
    scholarshipPerMonth: 'Salary: ₹56,100–₹2,50,000/month (Grade Pay)',
    pattern: 'Prelims: 2 MCQ papers. Mains: 9 descriptive papers. Interview: 275 marks',
    marks: 'Prelims: 400. Mains: 1750. Interview: 275. Total: 2025',
    subjects: ['History', 'Geography', 'Polity', 'Economy', 'Science & Technology', 'Current Affairs', 'Ethics', 'Optional Subject'],
    tips: [
      'Start building NCERT base from Class 6-12 — all subjects',
      'UPSC is a 2-3 year journey. Start early, stay consistent',
      'Read newspaper daily (The Hindu / Indian Express) from Class 11',
      'Previous 10-year UPSC Prelims papers — solve all of them',
      'NCERT books are primary source — read every line carefully',
    ],
  },
  {
    id: 'ssc',
    name: 'SSC CGL / CHSL',
    fullName: 'Staff Selection Commission — Combined Graduate Level',
    icon: '🗂️',
    color: '#7c3aed',
    light: '#ede9fe',
    border: '#ddd6fe',
    eligibility: 'Graduate (18-32 years for CGL), Class 12 (18-27 for CHSL)',
    conductedBy: 'Staff Selection Commission (SSC)',
    stages: 'Tier 1 (CBE) → Tier 2 (CBE) → Tier 3 (Descriptive)',
    scholarshipPerMonth: 'Salary: ₹18,000–₹1,42,000/month',
    pattern: 'Tier 1: 100 MCQ, 60 min. Tier 2: 200 MCQ, 2 hours. Tier 3: Descriptive',
    marks: 'Tier 1: 200 marks (−0.5 for wrong). Tier 2: 400 marks',
    subjects: ['Quantitative Aptitude (Maths)', 'General Awareness', 'English Language', 'Reasoning'],
    tips: [
      'Maths is the most scoring section — practice arithmetic, algebra, geometry',
      'Current Affairs: read newspaper last 6 months before exam',
      'Speed matters — solve previous papers within time limits',
      'Reasoning: learn shortcut methods for series, analogies, puzzles',
    ],
  },
  {
    id: 'nda',
    name: 'NDA',
    fullName: 'National Defence Academy Examination',
    icon: '⚔️',
    color: '#1e3a5f',
    light: '#e0f2fe',
    border: '#bae6fd',
    eligibility: 'Class 12 (PCM for Army/Navy/Air Force), Age 16.5-19.5',
    conductedBy: 'UPSC',
    stages: 'Written Exam → SSB Interview (5 days)',
    scholarshipPerMonth: 'Stipend during training + salary after commission ₹56,100+',
    pattern: 'Maths (300 marks) + General Ability Test (600 marks)',
    marks: 'Written: 900 marks. SSB: 900 marks. Total: 1800 marks',
    subjects: ['Mathematics (Class 11-12 level)', 'English', 'GK/Current Affairs', 'Physics', 'Chemistry', 'History/Geography'],
    tips: [
      'Maths syllabus same as Class 12 PCM — master it completely',
      'Physical fitness is essential — start running, swimming, gymming from Class 10',
      'SSB tests personality, not just knowledge — develop leadership skills',
      'Practice NDA maths papers from 2015 onwards',
    ],
  },
  {
    id: 'clat',
    name: 'CLAT',
    fullName: 'Common Law Admission Test',
    icon: '⚖️',
    color: '#92400e',
    light: '#fef3c7',
    border: '#fde68a',
    eligibility: 'Class 12 (any stream), 45% marks',
    conductedBy: 'Consortium of NLUs (National Law Universities)',
    stages: 'Single national exam → Counselling based on merit',
    scholarshipPerMonth: 'Scholarships available at NLUs',
    pattern: '120 MCQ, 2 hours, −0.25 for wrong answers',
    marks: '120 marks',
    subjects: ['English Language', 'Current Affairs + GK', 'Legal Reasoning', 'Logical Reasoning', 'Quantitative Techniques (basic maths)'],
    tips: [
      'Reading comprehension is most important — read editorials daily',
      'Legal reasoning: read bare acts, understand legal principles',
      'CLAT has shifted to passage-based questions — critical reading is key',
      'Start in Class 11 — 2 years of preparation is ideal',
    ],
  },
]

const STUDY_PLAN: Record<string, string[]> = {
  ntse: ['Class 9: NCERT all subjects (6-10) + MAT basics', 'Class 10 (April-Sept): MAT advanced + SAT full syllabus', 'Class 10 (Oct-Dec): Stage 1 prep + previous papers', 'Stage 1 (Nov/Dec): State level exam', 'Stage 2 (May): NCERT revision + advanced practice'],
  olympiad: ['Start from Class 3-4: build strong basics', 'SOF Level 1 (Nov): School level — Chapter 1-8 usually', 'Level 2 (Feb): Full syllabus + advanced questions', 'Daily: 30 min Olympiad practice', 'Use SOF previous 5-year papers'],
  upsc: ['Class 6-12: Build NCERT base of all subjects', 'Class 11-12: Start reading newspaper', 'Graduation: Choose Optional Subject', 'Year 1: NCERT + Standard books + Current Affairs', 'Year 2: Mains answer writing + Mock tests', 'Year 3: Revision + Interview prep'],
  ssc: ['Months 1-2: Basics (Maths + Reasoning)', 'Months 3-4: English Grammar + Vocabulary', 'Month 5: GK/Current Affairs', 'Months 6-8: Full mock tests', 'Daily: 5 Mock tests in last month before exam'],
  nda: ['Class 10-11: Build strong Maths + Physics', 'Class 11-12: NDA syllabus Maths fully + GAT prep', 'Physical fitness: daily running 5km + exercises', '6 months before exam: Full mock tests daily', 'SSB: Newspaper reading + leadership activities'],
  clat: ['Class 11: Build reading habit + Legal awareness', 'Class 12 (April-Jan): Full CLAT prep', 'English: Read 1 editorial daily + vocabulary', 'Legal reasoning: Study IPC, Constitution basics', 'Last 3 months: 2 mock tests per week'],
}

export default function CompetitivePage() {
  const [activeExam, setActiveExam] = useState<string>('ntse')
  const [activeTab, setActiveTab] = useState<'overview' | 'tips' | 'plan'>('overview')

  const exam = EXAMS.find(e => e.id === activeExam) ?? EXAMS[0]
  const plan = STUDY_PLAN[activeExam] ?? []

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1.5rem 1rem', fontFamily: 'inherit' }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)',
        borderRadius: 20, padding: '2.5rem 2rem', marginBottom: '1.5rem',
        color: '#fff', textAlign: 'center',
      }}>
        <div style={{ fontSize: 52, marginBottom: 10 }}>🏆</div>
        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', fontWeight: 900, margin: '0 0 .5rem' }}>
          Competitive Exams Preparation
        </h1>
        <p style={{ opacity: .87, fontSize: 15, maxWidth: 600, margin: '0 auto 1.5rem' }}>
          NTSE, Olympiads, UPSC, SSC, NDA, CLAT — complete preparation guide, exam pattern, study plans and tips
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Class 8-10: NTSE, Olympiads', 'Class 12+: NDA, CLAT', 'Graduate: UPSC, SSC'].map(t => (
            <span key={t} style={{ background: 'rgba(255,255,255,.15)', borderRadius: 20, padding: '6px 16px', fontSize: 13, fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── EXAM SELECTOR ──────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', WebkitOverflowScrolling: 'touch' as any, marginBottom: '1.5rem', paddingBottom: 4 }}>
        {EXAMS.map(e => (
          <button key={e.id} onClick={() => { setActiveExam(e.id); setActiveTab('overview') }}
            style={{
              padding: '10px 20px', borderRadius: 12, border: '1.5px solid', cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', transition: 'all .2s',
              background: activeExam === e.id ? e.color : '#fff',
              color: activeExam === e.id ? '#fff' : '#374151',
              borderColor: activeExam === e.id ? e.color : '#e5e7eb',
            }}>
            {e.icon} {e.name}
          </button>
        ))}
      </div>

      {/* ── EXAM HEADER ─────────────────────────────────────────── */}
      <div style={{ background: `linear-gradient(135deg,${exam.color},${exam.color}cc)`, borderRadius: 18, padding: '1.5rem 2rem', color: '#fff', marginBottom: '1.25rem' }}>
        <div style={{ fontSize: 42, marginBottom: 8 }}>{exam.icon}</div>
        <h2 style={{ fontWeight: 900, fontSize: 22, margin: '0 0 4px' }}>{exam.name}</h2>
        <p style={{ opacity: .87, fontSize: 14, margin: '0 0 1rem' }}>{exam.fullName}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '0.75rem' }}>
          {[
            { label: 'Eligibility', value: exam.eligibility },
            { label: 'Conducted by', value: exam.conductedBy },
            { label: 'Stages', value: exam.stages },
            { label: 'Reward', value: exam.scholarshipPerMonth },
          ].map(item => (
            <div key={item.label} style={{ background: 'rgba(255,255,255,.15)', borderRadius: 10, padding: '10px 14px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, opacity: .75, textTransform: 'uppercase', letterSpacing: .5, marginBottom: 3 }}>{item.label}</div>
              <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TAB BAR ─────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 4, background: '#f8fafc', borderRadius: 12, padding: 4, marginBottom: '1.25rem' }}>
        {(['overview', 'tips', 'plan'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{
              flex: 1, padding: '9px 12px', borderRadius: 9, border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 14, fontWeight: 700, transition: 'all .2s',
              background: activeTab === tab ? '#fff' : 'transparent',
              color: activeTab === tab ? exam.color : '#9ca3af',
              boxShadow: activeTab === tab ? '0 1px 4px rgba(0,0,0,.1)' : 'none',
            }}>
            {tab === 'overview' ? '📋 Pattern' : tab === 'tips' ? '💡 Tips' : '📅 Study Plan'}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ─────────────────────────────────────────────── */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #e5e7eb', padding: '1.5rem' }}>
            <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: '0.875rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>📝</span> Exam Pattern
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
              <div style={{ background: exam.light, borderRadius: 12, padding: '1rem', border: `1px solid ${exam.border}` }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: exam.color, marginBottom: 4 }}>FORMAT</div>
                <div style={{ fontSize: 14, color: '#374151' }}>{exam.pattern}</div>
              </div>
              <div style={{ background: exam.light, borderRadius: 12, padding: '1rem', border: `1px solid ${exam.border}` }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: exam.color, marginBottom: 4 }}>TOTAL MARKS</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: exam.color }}>{exam.marks}</div>
              </div>
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #e5e7eb', padding: '1.5rem' }}>
            <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: '0.875rem' }}>📚 Subjects Covered</h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {exam.subjects.map(s => (
                <span key={s} style={{ background: exam.light, border: `1.5px solid ${exam.border}`, color: exam.color, borderRadius: 20, padding: '6px 16px', fontSize: 13, fontWeight: 700 }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Related class links */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #e5e7eb', padding: '1.5rem' }}>
            <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: '0.875rem' }}>🔗 Study These First</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '0.75rem' }}>
              {(activeExam === 'ntse' ? [
                { label: '📐 Class 10 Maths', href: '/class/10' },
                { label: '⚗️ Class 10 Science', href: '/learn/10/science/c10s1' },
                { label: '🌍 Class 10 Social Science', href: '/class/10' },
                { label: '🏆 Full Practice Tests', href: '/mock-test' },
              ] : activeExam === 'upsc' ? [
                { label: '🌍 Class 6-12 History', href: '/subject/history' },
                { label: '🗺️ Class 6-12 Geography', href: '/subject/geography' },
                { label: '📊 Class 11-12 Economics', href: '/class/11' },
                { label: '📝 Daily Practice', href: '/mock-test' },
              ] : activeExam === 'nda' ? [
                { label: '📐 Class 11-12 Maths', href: '/class/11' },
                { label: '⚡ Class 11-12 Physics', href: '/class/11' },
                { label: '🏆 NDA Mock Test', href: '/mock-test' },
                { label: '📋 Formula Bank', href: '/formulas' },
              ] : [
                { label: '📚 Class 9-10 Science', href: '/class/9' },
                { label: '📐 Class 9-10 Maths', href: '/class/10' },
                { label: '🏆 JEE/NEET Prep', href: '/jee-neet' },
                { label: '📝 Mock Tests', href: '/mock-test' },
              ]).map(link => (
                <Link key={link.label} href={link.href}
                  style={{ display: 'block', padding: '12px 16px', background: '#f8fafc', borderRadius: 12, border: '1.5px solid #e5e7eb', textDecoration: 'none', color: '#374151', fontSize: 14, fontWeight: 600, transition: 'all .2s' }}>
                  {link.label} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TIPS ──────────────────────────────────────────────────── */}
      {activeTab === 'tips' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {exam.tips.map((tip, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #e5e7eb', padding: '1.25rem', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: exam.light, border: `2px solid ${exam.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, color: exam.color, flexShrink: 0 }}>
                {i + 1}
              </div>
              <div style={{ fontSize: 15, color: '#374151', lineHeight: 1.7, fontWeight: 500 }}>{tip}</div>
            </div>
          ))}

          {/* AI Help */}
          <div style={{ background: exam.light, borderRadius: 16, padding: '1.5rem', border: `1.5px solid ${exam.border}`, textAlign: 'center', marginTop: '0.5rem' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>🤖</div>
            <div style={{ fontWeight: 800, fontSize: 16, color: exam.color, marginBottom: 8 }}>Ask AI for {exam.name} Help</div>
            <p style={{ fontSize: 14, color: '#6b7280', marginBottom: '1rem' }}>Get personalized study plan, mock questions, and explanations</p>
            <Link href={`/ask?q=Help me prepare for ${exam.name} exam. Create a study plan and ask me practice questions.`}
              style={{ display: 'inline-block', padding: '12px 28px', background: exam.color, color: '#fff', borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>
              Ask AI Tutor →
            </Link>
          </div>
        </div>
      )}

      {/* ── STUDY PLAN ─────────────────────────────────────────────── */}
      {activeTab === 'plan' && (
        <div>
          <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #e5e7eb', padding: '1.5rem', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>📅</span> {exam.name} Study Roadmap
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {plan.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: exam.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0, marginTop: 2 }}>
                    {i + 1}
                  </div>
                  <div style={{ background: '#f8fafc', borderRadius: 12, padding: '10px 16px', flex: 1, fontSize: 14, color: '#374151', lineHeight: 1.6, border: '1px solid #e5e7eb' }}>
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* General tips for all */}
          <div style={{ background: '#f0fdf4', borderRadius: 16, padding: '1.5rem', border: '1.5px solid #a7f3d0' }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: '#065f46', marginBottom: '0.875rem' }}>🌟 Universal Study Tips (All Exams)</div>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                'Consistency beats intensity: 3 hours daily > 21 hours on Sunday only',
                'Revise previous topics before adding new ones (spaced repetition)',
                'Solve previous year papers — they are the best predictor of actual exam',
                '7-8 hours sleep: memory consolidates during sleep',
                'Take a mock test every week and analyze mistakes',
                'Find study partners — teaching others is the best way to learn',
              ].map((tip, i) => (
                <li key={i} style={{ fontSize: 14, color: '#064e3b', lineHeight: 1.7 }}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
