export const metadata = { title: 'Terms of Service — MscTutor', description: 'Terms and conditions for using MscTutor education platform.' }
export default function TermsPage() {
  return (
    <div className="max-w-[800px] mx-auto px-5 py-12">
      <div className="text-center mb-10">
        <div className="text-[42px] mb-3">📜</div>
        <h1 className="font-head text-[30px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff]">Terms of Service</h1>
        <p className="text-[13px] text-[#5a6a8a] mt-2">Last updated: January 1, 2025</p>
      </div>
      <div className="bg-white dark:bg-[#111827] rounded-[20px] p-7 border border-[#dde5f5] dark:border-[#1e2d4a] space-y-5 text-[14px] text-[#5a6a8a] leading-relaxed">
        <Section title="1. Acceptance">By using MscTutor, you agree to these terms. If you are under 18, a parent or guardian must review and accept these terms on your behalf.</Section>
        <Section title="2. Free Services">Core content reading, formula bank, community commenting, and basic AI questions are free. Free accounts receive 5 AI questions per day. Credits reset daily at midnight IST.</Section>
        <Section title="3. Paid Services">Paid plans offer more AI credits, additional features, and storage. Payments processed via Razorpay (India) or Stripe (international). All prices are in INR unless stated otherwise.</Section>
        <Section title="4. Refund Policy">We offer a 7-day money-back guarantee for all paid plans if you are not satisfied. School plans: refund within 7 days of payment for first-time purchases. Contact support@msctutor.in for refunds.</Section>
        <Section title="5. User Content">Questions you ask become part of our educational database. By asking a question, you grant MscTutor a non-exclusive license to display and use that content for educational purposes. You retain ownership of your content.</Section>
        <Section title="6. Prohibited Use">You may not: use bots to automate questions, share account credentials, attempt to access other users' data, upload copyrighted textbook content, use the platform for any illegal purpose, or attempt to reverse engineer our AI system.</Section>
        <Section title="7. School Accounts">School administrators are responsible for their school's use of the platform. All student data entered must be with appropriate consent. Schools must comply with applicable education data privacy laws.</Section>
        <Section title="8. Content Disclaimer">AI-generated answers are for educational purposes. Always verify important information with your teacher or textbook. MscTutor is not responsible for errors in AI-generated content. NCERT content references are for educational use under fair use principles.</Section>
        <Section title="9. Account Termination">We may suspend or terminate accounts for violation of these terms. You may delete your account at any time from dashboard settings.</Section>
        <Section title="10. Limitation of Liability">MscTutor is provided "as is." We are not liable for any indirect or consequential damages from use of the platform. Our maximum liability is limited to the amount paid by you in the last 3 months.</Section>
        <Section title="11. Governing Law">These terms are governed by Indian law. Disputes will be resolved in courts of jurisdiction in India.</Section>
        <Section title="12. Contact">Questions about these terms: legal@msctutor.in</Section>
      </div>
    </div>
  )
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-head text-[15px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] mb-1.5">{title}</h2>
      <p>{children}</p>
    </div>
  )
}
