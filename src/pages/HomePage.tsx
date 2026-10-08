import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import TechStack from '@/components/home/TechStack'
import Projects from '@/components/home/Projects'
import Journey from '@/components/home/Journey'
import Services from '@/components/home/Services'
// import Testimonials from '@/components/home/Testimonials' // disabled until real testimonials exist
import Contact from '@/components/home/Contact'
import ScrollToTop from '@/components/ui/ScrollToTop'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <TechStack />
      <ScrollToTop />
      <Projects />
      <Journey />
      <Services />
      {/* <Testimonials /> */}
      <Contact />
    </>
  )
}