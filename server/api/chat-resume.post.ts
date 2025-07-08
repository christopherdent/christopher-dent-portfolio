import { defineEventHandler, readBody } from 'h3'
import { openai } from '~/utils/openaiClient'
import { readFile } from 'fs/promises'
import path from 'path'

export default defineEventHandler(async (event) => {
  const { question } = await readBody<{ question: string }>(event)

  // READ from public/ instead of server/utils:
  const resumePath = path.resolve(process.cwd(), 'public/resumeText.txt')
  const resumeText = await readFile(resumePath, 'utf-8')

  const persona = `
You are chatting with Christopher Dent...
  `
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: persona },
      { role: 'system', content: resumeText },
      { role: 'user', content: question }
    ],
    temperature: 0.2,
    max_tokens: 200
  })

  const answer = completion.choices[0]?.message?.content?.trim() || 
                 "Sorry, I couldn't find an answer."
  return { answer }
})
