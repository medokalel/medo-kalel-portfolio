/**
 * Build step 3 of 3 (see "build" in package.json): turns the SPA shell into one static HTML file per page.
 *
 *   dist/index.html            ← English home (real content, English <head>)
 *   dist/ar/index.html         ← Arabic home (lang="ar" dir="rtl")
 *   dist/projects/index.html, dist/ar/projects/..., dist/projects/<id>/index.html ...
 *   dist/app-shell.html        ← the untouched empty shell
 *   dist/404.html              ← the same shell: Vercel serves it with a real HTTP 404 for any URL that has no page,
 *                                and the app then renders its "page not found" screen
 *
 * The browser still renders the app itself on top of this HTML, so behaviour is unchanged;
 * crawlers, link previews (WhatsApp, LinkedIn, X) and slow connections get real content and per-page meta tags.
 */
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { loadEnv } from 'vite'

const root = process.cwd()
const dist = join(root, 'dist')
const siteUrl = (loadEnv('production', root, 'VITE_').VITE_SITE_URL ?? '').replace(/\/$/, '')

const { render, prerenderPaths } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href)

const template = await readFile(join(dist, 'index.html'), 'utf8')
await copyFile(join(dist, 'index.html'), join(dist, 'app-shell.html'))
await copyFile(join(dist, 'index.html'), join(dist, '404.html'))

const escapeHtml = (text) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Replaces one attribute value on the first tag that matches; fails loudly if the template changed shape. */
function replaceTag(html, tagPattern, attribute, value) {
  const tag = html.match(tagPattern)
  if (!tag) throw new Error(`prerender: tag not found in index.html: ${tagPattern}`)
  const updated = tag[0].replace(new RegExp(`(${attribute}=")[^"]*(")`), `$1${escapeHtml(value)}$2`)
  return html.replace(tag[0], () => updated)
}
const metaByName = (html, name, content) =>
  replaceTag(html, new RegExp(`<meta\\s+name="${escapeRegExp(name)}"[^>]*>`), 'content', content)
const metaByProperty = (html, property, content) =>
  replaceTag(html, new RegExp(`<meta\\s+property="${escapeRegExp(property)}"(?!:)[^>]*>`), 'content', content)

const urlFor = (path) => siteUrl + (path === '/' ? '/' : path)
const stripAr = (path) => (path === '/ar' ? '/' : path.replace(/^\/ar(?=\/)/, ''))

let count = 0
for (const path of prerenderPaths) {
  const page = await render(path)
  const base = stripAr(path)
  const enUrl = urlFor(base)
  const arUrl = urlFor(base === '/' ? '/ar' : `/ar${base}`)
  const selfUrl = page.language === 'ar' ? arUrl : enUrl
  const otherLocale = page.language === 'ar' ? 'en_US' : 'ar_AR'

  let html = template
  html = html.replace(/<html lang="[^"]*" dir="[^"]*">/, `<html lang="${page.language}" dir="${page.dir}">`)
  html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${escapeHtml(page.title)}</title>`)
  html = metaByName(html, 'description', page.description)
  html = metaByProperty(html, 'og:title', page.title)
  html = metaByProperty(html, 'og:description', page.description)
  html = metaByName(html, 'twitter:title', page.title)
  html = metaByName(html, 'twitter:description', page.description)
  html = metaByProperty(html, 'og:url', selfUrl)
  html = metaByProperty(html, 'og:locale', page.ogLocale)
  html = replaceTag(html, /<meta\s+property="og:locale:alternate"[^>]*>/, 'content', otherLocale)
  html = replaceTag(html, /<link\s+rel="canonical"[^>]*>/, 'href', selfUrl)
  html = replaceTag(html, /<link\s+rel="alternate"\s+hreflang="en"[^>]*>/, 'href', enUrl)
  html = replaceTag(html, /<link\s+rel="alternate"\s+hreflang="ar"[^>]*>/, 'href', arUrl)
  html = replaceTag(html, /<link\s+rel="alternate"\s+hreflang="x-default"[^>]*>/, 'href', enUrl)

  if (!html.includes('<div id="root"></div>')) throw new Error('prerender: <div id="root"></div> not found in index.html')
  html = html.replace('<div id="root"></div>', () => `<div id="root">${page.html}</div>`)

  const file = join(dist, path === '/' ? 'index.html' : join(path, 'index.html'))
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html)
  count++
}

console.log(`prerender: wrote ${count} pages (+ app-shell.html, 404.html)`)
