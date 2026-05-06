export const metadata = { title: 'DMCA Notice — MscTutor', description: 'DMCA copyright policy and how to file a takedown notice.' }

export default function DmcaPage() {
  return (
    <div className="max-w-[800px] mx-auto px-5 py-12">
      <div className="text-center mb-8">
        <div className="text-[42px] mb-3">⚖️</div>
        <h1 className="font-head text-[28px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff]">DMCA Notice</h1>
        <p className="text-[13px] text-[#5a6a8a] mt-1">Digital Millennium Copyright Act Policy</p>
      </div>
      <div className="bg-white dark:bg-[#111827] rounded-[20px] p-7 border border-[#dde5f5] dark:border-[#1e2d4a] space-y-5 text-[14px] text-[#5a6a8a] leading-relaxed">
        <p>MscTutor respects intellectual property rights. We respond promptly to notices of alleged copyright infringement.</p>
        <h2 className="font-head text-[16px] font-bold text-[#0f1f3d] dark:text-[#e8eeff]">Our Copyright Policy</h2>
        <p>All AI-generated content on MscTutor is original. Images used on the platform are sourced from Wikimedia Commons, NASA public domain, OpenStax, and other open-license sources. We attribute all sources.</p>
        <h2 className="font-head text-[16px] font-bold text-[#0f1f3d] dark:text-[#e8eeff]">Filing a DMCA Takedown</h2>
        <p>If you believe your copyrighted work has been used without permission, please email dmca@msctutor.in with: (1) Description of copyrighted work, (2) URL of allegedly infringing content, (3) Your contact information, (4) Statement of good faith belief, (5) Statement under penalty of perjury that information is accurate.</p>
        <h2 className="font-head text-[16px] font-bold text-[#0f1f3d] dark:text-[#e8eeff]">Response Time</h2>
        <p>We will respond to valid DMCA notices within 5-7 business days and remove infringing content promptly.</p>
        <h2 className="font-head text-[16px] font-bold text-[#0f1f3d] dark:text-[#e8eeff]">Counter-Notification</h2>
        <p>If you believe content was removed by mistake, you may submit a counter-notification to dmca@msctutor.in with the required information under 17 U.S.C. § 512(g).</p>
        <div className="bg-[#f0f4ff] dark:bg-[#1a2236] rounded-[14px] p-4">
          <p className="font-semibold text-[#0f1f3d] dark:text-[#e8eeff]">DMCA Contact: dmca@msctutor.in</p>
        </div>
      </div>
    </div>
  )
}
