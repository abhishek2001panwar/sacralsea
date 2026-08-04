"use client";

import React, { useRef, useEffect, useState, memo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useMotionValue,
} from "framer-motion";

/* ============================================================================
   TYPES & DATA
   ============================================================================ */

interface StatData {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  vizType: "bar" | "wave" | "spark" | "ring" | "matrix";
}

const stats: StatData[] = [
  {
    id: "1",
    value: 30,
    suffix: "K",
    label: "Organic followers grown recently",
    vizType: "spark",
  },
  {
    id: "2",
    value: 75,
    suffix: "+",
    label: "Blogs written monthly",
    vizType: "bar",
  },
  {
    id: "3",
    value: 50,
    suffix: "+",
    label: "Keywords ranking top 10",
    vizType: "ring",
  },
  {
    id: "4",
    value: 4.2,
    suffix: "%",
    decimals: 1,
    label: "Reduction in cost per lead",
    vizType: "wave",
  },
  {
    id: "5",
    value: 30,
    suffix: "+",
    label: "Guaranteed MQL",
    vizType: "matrix",
  },
  {
    id: "6",
    value: 43,
    suffix: "%",
    label: "Average video hook rate",
    vizType: "spark",
  },
  {
    id: "7",
    value: 100,
    suffix: "+",
    label: "Videos created monthly",
    vizType: "bar",
  },
  {
    id: "8",
    value: 75,
    suffix: "+",
    label: "Pages cited on AI engines",
    vizType: "wave",
  },
  {
    id: "9",
    value: 500,
    suffix: "+",
    label: "AI overview sourced",
    vizType: "ring",
  },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ============================================================================
   KINETIC NUMBER COUNTER COMPONENT (OPTIMIZED)
   ============================================================================ */

const AnimatedNumber = memo(function AnimatedNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { damping: 30, stiffness: 60 });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      motionVal.set(value);
    } else {
      motionVal.set(0);
    }
  }, [isInView, value, motionVal]);

  useEffect(() => {
    return springVal.on("change", (latest) => {
      setDisplayValue(latest.toFixed(decimals));
    });
  }, [springVal, decimals]);

  return (
    <span ref={ref} className="font-sans font-light tracking-tight inline-block">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
});

/* ============================================================================
   MICRO VISUALIZER GRAPHICS
   ============================================================================ */

const StatVisualizer = memo(function StatVisualizer({ type, isHovered }: { type: StatData["vizType"]; isHovered: boolean }) {
  if (type === "bar") {
    return (
      <div className="flex items-end gap-1.5 h-6">
        {[0.4, 0.7, 0.5, 0.9, 0.6].map((h, i) => (
          <motion.div
            key={i}
            animate={{
              scaleY: isHovered ? [h, h * 1.3, h] : h,
            }}
            transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0, delay: i * 0.1 }}
            className="w-1.5 h-full origin-bottom rounded-full bg-white/40 transform-gpu"
          />
        ))}
      </div>
    );
  }

  if (type === "wave") {
    return (
      <div className="flex items-center gap-1">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scaleY: isHovered ? [0.3, 1, 0.3] : 0.4,
              opacity: isHovered ? [0.4, 1, 0.4] : 0.3,
            }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
            className="w-1 h-5 rounded-full bg-white transform-gpu"
          />
        ))}
      </div>
    );
  }

  if (type === "spark") {
    return (
      <motion.div
        animate={{
          scale: isHovered ? [1, 1.25, 1] : 1,
          rotate: isHovered ? 180 : 0,
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="relative flex items-center justify-center h-7 w-7 rounded-full border border-white/20 bg-white/5 transform-gpu"
      >
        <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-1 w-5 h-5">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: isHovered ? [0.6, 1.1, 0.6] : 0.8,
            opacity: isHovered ? 1 : 0.4,
          }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
          className="bg-white rounded-sm transform-gpu"
        />
      ))}
    </div>
  );
});

/* ============================================================================
   SINGLE STAT CARD COMPONENT
   ============================================================================ */

const StatCard = memo(function StatCard({ stat }: { stat: StatData }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`
        relative group overflow-hidden rounded-2xl p-8 lg:p-10
        border border-white/5 bg-[#1a1a1a] shadow-2xl
        transition-colors duration-500 transform-gpu will-change-transform
        hover:border-white/20 hover:bg-[#202020]
      `}
    >
      {/* Background Hover Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-[radial-gradient(400px_circle_at_center,rgba(255,255,255,0.04),transparent_80%)]"
      />

      {/* Visualizer Icon */}
      <div className="relative z-10 flex items-center justify-between mb-8">
        <StatVisualizer type={stat.vizType} isHovered={isHovered} />
      </div>

      {/* Counter Value */}
      <motion.h1
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative z-10 text-5xl  lg:text-6xl font-light text-white transition-colors duration-500"
      >
        <AnimatedNumber
          value={stat.value}
          decimals={stat.decimals}
          prefix={stat.prefix}
          suffix={stat.suffix}
        />
      </motion.h1>

      {/* Description Label */}
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        className="relative z-10 mt-4 text-sm lg:text-base font-normal leading-relaxed text-zinc-400 group-hover:text-zinc-200 transition-colors duration-500"
      >
        {stat.label}
      </motion.p>

      {/* Bottom Accent Line */}
      <motion.div
        initial={false}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent origin-center"
      />
    </motion.div>
  );
});

/* ============================================================================
   MAIN KINETIC STATS SECTION
   ============================================================================ */

export default function PerformanceStats() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure scroll progress relative to this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax Shifts
  const col1Y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const col2Y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const col3Y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  // Watermark Horizontal Scroll
  const tickerX1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const tickerX2 = useTransform(scrollYProgress, [0, 1], ["-20%", "10%"]);

  // Split stats into 3 columns
  const col1Stats = [stats[0], stats[3], stats[6]];
  const col2Stats = [stats[1], stats[4], stats[7]];
  const col3Stats = [stats[2], stats[5], stats[8]];

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#131313] py-5 font-sans text-zinc-100 selection:bg-white selection:text-[#131313]"
    >
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(255,255,255,0.02),transparent_100%)] z-1" />

      {/* Watermark Background Typography */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-center space-y-12 opacity-[0.02] select-none font-bold text-9xl uppercase tracking-tighter">
        <motion.div style={{ x: tickerX1 }} className="whitespace-nowrap transform-gpu will-change-transform">
          PERFORMANCE GROWTH DATA RESULTS IMPACT
        </motion.div>
        <motion.div style={{ x: tickerX2 }} className="whitespace-nowrap transform-gpu will-change-transform">
          METRICS INTELLIGENCE ORGANIC SCALING
        </motion.div>
      </div>

      {/* Main Heading Section */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 mb-20 lg:mb-32 overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white"
        >
          Real Impact, <span className="text-[#f5c563] font-serif italic">Quantified</span>
        </motion.h2>
      </div>

      {/* 3-Column Alternating Parallax Grid */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* COLUMN 1 */}
          <motion.div style={{ y: col1Y }} className="flex flex-col gap-6 lg:gap-8 transform-gpu will-change-transform">
            {col1Stats.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </motion.div>

          {/* COLUMN 2 */}
          <motion.div style={{ y: col2Y }} className="flex flex-col gap-6 lg:gap-8 md:mt-12 lg:mt-16 transform-gpu will-change-transform">
            {col2Stats.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </motion.div>

          {/* COLUMN 3 */}
          <motion.div style={{ y: col3Y }} className="flex flex-col gap-6 lg:gap-8 md:col-span-2 lg:col-span-1 transform-gpu will-change-transform">
            {col3Stats.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </motion.div>

        </div>
      </div>

      {/* Vignette Top & Bottom Borders */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#131313] to-transparent z-20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#131313] to-transparent z-20" />
    </section>
  );
}