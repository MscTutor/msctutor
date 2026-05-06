import type { Metadata } from 'next'
import Link from 'next/link'
import CommentSection from '@/components/comments/CommentSection'

export const metadata: Metadata = {
  title:       'Pricing — MscTutor | Free AI Education Plans',
  description: 'Simple, honest pricing. Free forever for students. School plans from ₹999/month. No hidden charges.',
}

const STUDENT_PLANS = [
  {
    name: 'Free', price: 0, period: '', badge: null,
    credits: '5 questions/day', color: '#5a6a8a',
    features: ['5 AI questions per day','Text input only','Basic mock test (10Q)','View all content (unlimited)','Formula bank access','Community comments'],
    cta: 'Start Free', href: '/register', outline: true,
  },
  {
    name: 'Starter', price: 49, period: '/month', badge: null,
    credits: '100 credits/month', color: '#0369a1',
    features: ['100 credits/month','Image + Voice input','Unlimited mock tests','PDF question solving','Download solutions (PDF)','20+ language support'],
    cta: 'Get Starter', href: '/register?plan=starter', outline: false,
  },
  {
    name: 'Basic', price: 99, period: '/month', badge: '⭐ Most Popular',
    credits: '300 credits/month', color: '#1a3a6b',
    features: ['300 credits/month','All input modes','Unlimited mock tests','Board-specific papers','Save & sync across devices','Priority AI response'],
    cta: 'Get Basic', href: '/register?plan=basic', outline: false,
  },
  {
    name: 'Pro', price: 299, period: '/month', badge: '🏆 Best Value',
    credits: '1500 credits/month', color: '#7c3400',
    features: ['1500 credits/month','Ad-free experience','AI memory across sessions','All 10 calculators unlocked','Priority support','Early access features'],
    cta: 'Get Pro', href: '/register?plan=pro', outline: false,
  },
]

const SCHOOL_PLANS = [
  {
    name: 'School Free', price: 0, students: '50 students', teachers: '5 teachers',
    storage: '1 GB', badge: null,
    features: ['50 student accounts','5 teacher accounts','Basic attendance','10 exams/month','Notice board','Basic analytics'],
    cta: 'Register School', href: '/school/register',
  },
  {
    name: 'School Basic', price: 999, students: '500 students', teachers: '30 teachers',
    storage: '20 GB', badge: '✅ Recommended',
    features: ['500 student accounts','30 teacher accounts','Full attendance + reports','Unlimited exams','Live classes (Jitsi)','Homework system','Push notifications','FCM parent alerts','20 GB storage'],
    cta: 'Get School Basic', href: '/school/register?plan=basic',
  },
  {
    name: 'School Pro', price: 2999, students: 'Unlimited', teachers: 'Unlimited',
    storage: '100 GB', badge: '🏆 Full Power',
    features: ['Unlimited students','Unlimited teachers','Everything in Basic','Custom school branding','Priority support','Advanced analytics','100 GB storage','Video lecture support','API access'],
    cta: 'Get School Pro', href: '/school/register?plan=pro',
  },
]

const COMPARE = [
  { feature: 'Content reading',      free: '✅', starter: '✅', basic: '✅', pro: '✅' },
  { feature: 'AI questions/day',     free: '5',  starter: '—',  basic: '—',  pro: '—'  },
  { feature: 'Monthly credits',      free: '—',  starter: '100',basic: '300',pro: '1500'},
  { feature: 'Image upload',         free: '❌', starter: '✅', basic: '✅', pro: '✅' },
  { feature: 'Voice input',          free: '❌', starter: '✅', basic: '✅', pro: '✅' },
  { feature: 'PDF solving',          free: '❌', starter: '✅', basic: '✅', pro: '✅' },
  { feature: 'Mock tests',           free: 'Basic',starter:'✅',basic: '✅', pro: '✅' },
  { feature: 'PDF download',         free: '❌', starter: '✅', basic: '✅', pro: '✅' },
  { feature: 'Ad-free',              free: '❌', starter: '❌', basic: '❌', pro: '✅' },
  { feature: 'AI memory',            free: '❌', starter: '❌', basic: '❌', pro: '✅' },
  { feature: 'All calculators',      free: 'Basic',starter:'✅',basic: '✅', pro: '✅' },
  { feature: 'Priority support',     free: '❌', starter: '❌', basic: '✅', pro: '✅' },
]

const FAQS = [
  { q: 'Is it really free?',         a: 'Yes! Core content reading, formula bank, community, and 5 AI questions/day are free forever. No credit card needed.' },
  { q: 'How do credits work?',       a: 'Each AI question = 1-3 credits depending on type. Text = 1, Image/Voice = 2, PDF = 3. Credits reset monthly. Free plan gets 5/day.' },
  { q: 'Can I cancel anytime?',      a: 'Yes. Cancel from your dashboard anytime. No questions asked. No cancellation fee.' },
  { q: 'What boards are supported?', a: 'CBSE, ICSE, UP Board, MP Board, Maharashtra Board, Bihar Board, Rajasthan Board, and NCERT. More boards being added.' },
  { q: 'Is school registration free?',a: 'Yes! Up to 50 students and 5 teachers are completely free. Paid plans for larger schools.' },
  { q: 'What is the refund policy?', a: 'If you are not satisfied within 7 days of purchase, we will issue a full refund — no questions asked.' },
]

export default function PricingPage() {
  return (
    <div className="pb-16">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#eef2ff] to-[#e8f5ee] dark:from-[#0d1526] dark:to-[#0a1a12] py-14 px-5 text-center">
        <div className="inline-flex items-center gap-1.5 bg-primary-600/8 border border-primary-600/15 rounded-full px-4 py-1.5 text-[12.5px] text-primary-600 font-semibold mb-4">
          💰 Simple, Honest Pricing
        </div>
        <h1 className="font-head text-[36px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff] mb-3">
          Start Free. Upgrade When You Need
        </h1>
        <p className="text-[15px] text-[#5a6a8a] max-w-[500px] mx-auto">
          Content reading is always free for everyone. Credits only needed for AI generation.
        </p>
      </div>

      {/* Student Plans */}
      <section className="max-w-[1100px] mx-auto px-5 py-14">
        <h2 className="font-head text-[24px] font-extrabold text-center text-[#0f1f3d] dark:text-[#e8eeff] mb-2">👨‍🎓 Student Plans</h2>
        <p className="text-center text-[14px] text-[#5a6a8a] mb-8">For individual students and parents</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STUDENT_PLANS.map(plan => (
            <div
              key={plan.name}
              className={`relative bg-white dark:bg-[#111827] rounded-[20px] p-6 border-2 transition hover:-translate-y-1 hover:shadow-lg ${
                plan.badge ? 'border-primary-600 shadow-[0_0_0_4px_rgba(26,58,107,.08)]' : 'border-[#dde5f5] dark:border-[#1e2d4a]'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-[11px] font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                  {plan.badge}
                </div>
              )}
              <div className="font-head text-[16px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] mb-1">{plan.name}</div>
              <div className="font-head text-[32px] font-extrabold mb-0.5" style={{ color: plan.color }}>
                {plan.price === 0 ? '₹0' : `₹${plan.price}`}
                <span className="text-[14px] font-medium text-[#5a6a8a]">{plan.period}</span>
              </div>
              <div className="text-[12.5px] text-[#5a6a8a] pb-4 mb-4 border-b border-[#dde5f5] dark:border-[#1e2d4a]">
                {plan.credits}
              </div>
              <ul className="space-y-2 mb-5">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-[12.5px] text-[#5a6a8a]">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`block w-full py-2.5 rounded-[12px] text-[13.5px] font-head font-bold text-center border-2 transition ${
                  plan.outline
                    ? 'bg-transparent border-[#dde5f5] text-[#5a6a8a] hover:border-primary-600 hover:text-primary-600'
                    : 'bg-primary-600 text-white border-primary-600 hover:opacity-90'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* School Plans */}
      <section className="bg-white dark:bg-[#111827] py-14 px-5">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-head text-[24px] font-extrabold text-center text-[#0f1f3d] dark:text-[#e8eeff] mb-2">🏫 School Plans</h2>
          <p className="text-center text-[14px] text-[#5a6a8a] mb-8">Complete school management system</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {SCHOOL_PLANS.map(plan => (
              <div
                key={plan.name}
                className={`relative bg-[#f8faff] dark:bg-[#1a2236] rounded-[20px] p-6 border-2 transition hover:-translate-y-1 hover:shadow-lg ${
                  plan.badge ? 'border-primary-600' : 'border-[#dde5f5] dark:border-[#1e2d4a]'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-green-600 text-white text-[11px] font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}
                <div className="font-head text-[15px] font-bold mb-1">{plan.name}</div>
                <div className="font-head text-[28px] font-extrabold text-primary-600 mb-1">
                  {plan.price === 0 ? '₹0' : `₹${plan.price}`}
                  {plan.price > 0 && <span className="text-[13px] font-medium text-[#5a6a8a]">/month</span>}
                </div>
                <div className="flex gap-2 flex-wrap mb-3">
                  <span className="bg-blue-50 text-blue-600 rounded-full px-2 py-0.5 text-[11px] font-bold">{plan.students}</span>
                  <span className="bg-green-50 text-green-600 rounded-full px-2 py-0.5 text-[11px] font-bold">{plan.teachers}</span>
                  <span className="bg-purple-50 text-purple-600 rounded-full px-2 py-0.5 text-[11px] font-bold">{plan.storage}</span>
                </div>
                <ul className="space-y-1.5 mb-5 border-t border-[#dde5f5] dark:border-[#1e2d4a] pt-3">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-[12.5px] text-[#5a6a8a]">
                      <span className="text-green-500 flex-shrink-0 mt-0.5">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.href} className="block w-full py-2.5 rounded-[12px] bg-primary-600 text-white font-head font-bold text-[13.5px] text-center hover:opacity-90 transition">
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-[900px] mx-auto px-5 py-14">
        <h2 className="font-head text-[22px] font-extrabold text-center mb-7">📊 Feature Comparison</h2>
        <div className="bg-white dark:bg-[#111827] rounded-[20px] border border-[#dde5f5] dark:border-[#1e2d4a] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr className="bg-primary-600 text-white">
                  <th className="text-left px-5 py-3.5 font-head font-semibold">Feature</th>
                  {['Free','Starter','Basic','Pro'].map(p => (
                    <th key={p} className="px-4 py-3.5 font-head font-semibold text-center">{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? 'bg-[#f8faff] dark:bg-[#1a2236]' : 'bg-white dark:bg-[#111827]'}>
                    <td className="px-5 py-2.5 text-[#0f1f3d] dark:text-[#e8eeff]">{row.feature}</td>
                    {[row.free, row.starter, row.basic, row.pro].map((v, j) => (
                      <td key={j} className={`px-4 py-2.5 text-center font-medium ${v === '✅' ? 'text-green-600' : v === '❌' ? 'text-red-400' : 'text-[#5a6a8a]'}`}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[700px] mx-auto px-5 pb-10">
        <h2 className="font-head text-[22px] font-extrabold text-center mb-7">❓ Frequently Asked Questions</h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <details key={i} className="bg-white dark:bg-[#111827] rounded-[16px] border border-[#dde5f5] dark:border-[#1e2d4a] group">
              <summary className="px-5 py-4 cursor-pointer font-medium text-[14px] text-[#0f1f3d] dark:text-[#e8eeff] flex items-center justify-between list-none">
                {faq.q}
                <span className="text-[#5a6a8a] group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="px-5 pb-4 text-[13.5px] text-[#5a6a8a] leading-relaxed border-t border-[#dde5f5] dark:border-[#1e2d4a] pt-3">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Comments */}
      <div className="max-w-[760px] mx-auto px-5">
        <CommentSection branch="general" pageUrl="/pricing" />
      </div>
    </div>
  )
}
