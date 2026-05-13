'use client'
// app/dashboard/history/page.tsx — translated + upgraded

import { useEffect, useState }  from 'react'
import Link                      from 'next/link'
import { useTranslations }       from '@/lib/use-translations'

interface Question { slug:string; title:string; createdAt:string; subject?:{name:string} }

export default function HistoryPage() {
  const { t }                        = useTranslations()
  const [questions, setQuestions]    = useState<Question[]>([])
  const [loading,   setLoading]      = useState(true)

  useEffect(() => {
    fetch('/api/question/create?history=1')
      .then(r => r.json())
      .then(d => { setQuestions(d.questions ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <main style={{ maxWidth:800, margin:'0 auto', padding:'2rem 1rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:'1.5rem' }}>
        <Link href="/dashboard" style={{ color:'#6b7280', textDecoration:'none', fontSize:13 }}>← {t('common.back')}</Link>
        <h1 style={{ fontSize:24, fontWeight:800, color:'#111', margin:0 }}>📋 {t('dashboard.history')}</h1>
      </div>

      {loading ? (
        <div style={{ display:'flex', gap:4, padding:'2rem', justifyContent:'center' }}>
          {[0,1,2].map(i => <span key={i} style={{ width:8, height:8, background:'#2563eb', borderRadius:'50%', display:'inline-block', animation:`pulse .8s ${i*.2}s infinite` }}/>)}
          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}`}</style>
        </div>
      ) : questions.length === 0 ? (
        <div style={{ textAlign:'center', padding:'4rem 1rem', color:'#9ca3af' }}>
          <div style={{ fontSize:56, marginBottom:12 }}>📜</div>
          <div style={{ fontSize:16, fontWeight:700, color:'#374151', marginBottom:8 }}>{t('dashboard.noHistory')}</div>
          <Link href="/ask" style={{ display:'inline-block', marginTop:8, padding:'9px 22px', background:'#2563eb', color:'#fff', borderRadius:10, textDecoration:'none', fontWeight:700, fontSize:14 }}>
            {t('nav.askAI')} →
          </Link>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
          {questions.map(q => (
            <Link key={q.slug} href={`/question/${q.slug}`} style={{ textDecoration:'none' }}>
              <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:12, padding:'1rem 1.25rem', display:'flex', alignItems:'center', justifyContent:'space-between', transition:'border-color .15s' }}>
                <div>
                  <div style={{ fontWeight:600, color:'#111', fontSize:15 }}>
                    {q.title.slice(0, 80)}{q.title.length > 80 ? '…' : ''}
                  </div>
                  <div style={{ fontSize:12, color:'#9ca3af', marginTop:4 }}>
                    {q.subject?.name ?? t('common.subject')} · {new Date(q.createdAt).toLocaleDateString('en-IN')}
                  </div>
                </div>
                <span style={{ color:'#9ca3af', fontSize:18 }}>›</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
