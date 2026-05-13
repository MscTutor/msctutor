'use client'
// app/(auth)/register/page.tsx — Complete role-based registration with profile ID

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Role = 'student' | 'teacher' | 'school'
type Step = 1 | 2 | 3

const SUBJECTS = ['Mathematics','Physics','Chemistry','Biology','English','Hindi','Social Science','Accountancy','Economics','Computer Science','Other']
const CLASSES  = ['1','2','3','4','5','6','7','8','9','10','11','12']
const BOARDS   = ['CBSE','ICSE','State Board','IB','IGCSE']

function generateProfileId(name: string, role: Role): string {
  const prefix   = role === 'student' ? 'STU' : role === 'teacher' ? 'TCH' : 'SCH'
  const namePart = name.replace(/\s+/g, '').toUpperCase().slice(0, 4).padEnd(4, 'X')
  const random   = Math.random().toString(36).substring(2, 6).toUpperCase()
  const year     = new Date().getFullYear().toString().slice(-2)
  return `${prefix}-${namePart}-${year}${random}`
}

export default function RegisterPage() {
  const router = useRouter()
  const [step,      setStep]      = useState<Step>(1)
  const [role,      setRole]      = useState<Role>('student')
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')
  const [profileId, setProfileId] = useState('')
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '',
    schoolId: '', schoolName: '', subject: '', classTeach: '',
    schoolAddress: '', schoolBoard: 'CBSE',
  })

  const upd = (k: string, v: string) => { setForm(p => ({ ...p, [k]: v })); setError('') }

  const ROLE_OPTIONS = [
    { role: 'student' as Role, icon: '🎓', title: 'Student',           desc: 'Access AI questions, mock tests, formulas & all chapters free',    color: '#1a3a6b', bg: '#e8eef8' },
    { role: 'teacher' as Role, icon: '👩‍🏫', title: 'Teacher',          desc: 'Manage classes, create exams, attendance & smart teaching mode',   color: '#0a5e3f', bg: '#e8f5ef' },
    { role: 'school'  as Role, icon: '🏫', title: 'School / Principal', desc: 'Complete school management — all teachers, students & analytics', color: '#7c3400', bg: '#fdf0e6' },
  ]

  async function register() {
    if (!form.name.trim())        return setError('Name is required')
    if (!form.email.trim())       return setError('Email is required')
    if (!form.email.includes('@'))return setError('Enter valid email')
    if (form.password.length < 6) return setError('Password must be 6+ characters')

    setLoading(true)
    try {
      const { auth, googleProvider } = await import('@/lib/firebase')
      const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth')

      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password)
      await updateProfile(cred.user, { displayName: form.name })

      const pid = generateProfileId(form.name, role)
      setProfileId(pid)

      const res = await fetch('/api/auth/register', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          uid: cred.user.uid, name: form.name.trim(), email: form.email.trim(),
          phone: form.phone || null, role, profileId: pid,
          schoolId: form.schoolId || null, schoolName: form.schoolName || null,
          subject: form.subject || null, classTeach: form.classTeach || null,
          schoolAddress: form.schoolAddress || null, schoolBoard: form.schoolBoard || null,
        }),
      })
      if (!res.ok) throw new Error((await res.json()).error ?? 'Registration failed')

      const token = await cred.user.getIdToken()
      document.cookie = `msc_auth_token=${token};path=/;max-age=${7*24*3600};SameSite=Lax`
      document.cookie = `msc_user_role=${role};path=/;max-age=${7*24*3600};SameSite=Lax`
      setStep(3)
    } catch (e: any) {
      setError(e.message ?? 'Registration failed')
    }
    setLoading(false)
  }

  async function googleSignIn() {
    setLoading(true)
    try {
      const { auth, googleProvider } = await import('@/lib/firebase')
      const { signInWithPopup } = await import('firebase/auth')
      const result = await signInWithPopup(auth, googleProvider)
      const user   = result.user
      const pid    = generateProfileId(user.displayName ?? 'User', role)
      setProfileId(pid)

      await fetch('/api/auth/register', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ uid: user.uid, name: user.displayName ?? 'User', email: user.email, role, profileId: pid, photoUrl: user.photoURL }),
      })

      const token = await user.getIdToken()
      document.cookie = `msc_auth_token=${token};path=/;max-age=${7*24*3600};SameSite=Lax`
      document.cookie = `msc_user_role=${role};path=/;max-age=${7*24*3600};SameSite=Lax`
      setStep(3)
    } catch (e: any) { setError(e.message) }
    setLoading(false)
  }

  const inputStyle = { width: '100%', padding: '10px 12px', border: '1.5px solid #e5e7eb', borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' as const }
  const labelStyle = { display: 'block' as const, fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 5 }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ width: '100%', maxWidth: 520 }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <Link href="/" style={{ textDecoration: 'none', fontSize: 26, fontWeight: 900, color: '#1a3a6b' }}>
            Msc<span style={{ color: '#f59e0b' }}>Tutor</span>.in
          </Link>
          <p style={{ color: '#6b7280', fontSize: 13, marginTop: 4 }}>
            {step === 1 ? 'Choose your account type' : step === 2 ? `Create ${role} account` : 'Account created successfully!'}
          </p>
        </div>

        {/* Progress */}
        <div style={{ display: 'flex', gap: 6, marginBottom: '1.5rem' }}>
          {[1,2,3].map(s => <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: step >= s ? '#1a3a6b' : '#e5e7eb', transition: 'all .3s' }} />)}
        </div>

        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #e5e7eb', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,.06)' }}>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111', margin: '0 0 1.25rem', textAlign: 'center' }}>I am a...</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                {ROLE_OPTIONS.map(opt => (
                  <button key={opt.role} onClick={() => { setRole(opt.role); setStep(2) }}
                    style={{ padding: '1.25rem', borderRadius: 14, border: `2px solid ${role === opt.role ? opt.color : '#e5e7eb'}`, background: '#fff', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'inherit', transition: 'all .15s' }}>
                    <span style={{ fontSize: 40, flexShrink: 0 }}>{opt.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: 17, color: '#111' }}>{opt.title}</div>
                      <div style={{ fontSize: 12, color: '#6b7280', marginTop: 3, lineHeight: 1.5 }}>{opt.desc}</div>
                    </div>
                    <span style={{ fontSize: 20, color: '#9ca3af' }}>›</span>
                  </button>
                ))}
              </div>
              <p style={{ textAlign: 'center', fontSize: 13, color: '#6b7280' }}>
                Already have an account? <Link href="/login" style={{ color: '#1a3a6b', fontWeight: 700, textDecoration: 'none' }}>Login →</Link>
              </p>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
                <button onClick={() => setStep(1)} style={{ background: '#f3f4f6', border: 'none', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit' }}>← Back</button>
                <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>
                  {role === 'student' ? '🎓' : role === 'teacher' ? '👩‍🏫' : '🏫'} {role.charAt(0).toUpperCase() + role.slice(1)} Account
                </h2>
              </div>

              {/* Google */}
              <button onClick={googleSignIn} disabled={loading}
                style={{ width: '100%', padding: '11px', border: '1.5px solid #e5e7eb', borderRadius: 12, background: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: '1rem' }}>
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width={20} alt="G" />
                Continue with Google
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
                <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
                <span style={{ fontSize: 12, color: '#9ca3af' }}>or fill details</span>
                <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {[
                  { label: 'Full Name *', k: 'name', type: 'text', ph: 'Your full name' },
                  { label: 'Email *', k: 'email', type: 'email', ph: 'your@email.com' },
                  { label: 'Password *', k: 'password', type: 'password', ph: 'Min 6 characters' },
                  { label: 'Phone (optional)', k: 'phone', type: 'tel', ph: '+91 XXXXX XXXXX' },
                ].map(f => (
                  <div key={f.k}>
                    <label style={labelStyle}>{f.label}</label>
                    <input type={f.type} value={(form as Record<string,string>)[f.k]}
                      onChange={e => upd(f.k, e.target.value)} placeholder={f.ph} style={inputStyle} />
                  </div>
                ))}

                {/* Teacher optional */}
                {role === 'teacher' && (
                  <>
                    <div style={{ background: '#e8f5ef', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: '#0a5e3f', fontWeight: 600 }}>👩‍🏫 Teacher info (optional)</div>
                    <div>
                      <label style={labelStyle}>School Profile ID (optional)</label>
                      <input value={form.schoolId} onChange={e => upd('schoolId', e.target.value)} placeholder="SCH-XXXX-YYYY" style={inputStyle} />
                      <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 3 }}>Get this from your school admin to link accounts</div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <label style={labelStyle}>Subject</label>
                        <select value={form.subject} onChange={e => upd('subject', e.target.value)} style={{ ...inputStyle, padding: '10px' }}>
                          <option value="">Select</option>
                          {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>Class</label>
                        <select value={form.classTeach} onChange={e => upd('classTeach', e.target.value)} style={{ ...inputStyle, padding: '10px' }}>
                          <option value="">Select</option>
                          {CLASSES.map(c => <option key={c} value={c}>Class {c}</option>)}
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* School admin optional */}
                {role === 'school' && (
                  <>
                    <div style={{ background: '#fdf0e6', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: '#7c3400', fontWeight: 600 }}>🏫 School information</div>
                    {[
                      { label: 'School Name *', k: 'schoolName', ph: 'Enter school name' },
                      { label: 'School Address', k: 'schoolAddress', ph: 'City, State' },
                    ].map(f => (
                      <div key={f.k}>
                        <label style={labelStyle}>{f.label}</label>
                        <input value={(form as Record<string,string>)[f.k]} onChange={e => upd(f.k, e.target.value)} placeholder={f.ph} style={inputStyle} />
                      </div>
                    ))}
                    <div>
                      <label style={labelStyle}>Board</label>
                      <select value={form.schoolBoard} onChange={e => upd('schoolBoard', e.target.value)} style={{ ...inputStyle, padding: '10px' }}>
                        {BOARDS.map(b => <option key={b}>{b}</option>)}
                      </select>
                    </div>
                  </>
                )}

                {/* Student school link */}
                {role === 'student' && (
                  <div>
                    <label style={labelStyle}>School Profile ID (optional)</label>
                    <input value={form.schoolId} onChange={e => upd('schoolId', e.target.value)} placeholder="SCH-XXXX-YYYY" style={inputStyle} />
                    <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 3 }}>Link to your school for class materials & exams</div>
                  </div>
                )}

                {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px 12px', borderRadius: 10, fontSize: 13, fontWeight: 600 }}>⚠️ {error}</div>}

                <button onClick={register} disabled={loading}
                  style={{ padding: '13px', background: loading ? '#9ca3af' : '#1a3a6b', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 800, cursor: loading ? 'default' : 'pointer', fontFamily: 'inherit' }}>
                  {loading ? '⏳ Creating...' : '✅ Create Account →'}
                </button>

                <p style={{ textAlign: 'center', fontSize: 12, color: '#9ca3af', margin: 0 }}>
                  By registering you agree to our <Link href="/terms" style={{ color: '#1a3a6b' }}>Terms</Link> &amp; <Link href="/privacy" style={{ color: '#1a3a6b' }}>Privacy</Link>
                </p>
              </div>
            </>
          )}

          {/* STEP 3 — Success */}
          {step === 3 && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 72, marginBottom: '1rem' }}>🎉</div>
              <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: '0.5rem' }}>Welcome to MscTutor!</h2>
              <p style={{ color: '#6b7280', fontSize: 14, marginBottom: '1.5rem' }}>
                Your {role} account is ready to use.
              </p>
              <div style={{ background: 'linear-gradient(135deg,#1a3a6b,#0e2347)', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>
                <div style={{ fontSize: 11, opacity: .75, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Your Unique Profile ID</div>
                <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 3, color: '#f59e0b', fontFamily: 'monospace' }}>{profileId}</div>
                <div style={{ fontSize: 11, opacity: .7, marginTop: 6 }}>📌 Save this ID — share with school/students to link your account</div>
              </div>
              {role === 'teacher' && form.subject && (
                <div style={{ background: '#e8f5ef', borderRadius: 10, padding: '10px', marginBottom: '1rem', fontSize: 13, color: '#0a5e3f', fontWeight: 700 }}>
                  📚 {form.subject} Teacher {form.classTeach ? `• Class ${form.classTeach}` : ''}
                </div>
              )}
              <button onClick={() => router.push(role === 'student' ? '/dashboard' : role === 'teacher' ? '/teacher/dashboard' : '/school-dashboard')}
                style={{ width: '100%', padding: '13px', background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', marginBottom: '0.75rem' }}>
                Go to Dashboard →
              </button>
              <Link href="/" style={{ display: 'block', padding: '11px', background: '#f3f4f6', color: '#374151', borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>
                Explore MscTutor First
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
