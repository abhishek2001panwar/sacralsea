'use client';

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface AnimatedTextProps {
  text: string;
  className?: string;
  yellowWords?: string[];
  delayOffset?: number;
  letterStagger?: number;
}

const AnimatedLetterText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  yellowWords = [],
  delayOffset = 0.2,
  letterStagger = 0.025,
}) => {
  const words = text.split(' ');

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}>
      {words.map((word, wordIdx) => {
        const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
        const isYellow = yellowWords.includes(cleanWord);

        // Calculate global letter offset across words for continuous staggering
        const wordOffset = words
          .slice(0, wordIdx)
          .reduce((acc, curr) => acc + curr.length, 0);

        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap">
            {word.split('').map((char, charIdx) => {
              const totalIndex = wordOffset + charIdx;

              return (
                <motion.span
                  key={charIdx}
                  initial={{
                    opacity: 0,
                    y: 20,
                    filter: 'blur(8px)',
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                  }}
                  transition={{
                    duration: 0.8,
                    ease: EASE,
                    delay: delayOffset + totalIndex * letterStagger,
                  }}
                  className={`inline-block transform-gpu will-change-transform ${
                    isYellow ? 'text-[#f5c563] font-normal' : ''
                  }`}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
};

export const HeroSection: React.FC = () => {
  return (
    <section className="relative h-[60vh] md:h-[90vh] w-full bg-[#131313] text-zinc-100 flex flex-col p-6 sm:p-8 lg:p-12 overflow-hidden selection:bg-white selection:text-[#131313]">
      
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(255,255,255,0.02),transparent_100%)]" />

      {/* Grid Pattern Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:2rem_2rem]" />

      {/* --- TOP HEADER NAVIGATION --- */}
      <header className="relative z-10 flex items-center space-x-2 sm:space-x-3 text-[10px] sm:text-xs tracking-[0.25em] text-zinc-400 uppercase font-mono pt-1 shrink-0">
        <Sparkles className="h-3.5 w-3.5 text-zinc-400" />
        <span>Creative Agency</span>
        <span className="text-zinc-600">•</span>
        <span>Est. 2019</span>
        <span className="text-zinc-600">•</span>
        <span>Global</span>
      </header>

      {/* --- MAIN HERO TYPOGRAPHY --- */}
      <main className="relative z-10 flex-grow flex items-center w-full max-w-7xl my-auto min-h-0 py-4 sm:py-6">
        <h1 
          className="font-light leading-[1.08] tracking-tight text-white select-none max-w-5xl"
          style={{
            fontSize: 'clamp(2.25rem, 8.5vw, 6.5rem)'
          }}
        >
          {/* First Line */}
          <div className="flex items-center gap-2">
            <AnimatedLetterText 
              text="Brands that" 
              delayOffset={0.1} 
              letterStagger={0.03} 
            />
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
              className="inline-block w-[6px] h-[6px] sm:w-2 sm:h-2 bg-white rounded-full align-middle ml-1"
            />
          </div>

          {/* Second Line */}
          <div>
            <AnimatedLetterText 
              text="move culture," 
              yellowWords={["move"]} 
              delayOffset={0.45} 
              letterStagger={0.03} 
            />
          </div>

          {/* Third Line */}
          <div>
            <AnimatedLetterText 
              text="win markets." 
              delayOffset={0.8} 
              letterStagger={0.03} 
            />
          </div>
        </h1>
      </main>

      {/* --- FOOTER / BOTTOM CONTROLS --- */}
      <footer className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8 pb-1 sm:pb-2 mt-auto shrink-0 w-full">
        
        {/* Left Subtext Description */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
          className="max-w-xs sm:max-w-sm md:max-w-md text-[11px] sm:text-xs md:text-sm text-zinc-400 leading-relaxed font-light"
        >
          We build brands, campaigns, and digital experiences 
          for companies that refuse to be ordinary - from 
          seed-stage startups to global enterprises.
        </motion.div>

        {/* Right Actionable Elements */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.35, ease: EASE }}
          className="flex items-center space-x-4 sm:space-x-6 shrink-0 self-start md:self-end"
        >
          
          {/* Main Work CTA Button */}
          <button className="group flex items-center gap-3 rounded-xl border border-white/15 bg-[#1a1a1a] px-5 sm:px-6 py-2.5 sm:py-3.5 text-xs font-mono uppercase tracking-[0.2em] text-zinc-200 transition-all duration-300 hover:border-white hover:bg-white hover:text-[#131313] active:scale-95 whitespace-nowrap shadow-2xl">
            <span>See our work</span>
            <ArrowRight className="h-3.5 w-3.5 text-zinc-400 transition-colors group-hover:text-[#131313] transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>

          {/* Secondary Link */}
          <button className="text-zinc-300 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] border-b border-white/20 pb-1 hover:border-white hover:text-white transition-colors duration-300 whitespace-nowrap">
            Start a project
          </button>
          
          {/* Vertical Scroll Indicator */}
          <div className="hidden lg:flex flex-col items-center pl-4 border-l border-white/10">
            <span className="text-[9px] uppercase tracking-[0.4em] text-zinc-500 [writing-mode:vertical-lr] select-none font-mono">
              Scroll
            </span>
          </div>

        </motion.div>
      </footer>
    </section>
  );
};

export default HeroSection;