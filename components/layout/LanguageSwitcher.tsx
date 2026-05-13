'use client'
// components/layout/LanguageSwitcher.tsx — 12 Languages, FREE, Grouped UI

import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { LOCALE_NAMES, LOCALE_FLAGS, LOCALE_GROUPS, type Locale } from '@/i18n'

export default function LanguageSwitcher({ variant = 'compact' }: { variant?: 'dropdown'|'pills'|'compact'|'full' }) {
  const { locale, setLocale } = useLanguage()
  const [open, setOpen] = useState(false)

  if (variant === 'pills') {
    return (
      <div>
        {Object.entries(LOCALE_GROUPS).map(([grp, locs]) => (
          <div key={grp} style={{ marginBottom: '0.75rem' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: .6, marginBottom: 6 }}>{grp}</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {locs.map(l => (
                <button key={l} onClick={() => setLocale(l)}
                  style={{ padding: '5px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, background: locale===l?'#1a3a6b':'#f3f4f6', color: locale===l?'#fff':'#374151', transition: 'all .15s' }}>
                  {LOCALE_FLAGS[l]} {LOCALE_NAMES[l]}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'full') {
    return (
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        {Object.entries(LOCALE_GROUPS).map(([grp, locs]) => (
          <div key={grp}>
            <div style={{ padding: '8px 16px', background: '#f9fafb', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: .6, borderBottom: '1px solid #f3f4f6' }}>{grp}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
              {locs.map(l => (
                <button key={l} onClick={() => setLocale(l)}
                  style={{ padding: '10px 12px', border: 'none', borderBottom: '1px solid #f9fafb', background: locale===l?'#e8eef8':'#fff', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 8, color: locale===l?'#1a3a6b':'#374151', fontWeight: locale===l?700:500 }}>
                  <span style={{ fontSize: 20 }}>{LOCALE_FLAGS[l]}</span>
                  <span style={{ fontSize: 13 }}>{LOCALE_NAMES[l]}</span>
                  {locale===l && <span style={{ marginLeft: 'auto', color: '#1a3a6b' }}>✓</span>}
                </button>
              ))}
            </div>
          </div>
        ))}
        <div style={{ padding: '8px 16px', background: '#f9fafb', fontSize: 11, color: '#9ca3af', textAlign: 'center' }}>🌍 12 languages · Free · Local JSON files</div>
      </div>
    )
  }

  // compact (default — used in header)
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px', border: '1.5px solid #e5e7eb', borderRadius: 9, background: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, color: '#374151' }}>
        <span style={{ fontSize: 15 }}>{LOCALE_FLAGS[locale]}</span>
        <span>{locale.toUpperCase()}</span>
        <span style={{ fontSize: 9, color: '#9ca3af' }}>{open?'▲':'▼'}</span>
      </button>

      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 998 }} onClick={() => setOpen(false)} />
          <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 5, background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', boxShadow: '0 8px 30px rgba(0,0,0,.13)', zIndex: 999, width: 280, overflow: 'hidden', animation: 'fdD .15s ease' }}>
            <style>{`@keyframes fdD{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}`}</style>

            {Object.entries(LOCALE_GROUPS).map(([grp, locs]) => (
              <div key={grp}>
                <div style={{ padding: '6px 12px', background: '#f9fafb', fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: .8, borderBottom: '1px solid #f3f4f6' }}>{grp}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  {locs.map(l => (
                    <button key={l} onClick={() => { setLocale(l); setOpen(false) }}
                      style={{ padding: '8px 12px', border: 'none', background: locale===l?'#e8eef8':'#fff', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 7, color: locale===l?'#1a3a6b':'#374151', fontWeight: locale===l?700:500, fontSize: 13, borderBottom: '1px solid #f9fafb' }}>
                      <span style={{ fontSize: 17 }}>{LOCALE_FLAGS[l]}</span>
                      <span>{LOCALE_NAMES[l]}</span>
                      {locale===l && <span style={{ marginLeft: 'auto', color: '#1a3a6b', fontSize: 11 }}>✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ padding: '7px 12px', background: '#f9fafb', borderTop: '1px solid #f3f4f6', fontSize: 10, color: '#9ca3af', textAlign: 'center' }}>🌍 12 languages · ✓ Free · No API</div>
          </div>
        </>
      )}
    </div>
  )
}
