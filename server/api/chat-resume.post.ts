import { defineEventHandler, readBody } from 'h3'
import { openai } from '~/utils/openaiClient'
import { extractText } from 'unpdf'
import { getSessionId } from '../../utils/getSessionId'
import { H3Event } from 'h3'

export const runtime = 'nodejs'


// Simple in-memory cache
let cache: { seText?: string; tpmText?: string; loadedAt?: number } = {}
const CACHE_TTL = 1000 * 60 * 60 * 6 // 6 hours

// helper to extract text using unpdf
async function extractTextFromPdf(url: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch PDF: ${url}`)
  const buffer = await res.arrayBuffer()
  
  const result = await extractText(new Uint8Array(buffer))

  // Normalize result.text into a plain string
  let textOut = ''
  if (typeof result.text === 'string') {
    textOut = result.text
  } else if (Array.isArray(result.text)) {
    // sometimes it's an array of page strings or objects
    textOut = result.text
      .map((page) => (typeof page === 'string' ? page : page.content || ''))
      .join('\n')
  } else if (result.text?.pages) {
    // sometimes it's { pages: [] }
    textOut = result.text.pages.join('\n')
  } else {
    console.warn('[unpdf] Unexpected text format:', result)
  }

  return textOut.trim()
}


  export default defineEventHandler(async (event) => {
    const { question, resumeType } = await readBody<{
      question: string
      resumeType?: 'se' | 'tpm'
    }>(event)

    try {
    await fetch('http://localhost:3000/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        resumeType,
        timestamp: new Date().toISOString(),
        sessionId: getSessionId(event),
      }),
    })
  } catch (err) {
    console.warn('[chat-resume] Logging failed:', err)
  }


  const now = Date.now()

  // load or refresh cache
  if (!cache.loadedAt || now - cache.loadedAt > CACHE_TTL) {
    console.info('[chat-resume] refreshing cache…')

    const [seText, tpmText] = await Promise.all([
      extractTextFromPdf(process.env.RESUME_SOFTWARE_ENGINEER_URL!),
      extractTextFromPdf(process.env.RESUME_TPM_URL!),
    ])

    cache = { seText, tpmText, loadedAt: now }
    console.info('[chat-resume] cached resumes loaded')
  }

  const { seText, tpmText } = cache

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
      { role: 'user', content: question },
    ],
    temperature: 0.4,
    max_tokens: 300,
  })

  const answer =
    completion.choices[0]?.message?.content?.trim() ??
    "Sorry, I couldn't find an answer."

  return { answer }
})