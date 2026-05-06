'use client'
// components/layout/HeroSlider.tsx — Auto-sliding hero banners for homepage

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

const SLIDES = [
  {
    id: 1,
    bg: 'linear-gradient(135deg, #1a3a6b 0%, #0e2347 60%, #1a3a6b 100%)',
    emoji: '🤖',
    badge: 'NEW — AI Powered',
    title: 'Har Sawaal Ka',
    titleAccent: 'Jawab Milega',
    subtitle: 'Text, Image, Voice ya PDF — kisi bhi tarah se sawaal poochho. AI second mein solve karta hai!',
    cta: { label: '🚀 AI Se Poochho — Free!', href: '/ask' },
    ctaSecondary: { label: 'Demo Dekho', href: '/question/what-is-newtons-second-law-of-motion' },
    pattern: 'dots',
    accent: '#f59e0b',
    features: ['✓ Text + Image', '✓ Voice Input', '✓ PDF Upload', '✓ Step-by-Step'],
  },
  {
    id: 2,
    bg: 'linear-gradient(135deg, #0a5e3f 0%, #064e34 60%, #0a5e3f 100%)',
    emoji: '📖',
    badge: 'Class 1–12 NCERT',
    title: '500+ Chapters',
    titleAccent: 'Fully Explained',
    subtitle: 'NCERT ke har chapter ka world-class explanation — formulas, experiments, videos sab ek jagah!',
    cta: { label: '📚 Chapters Dekho', href: '/class' },
    ctaSecondary: { label: 'Class 10 Dekho', href: '/class/10' },
    pattern: 'grid',
    accent: '#34d399',
    features: ['✓ CBSE/ICSE', '✓ Hindi+English', '✓ Video Links', '✓ Experiments'],
  },
  {
    id: 3,
    bg: 'linear-gradient(135deg, #7c3400 0%, #5c2700 60%, #7c3400 100%)',
    emoji: '📋',
    badge: 'AI Mock Tests',
    title: 'Board-Style',
    titleAccent: 'Practice Tests',
    subtitle: 'AI se generate karo authentic CBSE/ICSE style test. Topic analysis aur weak areas identify karo!',
    cta: { label: '📝 Test Shuru Karo', href: '/mock-test' },
    ctaSecondary: { label: 'Result Kaise Aata Hai?', href: '/mock-test' },
    pattern: 'circles',
    accent: '#fb923c',
    features: ['✓ 20+ Questions', '✓ Timer', '✓ Topic Analysis', '✓ Result Card'],
  },
  {
    id: 4,
    bg: 'linear-gradient(135deg, #6b21a8 0%, #4c1d95 60%, #6b21a8 100%)',
    emoji: '🏫',
    badge: 'School Management',
    title: 'Puri School',
    titleAccent: 'Ek App Mein',
    subtitle: 'Teachers, students, attendance, homework, live class, exams — sab kuch free mein manage karo!',
    cta: { label: '🏫 School Register Karo', href: '/school/register' },
    ctaSecondary: { label: 'School Plans', href: '/pricing' },
    pattern: 'diagonal',
    accent: '#a78bfa',
    features: ['✓ FCM Notifications', '✓ Bulk Import', '✓ Live Class', '✓ Digital Exam'],
  },
  {
    id: 5,
    bg: 'linear-gradient(135deg, #0369a1 0%, #01478a 60%, #0369a1 100%)',
    emoji: '🔢',
    badge: 'Vedic Math + Tools',
    title: '10 Calculators',
    titleAccent: '+ Vedic Math',
    subtitle: 'Scientific calculator, graph plotter, matrix solver, chemistry balancer aur Vedic Math tricks — sab free!',
    cta: { label: '🔢 Calculators Kholo', href: '/calculators' },
    ctaSecondary: { label: 'Formula Bank', href: '/formulas' },
    pattern: 'hex',
    accent: '#38bdf8',
    features: ['✓ Graph Calculator', '✓ Matrix Solver', '✓ Vedic Math', '✓ Unit Converter'],
  },
  {
    id: 6,
    bg: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 60%, #dc2626 100%)',
    emoji: '💰',
    badge: 'Students ke liye Free',
    title: 'Monthly Cost',
    titleAccent: 'Sirf ₹0',
    subtitle: 'Students ke liye hamesha free! Basic AI answers, chapters, mock tests — koi credit card nahi chahiye!',
    cta: { label: '✓ Free Mein Shuru Karo', href: '/register' },
    ctaSecondary: { label: 'Pricing Dekho', href: '/pricing' },
    pattern: 'stars',
    accent: '#fca5a5',
    features: ['✓ 5 Q/day Free', '✓ All Chapters', '✓ Mock Tests', '✓ Community'],
  },
]

const PATTERNS: Record<string, string> = {
  dots:     'radial-gradient(circle, rgba(255,255,255,.06) 1px, transparent 1px)',
  grid:     'linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)',
  circles:  'radial-gradient(ellipse at 20% 50%, rgba(255,255,255,.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(255,255,255,.06) 0%, transparent 40%)',
  diagonal: 'repeating-linear-gradient(45deg, rgba(255,255,255,.03) 0, rgba(255,255,255,.03) 1px, transparent 0, transparent 50%)',
  hex:      'radial-gradient(circle at 25% 75%, rgba(255,255,255,.1) 0%, transparent 40%)',
  stars:    'radial-gradient(circle at 10% 20%, rgba(255,255,255,.08) 0%, transparent 30%), radial-gradient(circle at 90% 80%, rgba(255,255,255,.06) 0%, transparent 30%)',
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [paused,  setPaused]  = useState(false)
  const [animDir, setAnimDir] = useState<'next'|'prev'>('next')

  const next = useCallback(() => {
    setAnimDir('next')
    setCurrent(c => (c + 1) % SLIDES.length)
  }, [])

  const prev = useCallback(() => {
    setAnimDir('prev')
    setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [paused, next])

  const slide = SLIDES[current]

  return (
    <div
      style={{ position: 'relative', overflow: 'hidden', userSelect: 'none' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{`
        @keyframes slideInRight { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:none} }
        @keyframes slideInLeft  { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:none} }
        @keyframes fadeInUp     { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
        @keyframes float        { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .hero-content { animation: fadeInUp 0.5s ease forwards; }
        .hero-emoji   { animation: float 3s ease-in-out infinite; }
      `}</style>

      {/* Main slide */}
      <div style={{
        background: slide.bg, minHeight: 380, padding: '3rem 1.5rem',
        position: 'relative', display: 'flex', alignItems: 'center',
        backgroundSize: '20px 20px',
      }}>
        {/* Pattern overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: PATTERNS[slide.pattern] || '',
          backgroundSize: '24px 24px',
        }} />

        {/* Content */}
        <div className="hero-content" key={current} style={{ maxWidth: 1000, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div>
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 14px', borderRadius: 20, marginBottom: '0.85rem', border: '1px solid rgba(255,255,255,.2)', letterSpacing: .3 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: slide.accent, animation: 'float 1s ease-in-out infinite' }} />
              {slide.badge}
            </div>

            {/* Title */}
            <h1 style={{ fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 900, color: '#fff', margin: '0 0 0.4rem', lineHeight: 1.15 }}>
              {slide.title}{' '}
              <span style={{ color: slide.accent }}>{slide.titleAccent}</span>
            </h1>

            {/* Subtitle */}
            <p style={{ color: 'rgba(255,255,255,.82)', fontSize: 15, lineHeight: 1.65, margin: '0 0 1.25rem', maxWidth: 520 }}>
              {slide.subtitle}
            </p>

            {/* Feature chips */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {slide.features.map(f => (
                <span key={f} style={{ background: 'rgba(255,255,255,.12)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, border: '1px solid rgba(255,255,255,.18)' }}>{f}</span>
              ))}
            </div>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href={slide.cta.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '12px 24px', background: slide.accent, color: '#111', borderRadius: 14, textDecoration: 'none', fontWeight: 800, fontSize: 15, boxShadow: `0 4px 16px ${slide.accent}55`, whiteSpace: 'nowrap' }}>
                {slide.cta.label}
              </Link>
              <Link href={slide.ctaSecondary.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '12px 20px', background: 'rgba(255,255,255,.12)', color: '#fff', borderRadius: 14, textDecoration: 'none', fontWeight: 700, fontSize: 14, border: '1.5px solid rgba(255,255,255,.25)', backdropFilter: 'blur(4px)', whiteSpace: 'nowrap' }}>
                {slide.ctaSecondary.label} →
              </Link>
            </div>
          </div>

          {/* Emoji/icon */}
          <div className="hero-emoji" style={{ fontSize: 'clamp(72px,12vw,110px)', display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,.3))', flexShrink: 0 }}>
            {slide.emoji}
          </div>
        </div>
      </div>

      {/* Prev/Next arrows */}
      {['prev','next'].map(dir => (
        <button key={dir} onClick={dir === 'prev' ? prev : next}
          style={{
            position: 'absolute', top: '50%', transform: 'translateY(-50%)',
            [dir === 'prev' ? 'left' : 'right']: 12,
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,255,255,.2)', border: '1.5px solid rgba(255,255,255,.3)',
            color: '#fff', cursor: 'pointer', fontSize: 16, zIndex: 10,
            backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}
        >
          {dir === 'prev' ? '‹' : '›'}
        </button>
      ))}

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6, zIndex: 10 }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            style={{ width: i === current ? 20 : 8, height: 8, borderRadius: 4, border: 'none', cursor: 'pointer', transition: 'all 0.3s', background: i === current ? '#fff' : 'rgba(255,255,255,.4)', padding: 0 }} />
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, height: 3, background: 'rgba(255,255,255,.15)', width: '100%', zIndex: 10 }}>
        <div key={current} style={{ height: '100%', background: slide.accent, borderRadius: 2, animation: paused ? 'none' : 'progress 5s linear forwards' }} />
        <style>{`@keyframes progress { from{width:0%} to{width:100%} }`}</style>
      </div>
    </div>
  )
}
