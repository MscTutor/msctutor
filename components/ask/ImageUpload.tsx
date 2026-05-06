'use client'
// components/ask/ImageUpload.tsx — Camera capture + file upload

import { useState, useRef } from 'react'

interface Props {
  onResult:  (solution: string, slug: string) => void
  onLoading: (v: boolean) => void
}

export default function ImageUpload({ onResult, onLoading }: Props) {
  const [preview,  setPreview]  = useState<string | null>(null)
  const [prompt,   setPrompt]   = useState('')
  const [mode,     setMode]     = useState<'upload' | 'camera'>('upload')
  const fileRef   = useRef<HTMLInputElement>(null)
  const videoRef  = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  async function startCamera() {
    setMode('camera')
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    streamRef.current = stream
    if (videoRef.current) videoRef.current.srcObject = stream
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach(t => t.stop())
    setMode('upload')
  }

  function capturePhoto() {
    if (!videoRef.current) return
    const canvas = document.createElement('canvas')
    canvas.width  = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0)
    canvas.toBlob(blob => {
      if (!blob) return
      setPreview(URL.createObjectURL(blob))
      stopCamera()
    }, 'image/jpeg', 0.9)
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
  }

  async function handleSolve() {
    if (!preview) return
    onLoading(true)
    try {
      const blob = await fetch(preview).then(r => r.blob())
      const fd   = new FormData()
      fd.append('image', blob, 'question.jpg')
      if (prompt) fd.append('prompt', prompt)
      const res  = await fetch('/api/ask-image', { method: 'POST', body: fd })
      const data = await res.json()
      onResult(data.solution ?? 'Could not process image', data.slug ?? '')
    } catch {
      onResult('Image processing failed. Please try again.', '')
    } finally {
      onLoading(false)
    }
  }

  return (
    <div>
      {mode === 'camera' ? (
        <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', background: '#000' }}>
          <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxHeight: 300, objectFit: 'cover' }} />
          <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.75rem' }}>
            <button onClick={capturePhoto} style={{ width: 64, height: 64, borderRadius: '50%', background: '#fff', border: '4px solid #1a3a6b', fontSize: 24, cursor: 'pointer' }}>📷</button>
            <button onClick={stopCamera} style={{ padding: '0.6rem 1rem', borderRadius: 10, background: '#dc2626', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      ) : preview ? (
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Question" style={{ width: '100%', maxHeight: 280, objectFit: 'contain', borderRadius: 12, border: '1.5px solid #e5e7eb' }} />
          <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => setPreview(null)} style={{ padding: '0.6rem 1rem', borderRadius: 10, border: '1.5px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontSize: 14 }}>🗑️ Remove</button>
          </div>
        </div>
      ) : (
        <div style={{ border: '2px dashed #d1d5db', borderRadius: 14, padding: '2rem', textAlign: 'center', background: '#f9fafb' }}>
          <div style={{ fontSize: 48, marginBottom: '0.75rem' }}>📷</div>
          <p style={{ color: '#6b7280', fontSize: 15, margin: '0 0 1rem' }}>Upload a photo of your question</p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => fileRef.current?.click()} style={{ padding: '0.75rem 1.25rem', background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>📁 Choose File</button>
            <button onClick={startCamera} style={{ padding: '0.75rem 1.25rem', background: '#0a5e3f', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>📸 Open Camera</button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
          <p style={{ fontSize: 12, color: '#9ca3af', marginTop: '0.75rem' }}>Supports JPG, PNG, WEBP · Max 10MB</p>
        </div>
      )}

      {preview && (
        <div style={{ marginTop: '0.75rem' }}>
          <input
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Optional: What do you want to know? (e.g. Solve this integral)"
            style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, boxSizing: 'border-box' }}
          />
          <button onClick={handleSolve} style={{ width: '100%', marginTop: '0.75rem', padding: '0.85rem', background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            🤖 Solve This Image
          </button>
        </div>
      )}
    </div>
  )
}
