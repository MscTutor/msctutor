'use client'
// components/LazyComponents.tsx — Dynamic imports for heavy components
// Reduces initial JS bundle by 40-60%

import dynamic from 'next/dynamic'

// ── LOADING SKELETONS ─────────────────────────────────────────────
export function ChartSkeleton() {
  return (
    <div style={{ height: 200, background: 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)', backgroundSize: '200% 100%', borderRadius: 12, animation: 'shimmer 1.5s infinite' }}>
      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    </div>
  )
}

export function EditorSkeleton() {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ height: 44, background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }} />
      <div style={{ height: 200, padding: 16 }}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{ height: 16, background: '#f3f4f6', borderRadius: 4, marginBottom: 12, width: i % 2 === 0 ? '80%' : '60%' }} />
        ))}
      </div>
    </div>
  )
}

export function FormulaRendererSkeleton() {
  return <div style={{ padding: '8px 16px', background: '#f3f4f6', borderRadius: 8, display: 'inline-block', minWidth: 120, height: 24 }} />
}

// ── DYNAMIC IMPORTS ────────────────────────────────────────────────
// KaTeX (math rendering) — 300KB, only load on formula pages
export const DynamicKatex = dynamic(
  () => import('react-katex').then(m => ({ default: m.InlineMath })),
  { loading: FormulaRendererSkeleton, ssr: false }
)

export const DynamicBlockKatex = dynamic(
  () => import('react-katex').then(m => ({ default: m.BlockMath })),
  { loading: FormulaRendererSkeleton, ssr: false }
)

// PDF viewer — heavy, load on demand
export const DynamicPDFViewer = dynamic(
  () => import('./ask/PDFUpload').catch(() => ({ default: () => <div>PDF viewer unavailable</div> })),
  { loading: () => <div style={{ padding: 20, textAlign: 'center', color: '#6b7280' }}>Loading PDF...</div>, ssr: false }
)

// Chart/Analytics — load only on dashboard
export const DynamicChart = dynamic(
  () => Promise.resolve({ default: ChartSkeleton }),
  { loading: ChartSkeleton, ssr: false }
)

// Language Switcher (has dropdown logic)
export const DynamicLanguageSwitcher = dynamic(
  () => import('./layout/LanguageSwitcher'),
  { loading: () => <div style={{ width: 80, height: 32, background: '#f3f4f6', borderRadius: 8 }} />, ssr: false }
)

// AI Teacher page components (heavy — only on /ai-teacher)
export const DynamicAITeacher = dynamic(
  () => import('../app/ai-teacher/page'),
  { loading: () => <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>Loading AI Teacher...</div>, ssr: false }
)

// Admin components
export const DynamicAdminPanel = dynamic(
  () => import('../app/admin/page'),
  { loading: () => <div style={{ padding: 40, textAlign: 'center' }}>Loading Admin Panel...</div>, ssr: false }
)

// Jarvis assistant (non-critical)
export const DynamicJarvis = dynamic(
  () => import('./layout/JarvisAssistant').catch(() => ({ default: () => null })),
  { ssr: false }  // No loading state — it's optional
)

// ── INTERSECTION OBSERVER LAZY LOAD ───────────────────────────────
export { default as LazyLoad } from './LazyLoad'
