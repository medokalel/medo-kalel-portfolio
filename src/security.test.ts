import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const read = (file: string) => readFileSync(resolve(process.cwd(), file), 'utf8')
const config = JSON.parse(read('vercel.json')) as {
  rewrites: { source: string; destination: string }[]
  headers: { source: string; headers: { key: string; value: string }[] }[]
}
const header = (name: string) =>
  config.headers.flatMap((entry) => entry.headers).find((item) => item.key === name)?.value ?? ''

describe('security headers (vercel.json)', () => {
  it('allows the inline theme script only by its hash — fails if index.html changes without updating the CSP', () => {
    const inline = [...read('index.html').matchAll(/<script>([\s\S]*?)<\/script>/g)].map((match) => match[1])
    expect(inline).toHaveLength(1)
    const hash = createHash('sha256').update(inline[0]).digest('base64')
    expect(header('Content-Security-Policy')).toContain(`'sha256-${hash}'`)
  })

  it('does not allow inline or eval scripts in general', () => {
    const csp = header('Content-Security-Policy')
    const scriptSrc = csp.split(';').find((part) => part.trim().startsWith('script-src')) ?? ''
    expect(scriptSrc).not.toContain('unsafe-inline')
    expect(scriptSrc).not.toContain('unsafe-eval')
    expect(csp).toContain("frame-ancestors 'none'")
    expect(csp).toContain("object-src 'none'")
  })

  it('only talks to EmailJS (contact form) besides itself', () => {
    expect(header('Content-Security-Policy')).toContain("connect-src 'self' https://api.emailjs.com")
  })

  it('sends the standard hardening headers', () => {
    for (const name of ['Strict-Transport-Security', 'X-Content-Type-Options', 'X-Frame-Options', 'Referrer-Policy', 'Permissions-Policy']) {
      expect(header(name), name).not.toBe('')
    }
  })

  it('falls back to the empty app shell for URLs that have no prerendered page', () => {
    expect(config.rewrites).toContainEqual({ source: '/(.*)', destination: '/app-shell.html' })
  })
})
