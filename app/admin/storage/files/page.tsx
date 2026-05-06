import type { Metadata } from 'next'
import { getFallbackStorageReport } from '@/lib/dashboard-fallbacks'

export const metadata: Metadata = { title: 'Storage Files - Admin' }

export default function AdminStorageFilesPage() {
  const report = getFallbackStorageReport()

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111', margin: '0 0 0.75rem' }}>File Manager</h1>
      <p style={{ color: '#6b7280', margin: '0 0 1.5rem' }}>
        Review uploaded content assets, inspect type distribution, and prepare cleanup rules.
      </p>

      <div style={{ marginBottom: '1rem', background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', borderRadius: 12, padding: '0.9rem 1rem', fontSize: 13, fontWeight: 600 }}>
        Yeh env-safe fallback file list hai. Real upload logs and delete actions storage credentials ke baad connect honge.
      </div>

      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr>
              {['File', 'Type', 'Chapter', 'Owner', 'Size', 'Created'].map((heading) => (
                <th key={heading} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {report.files.map((file) => (
              <tr key={file.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#111', fontSize: 14 }}>{file.fileName}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: 12, textTransform: 'uppercase', color: '#1a3a6b', fontWeight: 700 }}>{file.fileType}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: 13, color: '#4b5563' }}>{file.chapterTitle}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: 13, color: '#4b5563', textTransform: 'capitalize' }}>{file.owner}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: 13, color: '#4b5563' }}>{(file.sizeBytes / 1024).toFixed(0)} KB</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: 12, color: '#6b7280' }}>{new Date(file.createdAt).toLocaleDateString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
