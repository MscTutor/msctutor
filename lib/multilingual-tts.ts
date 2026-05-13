'use client'
// lib/multilingual-tts.ts — 12 Languages TTS (FREE - Web Speech API only)

import { useCallback, useRef, useState } from 'react'

export type TTSLanguage = 'en'|'hi'|'bn'|'gu'|'mr'|'ta'|'te'|'pa'|'ur'|'as'|'ar'|'fr'

const VOICE_CONFIG: Record<TTSLanguage, { lang: string; names: string[]; rate: number; pitch: number }> = {
  en: { lang: 'en-IN',  names: ['Google UK English Female','Raveena','Samantha','Google US English'], rate: 0.9,  pitch: 1.0 },
  hi: { lang: 'hi-IN',  names: ['Google हिन्दी','Lekha','Google Hindi'],                              rate: 0.85, pitch: 1.0 },
  bn: { lang: 'bn-IN',  names: ['Google বাংলা','Google Bengali India'],                                rate: 0.85, pitch: 1.0 },
  gu: { lang: 'gu-IN',  names: ['Google ગુજરાતી','Google Gujarati'],                                  rate: 0.85, pitch: 1.0 },
  mr: { lang: 'mr-IN',  names: ['Google मराठी','Google Marathi'],                                     rate: 0.85, pitch: 1.0 },
  ta: { lang: 'ta-IN',  names: ['Google தமிழ்','Google Tamil India'],                                  rate: 0.85, pitch: 1.0 },
  te: { lang: 'te-IN',  names: ['Google తెలుగు','Google Telugu India'],                                rate: 0.85, pitch: 1.0 },
  pa: { lang: 'pa-IN',  names: ['Google ਪੰਜਾਬੀ','Google Punjabi'],                                    rate: 0.85, pitch: 1.0 },
  ur: { lang: 'ur-PK',  names: ['Google اردو','Google Urdu'],                                         rate: 0.85, pitch: 1.0 },
  as: { lang: 'as-IN',  names: ['Google অসমীয়া','Google Assamese'],                                   rate: 0.85, pitch: 1.0 },
  ar: { lang: 'ar-SA',  names: ['Google العربية','Majed','Google Arabic'],                             rate: 0.85, pitch: 1.0 },
  fr: { lang: 'fr-FR',  names: ['Google français','Thomas','Amelie'],                                  rate: 0.88, pitch: 1.0 },
}

function getBestVoice(lang: TTSLanguage): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined') return null
  const voices = window.speechSynthesis.getVoices()
  const cfg    = VOICE_CONFIG[lang]
  // Try preferred names
  for (const name of cfg.names) {
    const v = voices.find(v => v.name.toLowerCase().includes(name.toLowerCase()))
    if (v) return v
  }
  // Try language code match
  const langCode = cfg.lang.split('-')[0]
  const fallback = voices.find(v => v.lang.startsWith(langCode))
  if (fallback) return fallback
  // Final fallback: English
  return voices.find(v => v.lang.startsWith('en')) ?? voices[0] ?? null
}

export function useMultilingualTTS() {
  const [speaking,  setSpeaking]  = useState(false)
  const [supported, setSupported] = useState(true)
  const uttRef = useRef<SpeechSynthesisUtterance | null>(null)

  const speak = useCallback((text: string, language: TTSLanguage = 'en') => {
    if (typeof window === 'undefined') return
    if (!('speechSynthesis' in window)) { setSupported(false); return }

    window.speechSynthesis.cancel()
    setSpeaking(false)

    // Clean text
    const clean = text.replace(/[*_`#\[\]]/g,'').replace(/https?:\/\/\S+/g,'').trim().slice(0, 3000)
    if (!clean) return

    const cfg = VOICE_CONFIG[language]
    const utt = new SpeechSynthesisUtterance(clean)

    const go = () => {
      const voice = getBestVoice(language)
      if (voice) utt.voice = voice
      utt.lang  = cfg.lang
      utt.rate  = cfg.rate
      utt.pitch = cfg.pitch
      utt.onstart = () => setSpeaking(true)
      utt.onend   = () => setSpeaking(false)
      utt.onerror = () => setSpeaking(false)
      uttRef.current = utt
      window.speechSynthesis.speak(utt)
    }

    if (window.speechSynthesis.getVoices().length > 0) go()
    else { window.speechSynthesis.onvoiceschanged = () => { go(); window.speechSynthesis.onvoiceschanged = null } }
  }, [])

  const stop   = useCallback(() => { window.speechSynthesis?.cancel(); setSpeaking(false) }, [])
  const toggle = useCallback((text: string, lang: TTSLanguage = 'en') => { if (speaking) stop(); else speak(text, lang) }, [speaking, speak, stop])

  return { speak, stop, toggle, speaking, supported }
}

// AI language instruction (FREE — just adds instruction to prompt)
export function getTTSLanguageInstruction(lang: TTSLanguage): string {
  const map: Record<TTSLanguage, string> = {
    en: 'Answer in clear simple English for Indian school students.',
    hi: 'हिंदी में जवाब दो। Hinglish भी ठीक है। आसान भाषा में समझाओ।',
    bn: 'বাংলায় উত্তর দাও। সহজ ভাষায় বোঝাও।',
    gu: 'ગુજરાતીમાં જવાબ આપો. સ(Hinglish mix ठीक है।',
    mr: 'मराठीमध्ये उत्तर द्या. सोप्या भाषेत समजावून सांगा.',
    ta: 'தமிழில் பதில் அளிக்கவும். எளிய மொழியில் விளக்கவும்.',
    te: 'తెలుగులో సమాధానం ఇవ్వండి. సులభమైన భాషలో వివరించండి.',
    pa: 'ਪੰਜਾਬੀ ਵਿੱਚ ਜਵਾਬ ਦਿਓ। ਸਰਲ ਭਾਸ਼ਾ ਵਿੱਚ ਸਮਝਾਓ।',
    ur: 'اردو میں جواب دیں۔ آسان زبان میں سمجھائیں۔',
    as: 'অসমীয়াত উত্তৰ দিয়া। সহজ ভাষাত বুজাওক।',
    ar: 'أجب باللغة العربية البسيطة المناسبة للطلاب.',
    fr: 'Répondez en français simple adapté aux élèves.',
  }
  return map[lang] ?? map.en
}

export function buildMultilingualPrompt(question: string, language: TTSLanguage, subject?: string, classLevel?: string): string {
  return `${getTTSLanguageInstruction(language)}
${subject?`Subject: ${subject}. `:''}${classLevel?`Class: ${classLevel}. `:''}
Question: ${question}
Give step-by-step answer with formula if applicable.`
}

// ── VOICE TUTOR SESSION SAVE (server-side, non-blocking) ─────────
export async function saveVoiceSession(params: {
  userId?:    string
  transcript: string
  response:   string
  language:   string
  duration?:  number
  subject?:   string
}): Promise<void> {
  setImmediate(async () => {
    try {
      const { default: prisma } = await import('./prisma')
      const db = prisma as unknown as { voiceSession: { create: (a: unknown) => Promise<unknown> } }
      await db.voiceSession.create({
        data: {
          userId:     params.userId,
          transcript: params.transcript.slice(0, 10000),
          response:   params.response.slice(0, 10000),
          language:   params.language,
          duration:   params.duration ?? 0,
          subject:    params.subject,
        },
      })
    } catch { /* Non-critical */ }
  })
}

// ── LANGUAGE INSTRUCTION FOR AI ───────────────────────────────────
export function getAILanguageInstruction(lang: string): string {
  const instructions: Record<string, string> = {
    en: 'Respond clearly in English with proper pronunciation-friendly formatting.',
    hi: 'हिंदी में जवाब दो। Simple Hindi words use करो जो बोलने में आसान हों।',
    bn: 'বাংলায় উত্তর দাও। সহজ বাংলা শব্দ ব্যবহার করো।',
    ta: 'தமிழில் பதில் சொல்லுங்கள். எளிய தமிழ் வார்த்தைகளை பயன்படுத்துங்கள்।',
    te: 'తెలుగులో సమాధానం చెప్పండి. సులభమైన తెలుగు మాటలు వాడండి.',
    gu: 'ગુજરાતીમાં જવાબ આપો। સરળ ગુજરાતી શબ્દો વાપરો.',
    mr: 'मराठीत उत्तर द्या। सोपे मराठी शब्द वापरा.',
    pa: 'ਪੰਜਾਬੀ ਵਿੱਚ ਜਵਾਬ ਦਿਓ। ਸਰਲ ਪੰਜਾਬੀ ਸ਼ਬਦਾਂ ਦੀ ਵਰਤੋਂ ਕਰੋ.',
    ur: 'اردو میں جواب دیں۔ آسان اردو الفاظ استعمال کریں۔',
    ar: 'أجب باللغة العربية الفصحى البسيطة.',
    fr: 'Réponds en français simple et clair.',
  }
  return instructions[lang] ?? instructions.en
}

// ── AUDIO LESSON HELPER ───────────────────────────────────────────
export function prepareTextForSpeech(text: string, lang = 'en'): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')        // Remove bold markdown
    .replace(/#{1,6}\s+/g, '')              // Remove headers
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links, keep text
    .replace(/```[\s\S]*?```/g, 'Formula omitted for audio') // Code blocks
    .replace(/`([^`]+)`/g, '$1')            // Inline code
    .replace(/\n{3,}/g, '\n\n')             // Reduce excess newlines
    .replace(/\d+\./g, match => match + ' ') // Add pause after numbered lists
    .trim()
    .slice(0, 2000)                         // Max 2000 chars for TTS
}
