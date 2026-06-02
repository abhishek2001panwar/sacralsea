import React from 'react';

const CallToAction: React.FC = () => {
  return (
    <div className="bg-[#0b0b0a] text-[#f5f5f3] w-full px-6 md:px-12 lg:px-24 py-10 flex flex-col items-center text-center justify-center selection:bg-neutral-800">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Top Tagline */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#c5a880] font-mono font-semibold">
            LET'S BUILD
          </span>
        </div>

        {/* Main Headline with Mixed Serif Styles */}
        <h2 className=" text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.15] tracking-tight text-neutral-100 max-w-3xl mb-8">
          Ready to make{' '}
          <span className="text-[#c5a880] italic font-light block sm:inline">
            something remarkable?
          </span>
        </h2>

        {/* Subtitle Description */}
        <p className="text-neutral-400 font-sans text-xs sm:text-sm leading-relaxed max-w-lg tracking-wide mb-12 opacity-80">
          We work with a select number of clients each quarter. Tell us about your project - we'll tell you if we're the right fit.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Primary Solid Gold Button */}
          <button className="w-full sm:w-auto px-8 py-4 bg-[#c5a880] text-[#0b0b0a] font-mono text-xs tracking-[0.2em] font-bold uppercase flex items-center justify-center gap-3 transition-transform duration-200 hover:bg-[#d4b993] active:scale-[0.98]">
            START A PROJECT
            <span className="text-sm leading-none font-sans select-none">→</span>
          </button>

          {/* Secondary Bordered Button */}
          <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-neutral-800 text-neutral-300 font-mono text-xs tracking-[0.2em] uppercase transition-colors duration-200 hover:bg-neutral-900/40 hover:text-white">
            VIEW OUR WORK
          </button>
        </div>

        {/* Decorative Indicator Dot (Footer Anchor Accent) */}
        <div className="mt-16 flex justify-center">
          <div className="w-5 h-5 rounded-full border border-neutral-800 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c5a880]"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CallToAction;