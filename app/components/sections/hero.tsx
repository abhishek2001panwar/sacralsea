import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    // Uses h-screen and dvh (dynamic viewport height) to safely lock 100% boundary on mobile browsers
    <section className="relative h-[60vh] md:h-[90vh]  w-full bg-[#0d0d0c] text-[#fbfaf7]  flex flex-col p-4 sm:p-8 lg:p-12 overflow-hidden selection:bg-[#c5a880] selection:text-[#0d0d0c]">
      
      {/* Fine Grid Background Matrix */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: 'clamp(30px, 5vw, 50px) clamp(30px, 5vw, 50px)'
        }}
      />

      {/* --- TOP HEADER NAVIGATION --- */}
      <header className="relative z-10 flex items-center space-x-2 sm:space-x-4 text-[10px] sm:text-xs tracking-[0.2em] text-[#a3a29e] uppercase font-medium pt-1 shrink-0">
        <span className="inline-block w-3 sm:w-4 h-[1px] bg-[#a3a29e] -mt-0.5"></span>
        <span>Creative Agency</span>
        <span className="text-[#575653]">•</span>
        <span>Est. 2019</span>
        <span className="text-[#575653]">•</span>
        <span>Global</span>
      </header>

      {/* --- MAIN HERO TYPOGRAPHY --- */}
      {/* min-h-0 breaks the implicit min-content height block, guaranteeing safety on short screens */}
      <main className="relative z-10 flex-grow flex items-center w-full max-w-7xl my-auto min-h-0 py-4 sm:py-6">
        <h1 
          className=" font-light leading-[1.05] tracking-tight text-[#fbfaf7] select-none"
          style={{
            // clamp(minimum_size, fluid_viewport_size, maximum_size) prevents text from exploding or collapsing
            fontSize: 'clamp(2.25rem, 8.5vw, 6.5rem)'
          }}
        >
          Brands <span className="relative inline-block">that<span className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[6px] h-[6px] sm:w-2 sm:h-2 bg-[#c5a880] rounded-full"></span></span> <br />
          <span className="font-serif italic text-[#c5a880] font-light">move</span> culture, <br />
          win markets.
        </h1>
      </main>

      {/* --- FOOTER / BOTTOM CONTROLS --- */}
      {/* Always structural, never allowed to shrink or drop below the viewport line */}
      <footer className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8 pb-1 sm:pb-2 mt-auto shrink-0 w-full">
        
        {/* Left Subtext Description */}
        <div className="max-w-xs sm:max-w-sm md:max-w-md text-[11px] sm:text-xs md:text-sm text-[#8c8b88] leading-relaxed font-light">
          We build brands, campaigns, and digital experiences 
          for companies that refuse to be ordinary - from 
          seed-stage startups to global enterprises.
        </div>

        {/* Right Actionable Elements */}
        <div className="flex items-center space-x-4 sm:space-x-6 shrink-0 self-start md:self-end">
          
          {/* Main Work CTA Button */}
          <button className="bg-[#c5a880] text-[#0d0d0c] font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.15em] font-bold px-4 sm:px-6 py-2.5 sm:py-3.5 flex items-center transition-transform duration-300 hover:bg-[#b3966e] active:scale-95 group whitespace-nowrap">
            See our work
            <span className="ml-2 sm:ml-3 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>

          {/* Secondary Link */}
          <button className="text-[#fbfaf7] font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.15em] font-semibold border-b border-[#3d3d3a] pb-1 hover:border-[#fbfaf7] transition-colors duration-300 whitespace-nowrap">
            Start a project
          </button>
          
          {/* Vertical Scroll Indicator (Hidden on Mobile/Tablet) */}
          <div className="hidden lg:flex flex-col items-center pl-4 border-l border-[#242422]">
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#61605d] [writing-mode:vertical-lr] tracking-[0.4em] select-none">
              Scroll
            </span>
          </div>

        </div>
      </footer>
    </section>
  );
};

export default HeroSection;