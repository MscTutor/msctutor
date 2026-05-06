import Link from 'next/link'

export default function TeacherDashboardPage() {
  return (
    <div className="max-w-[1000px] mx-auto px-5 py-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-head font-black text-[22px]">T</div>
        <div>
          <h1 className="font-head text-[22px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff]">👨‍🏫 Teacher Dashboard</h1>
          <p className="text-[13.5px] text-[#5a6a8a]">Smart Teaching • Attendance • Exams • Live Classes</p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: '🖥️', title: 'Smart Teach',    desc: 'AI-assisted chapter teaching', href: '#',           color: '#1a3a6b' },
          { icon: '📋', title: 'Attendance',      desc: 'Mark & notify absent students', href: '#',           color: '#0a5e3f' },
          { icon: '📝', title: 'Create Exam',     desc: 'AI-generated question paper',   href: '/mock-test',  color: '#7c3400' },
          { icon: '📹', title: 'Live Class',      desc: 'Start Jitsi Meet session',      href: '#',           color: '#0369a1' },
          { icon: '📚', title: 'Assign Homework', desc: 'Post homework for class',        href: '#',           color: '#7c3aed' },
          { icon: '📢', title: 'Send Notice',     desc: 'Push to all students',           href: '#',           color: '#92400e' },
        ].map(a => (
          <Link key={a.title} href={a.href}
            className="bg-white dark:bg-[#111827] rounded-[18px] p-5 border-[1.5px] border-[#dde5f5] dark:border-[#1e2d4a] hover:border-[var(--c)] hover:-translate-y-1 hover:shadow-card transition-all"
            style={{ '--c': a.color } as React.CSSProperties}>
            <div className="text-[28px] mb-2">{a.icon}</div>
            <div className="font-head text-[14px] font-bold text-[#0f1f3d] dark:text-[#e8eeff]">{a.title}</div>
            <div className="text-[12px] text-[#5a6a8a]">{a.desc}</div>
          </Link>
        ))}
      </div>

      {/* Smart teaching mode preview */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-glow rounded-[20px] p-6 text-white mb-6">
        <h2 className="font-head text-[18px] font-bold mb-2">🖥️ Smart Teaching Mode</h2>
        <p className="text-white/75 text-[13.5px] mb-4">
          Curriculum sidebar + AI content + Free diagrams + Quick tools — 3-panel layout
        </p>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {['📚 Curriculum','🤖 AI Content','🛠️ Quick Tools'].map(p => (
            <div key={p} className="bg-white/15 border border-white/20 rounded-[12px] p-3 text-center text-[13px] font-semibold">{p}</div>
          ))}
        </div>
        <Link href="/subject/science/chapter/newtons-laws"
          className="inline-flex items-center gap-2 bg-white text-primary-600 rounded-[12px] px-5 py-2.5 font-head font-bold text-[13.5px] hover:-translate-y-0.5 transition">
          Try Smart Teaching Mode →
        </Link>
      </div>

      {/* Content management */}
      <div className="bg-white dark:bg-[#111827] rounded-[20px] p-6 border border-[#dde5f5] dark:border-[#1e2d4a]">
        <h2 className="font-head text-[16px] font-bold mb-4">📁 My Content</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {[['0','Chapters Added'],['0','Questions Added'],['0','PDFs Uploaded'],['0','Total Views']].map(([v,l]) => (
            <div key={l} className="bg-[#f8faff] dark:bg-[#1a2236] rounded-[14px] p-3 text-center border border-[#dde5f5] dark:border-[#1e2d4a]">
              <div className="font-head text-[22px] font-extrabold text-primary-600">{v}</div>
              <div className="text-[11.5px] text-[#5a6a8a]">{l}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 flex-wrap">
          {[['➕ Add Chapter','/subject/mathematics'],['📄 Upload PDF','#'],['📊 Bulk Import','#']].map(([label, href]) => (
            <Link key={label} href={href}
              className="flex items-center gap-1.5 px-4 py-2 rounded-[10px] border-2 border-primary-600 text-primary-600 text-[13px] font-semibold hover:bg-primary-600 hover:text-white transition">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
