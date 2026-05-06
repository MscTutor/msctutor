// lib/subject-detect.ts — Auto detect subject from question text

const SUBJECT_KEYWORDS: Record<string, string[]> = {
  mathematics: [
    'equation','polynomial','triangle','circle','calculus','integral','derivative',
    'matrix','determinant','probability','statistics','algebra','geometry','trigonometry',
    'sin','cos','tan','log','limit','differentiate','integrate','area','perimeter','volume',
    'समीकरण','त्रिकोण','वृत्त','बीजगणित','ज्यामिति','समाकलन',
  ],
  physics: [
    'force','motion','velocity','acceleration','momentum','energy','power','work',
    'gravity','newton','friction','current','voltage','resistance','circuit','magnetic',
    'light','wave','frequency','amplitude','refraction','reflection','nuclear',
    'बल','गति','ऊर्जा','शक्ति','विद्युत','चुंबक','प्रकाश','तरंग',
  ],
  chemistry: [
    'atom','molecule','element','compound','reaction','acid','base','pH','bond',
    'ionic','covalent','periodic','electron','proton','neutron','formula','equation',
    'mole','concentration','solution','titration','oxidation','reduction',
    'परमाणु','अणु','तत्व','यौगिक','अभिक्रिया','अम्ल','क्षार',
  ],
  biology: [
    'cell','tissue','organ','dna','rna','gene','chromosome','mitosis','meiosis',
    'photosynthesis','respiration','enzyme','protein','hormone','evolution','ecosystem',
    'bacteria','virus','fungi','plant','animal','human body','blood',
    'कोशिका','ऊतक','अंग','डीएनए','प्रकाश संश्लेषण','श्वसन','जीव',
  ],
  accountancy: [
    'journal','ledger','trial balance','balance sheet','profit','loss','debit','credit',
    'depreciation','partnership','company','shares','debentures','cash book',
    'जर्नल','खाता','तुलन पत्र','लाभ','हानि','नकद',
  ],
  economics: [
    'demand','supply','market','price','inflation','gdp','national income','budget',
    'monetary','fiscal','bank','interest rate','unemployment','trade',
    'मांग','आपूर्ति','बाजार','कीमत','मुद्रास्फीति','बैंक',
  ],
  history: [
    'mughal','british','independence','revolution','war','empire','dynasty','civilization',
    'मुगल','ब्रिटिश','स्वतंत्रता','युद्ध','साम्राज्य','सभ्यता',
  ],
  geography: [
    'climate','rainfall','river','mountain','plateau','soil','latitude','longitude',
    'जलवायु','वर्षा','नदी','पर्वत','पठार','मिट्टी',
  ],
  'computer-science': [
    'algorithm','program','function','array','loop','variable','python','java','html',
    'database','network','binary','boolean','class','object','inheritance',
  ],
}

export function detectSubject(text: string): string {
  const lower = text.toLowerCase()
  const scores: Record<string, number> = {}

  for (const [subject, keywords] of Object.entries(SUBJECT_KEYWORDS)) {
    scores[subject] = 0
    for (const kw of keywords) {
      if (lower.includes(kw.toLowerCase())) scores[subject]++
    }
  }

  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]
  return best && best[1] > 0 ? best[0] : 'general'
}

export function detectBranch(subject: string): string {
  const branches: Record<string, string> = {
    mathematics: 'math',
    physics: 'science',
    chemistry: 'science',
    biology: 'science',
    science: 'science',
    accountancy: 'commerce',
    economics: 'commerce',
    commerce: 'commerce',
    history: 'humanities',
    geography: 'humanities',
    'political-science': 'humanities',
    'computer-science': 'tech',
    english: 'language',
    hindi: 'language',
  }
  return branches[subject] ?? 'general'
}
