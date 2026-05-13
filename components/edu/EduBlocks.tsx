// components/edu/EduBlocks.tsx
// ──────────────────────────────────────────────────────────────────
// Reusable educational UI blocks — used by formula, experiment, chapter pages
// All use existing Tailwind design system tokens
// ──────────────────────────────────────────────────────────────────
import Link from 'next/link'

// ── TYPES ─────────────────────────────────────────────────────────
export interface Variable {
  sym:     string
  meaning: string
  unit:    string
}

// ── 1. VARIABLES TABLE ────────────────────────────────────────────
export function VariableTable({ variables }: { variables: Variable[] }) {
  if (!variables?.length) return null
  return (
    <div className="bg-white dark:bg-[#111827] rounded-[20px] border border-[#dde5f5] dark:border-[#1e2d4a] p-5">
      <h3 className="font-head text-[16px] font-bold mb-4 text-[#0f1f3d] dark:text-[#e8eeff] flex items-center gap-2">
        <span className="w-7 h-7 rounded-lg bg-[#e8eef8] flex items-center justify-center text-sm">𝑥</span>
        Variables &amp; Units
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-[#e5e7eb] dark:border-[#1e2d4a]">
              <th className="text-left py-2 pr-4 text-[#5a6a8a] font-semibold w-16">Symbol</th>
              <th className="text-left py-2 pr-4 text-[#5a6a8a] font-semibold">Meaning</th>
              <th className="text-left py-2 text-[#5a6a8a] font-semibold w-28">SI Unit</th>
            </tr>
          </thead>
          <tbody>
            {variables.map((v) => (
              <tr key={v.sym} className="border-b border-[#f3f4f6] dark:border-[#1a2236] last:border-0">
                <td className="py-2.5 pr-4">
                  <span className="font-mono text-[15px] font-bold text-primary-600 bg-[#e8eef8] dark:bg-[#1a2236] px-2.5 py-0.5 rounded-lg">
                    {v.sym}
                  </span>
                </td>
                <td className="py-2.5 pr-4 text-[#374151] dark:text-[#d1d5db]">{v.meaning}</td>
                <td className="py-2.5 text-[#5a6a8a] font-mono text-[12px]">{v.unit || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── 2. DERIVATION BLOCK ───────────────────────────────────────────
export function DerivationBlock({ derivation }: { derivation: string }) {
  if (!derivation) return null
  // Split on → or newline for steps
  const steps = derivation.split(/→|\n/).map(s => s.trim()).filter(Boolean)
  return (
    <div className="bg-[#f5f3ff] dark:bg-[#1a1630] rounded-[20px] border border-[#ddd6fe] dark:border-[#3730a3] p-5">
      <h3 className="font-head text-[16px] font-bold mb-4 text-[#4c1d95] dark:text-[#c4b5fd] flex items-center gap-2">
        <span className="w-7 h-7 rounded-lg bg-[#ede9fe] flex items-center justify-center text-sm">∂</span>
        Derivation
      </h3>
      {steps.length > 1 ? (
        <div className="flex flex-col gap-2.5">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#7c3aed] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="font-mono text-[13.5px] text-[#4c1d95] dark:text-[#c4b5fd] leading-relaxed">{step}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="font-mono text-[13.5px] text-[#4c1d95] dark:text-[#c4b5fd] leading-relaxed">{derivation}</p>
      )}
    </div>
  )
}

// ── 3. SOLVED EXAMPLE BLOCK ───────────────────────────────────────
export function SolvedExample({ example, title = 'Solved Example' }: { example: string; title?: string }) {
  if (!example) return null
  return (
    <div className="bg-[#f0fdf4] dark:bg-[#0a1f12] rounded-[20px] border border-[#bbf7d0] dark:border-[#166534] p-5">
      <h3 className="font-head text-[16px] font-bold mb-3 text-[#065f46] dark:text-[#4ade80] flex items-center gap-2">
        <span className="w-7 h-7 rounded-lg bg-[#dcfce7] flex items-center justify-center text-sm">✎</span>
        {title}
      </h3>
      <div className="bg-white dark:bg-[#111827] rounded-[14px] border border-[#bbf7d0] dark:border-[#166534] p-4">
        <p className="text-[13.5px] text-[#374151] dark:text-[#d1d5db] leading-relaxed font-mono whitespace-pre-wrap">{example}</p>
      </div>
    </div>
  )
}

// ── 4. COMMON MISTAKES BOX ────────────────────────────────────────
export function MistakeBox({ mistakes }: { mistakes: string[] }) {
  if (!mistakes?.length) return null
  return (
    <div className="bg-[#fff7ed] dark:bg-[#1a0f00] rounded-[20px] border border-[#fed7aa] dark:border-[#92400e] p-5">
      <h3 className="font-head text-[16px] font-bold mb-3 text-[#c2410c] dark:text-[#fb923c] flex items-center gap-2">
        <span className="w-7 h-7 rounded-lg bg-[#ffedd5] flex items-center justify-center text-sm">⚠</span>
        Common Mistakes to Avoid
      </h3>
      <ul className="flex flex-col gap-2.5">
        {mistakes.map((m, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[13.5px] text-[#7c2d12] dark:text-[#fdba74]">
            <span className="text-[#ef4444] mt-0.5 flex-shrink-0">✗</span>
            {m}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── 5. MEMORY TRICK ───────────────────────────────────────────────
export function MemoryTrick({ trick }: { trick: string }) {
  if (!trick) return null
  return (
    <div className="bg-[#fdf4ff] dark:bg-[#1a0a2e] rounded-[20px] border border-[#e9d5ff] dark:border-[#6b21a8] p-5">
      <h3 className="font-head text-[16px] font-bold mb-3 text-[#7e22ce] dark:text-[#d8b4fe] flex items-center gap-2">
        <span className="w-7 h-7 rounded-lg bg-[#f3e8ff] flex items-center justify-center text-sm">💡</span>
        Memory Trick
      </h3>
      <p className="text-[13.5px] text-[#6b21a8] dark:text-[#d8b4fe] leading-relaxed font-medium italic">
        &ldquo;{trick}&rdquo;
      </p>
    </div>
  )
}

// ── 6. IMPORTANT NOTE ────────────────────────────────────────────
export function NoteBlock({ note }: { note: string }) {
  if (!note) return null
  return (
    <div className="flex items-start gap-3 bg-[#fffbeb] dark:bg-[#1a1200] rounded-[16px] border border-[#fde68a] dark:border-[#92400e] p-4">
      <span className="text-[#d97706] text-lg flex-shrink-0 mt-0.5">📌</span>
      <p className="text-[13.5px] text-[#92400e] dark:text-[#fcd34d] leading-relaxed">{note}</p>
    </div>
  )
}

// ── 7. AI EXPLAIN BUTTON ──────────────────────────────────────────
export function AIExplainButton({
  topic, subject, classLevel, label = 'Ask AI to Explain'
}: {
  topic:      string
  subject?:   string
  classLevel?: string
  label?:     string
}) {
  const q = encodeURIComponent(
    `Explain "${topic}"${subject ? ` (${subject})` : ''}${classLevel ? ` for Class ${classLevel}` : ''} with a simple real-life Indian example and step-by-step solution.`
  )
  return (
    <Link
      href={`/ask?q=${q}`}
      className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-[13px] font-bold px-4 py-2.5 rounded-[12px] no-underline transition-colors"
    >
      <span>🤖</span>
      {label}
    </Link>
  )
}

// ── 8. EXPERIMENT STEP FLOW ───────────────────────────────────────
export function StepFlow({ steps }: { steps: string[] }) {
  if (!steps?.length) return null
  return (
    <ol className="flex flex-col gap-3">
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-3 group">
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#0a5e3f] text-white text-[12px] font-bold flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className="w-0.5 h-4 bg-[#bbf7d0] mt-1" />
            )}
          </div>
          <p className="text-[13.5px] text-[#374151] dark:text-[#d1d5db] leading-relaxed pt-1.5">{step}</p>
        </li>
      ))}
    </ol>
  )
}

// ── 9. OBSERVATION TABLE ──────────────────────────────────────────
export function ObservationList({ observations }: { observations: string[] }) {
  if (!observations?.length) return null
  return (
    <ul className="flex flex-col gap-2">
      {observations.map((obs, i) => (
        <li key={i} className="flex items-start gap-3 text-[13.5px] text-[#374151] dark:text-[#d1d5db]">
          <span className="w-5 h-5 rounded-full bg-[#dbeafe] text-[#1e40af] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
            {i + 1}
          </span>
          {obs}
        </li>
      ))}
    </ul>
  )
}

// ── 10. SAFETY CHECKLIST ─────────────────────────────────────────
export function SafetyChecklist({ items }: { items: string[] }) {
  if (!items?.length) return null
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-[13px] text-[#7f1d1d] dark:text-[#fca5a5]">
          <span className="text-[#dc2626] flex-shrink-0 mt-0.5">⚠</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

// ── 11. REAL-WORLD APPLICATIONS ───────────────────────────────────
export function ApplicationBadges({ applications }: { applications: string[] }) {
  if (!applications?.length) return null
  return (
    <div className="flex flex-wrap gap-2">
      {applications.map((app) => (
        <span
          key={app}
          className="text-[12px] font-semibold px-3 py-1.5 rounded-full bg-[#e0f2fe] text-[#0369a1] dark:bg-[#0c2d4a] dark:text-[#7dd3fc] border border-[#bae6fd] dark:border-[#0369a1]"
        >
          {app}
        </span>
      ))}
    </div>
  )
}

// ── 12. PROGRESS MINI RING (server-renderable) ────────────────────
export function ProgressRing({
  pct, size = 56, color = '#1a3a6b'
}: {
  pct:   number
  size?: number
  color?: string
}) {
  const r    = (size / 2) - 5
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - Math.min(pct, 100) / 100)
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="flex-shrink-0">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e5e7eb" strokeWidth="4.5" />
      <circle
        cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth="4.5"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
      <text x={size/2} y={size/2 + 1} textAnchor="middle" dominantBaseline="middle"
        fill={color} fontSize={size * 0.22} fontWeight="800" fontFamily="Sora, sans-serif">
        {pct}%
      </text>
    </svg>
  )
}

// ── 13. SYLLABUS CARD ─────────────────────────────────────────────
export function SyllabusStatusBadge({ status }: {
  status: 'not_started' | 'in_progress' | 'completed' | 'needs_revision'
}) {
  const CONFIG = {
    not_started:    { label:'Not Started',   cls:'bg-[#f3f4f6] text-[#6b7280]',       dot:'bg-[#9ca3af]'  },
    in_progress:    { label:'In Progress',   cls:'bg-[#fef3c7] text-[#d97706]',       dot:'bg-[#f59e0b]'  },
    completed:      { label:'Completed',     cls:'bg-[#d1fae5] text-[#065f46]',       dot:'bg-[#10b981]'  },
    needs_revision: { label:'Needs Revision', cls:'bg-[#fee2e2] text-[#991b1b]',      dot:'bg-[#ef4444]'  },
  }
  const c = CONFIG[status]
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${c.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  )
}

// ── 14. WEAK TOPIC BADGE ──────────────────────────────────────────
export function WeakTopicBadge({ topic, pct }: { topic: string; pct: number }) {
  return (
    <div className="flex items-center justify-between gap-2 px-3 py-2.5 bg-[#fff7ed] dark:bg-[#1a0f00] rounded-[12px] border border-[#fed7aa]">
      <span className="text-[13px] text-[#7c2d12] dark:text-[#fdba74] font-medium">{topic}</span>
      <span className="text-[12px] font-bold text-[#ea580c] flex-shrink-0">{pct}%</span>
    </div>
  )
}

// ── 15. EDUCATIONAL SECTION HEADER ───────────────────────────────
export function SectionHeader({
  icon, title, subtitle, action
}: {
  icon:      string
  title:     string
  subtitle?: string
  action?:   React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-[10px] bg-[#e8eef8] dark:bg-[#1a2236] flex items-center justify-center text-lg flex-shrink-0">
          {icon}
        </div>
        <div>
          <h2 className="font-head text-[17px] font-bold text-[#0f1f3d] dark:text-[#e8eeff]">{title}</h2>
          {subtitle && <p className="text-[12px] text-[#5a6a8a] mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
}
