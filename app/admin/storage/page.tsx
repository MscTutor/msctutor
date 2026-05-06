import Link from 'next/link'
import type { Metadata } from 'next'
import { getFallbackStorageReport } from '@/lib/dashboard-fallbacks'

export const metadata: Metadata = { title: 'Storage Manager - Admin' }

export default function AdminStoragePage() {
  const report = getFallbackStorageReport()
  const summary = report.summary

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111', margin: '0 0 0.75rem' }}>Storage & Quota Manager</h1>
      <p style={{ color: '#6b7280', margin: '0 0 1.5rem' }}>
        Admin view for storage health, warning thresholds, upload planning, and file manager access.
      </p>

      <div style={{ marginBottom: '1rem', background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', borderRadius: 12, padding: '0.9rem 1rem', fontSize: 13, fontWeight: 600 }}>
        Database aur storage credentials add hone se yahi screen real upload logs aur quota usage dikha sakti hai. Abhi fallback report render ho rahi hai.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Total usage', value: summary.totalReadable, color: '#1a3a6b' },
          { label: 'Plan quota', value: summary.quotaReadable, color: '#7c3400' },
          { label: 'Usage %', value: `${summary.usagePercent}%`, color: summary.warning ? '#b45309' : '#166534' },
          { label: 'Video files', value: String(summary.videoCount), color: '#dc2626' },
        ].map((card) => (
          <div key={card.label} style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '1.1rem' }}>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>{card.label}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: card.color }}>{card.value}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#111' }}>Quota status</div>
            <div style={{ fontSize: 13, color: '#6b7280' }}>Warnings at 80%, uploads blocked at 95%</div>
          </div>
          <Link href="/admin/storage/files" style={{ background: '#1a3a6b', color: '#fff', textDecoration: 'none', padding: '0.65rem 1rem', borderRadius: 10, fontWeight: 700, fontSize: 13 }}>
            Open file manager
          </Link>
        </div>
        <div style={{ height: 14, borderRadius: 999, background: '#e5e7eb', overflow: 'hidden' }}>
          <div
            style={{
              width: `${summary.usagePercent}%`,
              height: '100%',
              background: summary.blocked ? '#dc2626' : summary.warning ? '#f59e0b' : '#16a34a',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: '0.75rem', fontSize: 13 }}>
          <span style={{ color: '#374151' }}>PDF files: {summary.pdfCount}</span>
          <span style={{ color: '#374151' }}>Image files: {summary.imageCount}</span>
          <span style={{ color: '#374151' }}>Video files: {summary.videoCount}</span>
          <span style={{ color: summary.warning ? '#b45309' : '#166534', fontWeight: 700 }}>
            {summary.blocked ? 'Upload block threshold reached' : summary.warning ? 'Warning threshold active' : 'Healthy usage'}
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '1rem' }}>
          <div style={{ fontWeight: 800, color: '#111', marginBottom: 10 }}>Blueprint-aligned controls</div>
          <ul style={{ margin: 0, paddingLeft: '1rem', color: '#4b5563', fontSize: 14, lineHeight: 1.8 }}>
            <li>Quota usage summary</li>
            <li>Warning and block thresholds</li>
            <li>File type split for PDF, image, and video</li>
            <li>Direct file manager route</li>
          </ul>
        </div>
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '1rem' }}>
          <div style={{ fontWeight: 800, color: '#111', marginBottom: 10 }}>Next live integrations</div>
          <ul style={{ margin: 0, paddingLeft: '1rem', color: '#4b5563', fontSize: 14, lineHeight: 1.8 }}>
            <li>Storage usage sync from upload routes</li>
            <li>School-specific quota policy</li>
            <li>Soft-delete restore and purge workflow</li>
            <li>Cloud R2 and Storj file actions</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
