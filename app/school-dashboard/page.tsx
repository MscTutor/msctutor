import Link from 'next/link'

export default function SchoolDashboardPage() {
  return (
    <div className="max-w-[1100px] mx-auto px-5 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-head text-[24px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff]">School Dashboard</h1>
          <p className="text-[13.5px] text-[#5a6a8a]">Principal panel with teachers, students, attendance, notices, and results.</p>
        </div>
        <span className="bg-green-50 text-green-600 border border-green-200 rounded-full px-4 py-1.5 text-[12.5px] font-bold">Free Plan</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { icon: 'Teachers', label: 'Teachers', value: '0', color: '#0369a1' },
          { icon: 'Students', label: 'Students', value: '0', color: '#0a5e3f' },
          { icon: 'Classes', label: 'Classes', value: '0', color: '#7c3400' },
          { icon: 'Attendance', label: 'Avg Attend.', value: '—', color: '#1a3a6b' },
        ].map((item) => (
          <div key={item.label} className="bg-white dark:bg-[#111827] rounded-[18px] p-5 border border-[#dde5f5] dark:border-[#1e2d4a] text-center">
            <div className="text-[14px] mb-1 font-semibold text-[#5a6a8a]">{item.icon}</div>
            <div className="font-head text-[26px] font-extrabold" style={{ color: item.color }}>{item.value}</div>
            <div className="text-[12px] text-[#5a6a8a]">{item.label}</div>
          </div>
        ))}
      </div>

      <h2 className="font-head text-[17px] font-bold mb-4 text-[#0f1f3d] dark:text-[#e8eeff]">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: 'Teacher', title: 'Add Teacher', desc: 'Invite and manage teachers', href: '/school-dashboard/teachers' },
          { icon: 'Student', title: 'Add Students', desc: 'Manual or bulk CSV import', href: '/school-dashboard/students' },
          { icon: 'Class', title: 'Create Class', desc: '9-A, 10-B and sections', href: '/school-dashboard/classes' },
          { icon: 'Notice', title: 'Send Notice', desc: 'Push to students and teachers', href: '/school-dashboard/notices' },
          { icon: 'Exam', title: 'Create Exam', desc: 'AI-generated paper flow', href: '/mock-test' },
          { icon: 'Result', title: 'View Analytics', desc: 'Attendance and result boards', href: '/school-dashboard/results' },
        ].map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="bg-white dark:bg-[#111827] rounded-[18px] p-5 border border-[#dde5f5] dark:border-[#1e2d4a] hover:border-primary-600 hover:-translate-y-1 transition-all"
          >
            <div className="text-[14px] mb-2 font-semibold text-[#5a6a8a]">{action.icon}</div>
            <div className="font-head text-[14px] font-bold text-[#0f1f3d] dark:text-[#e8eeff]">{action.title}</div>
            <div className="text-[12px] text-[#5a6a8a]">{action.desc}</div>
          </Link>
        ))}
      </div>

      <div className="bg-gradient-to-r from-primary-600 to-primary-glow rounded-[20px] p-6 text-white">
        <h2 className="font-head text-[18px] font-bold mb-3">Setup Your School in 3 Steps</h2>
        <div className="space-y-3">
          {[
            ['1', 'Teachers add karo', 'Invite via email or add manually in the teachers panel.'],
            ['2', 'Classes create karo', 'Create sections, assign teachers, and prepare curriculum flow.'],
            ['3', 'Students add karo', 'Use school code or bulk import to onboard students quickly.'],
          ].map(([step, title, desc]) => (
            <div key={step} className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-[13px] font-bold flex-shrink-0">{step}</div>
              <div>
                <div className="text-[13.5px] font-bold">{title}</div>
                <div className="text-[12.5px] text-white/70">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
