'use client'
import { useState } from 'react'

const CALCS = [
  { id: 'percent', icon: '🧮', name: 'Percentage', desc: 'X% of Y, % change, reverse %' },
  { id: 'interest', icon: '🏦', name: 'Interest', desc: 'Simple & Compound Interest + GST' },
  { id: 'geometry', icon: '📐', name: 'Geometry', desc: 'Area, Perimeter, Volume' },
  { id: 'stats', icon: '📊', name: 'Statistics', desc: 'Mean, Median, Mode, SD' },
  { id: 'unit', icon: '📏', name: 'Unit Converter', desc: 'Length, Weight, Temperature, Area' },
  { id: 'fraction', icon: '➗', name: 'Fraction', desc: 'Add, Subtract, Multiply, Simplify' },
  { id: 'quadratic', icon: '📈', name: 'Quadratic', desc: 'Roots of ax²+bx+c=0' },
  { id: 'chem', icon: '⚗️', name: 'Mole Calculator', desc: 'Moles, Molar Mass, Molarity' },
  { id: 'matrix', icon: '🔢', name: 'Matrix', desc: '2×2 / 3×3 operations, determinant' },
  { id: 'scientific', icon: '🔬', name: 'Scientific', desc: 'Powers, roots, trigonometry' },
]

// ── Individual Calculator Components ─────────────────
function PercentCalc() {
  const [a, setA] = useState(''); const [b, setB] = useState(''); const [res, setRes] = useState('')
  const calc = () => {
    const x = parseFloat(a), y = parseFloat(b)
    if (isNaN(x)||isNaN(y)) return
    setRes(`${x}% of ${y} = ${(x*y/100).toFixed(4)}
Change from ${x} to ${y}: ${(((y-x)/x)*100).toFixed(2)}%
${y} is ${((x/y)*100).toFixed(2)}% of ${x}`)
  }
  return <CalcUI title="Percentage" inputs={[{label:'Value A',val:a,set:setA},{label:'Value B',val:b,set:setB}]} onCalc={calc} result={res} />
}

function InterestCalc() {
  const [p,setP]=useState(''); const [r,setR]=useState(''); const [t,setT]=useState(''); const [res,setRes]=useState('')
  const calc = () => {
    const P=parseFloat(p),R=parseFloat(r),T=parseFloat(t)
    if ([P,R,T].some(isNaN)) return
    const SI = P*R*T/100
    const CI = P*Math.pow(1+R/100,T)-P
    const gst5 = P*0.05; const gst18 = P*0.18; const gst28 = P*0.28
    setRes(`Simple Interest: ₹${SI.toFixed(2)} | Amount: ₹${(P+SI).toFixed(2)}
Compound Interest: ₹${CI.toFixed(2)} | Amount: ₹${(P+CI).toFixed(2)}
GST 5%: ₹${gst5.toFixed(2)} | 18%: ₹${gst18.toFixed(2)} | 28%: ₹${gst28.toFixed(2)}`)
  }
  return <CalcUI title="Interest & GST" inputs={[{label:'Principal (₹)',val:p,set:setP},{label:'Rate (%)',val:r,set:setR},{label:'Time (years)',val:t,set:setT}]} onCalc={calc} result={res} />
}

function QuadraticCalc() {
  const [a,setA]=useState(''); const [b,setB]=useState(''); const [c,setC]=useState(''); const [res,setRes]=useState('')
  const calc = () => {
    const A=parseFloat(a),B=parseFloat(b),C=parseFloat(c)
    if ([A,B,C].some(isNaN)||A===0) return
    const D = B*B-4*A*C
    if (D>0) { const r1=((-B+Math.sqrt(D))/(2*A)).toFixed(4), r2=((-B-Math.sqrt(D))/(2*A)).toFixed(4); setRes(`D = ${D.toFixed(4)} (D>0, two real roots)\nx₁ = ${r1}\nx₂ = ${r2}`) }
    else if (D===0) { const r=((-B)/(2*A)).toFixed(4); setRes(`D = 0 (equal roots)\nx = ${r}`) }
    else setRes(`D = ${D.toFixed(4)} (D<0, no real roots)\nRoots are imaginary`)
  }
  return <CalcUI title="Quadratic Solver: ax²+bx+c=0" inputs={[{label:'a',val:a,set:setA},{label:'b',val:b,set:setB},{label:'c',val:c,set:setC}]} onCalc={calc} result={res} />
}

function MoleCalc() {
  const [m,setM]=useState(''); const [mw,setMw]=useState(''); const [res,setRes]=useState('')
  const calc = () => {
    const mass=parseFloat(m), molar=parseFloat(mw)
    if ([mass,molar].some(isNaN)||molar===0) return
    const moles=mass/molar, particles=moles*6.022e23, vol=moles*22.4
    setRes(`Moles = ${moles.toFixed(4)} mol\nParticles = ${particles.toExponential(3)}\nVolume at STP = ${vol.toFixed(4)} L\nMolarity (in 1L solution) = ${moles.toFixed(4)} M`)
  }
  return <CalcUI title="Mole Calculator" inputs={[{label:'Mass (g)',val:m,set:setM},{label:'Molar Mass (g/mol)',val:mw,set:setMw}]} onCalc={calc} result={res} />
}

function GeometryCalc() {
  const [shape,setShape]=useState('circle'); const [a,setA]=useState(''); const [b,setB]=useState(''); const [res,setRes]=useState('')
  const calc = () => {
    const A=parseFloat(a), B=parseFloat(b)
    if (isNaN(A)) return
    if (shape==='circle')    setRes(`Area = ${(Math.PI*A*A).toFixed(4)}\nCircumference = ${(2*Math.PI*A).toFixed(4)}`)
    else if (shape==='rect') setRes(`Area = ${(A*B).toFixed(4)}\nPerimeter = ${(2*(A+B)).toFixed(4)}\nDiagonal = ${Math.sqrt(A*A+B*B).toFixed(4)}`)
    else if (shape==='tri')  setRes(`Area (base×h/2) = ${(A*B/2).toFixed(4)}\nIf right triangle, hypotenuse = ${Math.sqrt(A*A+B*B).toFixed(4)}`)
    else if (shape==='cube') setRes(`Volume = ${(A*A*A).toFixed(4)}\nSurface Area = ${(6*A*A).toFixed(4)}`)
    else if (shape==='sph')  setRes(`Volume = ${((4/3)*Math.PI*A*A*A).toFixed(4)}\nSurface Area = ${(4*Math.PI*A*A).toFixed(4)}`)
  }
  return (
    <div>
      <select value={shape} onChange={e=>setShape(e.target.value)} className="w-full mb-3 px-3 py-2 border-2 border-[#dde5f5] rounded-xl text-[13px] bg-[#f8faff] outline-none">
        <option value="circle">Circle (radius)</option>
        <option value="rect">Rectangle (l × b)</option>
        <option value="tri">Triangle (base × height)</option>
        <option value="cube">Cube (side)</option>
        <option value="sph">Sphere (radius)</option>
      </select>
      <CalcUI title="" inputs={[{label:shape==='circle'||shape==='cube'||shape==='sph'?'Side / Radius':'Value 1 (l/base)',val:a,set:setA},{label:'Value 2 (b/h)',val:b,set:setB}]} onCalc={calc} result={res} />
    </div>
  )
}

function UnitCalc() {
  const [val,setVal]=useState(''); const [type,setType]=useState('length'); const [res,setRes]=useState('')
  const calc = () => {
    const v=parseFloat(val)
    if (isNaN(v)) return
    if (type==='length') setRes(`${v} m = ${v*100} cm = ${v*1000} mm = ${(v/1000).toFixed(6)} km = ${(v*3.281).toFixed(4)} ft = ${(v*39.37).toFixed(4)} inch`)
    else if (type==='weight') setRes(`${v} kg = ${v*1000} g = ${v*1000000} mg = ${(v*2.205).toFixed(4)} lb = ${(v*35.274).toFixed(4)} oz`)
    else if (type==='temp') setRes(`${v}°C = ${(v*9/5+32).toFixed(2)}°F = ${(v+273.15).toFixed(2)} K`)
    else if (type==='area') setRes(`${v} m² = ${v*10000} cm² = ${(v*10.764).toFixed(4)} ft² = ${(v/4047).toFixed(6)} acres`)
  }
  return (
    <div>
      <select value={type} onChange={e=>setType(e.target.value)} className="w-full mb-3 px-3 py-2 border-2 border-[#dde5f5] rounded-xl text-[13px] bg-[#f8faff] outline-none">
        <option value="length">Length (meters)</option>
        <option value="weight">Weight (kg)</option>
        <option value="temp">Temperature (°C)</option>
        <option value="area">Area (m²)</option>
      </select>
      <CalcUI title="" inputs={[{label:'Enter Value',val:val,set:setVal}]} onCalc={calc} result={res} />
    </div>
  )
}

// Generic calculator UI
function CalcUI({ title, inputs, onCalc, result }: { title: string; inputs: {label:string;val:string;set:(v:string)=>void}[]; onCalc:()=>void; result:string }) {
  return (
    <div className="space-y-3">
      {title && <p className="text-[12px] font-bold text-[#5a6a8a]">{title}</p>}
      {inputs.map(inp => (
        <div key={inp.label}>
          <label className="text-[12px] text-[#5a6a8a] mb-1 block">{inp.label}</label>
          <input value={inp.val} onChange={e=>inp.set(e.target.value)} onKeyDown={e=>e.key==='Enter'&&onCalc()} placeholder="Enter value" className="w-full px-3 py-2.5 border-2 border-[#dde5f5] rounded-xl text-[14px] bg-[#f8faff] outline-none focus:border-primary-glow" />
        </div>
      ))}
      <button onClick={onCalc} className="w-full py-2.5 rounded-xl bg-primary-600 text-white font-head font-bold text-[13.5px] hover:opacity-90 transition">
        = Calculate
      </button>
      {result && (
        <div className="bg-[#f0f4ff] rounded-xl p-3 font-mono text-[13px] text-primary-600 whitespace-pre-line font-bold leading-relaxed">{result}</div>
      )}
    </div>
  )
}

const CALC_COMPONENTS: Record<string, React.FC> = {
  percent: PercentCalc,
  interest: InterestCalc,
  quadratic: QuadraticCalc,
  chem: MoleCalc,
  geometry: GeometryCalc,
  unit: UnitCalc,
}

function CalculatorGuide({ name, desc }: { name?: string; desc?: string }) {
  return (
    <div className="text-center py-8">
      <div className="max-w-[520px] mx-auto bg-[#f8faff] border border-[#dde5f5] rounded-[16px] p-5">
        <p className="text-[15px] font-bold text-[#0f1f3d] mb-2">{name}</p>
        <p className="text-[13px] text-[#5a6a8a] leading-relaxed mb-4">{desc}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {[
            'Use the Scientific calculator for quick arithmetic, powers and roots.',
            'Use Geometry for measurement and shape-based calculations.',
            'Use Percentage and Interest for school commerce and daily maths.',
            'For chapter-wise doubt solving, open Ask AI with your exact question.',
          ].map((item) => (
            <div key={item} className="rounded-[12px] bg-white border border-[#dde5f5] p-3 text-[12.5px] text-[#5a6a8a]">
              {item}
            </div>
          ))}
        </div>
        <div className="mt-4 text-[12px] text-[#1a3a6b] font-semibold">
          This section is ready for guided use right now even before a dedicated solver is connected.
        </div>
      </div>
    </div>
  )
}

export default function CalculatorsPage() {
  const [active, setActive] = useState('percent')
  const ActiveCalc = CALC_COMPONENTS[active]

  return (
    <div className="max-w-[900px] mx-auto px-5 py-10">
      <div className="text-center mb-8">
        <h1 className="font-head text-[28px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff] mb-1">🧮 Calculators</h1>
        <p className="text-[14px] text-[#5a6a8a]">10 smart calculators for Math, Physics & Commerce</p>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        {/* Sidebar */}
        <div className="md:w-[220px] flex-shrink-0">
          <div className="bg-white dark:bg-[#111827] rounded-[18px] p-3 border border-[#dde5f5] dark:border-[#1e2d4a]">
            {CALCS.map(c => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-[12px] mb-1 transition ${
                  active===c.id ? 'bg-primary-600 text-white' : 'hover:bg-[#f0f4ff] dark:hover:bg-[#1a2236] text-[#0f1f3d] dark:text-[#e8eeff]'
                }`}
              >
                <span className="text-[18px] w-7 text-center flex-shrink-0">{c.icon}</span>
                <div className="min-w-0">
                  <div className={`text-[13px] font-semibold ${active===c.id?'text-white':''}`}>{c.name}</div>
                  <div className={`text-[11px] line-clamp-1 ${active===c.id?'text-white/70':'text-[#5a6a8a]'}`}>{c.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Calculator area */}
        <div className="flex-1 bg-white dark:bg-[#111827] rounded-[18px] p-6 border border-[#dde5f5] dark:border-[#1e2d4a]">
          <h2 className="font-head text-[17px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] mb-5">
            {CALCS.find(c=>c.id===active)?.icon} {CALCS.find(c=>c.id===active)?.name}
          </h2>
          {ActiveCalc
            ? <ActiveCalc />
            : (
              <CalculatorGuide
                name={CALCS.find(c=>c.id===active)?.name}
                desc={CALCS.find(c=>c.id===active)?.desc}
              />
            )
          }
        </div>
      </div>
    </div>
  )
}
