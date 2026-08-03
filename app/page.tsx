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
import WhyCollaborate from './components/sections/whycollaborate'
import WhatWeOffer from './components/sections/whatweoffer'
import PerformanceStats from './components/sections/performancestats'
import InteractiveContactSection from './components/sections/contact'
import FAQ from './components/sections/faq'
import HeroNewSection from './components/sections/heronew'
import SideScroller from './components/sidescroll'
import WhatWeOfferHelvetica from './components/sections/WhatWeOfferHelvetica'
import WhatWeOfferRockwell from './components/sections/WhatWeOfferRockwell'

function page() {
  return (
    <div>
      
      <>
      
      <Navbar />
      <HeroNewSection />
      <WhyCollaborate />
      <BrandMarquee />
      <WhatWeOffer />
       <WhatWeOfferRockwell />
      <WhatWeOfferHelvetica />
      <PerformanceStats />
      <Testiminial />
      <InteractiveContactSection />
      <FAQ />
      {/* <ServicesSection />
      <SelectedWork />
      <OurApproach />
      <IndustriesSection />
      <StatsGrid/>
      <CallToAction /> */}
      <Footer />
      
      </>
    </div>
  )
}

export default page