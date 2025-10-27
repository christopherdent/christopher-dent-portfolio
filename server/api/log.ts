import fs from 'fs/promises'
import path from 'path'

export default defineEventHandler(async (event) => {
    console.log('[log.ts] Hit logging endpoint')

  const body = await readBody(event)
console.log('[log.ts] Body:', body)

  const logPath = path.resolve('data/chrisbot-log.json')

  // Make sure the folder exists
  try {
    await fs.mkdir(path.dirname(logPath), { recursive: true })
  } catch (err) {
    console.warn('Failed to create /data folder:', err)
  }

  // Read existing logs or start fresh
  const existing = await fs.readFile(logPath, 'utf8').catch(() => '[]')
  const logs = JSON.parse(existing)

  logs.push(body)
 
await fs.writeFile(logPath, JSON.stringify(logs, null, 2))
console.log('[log.ts] Successfully wrote to:', logPath)

  return { success: true }
})
