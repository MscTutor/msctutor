// components/school/HomeworkCard.tsx

interface Props {
  title:       string
  subject:     string
  description: string
  dueDate:     string
  submitted?:  number
  total?:      number
  isTeacher?:  boolean
}

export default function HomeworkCard({ title, subject, description, dueDate, submitted, total, isTeacher }: Props) {
  const due      = new Date(dueDate)
  const isOverdue = due < new Date()
  const dueStr   = due.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <div style={{ background: '#fff', borderRadius: 14, border: `1.5px solid ${isOverdue ? '#fecaca' : '#e5e7eb'}`, padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.5rem' }}>
        <div>
          <div style={{ fontWeight: 700, color: '#111', fontSize: 15 }}>{title}</div>
          <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>{subject}</div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: isOverdue ? '#dc2626' : '#374151' }}>Due: {dueStr}</div>
          {isOverdue && <div style={{ fontSize: 11, color: '#dc2626' }}>Overdue</div>}
        </div>
      </div>

      {description && <p style={{ fontSize: 14, color: '#374151', margin: '0 0 0.75rem', lineHeight: 1.5 }}>{description}</p>}

      {isTeacher && submitted !== undefined && total !== undefined && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, height: 6, background: '#f3f4f6', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: `${total ? (submitted/total)*100 : 0}%`, height: '100%', background: '#22c55e', borderRadius: 3 }} />
          </div>
          <span style={{ fontSize: 12, color: '#6b7280', whiteSpace: 'nowrap' }}>{submitted}/{total} submitted</span>
        </div>
      )}
    </div>
  )
}
