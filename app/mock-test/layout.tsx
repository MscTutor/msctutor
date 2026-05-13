import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import { JsonLd, faqSchema, breadcrumbSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = buildMetadata({ pageKey:'mockTest', path:'/mock-test' })

const TEST_FAQS = [
  { question:'Are the mock tests free?', answer:'Yes! AI-generated mock tests are completely free. You can take unlimited tests.' },
  { question:'Which boards are supported?', answer:'CBSE, ICSE and State Board syllabuses are supported for Class 6-12.' },
  { question:'Can I download the test results?', answer:'Yes! After completing the test you can download a PDF of your result with detailed analysis.' },
  { question:'How many questions per test?', answer:'You can choose 5, 10, 15, 20 or 30 questions per test. Adaptive difficulty based on your level.' },
]

export default function MockTestLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd data={[
        faqSchema(TEST_FAQS),
        breadcrumbSchema([{ name:'Home', url:'/' }, { name:'AI Mock Test', url:'/mock-test' }]),
      ]} />
    </>
  )
}
