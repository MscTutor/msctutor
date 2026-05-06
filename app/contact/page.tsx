'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { SITE } from '@/lib/constants'

export default function ContactPage() {
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  async function send() {
    if (!name || !email || !message) { toast.error('Fill all required fields'); return }
    setSending(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      })
      toast.success('Message sent! We will reply within 24-48 hours. 📧')
      setName(''); setEmail(''); setSubject(''); setMessage('')
    } catch { toast.error('Error sending. Email us at contact@msctutor.in') }
    finally  { setSending(false) }
  }

  return (
    <div className="max-w-[700px] mx-auto px-5 py-12">
      <div className="text-center mb-8">
        <div className="text-[42px] mb-3">📬</div>
        <h1 className="font-head text-[28px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff]">Contact Us</h1>
        <p className="text-[14px] text-[#5a6a8a] mt-1">We respond within 24-48 hours</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: '📧', title: 'General',  email: 'contact@msctutor.in' },
          { icon: '🏫', title: 'Schools',  email: 'schools@msctutor.in' },
          { icon: '⚖️', title: 'Legal',    email: 'legal@msctutor.in'   },
        ].map(c => (
          <div key={c.title} className="bg-white dark:bg-[#111827] rounded-[16px] p-4 border border-[#dde5f5] dark:border-[#1e2d4a] text-center">
            <div className="text-[24px] mb-1">{c.icon}</div>
            <div className="text-[13px] font-bold text-[#0f1f3d] dark:text-[#e8eeff]">{c.title}</div>
            <div className="text-[12px] text-primary-600">{c.email}</div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-[22px] p-7 border border-[#dde5f5] dark:border-[#1e2d4a] shadow-card">
        <h2 className="font-head text-[17px] font-bold mb-5 text-[#0f1f3d] dark:text-[#e8eeff]">Send a Message</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[12px] font-bold text-[#5a6a8a] mb-1 block">Name *</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="w-full px-4 py-2.5 border-2 border-[#dde5f5] dark:border-[#1e2d4a] rounded-[12px] text-[14px] bg-[#f8faff] dark:bg-[#1a2236] outline-none focus:border-primary-glow" />
            </div>
            <div>
              <label className="text-[12px] font-bold text-[#5a6a8a] mb-1 block">Email *</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="w-full px-4 py-2.5 border-2 border-[#dde5f5] dark:border-[#1e2d4a] rounded-[12px] text-[14px] bg-[#f8faff] dark:bg-[#1a2236] outline-none focus:border-primary-glow" />
            </div>
          </div>
          <div>
            <label className="text-[12px] font-bold text-[#5a6a8a] mb-1 block">Subject</label>
            <select value={subject} onChange={e => setSubject(e.target.value)} className="w-full px-4 py-2.5 border-2 border-[#dde5f5] dark:border-[#1e2d4a] rounded-[12px] text-[14px] bg-[#f8faff] dark:bg-[#1a2236] outline-none focus:border-primary-glow">
              <option value="">Select subject</option>
              {['General enquiry','School registration','Technical issue','Billing','Report content','Partnership','Other'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[12px] font-bold text-[#5a6a8a] mb-1 block">Message *</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} rows={5} placeholder="Describe your query in detail..." className="w-full px-4 py-2.5 border-2 border-[#dde5f5] dark:border-[#1e2d4a] rounded-[12px] text-[14px] bg-[#f8faff] dark:bg-[#1a2236] outline-none focus:border-primary-glow resize-none" />
          </div>
          <button
            onClick={send}
            disabled={sending}
            className="w-full py-3.5 rounded-[12px] bg-primary-600 text-white font-head font-bold text-[14px] hover:opacity-90 disabled:opacity-70 transition"
          >
            {sending ? 'Sending...' : '📤 Send Message'}
          </button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-[13px] text-[#5a6a8a]">
          Follow us:{' '}
          <a href={SITE.youtube} target="_blank" className="text-primary-600 hover:underline">YouTube</a> •{' '}
          <a href={SITE.twitter} target="_blank" className="text-primary-600 hover:underline">X.com</a> •{' '}
          <a href={SITE.telegram} target="_blank" className="text-primary-600 hover:underline">Telegram</a>
        </p>
      </div>
    </div>
  )
}
