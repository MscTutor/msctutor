import Link from 'next/link'
export const metadata = { title: 'About MscTutor — Free AI Education Platform', description: 'MscTutor is a free AI-powered education platform for Class 1-12 students in India and worldwide.' }

export default function AboutPage() {
  return (
    <div className="max-w-[800px] mx-auto px-5 py-12">
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-[18px] bg-gradient-to-br from-primary-600 to-primary-glow flex items-center justify-center text-white font-head font-black text-[28px] mx-auto mb-4">M</div>
        <h1 className="font-head text-[32px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff] mb-2">About MscTutor</h1>
        <p className="text-[15px] text-[#5a6a8a]">Free AI-powered education for every student</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-[#111827] rounded-[20px] p-6 border border-[#dde5f5] dark:border-[#1e2d4a]">
          <h2 className="font-head text-[18px] font-bold mb-3 text-[#0f1f3d] dark:text-[#e8eeff]">🎯 Our Mission</h2>
          <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
            MscTutor aims to make quality education free and accessible for every student in India and worldwide. 
            We believe every student — regardless of their location or financial background — deserves access to 
            AI-powered learning tools, step-by-step solutions, and comprehensive study materials.
          </p>
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-[20px] p-6 border border-[#dde5f5] dark:border-[#1e2d4a]">
          <h2 className="font-head text-[18px] font-bold mb-3 text-[#0f1f3d] dark:text-[#e8eeff]">⚙️ How It Works</h2>
          <div className="space-y-3">
            {[
              ['🤖 AI Engine', 'Students ask any question — our DeepSeek AI provides step-by-step solutions with formulas and NCERT references'],
              ['📄 Auto SEO Pages', 'Every question creates a permanent educational page that Google can index — helping thousands of other students find the same answer'],
              ['🏫 School System', 'Schools get free attendance, live classes, exam creation, and homework tools — completely free for up to 50 students'],
              ['🌍 20+ Languages', 'Questions and answers available in Hindi, English, Bengali, Telugu, Tamil and 16+ more languages via our free translation system'],
            ].map(([title, desc]) => (
              <div key={title as string} className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-600/10 flex items-center justify-center text-[15px] flex-shrink-0">{(title as string).split(' ')[0]}</div>
                <div>
                  <div className="text-[13.5px] font-bold text-[#0f1f3d] dark:text-[#e8eeff]">{(title as string).substring(3)}</div>
                  <div className="text-[13px] text-[#5a6a8a]">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[['500K+','Questions Solved'],['50','Subjects'],['1M+','Students'],['Free','Always']].map(([num, label]) => (
            <div key={label} className="bg-white dark:bg-[#111827] rounded-[16px] p-4 text-center border border-[#dde5f5] dark:border-[#1e2d4a]">
              <div className="font-head text-[24px] font-extrabold text-primary-600">{num}</div>
              <div className="text-[12px] text-[#5a6a8a]">{label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-[20px] p-6 border border-[#dde5f5] dark:border-[#1e2d4a]">
          <h2 className="font-head text-[18px] font-bold mb-3 text-[#0f1f3d] dark:text-[#e8eeff]">📬 Contact</h2>
          <div className="space-y-2 text-[14px] text-[#5a6a8a]">
            <p>📧 General: contact@msctutor.in</p>
            <p>🏫 Schools: schools@msctutor.in</p>
            <p>⚖️ Legal: legal@msctutor.in</p>
            <p>🔒 Privacy: privacy@msctutor.in</p>
          </div>
          <div className="flex gap-3 mt-4">
            <Link href="/contact" className="px-4 py-2 rounded-[10px] bg-primary-600 text-white text-[13px] font-semibold hover:opacity-90 transition">Contact Us</Link>
            <Link href="/support" className="px-4 py-2 rounded-[10px] border border-[#dde5f5] text-[#5a6a8a] text-[13px] font-semibold hover:border-primary-600 hover:text-primary-600 transition">Support FAQ</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
