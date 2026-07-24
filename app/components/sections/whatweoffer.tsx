"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring, useInView } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  shape: "idea" | "wave" | "matrix" | "radar";
  href: string;
}

const services: ServiceItem[] = [
  {
    id: "01",
    title: "IDEA",
    subtitle: "Brand Direction & Vision",
    description:
      "We turn raw thoughts into meaningful brand directions, positioning your business at the intersection of cultural relevance and commercial impact.",
    tags: ["Strategy", "Positioning", "Brand Architecture"],
    shape: "idea",
    href: "/services/brand-direction",
  },
  {
    id: "02",
    title: "CONTENT",
    subtitle: "Narrative & Production",
    description:
      "We create stories and content frameworks that make brands impossible to ignore, driving organic reach and deep audience resonance.",
    tags: ["Storytelling", "Film & Motion", "Copywriting"],
    shape: "wave",
    href: "/services/narrative-production",
  },
  {
    id: "03",
    title: "DESIGN",
    subtitle: "Identity & Digital Experience",
    description:
      "We shape cohesive visual identities and digital interfaces that give brands a distinctive point of view across every physical and digital touchpoint.",
    tags: ["Visual Identity", "UI/UX Design", "Design Systems"],
    shape: "matrix",
    href: "/services/digital-experience",
  },
  {
    id: "04",
    title: "PERFORMANCE",
    subtitle: "Growth & Analytics",
    description:
      "We combine high-end creative execution with data rigor to build scalable campaigns that deliver measurable business outcomes.",
    tags: ["Conversion", "Paid Media", "Growth Optimization"],
    shape: "radar",
    href: "/services/growth-analytics",
  },
];

// Ultra-smooth, fluid easing curve
const ULTRA_SMOOTH_EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

/* ============================================================================
   WORD-BY-WORD SCROLL REVEAL COMPONENT FOR HEADERS & PARAGRAPHS
   ============================================================================ */

interface WordByWordRevealProps {
  text: string;
  isInView: boolean;
  className?: string;
  wordClassName?: string;
  delayOffset?: number;
  wordStagger?: number;
  highlightWord?: string;
  highlightClassName?: string;
}

const WordByWordReveal: React.FC<WordByWordRevealProps> = ({
  text,
  isInView,
  className = "",
  wordClassName = "",
  delayOffset = 0,
  wordStagger = 0.04,
  highlightWord,
  highlightClassName = "",
}) => {
  const words = text.split(" ");

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.25em] gap-y-[0.1em] ${className}`}>
      {words.map((word, index) => {
        const isHighlighted =
          highlightWord && word.toLowerCase().includes(highlightWord.toLowerCase());

        return (
          <span key={index} className="inline-block overflow-hidden py-1">
            <motion.span
              initial={{ opacity: 0, y: "100%", filter: "blur(8px)" }}
              animate={
                isInView
                  ? { opacity: 1, y: "0%", filter: "blur(0px)" }
                  : { opacity: 0, y: "100%", filter: "blur(8px)" }
              }
              transition={{
                duration: 0.8,
                ease: ULTRA_SMOOTH_EASE,
                delay: delayOffset + index * wordStagger,
              }}
              className={`inline-block transform-gpu will-change-transform ${wordClassName} ${
                isHighlighted ? highlightClassName : ""
              }`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
};

/* ============================================================================
   SLOW & SMOOTH LETTER-BY-LETTER REVEAL COMPONENT (HOVER/ACTIVE CARDS)
   ============================================================================ */

interface KineticLetterProps {
  text: string;
  isActive: boolean;
  className?: string;
  delayOffset?: number;
  letterStagger?: number;
  duration?: number;
}

const LetterByLetterReveal: React.FC<KineticLetterProps> = ({
  text,
  isActive,
  className = "",
  delayOffset = 0,
  letterStagger = 0.015,
  duration = 0.85,
}) => {
  const words = text.split(" ");

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}>
      {words.map((word, wordIdx) => {
        const wordOffset = words
          .slice(0, wordIdx)
          .reduce((acc, curr) => acc + curr.length, 0);

        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap">
            {word.split("").map((char, charIdx) => {
              const totalIndex = wordOffset + charIdx;

              return (
                <motion.span
                  key={charIdx}
                  initial={{
                    opacity: 0.5,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  animate={
                    isActive
                      ? {
                          opacity: [0, 0.6, 1],
                          y: [12, -2, 0],
                          scale: [0.85, 1.05, 1],
                          filter: ["blur(5px)", "blur(1px)", "blur(0px)"],
                        }
                      : {
                          opacity: 0.5,
                          y: 0,
                          scale: 1,
                          filter: "blur(0px)",
                        }
                  }
                  transition={{
                    duration: duration,
                    ease: ULTRA_SMOOTH_EASE,
                    delay: delayOffset + totalIndex * letterStagger,
                  }}
                  className="inline-block transform-gpu will-change-transform"
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

/* ============================================================================
   GRAPHICS COMPONENTS WITH ENHANCED GLOWS
   ============================================================================ */

const IdeaGraphic = ({ isActive }: { isActive: boolean }) => (
  <div className="relative flex h-64 w-64 items-center justify-center">
    <motion.div
      animate={{
        scale: isActive ? [1, 1.3, 1] : [1, 1.1, 1],
        rotate: [0, 180, 360],
        borderRadius: isActive
          ? ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 50% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%"]
          : "50%",
      }}
      transition={{ duration: isActive ? 8 : 16, repeat: Infinity, ease: "easeInOut" }}
      className="absolute h-40 w-40 bg-gradient-to-tr from-[#c5a880]/40 via-[#c5a880]/15 to-transparent blur-2xl"
    />

    <motion.div
      animate={{
        scale: isActive ? 1.25 : 0.9,
        opacity: isActive ? 0.9 : 0.3,
      }}
      transition={{ duration: 1.2, ease: ULTRA_SMOOTH_EASE }}
      className="absolute h-44 w-44 rounded-full border border-[#c5a880]/40 bg-[#c5a880]/[0.03] backdrop-blur-sm"
    />

    {[0, 72, 144, 216, 288].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const startX = Math.cos(rad) * 65;
      const startY = Math.sin(rad) * 65;

      return (
        <motion.div
          key={i}
          animate={{
            x: isActive ? [startX, 0, startX] : startX,
            y: isActive ? [startY, 0, startY] : startY,
            opacity: isActive ? [0.3, 1, 0.3] : 0.4,
            scale: isActive ? [1, 1.8, 1] : 1,
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
          className="absolute h-1.5 w-1.5 rounded-full bg-[#c5a880] shadow-[0_0_12px_#c5a880]"
        />
      );
    })}

    <motion.div
      animate={{
        scale: isActive ? [1, 1.3, 1] : 1,
        boxShadow: isActive
          ? "0 0 40px 10px rgba(197, 168, 128, 0.7)"
          : "0 0 15px 2px rgba(197, 168, 128, 0.3)",
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="relative h-6 w-6 rounded-full border border-[#fbfaf7]/80 bg-[#c5a880]"
    />
  </div>
);

const WaveGraphic = ({ isActive }: { isActive: boolean }) => (
  <div className="relative flex h-64 w-80 items-center justify-center overflow-hidden">
    {[...Array(9)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          scaleY: isActive ? [0.3, 1.3, 0.3] : 0.4,
          opacity: isActive ? 0.9 : 0.25,
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.15,
        }}
        className="mx-1.5 h-36 w-1.5 rounded-full bg-gradient-to-b from-[#c5a880]/20 via-[#c5a880] to-[#c5a880]/20 shadow-[0_0_10px_rgba(197,168,128,0.2)]"
      />
    ))}
  </div>
);

const MatrixGraphic = ({ isActive }: { isActive: boolean }) => (
  <div className="relative flex h-64 w-64 items-center justify-center">
    <motion.div
      animate={{
        rotate: isActive ? 135 : 45,
        scale: isActive ? 1.15 : 1,
      }}
      transition={{ duration: 1.4, ease: ULTRA_SMOOTH_EASE }}
      className="relative h-40 w-40 border border-[#c5a880]/50 bg-[#c5a880]/10 backdrop-blur-md shadow-[0_0_30px_rgba(197,168,128,0.1)]"
    >
      <motion.div
        animate={{ rotate: isActive ? -180 : 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute inset-4 border border-[#c5a880]/30"
      />
      <div className="absolute inset-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 bg-[#c5a880] shadow-[0_0_20px_#c5a880]" />
    </motion.div>
  </div>
);

const RadarGraphic = ({ isActive }: { isActive: boolean }) => (
  <div className="relative flex h-64 w-64 items-center justify-center">
    {[1, 2, 3].map((ring) => (
      <div
        key={ring}
        className="absolute rounded-full border border-[#c5a880]/30"
        style={{
          width: `${ring * 33}%`,
          height: `${ring * 33}%`,
        }}
      />
    ))}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className={`absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(197,168,128,0.35)_360deg)] transition-opacity duration-700 ${
        isActive ? "opacity-100" : "opacity-30"
      }`}
    />
    <div className="h-3.5 w-3.5 rounded-full bg-[#c5a880] shadow-[0_0_25px_#c5a880]" />
  </div>
);

/* ============================================================================
   MAIN COMPONENT
   ============================================================================ */

export default function WhatWeOffer() {
  const [active, setActive] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Header Frame Scroll Detection Ref
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 40 };
  const mouseX = useSpring(rawX, springConfig);
  const mouseY = useSpring(rawY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden bg-[#0a0a09] font-sans text-[#fbfaf7] py-24 selection:bg-[#c5a880] selection:text-[#0a0a09]"
    >
      {/* Background Motion Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Global Dynamic Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(197, 168, 128, 0.06), transparent 80%)`,
        }}
      />

      {/* SECTION HEADER WITH SCROLL IN-VIEW WORD-BY-WORD REVEAL */}
      <div ref={headerRef} className="mx-auto max-w-[1600px] px-6 pb-16 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={isHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: ULTRA_SMOOTH_EASE }}
              className="mb-4 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-[#c5a880]" />
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#c5a880]">
                Capabilities & Practice
              </span>
            </motion.div>

            {/* Word-By-Word Reveal Heading */}
            <h2 className="text-4xl font-extralight tracking-tight sm:text-6xl lg:text-7xl">
              <WordByWordReveal
                text="What We Offer"
                isInView={isHeaderInView}
                delayOffset={0.1}
                wordStagger={0.08}
                highlightWord="Offer"
                highlightClassName="font-serif italic text-[#c5a880]"
              />
            </h2>
          </div>

          {/* Word-By-Word Reveal Side Paragraph */}
          <p className="max-w-md text-sm font-light leading-relaxed text-[#a1a09d] sm:text-base">
            <WordByWordReveal
              text="Engineered brand experiences designed to elevate market presence through strategy, motion design, and scalable technology."
              isInView={isHeaderInView}
              delayOffset={0.35}
              wordStagger={0.03}
            />
          </p>
        </div>
      </div>

      {/* CARDS GRID */}
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 px-6 md:grid-cols-2 lg:px-12">
        {services.map((service, index) => {
          const isActive = active === index;

          return (
            <Link
              key={service.id}
              href={service.href}
              className="block outline-none"
              onMouseEnter={() => setActive(index)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.5, ease: ULTRA_SMOOTH_EASE }}
                className={`
                  group relative min-h-[580px] overflow-hidden rounded-2xl border transition-all duration-700 lg:min-h-[640px]
                  ${
                    isActive
                      ? "border-[#c5a880]/50 bg-[#121210] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(197,168,128,0.15)] ring-1 ring-[#c5a880]/30"
                      : "border-[#ffffff]/10 bg-[#0e0e0d] hover:border-[#c5a880]/30"
                  }
                `}
              >
                {/* Tech Frame Corner Accents */}
                <div className="pointer-events-none absolute top-4 left-4 h-2 w-2 border-t border-l border-[#c5a880]/40 transition-all duration-500 group-hover:border-[#c5a880]" />
                <div className="pointer-events-none absolute top-4 right-4 h-2 w-2 border-t border-r border-[#c5a880]/40 transition-all duration-500 group-hover:border-[#c5a880]" />
                <div className="pointer-events-none absolute bottom-4 left-4 h-2 w-2 border-b border-l border-[#c5a880]/40 transition-all duration-500 group-hover:border-[#c5a880]" />
                <div className="pointer-events-none absolute bottom-4 right-4 h-2 w-2 border-b border-r border-[#c5a880]/40 transition-all duration-500 group-hover:border-[#c5a880]" />

                {/* Inner Ambient Glow */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.12)_0%,transparent_70%)] transition-opacity duration-700 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Backdrop Graphic */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40 transition-opacity duration-700 group-hover:opacity-100">
                  {service.shape === "idea" && <IdeaGraphic isActive={isActive} />}
                  {service.shape === "wave" && <WaveGraphic isActive={isActive} />}
                  {service.shape === "matrix" && <MatrixGraphic isActive={isActive} />}
                  {service.shape === "radar" && <RadarGraphic isActive={isActive} />}
                </div>

                {/* Card Top Header */}
                <div className="relative z-20 flex items-center justify-between p-8 sm:p-10">
                  <span className="font-mono text-xs tracking-[0.3em] text-[#c5a880]">
                    {service.id}
                  </span>

                  {/* SUBHEADING Letter-by-Letter Animation */}
                  <div className="flex items-center gap-2 rounded-full border border-[#c5a880]/20 bg-[#0a0a09]/60 px-3.5 py-1 backdrop-blur-md">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a1a09d]">
                      <LetterByLetterReveal
                        text={service.subtitle}
                        isActive={isActive}
                        delayOffset={0.02}
                        letterStagger={0.02}
                        duration={0.7}
                      />
                    </span>
                  </div>
                </div>

                {/* Card Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-8 sm:p-10 lg:p-12">
                  <div className="flex items-center justify-between">
                    {/* HEADING Letter-by-Letter Animation */}
                    <h3 className="text-4xl font-light tracking-tight text-[#fbfaf7] sm:text-6xl lg:text-6xl">
                      <LetterByLetterReveal
                        text={service.title}
                        isActive={isActive}
                        delayOffset={0}
                        letterStagger={0.04}
                        duration={0.8}
                      />
                    </h3>

                    {/* Arrow Button */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#c5a880]/30 bg-[#0a0a09]/80 text-[#c5a880] transition-all duration-500 group-hover:border-[#c5a880] group-hover:bg-[#c5a880] group-hover:text-[#0a0a09]">
                      <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Accordion Expand Details */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: ULTRA_SMOOTH_EASE }}
                        className="overflow-hidden"
                      >
                        {/* PARAGRAPH Letter-by-Letter Animation */}
                        <div className="pt-4 max-w-md text-sm leading-relaxed text-[#a1a09d] sm:text-base">
                          <LetterByLetterReveal
                            text={service.description}
                            isActive={isActive}
                            delayOffset={0.12}
                            letterStagger={0.006}
                            duration={0.9}
                          />
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-[#c5a880]/30 bg-[#c5a880]/10 px-3.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[#c5a880]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Line Accent */}
                <motion.div
                  initial={false}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: ULTRA_SMOOTH_EASE }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#c5a880] via-[#fbfaf7] to-[#c5a880]"
                />
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* FOOTER CTA */}
      <div className="mx-auto flex max-w-[1600px] justify-between items-center px-6 pt-16 lg:px-12">
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#a1a09d]/60 uppercase tracking-widest">
          <Sparkles className="h-3.5 w-3.5 text-[#c5a880]" />
          <span>Interactive Service Suite</span>
        </div>

        <Link href="/services">
          <button
            type="button"
            className="group flex items-center gap-4 rounded-full border border-[#c5a880]/30 bg-[#121210] px-7 py-4 transition-all duration-500 hover:border-[#c5a880] hover:bg-[#c5a880] focus:outline-none focus:ring-2 focus:ring-[#c5a880]"
          >
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c5a880] transition-colors duration-500 group-hover:text-[#0a0a09]">
              Explore All Practice Areas
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c5a880]/20 text-[#c5a880] transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-[#0a0a09] group-hover:text-[#c5a880]">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </button>
        </Link>
      </div>
    </section>
  );
}