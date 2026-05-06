// MyMemory API — FREE, no API key needed, 20+ languages
export async function translate(text: string, targetLang: string, sourceLang = 'en'): Promise<string> {
  if (targetLang === 'en' || targetLang === sourceLang) return text
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`
    const res  = await fetch(url)
    const data = await res.json()
    if (data.responseStatus === 200) return data.responseData.translatedText
    return text
  } catch {
    return text
  }
}
