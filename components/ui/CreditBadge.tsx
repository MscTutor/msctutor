// components/ui/CreditBadge.tsx

interface Props { credits: number; plan: string }

const PLAN_COLORS: Record<string, { bg: string; color: string }> = {
  free:    { bg: '#f3f4f6', color: '#6b7280' },
  starter: { bg: '#e8eef8', color: '#1a3a6b' },
  basic:   { bg: '#f5f3ff', color: '#6b21a8' },
  pro:     { bg: '#fee2e2', color: '#dc2626' },
}

export default function CreditBadge({ credits, plan }: Props) {
  const c = PLAN_COLORS[plan] ?? PLAN_COLORS.free
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700, ...c }}>
      <span>⚡</span>
      <span>{credits} credits</span>
      <span style={{ opacity: 0.6, fontSize: 11, fontWeight: 500, textTransform: 'capitalize' }}>· {plan}</span>
    </div>
  )
}
