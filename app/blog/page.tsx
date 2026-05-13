// app/blog/page.tsx — Blog list

import type { Metadata } from 'next'
import Link              from 'next/link'
import { prisma }        from '@/lib/prisma'
import { SITE }          from '@/lib/constants'
import { buildMetadata } from '@/lib/seo/metadata'
import { JsonLd, breadcrumbSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = buildMetadata({ pageKey:'blog', path:'/blog' })
export const revalidate = 3600

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof prisma.blog.findMany>> = []

  try {
    posts = await prisma.blog.findMany({
      where:   { published: true },
      orderBy: { createdAt: 'desc' },
      take:    20,
    })
  } catch (error) {
    console.error('blog page fallback:', error)
  }

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#111', margin: 0 }}>MscTutor Blog</h1>
        <p style={{ color: '#6b7280', marginTop: 8 }}>Study tips, exam strategies and educational resources</p>
      </div>

      {posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
          <div style={{ fontSize: 56 }}>✍️</div>
          <h2 style={{ fontSize: 20, marginTop: '1rem' }}>Blog posts coming soon!</h2>
          <p>We&apos;re working on helpful articles for students.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {posts.map(post => (
            <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <article style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                {post.coverImg && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.coverImg} alt={post.title} style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 10, flexShrink: 0 }} />
                )}
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111', margin: '0 0 0.5rem' }}>{post.title}</h2>
                  {post.excerpt && <p style={{ color: '#6b7280', fontSize: 14, margin: '0 0 0.75rem', lineHeight: 1.6 }}>{post.excerpt}</p>}
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
