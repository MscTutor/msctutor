// app/blog/[slug]/page.tsx — Single blog post

import type { Metadata }  from 'next'
import { notFound }       from 'next/navigation'
import Link               from 'next/link'
import { prisma }         from '@/lib/prisma'
import { SITE }           from '@/lib/constants'
import { buildMetadata }  from '@/lib/seo/metadata'
import { JsonLd, articleSchema, breadcrumbSchema } from '@/lib/seo/structured-data'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await prisma.blog.findUnique({ where: { slug: params.slug } })
  if (!post) return { title: 'Not Found' }
  const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://msctutor.in'
  return {
    title:       post.metaTitle ?? `${post.title} — ${SITE.name}`,
    description: post.metaDesc  ?? post.excerpt ?? '',
    alternates:  { canonical: `${BASE}/blog/${post.slug}` },
    openGraph: {
      type:        'article',
      title:       post.title,
      description: post.excerpt ?? '',
      url:         `${BASE}/blog/${post.slug}`,
      images:      post.coverImg ? [{ url: post.coverImg, width: 1200, height: 630, alt: post.title }] : [],
      publishedTime: post.createdAt?.toISOString(),
      modifiedTime:  post.updatedAt?.toISOString(),
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await prisma.blog.findUnique({ where: { slug: params.slug, published: true } })
  if (!post) notFound()

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>
      <nav style={{ fontSize: 13, color: '#6b7280', marginBottom: '1.5rem' }}>
        <Link href="/" style={{ color: '#1a3a6b' }}>Home</Link> &rsaquo;{' '}
        <Link href="/blog" style={{ color: '#1a3a6b' }}>Blog</Link> &rsaquo;{' '}
        <span>{post.title}</span>
      </nav>

      {post.coverImg && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.coverImg} alt={post.title} style={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 16, marginBottom: '1.5rem' }} />
      )}

      <h1 style={{ fontSize: 32, fontWeight: 800, color: '#111', lineHeight: 1.3, margin: '0 0 0.75rem' }}>{post.title}</h1>
      <div style={{ fontSize: 14, color: '#9ca3af', marginBottom: '2rem' }}>
        Published {new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
      </div>

      <div
        style={{ fontSize: 16, lineHeight: 1.8, color: '#374151' }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1.5px solid #e5e7eb', textAlign: 'center' }}>
        <Link href="/blog" style={{ color: '#1a3a6b', fontWeight: 600 }}>← Back to Blog</Link>
      </div>
      <JsonLd data={[
        articleSchema({ title:post.title, description:post.excerpt??'', url:`${process.env.NEXT_PUBLIC_APP_URL??'https://msctutor.in'}/blog/${post.slug}`, image:post.coverImg??undefined, datePublished:post.createdAt?.toISOString()??new Date().toISOString(), dateModified:post.updatedAt?.toISOString() }),
        breadcrumbSchema([{ name:'Home', url:'/' },{ name:'Blog', url:'/blog' },{ name:post.title, url:`/blog/${post.slug}` }]),
      ]} />
    </main>
  )
}
