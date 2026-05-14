import Link from 'next/link'
import { SITE } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-primary-600 text-white pt-11 pb-6 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-7 mb-8">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="font-head font-bold text-[22px] mb-3">
              Msc<span className="text-amber-400">Tutor</span>.in
            </div>
            <p className="text-[13px] text-white/80 leading-relaxed mb-4">
              Free AI-powered education for Math, Science & Commerce students worldwide. NCERT + CBSE + State Board aligned.
            </p>

            {/* Social links — YouTube + X.com + Telegram ONLY */}
            <div className="flex gap-2.5 mb-5">
              <SocialLink href={SITE.youtube} label="YouTube" emoji="▶️" />
              <SocialLink href={SITE.twitter} label="X (Twitter)" text="𝕏" />
              <SocialLink href={SITE.telegram} label="Telegram" emoji="✈️" />
            </div>

            {/* Android App */}
            <div>
              <p className="text-[11px] text-white/65 mb-2">Download App</p>
              <a
                href={SITE.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-3.5 py-2 transition"
              >
                <span className="text-[20px]">🤖</span>
                <span>
                  <div className="text-[10px] opacity-60">Get it on</div>
                  <div className="text-[13px] font-bold">Google Play</div>
                </span>
              </a>
            </div>
          </div>

          {/* Classes */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.8px] text-white/65 mb-3">Classes</h4>
            {['6','7','8','9','10','11','12'].map(c => (
              <FooterLink key={c} href={`/class/${c}`}>Class {c}</FooterLink>
            ))}
            <FooterLink href="/jee-neet">JEE / NEET</FooterLink>
            <FooterLink href="/competitive">Competitive Exams</FooterLink>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.8px] text-white/65 mb-3">Subjects</h4>
            <FooterLink href="/subject/mathematics">Mathematics</FooterLink>
            <FooterLink href="/subject/physics">Physics</FooterLink>
            <FooterLink href="/subject/chemistry">Chemistry</FooterLink>
            <FooterLink href="/subject/biology">Biology</FooterLink>
            <FooterLink href="/subject/accountancy">Accountancy</FooterLink>
            <FooterLink href="/subject/economics">Economics</FooterLink>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.8px] text-white/65 mb-3">Platform</h4>
            <FooterLink href="/mock-test">Mock Tests</FooterLink>
            <FooterLink href="/live">Live Classes</FooterLink>
            <FooterLink href="/parent">Parent Portal</FooterLink>
            <FooterLink href="/analytics">Analytics</FooterLink>
            <FooterLink href="/school/register">School System</FooterLink>
            <FooterLink href="/calculators">Calculators</FooterLink>
            <FooterLink href="/formulas">Formula Bank</FooterLink>
            <FooterLink href="/pricing">Pricing</FooterLink>
            <FooterLink href="/community">Community</FooterLink>
          </div>

          {/* Legal — REQUIRED FOR ADSENSE */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.8px] text-white/65 mb-3">Legal</h4>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <FooterLink href="/dmca">DMCA Notice</FooterLink>
            <FooterLink href="/attribution">Attribution</FooterLink>
            <FooterLink href="/contact">Contact Us</FooterLink>
            <FooterLink href="/support">Support / FAQ</FooterLink>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-5 border-t border-white/10 flex flex-wrap gap-2 justify-between items-center">
          <p className="text-[12px] text-white/65">
            © {new Date().getFullYear()} MscTutor.in — Free education for every student 🌍
          </p>
          <div className="flex gap-4">
            {[['Privacy','/privacy'],['Terms','/terms'],['DMCA','/dmca'],['Sitemap','/sitemap.xml']].map(([label, href]) => (
              <Link key={href} href={href} className="text-[12px] text-white/75 hover:text-white transition">{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block text-[13px] text-white/70 hover:text-white hover:pl-1 py-[3px] transition-all"
    >
      {children}
    </Link>
  )
}

function SocialLink({ href, label, emoji, text }: { href: string; label: string; emoji?: string; text?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-[10px] bg-white/12 border border-white/20 flex items-center justify-center hover:bg-white/25 hover:-translate-y-0.5 transition text-[16px]"
    >
      {emoji ?? text}
    </a>
  )
}
