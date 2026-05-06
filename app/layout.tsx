import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import TopBar          from '@/components/layout/TopBar'
import MainHeader      from '@/components/layout/MainHeader'
import SubjectNav      from '@/components/layout/SubjectNav'
import Footer          from '@/components/layout/Footer'
import JarvisAssistant from '@/components/layout/JarvisAssistant'
import { SITE }        from '@/lib/constants'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title:        { default: `${SITE.name} — Har Sawaal Ka Jawab`, template: `%s — ${SITE.name}` },
  description:  SITE.description,
  keywords:     SITE.keywords,
  authors:      [{ name: 'MscTutor Team' }],
  creator:      'MscTutor',
  openGraph: {
    type:      'website',
    locale:    'en_IN',
    url:       SITE.url,
    siteName:  SITE.name,
    title:     `${SITE.name} — Free AI Education Platform`,
    description: SITE.description,
    images:    [{ url: SITE.ogImage, width: 1200, height: 630, alt: 'MscTutor' }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       `${SITE.name} — Free AI Education Platform`,
    description: SITE.description,
    images:      [SITE.ogImage],
  },
  manifest:  '/manifest.json',
  robots: {
    index:  true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="theme-color" content="#1a3a6b" />
      </head>
      <body className="bg-[#f0f4ff] dark:bg-[#0a0f1e] text-[#0f1f3d] dark:text-[#e8eeff] min-h-screen">
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
      </body>
    </html>
  )
}
