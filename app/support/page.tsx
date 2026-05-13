import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Support & FAQ — MscTutor',
  description: 'Frequently asked questions and support for MscTutor education platform.',
}

const FAQS = [
  { cat: '🤖 AI & Questions', items: [
    { q: 'AI answer galat laga — kya karein?', a: 'AI kabhi kabhi mistake kar sakta hai. Hamesha apne teacher ya NCERT book se verify karo. Galat answer report karne ke liye "Report" button use karo.' },
    { q: 'Kitne questions free mein puch sakte hain?', a: 'Free plan mein 5 questions/day. Basic plan mein 300/month. Pro mein 1500/month. Content padhne ki koi limit nahi — unlimited free hai.' },
    { q: 'Voice input kaam nahi kar raha?', a: 'Voice input sirf Chrome browser mein kaam karta hai. Firefox/Safari mein support limited hai. Mobile pe Chrome open karo.' },
    { q: 'Image se question kaise poochein?', a: 'Ask page pe "Image" tab click karo. Camera se photo lo ya gallery se upload karo. AI automatically text read karke answer dega.' },
  ]},
  { cat: '🏫 School System', items: [
    { q: 'School register karne ke baad kya hoga?', a: 'Aapko ek unique school code milega (MSC-XXXX). Is code se teachers aur students join kar sakte hain. Free plan mein 50 students aur 5 teachers.' },
    { q: 'Teacher ko kaise add karein?', a: 'School Dashboard → Teachers → Invite Teacher. Teacher ka email daalo, unhe invitation email aayega. Woh click karke join ho jaayenge.' },
    { q: 'Live class kaise start karein?', a: 'Teacher Dashboard → My Classes → Live Class → Start. Jitsi Meet automatically open ho jaata hai. Students ko class link share karo.' },
    { q: 'Attendance push notification kaam nahi kar raha?', a: 'Student ka phone FCM notifications allow karta ho. Site pe pehli baar "Allow Notifications" click karna hoga.' },
  ]},
  { cat: '💳 Payment & Plans', items: [
    { q: 'Payment refund kaise milega?', a: '7 din ke andar email karo support@msctutor.in. Pura refund milega — no questions asked.' },
    { q: 'School storage full ho gayi — kya karein?', a: 'School Dashboard → Storage → Upgrade Plan. Ya purani files delete karo space ke liye. Storage dashboard mein sab diktha hai.' },
    { q: 'Credit khatam ho gaye — kya ab kuch nahi ho sakta?', a: 'Credits sirf AI se naye sawal poochne ke liye lagte hain. Sab content, chapters, formulas, diagrams padhe ja sakte hain — bilkul free, unlimited.' },
  ]},
  { cat: '⚙️ Technical', items: [
    { q: 'Dark mode kaise lagaein?', a: 'Top bar mein 🌙 icon click karo. Preference save ho jaati hai.' },
    { q: 'Hindi mein answers kaise milenge?', a: 'Top bar mein language selector se "हिंदी" select karo. AI Hindi mein answer dega.' },
    { q: 'Android app ka best use kya hai?', a: 'PWA (Progressive Web App) abhi available hai — Chrome mein site kholo, "Add to Home Screen" click karo. Isse website app jaisi open hoti hai aur fast access milta hai.' },
  ]},
]

export default function SupportPage() {
  return (
    <div className="max-w-[800px] mx-auto px-5 py-12">
      <div className="text-center mb-10">
        <div className="text-[42px] mb-3">🆘</div>
        <h1 className="font-head text-[30px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff]">Support & FAQ</h1>
        <p className="text-[14px] text-[#5a6a8a] mt-1">Commonly asked questions — aur bhi poochhna ho to contact karo</p>
      </div>

      {/* Quick contact */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: '📧', title: 'Email Support', sub: 'support@msctutor.in', href: '/contact' },
          { icon: '✈️', title: 'Telegram',      sub: '@msctutor',           href: 'https://t.me/msctutor' },
          { icon: '▶️', title: 'YouTube',        sub: 'Tutorial videos',    href: 'https://youtube.com/@msctutor' },
        ].map(c => (
          <a key={c.title} href={c.href} className="bg-white dark:bg-[#111827] rounded-[16px] p-4 border border-[#dde5f5] dark:border-[#1e2d4a] text-center hover:border-primary-600 hover:-translate-y-0.5 transition block">
            <div className="text-[26px] mb-1">{c.icon}</div>
            <div className="text-[13.5px] font-bold text-[#0f1f3d] dark:text-[#e8eeff]">{c.title}</div>
            <div className="text-[12px] text-primary-600">{c.sub}</div>
          </a>
        ))}
      </div>

      {/* FAQ sections */}
      <div className="space-y-8">
        {FAQS.map(section => (
          <div key={section.cat}>
            <h2 className="font-head text-[18px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] mb-3">{section.cat}</h2>
            <div className="space-y-2.5">
              {section.items.map((faq, i) => (
                <details key={i} className="bg-white dark:bg-[#111827] rounded-[16px] border border-[#dde5f5] dark:border-[#1e2d4a] group">
                  <summary className="px-5 py-4 cursor-pointer font-medium text-[14px] text-[#0f1f3d] dark:text-[#e8eeff] flex items-center justify-between list-none">
                    {faq.q}
                    <span className="text-[#5a6a8a] group-open:rotate-180 transition-transform flex-shrink-0 ml-2">▾</span>
                  </summary>
                  <div className="px-5 pb-4 text-[13.5px] text-[#5a6a8a] leading-relaxed border-t border-[#dde5f5] dark:border-[#1e2d4a] pt-3">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-gradient-to-r from-primary-600 to-primary-glow rounded-[20px] p-6 text-white text-center">
        <h2 className="font-head text-[18px] font-bold mb-2">Jawab nahi mila?</h2>
        <p className="text-white/75 text-[14px] mb-4">Hum 24-48 ghante mein reply karte hain</p>
        <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-primary-600 rounded-[14px] px-6 py-3 font-head font-bold text-[14px] hover:-translate-y-0.5 transition">
          📬 Contact Us
        </Link>
      </div>
    </div>
  )
}
