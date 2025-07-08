// server/api/chat-resume.post.ts
import { readBody, defineEventHandler } from "h3"
import { openai } from "~/utils/openaiClient"

export default defineEventHandler(async (event) => {
  // 1) pull the question off the POST body
  const { question } = await readBody<{ question: string }>(event)

  // 2) build your prompt(s)
  const systemPrompt = `
You are an expert on Christopher Dent’s résumé (see text below).
Use the résumé and your knowledge of him (full-stack engineer @ OpsCompass, Vue.js/Node.js specialist, based in St. Augustine, FL, astronomy fan) to answer succinctly.
`
  const resumeText = await import("~/server/utils/resumeText.txt?raw")  // assume you dumped the PDF → text here

  // 3) call OpenAI
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "system", content: resumeText },
      { role: "user", content: question }
    ],
    temperature: 0.2,
    max_tokens: 200
  })

  // 4) return the AI’s reply
  const answer = response.choices?.[0]?.message?.content ?? "Sorry, no answer."
  return { answer }
})
