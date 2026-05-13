'use client'
// app/admin/page.tsx — Fully translated Admin Panel

import { useState }        from 'react'
import { useTranslations }  from '@/lib/use-translations'
import { useAuth }          from '@/lib/use-auth'
import AuthGuard            from '@/components/AuthGuard'
import Link                 from 'next/link'

function AdminContent() {
  const { t } = useTranslations()
  const { user } = useAuth()
  const [tab, setTab] = useState<'overview'|'users'|'content'|'payments'|'settings'>('overview')

  const stats = [
    { label:t('admin.totalUsers'),     val:'1,247', icon:'👥', color:'#2563eb', bg:'#eff6ff'  },
    { label:t('admin.totalQuestions'), val:'28,490',icon:'❓', color:'#059669', bg:'#d1fae5'  },
    { label:t('admin.totalSchools'),   val:'34',    icon:'🏫', color:'#d97706', bg:'#fef3c7'  },
    { label:t('admin.revenueMonth'),   val:'₹24.5k',icon:'💰', color:'#7c3aed', bg:'#f5f3ff'  },
  ]

  const tabs = [
    { id:'overview', icon:'📊', label:t('admin.overview') },
    { id:'users',    icon:'👥', label:t('admin.users')    },
    { id:'content',  icon:'📚', label:t('admin.content')  },
    { id:'payments', icon:'💰', label:t('admin.payments') },
    { id:'settings', icon:'⚙️', label:t('admin.settings') },
  ] as const

  return (
    <div style={{ minHeight:'100vh', background:'#0f172a', color:'#e2e8f0' }}>
      {/* Header */}
      <div style={{ background:'#1e293b', borderBottom:'1px solid #334155', padding:'1rem 1.5rem', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <div style={{ fontSize:11, color:'#64748b', textTransform:'uppercase', letterSpacing:.8, marginBottom:2 }}>{t('admin.panel')}</div>
          <h1 style={{ fontSize:20, fontWeight:900, margin:0, color:'#f1f5f9' }}>MscTutor {t('admin.panel')}</h1>
        </div>
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          <div style={{ fontSize:12, color:'#64748b' }}>{user?.name} · {user?.role}</div>
          <Link href="/dashboard" style={{ padding:'6px 12px', background:'#1a3a6b', color:'#93c5fd', borderRadius:8, textDecoration:'none', fontSize:12, fontWeight:600, border:'1px solid #1e40af' }}>
            ← {t('nav.dashboard')}
          </Link>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'1.5rem' }}>
        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'0.875rem', marginBottom:'1.5rem' }}>
          {stats.map(s => (
            <div key={s.label} style={{ background:'#1e293b', borderRadius:14, border:'1px solid #334155', padding:'1.25rem' }}>
              <div style={{ fontSize:24, marginBottom:6 }}>{s.icon}</div>
              <div style={{ fontSize:26, fontWeight:900, color:s.color }}>{s.val}</div>
              <div style={{ fontSize:12, color:'#64748b', marginTop:3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ background:'#1e293b', borderRadius:16, border:'1px solid #334155', overflow:'hidden' }}>
          <div style={{ display:'flex', borderBottom:'1px solid #334155', overflowX:'auto' }}>
            {tabs.map(tb => (
              <button key={tb.id} onClick={() => setTab(tb.id as typeof tab)}
                style={{ padding:'12px 18px', border:'none', background:tab===tb.id?'#0f172a':'transparent', color:tab===tb.id?'#60a5fa':'#64748b', fontWeight:tab===tb.id?700:500, cursor:'pointer', fontFamily:'inherit', fontSize:13, borderBottom:`2px solid ${tab===tb.id?'#3b82f6':'transparent'}`, whiteSpace:'nowrap' }}>
                {tb.icon} {tb.label}
              </button>
            ))}
          </div>

          <div style={{ padding:'1.5rem' }}>
            {tab === 'overview' && (
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                {[
                  { href:'/admin/users',    icon:'👥', label:t('admin.allUsers'),  color:'#60a5fa', bg:'#1e3a5f' },
                  { href:'/admin/content',  icon:'📚', label:t('admin.content'),   color:'#34d399', bg:'#064e3b' },
                  { href:'/admin/subjects', icon:'📖', label:t('admin.subjects'),  color:'#a78bfa', bg:'#3b0764' },
                  { href:'/admin/storage',  icon:'💾', label:t('admin.storage'),   color:'#fbbf24', bg:'#451a03' },
                  { href:'/admin/payments', icon:'💰', label:t('admin.payments'),  color:'#f87171', bg:'#450a0a' },
                  { href:'/admin/settings', icon:'⚙️', label:t('admin.settings'), color:'#94a3b8', bg:'#1e293b' },
                ].map(l => (
                  <Link key={l.href} href={l.href} style={{ padding:'1rem', background:l.bg, borderRadius:12, textDecoration:'none', display:'flex', alignItems:'center', gap:12, border:'1px solid rgba(255,255,255,.07)' }}>
                    <span style={{ fontSize:26 }}>{l.icon}</span>
                    <span style={{ fontWeight:700, fontSize:14, color:l.color }}>{l.label}</span>
                  </Link>
                ))}
              </div>
            )}

            {tab === 'users' && (
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1rem' }}>
                  <h3 style={{ margin:0, color:'#f1f5f9' }}>👥 {t('admin.allUsers')}</h3>
                  <button style={{ padding:'7px 14px', background:'#3b82f6', color:'#fff', border:'none', borderRadius:8, cursor:'pointer', fontSize:13, fontWeight:700, fontFamily:'inherit' }}>
                    {t('admin.exportCSV')}
                  </button>
                </div>
                <input placeholder={t('admin.searchUsers')}
                  style={{ width:'100%', padding:'10px 14px', background:'#0f172a', border:'1px solid #334155', borderRadius:10, color:'#e2e8f0', fontSize:13, outline:'none', marginBottom:'1rem', boxSizing:'border-box' }} />
                {[
                  { name:'Rahul Kumar', role:'student', email:'rahul@example.com', status:'active' },
                  { name:'Ms. Priya Sharma', role:'teacher', email:'priya@school.in', status:'active' },
                  { name:'St. Xavier School', role:'school_admin', email:'admin@xavier.in', status:'active' },
                ].map((u,i) => (
                  <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 100px 150px 80px 100px', gap:12, padding:'12px 14px', background:'#0f172a', borderRadius:10, marginBottom:6, alignItems:'center', border:'1px solid #1e293b' }}>
                    <div><div style={{ fontWeight:600, fontSize:14, color:'#f1f5f9' }}>{u.name}</div><div style={{ fontSize:11, color:'#64748b' }}>{u.email}</div></div>
                    <span style={{ fontSize:11, background:'#1e3a5f', color:'#93c5fd', borderRadius:20, padding:'2px 10px', fontWeight:700, textAlign:'center' }}>{u.role}</span>
                    <div style={{ fontSize:12, color:'#64748b' }}>Joined 2025</div>
                    <span style={{ fontSize:11, background:u.status==='active'?'#064e3b':'#450a0a', color:u.status==='active'?'#34d399':'#f87171', borderRadius:20, padding:'2px 10px', fontWeight:700, textAlign:'center' }}>{u.status}</span>
                    <div style={{ display:'flex', gap:5 }}>
                      <button style={{ padding:'4px 10px', background:'#1e3a5f', color:'#93c5fd', border:'none', borderRadius:6, cursor:'pointer', fontSize:11, fontFamily:'inherit' }}>{t('admin.viewUser')}</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'content' && (
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.875rem' }}>
                {[
                  { href:'/admin/content/subjects', icon:'📖', label:t('admin.subjects'), count:'89 subjects' },
                  { href:'/admin/content/chapters', icon:'📑', label:t('admin.chapters'), count:'1200+ chapters' },
                  { href:'/admin/content/questions',icon:'❓', label:'Questions',          count:'28k+ questions' },
                  { href:'/admin/storage',          icon:'💾', label:t('admin.storage'),  count:'742 MB used' },
                ].map(c => (
                  <Link key={c.href} href={c.href} style={{ padding:'1.25rem', background:'#0f172a', borderRadius:12, border:'1px solid #334155', textDecoration:'none', display:'flex', alignItems:'center', gap:14 }}>
                    <span style={{ fontSize:32 }}>{c.icon}</span>
                    <div>
                      <div style={{ fontWeight:700, fontSize:15, color:'#f1f5f9' }}>{c.label}</div>
                      <div style={{ fontSize:12, color:'#64748b', marginTop:2 }}>{c.count}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {tab === 'payments' && (
              <div>
                <h3 style={{ margin:'0 0 1rem', color:'#f1f5f9' }}>💰 {t('admin.payments')}</h3>
                {[
                  { user:'Rahul Kumar', plan:'Basic', amount:'₹99', date:'Apr 20', status:'completed' },
                  { user:'Priya Sharma', plan:'Pro',  amount:'₹299', date:'Apr 19', status:'completed' },
                  { user:'Amit Singh',  plan:'Starter',amount:'₹49',date:'Apr 18', status:'refunded'  },
                ].map((p,i) => (
                  <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 80px 80px 100px 90px', gap:12, padding:'12px 14px', background:'#0f172a', borderRadius:10, marginBottom:6, alignItems:'center', border:'1px solid #1e293b' }}>
                    <div style={{ fontWeight:600, fontSize:14, color:'#f1f5f9' }}>{p.user}</div>
                    <span style={{ fontSize:12, color:'#94a3b8' }}>{p.plan}</span>
                    <span style={{ fontWeight:700, color:'#34d399' }}>{p.amount}</span>
                    <span style={{ fontSize:12, color:'#64748b' }}>{p.date}</span>
                    <span style={{ fontSize:11, background:p.status==='completed'?'#064e3b':'#450a0a', color:p.status==='completed'?'#34d399':'#f87171', borderRadius:20, padding:'2px 10px', fontWeight:700, textAlign:'center' }}>{p.status}</span>
                  </div>
                ))}
              </div>
            )}

            {tab === 'settings' && (
              <div style={{ maxWidth:500 }}>
                <h3 style={{ margin:'0 0 1.25rem', color:'#f1f5f9' }}>⚙️ {t('admin.settings')}</h3>
                {[
                  { label:'Site Name', val:'MscTutor.in' },
                  { label:'Support Email', val:'support@msctutor.in' },
                  { label:'Max Questions/Day (Free)', val:'5' },
                  { label:'DeepSeek API Status', val:'✅ Connected' },
                ].map((s,i) => (
                  <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'12px 0', borderBottom:'1px solid #1e293b' }}>
                    <span style={{ color:'#94a3b8', fontSize:14 }}>{s.label}</span>
                    <span style={{ color:'#f1f5f9', fontWeight:600, fontSize:14 }}>{s.val}</span>
                  </div>
                ))}
                <div style={{ marginTop:'1.5rem', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1rem', background:'#0f172a', borderRadius:12, border:'1px solid #334155' }}>
                  <div>
                    <div style={{ fontWeight:700, color:'#f1f5f9' }}>{t('admin.maintenance')}</div>
                    <div style={{ fontSize:12, color:'#64748b' }}>Put site in maintenance mode</div>
                  </div>
                  <div style={{ width:44, height:24, background:'#334155', borderRadius:12, cursor:'pointer', position:'relative' }}>
                    <div style={{ position:'absolute', left:3, top:3, width:18, height:18, background:'#64748b', borderRadius:'50%', transition:'all .2s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <AuthGuard allowedRoles={['super_admin','content_admin']}>
      <AdminContent />
    </AuthGuard>
  )
}
