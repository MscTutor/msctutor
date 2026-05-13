'use client'
// app/teacher/upload/page.tsx — Teacher content upload (extends existing teacher system)

import { useState, useRef, useCallback } from 'react'
import Link          from 'next/link'
import AuthGuard     from '@/components/AuthGuard'
import { useAuth }   from '@/lib/use-auth'

type ContentType = 'chapter'|'formula'|'experiment'|'note'|'syllabus'
type UploadState  = 'idle'|'uploading'|'success'|'error'

const CONTENT_TYPES: { id: ContentType; icon: string; label: string; hint: string }[] = [
  { id:'chapter',    icon:'📖', label:'Chapter Notes',    hint:'Upload topic explanations, concept notes, chapter summaries' },
  { id:'formula',    icon:'📐', label:'Formulas',         hint:'Upload formula sheets with derivations and examples' },
  { id:'experiment', icon:'🔬', label:'Experiment',       hint:'Upload lab procedures, observations, and viva questions' },
  { id:'note',       icon:'📝', label:'Study Notes',      hint:'Quick revision notes, important points, mnemonics' },
  { id:'syllabus',   icon:'📋', label:'Syllabus',         hint:'Upload complete syllabus or unit plan' },
]

const SUBJECTS = ['Mathematics','Physics','Chemistry','Biology','English','Hindi','Social Science','Science','Economics','Accountancy','Computer Science']
const CLASSES  = ['1','2','3','4','5','6','7','8','9','10','11','12']

function TeacherUploadContent() {
  const { user }     = useAuth()
  const [contentType, setContentType] = useState<ContentType>('chapter')
  const [title,       setTitle]       = useState('')
  const [content,     setContent]     = useState('')
  const [subject,     setSubject]     = useState('')
  const [classLevel,  setClassLevel]  = useState('')
  const [language,    setLanguage]    = useState('en')
  const [pdfFile,     setPdfFile]     = useState<File|null>(null)
  const [uploadState, setUploadState] = useState<UploadState>('idle')
  const [result,      setResult]      = useState<{ submissionId: string; status: string; message: string }|null>(null)
  const [error,       setError]       = useState('')
  const pdfRef = useRef<HTMLInputElement>(null)

  const selectedType = CONTENT_TYPES.find(t => t.id === contentType)!

  const handlePDFChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.type !== 'application/pdf') { setError('Only PDF files allowed'); return }
    if (f.size > 20 * 1024 * 1024)   { setError('PDF must be under 20MB'); return }
    setPdfFile(f)
    setError('')
    // Auto-fill title from filename
    if (!title) setTitle(f.name.replace('.pdf','').replace(/-|_/g,' '))
  }, [title])

  const handleSubmit = useCallback(async () => {
    if (!title.trim())   { setError('Title is required'); return }
    if (!content.trim() && !pdfFile) { setError('Content text or PDF file is required'); return }

    setUploadState('uploading')
    setError('')

    try {
      let finalContent = content

      // If PDF uploaded, extract text via API first
      if (pdfFile) {
        const fd = new FormData()
        fd.append('pdf', pdfFile)
        fd.append('uploadedBy', user?.uid ?? 'teacher')
        fd.append('role',       user?.role ?? 'teacher')
        if (subject)    fd.append('subject', subject)
        if (classLevel) fd.append('classLevel', classLevel)

        const pdfRes  = await fetch('/api/upload/pdf', { method:'POST', body:fd })
        const pdfData = await pdfRes.json()

        if (!pdfRes.ok) throw new Error(pdfData.error ?? 'PDF upload failed')

        // Use extracted text as content + preserve file URL
        finalContent = `[PDF: ${pdfFile.name}]\n${pdfData.text?.slice(0, 5000) ?? content}`
      }

      // Submit for moderation
      const res = await fetch('/api/content/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          type:          contentType,
          title:         title.trim(),
          content:       finalContent,
          submittedBy:   user?.uid ?? 'teacher',
          submitterRole: user?.role ?? 'teacher',
          schoolId:      user?.schoolId,
          classLevel,
          language,
          metadata:      { subject, hasPDF: !!pdfFile, pdfName: pdfFile?.name },
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Submission failed')

      setResult(data)
      setUploadState('success')
      // Reset form
      setTitle(''); setContent(''); setPdfFile(null)
      if (pdfRef.current) pdfRef.current.value = ''
    } catch (e: unknown) {
      setError((e as Error).message ?? 'Upload failed. Please try again.')
      setUploadState('error')
    }
  }, [title, content, pdfFile, contentType, subject, classLevel, language, user])

  const inputStyle: React.CSSProperties = { width:'100%', padding:'10px 13px', border:'1.5px solid #e5e7eb', borderRadius:10, fontSize:14, fontFamily:'inherit', outline:'none', boxSizing:'border-box' }
  const labelStyle: React.CSSProperties = { fontSize:12, fontWeight:700, color:'#374151', marginBottom:5, display:'block' }

  return (
    <div style={{ minHeight:'100vh', background:'#f0f4f8', padding:'1.5rem 1rem' }}>
      <div style={{ maxWidth:800, margin:'0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom:'1.5rem' }}>
          <nav style={{ fontSize:12, color:'#6b7280', marginBottom:8 }}>
            <Link href="/teacher/dashboard" style={{ color:'#2563eb', textDecoration:'none' }}>Teacher Dashboard</Link>
            {' › '} Upload Content
          </nav>
          <h1 style={{ fontSize:24, fontWeight:900, color:'#111', margin:'0 0 4px' }}>📤 Upload Educational Content</h1>
          <p style={{ color:'#6b7280', fontSize:14, margin:0 }}>
            Upload your content for review. Approved content becomes available to students on MscTutor.
          </p>
        </div>

        {/* Success state */}
        {uploadState==='success' && result && (
          <div style={{ background:'#d1fae5', border:'1.5px solid #6ee7b7', borderRadius:14, padding:'1.25rem', marginBottom:'1.25rem' }}>
            <div style={{ fontWeight:800, color:'#065f46', fontSize:16, marginBottom:6 }}>✅ Content Submitted!</div>
            <div style={{ fontSize:14, color:'#374151' }}>{result.message}</div>
            <div style={{ fontSize:12, color:'#6b7280', marginTop:6 }}>Submission ID: {result.submissionId}</div>
            <div style={{ display:'flex', gap:'0.75rem', marginTop:'0.875rem', flexWrap:'wrap' }}>
              <button onClick={()=>{ setUploadState('idle'); setResult(null) }}
                style={{ padding:'7px 16px', background:'#059669', color:'#fff', border:'none', borderRadius:9, fontWeight:700, cursor:'pointer', fontFamily:'inherit', fontSize:13 }}>
                Upload More
              </button>
              <Link href="/teacher/dashboard" style={{ padding:'7px 16px', background:'#f3f4f6', color:'#374151', borderRadius:9, textDecoration:'none', fontWeight:700, fontSize:13 }}>
                Back to Dashboard
              </Link>
            </div>
          </div>
        )}

        {uploadState !== 'success' && (
          <div style={{ background:'#fff', borderRadius:16, border:'1px solid #e5e7eb', padding:'1.5rem', boxShadow:'0 2px 8px rgba(0,0,0,.05)' }}>

            {/* Content type selector */}
            <div style={{ marginBottom:'1.25rem' }}>
              <label style={labelStyle}>Content Type *</label>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:'0.625rem' }}>
                {CONTENT_TYPES.map(t=>(
                  <button key={t.id} onClick={()=>setContentType(t.id)}
                    style={{ padding:'0.75rem', border:`2px solid ${contentType===t.id?'#2563eb':'#e5e7eb'}`, borderRadius:10, background:contentType===t.id?'#eff6ff':'#fff', cursor:'pointer', fontFamily:'inherit', textAlign:'left', transition:'all .15s' }}>
                    <div style={{ fontSize:20, marginBottom:3 }}>{t.icon}</div>
                    <div style={{ fontSize:12, fontWeight:700, color:contentType===t.id?'#2563eb':'#374151' }}>{t.label}</div>
                  </button>
                ))}
              </div>
              <div style={{ marginTop:6, fontSize:11, color:'#6b7280' }}>💡 {selectedType.hint}</div>
            </div>

            {/* Meta: Subject + Class + Language */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'0.875rem', marginBottom:'1rem' }}>
              <div>
                <label style={labelStyle}>Subject</label>
                <select value={subject} onChange={e=>setSubject(e.target.value)} style={{...inputStyle,background:'#fff'}}>
                  <option value="">Select subject</option>
                  {SUBJECTS.map(s=><option key={s} value={s.toLowerCase().replace(/ /g,'-')}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Class Level</label>
                <select value={classLevel} onChange={e=>setClassLevel(e.target.value)} style={{...inputStyle,background:'#fff'}}>
                  <option value="">Select class</option>
                  {CLASSES.map(c=><option key={c} value={c}>Class {c}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Language</label>
                <select value={language} onChange={e=>setLanguage(e.target.value)} style={{...inputStyle,background:'#fff'}}>
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                  <option value="bn">বাংলা</option>
                  <option value="ta">தமிழ்</option>
                  <option value="te">తెలుగు</option>
                  <option value="gu">ગુજરાતી</option>
                  <option value="mr">मराठी</option>
                </select>
              </div>
            </div>

            {/* Title */}
            <div style={{ marginBottom:'1rem' }}>
              <label style={labelStyle}>Title *</label>
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder={`e.g. "Newton's Laws of Motion — Complete Notes"`}
                style={inputStyle} maxLength={200}/>
              <div style={{ fontSize:11, color:'#9ca3af', marginTop:3 }}>{title.length}/200</div>
            </div>

            {/* Content text */}
            <div style={{ marginBottom:'1rem' }}>
              <label style={labelStyle}>Content (text) — or upload PDF below</label>
              <textarea value={content} onChange={e=>setContent(e.target.value)} rows={8}
                placeholder="Paste your educational content here... Formulas, explanations, step-by-step solutions..."
                style={{...inputStyle, resize:'vertical'}}/>
              <div style={{ fontSize:11, color:'#9ca3af', marginTop:3 }}>{content.length} characters</div>
            </div>

            {/* PDF Upload */}
            <div style={{ marginBottom:'1.25rem' }}>
              <label style={labelStyle}>Or Upload PDF (max 20MB)</label>
              <div style={{ border:'2px dashed #e5e7eb', borderRadius:12, padding:'1.25rem', textAlign:'center', background:'#f9fafb', cursor:'pointer' }}
                onClick={()=>pdfRef.current?.click()}>
                {pdfFile ? (
                  <div>
                    <div style={{ fontSize:28, marginBottom:6 }}>📄</div>
                    <div style={{ fontWeight:700, color:'#374151', fontSize:14 }}>{pdfFile.name}</div>
                    <div style={{ fontSize:11, color:'#6b7280' }}>{(pdfFile.size/1024/1024).toFixed(2)} MB</div>
                    <button onClick={e=>{e.stopPropagation();setPdfFile(null);if(pdfRef.current)pdfRef.current.value=''}}
                      style={{ marginTop:8, fontSize:11, color:'#dc2626', background:'none', border:'none', cursor:'pointer', textDecoration:'underline', fontFamily:'inherit' }}>
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize:32, marginBottom:6 }}>📁</div>
                    <div style={{ fontSize:13, fontWeight:600, color:'#374151' }}>Click to upload PDF</div>
                    <div style={{ fontSize:11, color:'#9ca3af', marginTop:3 }}>PDF files only · Max 20MB</div>
                  </div>
                )}
                <input ref={pdfRef} type="file" accept=".pdf" onChange={handlePDFChange} style={{ display:'none' }}/>
              </div>
            </div>

            {/* Approval notice */}
            <div style={{ background:'#fef3c7', border:'1px solid #fde68a', borderRadius:10, padding:'0.875rem', marginBottom:'1.25rem', fontSize:13, color:'#78350f' }}>
              ⏳ <strong>Approval process:</strong> Your content will be reviewed by MscTutor moderators within 24 hours. Once approved, it becomes visible to students.
            </div>

            {/* Error */}
            {error && (
              <div style={{ background:'#fee2e2', border:'1px solid #fecaca', borderRadius:10, padding:'0.875rem', marginBottom:'1rem', fontSize:13, color:'#dc2626' }}>
                ❌ {error}
              </div>
            )}

            {/* Submit */}
            <div style={{ display:'flex', gap:'0.75rem', justifyContent:'flex-end' }}>
              <Link href="/teacher/dashboard" style={{ padding:'10px 20px', background:'#f3f4f6', color:'#374151', borderRadius:10, textDecoration:'none', fontWeight:700, fontSize:14 }}>
                Cancel
              </Link>
              <button onClick={handleSubmit} disabled={uploadState==='uploading'}
                style={{ padding:'10px 28px', background:uploadState==='uploading'?'#9ca3af':'#2563eb', color:'#fff', border:'none', borderRadius:10, fontWeight:700, fontSize:14, cursor:uploadState==='uploading'?'default':'pointer', fontFamily:'inherit' }}>
                {uploadState==='uploading' ? '⏳ Uploading...' : '📤 Submit for Review'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function TeacherUploadPage() {
  return (
    <AuthGuard allowedRoles={['teacher','school_admin','super_admin','content_admin']}>
      <TeacherUploadContent />
    </AuthGuard>
  )
}
