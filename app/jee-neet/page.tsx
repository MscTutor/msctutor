'use client'
// app/jee-neet/page.tsx — JEE / NEET Preparation Hub
// Comprehensive entrance exam prep for Class 11-12 students

import React, { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const DynamicKatex = dynamic<{ math: string }>(
  () => import('react-katex').then(m => ({ default: m.InlineMath as React.ComponentType<{ math: string }> })),
  { ssr: false, loading: () => <span style={{ fontFamily: 'monospace', background: '#f0f4ff', padding: '2px 8px', borderRadius: 4 }}>…</span> }
)

// ─── EXAM PATTERN DATA ───────────────────────────────────────────────
const JEE_PATTERN = {
  name: 'JEE Main',
  fullForm: 'Joint Entrance Examination',
  totalMarks: 300,
  duration: '3 hours',
  subjects: [
    { name: 'Physics', questions: 30, marks: 100, icon: '⚡' },
    { name: 'Chemistry', questions: 30, marks: 100, icon: '⚗️' },
    { name: 'Mathematics', questions: 30, marks: 100, icon: '📐' },
  ],
  marking: '+4 for correct, -1 for wrong (MCQ)',
  eligibility: 'Passed/appearing Class 12 with PCM',
  attempts: 'Max 3 consecutive years after Class 12',
}

const NEET_PATTERN = {
  name: 'NEET-UG',
  fullForm: 'National Eligibility cum Entrance Test',
  totalMarks: 720,
  duration: '3 hours 20 minutes',
  subjects: [
    { name: 'Physics', questions: 45, marks: 180, icon: '⚡' },
    { name: 'Chemistry', questions: 45, marks: 180, icon: '⚗️' },
    { name: 'Botany', questions: 45, marks: 180, icon: '🌿' },
    { name: 'Zoology', questions: 45, marks: 180, icon: '🧬' },
  ],
  marking: '+4 for correct, -1 for wrong',
  eligibility: 'Passed/appearing Class 12 with PCB',
  attempts: 'No limit (age 17-25)',
}

// ─── KEY FORMULAS ────────────────────────────────────────────────────
const FORMULA_BANKS = {
  physics: [
    { topic: 'Kinematics', formulas: [
      { name: 'v = u + at', latex: 'v = u + at', note: 'u = initial velocity, a = acceleration, t = time' },
      { name: 'v² = u² + 2as', latex: 'v^2 = u^2 + 2as', note: 's = displacement' },
      { name: 's = ut + ½at²', latex: 's = ut + \\frac{1}{2}at^2', note: 'Basic kinematic equation' },
    ]},
    { topic: 'Newton\'s Laws', formulas: [
      { name: 'F = ma', latex: 'F = ma', note: 'Force = mass × acceleration' },
      { name: 'Momentum p = mv', latex: 'p = mv', note: 'Linear momentum' },
    ]},
    { topic: 'Energy & Work', formulas: [
      { name: 'KE = ½mv²', latex: 'KE = \\frac{1}{2}mv^2', note: 'Kinetic energy' },
      { name: 'PE = mgh', latex: 'PE = mgh', note: 'Gravitational potential energy' },
      { name: 'W = Fd cosθ', latex: 'W = Fd\\cos\\theta', note: 'Work done by force' },
    ]},
    { topic: 'Waves & Optics', formulas: [
      { name: 'c = fλ', latex: 'c = f\\lambda', note: 'Speed of light = frequency × wavelength' },
      { name: 'n = c/v', latex: 'n = \\frac{c}{v}', note: 'Refractive index' },
      { name: 'Snell\'s Law', latex: 'n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2', note: 'At interface of two media' },
    ]},
    { topic: 'Electrostatics', formulas: [
      { name: 'Coulomb\'s Law', latex: 'F = k\\frac{q_1 q_2}{r^2}', note: 'k = 9×10⁹ Nm²/C²' },
      { name: 'E = V/d', latex: 'E = \\frac{V}{d}', note: 'Electric field between parallel plates' },
    ]},
  ],
  chemistry: [
    { topic: 'Mole Concept', formulas: [
      { name: 'n = m/M', latex: 'n = \\frac{m}{M}', note: 'n = moles, m = mass, M = molar mass' },
      { name: 'N = n × Nₐ', latex: 'N = n \\times N_A', note: 'Nₐ = 6.022×10²³' },
      { name: 'Ideal Gas', latex: 'PV = nRT', note: 'R = 8.314 J/mol·K' },
    ]},
    { topic: 'Thermochemistry', formulas: [
      { name: 'ΔG = ΔH - TΔS', latex: '\\Delta G = \\Delta H - T\\Delta S', note: 'Gibbs free energy' },
      { name: 'ΔH = ΣE(reactants) - ΣE(products)', latex: '\\Delta H_{rxn} = \\sum E_{reactants} - \\sum E_{products}', note: 'Hess\'s law' },
    ]},
    { topic: 'Equilibrium', formulas: [
      { name: 'Kc expression', latex: 'K_c = \\frac{[C]^c[D]^d}{[A]^a[B]^b}', note: 'For aA + bB → cC + dD' },
      { name: 'pH = -log[H⁺]', latex: 'pH = -\\log[H^+]', note: 'pH scale: 0-14' },
    ]},
    { topic: 'Electrochemistry', formulas: [
      { name: 'Nernst Equation', latex: 'E = E^\\circ - \\frac{RT}{nF}\\ln Q', note: 'E° = standard electrode potential' },
      { name: 'ΔG = -nFE', latex: '\\Delta G = -nFE', note: 'Gibbs energy & cell potential' },
    ]},
  ],
  mathematics: [
    { topic: 'Quadratic & Polynomials', formulas: [
      { name: 'Quadratic Formula', latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}', note: 'Roots of ax²+bx+c=0' },
      { name: 'Sum of roots', latex: '\\alpha + \\beta = -\\frac{b}{a}', note: 'For ax²+bx+c' },
      { name: 'Product of roots', latex: '\\alpha\\beta = \\frac{c}{a}', note: 'For ax²+bx+c' },
    ]},
    { topic: 'Trigonometry', formulas: [
      { name: 'sin²θ + cos²θ = 1', latex: '\\sin^2\\theta + \\cos^2\\theta = 1', note: 'Fundamental identity' },
      { name: 'sin 2θ', latex: '\\sin 2\\theta = 2\\sin\\theta\\cos\\theta', note: 'Double angle formula' },
      { name: 'cos 2θ', latex: '\\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta', note: 'Double angle' },
    ]},
    { topic: 'Calculus', formulas: [
      { name: 'd/dx (xⁿ)', latex: '\\frac{d}{dx}(x^n) = nx^{n-1}', note: 'Power rule' },
      { name: '∫xⁿ dx', latex: '\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C', note: 'Integration rule' },
      { name: 'Chain Rule', latex: '\\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx}', note: 'For composite functions' },
    ]},
    { topic: 'Coordinate Geometry', formulas: [
      { name: 'Distance Formula', latex: 'd = \\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}', note: 'Between two points' },
      { name: 'Circle Equation', latex: '(x-h)^2+(y-k)^2 = r^2', note: 'Centre (h,k), radius r' },
    ]},
  ],
  biology: [
    { topic: 'Cell Biology', formulas: [
      { name: 'Cell Theory', latex: '', note: 'All living things are made of cells; cell is the basic unit of life' },
      { name: 'Mitosis Stages', latex: '', note: 'PMAT — Prophase, Metaphase, Anaphase, Telophase' },
    ]},
    { topic: 'Genetics', formulas: [
      { name: 'Mendel\'s Law', latex: '', note: 'Law of Segregation: allele pairs separate during gamete formation' },
      { name: 'Hardy-Weinberg', latex: 'p^2 + 2pq + q^2 = 1', note: 'Allele frequency equilibrium' },
    ]},
    { topic: 'Photosynthesis', formulas: [
      { name: 'Overall Reaction', latex: '6CO_2 + 6H_2O \\xrightarrow{\\text{light}} C_6H_{12}O_6 + 6O_2', note: 'Light reaction + Calvin cycle' },
    ]},
    { topic: 'Ecology', formulas: [
      { name: 'Population Growth', latex: '\\frac{dN}{dt} = rN', note: 'r = intrinsic growth rate, N = population size' },
      { name: 'Logistic Growth', latex: '\\frac{dN}{dt} = rN\\left(1-\\frac{N}{K}\\right)', note: 'K = carrying capacity' },
    ]},
  ],
}

// ─── CHAPTER LINKS ───────────────────────────────────────────────────
const JEE_CHAPTERS = {
  physics: [
    { title: 'Motion in a Straight Line', classId: '11', chapterId: 'c11ph2' },
    { title: 'Laws of Motion', classId: '11', chapterId: 'c11ph3' },
    { title: 'Work, Energy & Power', classId: '11', chapterId: 'c11ph4' },
    { title: 'Gravitation', classId: '11', chapterId: 'c11ph7' },
    { title: 'Waves', classId: '11', chapterId: 'c11ph10' },
    { title: 'Electrostatics', classId: '12', chapterId: 'c12ph1' },
    { title: 'Current Electricity', classId: '12', chapterId: 'c12ph2' },
    { title: 'Magnetic Effects', classId: '12', chapterId: 'c12ph4' },
    { title: 'Ray Optics', classId: '12', chapterId: 'c12ph9' },
    { title: 'Atoms & Nuclei', classId: '12', chapterId: 'c12ph12' },
  ],
  chemistry: [
    { title: 'Some Basic Concepts of Chemistry', classId: '11', chapterId: 'c11ch1' },
    { title: 'Atomic Structure', classId: '11', chapterId: 'c11ch2' },
    { title: 'Chemical Bonding', classId: '11', chapterId: 'c11ch4' },
    { title: 'Thermodynamics', classId: '11', chapterId: 'c11ch6' },
    { title: 'Equilibrium', classId: '11', chapterId: 'c11ch7' },
    { title: 'Electrochemistry', classId: '12', chapterId: 'c12ch3' },
    { title: 'Chemical Kinetics', classId: '12', chapterId: 'c12ch4' },
    { title: 'Coordination Compounds', classId: '12', chapterId: 'c12ch9' },
    { title: 'Haloalkanes', classId: '12', chapterId: 'c12ch10' },
    { title: 'Biomolecules', classId: '12', chapterId: 'c12ch14' },
  ],
  mathematics: [
    { title: 'Sets, Relations & Functions', classId: '11', chapterId: 'c11m1' },
    { title: 'Trigonometric Functions', classId: '11', chapterId: 'c11m3' },
    { title: 'Quadratic Equations', classId: '11', chapterId: 'c11m5' },
    { title: 'Sequences & Series', classId: '11', chapterId: 'c11m9' },
    { title: 'Permutations & Combinations', classId: '11', chapterId: 'c11m7' },
    { title: 'Limits & Derivatives', classId: '11', chapterId: 'c11m13' },
    { title: 'Relations & Functions', classId: '12', chapterId: 'c12m1' },
    { title: 'Matrices & Determinants', classId: '12', chapterId: 'c12m3' },
    { title: 'Integrals', classId: '12', chapterId: 'c12m7' },
    { title: 'Probability', classId: '12', chapterId: 'c12m13' },
  ],
}

const NEET_CHAPTERS = {
  biology: [
    { title: 'Diversity in Living World', classId: '11', chapterId: 'c11bio1' },
    { title: 'Cell: Structure & Function', classId: '11', chapterId: 'c11bio8' },
    { title: 'Plant Physiology', classId: '11', chapterId: 'c11bio13' },
    { title: 'Human Physiology', classId: '11', chapterId: 'c11bio17' },
    { title: 'Reproduction', classId: '12', chapterId: 'c12bio1' },
    { title: 'Genetics & Evolution', classId: '12', chapterId: 'c12bio5' },
    { title: 'Biology in Human Welfare', classId: '12', chapterId: 'c12bio8' },
    { title: 'Biotechnology', classId: '12', chapterId: 'c12bio11' },
    { title: 'Ecology & Environment', classId: '12', chapterId: 'c12bio13' },
  ],
}

// ─── STUDY TIPS ──────────────────────────────────────────────────────
const STUDY_TIPS = [
  { icon: '📅', tip: 'Create a daily 6-8 hour study schedule. Physics: 2h, Chemistry: 2h, Maths/Bio: 2h, Revision: 1-2h.' },
  { icon: '📚', tip: 'NCERT is the base. Master every line before moving to advanced books.' },
  { icon: '✏️', tip: 'Solve at least 50 practice questions per chapter before moving on.' },
  { icon: '📝', tip: 'Take chapter-wise mock tests weekly. Full syllabus mock every 2 weeks.' },
  { icon: '🔁', tip: 'Revise formulas and key concepts daily. Spaced repetition is key.' },
  { icon: '⚠️', tip: 'Analyse mistakes from every mock test. Do not repeat same errors.' },
  { icon: '💤', tip: '7-8 hours sleep is non-negotiable. Memory consolidates during sleep.' },
  { icon: '🎯', tip: 'Focus on high-weightage topics. 80% questions come from 40% topics.' },
]

// ─── COMPONENT ───────────────────────────────────────────────────────
export default function JeeNeetPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'jee' | 'neet' | 'formulas' | 'tips'>('overview')
  const [formulaSubject, setFormulaSubject] = useState<'physics' | 'chemistry' | 'mathematics' | 'biology'>('physics')
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set())

  const toggleTopic = (key: string) => setExpandedTopics(prev => {
    const next = new Set(prev)
    if (next.has(key)) next.delete(key); else next.add(key)
    return next
  })

  const tabs: Array<{ id: typeof activeTab; label: string }> = [
    { id: 'overview', label: '🏠 Overview' },
    { id: 'jee', label: '📐 JEE Prep' },
    { id: 'neet', label: '🧬 NEET Prep' },
    { id: 'formulas', label: '📋 Formula Bank' },
    { id: 'tips', label: '💡 Study Tips' },
  ]

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1.5rem 1rem', fontFamily: 'inherit' }}>

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #065f46 100%)',
        borderRadius: 20, padding: '2.5rem 2rem', marginBottom: '1.5rem',
        color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ fontSize: 56, marginBottom: 12, lineHeight: 1 }}>🏆</div>
        <h1 style={{ fontSize: 'clamp(1.6rem,4vw,2.5rem)', fontWeight: 900, margin: '0 0 0.5rem', lineHeight: 1.2 }}>
          JEE &amp; NEET Preparation Hub
        </h1>
        <p style={{ fontSize: 16, opacity: 0.87, margin: '0 0 1.5rem', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
          Comprehensive study material for India's top engineering and medical entrance exams.
          Class 11-12 syllabus • Formula bank • Chapter links • Exam pattern
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255,255,255,.15)', borderRadius: 12, padding: '8px 20px', fontSize: 14, fontWeight: 700 }}>
            📐 JEE: PCM — 300 marks
          </div>
          <div style={{ background: 'rgba(255,255,255,.15)', borderRadius: 12, padding: '8px 20px', fontSize: 14, fontWeight: 700 }}>
            🧬 NEET: PCMB — 720 marks
          </div>
          <div style={{ background: 'rgba(255,255,255,.15)', borderRadius: 12, padding: '8px 20px', fontSize: 14, fontWeight: 700 }}>
            🎓 Classes 11 &amp; 12
          </div>
        </div>
      </div>

      {/* ── TAB BAR ─────────────────────────────────────────────────── */}
      <div style={{
        background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 14,
        overflowX: 'auto', WebkitOverflowScrolling: 'touch' as any,
        display: 'flex', padding: '6px', gap: 4, marginBottom: '1.5rem',
        boxShadow: '0 2px 8px rgba(0,0,0,.06)',
      }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '9px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap',
              transition: 'all .2s',
              background: activeTab === tab.id ? '#1e40af' : 'transparent',
              color: activeTab === tab.id ? '#fff' : '#6b7280',
            }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ─────────────────────────────────────────────── */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {/* JEE Card */}
          <ExamCard
            title="JEE Main + Advanced"
            icon="📐"
            color="#1e40af"
            light="#dbeafe"
            border="#bfdbfe"
            pattern={JEE_PATTERN}
            onExplore={() => setActiveTab('jee')}
          />
          {/* NEET Card */}
          <ExamCard
            title="NEET-UG"
            icon="🧬"
            color="#059669"
            light="#d1fae5"
            border="#a7f3d0"
            pattern={NEET_PATTERN}
            onExplore={() => setActiveTab('neet')}
          />

          {/* Quick Stats */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #e5e7eb', padding: '1.5rem', gridColumn: '1/-1' }}>
            <div style={{ fontWeight: 800, fontSize: 16, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 22 }}>📊</span> Exam Comparison at a Glance
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    {['Aspect', 'JEE Main', 'JEE Advanced', 'NEET-UG'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: '#374151', borderBottom: '2px solid #e5e7eb' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Subjects', 'Physics, Chemistry, Maths', 'Physics, Chemistry, Maths', 'Physics, Chemistry, Biology'],
                    ['Total Marks', '300', '360', '720'],
                    ['Questions', '90', '54', '180'],
                    ['Duration', '3 hours', '3 hours', '3h 20min'],
                    ['Marking', '+4 / -1', '+4 / -2 / 0', '+4 / -1'],
                    ['Conducting Body', 'NTA', 'IIT (rotating)', 'NTA'],
                    ['Seats', '~1.5 lakh (NITs/IITs)', '~16,000 (IITs only)', '~1.8 lakh (MBBS/BDS)'],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f3f4f6', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                      {row.map((cell, j) => (
                        <td key={j} style={{ padding: '10px 14px', color: j === 0 ? '#374151' : '#6b7280', fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── JEE TAB ──────────────────────────────────────────────────── */}
      {activeTab === 'jee' && (
        <div>
          <div style={{ background: 'linear-gradient(135deg,#1e3a8a,#3b82f6)', borderRadius: 16, padding: '1.5rem', color: '#fff', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>📐 JEE Main &amp; Advanced</div>
            <p style={{ margin: 0, opacity: .9, fontSize: 15, lineHeight: 1.6 }}>
              The most prestigious engineering entrance exam. Qualifying JEE Main is needed for NITs, IIITs and CFTIs.
              JEE Advanced opens doors to IITs. Both exams test deep understanding of Class 11-12 PCM concepts.
            </p>
          </div>

          {/* Subject chapters */}
          {(['physics', 'chemistry', 'mathematics'] as const).map(subj => (
            <div key={subj} style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #e5e7eb', marginBottom: '1.25rem', overflow: 'hidden' }}>
              <div
                onClick={() => toggleTopic(`jee-${subj}`)}
                style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', background: expandedTopics.has(`jee-${subj}`) ? '#f8fafc' : '#fff' }}
              >
                <span style={{ fontSize: 22 }}>
                  {subj === 'physics' ? '⚡' : subj === 'chemistry' ? '⚗️' : '📐'}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 16, color: '#111' }}>{subj.charAt(0).toUpperCase() + subj.slice(1)}</div>
                  <div style={{ fontSize: 13, color: '#9ca3af' }}>{JEE_CHAPTERS[subj].length} key chapters • Class 11 &amp; 12</div>
                </div>
                <span style={{ color: '#9ca3af', fontSize: 18, transform: expandedTopics.has(`jee-${subj}`) ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>▼</span>
              </div>

              {expandedTopics.has(`jee-${subj}`) && (
                <div style={{ padding: '0 1.25rem 1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '0.75rem' }}>
                  {JEE_CHAPTERS[subj].map(ch => (
                    <Link
                      key={ch.chapterId}
                      href={`/learn/${ch.classId}/${subj}/${ch.chapterId}`}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                        background: '#f8fafc', borderRadius: 10, border: '1px solid #e5e7eb',
                        textDecoration: 'none', color: '#374151', fontSize: 13.5, fontWeight: 600,
                        transition: 'all .2s',
                      }}
                    >
                      <span style={{ fontSize: 16 }}>{subj === 'physics' ? '⚡' : subj === 'chemistry' ? '⚗️' : '📐'}</span>
                      <span style={{ flex: 1 }}>{ch.title}</span>
                      <span style={{ fontSize: 12, color: '#9ca3af' }}>Class {ch.classId} →</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* JEE Tips */}
          <div style={{ background: '#fef3c7', borderRadius: 16, padding: '1.25rem', border: '1.5px solid #fde68a' }}>
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: '0.875rem', color: '#92400e' }}>⭐ JEE-Specific Strategy</div>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li style={{ fontSize: 14, lineHeight: 1.6, color: '#78350f' }}>Mechanics (30%) and Electrostatics/Electrodynamics (25%) are highest-weightage topics in Physics.</li>
              <li style={{ fontSize: 14, lineHeight: 1.6, color: '#78350f' }}>Organic Chemistry is the most scoring — learn all named reactions and mechanisms.</li>
              <li style={{ fontSize: 14, lineHeight: 1.6, color: '#78350f' }}>In Maths, Calculus + Algebra + Coordinate Geometry alone account for ~65% of marks.</li>
              <li style={{ fontSize: 14, lineHeight: 1.6, color: '#78350f' }}>Integer type questions carry no negative marking — attempt all of them.</li>
              <li style={{ fontSize: 14, lineHeight: 1.6, color: '#78350f' }}>Previous years (2010-2024) papers are the best mock — solve them all.</li>
            </ul>
          </div>
        </div>
      )}

      {/* ── NEET TAB ─────────────────────────────────────────────────── */}
      {activeTab === 'neet' && (
        <div>
          <div style={{ background: 'linear-gradient(135deg,#065f46,#059669)', borderRadius: 16, padding: '1.5rem', color: '#fff', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🧬 NEET-UG</div>
            <p style={{ margin: 0, opacity: .9, fontSize: 15, lineHeight: 1.6 }}>
              India's single national medical entrance exam for MBBS, BDS and other medical courses.
              Conducted by NTA, it tests Class 11-12 Physics, Chemistry, Botany and Zoology.
            </p>
          </div>

          {/* Biology Chapters (most important for NEET) */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #e5e7eb', marginBottom: '1.25rem', overflow: 'hidden' }}>
            <div
              onClick={() => toggleTopic('neet-bio')}
              style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
            >
              <span style={{ fontSize: 22 }}>🧬</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#111' }}>Biology (Botany + Zoology)</div>
                <div style={{ fontSize: 13, color: '#9ca3af' }}>50% of NEET • {NEET_CHAPTERS.biology.length} key chapters</div>
              </div>
              <span style={{ color: '#9ca3af', fontSize: 18, transform: expandedTopics.has('neet-bio') ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>▼</span>
            </div>
            {expandedTopics.has('neet-bio') && (
              <div style={{ padding: '0 1.25rem 1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '0.75rem' }}>
                {NEET_CHAPTERS.biology.map(ch => (
                  <Link
                    key={ch.chapterId}
                    href={`/learn/${ch.classId}/biology/${ch.chapterId}`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                      background: '#f8fafc', borderRadius: 10, border: '1px solid #e5e7eb',
                      textDecoration: 'none', color: '#374151', fontSize: 13.5, fontWeight: 600,
                    }}
                  >
                    <span style={{ fontSize: 16 }}>🧬</span>
                    <span style={{ flex: 1 }}>{ch.title}</span>
                    <span style={{ fontSize: 12, color: '#9ca3af' }}>Class {ch.classId} →</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Physics & Chemistry same structure as JEE */}
          {(['physics', 'chemistry'] as const).map(subj => (
            <div key={subj} style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #e5e7eb', marginBottom: '1.25rem', overflow: 'hidden' }}>
              <div
                onClick={() => toggleTopic(`neet-${subj}`)}
                style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
              >
                <span style={{ fontSize: 22 }}>{subj === 'physics' ? '⚡' : '⚗️'}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 16, color: '#111' }}>{subj.charAt(0).toUpperCase() + subj.slice(1)}</div>
                  <div style={{ fontSize: 13, color: '#9ca3af' }}>25% of NEET • {JEE_CHAPTERS[subj].length} key chapters</div>
                </div>
                <span style={{ color: '#9ca3af', fontSize: 18, transform: expandedTopics.has(`neet-${subj}`) ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>▼</span>
              </div>
              {expandedTopics.has(`neet-${subj}`) && (
                <div style={{ padding: '0 1.25rem 1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '0.75rem' }}>
                  {JEE_CHAPTERS[subj].map(ch => (
                    <Link
                      key={ch.chapterId}
                      href={`/learn/${ch.classId}/${subj}/${ch.chapterId}`}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                        background: '#f8fafc', borderRadius: 10, border: '1px solid #e5e7eb',
                        textDecoration: 'none', color: '#374151', fontSize: 13.5, fontWeight: 600,
                      }}
                    >
                      <span style={{ fontSize: 16 }}>{subj === 'physics' ? '⚡' : '⚗️'}</span>
                      <span style={{ flex: 1 }}>{ch.title}</span>
                      <span style={{ fontSize: 12, color: '#9ca3af' }}>Class {ch.classId} →</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* NEET Tips */}
          <div style={{ background: '#d1fae5', borderRadius: 16, padding: '1.25rem', border: '1.5px solid #a7f3d0' }}>
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: '0.875rem', color: '#065f46' }}>⭐ NEET-Specific Strategy</div>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li style={{ fontSize: 14, lineHeight: 1.6, color: '#064e3b' }}>Biology = 360/720 marks. Prioritise it above everything else.</li>
              <li style={{ fontSize: 14, lineHeight: 1.6, color: '#064e3b' }}>NCERT Biology (Class 11+12) is enough for 90% of NEET Biology questions. Read every line.</li>
              <li style={{ fontSize: 14, lineHeight: 1.6, color: '#064e3b' }}>Human Physiology + Plant Physiology + Genetics = ~40% of Biology questions.</li>
              <li style={{ fontSize: 14, lineHeight: 1.6, color: '#064e3b' }}>Physics in NEET is easier than JEE — focus on NCERT examples and numerical practice.</li>
              <li style={{ fontSize: 14, lineHeight: 1.6, color: '#064e3b' }}>Target 550+ to get a government medical college seat.</li>
            </ul>
          </div>
        </div>
      )}

      {/* ── FORMULA BANK TAB ──────────────────────────────────────────── */}
      {activeTab === 'formulas' && (
        <div>
          {/* Subject selector */}
          <div style={{ display: 'flex', gap: 8, marginBottom: '1.25rem', overflowX: 'auto', WebkitOverflowScrolling: 'touch' as any, paddingBottom: 4 }}>
            {(['physics', 'chemistry', 'mathematics', 'biology'] as const).map(subj => (
              <button key={subj} onClick={() => setFormulaSubject(subj)}
                style={{
                  padding: '9px 22px', borderRadius: 10, border: '1.5px solid', cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap',
                  transition: 'all .2s',
                  background: formulaSubject === subj ? '#1e40af' : '#fff',
                  color: formulaSubject === subj ? '#fff' : '#374151',
                  borderColor: formulaSubject === subj ? '#1e40af' : '#e5e7eb',
                }}>
                {subj === 'physics' ? '⚡' : subj === 'chemistry' ? '⚗️' : subj === 'mathematics' ? '📐' : '🧬'}{' '}
                {subj.charAt(0).toUpperCase() + subj.slice(1)}
              </button>
            ))}
          </div>

          {FORMULA_BANKS[formulaSubject].map(section => (
            <div key={section.topic} style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #e5e7eb', marginBottom: '1rem', overflow: 'hidden' }}>
              <div
                onClick={() => toggleTopic(`formula-${section.topic}`)}
                style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', background: expandedTopics.has(`formula-${section.topic}`) ? '#f0f4ff' : '#fff' }}
              >
                <div style={{ flex: 1, fontWeight: 800, fontSize: 15, color: '#111' }}>{section.topic}</div>
                <span style={{ fontSize: 12, color: '#9ca3af', marginRight: 8 }}>{section.formulas.length} formulas</span>
                <span style={{ color: '#9ca3af', fontSize: 16, transform: expandedTopics.has(`formula-${section.topic}`) ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>▼</span>
              </div>

              {expandedTopics.has(`formula-${section.topic}`) && (
                <div style={{ padding: '0 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {section.formulas.map((f, fi) => (
                    <div key={fi} style={{ background: '#f8fafc', borderRadius: 12, padding: '0.875rem 1rem', border: '1px solid #e5e7eb' }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: '#111', marginBottom: 6 }}>{f.name}</div>
                      {f.latex ? (
                        <div style={{ background: '#f0f4ff', borderRadius: 8, padding: '6px 12px', display: 'inline-block', marginBottom: 6 }}>
                          <DynamicKatex math={f.latex} />
                        </div>
                      ) : null}
                      <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>{f.note}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── STUDY TIPS TAB ────────────────────────────────────────────── */}
      {activeTab === 'tips' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {STUDY_TIPS.map((tip, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #e5e7eb', padding: '1.25rem', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{tip.icon}</div>
                <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.7 }}>{tip.tip}</div>
              </div>
            ))}
          </div>

          {/* Subject-wise book recommendations */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #e5e7eb', padding: '1.5rem' }}>
            <div style={{ fontWeight: 800, fontSize: 16, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 22 }}>📚</span> Recommended Study Resources
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '0.875rem' }}>
              {[
                { subj: '⚡ Physics', books: ['NCERT Class 11 & 12 (primary)', 'HC Verma — Concepts of Physics', 'DC Pandey — Arihant Series'] },
                { subj: '⚗️ Chemistry', books: ['NCERT Class 11 & 12 (primary)', 'OP Tandon — Physical Chemistry', 'MS Chouhan — Organic Chemistry'] },
                { subj: '📐 Mathematics', books: ['NCERT Class 11 & 12 (primary)', 'RD Sharma / RS Aggarwal', 'Arihant — Skills in Mathematics'] },
                { subj: '🧬 Biology', books: ['NCERT Class 11 & 12 (primary — read every line)', 'Trueman\'s Elementary Biology', 'MTG Fingertips Biology'] },
              ].map(item => (
                <div key={item.subj} style={{ background: '#f8fafc', borderRadius: 12, padding: '1rem', border: '1px solid #e5e7eb' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, color: '#111' }}>{item.subj}</div>
                  <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                    {item.books.map((b, bi) => (
                      <li key={bi} style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.7 }}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

// ─── EXAM CARD ───────────────────────────────────────────────────────
function ExamCard({ title, icon, color, light, border, pattern, onExplore }: {
  title: string; icon: string; color: string; light: string; border: string;
  pattern: typeof JEE_PATTERN; onExplore: () => void
}) {
  return (
    <div style={{ background: '#fff', borderRadius: 18, border: `1.5px solid ${border}`, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,.06)' }}>
      <div style={{ background: `linear-gradient(135deg,${color},${color}cc)`, padding: '1.25rem 1.5rem', color: '#fff' }}>
        <div style={{ fontSize: 36, marginBottom: 6 }}>{icon}</div>
        <div style={{ fontWeight: 900, fontSize: 20 }}>{title}</div>
        <div style={{ fontSize: 13, opacity: .85, marginTop: 2 }}>{pattern.fullForm}</div>
      </div>

      <div style={{ padding: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
          {[
            { label: 'Total Marks', value: pattern.totalMarks },
            { label: 'Duration', value: pattern.duration },
            { label: 'Marking', value: pattern.marking },
            { label: 'Eligibility', value: pattern.eligibility },
          ].map(item => (
            <div key={item.label} style={{ background: light, borderRadius: 10, padding: '8px 10px', border: `1px solid ${border}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: color, textTransform: 'uppercase', letterSpacing: .5, marginBottom: 3 }}>{item.label}</div>
              <div style={{ fontSize: 12.5, color: '#374151', fontWeight: 600, lineHeight: 1.4 }}>{item.value}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: .5, marginBottom: 8 }}>Subject Breakup</div>
          {pattern.subjects.map(s => (
            <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 16 }}>{s.icon}</span>
              <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600, color: '#374151' }}>{s.name}</span>
              <span style={{ fontSize: 12, color: '#9ca3af' }}>{s.questions}Q</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: color }}>{s.marks} marks</span>
            </div>
          ))}
        </div>

        <button onClick={onExplore} style={{
          width: '100%', padding: '11px', background: color, color: '#fff', border: 'none',
          borderRadius: 12, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer',
        }}>
          Explore {title} Prep →
        </button>
      </div>
    </div>
  )
}
