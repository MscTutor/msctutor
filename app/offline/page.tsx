import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import OfflineReloadButton from '@/components/layout/OfflineReloadButton'

export const metadata: Metadata = buildMetadata({ pageKey: 'home', path: '/offline', noIndex: true })

export default function OfflinePage() {
  return (
    <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
      <div style={{ maxWidth: 460 }}>
        <div style={{ fontSize: 72, marginBottom: '1.5rem' }}>📵</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#111', margin: '0 0 0.75rem' }}>
          You&apos;re offline
        </h1>
        <p style={{ color: '#6b7280', fontSize: 16, lineHeight: 1.6, margin: '0 0 1.5rem' }}>
          No internet connection. Some pages are cached and may still work.
          Connect to the internet to get AI answers and access all features.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/formulas" style={{ padding: '0.75rem 1.5rem', background: '#1a3a6b', color: '#fff', borderRadius: 12, textDecoration: 'none', fontWeight: 700 }}>
            📐 View Formulas
          </a>
          <OfflineReloadButton />
        </div>
      </div>
    </main>
  )
}
