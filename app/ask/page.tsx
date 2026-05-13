import type { Metadata } from 'next'
import AskBox from '@/components/ask/AskBox'
import SampleQuestions from '@/components/ask/SampleQuestions'
import { buildMetadata } from '@/lib/seo/metadata'
import { JsonLd, faqSchema, howToSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = buildMetadata({
  pageKey: 'ask',
  path: '/ask',
})

const ASK_FAQS = [
  { question: 'Can I upload a photo of my question?', answer: 'Yes! Click the Image tab, upload a photo of your question and AI solves it instantly.' },
  { question: 'Does it support voice questions?', answer: 'Yes! Click the Voice tab and speak your question in Hindi or English. AI answers in the same language.' },
  { question: 'Which subjects are supported?', answer: 'All NCERT subjects: Mathematics, Physics, Chemistry, Biology, English, Hindi, Social Science, Accountancy, Economics and more.' },
  { question: 'Is it really free?', answer: 'Yes! 5 questions per day are completely free. Premium plans offer unlimited questions.' },
]

const SAMPLE_QUESTIONS = [
  'Newton ka pehla niyam kya hai?',
  'Quadratic equation solve karo: x²-5x+6=0',
  'Photosynthesis ka process explain karo',
  'Balance sheet kya hoti hai?',
  'Demand ka law explain karo',
  'F=ma ka matlab kya hai?',
]

export default function AskPage() {
  return (
    <div className="max-w-[760px] mx-auto px-5 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 bg-primary-600/8 border border-primary-600/15 rounded-full px-4 py-1.5 text-[12.5px] text-primary-600 font-semibold mb-4">
          AI-Powered Tutor
        </div>
        <h1 className="font-head text-[30px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff] mb-2">
          Har Sawaal Ka Jawab
        </h1>
        <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
          Text • Image • Voice • PDF - Kisi bhi tarike se poochho
        </p>
      </div>

      <AskBox />

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: '✏️', tip: 'Sawaal clearly likhein', sub: 'e.g. "Newton ka pehla niyam explain karo"' },
          { icon: '📷', tip: 'Image se poochho', sub: 'Textbook ka photo leke upload karo' },
          { icon: '🎤', tip: 'Voice mein bolein', sub: 'Hindi ya English mein bol sakte hain' },
        ].map((tip) => (
          <div key={tip.tip} className="bg-white dark:bg-[#111827] rounded-[16px] p-4 border border-[#dde5f5] dark:border-[#1e2d4a] text-center">
            <div className="text-[24px] mb-1.5">{tip.icon}</div>
            <div className="text-[13px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] mb-0.5">{tip.tip}</div>
            <div className="text-[11.5px] text-[#5a6a8a]">{tip.sub}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white dark:bg-[#111827] rounded-[18px] p-5 border border-[#dde5f5] dark:border-[#1e2d4a]">
        <h2 className="font-head text-[14px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] mb-3">
          Sample Questions - Try karo:
        </h2>
        <SampleQuestions questions={SAMPLE_QUESTIONS} />
      </div>

      <JsonLd
        data={[
          faqSchema(ASK_FAQS),
          howToSchema({
            name: 'How to get AI solution',
            steps: [
              { name: 'Type question', text: 'Enter your question in text, or upload image/PDF, or use voice input' },
              { name: 'Submit', text: 'Click the Solve button or press Enter' },
              { name: 'Get answer', text: 'AI provides step-by-step solution with formula and NCERT reference' },
            ],
          }),
        ]}
      />
    </div>
  )
}
