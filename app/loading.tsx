export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {[0,1,2].map(i => (
            <span
              key={i}
              className="w-3 h-3 rounded-full bg-primary-600 animate-dot-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        <p className="text-[13px] text-[#5a6a8a]">Loading...</p>
      </div>
    </div>
  )
}
