'use client';

import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';

// High-end agency quintic ease curve
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Parent Container Variant — Handles clean word staggering with zero DOM bloat
const sentenceContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

// Word Mask Variant — Smooth upward slide out of an overflow mask
const wordVariant: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
    filter: 'blur(8px)',
  },
  visible: {
    y: '0%',
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

interface SmoothWordProps {
  word: string;
  isYellow?: boolean;
}

// Word Component wrapped in an overflow clipping mask
const SmoothWord: React.FC<SmoothWordProps> = ({ word, isYellow = false }) => {
  return (
    <span className="inline-block overflow-hidden py-1">
      <motion.span
        variants={wordVariant}
        className={`inline-block transform-gpu will-change-transform ${
          isYellow ? 'text-[#f5c563] font-normal' : ''
        }`}
      >
        {word}
      </motion.span>
    </span>
  );
};

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ================= SCROLL TIMING CONTROLS =================

  // Phase 1 (Static Intro): [0 -> 0.22]
  const phase1Opacity = useTransform(scrollYProgress, [0, 0.18, 0.24], [1, 1, 0]);
  const phase1Y = useTransform(scrollYProgress, [0, 0.24], [0, -40]);

  // Video Background: Fades in during Frame 1 transition
  const videoOpacity = useTransform(scrollYProgress, [0.18, 0.3], [0, 1]);

  // Frame 1: "You arrived" (0.26 -> 0.46)
  const frame1Opacity = useTransform(scrollYProgress, [0.24, 0.3, 0.44, 0.48], [0, 1, 1, 0]);
  const frame1Scale = useTransform(scrollYProgress, [0.24, 0.48], [0.95, 1.05]);

  // Frame 2: "On the dot" + Clock Zoom (0.48 -> 0.72)
  const frame2Opacity = useTransform(scrollYProgress, [0.48, 0.53, 0.68, 0.73], [0, 1, 1, 0]);
  const clockScale = useTransform(scrollYProgress, [0.48, 0.72], [0.8, 1.6]);
  const bigHandRotation = useTransform(scrollYProgress, [0.48, 0.65], [0, 360]);

  // Frame 3: "Get Full-Stack Agency Services" (0.74 -> 1.0)
  const frame3Opacity = useTransform(scrollYProgress, [0.73, 0.8], [0, 1]);
  const frame3Y = useTransform(scrollYProgress, [0.73, 0.82], [40, 0]);

  // Flash highlight on bright background for Frame 3
  const flashBrightness = useTransform(
    scrollYProgress,
    [0.72, 0.76, 0.86],
    [0, 0.85, 0.1]
  );

  return (
    <div
      ref={containerRef}
      className="relative h-[420vh] bg-[#131313] text-zinc-100 font-sans selection:bg-white selection:text-[#131313]"
    >
      {/* Sticky Fullscreen Wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* Background Radial Glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(255,255,255,0.02),transparent_100%)] z-1" />

        {/* Frame 3 Bright Flash Burst */}
        <motion.div
          style={{ opacity: flashBrightness }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/20 via-white/80 to-white/20 mix-blend-screen z-20 transform-gpu"
        />

        {/* VIDEO BACKGROUND (Motion light strobes) */}
        <motion.div
          style={{ opacity: videoOpacity }}
          className="absolute inset-0 z-0 pointer-events-none transform-gpu will-change-transform"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover brightness-95 contrast-105"
          >
            <source
              src="https://player.vimeo.com/progressive_redirect/playback/1020697798/rendition/720p/file.mp4?loc=external&log_user=0&signature=cd45f23683db91c40f08a3f4a31ba153f1e93eac3d4f98cb3ca4b651b8830d04"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#131313]/70 via-[#131313]/30 to-[#131313]/90" />
        </motion.div>

        {/* ================= STATIC BANNER / PHASE 1 ================= */}
        <motion.div
          style={{
            opacity: phase1Opacity,
            y: phase1Y,
            display: useTransform(scrollYProgress, (v) => (v >= 0.25 ? 'none' : 'flex')),
          }}
          className="relative z-10 w-full max-w-5xl px-6 flex-col items-center justify-center min-h-[75vh] transform-gpu will-change-transform"
        >
          <div className="text-center space-y-6 max-w-4xl">
            {/* Primary Heading: "You found us" (Masked Word Reveal, No borders/pills) */}
            <motion.h1
              variants={sentenceContainer}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tight text-white leading-[1.05] flex flex-wrap justify-center gap-x-[0.25em] select-none"
            >
              <SmoothWord word="You" />
              <SmoothWord word="found" />
              <SmoothWord word="us" />
            </motion.h1>

            {/* Subheading: "Together, we'll take it from here." */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
              className="text-xl sm:text-2xl md:text-4xl text-zinc-300 font-light tracking-tight leading-snug"
            >
              Together, we&apos;ll take it{' '}
              <span className="text-[#f5c563] font-normal">from here.</span>
            </motion.h2>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
              className="text-xs sm:text-sm md:text-base text-zinc-400 font-light tracking-wide max-w-md mx-auto"
            >
              Crafting high-end digital experiences, visual identity, and modern applications.
            </motion.p>
          </div>
        </motion.div>

        {/* ================= FRAME 1: YOU ARRIVED ================= */}
        <motion.div
          style={{
            opacity: frame1Opacity,
            scale: frame1Scale,
            display: useTransform(scrollYProgress, (v) => (v < 0.23 || v > 0.49 ? 'none' : 'flex')),
          }}
          className="absolute z-10 text-center px-6 max-w-4xl flex flex-col items-center justify-center space-y-3 transform-gpu will-change-transform"
        >
          <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#f5c563]">
            Phase 01
          </span>
          <h2 className="text-5xl sm:text-7xl md:text-9xl uppercase tracking-tighter text-white font-medium drop-shadow-2xl">
            You arrived
          </h2>
        </motion.div>

        {/* ================= FRAME 2: CLOCK & "ON THE DOT" ================= */}
        <motion.div
          style={{
            opacity: frame2Opacity,
            display: useTransform(scrollYProgress, (v) => (v < 0.47 || v > 0.74 ? 'none' : 'flex')),
          }}
          className="absolute z-10 text-center px-6 max-w-4xl flex flex-col items-center justify-center space-y-6 transform-gpu will-change-transform"
        >
          {/* Zooming Clock Graphic with Bigger Hand landing on Smaller Hand */}
          <motion.div
            style={{ scale: clockScale }}
            className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center shadow-2xl"
          >
            {/* Hour Marks */}
            <div className="absolute top-2 w-[1px] h-2 bg-white/40" />
            <div className="absolute bottom-2 w-[1px] h-2 bg-white/40" />
            <div className="absolute left-2 h-[1px] w-2 bg-white/40" />
            <div className="absolute right-2 h-[1px] w-2 bg-white/40" />

            {/* Small Hand (Fixed at 12 o'clock) */}
            <div className="absolute top-1/2 left-1/2 w-[2px] h-8 bg-zinc-300 -translate-x-1/2 -translate-y-full origin-bottom rounded-full" />

            {/* Bigger Hand (Rotates and lands directly on top of the smaller hand) */}
            <motion.div
              style={{ rotate: bigHandRotation }}
              className="absolute top-1/2 left-1/2 w-[2px] h-12 bg-[#f5c563] -translate-x-1/2 -translate-y-full origin-bottom rounded-full shadow-[0_0_10px_#f5c563]"
            />

            {/* Center Pin */}
            <div className="relative z-10 w-2.5 h-2.5 rounded-full bg-white ring-4 ring-black/40" />
          </motion.div>

          <h3 className="text-3xl sm:text-5xl md:text-6xl font-serif italic font-light text-white tracking-wide">
            &lsquo;On the dot&rsquo;
          </h3>
        </motion.div>

        {/* ================= FRAME 3: FULL-STACK AGENCY SERVICES ================= */}
        <motion.div
          style={{
            opacity: frame3Opacity,
            y: frame3Y,
            display: useTransform(scrollYProgress, (v) => (v < 0.72 ? 'none' : 'flex')),
          }}
          className="absolute z-10 text-center px-6 max-w-5xl flex-col items-center justify-center space-y-8 transform-gpu will-change-transform"
        >
          <div className="space-y-2">
            <span className="text-zinc-400 text-xs sm:text-sm font-mono uppercase tracking-[0.4em] block">
              Everything in sync
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-8xl uppercase tracking-tight text-white leading-none drop-shadow-2xl font-bold">
            Get Full-Stack <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f5c563] to-white">
              Agency Services
            </span>
          </h2>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="pt-4"
          >
            <button className="group flex items-center gap-4 rounded-xl border border-white/15 bg-[#1a1a1a] px-7 py-4 shadow-2xl transition-all duration-300 hover:border-white hover:bg-white hover:text-[#131313] focus:outline-none">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-200 transition-colors duration-300 group-hover:text-[#131313]">
                Get In Touch
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 group-hover:bg-[#131313] group-hover:text-white">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </button>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}