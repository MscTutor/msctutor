'use client'
// app/admin/security/page.tsx — Security dashboard with audit logs

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AuthGuard from '@/components/AuthGuard'

const SEVERITY_COLOR: Record<string, string> = {
  CRITICAL: '#dc2626', HIGH: '#f59e0b', MEDIUM: '#3b82f6', LOW: '#22c55e',
}

interface AuditLog {
  id: number; action: string; severity: string; userId?: string
  ip: string; path?: string; details?: string; success: boolean; createdAt: string
}

interface SecuritySummary {
  summary: { critical: number; high: number }
  recentEvents: AuditLog[]
  bannedIPs: { id: number; ip: string; reason?: string; createdAt: string }[]
}

function SecurityContent() {
  const [data,    setData]    = useState<SecuritySummary | null>(null)
  const [logs,    setLogs]    = useState<AuditLog[]>([])
  const [tab,     setTab]     = useState<'overview'|'logs'|'banned'>('overview')
  const [loading, setLoading] = useState(true)
  const [filter,  setFilter]  = useState('')
  const [severity,setSeverity]= useState('')
  const [banIP,   setBanIP]   = useState('')
  const [banReason,setBanReason]=useState('')

  useEffect(() => {
    fetch('/api/admin/security').then(r=>r.json()).then(d=>{setData(d);setLoading(false)}).catch(()=>setLoading(false))
    fetch('/api/admin/audit?limit=50').then(r=>r.json()).then(d=>setLogs(d.logs??[])).catch(()=>{})
  }, [])

  async function banIPAddr() {
    if (!banIP.trim()) return
    const res = await fetch('/api/admin/security', {
      method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ ip: banIP.trim(), reason: banReason || 'Manual ban' }),
    })
    if (res.ok) { alert(`IP ${banIP} banned!`); setBanIP(''); setBanReason('') }
  }

  const filtered = logs.filter(l =>
    (!severity || l.severity === severity) &&
    (!filter || l.action.includes(filter.toUpperCase()) || l.ip.includes(filter) || l.userId?.includes(filter))
  )

  if (loading) return <div style={{ padding:'4rem', textAlign:'center', color:'#6b7280' }}>Loading security data...</div>

  return (
    <div style={{ minHeight:'100vh', background:'#f8f9fc' }}>
      <div style={{ background:'linear-gradient(135deg,#1a1a2e,#16213e)', color:'#fff', padding:'1.25rem 1.5rem', display:'flex', alignItems:'center', gap:12 }}>
        <Link href="/admin" style={{ color:'rgba(255,255,255,.7)', textDecoration:'none', fontSize:13 }}>← Admin</Link>
        <h1 style={{ fontSize:20, fontWeight:900, margin:0, flex:1 }}>🔐 Security Center</h1>
        <span style={{ fontSize:11, background:'rgba(255,255,255,.1)', padding:'3px 10px', borderRadius:20 }}>Real-time monitoring</span>
      </div>

      {/* Tabs */}
      <div style={{ background:'#fff', borderBottom:'1px solid #e5e7eb', display:'flex', padding:'0 1.5rem' }}>
        {(['overview','logs','banned'] as const).map(t=>(
          <button key={t} onClick={()=>setTab(t)}
            style={{ padding:'10px 16px', border:'none', background:'transparent', cursor:'pointer', fontFamily:'inherit', fontSize:13, fontWeight:tab===t?700:500, color:tab===t?'#1a3a6b':'#6b7280', borderBottom:`2px solid ${tab===t?'#1a3a6b':'transparent'}` }}>
            {t==='overview'?'📊 Overview':t==='logs'?'📋 Audit Logs':'🚫 Banned IPs'}
          </button>
        ))}
      </div>

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'1.5rem 1rem' }}>

        {tab === 'overview' && data && (
          <>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', marginBottom:'1.5rem' }}>
              {[
                { label:'Critical Events', val:data.summary.critical, icon:'🚨', color:'#dc2626', bg:'#fee2e2' },
                { label:'High Events',     val:data.summary.high,     icon:'⚠️', color:'#f59e0b', bg:'#fef3c7' },
                { label:'Banned IPs',      val:data.bannedIPs.length, icon:'🚫', color:'#7c3aed', bg:'#ede9fe' },
                { label:'Active Monitoring',val:'ON',                 icon:'✅', color:'#059669', bg:'#d1fae5' },
              ].map(s=>(
                <div key={s.label} style={{ background:s.bg, borderRadius:12, padding:'1.25rem', textAlign:'center' }}>
                  <div style={{ fontSize:30 }}>{s.icon}</div>
                  <div style={{ fontSize:26, fontWeight:900, color:s.color }}>{s.val}</div>
                  <div style={{ fontSize:11, color:'#6b7280', marginTop:2 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Recent critical events */}
            <div style={{ background:'#fff', borderRadius:14, border:'1px solid #e5e7eb', overflow:'hidden', marginBottom:'1.5rem' }}>
              <div style={{ padding:'1rem 1.25rem', borderBottom:'1px solid #f3f4f6', fontWeight:800, fontSize:15 }}>🚨 Recent Security Events</div>
              {data.recentEvents.length===0 ? (
                <div style={{ padding:'2rem', textAlign:'center', color:'#9ca3af' }}>✅ No critical events</div>
              ) : data.recentEvents.slice(0,10).map(e=>(
                <div key={e.id} style={{ padding:'10px 14px', borderBottom:'1px solid #f3f4f6', display:'flex', alignItems:'center', gap:12 }}>
                  <span style={{ background:SEVERITY_COLOR[e.severity]+'22', color:SEVERITY_COLOR[e.severity], fontSize:11, fontWeight:700, padding:'2px 8px', borderRadius:20 }}>{e.severity}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:700 }}>{e.action}</div>
                    <div style={{ fontSize:11, color:'#6b7280' }}>IP: {e.ip} {e.path?`· ${e.path}`:''} · {new Date(e.createdAt).toLocaleString()}</div>
                  </div>
                  <span style={{ fontSize:12, color:e.success?'#22c55e':'#dc2626' }}>{e.success?'✓':'✗'}</span>
                </div>
              ))}
            </div>

            {/* Ban IP form */}
            <div style={{ background:'#fff', borderRadius:14, border:'1.5px solid #fecdd3', padding:'1.25rem' }}>
              <div style={{ fontWeight:800, fontSize:15, marginBottom:12, color:'#dc2626' }}>🚫 Ban an IP Address</div>
              <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
                <input value={banIP} onChange={e=>setBanIP(e.target.value)} placeholder="IP Address (e.g. 1.2.3.4)"
                  style={{ flex:1, minWidth:180, padding:'9px 12px', border:'1.5px solid #e5e7eb', borderRadius:10, fontSize:14, outline:'none', fontFamily:'inherit' }} />
                <input value={banReason} onChange={e=>setBanReason(e.target.value)} placeholder="Reason (optional)"
                  style={{ flex:2, minWidth:200, padding:'9px 12px', border:'1.5px solid #e5e7eb', borderRadius:10, fontSize:14, outline:'none', fontFamily:'inherit' }} />
                <button onClick={banIPAddr}
                  style={{ padding:'9px 20px', background:'#dc2626', color:'#fff', border:'none', borderRadius:10, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
                  Ban IP
                </button>
              </div>
            </div>
          </>
        )}

        {tab === 'logs' && (
          <div style={{ background:'#fff', borderRadius:14, border:'1px solid #e5e7eb', overflow:'hidden' }}>
            <div style={{ padding:'1rem 1.25rem', borderBottom:'1px solid #e5e7eb', display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
              <input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="Search action, IP, user..."
                style={{ flex:1, minWidth:200, padding:'8px 12px', border:'1.5px solid #e5e7eb', borderRadius:10, fontSize:13, outline:'none', fontFamily:'inherit' }} />
              <select value={severity} onChange={e=>setSeverity(e.target.value)}
                style={{ padding:'8px 12px', border:'1.5px solid #e5e7eb', borderRadius:10, fontSize:13, fontFamily:'inherit' }}>
                <option value="">All Severities</option>
                {['CRITICAL','HIGH','MEDIUM','LOW'].map(s=><option key={s} value={s}>{s}</option>)}
              </select>
              <span style={{ fontSize:13, color:'#6b7280', alignSelf:'center' }}>{filtered.length} logs</span>
            </div>
            <div style={{ maxHeight:600, overflowY:'auto' }}>
              {filtered.map(log=>(
                <div key={log.id} style={{ padding:'10px 14px', borderBottom:'1px solid #f3f4f6', display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ background:SEVERITY_COLOR[log.severity]+'22', color:SEVERITY_COLOR[log.severity], fontSize:10, fontWeight:700, padding:'2px 7px', borderRadius:20, flexShrink:0 }}>{log.severity}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:700 }}>{log.action}</div>
                    <div style={{ fontSize:11, color:'#9ca3af' }}>IP: {log.ip}{log.userId?` · User: ${log.userId}`:''}{log.path?` · ${log.path}`:''}</div>
                  </div>
                  <div style={{ fontSize:11, color:'#9ca3af', flexShrink:0 }}>{new Date(log.createdAt).toLocaleString()}</div>
                  <span style={{ color:log.success?'#22c55e':'#dc2626', fontSize:14 }}>{log.success?'✓':'✗'}</span>
                </div>
              ))}
              {filtered.length===0 && <div style={{ padding:'3rem', textAlign:'center', color:'#9ca3af' }}>No logs found</div>}
            </div>
          </div>
        )}

        {tab === 'banned' && data && (
          <div style={{ background:'#fff', borderRadius:14, border:'1px solid #e5e7eb', overflow:'hidden' }}>
            <div style={{ padding:'1rem 1.25rem', borderBottom:'1px solid #e5e7eb', fontWeight:800, fontSize:15 }}>🚫 Banned IPs ({data.bannedIPs.length})</div>
            {data.bannedIPs.length===0 ? (
              <div style={{ padding:'3rem', textAlign:'center', color:'#9ca3af' }}>No banned IPs</div>
            ) : data.bannedIPs.map(b=>(
              <div key={b.id} style={{ padding:'12px 16px', borderBottom:'1px solid #f3f4f6', display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ fontFamily:'monospace', fontSize:14, fontWeight:700, color:'#dc2626' }}>{b.ip}</div>
                <div style={{ flex:1, fontSize:12, color:'#6b7280' }}>{b.reason ?? 'No reason'}</div>
                <div style={{ fontSize:11, color:'#9ca3af' }}>{new Date(b.createdAt).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function SecurityPage() {
  return <AuthGuard allowedRoles={['super_admin']}><SecurityContent /></AuthGuard>
}
