import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { SITE } from '@/lib/constants'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await prisma.blog.findUnique({ where: { slug: params.slug } })
    if (!post) return { title: 'Not Found' }
    return {
      title: post.metaTitle ?? `${post.title} - ${SITE.name}`,
      description: post.metaDesc ?? post.excerpt ?? '',
      alternates: { canonical: `${SITE.url}/blog/${post.slug}` },
      openGraph: { title: post.title, description: post.excerpt ?? '', images: post.coverImg ? [post.coverImg] : [] },
    }
  } catch {
    return { title: `Blog Article - ${SITE.name}` }
  }
}

export default async function BlogPostPage({ params }: Props) {
  let post: {
    slug: string
    title: string
    coverImg?: string | null
    createdAt: Date
    content: string
  } | null = null

  try {
    post = await prisma.blog.findUnique({ where: { slug: params.slug, published: true } })
  } catch {
    post = null
  }

  if (!post) notFound()

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>
      <nav style={{ fontSize: 13, color: '#6b7280', marginBottom: '1.5rem' }}>
        <Link href="/" style={{ color: '#1a3a6b' }}>Home</Link> › <Link href="/blog" style={{ color: '#1a3a6b' }}>Blog</Link> › <span>{post.title}</span>
      </nav>

      {post.coverImg && (
        <img src={post.coverImg} alt={post.title} style={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 16, marginBottom: '1.5rem' }} />
      )}

      <h1 style={{ fontSize: 32, fontWeight: 800, color: '#111', lineHeight: 1.3, margin: '0 0 0.75rem' }}>{post.title}</h1>
      <div style={{ fontSize: 14, color: '#9ca3af', marginBottom: '2rem' }}>
        Published {new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
      </div>

      <div style={{ fontSize: 16, lineHeight: 1.8, color: '#374151' }} dangerouslySetInnerHTML={{ __html: post.content }} />

      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1.5px solid #e5e7eb', textAlign: 'center' }}>
        <Link href="/blog" style={{ color: '#1a3a6b', fontWeight: 600 }}>← Back to Blog</Link>
      </div>
    </main>
  )
}
