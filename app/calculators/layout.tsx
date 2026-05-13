import type { Metadata } from 'next'
import { JsonLd, breadcrumbSchema, faqSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  title: 'Scientific Calculators — Free Online | MscTutor',
  description: 'Free online scientific calculators for students — percentage, BMI, compound interest, trigonometry, quadratic equations and more. NCERT aligned.',
  keywords: ['online calculator', 'scientific calculator', 'percentage calculator', 'compound interest calculator', 'BMI calculator', 'trigonometry calculator'],
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://msctutor.in'}/calculators` },
}

const CALC_FAQS = [
  { question:'Are these calculators free?', answer:'Yes! All calculators on MscTutor are completely free with no registration required.' },
  { question:'Which calculators are available?', answer:'Scientific, Percentage, Compound Interest, BMI, Trigonometry, Quadratic Equation, Speed/Distance/Time and more.' },
]

export default function CalcLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd data={[
        faqSchema(CALC_FAQS),
        breadcrumbSchema([{ name:'Home', url:'/' }, { name:'Calculators', url:'/calculators' }]),
      ]} />
    </>
  )
}
