'use client'
// app/(auth)/login/page.tsx — Production login

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const redirect     = searchParams.get('redirect')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const { auth } = await import('@/lib/firebase')
      const { signInWithEmailAndPassword } = await import('firebase/auth')
      const cred  = await signInWithEmailAndPassword(auth, email, password)
      const token = await cred.user.getIdToken()
      document.cookie = `msc_auth_token=${token};path=/;max-age=${7*24*3600};SameSite=Lax`
      const res  = await fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      const data = res.ok ? await res.json() : {}
      const role = data?.user?.role ?? 'student'
      document.cookie = `msc_user_role=${role};path=/;max-age=${7*24*3600};SameSite=Lax`
      if (redirect) { router.push(redirect); return }
      router.push(role === 'teacher' ? '/teacher/dashboard' : role === 'school_admin' ? '/school-dashboard' : role.includes('admin') ? '/admin' : '/dashboard')
    } catch (e: any) {
      setError(e.code === 'auth/invalid-credential' ? 'Invalid email or password' : e.message ?? 'Login failed')
    }
    setLoading(false)
  }

  async function googleLogin() {
    setLoading(true); setError('')
    try {
      const { auth, googleProvider } = await import('@/lib/firebase')
      const { signInWithPopup } = await import('firebase/auth')
      const result = await signInWithPopup(auth, googleProvider)
      const token  = await result.user.getIdToken()
      document.cookie = `msc_auth_token=${token};path=/;max-age=${7*24*3600};SameSite=Lax`
      await fetch('/api/auth/register', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ uid:result.user.uid, name:result.user.displayName, email:result.user.email }) })
      router.push(redirect ?? '/dashboard')
    } catch (e: any) { setError(e.message) }
    setLoading(false)
  }

  const inp = { width:'100%', padding:'10px 12px', border:'1.5px solid #e5e7eb', borderRadius:10, fontSize:14, outline:'none', fontFamily:'inherit', boxSizing:'border-box' as const }

  return (
    <div style={{ minHeight:'100vh', background:'#f8f9fc', display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem 1rem' }}>
      <div style={{ width:'100%', maxWidth:420 }}>
        <div style={{ textAlign:'center', marginBottom:'1.75rem' }}>
          <Link href="/" style={{ textDecoration:'none', fontSize:26, fontWeight:900, color:'#1a3a6b' }}>Msc<span style={{color:'#f59e0b'}}>Tutor</span>.in</Link>
          <p style={{ color:'#6b7280', fontSize:13, marginTop:4 }}>{redirect ? '🔒 Login to continue' : 'Welcome back!'}</p>
        </div>
        <div style={{ background:'#fff', borderRadius:20, border:'1px solid #e5e7eb', padding:'2rem', boxShadow:'0 4px 20px rgba(0,0,0,.06)' }}>
          <button onClick={googleLogin} disabled={loading} style={{ width:'100%', padding:'11px', border:'1.5px solid #e5e7eb', borderRadius:12, background:'#fff', cursor:'pointer', fontFamily:'inherit', fontSize:14, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', gap:10, marginBottom:'1.25rem' }}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width={20} alt="G" />
            Continue with Google
          </button>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:'1.25rem' }}>
            <div style={{ flex:1, height:1, background:'#e5e7eb' }} />
            <span style={{ fontSize:12, color:'#9ca3af' }}>or email</span>
            <div style={{ flex:1, height:1, background:'#e5e7eb' }} />
          </div>
          <form onSubmit={handleLogin} style={{ display:'flex', flexDirection:'column', gap:'0.875rem' }}>
            <div><label style={{ display:'block', fontSize:12, fontWeight:700, color:'#374151', marginBottom:5 }}>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="your@email.com" style={inp} /></div>
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}><label style={{ fontSize:12, fontWeight:700, color:'#374151' }}>Password</label><Link href="/forgot-password" style={{ fontSize:12, color:'#1a3a6b', textDecoration:'none' }}>Forgot?</Link></div>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="Your password" style={inp} />
            </div>
            {error && <div style={{ background:'#fee2e2', color:'#dc2626', padding:'10px 12px', borderRadius:10, fontSize:13, fontWeight:600 }}>⚠️ {error}</div>}
            <button type="submit" disabled={loading} style={{ padding:'13px', background:loading?'#9ca3af':'#1a3a6b', color:'#fff', border:'none', borderRadius:12, fontSize:15, fontWeight:800, cursor:'pointer', fontFamily:'inherit' }}>
              {loading ? '⏳ Logging in...' : '🔐 Login →'}
            </button>
          </form>
          <p style={{ textAlign:'center', fontSize:13, color:'#6b7280', marginTop:'1.25rem', marginBottom:0 }}>
            No account? <Link href="/register" style={{ color:'#1a3a6b', fontWeight:700, textDecoration:'none' }}>Register Free →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
