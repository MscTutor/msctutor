import type { MetadataRoute } from 'next'
const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://msctutor.in'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/', '/api/', '/dashboard/', '/teacher/',
          '/school-dashboard/', '/og/', '/_next/',
          '/admin/users', '/admin/security', '/admin/logs',
        ],
      },
      { userAgent: 'GPTBot', disallow: ['/'] },
      { userAgent: 'ChatGPT-User', disallow: ['/'] },
      { userAgent: 'CCBot', disallow: ['/'] },
      { userAgent: 'anthropic-ai', disallow: ['/'] },
      { userAgent: 'Google-Extended', allow: ['/'] },
    ],
    sitemap:  `${BASE}/sitemap.xml`,
    host:     BASE,
  }
}
