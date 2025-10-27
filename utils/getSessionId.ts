export function getSessionId(event: { req: { headers: { [x: string]: string } }; res: { setHeader: (arg0: string, arg1: string) => void } }) {
  const cookie = event.req.headers['cookie'] || ''
  const match = cookie.match(/chrisbot-session=([^;]+)/)
  if (match) return match[1]

  const randomId = crypto.randomUUID()
  event.res.setHeader('Set-Cookie', `chrisbot-session=${randomId}; Path=/; Max-Age=604800`)
  return randomId
}