'use client'
// app/report/page.tsx — Student Progress Report Card (printable)

import { useState, useRef } from 'react'
import Link from 'next/link'

// ── Report data (mock — replaces with DB when Prisma connected) ────────────
const REPORT = {
  student: {
    name:    'Aryan Sharma',
    class:   'VIII-A',
    rollNo:  12,
    school:  'Delhi Public School',
    session: '2025-2026',
    dob:     '15 Oct 2011',
    avatar:  '👦',
  },
  term: 'Annual Exam',
  examDate: 'May 2026',
  maxMarks: 100,
  subjects: [
    { name:'Mathematics',        icon:'📐', theory:84, practical:18, practicalMax:20, grade:'A',  remarks:'Excellent in Algebra. Needs practice in Geometry.'  },
    { name:'Science',            icon:'🔬', theory:91, practical:19, practicalMax:20, grade:'A+', remarks:'Outstanding lab work. Keep up the great effort!'    },
    { name:'English',            icon:'📖', theory:76, practical:0,  practicalMax:0,  grade:'B+', remarks:'Good comprehension. Focus on writing skills.'       },
    { name:'Hindi',              icon:'🖊️', theory:80, practical:0,  practicalMax:0,  grade:'A',  remarks:'Fluent reading. Grammar needs attention.'          },
    { name:'Social Science',     icon:'🌍', theory:73, practical:0,  practicalMax:0,  grade:'B+', remarks:'Good map work. Revise history chapters.'            },
    { name:'Computer Science',   icon:'💻', theory:88, practical:18, practicalMax:20, grade:'A',  remarks:'Strong programming skills. Excellent project work.' },
  ],
  attendance: { present:172, total:187, pct:92 },
  coScholastic: [
    { area:'Health & Physical Education', grade:'A+' },
    { area:'Work Experience',             grade:'A'  },
    { area:'Art Education',               grade:'A'  },
  ],
  classPrev: {
    rank: 4,
    total: 45,
    classAvg: 74.2,
  },
  remarks: {
    classTeacher:  'Aryan is a sincere and hardworking student. He actively participates in class and has shown significant improvement this year. With consistent effort, he can achieve top rank.',
    principal:     'Wishing Aryan continued success. His dedication is commendable.',
  },
}

function gradeColor(grade: string) {
  if (grade.includes('+') && grade[0] === 'A') return '#22c55e'
  if (grade === 'A') return '#3b82f6'
  if (grade.includes('+')) return '#f59e0b'
  if (grade === 'B') return '#f97316'
  return '#ef4444'
}

function gradePoints(grade: string): number {
  const map: Record<string,number> = { 'A+':10, 'A':9, 'B+':8, 'B':7, 'C':6, 'D':5, 'E':4 }
  return map[grade] ?? 5
}

export default function ReportPage() {
  const [isPrinting, setIsPrinting] = useState(false)
  const reportRef = useRef<HTMLDivElement>(null)

  const totalTheory    = REPORT.subjects.reduce((a,s) => a + s.theory, 0)
  const totalPractical = REPORT.subjects.reduce((a,s) => a + s.practical, 0)
  const totalMax       = REPORT.subjects.reduce((a,s) => a + REPORT.maxMarks + s.practicalMax, 0)
  const totalObtained  = totalTheory + totalPractical
  const percentage     = Math.round((totalObtained / totalMax) * 100)
  const cgpa           = (REPORT.subjects.reduce((a,s) => a + gradePoints(s.grade), 0) / REPORT.subjects.length).toFixed(1)

  const overallGrade = percentage >= 91 ? 'A+' : percentage >= 81 ? 'A' : percentage >= 71 ? 'B+' : percentage >= 61 ? 'B' : percentage >= 51 ? 'C' : 'D'

  function handlePrint() {
    setIsPrinting(true)
    setTimeout(() => { window.print(); setIsPrinting(false) }, 100)
  }

  return (
    <div style={{ minHeight:'100vh', background:'#f0f4f8', fontFamily:'Sora,Inter,sans-serif' }}>

      {/* ── Top controls (hidden in print) ─────────────────────────── */}
      <div className="no-print" style={{ background:'linear-gradient(135deg,#1a3a6b,#0e2347)', padding:'14px 20px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <Link href="/" style={{ color:'rgba(255,255,255,.6)', textDecoration:'none', fontSize:13 }}>← Home</Link>
          <Link href="/analytics" style={{ color:'rgba(255,255,255,.6)', textDecoration:'none', fontSize:13 }}>📊 Analytics</Link>
          <Link href="/parent" style={{ color:'rgba(255,255,255,.6)', textDecoration:'none', fontSize:13 }}>👨‍👩‍👧 Parent View</Link>
        </div>
        <button onClick={handlePrint}
          style={{ display:'flex', alignItems:'center', gap:8, background:'#f59e0b', color:'#1a3a6b', border:'none', borderRadius:10, padding:'9px 20px', fontWeight:800, fontSize:14, cursor:'pointer', fontFamily:'inherit' }}>
          🖨️ Print / Download PDF
        </button>
      </div>

      <style>{`
        @media print {
          /* ── Page setup ── */
          @page {
            size: A4 portrait;
            margin: 12mm 14mm 12mm 14mm;
          }

          /* ── Hide non-report elements ── */
          .no-print          { display: none !important; }
          header, nav, footer,
          [data-nav], [data-topbar] { display: none !important; }

          /* ── Body reset ── */
          html, body {
            background: #fff !important;
            color: #000 !important;
            font-size: 11pt !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          /* ── Card reset ── */
          .report-card {
            box-shadow: none !important;
            border-radius: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
            border: none !important;
            page-break-inside: avoid;
          }

          /* ── Table rules ── */
          table { page-break-inside: auto !important; }
          tr    { page-break-inside: avoid !important; page-break-after: auto !important; }
          thead { display: table-header-group !important; }
          tfoot { display: table-footer-group !important; }

          /* ── Section break hints ── */
          .report-section { page-break-inside: avoid !important; }

          /* ── Keep gradients & colors in print ── */
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }

          /* ── Shrink font sizes slightly for fit ── */
          td, th     { font-size: 9pt !important; padding: 6px 8px !important; }
          h1         { font-size: 16pt !important; }
          h3, h4     { font-size: 11pt !important; }
          .stat-value { font-size: 14pt !important; }
        }
      `}</style>

      {/* ── REPORT CARD ──────────────────────────────────────────────── */}
      <div ref={reportRef} className="report-card" style={{ maxWidth:820, margin:'28px auto 40px', background:'#fff', borderRadius:20, boxShadow:'0 4px 30px rgba(0,0,0,.1)', overflow:'hidden' }}>

        {/* Header */}
        <div style={{ background:'linear-gradient(135deg,#1a3a6b 0%,#0e2347 100%)', color:'#fff', padding:'24px 28px', textAlign:'center' }}>
          <div style={{ fontSize:14, color:'rgba(255,255,255,.7)', letterSpacing:1, textTransform:'uppercase', marginBottom:6 }}>MscTutor Learning Platform</div>
          <h1 style={{ margin:'0 0 4px', fontSize:22, fontWeight:900 }}>Student Progress Report Card</h1>
          <div style={{ fontSize:13, color:'rgba(255,255,255,.75)' }}>{REPORT.term} — Session {REPORT.student.session}</div>
        </div>

        {/* Student info */}
        <div style={{ padding:'20px 28px', borderBottom:'1px solid #e5e7eb', background:'#f8faff', display:'grid', gridTemplateColumns:'auto 1fr auto', gap:20, alignItems:'center' }}>
          <div style={{ fontSize:60 }}>{REPORT.student.avatar}</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px 24px' }}>
            {[
              ['Student Name', REPORT.student.name],
              ['Class & Section', REPORT.student.class],
              ['Roll Number', REPORT.student.rollNo],
              ['Date of Birth', REPORT.student.dob],
              ['School', REPORT.student.school],
              ['Exam Date', REPORT.examDate],
            ].map(([label, value]) => (
              <div key={String(label)}>
                <span style={{ fontSize:10, color:'#9ca3af', display:'block' }}>{label}</span>
                <span style={{ fontSize:13, fontWeight:700, color:'#1a3a6b' }}>{value}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign:'center', background:'#fff', borderRadius:14, padding:'14px 18px', border:'2px solid #1a3a6b' }}>
            <div style={{ fontSize:32, fontWeight:900, color:'#1a3a6b' }}>{percentage}%</div>
            <div style={{ fontSize:11, color:'#6b7280', margin:'2px 0' }}>Overall</div>
            <div style={{ fontSize:18, fontWeight:800, color: gradeColor(overallGrade) }}>{overallGrade}</div>
            <div style={{ fontSize:10, color:'#9ca3af' }}>CGPA {cgpa}</div>
          </div>
        </div>

        {/* Marks table */}
        <div style={{ padding:'20px 28px' }}>
          <h3 style={{ margin:'0 0 14px', fontSize:15, fontWeight:800, color:'#1a3a6b', borderLeft:'4px solid #1a3a6b', paddingLeft:10 }}>Academic Performance</h3>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
              <thead>
                <tr style={{ background:'#1a3a6b', color:'#fff' }}>
                  <th style={{ padding:'10px 12px', textAlign:'left', borderRadius:'6px 0 0 6px' }}>Subject</th>
                  <th style={{ padding:'10px 12px', textAlign:'center' }}>Theory ({REPORT.maxMarks})</th>
                  <th style={{ padding:'10px 12px', textAlign:'center' }}>Practical</th>
                  <th style={{ padding:'10px 12px', textAlign:'center' }}>Total</th>
                  <th style={{ padding:'10px 12px', textAlign:'center' }}>%</th>
                  <th style={{ padding:'10px 12px', textAlign:'center' }}>Grade</th>
                  <th style={{ padding:'10px 12px', textAlign:'left', borderRadius:'0 6px 6px 0' }}>Teacher Remarks</th>
                </tr>
              </thead>
              <tbody>
                {REPORT.subjects.map((s, i) => {
                  const total = s.theory + s.practical
                  const subMax = REPORT.maxMarks + s.practicalMax
                  const subPct = Math.round((total / subMax) * 100)
                  const gc = gradeColor(s.grade)
                  return (
                    <tr key={s.name} style={{ background: i%2===0 ? '#fff' : '#f9fafb', borderBottom:'1px solid #f3f4f6' }}>
                      <td style={{ padding:'10px 12px' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                          <span style={{ fontSize:16 }}>{s.icon}</span>
                          <span style={{ fontWeight:700, color:'#1a3a6b' }}>{s.name}</span>
                        </div>
                      </td>
                      <td style={{ padding:'10px 12px', textAlign:'center', fontWeight:700 }}>{s.theory}</td>
                      <td style={{ padding:'10px 12px', textAlign:'center', color: s.practicalMax > 0 ? '#374151' : '#d1d5db' }}>
                        {s.practicalMax > 0 ? `${s.practical}/${s.practicalMax}` : '—'}
                      </td>
                      <td style={{ padding:'10px 12px', textAlign:'center', fontWeight:800, color:'#1a3a6b' }}>{total}/{subMax}</td>
                      <td style={{ padding:'10px 12px', textAlign:'center' }}>
                        <div style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
                          <div style={{ width:40, height:6, background:'#f3f4f6', borderRadius:3, overflow:'hidden' }}>
                            <div style={{ height:'100%', width:`${subPct}%`, background:gc, borderRadius:3 }} />
                          </div>
                          <span style={{ fontSize:12, fontWeight:700, color:gc }}>{subPct}%</span>
                        </div>
                      </td>
                      <td style={{ padding:'10px 12px', textAlign:'center' }}>
                        <span style={{ background:`${gc}18`, color:gc, borderRadius:6, padding:'2px 10px', fontWeight:800, fontSize:12 }}>{s.grade}</span>
                      </td>
                      <td style={{ padding:'10px 12px', fontSize:11, color:'#6b7280', maxWidth:200 }}>{s.remarks}</td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr style={{ background:'#eff6ff', fontWeight:800 }}>
                  <td style={{ padding:'10px 12px', color:'#1a3a6b' }}>TOTAL</td>
                  <td style={{ padding:'10px 12px', textAlign:'center', color:'#1a3a6b' }}>{totalTheory}</td>
                  <td style={{ padding:'10px 12px', textAlign:'center', color:'#1a3a6b' }}>{totalPractical}</td>
                  <td style={{ padding:'10px 12px', textAlign:'center', color:'#1a3a6b' }}>{totalObtained}/{totalMax}</td>
                  <td style={{ padding:'10px 12px', textAlign:'center', color: gradeColor(overallGrade) }}>{percentage}%</td>
                  <td style={{ padding:'10px 12px', textAlign:'center' }}>
                    <span style={{ background:`${gradeColor(overallGrade)}18`, color:gradeColor(overallGrade), borderRadius:6, padding:'2px 10px', fontWeight:900, fontSize:13 }}>{overallGrade}</span>
                  </td>
                  <td style={{ padding:'10px 12px', color:'#1a3a6b', fontSize:12 }}>CGPA: {cgpa} | Rank: {REPORT.classPrev.rank}/{REPORT.classPrev.total}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Attendance + Co-Scholastic */}
        <div style={{ padding:'0 28px 20px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
          <div style={{ border:'1px solid #e5e7eb', borderRadius:12, padding:16 }}>
            <h4 style={{ margin:'0 0 12px', fontSize:13, fontWeight:800, color:'#1a3a6b' }}>📅 Attendance</h4>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <div>
                <div style={{ fontSize:28, fontWeight:900, color: REPORT.attendance.pct >= 90 ? '#22c55e' : '#f59e0b' }}>{REPORT.attendance.pct}%</div>
                <div style={{ fontSize:11, color:'#6b7280' }}>{REPORT.attendance.present} / {REPORT.attendance.total} days</div>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ height:10, background:'#f3f4f6', borderRadius:5, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${REPORT.attendance.pct}%`, background: REPORT.attendance.pct >= 90 ? '#22c55e' : '#f59e0b', borderRadius:5 }} />
                </div>
                <div style={{ fontSize:10, color:'#9ca3af', marginTop:4 }}>Min. required: 75%</div>
              </div>
            </div>
          </div>

          <div style={{ border:'1px solid #e5e7eb', borderRadius:12, padding:16 }}>
            <h4 style={{ margin:'0 0 12px', fontSize:13, fontWeight:800, color:'#1a3a6b' }}>🎨 Co-Scholastic Areas</h4>
            {REPORT.coScholastic.map(c => (
              <div key={c.area} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'4px 0', borderBottom:'1px solid #f9fafb' }}>
                <span style={{ fontSize:12, color:'#374151' }}>{c.area}</span>
                <span style={{ fontSize:12, fontWeight:800, color: gradeColor(c.grade) }}>{c.grade}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance summary */}
        <div style={{ padding:'0 28px 20px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10 }}>
            {[
              { label:'Highest Score',  value:`${Math.max(...REPORT.subjects.map(s=>s.theory))}/${REPORT.maxMarks}`,      color:'#22c55e' },
              { label:'Class Average',  value:`${REPORT.classPrev.classAvg}%`,                                             color:'#3b82f6' },
              { label:'Your Score',     value:`${percentage}%`,                                                             color:'#1a3a6b' },
              { label:'Class Rank',     value:`#${REPORT.classPrev.rank} / ${REPORT.classPrev.total}`,                     color:'#f59e0b' },
            ].map(s => (
              <div key={s.label} style={{ background:'#f8faff', border:'1px solid #e0e7ff', borderRadius:10, padding:'12px 14px', textAlign:'center' }}>
                <div style={{ fontSize:18, fontWeight:900, color:s.color }}>{s.value}</div>
                <div style={{ fontSize:11, color:'#6b7280', marginTop:2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Teacher remarks */}
        <div style={{ padding:'0 28px 20px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
          <div style={{ border:'1px solid #e5e7eb', borderRadius:12, padding:16 }}>
            <h4 style={{ margin:'0 0 8px', fontSize:13, fontWeight:800, color:'#1a3a6b' }}>📝 Class Teacher's Remarks</h4>
            <p style={{ fontSize:12, color:'#374151', lineHeight:1.7, margin:0, fontStyle:'italic' }}>"{REPORT.remarks.classTeacher}"</p>
          </div>
          <div style={{ border:'1px solid #e5e7eb', borderRadius:12, padding:16 }}>
            <h4 style={{ margin:'0 0 8px', fontSize:13, fontWeight:800, color:'#1a3a6b' }}>🏫 Principal's Remarks</h4>
            <p style={{ fontSize:12, color:'#374151', lineHeight:1.7, margin:0, fontStyle:'italic' }}>"{REPORT.remarks.principal}"</p>
            <div style={{ marginTop:14, borderTop:'1px solid #f3f4f6', paddingTop:10, display:'flex', justifyContent:'space-between', fontSize:11, color:'#9ca3af' }}>
              <span>Signature: ___________</span>
              <span>Date: ___________</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ background:'#f0f4f8', padding:'14px 28px', borderTop:'1px solid #e5e7eb', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontSize:11, color:'#9ca3af' }}>Generated by MscTutor.in — {new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}</span>
          <div style={{ display:'flex', gap:10 }}>
            <span style={{ fontSize:11, color:'#9ca3af' }}>msctutor.vercel.app</span>
          </div>
        </div>
      </div>

      {/* Actions below report */}
      <div className="no-print" style={{ maxWidth:820, margin:'0 auto 40px', padding:'0 16px', display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
        <Link href="/analytics"
          style={{ display:'flex', alignItems:'center', gap:7, padding:'10px 20px', background:'#1a3a6b', color:'#fff', borderRadius:12, textDecoration:'none', fontWeight:700, fontSize:14 }}>
          📊 View Full Analytics
        </Link>
        <Link href="/parent"
          style={{ display:'flex', alignItems:'center', gap:7, padding:'10px 20px', background:'#f0fdf4', color:'#166534', border:'1.5px solid #bbf7d0', borderRadius:12, textDecoration:'none', fontWeight:700, fontSize:14 }}>
          👨‍👩‍👧 Parent Dashboard
        </Link>
        <Link href="/dashboard"
          style={{ display:'flex', alignItems:'center', gap:7, padding:'10px 20px', background:'#eff6ff', color:'#1d4ed8', border:'1.5px solid #bfdbfe', borderRadius:12, textDecoration:'none', fontWeight:700, fontSize:14 }}>
          🎯 Keep Studying
        </Link>
      </div>
    </div>
  )
}
