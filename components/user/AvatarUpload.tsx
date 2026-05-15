'use client'
// components/user/AvatarUpload.tsx
// Profile image uploader with 10 KB client + server side limit

import { useState, useRef } from 'react'
import Image from 'next/image'

const MAX_KB   = 10
const MAX_BYTES = MAX_KB * 1024

interface Props {
  currentUrl?: string
  uid: string
  onSuccess?: (url: string) => void
}

export default function AvatarUpload({ currentUrl, uid, onSuccess }: Props) {
  const [preview,   setPreview]   = useState<string | null>(currentUrl ?? null)
  const [error,     setError]     = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [sizeInfo,  setSizeInfo]  = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null)
    setSizeInfo(null)
    const file = e.target.files?.[0]
    if (!file) return

    // ✅ CLIENT-SIDE 10 KB CHECK — before any upload
    const sizeKB = (file.size / 1024).toFixed(1)
    setSizeInfo(`${sizeKB} KB`)

    if (file.size > MAX_BYTES) {
      setError(
        `Image ${sizeKB} KB hai — maximum 10 KB allowed hai.\n` +
        `Compress karein: tinypng.com ya squoosh.app`
      )
      if (inputRef.current) inputRef.current.value = ''
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)

    // Auto upload
    handleUpload(file)
  }

  async function handleUpload(file: File) {
    setUploading(true)
    setError(null)
    try {
      const form = new FormData()
      form.append('avatar', file)

      const res  = await fetch('/api/user/avatar', { method: 'POST', body: form })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Upload failed')
        setPreview(currentUrl ?? null)
        return
      }

      onSuccess?.(data.url)
    } catch {
      setError('Network error — please try again')
      setPreview(currentUrl ?? null)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      {/* Avatar preview */}
      <div
        onClick={() => inputRef.current?.click()}
        style={{
          width: 90, height: 90, borderRadius: '50%',
          background: '#e8edf5', border: '2px dashed #93c5fd',
          overflow: 'hidden', cursor: 'pointer', position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        title="Click to upload profile photo"
      >
        {preview ? (
          <Image src={preview} alt="Profile" fill style={{ objectFit: 'cover' }} unoptimized />
        ) : (
          <span style={{ fontSize: 32 }}>👤</span>
        )}
        {uploading && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 12, fontWeight: 700,
          }}>
            Uploading…
          </div>
        )}
      </div>

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* Size badge */}
      {sizeInfo && !error && (
        <span style={{
          fontSize: 11, background: '#dcfce7', color: '#166534',
          borderRadius: 99, padding: '2px 10px', fontWeight: 700,
        }}>
          ✅ {sizeInfo} — OK
        </span>
      )}

      {/* Error message */}
      {error && (
        <div style={{
          background: '#fef2f2', border: '1px solid #fecaca',
          borderRadius: 10, padding: '8px 14px', maxWidth: 260,
          fontSize: 12, color: '#dc2626', lineHeight: 1.5, textAlign: 'center',
        }}>
          ⚠️ {error}
          {error.includes('Compress') && (
            <div style={{ marginTop: 6 }}>
              <a href="https://tinypng.com" target="_blank" rel="noopener noreferrer"
                style={{ color: '#2563eb', fontWeight: 700 }}>
                TinyPNG →
              </a>
              {' | '}
              <a href="https://squoosh.app" target="_blank" rel="noopener noreferrer"
                style={{ color: '#2563eb', fontWeight: 700 }}>
                Squoosh →
              </a>
            </div>
          )}
        </div>
      )}

      {/* Limit info */}
      <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>
        Max 10 KB · JPG, PNG, WebP
      </p>
    </div>
  )
}
