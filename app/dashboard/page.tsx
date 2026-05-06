'use client'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="max-w-[900px] mx-auto px-5 py-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-600 to-primary-glow flex items-center justify-center text-white font-head font-black text-[22px]">S</div>
        <div>
          <h1 className="font-head text-[22px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff]">Student Dashboard</h1>
          <p className="text-[13.5px] text-[#5a6a8a]">Welcome back! Keep learning 🚀</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { icon: '🤖', label: 'Questions Asked',  value: '0',   color: '#1a3a6b' },
          { icon: '💳', label: 'Credits Left',      value: '5',   color: '#0a5e3f' },
          { icon: '📝', label: 'Tests Taken',       value: '0',   color: '#7c3400' },
          { icon: '🔖', label: 'Saved Questions',   value: '0',   color: '#0369a1' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-[#111827] rounded-[18px] p-4 border border-[#dde5f5] dark:border-[#1e2d4a] text-center">
            <div className="text-[26px] mb-1">{s.icon}</div>
            <div className="font-head text-[24px] font-extrabold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[11.5px] text-[#5a6a8a]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <h2 className="font-head text-[17px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {[
          { href: '/ask',       icon: '🤖', label: 'Ask AI',        desc: '5 credits left today' },
          { href: '/mock-test', icon: '📝', label: 'Take Mock Test', desc: 'Practice CBSE exam' },
          { href: '/formulas',  icon: '📐', label: 'Formula Bank',   desc: 'All formulas' },
          { href: '/calculators',icon:'🧮', label: 'Calculators',    desc: '10 smart tools' },
          { href: '/community', icon: '💬', label: 'Community',      desc: 'Discuss with students' },
          { href: '/pricing',   icon: '⬆️', label: 'Upgrade Plan',   desc: 'Get more credits' },
        ].map(a => (
          <Link key={a.href} href={a.href}
            className="bg-white dark:bg-[#111827] rounded-[18px] p-4 border border-[#dde5f5] dark:border-[#1e2d4a] hover:border-primary-600 hover:-translate-y-0.5 hover:shadow-card transition-all">
            <div className="text-[24px] mb-1.5">{a.icon}</div>
            <div className="text-[13.5px] font-bold text-[#0f1f3d] dark:text-[#e8eeff]">{a.label}</div>
            <div className="text-[12px] text-[#5a6a8a]">{a.desc}</div>
          </Link>
        ))}
      </div>

      {/* Recent history placeholder */}
      <div className="bg-white dark:bg-[#111827] rounded-[20px] p-6 border border-[#dde5f5] dark:border-[#1e2d4a]">
        <h2 className="font-head text-[16px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] mb-4">📜 Question History</h2>
        <div className="text-center py-8">
          <div className="text-[40px] mb-3">🤖</div>
          <p className="text-[14px] text-[#5a6a8a] mb-1">No questions asked yet</p>
          <p className="text-[13px] text-[#5a6a8a] mb-5">Ask your first question and get AI step-by-step solution!</p>
          <Link href="/ask" className="inline-flex items-center gap-2 bg-primary-600 text-white rounded-xl px-6 py-3 font-head font-bold text-[14px] hover:opacity-90 transition">
            🤖 Ask First Question →
          </Link>
        </div>
      </div>
    </div>
  )
}
