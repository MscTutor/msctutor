'use client'

interface SampleQuestionsProps {
  questions: string[]
}

export default function SampleQuestions({ questions }: SampleQuestionsProps) {
  const applyQuestion = (question: string) => {
    const textarea = document.querySelector('textarea')
    if (!textarea) return

    textarea.value = question
    textarea.dispatchEvent(new Event('input', { bubbles: true }))
  }

  return (
    <div className="flex flex-wrap gap-2">
      {questions.map((question) => (
        <button
          key={question}
          onClick={() => applyQuestion(question)}
          className="px-3 py-1.5 rounded-[10px] bg-[#f0f4ff] dark:bg-[#1a2236] border border-[#dde5f5] dark:border-[#1e2d4a] text-[12.5px] text-[#5a6a8a] hover:bg-primary-600 hover:text-white hover:border-primary-600 transition"
        >
          {question}
        </button>
      ))}
    </div>
  )
}
