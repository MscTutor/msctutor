'use client'
// components/comments/BranchFilter.tsx

interface Props { active: string; onChange: (b: string) => void }

const BRANCHES = [
  { val: 'general',   label: 'All'        },
  { val: 'science',   label: 'Science'    },
  { val: 'math',      label: 'Math'       },
  { val: 'commerce',  label: 'Commerce'   },
  { val: 'physics',   label: 'Physics'    },
  { val: 'chemistry', label: 'Chemistry'  },
  { val: 'biology',   label: 'Biology'    },
  { val: 'tech',      label: 'Technology' },
]

export default function BranchFilter({ active, onChange }: Props) {
  return (
    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
      {BRANCHES.map(b => (
        <button key={b.val} onClick={() => onChange(b.val)}
          style={{ padding: '0.4rem 0.9rem', borderRadius: 20, border: active === b.val ? '2px solid #1a3a6b' : '1.5px solid #e5e7eb', background: active === b.val ? '#e8eef8' : '#fff', color: active === b.val ? '#1a3a6b' : '#6b7280', fontWeight: active === b.val ? 700 : 500, cursor: 'pointer', fontSize: 13 }}>
          {b.label}
        </button>
      ))}
    </div>
  )
}
