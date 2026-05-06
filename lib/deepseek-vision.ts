// lib/deepseek-vision.ts — DeepSeek Vision API for image questions

const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL ?? 'https://api.deepseek.com/v1/chat/completions'
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY ?? ''

export async function deepseekVision(imageBase64: string, mimeType: string, prompt?: string): Promise<string> {
  const userPrompt = prompt ?? 'Solve this question step by step. Show all working, formulas used, and a clear final answer. Format with numbered steps.'

  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      max_tokens: 2000,
      messages: [
        {
          role: 'system',
          content: 'You are an expert Indian school teacher for Class 1-12. You solve Math, Science, Commerce questions with clear step-by-step solutions, formulas, and NCERT references. Always respond in the same language as the question.',
        },
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: `data:${mimeType};base64,${imageBase64}` },
            },
            { type: 'text', text: userPrompt },
          ],
        },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error(`DeepSeek Vision API error: ${response.status}`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content ?? 'Could not process image. Please try again.'
}
