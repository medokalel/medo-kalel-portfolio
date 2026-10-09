import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  const { t } = useTranslation()
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[1200] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus:no-underline"
      >
        {t('a11y.skipToContent')}
      </a>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}