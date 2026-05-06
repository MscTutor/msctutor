'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function SchoolLoginPage() {
  const router = useRouter()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode]         = useState('')
  const [tab, setTab]           = useState<'email'|'code'>('email')
  const [loading, setLoading]   = useState(false)

  async function login() {
    setLoading(true)
    try {
      await new Promise(r => setTimeout(r, 800)) // simulate
      toast.success('Login successful! 🎉')
      router.push('/school-dashboard')
    } catch { toast.error('Login failed') }
    finally  { setLoading(false) }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <div className="text-[42px] mb-3">🏫</div>
          <h1 className="font-head text-[24px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff]">School Login</h1>
          <p className="text-[13.5px] text-[#5a6a8a] mt-1">Principal / Teacher / School Admin</p>
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-[22px] p-7 border border-[#dde5f5] dark:border-[#1e2d4a] shadow-card">
          {/* Tabs */}
          <div className="flex bg-[#f0f4ff] dark:bg-[#1a2236] rounded-[12px] p-1 mb-5">
            {[['email','📧 Email'],['code','🏫 School Code']].map(([id,label]) => (
              <button key={id} onClick={() => setTab(id as any)}
                className={`flex-1 py-2 rounded-[10px] text-[13px] font-semibold transition ${tab===id ? 'bg-white dark:bg-[#111827] text-primary-600 shadow-sm' : 'text-[#5a6a8a]'}`}>
                {label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {tab === 'email' ? (
              <>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="school@example.com"
                  className="w-full px-4 py-3 border-2 border-[#dde5f5] dark:border-[#1e2d4a] rounded-[12px] text-[14px] bg-[#f8faff] dark:bg-[#1a2236] outline-none focus:border-primary-glow" />
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"
                  onKeyDown={e=>e.key==='Enter'&&login()}
                  className="w-full px-4 py-3 border-2 border-[#dde5f5] dark:border-[#1e2d4a] rounded-[12px] text-[14px] bg-[#f8faff] dark:bg-[#1a2236] outline-none focus:border-primary-glow" />
              </>
            ) : (
              <>
                <input value={code} onChange={e=>setCode(e.target.value.toUpperCase())} placeholder="School Code (MSC-XXXX)"
                  className="w-full px-4 py-3 border-2 border-[#dde5f5] dark:border-[#1e2d4a] rounded-[12px] text-[14px] font-mono font-bold bg-[#f8faff] dark:bg-[#1a2236] outline-none focus:border-primary-glow tracking-widest" />
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"
                  onKeyDown={e=>e.key==='Enter'&&login()}
                  className="w-full px-4 py-3 border-2 border-[#dde5f5] dark:border-[#1e2d4a] rounded-[12px] text-[14px] bg-[#f8faff] dark:bg-[#1a2236] outline-none focus:border-primary-glow" />
              </>
            )}
            <button onClick={login} disabled={loading}
              className="w-full py-3.5 rounded-[12px] bg-primary-600 text-white font-head font-bold text-[14px] hover:opacity-90 disabled:opacity-70 transition">
              {loading ? 'Logging in...' : '🔑 Login to School Dashboard'}
            </button>
          </div>

          <div className="mt-5 pt-5 border-t border-[#dde5f5] dark:border-[#1e2d4a] text-center space-y-2">
            <p className="text-[13px] text-[#5a6a8a]">
              New school?{' '}
              <Link href="/school/register" className="text-primary-600 font-semibold hover:underline">Register Free →</Link>
            </p>
            <p className="text-[13px] text-[#5a6a8a]">
              Student login?{' '}
              <Link href="/login" className="text-primary-600 hover:underline">Click here →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
