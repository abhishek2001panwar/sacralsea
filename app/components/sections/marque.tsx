"use client";

import { useRouter } from "next/navigation";
import React from "react";

const BrandMarquee: React.FC = () => {
  const brands = [
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
  ];

  const router = useRouter();
  // Reverse the same brands for second row
  const reversedBrands = [...brands].reverse();

  // Duplicate for seamless looping
  const rowOne = [...brands, ...brands, ...brands];

  const rowTwo = [
    ...reversedBrands,
    ...reversedBrands,
    ...reversedBrands,
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#0d0d0c] py-24 text-[#fbfaf7] sm:py-32">

      {/* =========================================
          HEADER
      ========================================== */}

      <div className="mx-auto mb-16 max-w-[1600px] px-5 sm:px-8 lg:px-12">

        <div className="flex items-center gap-4">

          <span className="h-px w-8 bg-[#c5a880]" />

          <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a880]">
            Brands and us
          </span>

          <span className="hidden h-px flex-1 bg-[#c5a880]/15 sm:block" />

        </div>

      </div>


      {/* =========================================
          MARQUEE
      ========================================== */}

      <div className="relative">

        {/* Left Fade */}

        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#0d0d0c] to-transparent sm:w-40 lg:w-84" />

        {/* Right Fade */}

        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#0d0d0c] to-transparent sm:w-40 lg:w-84" />


        {/* =====================================
            ROW 1
        ====================================== */}

        <div className="mb-8 flex w-max animate-marquee-left">

          {rowOne.map((brand, index) => (

            <div
              key={`row-one-${index}`}
              className="group flex shrink-0 items-center"
            >

              <span className="px-8 font-serif text-3xl font-light tracking-tight text-[#77736c] transition-colors duration-500 group-hover:text-[#c5a880] sm:px-12 sm:text-4xl md:text-5xl lg:px-16 lg:text-6xl">

                {brand}

              </span>

              <span className="text-xs text-[#c5a880]/40 transition-transform duration-500 group-hover:rotate-45">

                ◆

              </span>

            </div>

          ))}

        </div>


        {/* =====================================
            ROW 2 — REVERSED
        ====================================== */}

        <div className="flex w-max animate-marquee-right">

          {rowTwo.map((brand, index) => (

            <div
              key={`row-two-${index}`}
              className="group flex shrink-0 items-center"
            >

              <span className="px-8 font-serif text-3xl font-light tracking-tight text-[#77736c] transition-colors duration-500 group-hover:text-[#c5a880] sm:px-12 sm:text-4xl md:text-5xl lg:px-16 lg:text-6xl">

                {brand}

              </span>

              <span className="text-xs text-[#c5a880]/40 transition-transform duration-500 group-hover:rotate-45">

                ◆

              </span>

            </div>

          ))}

        </div>

      </div>


      {/* =========================================
          CTA
      ========================================== */}

      <div className="mt-20 flex justify-center">

        <button onClick={() => {
          router.push('/#contact');
        }} className="group flex items-center gap-5">

          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#c5a880] text-[#c5a880] transition-all duration-500 group-hover:bg-[#c5a880] group-hover:text-[#0d0d0c]">

            <span className="text-lg transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>

          </span>

          <span className="relative text-[10px] uppercase tracking-[0.3em] text-[#c5a880]">

            Understand us better

            <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#c5a880] transition-all duration-500 group-hover:w-full" />

          </span>

        </button>

      </div>


      {/* =========================================
          ANIMATIONS
      ========================================== */}

      <style jsx>{`

        @keyframes marqueeLeft {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-33.333%);
          }
        }

        @keyframes marqueeRight {
          from {
            transform: translateX(-33.333%);
          }

          to {
            transform: translateX(0);
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