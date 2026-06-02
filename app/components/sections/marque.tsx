import React from 'react';

const BrandMarquee: React.FC = () => {
  const brands: string[] = [
    'Luminary',
    'Axion Labs',
    'Verdant',
    'Northpeak',
    'Solace AI',
    'Meridian',
    'Drift & Co',
    'Harbour'
  ];

  // We duplicate the list to ensure there's no visible "pop" or gap when the animation loops
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <div className="bg-[#121211] w-full py-10 overflow-hidden border-y border-neutral-900/60 relative flex items-center select-none">
      
      {/* Left Gradient Fade Overlay for Premium Blend */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#121211] to-transparent z-10 pointer-events-none" />
      
      {/* Right Gradient Fade Overlay for Premium Blend */}
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#121211] to-transparent z-10 pointer-events-none" />

      {/* Marquee Container Tracking Layer */}
      <div className="flex whitespace-nowrap min-w-full shrink-0 items-center justify-around gap-12 animate-marquee">
        {duplicatedBrands.map((brand, idx) => (
          <div key={idx} className="flex items-center gap-12 shrink-0">
            {/* Elegant Serif Brand Item */}
            <span className=" text-xl sm:text-2xl md:text-3xl text-neutral-400 font-light tracking-wide transition-colors duration-300 hover:text-[#c5a880]">
              {brand}
            </span>
            
            {/* Premium Gold Muted Diamond Separator */}
            <span className="text-[#c5a880]/40 text-xs sm:text-sm select-none font-sans">
              ◆
            </span>
          </div>
        ))}
      </div>

      {/* Tailwind Custom Keyframes Injection */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        /* Optional: slow down marquee when users hover over it */
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

    </div>
  );
};

export default BrandMarquee;