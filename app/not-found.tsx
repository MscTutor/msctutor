import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-5 text-center">
      <div className="text-[72px] mb-4">😕</div>
      <h1 className="font-head text-[32px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff] mb-2">Page Not Found</h1>
      <p className="text-[15px] text-[#5a6a8a] mb-7 max-w-[400px]">
        Ye page nahi mila. Shayad ye link purana hai ya galat type kiya gaya hai.
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <Link href="/" className="px-6 py-3 rounded-xl bg-primary-600 text-white font-head font-bold text-[14px] hover:opacity-90 transition">
          🏠 Home Jaao
        </Link>
        <Link href="/ask" className="px-6 py-3 rounded-xl border-2 border-primary-600 text-primary-600 font-head font-bold text-[14px] hover:bg-primary-600 hover:text-white transition">
          🤖 Question Poochho
        </Link>
      </div>
    </div>
  )
}
