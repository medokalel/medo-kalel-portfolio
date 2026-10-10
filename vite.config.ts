import { defineConfig } from 'vitest/config'
import { loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { projectIds } from './src/content/project-ids'

/**
 * Emits robots.txt and sitemap.xml at build time from VITE_SITE_URL, so no domain is hard-coded.
 * Every page exists in both languages, linked with hreflang alternates.
 */
function seoFiles(siteUrl: string): Plugin {
  const pages = ['/', '/projects', ...projectIds.map((id) => `/projects/${id}`)]
  const localized = (page: string, prefix: string) => siteUrl + (page === '/' ? prefix || '/' : prefix + page)

  return {
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', ...(siteUrl ? ['', `Sitemap: ${siteUrl}/sitemap.xml`] : [])]
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') + '\n' })
      if (!siteUrl) return

      const entries = pages.flatMap((page) =>
        ['', '/ar'].map((prefix) =>
          [
            '  <url>',
            `    <loc>${localized(page, prefix)}</loc>`,
            `    <xhtml:link rel="alternate" hreflang="en" href="${localized(page, '')}"/>`,
            `    <xhtml:link rel="alternate" hreflang="ar" href="${localized(page, '/ar')}"/>`,
            `    <xhtml:link rel="alternate" hreflang="x-default" href="${localized(page, '')}"/>`,
            '  </url>',
          ].join('\n'),
        ),
      )
      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        ...entries,
        '</urlset>',
        '',
      ].join('\n')
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
    },
  }
}

export default defineConfig(({ mode }) => {
  const siteUrl = (loadEnv(mode, process.cwd(), 'VITE_').VITE_SITE_URL ?? '').replace(/\/$/, '')

  return {
    plugins: [react(), tailwindcss(), seoFiles(siteUrl)],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      css: false,
    },
  }
})
