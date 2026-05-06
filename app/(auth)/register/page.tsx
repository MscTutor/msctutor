'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  signInWithPopup, createUserWithEmailAndPassword,
  updateProfile, RecaptchaVerifier, signInWithPhoneNumber
} from 'firebase/auth'
import { auth, firebaseReady, googleProvider } from '@/lib/firebase'
import toast from 'react-hot-toast'

type Mode = 'options' | 'email' | 'phone' | 'otp'

export default function RegisterPage() {
  const router          = useRouter()
  const [mode, setMode] = useState<Mode>('options')
  const [name, setName] = useState('')
  const [email, setEmail]   = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone]   = useState('')
  const [otp, setOtp]       = useState('')
  const [loading, setLoading] = useState(false)
  const [confirmResult, setConfirmResult] = useState<any>(null)

  async function registerGoogle() {
    if (!auth || !googleProvider || !firebaseReady) { toast.error('Firebase config not added yet'); return }
    setLoading(true)
    try {
      const result = await signInWithPopup(auth, googleProvider)
      await saveUser(result.user.uid, result.user.displayName ?? '', result.user.email ?? '')
      toast.success(`Welcome to MscTutor, ${result.user.displayName}! 🎉`)
      router.push('/dashboard')
    } catch (err: any) {
      toast.error(err.message ?? 'Google registration failed')
    } finally { setLoading(false) }
  }

  async function registerEmail() {
    if (!auth || !firebaseReady) { toast.error('Firebase config not added yet'); return }
    if (!name || !email || !password) { toast.error('Fill all fields'); return }
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(result.user, { displayName: name })
      await saveUser(result.user.uid, name, email)
      toast.success('Account created! 🎉')
      router.push('/dashboard')
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') toast.error('Email already registered. Try login.')
      else toast.error(err.message)
    } finally { setLoading(false) }
  }

  async function sendOTP() {
    if (!auth || !firebaseReady) { toast.error('Firebase config not added yet'); return }
    if (!phone) { toast.error('Enter phone number'); return }
    setLoading(true)
    try {
      if (!(window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-reg', { size: 'invisible' })
      }
      const phoneNum = phone.startsWith('+') ? phone : `+91${phone}`
      const result   = await signInWithPhoneNumber(auth, phoneNum, (window as any).recaptchaVerifier)
      setConfirmResult(result)
      setMode('otp')
      toast.success('OTP sent! Check your phone.')
    } catch (err: any) {
      toast.error(err.message ?? 'Failed to send OTP')
    } finally { setLoading(false) }
  }

  async function verifyOTP() {
    if (!auth || !firebaseReady) { toast.error('Firebase config not added yet'); return }
    if (!otp || !confirmResult) return
    setLoading(true)
    try {
      const result = await confirmResult.confirm(otp)
      await saveUser(result.user.uid, name || `User${phone.slice(-4)}`, result.user.phoneNumber ?? '')
      toast.success('Registered successfully! 🎉')
      router.push('/dashboard')
    } catch {
      toast.error('Wrong OTP')
    } finally { setLoading(false) }
  }

  async function saveUser(uid: string, name: string, email: string) {
    await fetch('/api/auth/register', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ uid, name, email }),
    }).catch(() => { /* silent */ })
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-[16px] bg-gradient-to-br from-primary-600 to-primary-glow flex items-center justify-center text-white font-head font-black text-[24px] shadow-card mx-auto mb-3">M</div>
          <h1 className="font-head text-[24px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff]">Create Free Account</h1>
          <p className="text-[13.5px] text-[#5a6a8a] mt-1">Join 10 lakh+ students on MscTutor</p>
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-[22px] p-7 border-[1.5px] border-[#dde5f5] dark:border-[#1e2d4a] shadow-card">
          {mode === 'options' && (
            <div className="space-y-3">
              <button
                onClick={registerGoogle}
                disabled={loading}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-[14px] border-2 border-[#dde5f5] dark:border-[#1e2d4a] hover:border-primary-600 bg-white dark:bg-[#1a2236] text-[#0f1f3d] dark:text-[#e8eeff] font-medium text-[14px] transition"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Google
              </button>
              <button onClick={() => setMode('email')} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-[14px] border-2 border-[#dde5f5] dark:border-[#1e2d4a] hover:border-primary-600 text-[#0f1f3d] dark:text-[#e8eeff] font-medium text-[14px] transition">
                <span className="text-[20px]">📧</span> Sign up with Email
              </button>
              <button onClick={() => setMode('phone')} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-[14px] border-2 border-[#dde5f5] dark:border-[#1e2d4a] hover:border-primary-600 text-[#0f1f3d] dark:text-[#e8eeff] font-medium text-[14px] transition">
                <span className="text-[20px]">📱</span> Sign up with Mobile OTP
              </button>
              <div id="recaptcha-reg" />
              <p className="text-[11.5px] text-[#5a6a8a] text-center pt-1">
                By signing up you agree to our{' '}
                <Link href="/terms" className="text-primary-600 hover:underline">Terms</Link> &{' '}
                <Link href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>
              </p>
            </div>
          )}

          {mode === 'email' && (
            <div>
              <button onClick={() => setMode('options')} className="text-[13px] text-[#5a6a8a] hover:text-primary-600 mb-4">← Back</button>
              <h2 className="font-head text-[17px] font-bold mb-4">Create Account</h2>
              <div className="space-y-3">
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" className="w-full px-4 py-3 border-2 border-[#dde5f5] dark:border-[#1e2d4a] rounded-[12px] text-[14px] bg-[#f8faff] dark:bg-[#1a2236] outline-none focus:border-primary-glow" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="w-full px-4 py-3 border-2 border-[#dde5f5] dark:border-[#1e2d4a] rounded-[12px] text-[14px] bg-[#f8faff] dark:bg-[#1a2236] outline-none focus:border-primary-glow" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password (min 6 chars)" onKeyDown={e => e.key === 'Enter' && registerEmail()} className="w-full px-4 py-3 border-2 border-[#dde5f5] dark:border-[#1e2d4a] rounded-[12px] text-[14px] bg-[#f8faff] dark:bg-[#1a2236] outline-none focus:border-primary-glow" />
                <button onClick={registerEmail} disabled={loading} className="w-full py-3.5 rounded-[12px] bg-primary-600 text-white font-head font-bold text-[14px] hover:opacity-90 disabled:opacity-70 transition">
                  {loading ? 'Creating account...' : 'Create Account →'}
                </button>
              </div>
            </div>
          )}

          {mode === 'phone' && (
            <div>
              <button onClick={() => setMode('options')} className="text-[13px] text-[#5a6a8a] hover:text-primary-600 mb-4">← Back</button>
              <h2 className="font-head text-[17px] font-bold mb-4">Sign up with Mobile</h2>
              <div className="space-y-3">
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name (optional)" className="w-full px-4 py-3 border-2 border-[#dde5f5] dark:border-[#1e2d4a] rounded-[12px] text-[14px] bg-[#f8faff] dark:bg-[#1a2236] outline-none focus:border-primary-glow" />
                <div className="flex gap-2">
                  <div className="px-3 py-3 border-2 border-[#dde5f5] rounded-[12px] text-[14px] bg-[#f8faff] font-bold">🇮🇳 +91</div>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="10-digit mobile" maxLength={10} className="flex-1 px-4 py-3 border-2 border-[#dde5f5] dark:border-[#1e2d4a] rounded-[12px] text-[14px] bg-[#f8faff] dark:bg-[#1a2236] outline-none focus:border-primary-glow" />
                </div>
                <div id="recaptcha-reg" />
                <button onClick={sendOTP} disabled={loading || phone.length !== 10} className="w-full py-3.5 rounded-[12px] bg-primary-600 text-white font-head font-bold text-[14px] hover:opacity-90 disabled:opacity-70 transition">
                  {loading ? 'Sending OTP...' : 'Send OTP →'}
                </button>
              </div>
            </div>
          )}

          {mode === 'otp' && (
            <div>
              <div className="text-center mb-5">
                <div className="text-[36px] mb-2">📱</div>
                <p className="text-[14px] text-[#5a6a8a]">OTP sent to +91 {phone}</p>
              </div>
              <div className="space-y-3">
                <input type="number" value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter 6-digit OTP" maxLength={6} className="w-full px-4 py-3 border-2 border-[#dde5f5] dark:border-[#1e2d4a] rounded-[12px] text-[16px] font-bold text-center bg-[#f8faff] dark:bg-[#1a2236] outline-none focus:border-primary-glow tracking-[0.3em]" />
                <button onClick={verifyOTP} disabled={loading || otp.length < 6} className="w-full py-3.5 rounded-[12px] bg-primary-600 text-white font-head font-bold text-[14px] hover:opacity-90 disabled:opacity-70 transition">
                  {loading ? 'Verifying...' : '✅ Verify & Register'}
                </button>
              </div>
            </div>
          )}

          <div className="mt-5 pt-5 border-t border-[#dde5f5] dark:border-[#1e2d4a] text-center">
            <p className="text-[13.5px] text-[#5a6a8a]">
              Already have an account?{' '}
              <Link href="/login" className="text-primary-600 font-semibold hover:underline">Sign In →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
