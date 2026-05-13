import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import { JsonLd, breadcrumbSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = buildMetadata({ pageKey:'blog', path:'/community' })

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd data={breadcrumbSchema([{ name:'Home', url:'/' }, { name:'Community', url:'/community' }])} />
    </>
  )
}
