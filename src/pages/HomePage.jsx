import React from 'react'
import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import TechStack from '@/components/home/TechStack'
import ScrollToTop from '@/components/ui/ScrollToTop'
import Projects from '@/components/home/Projects'
import Journey from '@/components/home/Journey'
import Services from '@/components/home/Services'
import Testimonials from '@/components/home/Testimonials'
import Contact from '@/components/home/Contact'

export default function HomePage() {
  return (
    <>
      <Hero></Hero>
      <About></About>
      <TechStack></TechStack>
      <ScrollToTop></ScrollToTop>
      <Projects></Projects>
      <Journey></Journey>
      <Services></Services>
      {/* <Testimonials></Testimonials> */}
      <Contact></Contact>
    </>
  )
}
