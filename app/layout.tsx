import type { Metadata } from 'next'
import 'katex/dist/katex.min.css'
import './globals.css'
import { ThemeProvider }    from 'next-themes'
import { Toaster }          from 'react-hot-toast'
import TopBar               from '@/components/layout/TopBar'
import MainHeader           from '@/components/layout/MainHeader'
import SubjectNav           from '@/components/layout/SubjectNav'
import Footer               from '@/components/layout/Footer'
import JarvisAssistant      from '@/components/layout/JarvisAssistant'
import { LanguageProvider } from '@/lib/language-context'
import TranslationLoader    from '@/components/TranslationLoader'
import WebVitals            from '@/components/WebVitals'
import { SITE }             from '@/lib/constants'
import { LOCALE_TO_IETF }  from '@/lib/seo/metadata'

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://msctutor.in'
const LOCALES = ['en','hi','bn','gu','mr','ta','te','pa','ur','as','ar','fr']

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default:  'MscTutor — Free AI Tutor for Class 1-12 NCERT',
    template: '%s | MscTutor',
  },
  description: 'Free AI tutor for Class 1-12 NCERT. Ask via text, image, voice or PDF. Step-by-step answers in Hindi, English and 10+ Indian languages. Adaptive learning.',
  keywords: ['NCERT solutions','AI tutor','free education India','class 10','class 12','JEE','NEET','CBSE','ICSE','Hindi medium','free homework help'],
  authors:   [{ name:'MscTutor Team', url:BASE }],
  creator:   'MscTutor',
  publisher: 'MscTutor',
  openGraph: {
    type:      'website',
    siteName:  'MscTutor',
    locale:    'en_IN',
    title:     'MscTutor — Free AI Tutor for Class 1-12 NCERT',
    description:'Free AI tutor for Class 1-12. Text, image, voice or PDF. Answers in 12 languages.',
    images: [{ url:`${BASE}/og/home/en.png`, width:1200, height:630, alt:'MscTutor — Free AI Education' }],
  },
  twitter: {
    card:        'summary_large_image',
    site:        '@MscTutor',
    creator:     '@MscTutor',
    title:       'MscTutor — Free AI Tutor for Class 1-12',
    description: 'Free AI tutor for Class 1-12 NCERT in 12 languages.',
    images:      [`${BASE}/og/home/en.png`],
  },
  alternates: {
    canonical: BASE,
    languages: Object.fromEntries(
      LOCALES.map(l => [LOCALE_TO_IETF[l]??l, l==='en' ? BASE : `${BASE}/${l}`])
    ),
  },
  robots:   { index:true, follow:true, googleBot:{ index:true, follow:true, 'max-image-preview':'large', 'max-snippet':-1 } },
  manifest: '/manifest.json',
  icons: {
    icon:     '/msctutor-logo.png',
    shortcut: '/msctutor-logo.png',
    apple:    '/icons/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="icon" href="/msctutor-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="theme-color" content="#1a3a6b" />
        <meta name="application-name" content="MscTutor" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MscTutor" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* Hreflang for all 12 languages */}
        {LOCALES.map(l => (
          <link key={l} rel="alternate" hrefLang={LOCALE_TO_IETF[l]??l}
            href={l === 'en' ? BASE : `${BASE}/${l}`} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={BASE} />
        {/* Preload critical resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.gstatic.com" />
      </head>
      <body className="bg-[#f0f4ff] dark:bg-[#0a0f1e] text-[#0f1f3d] dark:text-[#e8eeff] min-h-screen">
        <LanguageProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {/* ── STICKY HEADER STACK ── */}
          <div className="sticky top-0 z-50">
            <TopBar />
            <MainHeader />
            <SubjectNav />
          </div>

          {/* ── PAGE CONTENT ── */}
          <main>{children}</main>

          {/* ── FOOTER ── */}
          <Footer />

          {/* ── JARVIS AI ASSISTANT (floating) ── */}
          <JarvisAssistant />
          <TranslationLoader />
          <WebVitals />

          {/* ── TOAST NOTIFICATIONS ── */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: { background: '#1a3a6b', color: '#fff', borderRadius: '12px', fontSize: '14px' },
              success: { style: { background: '#10b981' } },
              error:   { style: { background: '#dc2626' } },
            }}
          />

          {/* ── PWA SERVICE WORKER ── */}
          <script dangerouslySetInnerHTML={{ __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').catch(function() {});
              });
            }
          `}} />
        </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
