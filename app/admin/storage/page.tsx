'use client'
// app/admin/storage/page.tsx — Full Storage Manager with Quota Warning

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface FileItem {
  id: string; name: string; type: string; size: number
  url: string; uploadedBy: string; uploadedAt: string
  category: 'pdf' | 'image' | 'video' | 'other'
}

const TOTAL_QUOTA_MB = 1024
const MOCK_FILES: FileItem[] = [
  { id:'1', name:'class10-physics.pdf',     type:'PDF', size:2400000, url:'#', uploadedBy:'Admin',    uploadedAt:'2025-04-20', category:'pdf'   },
  { id:'2', name:'newton-diagram.png',      type:'PNG', size:450000,  url:'#', uploadedBy:'Teacher1', uploadedAt:'2025-04-19', category:'image' },
  { id:'3', name:'chemistry-lab.pdf',       type:'PDF', size:5200000, url:'#', uploadedBy:'Admin',    uploadedAt:'2025-04-18', category:'pdf'   },
  { id:'4', name:'photosynthesis.gif',      type:'GIF', size:820000,  url:'#', uploadedBy:'Admin',    uploadedAt:'2025-04-17', category:'image' },
  { id:'5', name:'maths-worksheet.pdf',     type:'PDF', size:1800000, url:'#', uploadedBy:'Teacher2', uploadedAt:'2025-04-16', category:'pdf'   },
  { id:'6', name:'biology-cell.svg',        type:'SVG', size:95000,   url:'#', uploadedBy:'Admin',    uploadedAt:'2025-04-15', category:'image' },
  { id:'7', name:'class12-chemistry.pdf',   type:'PDF', size:8900000, url:'#', uploadedBy:'Admin',    uploadedAt:'2025-04-14', category:'pdf'   },
  { id:'8', name:'india-map.png',           type:'PNG', size:1200000, url:'#', uploadedBy:'Teacher3', uploadedAt:'2025-04-13', category:'image' },
]

function fmt(bytes: number) {
  if (bytes >= 1024*1024) return `${(bytes/(1024*1024)).toFixed(1)} MB`
  if (bytes >= 1024) return `${(bytes/1024).toFixed(0)} KB`
  return `${bytes} B`
}

export default function StoragePage() {
  const [files,    setFiles]    = useState<FileItem[]>(MOCK_FILES)
  const [filter,   setFilter]   = useState<'all'|'pdf'|'image'|'video'>('all')
  const [sortBy,   setSortBy]   = useState<'date'|'size'|'name'>('date')
  const [selected, setSelected] = useState<string[]>([])
  const [showBanner, setShowBanner] = useState(true)

  const totalBytes = files.reduce((s,f) => s+f.size, 0)
  const usedMB     = totalBytes/(1024*1024)
  const pct        = Math.min(Math.round((usedMB/TOTAL_QUOTA_MB)*100), 100)
  const barColor   = pct>=90?'#dc2626': pct>=75?'#f59e0b': '#22c55e'
  const pdfSz      = files.filter(f=>f.category==='pdf').reduce((s,f)=>s+f.size,0)
  const imgSz      = files.filter(f=>f.category==='image').reduce((s,f)=>s+f.size,0)

  const filtered = files
    .filter(f => filter==='all'||f.category===filter)
    .sort((a,b) => sortBy==='size'? b.size-a.size : sortBy==='name'? a.name.localeCompare(b.name) : new Date(b.uploadedAt).getTime()-new Date(a.uploadedAt).getTime())

  function delSelected() {
    if(confirm(`Delete ${selected.length} file(s)?`)) {
      setFiles(p=>p.filter(f=>!selected.includes(f.id)))
      setSelected([])
    }
  }

  return (
    <div style={{ minHeight:'100vh', background:'#f8f9fc' }}>

      {/* Quota Warning Banner */}
      {showBanner && pct >= 75 && (
        <div style={{ background: pct>=90?'#dc2626':'#f59e0b', color:'#fff', padding:'12px 24px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ fontSize:22 }}>{pct>=90?'🚨':'⚠️'}</span>
            <div>
              <strong style={{ fontSize:14 }}>
                {pct>=90 ? 'CRITICAL: Storage full! Uploads BLOCKED.' : `Storage Warning: ${pct}% used — ${fmt((TOTAL_QUOTA_MB-usedMB)*1024*1024)} remaining`}
              </strong>
              <div style={{ fontSize:12, opacity:.9, marginTop:2 }}>
                {pct>=90 ? 'Delete files or upgrade plan immediately.' : 'Delete unused files or upgrade plan soon.'}
              </div>
            </div>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <button onClick={()=>setShowBanner(false)} style={{ padding:'6px 12px', background:'rgba(255,255,255,.2)', border:'1px solid rgba(255,255,255,.4)', color:'#fff', borderRadius:8, cursor:'pointer', fontSize:12, fontWeight:700 }}>Dismiss</button>
            <Link href="/pricing" style={{ padding:'6px 14px', background:'#fff', color: pct>=90?'#dc2626':'#92400e', borderRadius:8, textDecoration:'none', fontSize:12, fontWeight:800 }}>Upgrade →</Link>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ background:'#fff', borderBottom:'1px solid #e5e7eb', padding:'1rem 1.5rem', display:'flex', alignItems:'center', gap:12 }}>
        <Link href="/admin" style={{ color:'#1a3a6b', textDecoration:'none', fontSize:14 }}>← Admin</Link>
        <div style={{ flex:1 }}>
          <h1 style={{ fontSize:20, fontWeight:900, color:'#111', margin:0 }}>💾 Storage Manager</h1>
          <p style={{ color:'#6b7280', fontSize:13, margin:'2px 0 0' }}>Manage files — PDFs, images, GIFs, diagrams</p>
        </div>
        <Link href="/admin/content/upload-pdf" style={{ padding:'9px 18px', background:'#1a3a6b', color:'#fff', borderRadius:10, textDecoration:'none', fontWeight:700, fontSize:14 }}>+ Upload File</Link>
      </div>

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'1.5rem 1rem' }}>

        {/* Quota Card */}
        <div style={{ background:'#fff', borderRadius:16, border:`2px solid ${pct>=90?'#dc2626': pct>=75?'#f59e0b': '#e5e7eb'}`, padding:'1.5rem', marginBottom:'1.5rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1rem' }}>
            <div>
              <h2 style={{ fontSize:18, fontWeight:800, margin:'0 0 4px' }}>Storage Usage</h2>
              <div style={{ fontSize:14, color:'#6b7280' }}>
                <strong style={{ color:'#111', fontSize:20 }}>{fmt(totalBytes)}</strong>
                {' '}used of <strong style={{ color:'#111' }}>{TOTAL_QUOTA_MB} MB</strong> ({pct}%)
              </div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:12, color:'#6b7280' }}>Free Space</div>
              <div style={{ fontSize:22, fontWeight:900, color:barColor }}>{fmt((TOTAL_QUOTA_MB-usedMB)*1024*1024)}</div>
            </div>
          </div>

          {/* Bar */}
          <div style={{ height:20, background:'#f3f4f6', borderRadius:10, overflow:'hidden', marginBottom:'1rem' }}>
            <div style={{ height:'100%', width:`${pct}%`, background:`linear-gradient(90deg,${barColor},${barColor}cc)`, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'flex-end', paddingRight:8, transition:'width .8s ease' }}>
              {pct>15 && <span style={{ color:'#fff', fontSize:11, fontWeight:700 }}>{pct}%</span>}
            </div>
          </div>

          {/* Breakdown */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem', marginBottom:'1rem' }}>
            {[
              { label:'📄 PDFs',   size:pdfSz,             color:'#1a3a6b', bg:'#e8eef8' },
              { label:'🖼️ Images', size:imgSz,             color:'#0a5e3f', bg:'#e8f5ef' },
              { label:'📦 Other',  size:totalBytes-pdfSz-imgSz, color:'#7c3aed', bg:'#f5f3ff' },
            ].map(s => (
              <div key={s.label} style={{ background:s.bg, borderRadius:10, padding:'0.875rem', textAlign:'center' }}>
                <div style={{ fontSize:13, fontWeight:700, color:s.color }}>{s.label}</div>
                <div style={{ fontSize:18, fontWeight:900, color:s.color, marginTop:4 }}>{fmt(s.size)}</div>
                <div style={{ fontSize:11, color:'#6b7280', marginTop:2 }}>{totalBytes?Math.round((s.size/totalBytes)*100):0}% of used</div>
              </div>
            ))}
          </div>

          {/* Zone indicators */}
          <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
            {[
              { label:'Safe Zone',    range:'0-74%',   color:'#22c55e', active: pct<75 },
              { label:'Warning Zone', range:'75-89%',  color:'#f59e0b', active: pct>=75&&pct<90 },
              { label:'Critical',     range:'90-100%', color:'#dc2626', active: pct>=90 },
            ].map(z => (
              <div key={z.label} style={{ display:'flex', alignItems:'center', gap:6, padding:'4px 12px', borderRadius:20, background: z.active?`${z.color}22`:'#f3f4f6', border:`1.5px solid ${z.active?z.color:'#e5e7eb'}` }}>
                <span style={{ width:8, height:8, borderRadius:'50%', background: z.active?z.color:'#d1d5db', display:'inline-block' }} />
                <span style={{ fontSize:12, fontWeight: z.active?700:500, color: z.active?z.color:'#9ca3af' }}>{z.label} ({z.range})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div style={{ display:'flex', gap:'0.75rem', marginBottom:'1rem', flexWrap:'wrap', alignItems:'center' }}>
          <div style={{ display:'flex', gap:4, background:'#fff', borderRadius:10, padding:4, border:'1px solid #e5e7eb' }}>
            {(['all','pdf','image','video'] as const).map(f => (
              <button key={f} onClick={()=>setFilter(f)} style={{ padding:'6px 12px', borderRadius:7, border:'none', fontWeight:700, fontSize:12, cursor:'pointer', fontFamily:'inherit', background: filter===f?'#1a3a6b':'transparent', color: filter===f?'#fff':'#6b7280' }}>
                {f==='all'?'📁 All': f==='pdf'?'📄 PDF': f==='image'?'🖼️ Images':'🎬 Videos'}
              </button>
            ))}
          </div>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value as typeof sortBy)} style={{ padding:'7px 12px', border:'1px solid #e5e7eb', borderRadius:10, fontSize:13, background:'#fff', fontFamily:'inherit', fontWeight:600 }}>
            <option value="date">Sort: Date</option>
            <option value="size">Sort: Size</option>
            <option value="name">Sort: Name</option>
          </select>
          {selected.length>0 && (
            <button onClick={delSelected} style={{ padding:'7px 14px', background:'#dc2626', color:'#fff', border:'none', borderRadius:10, fontWeight:700, cursor:'pointer', fontSize:13 }}>
              🗑️ Delete {selected.length} selected
            </button>
          )}
          <span style={{ fontSize:13, color:'#6b7280', marginLeft:'auto' }}>{filtered.length} files</span>
        </div>

        {/* File Table */}
        <div style={{ background:'#fff', borderRadius:16, border:'1px solid #e5e7eb', overflow:'hidden' }}>
          <div style={{ display:'grid', gridTemplateColumns:'40px 1fr 80px 110px 110px 100px 110px', gap:8, padding:'10px 16px', background:'#f9fafb', borderBottom:'1px solid #e5e7eb', fontSize:11, fontWeight:700, color:'#9ca3af', textTransform:'uppercase' }}>
            <div><input type="checkbox" onChange={e=>setSelected(e.target.checked?filtered.map(f=>f.id):[])} /></div>
            <div>File Name</div><div>Type</div><div>Size</div><div>Uploaded By</div><div>Date</div><div>Actions</div>
          </div>
          {filtered.map(f => (
            <div key={f.id} style={{ display:'grid', gridTemplateColumns:'40px 1fr 80px 110px 110px 100px 110px', gap:8, padding:'11px 16px', borderBottom:'1px solid #f3f4f6', alignItems:'center', background: selected.includes(f.id)?'#eff6ff':'#fff' }}>
              <input type="checkbox" checked={selected.includes(f.id)} onChange={()=>setSelected(p=>p.includes(f.id)?p.filter(x=>x!==f.id):[...p,f.id])} />
              <div style={{ display:'flex', alignItems:'center', gap:8, minWidth:0 }}>
                <span style={{ fontSize:18, flexShrink:0 }}>{f.category==='pdf'?'📄': f.category==='image'?'🖼️':'📁'}</span>
                <span style={{ fontSize:13, fontWeight:600, color:'#111', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{f.name}</span>
              </div>
              <span style={{ background:'#f3f4f6', color:'#374151', fontSize:11, fontWeight:700, padding:'3px 8px', borderRadius:20, width:'fit-content' }}>{f.type}</span>
              <span style={{ fontSize:13, fontWeight:700, color: f.size>5000000?'#dc2626':'#374151' }}>{fmt(f.size)}</span>
              <span style={{ fontSize:12, color:'#6b7280' }}>{f.uploadedBy}</span>
              <span style={{ fontSize:12, color:'#6b7280' }}>{f.uploadedAt}</span>
              <div style={{ display:'flex', gap:5 }}>
                <a href={f.url} style={{ padding:'4px 8px', background:'#e8eef8', color:'#1a3a6b', borderRadius:7, textDecoration:'none', fontSize:11, fontWeight:700 }}>View</a>
                <button onClick={()=>{if(confirm('Delete?')) setFiles(p=>p.filter(x=>x.id!==f.id))}} style={{ padding:'4px 8px', background:'#fee2e2', color:'#dc2626', border:'none', borderRadius:7, cursor:'pointer', fontSize:11, fontWeight:700 }}>Del</button>
              </div>
            </div>
          ))}
          {filtered.length===0 && (
            <div style={{ textAlign:'center', padding:'3rem', color:'#6b7280' }}>
              <div style={{ fontSize:48 }}>📁</div>
              <p style={{ marginTop:'1rem' }}>No files found</p>
            </div>
          )}
        </div>

        {/* Tips */}
        <div style={{ marginTop:'1.5rem', background:'#e8eef8', borderRadius:14, padding:'1.25rem', border:'1px solid #c7d5f0' }}>
          <div style={{ fontWeight:700, fontSize:14, color:'#1a3a6b', marginBottom:8 }}>💡 Storage Saving Tips</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.6rem', fontSize:13, color:'#374151' }}>
            <div>✅ Compress PDFs before upload (smallpdf.com)</div>
            <div>✅ Use WebP format instead of PNG (70% smaller)</div>
            <div>✅ Embed YouTube links instead of uploading videos</div>
            <div>✅ Delete old question papers regularly</div>
            <div>✅ Max file size: 20MB per upload</div>
            <div>✅ Use Wikimedia Commons for diagrams (free)</div>
          </div>
        </div>
      </div>
    </div>
  )
}
