import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-[#0C0C0A] text-[#f5f5f3] w-full h-screen px-6 md:px-12 lg:px-24 pt-16 pb-32 flex flex-col justify-between overflow-hidden selection:bg-neutral-800">
      
      {/* Subtle Grid Background Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `
            linear-gradient(to right, #404040 1px, transparent 1px),
            linear-gradient(to bottom, #404040 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />
      

      <div className="max-w-7xl w-full mx-auto relative z-10 flex-1 flex flex-col justify-between gap-8">
        {/* Right Side Grid Overlay (Premium Focus Area) */}
<div
  className="
    absolute right-0 top-0 h-full w-1/2
    pointer-events-none
    opacity-[0.12]
  "
  style={{
    backgroundImage: `
      linear-gradient(to right, #2f2f2f 1px, transparent 1px),
      linear-gradient(to bottom, #2f2f2f 1px, transparent 1px)
    `,
    backgroundSize: '70px 70px',
    maskImage:
      'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))',
    WebkitMaskImage:
      'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))',
  }}
/>
<div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#0C0C0A] via-[#0C0C0A]/40 to-transparent pointer-events-none" />
        
        {/* Top Header Tagline Area */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-neutral-400 font-medium">
            <span>CREATIVE AGENCY</span>
            <span className="text-neutral-700 font-sans">•</span>
            <span>EST. 2019</span>
            <span className="text-neutral-700 font-sans">•</span>
            <span>GLOBAL</span>
          </div>
        </div>

        {/* Main Immersive Typography */}
        <h1 className=" text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-[7rem] leading-[1.05] tracking-tight text-neutral-100 max-w-5xl">
          Brands that <br />
          <span className="text-[#c5a880] italic font-light">move</span> culture, <br />
          win markets.
        </h1>

        {/* Bottom Content Row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 ">
          
          {/* Paragraph Bio */}
          <p className="text-neutral-500 font-sans text-xs md:text-sm leading-relaxed max-w-sm tracking-wide">
            We build brands, campaigns, and digital experiences for companies that refuse to be ordinary - from seed-stage startups to global enterprises.
          </p>

          {/* Persistent Action Bar & Scroll Track */}
          <div className="flex items-center gap-6 self-end lg:self-auto">
            
            {/* Call To Actions */}
            <div className="flex items-center gap-3 border border-neutral-800/60 bg-[#0b0b0a]/80 backdrop-blur-sm">
              {/* Solid Gold Accent Button */}
              <button className="px-6 py-4 bg-[#c5a880] text-[#0b0b0a] font-mono text-[10px] tracking-[0.2em] font-bold uppercase flex items-center gap-3 transition-colors duration-200 hover:bg-[#d4b993]">
                SEE OUR WORK
                <span className="text-xs font-sans">→</span>
              </button>
              
              {/* Ghost Contextual Button */}
              <button className="px-6 py-4 text-neutral-400 hover:text-white font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-200">
                START A PROJECT
              </button>
            </div>

            {/* Vertical Scroll Indicator Pillar */}
            <div className="hidden sm:flex flex-col items-center gap-4 h-24 relative">
              <div className="w-[1px] flex-1 bg-neutral-800 relative overflow-hidden">
                {/* Micro-animation mimicking infinite downward scroll rhythm */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-[#c5a880] animate-[bounce_2s_infinite]" />
              </div>
              <span className="font-mono text-[9px] tracking-[0.4em] text-neutral-600 uppercase [writing-mode:vertical-lr] select-none">
                SCROLL
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default HeroSection;