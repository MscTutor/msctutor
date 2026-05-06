import type { Metadata } from 'next'
import AskBox from '@/components/ask/AskBox'

export const metadata: Metadata = {
  title: 'Ask Question - AI Tutor - MscTutor',
  description: 'Ask any Math, Science, Commerce question. Get instant AI step-by-step solution with diagrams and formulas. Free for Class 1-12.',
}

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
          { icon: 'Write', tip: 'Sawaal clearly likhein', sub: 'e.g. "Newton ka pehla niyam explain karo"' },
          { icon: 'Image', tip: 'Image se poochho', sub: 'Textbook ka photo leke upload karo' },
          { icon: 'Voice', tip: 'Voice mein bolein', sub: 'Hindi ya English mein bol sakte hain' },
        ].map((item) => (
          <div key={item.tip} className="bg-white dark:bg-[#111827] rounded-[16px] p-4 border border-[#dde5f5] dark:border-[#1e2d4a] text-center">
            <div className="text-[24px] mb-1.5">{item.icon}</div>
            <div className="text-[13px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] mb-0.5">{item.tip}</div>
            <div className="text-[11.5px] text-[#5a6a8a]">{item.sub}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white dark:bg-[#111827] rounded-[18px] p-5 border border-[#dde5f5] dark:border-[#1e2d4a]">
        <h2 className="font-head text-[14px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] mb-3">
          Sample Questions - Try karo:
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            'Newton ka pehla niyam kya hai?',
            'Quadratic equation solve karo: x²-5x+6=0',
            'Photosynthesis ka process explain karo',
            'Balance sheet kya hoti hai?',
            'Demand ka law explain karo',
            'F=ma ka matlab kya hai?',
          ].map((question) => (
            <span
              key={question}
              className="px-3 py-1.5 rounded-[10px] bg-[#f0f4ff] dark:bg-[#1a2236] border border-[#dde5f5] dark:border-[#1e2d4a] text-[12.5px] text-[#5a6a8a]"
            >
              {question}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
