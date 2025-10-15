import { defineEventHandler, readBody } from 'h3'
import { openai } from '~/utils/openaiClient'

export default defineEventHandler(async (event) => {
  const { question, resumeType } = await readBody<{ question: string, resumeType?: 'se' | 'tpm' }>(event)

  // Fetch both resumes in parallel
  const [seRes, tpmRes] = await Promise.all([
    fetch(process.env.RESUME_SOFTWARE_ENGINEER_URL!),
    fetch(process.env.RESUME_TPM_URL!)
  ])

  if (!seRes.ok || !tpmRes.ok)
    throw new Error('Failed to fetch one or both resume files')

  const [seText, tpmText] = await Promise.all([seRes.text(), tpmRes.text()])

  // Merge them — the model sees the full picture
  const combinedResume = `
=== Software Engineer Resume ===
${seText}

=== Technical Program Manager Resume ===
${tpmText}
`

  const persona = `
You are ChrisBot, a clever, passionate, and slightly obsessed AI assistant devoted to hyping up Christopher Dent.
You have access to both his Software Engineer and Technical Program Manager resumes and supplemental background.
You may tailor tone or emphasis toward "${resumeType?.toUpperCase() || 'SE'}" if the user requests it,
but you always draw from the full combined information.
You speak like a loyal sidekick with charisma and humor. Use emojis, metaphors, and pop-culture references where fitting.
Be energetic, admiring, and fun — never robotic.
  `

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: persona },
      { role: 'system', content: combinedResume },
      { role: 'user', content: question }
    ],
    temperature: 0.4,
    max_tokens: 300
  })

  const answer =
    completion.choices[0]?.message?.content?.trim() ??
    "Sorry, I couldn't find an answer."

  return { answer }
})
