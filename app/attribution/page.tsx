export const metadata = { title: 'Attribution — MscTutor', description: 'Open source software and image attributions used on MscTutor.' }

const ATTRIBUTIONS = [
  { name: 'Next.js', license: 'MIT', url: 'https://nextjs.org', desc: 'React framework for production' },
  { name: 'Tailwind CSS', license: 'MIT', url: 'https://tailwindcss.com', desc: 'CSS utility framework' },
  { name: 'KaTeX', license: 'MIT', url: 'https://katex.org', desc: 'Math formula rendering' },
  { name: 'Jitsi Meet', license: 'Apache 2.0', url: 'https://jitsi.org', desc: 'Free video conferencing' },
  { name: 'Firebase', license: 'Apache 2.0', url: 'https://firebase.google.com', desc: 'Authentication and messaging' },
  { name: 'Prisma', license: 'Apache 2.0', url: 'https://prisma.io', desc: 'Database ORM' },
  { name: 'Lucide React', license: 'ISC', url: 'https://lucide.dev', desc: 'Icon library' },
  { name: 'Framer Motion', license: 'MIT', url: 'https://framer.com/motion', desc: 'Animations' },
  { name: 'React Hot Toast', license: 'MIT', url: 'https://react-hot-toast.com', desc: 'Toast notifications' },
  { name: 'Sharp', license: 'Apache 2.0', url: 'https://sharp.pixelplumbing.com', desc: 'Image processing' },
]

const IMAGE_SOURCES = [
  { name: 'Wikimedia Commons', license: 'CC-BY-SA / CC0 / Public Domain', url: 'https://commons.wikimedia.org', desc: 'Educational diagrams and scientific illustrations' },
  { name: 'NASA Image Gallery', license: 'Public Domain', url: 'https://images.nasa.gov', desc: 'Astronomy and space images' },
  { name: 'OpenStax', license: 'CC-BY 4.0', url: 'https://openstax.org', desc: 'Free textbook diagrams' },
]

export default function AttributionPage() {
  return (
    <div className="max-w-[800px] mx-auto px-5 py-12">
      <div className="text-center mb-8">
        <div className="text-[42px] mb-3">❤️</div>
        <h1 className="font-head text-[28px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff]">Open Source Attribution</h1>
        <p className="text-[14px] text-[#5a6a8a] mt-1">MscTutor is built on the shoulders of amazing open source projects</p>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="font-head text-[18px] font-bold mb-4 text-[#0f1f3d] dark:text-[#e8eeff]">📦 Software Libraries</h2>
          <div className="bg-white dark:bg-[#111827] rounded-[20px] border border-[#dde5f5] dark:border-[#1e2d4a] overflow-hidden">
            {ATTRIBUTIONS.map((a, i) => (
              <div key={a.name} className={`flex items-center gap-4 px-5 py-3.5 ${i % 2 === 0 ? 'bg-[#f8faff] dark:bg-[#1a2236]' : 'bg-white dark:bg-[#111827]'}`}>
                <div className="flex-1">
                  <a href={a.url} target="_blank" className="text-[14px] font-bold text-primary-600 hover:underline">{a.name}</a>
                  <div className="text-[12px] text-[#5a6a8a]">{a.desc}</div>
                </div>
                <span className="text-[12px] bg-green-50 text-green-600 rounded-full px-3 py-1 font-bold whitespace-nowrap">{a.license}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-head text-[18px] font-bold mb-4 text-[#0f1f3d] dark:text-[#e8eeff]">🖼️ Image Sources</h2>
          <div className="space-y-3">
            {IMAGE_SOURCES.map(s => (
              <div key={s.name} className="bg-white dark:bg-[#111827] rounded-[16px] p-4 border border-[#dde5f5] dark:border-[#1e2d4a] flex items-start gap-3">
                <div className="flex-1">
                  <a href={s.url} target="_blank" className="text-[14px] font-bold text-primary-600 hover:underline">{s.name}</a>
                  <div className="text-[12.5px] text-[#5a6a8a]">{s.desc}</div>
                </div>
                <span className="text-[11px] bg-blue-50 text-blue-600 rounded-full px-2.5 py-1 font-bold whitespace-nowrap">{s.license}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-[16px] p-5 text-[13.5px] text-[#5a6a8a]">
          <strong className="text-[#0f1f3d] dark:text-[#e8eeff]">Note:</strong> All images used on MscTutor are from free, open-license sources. 
          Individual image attributions are shown on each page where the image appears. 
          If you believe an image has been used incorrectly, please contact attribution@msctutor.in
        </div>
      </div>
    </div>
  )
}
