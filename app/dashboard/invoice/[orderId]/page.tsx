'use client'
// app/dashboard/invoice/[orderId]/page.tsx
// Auto-generated invoice for student payments

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useRef } from 'react'

const MOCK_INVOICE = {
  invoiceNo:  'MSC-2025-00142',
  date:       '21 April 2025',
  dueDate:    '21 April 2025',
  student:    { name: 'Rahul Kumar', email: 'rahul@example.com', phone: '+91 98765 43210', class: 'Class 10' },
  plan:       'Basic Plan — Monthly',
  amount:     99,
  gst:        18,
  gstAmount:  Math.round(99 * 0.18),
  total:      Math.round(99 * 1.18),
  paymentId:  'pay_RZP2025042100142',
  method:     'Razorpay — UPI',
  status:     'PAID',
}

export default function InvoicePage() {
  const params   = useParams()
  const printRef = useRef<HTMLDivElement>(null)

  function handlePrint() {
    window.print()
  }

  async function downloadPDF() {
    // Simple print-to-PDF trigger
    window.print()
  }

  const inv = MOCK_INVOICE

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fc', padding: '2rem 1rem' }}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .invoice-box { box-shadow: none !important; margin: 0 !important; max-width: 100% !important; }
        }
      `}</style>

      {/* Action buttons */}
      <div className="no-print" style={{ maxWidth: 800, margin: '0 auto 1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Link href="/dashboard/credits" style={{ color: '#1a3a6b', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>← Back to Credits</Link>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.75rem' }}>
          <button onClick={handlePrint}
            style={{ padding: '9px 20px', background: '#fff', color: '#1a3a6b', border: '1.5px solid #1a3a6b', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
            🖨️ Print
          </button>
          <button onClick={downloadPDF}
            style={{ padding: '9px 20px', background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
            📥 Download PDF
          </button>
        </div>
      </div>

      {/* Invoice */}
      <div ref={printRef} className="invoice-box" style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,.08)' }}>

        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg,#1a3a6b,#0e2347)', padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: -1 }}>
              Msc<span style={{ color: '#f59e0b' }}>Tutor</span>.in
            </div>
            <div style={{ color: '#93c5fd', fontSize: 13, marginTop: 4 }}>Free AI Education Platform</div>
            <div style={{ color: '#93c5fd', fontSize: 12, marginTop: 2 }}>support@msctutor.in</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#f59e0b' }}>INVOICE</div>
            <div style={{ color: '#fff', fontSize: 14, fontWeight: 700, marginTop: 4 }}>{inv.invoiceNo}</div>
            <div style={{ marginTop: 8, display: 'inline-block', background: '#22c55e', color: '#fff', fontSize: 12, fontWeight: 800, padding: '3px 12px', borderRadius: 20 }}>
              ✓ {inv.status}
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '2rem' }}>

          {/* Bill to + Invoice Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: .8, marginBottom: 8 }}>Bill To</div>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#111' }}>{inv.student.name}</div>
              <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>{inv.student.email}</div>
              <div style={{ fontSize: 13, color: '#6b7280' }}>{inv.student.phone}</div>
              <div style={{ fontSize: 13, color: '#6b7280' }}>{inv.student.class}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: .8, marginBottom: 8 }}>Invoice Details</div>
              {[
                { label: 'Invoice Date', val: inv.date },
                { label: 'Due Date', val: inv.dueDate },
                { label: 'Payment ID', val: inv.paymentId },
                { label: 'Method', val: inv.method },
              ].map(d => (
                <div key={d.label} style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, marginBottom: 4 }}>
                  <span style={{ fontSize: 13, color: '#9ca3af' }}>{d.label}:</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{d.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Items Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
            <thead>
              <tr style={{ background: '#f9fafb' }}>
                {['Description', 'Period', 'Rate', 'GST', 'Amount'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: h === 'Description' ? 'left' : 'right', fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: .5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '14px 12px' }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#111' }}>{inv.plan}</div>
                  <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>Unlimited AI questions, Mock tests, Formula bank</div>
                </td>
                <td style={{ padding: '14px 12px', textAlign: 'right', fontSize: 13, color: '#374151' }}>1 month</td>
                <td style={{ padding: '14px 12px', textAlign: 'right', fontSize: 13, color: '#374151' }}>₹{inv.amount}</td>
                <td style={{ padding: '14px 12px', textAlign: 'right', fontSize: 13, color: '#374151' }}>{inv.gst}%</td>
                <td style={{ padding: '14px 12px', textAlign: 'right', fontSize: 14, fontWeight: 700, color: '#111' }}>₹{inv.amount}</td>
              </tr>
            </tbody>
          </table>

          {/* Totals */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
            <div style={{ width: 280 }}>
              {[
                { label: 'Subtotal', val: `₹${inv.amount}` },
                { label: `GST (${inv.gst}%)`, val: `₹${inv.gstAmount}` },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f3f4f6' }}>
                  <span style={{ fontSize: 14, color: '#6b7280' }}>{row.label}</span>
                  <span style={{ fontSize: 14, color: '#374151' }}>{row.val}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', background: '#e8eef8', borderRadius: 10, marginTop: 8, paddingInline: 12 }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: '#1a3a6b' }}>Total Paid</span>
                <span style={{ fontSize: 20, fontWeight: 900, color: '#1a3a6b' }}>₹{inv.total}</span>
              </div>
            </div>
          </div>

          {/* Payment confirmation */}
          <div style={{ background: '#dcfce7', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 24 }}>✅</span>
            <div>
              <div style={{ fontWeight: 800, color: '#166534', fontSize: 15 }}>Payment Received Successfully</div>
              <div style={{ fontSize: 13, color: '#166534', opacity: .85 }}>Transaction ID: {inv.paymentId} · {inv.method}</div>
            </div>
          </div>

          {/* Footer notes */}
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: 12, color: '#6b7280' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#374151', marginBottom: 4 }}>Terms & Conditions</div>
                <div>• Subscription is non-refundable after 7 days</div>
                <div>• Auto-renewal can be cancelled anytime</div>
                <div>• Credits expire at end of billing period</div>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#374151', marginBottom: 4 }}>Support</div>
                <div>📧 support@msctutor.in</div>
                <div>🌐 www.msctutor.in/support</div>
                <div>📱 Available Mon-Sat 9AM-6PM IST</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: 12, color: '#9ca3af' }}>
            Thank you for choosing MscTutor.in — Free AI Education for every Indian student 🇮🇳
          </div>
        </div>
      </div>
    </div>
  )
}
