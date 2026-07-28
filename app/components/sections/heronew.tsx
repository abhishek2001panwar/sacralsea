'use client';

import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useRef } from 'react';

// High-end agency quintic ease curve
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Parent Container — Controls sequence timing and character stagger
const sentenceContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.025, // Delay between each letter
      delayChildren: 0.2,    // Initial wait before animation begins
    },
  },
};

// Child Character Variant — Smooth mask reveal with blur & scale
const letterVariant: Variants = {
  hidden: {
    y: '110%',
    opacity: 0,
    scale: 0.9,
    filter: 'blur(10px)',
  },
  visible: {
    y: '0%',
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: EASE,
    },
  },
};

interface SmoothWordProps {
  word: string;
  isYellow?: boolean;
}

// Word Wrapper Component — Uses overflow mask to clip letters cleanly
const SmoothWord: React.FC<SmoothWordProps> = ({ word, isYellow = false }) => {
  return (
    <span className="inline-block whitespace-nowrap overflow-hidden py-1">
      <span className="inline-flex">
        {word.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariant}
            className={`inline-block transform-gpu will-change-transform ${
              isYellow ? 'text-[#f5c563] font-normal' : ''
            }`}
          >
            {char}
          </motion.span>
        ))}
      </span>
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

  // STRICT SCROLL TIMING MAP (Prevents overlapping/ghosting)
  const phase1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const phase1Y = useTransform(scrollYProgress, [0, 0.3], [0, -40]);

  const videoOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  const phase2Opacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const phase2Y = useTransform(scrollYProgress, [0.5, 0.7], [40, 0]);

  return (
    <div ref={containerRef} className="relative h-[280vh] bg-[#131313] text-zinc-100 font-sans selection:bg-white selection:text-[#131313]">
      
      {/* Sticky Fullscreen Wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* Background Radial Glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(255,255,255,0.02),transparent_100%)] z-1" />

        {/* CINEMATIC GRID BACKGROUND LAYER */}
        {/* <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ffffff 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: '2rem 2rem',
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)',
          }}
        /> */}

        {/* VIDEO BACKGROUND */}
        <motion.div 
          style={{ opacity: videoOpacity }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover brightness-95 contrast-105"
          >
            <source src="https://player.vimeo.com/progressive_redirect/playback/1020697798/rendition/720p/file.mp4?loc=external&log_user=0&signature=cd45f23683db91c40f08a3f4a31ba153f1e93eac3d4f98cb3ca4b651b8830d04" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-b from-[#131313]/70 via-[#131313]/30 to-[#131313]/90" />
        </motion.div>

        {/* PHASE 1: STATIC INTRO */}
        <motion.div
          style={{ 
            opacity: phase1Opacity, 
            y: phase1Y,
            display: useTransform(scrollYProgress, (v) => (v >= 0.35 ? 'none' : 'flex'))
          }}
          className="relative z-10 w-full max-w-5xl px-6 flex-col items-center justify-between h-[75vh]"
        >
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-[#1a1a1a] shadow-xl"
          >
            <Sparkles className="h-3.5 w-3.5 text-zinc-400" />
            <span className="text-zinc-400 text-xs uppercase tracking-[0.25em] font-mono">
              You found us!
            </span>
          </motion.div>

          {/* ULTRA-SMOOTH MASKED LETTER ANIMATED HEADING */}
          <div className="text-center space-y-6 my-auto max-w-4xl">
            <motion.h1
              variants={sentenceContainer}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white leading-[1.08] flex flex-col items-center justify-center gap-y-1 sm:gap-y-2 select-none"
            >
              {/* First Line */}
              <div className="flex flex-wrap justify-center gap-x-[0.28em]">
                <SmoothWord word="Together," />
                <SmoothWord word="we'll" />
                <SmoothWord word="take" />
                <SmoothWord word="it" />
              </div>

              {/* Second Line */}
              <div className="flex flex-wrap justify-center gap-x-[0.28em]">
                <SmoothWord word="from" isYellow={true} />
                <SmoothWord word="here." isYellow={true} />
              </div>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8, ease: EASE }}
              className="text-xs sm:text-sm md:text-base text-zinc-400 font-light tracking-wide max-w-md mx-auto"
            >
              Crafting high-end digital experiences, visual identity, and modern applications.
            </motion.p>
          </div>

          {/* Scroll Prompt */}
          <div className="absolute -bottom-10 flex flex-col items-center space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-mono">
              Scroll Down
            </span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
          </div>
        </motion.div>

        {/* PHASE 2: VIDEO CONTENT */}
        <motion.div
          style={{ 
            opacity: phase2Opacity, 
            y: phase2Y,
            display: useTransform(scrollYProgress, (v) => (v < 0.35 ? 'none' : 'flex'))
          }}
          className="absolute z-10 text-center px-6 max-w-5xl flex-col items-center justify-center space-y-8"
        >
          {/* Subheading Badges */}
          <div className="space-y-2">
            <span className="text-zinc-400 text-xs sm:text-sm font-mono uppercase tracking-[0.4em] block">
              You arrived
            </span>
            <span className="text-white text-2xl sm:text-4xl font-serif italic font-light block">
              On the dot.
            </span>
          </div>

          {/* Hero Action Headline */}
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight text-white leading-none drop-shadow-2xl">
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