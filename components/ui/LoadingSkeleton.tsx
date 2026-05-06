// components/ui/LoadingSkeleton.tsx

interface Props { lines?: number; height?: number; radius?: number }

export default function LoadingSkeleton({ lines = 3, height = 16, radius = 6 }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} style={{
          height, borderRadius: radius,
          background: 'linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.4s infinite',
          width: i === lines - 1 ? '65%' : '100%',
        }} />
      ))}
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }`}</style>
    </div>
  )
}
