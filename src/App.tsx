import {
  createBrowserRouter,
  Navigate,
  Outlet,
  redirect,
  RouterProvider,
  ScrollRestoration,
  type LoaderFunctionArgs,
  type RouteObject,
} from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import { defaultLanguage, getLanguageFromPath, localizePath, readStoredLanguage } from '@/i18n/config'
import i18n from '@/i18n'
import { updateSeoLinks } from '@/lib/seo'
import HomePage from '@/pages/HomePage'

/**
 * Runs before every page change: the URL decides the language (/ = English, /ar = Arabic).
 * A visitor who explicitly chose Arabic earlier is sent from the English URL to the Arabic one.
 */
async function rootLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const language = getLanguageFromPath(url.pathname)

  const stored = readStoredLanguage()
  if (language === defaultLanguage && stored && stored !== defaultLanguage) {
    return redirect(localizePath(url.pathname, stored) + url.search)
  }

  await i18n.changeLanguage(language)
  updateSeoLinks(url.pathname)
  return null
}

/** Secondary pages are loaded on demand, so the home page ships less JavaScript. */
const projectsPage = { lazy: async () => ({ Component: (await import('@/pages/ProjectsPage')).default }) }
const notFoundPage = { lazy: async () => ({ Component: (await import('@/pages/NotFoundPage')).default }) }

/** Root route: new pages open at the top, Back restores the old position, #hash links still work. */
function Root() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  )
}

/** The same pages exist under every language prefix: '' (English) and '/ar'. */
function pagesFor(prefix: '' | '/ar'): RouteObject[] {
  return [
    {
      path: prefix || '/',
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'home', element: <HomePage /> },
      ],
    },
    { path: `${prefix}/projects`, ...projectsPage },
    // Old URL (kept so existing links don't break)
    { path: `${prefix}/projectspage`, element: <Navigate to={`${prefix}/projects`} replace /> },
  ]
}

const router = createBrowserRouter([
  {
    element: <Root />,
    loader: rootLoader,
    shouldRevalidate: ({ currentUrl, nextUrl }) => currentUrl.pathname !== nextUrl.pathname,
    hydrateFallbackElement: <div className="min-h-screen bg-page" />,
    children: [...pagesFor(''), ...pagesFor('/ar'), { path: '*', ...notFoundPage }],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
