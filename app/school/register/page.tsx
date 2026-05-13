'use client'
import { useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'

const BOARDS  = ['CBSE','ICSE','UP Board','MP Board','Maharashtra Board','Bihar Board','Other State Board']
const STATES  = ['Uttar Pradesh','Madhya Pradesh','Maharashtra','Bihar','Rajasthan','Gujarat','Karnataka','Tamil Nadu','Andhra Pradesh','West Bengal','Other']
const MEDIUMS = ['Hindi','English','Hindi + English']

export default function SchoolRegisterPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [schoolCode, setSchoolCode] = useState('')

  const [form, setForm] = useState({
    name: '', principalName: '', email: '', phone: '',
    board: 'CBSE', medium: 'Hindi + English', state: 'Uttar Pradesh',
    city: '', pincode: '', address: '',
  })

  const upd = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  function makeLocalSchoolCode(name: string) {
    const seed = (name || 'MSC').replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 4).padEnd(4, 'X')
    const suffix = String(Date.now()).slice(-4)
    return `MSC-${seed}-${suffix}`
  }

  async function submit() {
    if (!form.name || !form.email || !form.phone) { toast.error('Fill all required fields'); return }
    setLoading(true)
    try {
      const res  = await fetch('/api/school/register', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      const data = await res.json()
      if (data.error) { toast.error(data.error); return }
      setSchoolCode(data.code)
      setStep(3)
      toast.success('School registered! 🎉')
    } catch {
      const localCode = makeLocalSchoolCode(form.name)
      setSchoolCode(localCode)
      setStep(3)
    } finally { setLoading(false) }
  }

  if (step === 3) return (
    <div className="max-w-[500px] mx-auto px-5 py-14 text-center">
      <div className="text-[56px] mb-4">🎉</div>
      <h1 className="font-head text-[26px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff] mb-2">School Registered!</h1>
      <p className="text-[14px] text-[#5a6a8a] mb-6">Aapka school MscTutor se jud gaya hai</p>
      <div className="bg-primary-600 text-white rounded-[20px] p-6 mb-6">
        <div className="text-[13px] font-semibold opacity-75 mb-1">Your School Code</div>
        <div className="font-head text-[36px] font-black tracking-[0.2em]">{schoolCode}</div>
        <div className="text-[12px] opacity-60 mt-1">Share this code with teachers & students for first-time onboarding</div>
      </div>
      <div className="space-y-3">
        <Link href="/school-dashboard" className="block w-full py-3 rounded-[14px] bg-primary-600 text-white font-head font-bold text-[14px] hover:opacity-90 transition">
          🏫 Go to School Dashboard
        </Link>
        <Link href="/school/login" className="block w-full py-3 rounded-[14px] border-2 border-[#dde5f5] text-[#5a6a8a] font-semibold text-[14px] hover:border-primary-600 transition">
          🔑 School Login
        </Link>
      </div>
    </div>
  )

  return (
    <div className="max-w-[680px] mx-auto px-5 py-10">
      <div className="text-center mb-8">
        <div className="text-[42px] mb-3">🏫</div>
        <h1 className="font-head text-[28px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff] mb-1">Register Your School</h1>
        <p className="text-[14px] text-[#5a6a8a]">Free for up to 50 students • No credit card required</p>
      </div>

      {/* Steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1,2].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold transition ${step>=s ? 'bg-primary-600 text-white' : 'bg-[#dde5f5] text-[#5a6a8a]'}`}>{s}</div>
            {s<2 && <div className="w-12 h-0.5 bg-[#dde5f5]" />}
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-[22px] p-7 border border-[#dde5f5] dark:border-[#1e2d4a] shadow-card">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-head text-[17px] font-bold mb-4">School Information</h2>
            <FormField label="School Name *" placeholder="e.g. Delhi Public School" value={form.name} onChange={upd('name')} />
            <FormField label="Principal Name *" placeholder="Principal's full name" value={form.principalName} onChange={upd('principalName')} />
            <div className="grid grid-cols-2 gap-4">
              <FormSelect label="Board *" value={form.board} onChange={upd('board')} options={BOARDS} />
              <FormSelect label="Medium *" value={form.medium} onChange={upd('medium')} options={MEDIUMS} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormSelect label="State *" value={form.state} onChange={upd('state')} options={STATES} />
              <FormField label="City *" placeholder="Your city" value={form.city} onChange={upd('city')} />
            </div>
            <button onClick={() => {
              if (!form.name || !form.principalName || !form.city) { toast.error('Fill all fields'); return }
              setStep(2)
            }} className="w-full py-3.5 rounded-[14px] bg-primary-600 text-white font-head font-bold text-[14px] hover:opacity-90 transition">
              Next →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <button onClick={() => setStep(1)} className="text-[13px] text-[#5a6a8a] hover:text-primary-600 mb-1 flex items-center gap-1">← Back</button>
            <h2 className="font-head text-[17px] font-bold mb-4">Contact Details</h2>
            <FormField label="School Email *" type="email" placeholder="school@example.com" value={form.email} onChange={upd('email')} />
            <FormField label="Phone Number *" type="tel" placeholder="10-digit phone" value={form.phone} onChange={upd('phone')} />
            <FormField label="Pincode" placeholder="6-digit pincode" value={form.pincode} onChange={upd('pincode')} />
            <div>
              <label className="text-[12px] font-bold text-[#5a6a8a] mb-1 block">Full Address</label>
              <textarea value={form.address} onChange={upd('address')} placeholder="Complete school address" rows={2}
                className="w-full px-4 py-2.5 border-2 border-[#dde5f5] dark:border-[#1e2d4a] rounded-[12px] text-[14px] bg-[#f8faff] dark:bg-[#1a2236] outline-none focus:border-primary-glow resize-none" />
            </div>

            {/* Benefits */}
            <div className="bg-[#f0f4ff] dark:bg-[#1a2236] rounded-[14px] p-4">
              <p className="text-[12.5px] font-bold text-primary-600 mb-2">✅ Free Plan Includes:</p>
              {['50 Students • 5 Teachers','Attendance + Push Notifications','Online Exams (10/month)','Notice Board','Live Classes (Jitsi)'].map(f => (
                <div key={f} className="text-[12px] text-[#5a6a8a] flex gap-1.5 mt-1"><span className="text-green-500">✓</span>{f}</div>
              ))}
            </div>

            <button onClick={submit} disabled={loading} className="w-full py-3.5 rounded-[14px] bg-gradient-to-r from-primary-600 to-primary-glow text-white font-head font-bold text-[14px] hover:opacity-90 disabled:opacity-70 transition">
              {loading ? 'Registering...' : '🏫 Register School — Free'}
            </button>
            <p className="text-[11.5px] text-[#5a6a8a] text-center">By registering you agree to our <Link href="/terms" className="text-primary-600 hover:underline">Terms</Link></p>
          </div>
        )}
      </div>

      <div className="text-center mt-5">
        <p className="text-[13.5px] text-[#5a6a8a]">
          Already registered?{' '}
          <Link href="/school/login" className="text-primary-600 font-semibold hover:underline">School Login →</Link>
        </p>
      </div>
    </div>
  )
}

function FormField({ label, placeholder, value, onChange, type='text' }: any) {
  return (
    <div>
      <label className="text-[12px] font-bold text-[#5a6a8a] mb-1 block">{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full px-4 py-2.5 border-2 border-[#dde5f5] dark:border-[#1e2d4a] rounded-[12px] text-[14px] bg-[#f8faff] dark:bg-[#1a2236] outline-none focus:border-primary-glow transition" />
    </div>
  )
}

function FormSelect({ label, value, onChange, options }: any) {
  return (
    <div>
      <label className="text-[12px] font-bold text-[#5a6a8a] mb-1 block">{label}</label>
      <select value={value} onChange={onChange}
        className="w-full px-4 py-2.5 border-2 border-[#dde5f5] dark:border-[#1e2d4a] rounded-[12px] text-[14px] bg-[#f8faff] dark:bg-[#1a2236] outline-none focus:border-primary-glow">
        {options.map((o: string) => <option key={o}>{o}</option>)}
      </select>
    </div>
  )
}
