import React from 'react'
import Hero from '../Hero/Hero'
import About from '../About/About'
import TechStack from '../TechStack/TechStack'
import ScrollToTop from '../ScrollToTop/ScrollToTop'
import Projects from '../Projects/Projects'
import Journey from '../Journey/Journey'
import Services from '../Services/Services'
import Testimonials from '../Testimonials/Testimonials'
import Contact from '../Contact/Contact'

export default function Home() {
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
