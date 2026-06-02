import React from 'react'
import HeroSection from './components/sections/hero'
import Navbar from './components/Navbar'
import Whatwedo from './components/sections/whatwedo'
import ServicesSection from './components/sections/whatwedo'
import SelectedWork from './components/sections/work'
import OurApproach from './components/sections/approach'
import IndustriesSection from './components/sections/industries'
import Testiminial from './components/sections/testiminial'
import StatsGrid from './components/sections/stats'
import CallToAction from './components/sections/cta'
import Footer from './components/sections/footer'
import BrandMarquee from './components/sections/marque'

function page() {
  return (
    <div>
      
      <>
      <Navbar />
      <HeroSection />
      <BrandMarquee />
      <ServicesSection />
      <SelectedWork />
      <OurApproach />
      <IndustriesSection />
      <Testiminial />
      <StatsGrid/>
      <CallToAction />
      <Footer />
      
      </>
    </div>
  )
}

export default page