// utils/openaiClient.ts
import OpenAI from "openai"

export const openai = new OpenAI({
  apiKey: useRuntimeConfig().openaiApiKey as string
})
