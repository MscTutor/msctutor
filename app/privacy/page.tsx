// app/privacy/page.tsx
export const metadata = { title: 'Privacy Policy — MscTutor', description: 'How MscTutor collects, uses, and protects your personal information.' }
export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" icon="🔒" lastUpdated="January 1, 2025" content={PRIVACY_CONTENT} />
}

const PRIVACY_CONTENT = `
## 1. Information We Collect
We collect information you provide directly: name, email address, phone number, and questions you ask. We also collect usage data including pages visited, features used, and device information.

## 2. How We Use Your Information  
Your data is used to: provide AI answers to your questions, track your learning progress, send notifications about attendance and homework (for school users), improve our service, and communicate with you about your account.

## 3. Firebase Authentication  
We use Google Firebase for authentication. When you sign in with Google, we receive your name and email from Google. Phone authentication uses Firebase OTP. We do not store your passwords — Firebase handles authentication securely.

## 4. Questions and Content  
Questions you ask become part of our educational database and may be displayed publicly on our website as educational content. This helps other students find answers and helps our site rank on search engines. Questions are not associated with your personal identity in public display.

## 5. School Users  
For school accounts: attendance records, exam results, and homework submissions are stored and accessible to teachers, school administrators, and parents (for their child's data). This data is not shared with third parties.

## 6. Cookies and Storage  
We use cookies for: session management, preferences (language, dark mode), and analytics. You can disable cookies in your browser, though some features may not work.

## 7. Third-Party Services  
We use: Google Firebase (authentication), DeepSeek AI (question answering), Razorpay/Stripe (payments), Cloudflare R2 (image storage). Each has their own privacy policy.

## 8. Children's Privacy  
Our service is designed for students of all ages. For users under 13, we recommend parental guidance. We do not knowingly collect personal information from children under 13 without parental consent.

## 9. Data Security  
We use industry-standard security including SSL encryption, secure database storage, and Firebase security rules. However, no internet transmission is 100% secure.

## 10. Data Deletion  
You can request deletion of your account and data by emailing privacy@msctutor.in. We will process your request within 30 days.

## 11. Changes  
We may update this policy. We will notify registered users of significant changes via email.

## 12. Contact  
For privacy concerns: privacy@msctutor.in
`

// ─────────────────────────────────────────────────────────

function LegalPage({ title, icon, lastUpdated, content }: { title: string; icon: string; lastUpdated: string; content: string }) {
  const sections = content.trim().split('\n\n').filter(Boolean)
  return (
    <div className="max-w-[800px] mx-auto px-5 py-12">
      <div className="text-center mb-10">
        <div className="text-[42px] mb-3">{icon}</div>
        <h1 className="font-head text-[30px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff]">{title}</h1>
        <p className="text-[13px] text-[#5a6a8a] mt-2">Last updated: {lastUpdated}</p>
      </div>
      <div className="bg-white dark:bg-[#111827] rounded-[20px] p-7 border border-[#dde5f5] dark:border-[#1e2d4a] space-y-5">
        {sections.map((s, i) => {
          if (s.startsWith('## ')) {
            const [heading, ...body] = s.split('\n')
            return (
              <div key={i}>
                <h2 className="font-head text-[16px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] mb-1.5">
                  {heading.replace('## ', '')}
                </h2>
                <p className="text-[14px] text-[#5a6a8a] leading-relaxed">{body.join(' ')}</p>
              </div>
            )
          }
          return <p key={i} className="text-[14px] text-[#5a6a8a] leading-relaxed">{s}</p>
        })}
      </div>
    </div>
  )
}
