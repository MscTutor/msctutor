export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function generateSlug(text: string): string {
  return slugify(text)
}

export function generateQuestionSlug(question: string): string {
  const words = question.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(' ').slice(0, 8)
  return words.join('-') + '-' + Date.now().toString(36)
}
