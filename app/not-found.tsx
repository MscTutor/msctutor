'use client'
import Link from 'next/link'
import { useTranslations } from '@/lib/use-translations'

export default function NotFound() {
  const { t } = useTranslations()
  return (
    <div style={{ minHeight:'100vh', background:'#f8f9fc', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:'1rem', textAlign:'center', padding:'2rem' }}>
      <div style={{ fontSize:80 }}>📚</div>
      <h1 style={{ fontSize:28, fontWeight:900, color:'#111', margin:0 }}>404</h1>
      <p style={{ fontSize:16, color:'#6b7280', maxWidth:400 }}>{t('errors.notFound')}</p>
      <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap', justifyContent:'center' }}>
        <Link href="/" style={{ padding:'10px 24px', background:'#1a3a6b', color:'#fff', borderRadius:12, textDecoration:'none', fontWeight:700 }}>
          🏠 {t('errors.goHome')}
        </Link>
        <Link href="/ask" style={{ padding:'10px 24px', background:'#f3f4f6', color:'#374151', borderRadius:12, textDecoration:'none', fontWeight:700 }}>
          🤖 {t('nav.askAI')}
        </Link>
      </div>
    </div>
  )
}
