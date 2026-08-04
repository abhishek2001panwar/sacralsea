"use client";

import { useRouter } from "next/navigation";
import React, { useMemo, useCallback } from "react";
import { Sparkles, ArrowUpRight } from "lucide-react";

const BRANDS = [
  "Japri",
  "Valens",
  "Ecofira",
  "Whimsikidz",
  "Volvo",
  "Gymbaby",
  "EHS",
  "Mineha",
  "Stalwart Elevators",
  "Design Ace",
  "Craftlane",
] as const;

const BrandMarquee: React.FC = () => {
  const router = useRouter();

  // Memoize arrays to avoid re-allocation on re-renders
  const { rowOne, rowTwo } = useMemo(() => {
    const reversed = [...BRANDS].reverse();
    return {
      rowOne: [...BRANDS, ...BRANDS, ...BRANDS],
      rowTwo: [...reversed, ...reversed, ...reversed],
    };
  }, []);

  const handleNavigate = useCallback(() => {
    router.push("/#contact");
  }, [router]);

  return (
    <section className="relative w-full overflow-hidden bg-[#131313] py-20 text-zinc-100 selection:bg-white selection:text-[#131313]">
      {/* Background Radial Glow */}

   
      {/* =========================================
          HEADER
      ========================================== */}
      <div className="relative z-10 mx-auto mb-16 max-w-7xl px-6 lg:px-12">
        <div className="flex items-center gap-2.5">
          <Sparkles className="h-4 w-4 text-zinc-400" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
            Brands and <span className="text-[#f5c563] font-normal">us</span>
          </span>
          <span className="hidden h-px flex-1 bg-white/10 sm:block ml-2" />
        </div>
      </div>

      {/* =========================================
          MARQUEE (HARDWARE ACCELERATED)
      ========================================== */}
      <div className="relative z-10">
        {/* Left Fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#131313] to-transparent sm:w-40 lg:w-84" />

        {/* Right Fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#131313] to-transparent sm:w-40 lg:w-84" />

        {/* =====================================
            ROW 1
        ====================================== */}
        <div className="mb-8 flex w-max animate-marquee-left transform-gpu will-change-transform">
          {rowOne.map((brand, index) => (
            <h1
              key={`row-one-${index}`}
              className="group flex shrink-0 items-center"
            >
              <span className="px-8  text-3xl font-light tracking-tight text-zinc-500 transition-colors duration-500 group-hover:text-white sm:px-12 sm:text-4xl md:text-5xl lg:px-16 lg:text-6xl">
                {brand}
              </span>
              <span className="text-xs text-white/20 transition-transform duration-500 group-hover:rotate-45 group-hover:text-white">
                ◆
              </span>
            </h1>
          ))}
        </div>

        {/* =====================================
            ROW 2 — REVERSED
        ====================================== */}
        <div className="flex w-max animate-marquee-right transform-gpu will-change-transform">
          {rowTwo.map((brand, index) => (
            <h1
              key={`row-two-${index}`}
              className="group flex shrink-0 items-center"
            >
              <span className="px-8  text-3xl font-light tracking-tight text-zinc-500 transition-colors duration-500 group-hover:text-white sm:px-12 sm:text-4xl md:text-5xl lg:px-16 lg:text-6xl">
                {brand}
              </span>
              <span className="text-xs text-white/20 transition-transform duration-500 group-hover:rotate-45 group-hover:text-white">
                ◆
              </span>
            </h1>
          ))}
        </div>
      </div>

      {/* =========================================
          CTA
      ========================================== */}
      <div className="relative z-10 mt-20 flex justify-center">
        <button
          type="button"
          onClick={handleNavigate}
          className="group flex items-center gap-4 rounded-xl border border-white/15 bg-[#1a1a1a] px-7 py-4 shadow-2xl transition-all duration-300 hover:border-white hover:bg-white hover:text-[#131313] focus:outline-none"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 group-hover:bg-[#131313] group-hover:text-white">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-200 transition-colors duration-300 group-hover:text-[#131313]">
            Understand us better
          </span>
        </button>
      </div>

      {/* =========================================
          ANIMATIONS
      ========================================== */}
      <style jsx>{`
        @keyframes marqueeLeft {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-33.333%, 0, 0);
          }
        }

        @keyframes marqueeRight {
          from {
            transform: translate3d(-33.333%, 0, 0);
          }
          to {
            transform: translate3d(0, 0, 0);
          }
        }

        .animate-marquee-left {
          animation: marqueeLeft 65s linear infinite;
        }

        .animate-marquee-right {
          animation: marqueeRight 65s linear infinite;
        }

        .animate-marquee-left:hover,
        .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default BrandMarquee;