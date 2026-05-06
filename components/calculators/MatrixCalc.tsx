'use client'
// components/calculators/MatrixCalc.tsx

import { useState } from 'react'

type Matrix = number[][]

function mat2(): Matrix { return [[0,0],[0,0]] }
function mat3(): Matrix { return [[0,0,0],[0,0,0],[0,0,0]] }
function add(a: Matrix, b: Matrix): Matrix { return a.map((row,i) => row.map((v,j) => v + b[i][j])) }
function mul(a: Matrix, b: Matrix): Matrix {
  const r = a.length, c = b[0].length, k = b.length
  return Array.from({length:r},(_,i)=>Array.from({length:c},(_,j)=>Array.from({length:k},(_,l)=>a[i][l]*b[l][j]).reduce((x,y)=>x+y,0)))
}
function det2(a: Matrix): number { return a[0][0]*a[1][1]-a[0][1]*a[1][0] }

export default function MatrixCalc() {
  const [size, setSize] = useState<2|3>(2)
  const [A,    setA]    = useState<Matrix>(mat2())
  const [B,    setB]    = useState<Matrix>(mat2())
  const [op,   setOp]   = useState<'add'|'mul'|'det'>('add')

  function updateA(i:number,j:number,val:string){ const m=[...A.map(r=>[...r])]; m[i][j]=parseFloat(val)||0; setA(m) }
  function updateB(i:number,j:number,val:string){ const m=[...B.map(r=>[...r])]; m[i][j]=parseFloat(val)||0; setB(m) }

  function changeSize(s: 2|3){ setSize(s); setA(s===2?mat2():mat3()); setB(s===2?mat2():mat3()) }

  let result: Matrix | number | string = ''
  try {
    if (op==='add') result=add(A,B)
    else if (op==='mul') result=mul(A,B)
    else if (op==='det') result=size===2?det2(A):'Use 2×2 for det'
  } catch { result='Error' }

  const MGrid = ({ M, onUpdate }: { M: Matrix; onUpdate: (i:number,j:number,v:string)=>void }) => (
    <div style={{ display: 'inline-block', border: '2px solid #1a3a6b', borderRadius: 8, padding: '0.5rem' }}>
      {M.map((row,i)=>(
        <div key={i} style={{ display: 'flex', gap: 4, marginBottom: i<M.length-1?4:0 }}>
          {row.map((val,j)=>(
            <input key={j} type="number" value={val||''} onChange={e=>onUpdate(i,j,e.target.value)}
              style={{ width: 52, padding: '0.4rem', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14, textAlign: 'center', fontFamily:'monospace' }} />
          ))}
        </div>
      ))}
    </div>
  )

  return (
    <div style={{ maxWidth: 560 }}>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {([2,3] as const).map(s=>(
            <button key={s} onClick={()=>changeSize(s)} style={{ padding:'0.45rem 1rem', borderRadius:20, border:size===s?'2px solid #1a3a6b':'1.5px solid #e5e7eb', background:size===s?'#e8eef8':'#fff', color:size===s?'#1a3a6b':'#374151', fontWeight:700, cursor:'pointer', fontSize:13 }}>{s}×{s}</button>
          ))}
        </div>
        {(['add','mul','det'] as const).map(o=>(
          <button key={o} onClick={()=>setOp(o)} style={{ padding:'0.45rem 1rem', borderRadius:20, border:op===o?'2px solid #0a5e3f':'1.5px solid #e5e7eb', background:op===o?'#e8f5ef':'#fff', color:op===o?'#0a5e3f':'#374151', fontWeight:700, cursor:'pointer', fontSize:13 }}>
            {o==='add'?'A+B':o==='mul'?'A×B':'det(A)'}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div><div style={{ fontSize:13,fontWeight:700,color:'#6b7280',marginBottom:6 }}>Matrix A</div><MGrid M={A} onUpdate={updateA} /></div>
        {op!=='det'&&<><div style={{fontSize:22,color:'#1a3a6b',fontWeight:800}}>{op==='add'?'+':'×'}</div><div><div style={{fontSize:13,fontWeight:700,color:'#6b7280',marginBottom:6}}>Matrix B</div><MGrid M={B} onUpdate={updateB} /></div></>}
        <div style={{fontSize:22,color:'#1a3a6b',fontWeight:800}}>=</div>
        <div>
          <div style={{fontSize:13,fontWeight:700,color:'#6b7280',marginBottom:6}}>Result</div>
          {typeof result==='number'||typeof result==='string' ? (
            <div style={{background:'#e8eef8',borderRadius:10,padding:'1rem 1.5rem',fontSize:24,fontWeight:900,color:'#1a3a6b',fontFamily:'monospace'}}>{result}</div>
          ) : (
            <div style={{border:'2px solid #1a3a6b',borderRadius:8,padding:'0.5rem',background:'#e8eef8'}}>
              {(result as Matrix).map((row,i)=>(
                <div key={i} style={{display:'flex',gap:4,marginBottom:i<(result as Matrix).length-1?4:0}}>
                  {row.map((val,j)=><div key={j} style={{width:52,padding:'0.4rem',background:'#fff',borderRadius:6,fontSize:14,textAlign:'center',fontFamily:'monospace',fontWeight:700,color:'#1a3a6b'}}>{Math.round(val*1e4)/1e4}</div>)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
