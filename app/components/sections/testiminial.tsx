"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionValue,
  useSpring,
  useInView,
  Variants,
} from "framer-motion";
import { Quote, Sparkles, Star, CheckCircle2, Activity, Cpu } from "lucide-react";

/* ============================================================================
   TYPES & DATA
   ============================================================================ */

interface Testimonial {
  id: string;
  number: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  highlight: string;
  badgeType: "rating" | "growth" | "radar" | "ai";
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    number: "01",
    quote:
      "Their strategic vision completely transformed our brand position. The ROI was evident within weeks, and our organic search velocity tripled.",
    author: "Elena Rostova",
    role: "VP of Brand Strategy",
    company: "Vanguard Tech",
    highlight: "+300% Organic Velocity",
    badgeType: "rating",
  },
  {
    id: "2",
    number: "02",
    quote:
      "The precision in their execution is unparalleled. They didn't just deliver content; they built a scalable narrative framework for our entire pipeline.",
    author: "Marcus Vance",
    role: "Chief Marketing Officer",
    company: "Aether Dynamics",
    highlight: "4.2x Pipeline Growth",
    badgeType: "growth",
  },
  {
    id: "3",
    number: "03",
    quote:
      "Moving to an AI-optimized engine felt daunting until they stepped in. The depth of data rigor and design craftsmanship is truly world-class.",
    author: "Sophia Chen",
    role: "Head of Growth",
    company: "Nexus AI",
    highlight: "500+ AI Engines Sourced",
    badgeType: "ai",
  },
  {
    id: "4",
    number: "04",
    quote:
      "Their team operates like a high-performance lab. Every video hook rate and ad iteration delivered measurable business outcomes.",
    author: "David Sterling",
    role: "Founder & CEO",
    company: "Lumina Labs",
    highlight: "43% Hook Rate Achieved",
    badgeType: "radar",
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ============================================================================
   WORD-BY-WORD KINETIC REVEAL COMPONENT
   ============================================================================ */

function WordByWordText({
  text,
  className = "",
  wordDelay = 0.03,
  startDelay = 0,
  isCurrent = true,
}: {
  text: string;
  className?: string;
  wordDelay?: number;
  startDelay?: number;
  isCurrent?: boolean;
}) {
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: wordDelay,
        delayChildren: startDelay,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, x: -16, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: EASE,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate={isCurrent ? "visible" : "hidden"}
      className={`inline-flex flex-wrap gap-x-[0.28em] gap-y-[0.1em] ${className}`}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={wordVariants} className="inline-block transform-gpu">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ============================================================================
   CARD-SPECIFIC ANIMATED BADGES
   ============================================================================ */

const CardBadge = ({ type, isCurrent }: { type: Testimonial["badgeType"]; isCurrent: boolean }) => {
  if (type === "rating") {
    return (
      <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#222222] px-3 py-1 sm:px-3.5 sm:py-1.5 backdrop-blur-md transition-all duration-300">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: isCurrent ? [1, 1.25, 1] : 1,
              opacity: isCurrent ? 1 : 0.6,
            }}
            transition={{
              duration: 1.2,
              repeat: isCurrent ? Infinity : 0,
              delay: i * 0.15,
            }}
          >
            <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-white text-white" />
          </motion.div>
        ))}
        <span className="ml-1 font-mono text-[10px] sm:text-[11px] text-zinc-300">5.0 Verified</span>
      </div>
    );
  }

  if (type === "growth") {
    return (
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#222222] px-3 py-1 sm:px-3.5 sm:py-1.5 backdrop-blur-md transition-all duration-300">
        <Activity className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
        <div className="flex h-3.5 items-end gap-1">
          {[0.4, 0.7, 0.5, 1].map((h, i) => (
            <motion.div
              key={i}
              animate={{
                scaleY: isCurrent ? [h, h * 1.3, h] : h,
              }}
              transition={{
                duration: 0.8,
                repeat: isCurrent ? Infinity : 0,
                delay: i * 0.12,
              }}
              className="h-full w-1 origin-bottom rounded-full bg-white"
            />
          ))}
        </div>
        <span className="font-mono text-[10px] sm:text-[11px] text-zinc-300">Scale Spike</span>
      </div>
    );
  }

  if (type === "ai") {
    return (
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#222222] px-3 py-1 sm:px-3.5 sm:py-1.5 backdrop-blur-md transition-all duration-300">
        <Cpu className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
        <motion.div
          animate={{
            rotate: isCurrent ? 360 : 0,
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="h-2 w-2 rounded-sm border border-white bg-white/40"
        />
        <span className="font-mono text-[10px] sm:text-[11px] text-zinc-300">AI Neural Sync</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#222222] px-3 py-1 sm:px-3.5 sm:py-1.5 backdrop-blur-md transition-all duration-300">
      <div className="relative flex h-2.5 w-2.5 items-center justify-center">
        <motion.div
          animate={{
            scale: isCurrent ? [1, 2.2] : 1,
            opacity: isCurrent ? [0.8, 0] : 0,
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-white"
        />
        <div className="h-1.5 w-1.5 rounded-full bg-white" />
      </div>
      <span className="font-mono text-[10px] sm:text-[11px] text-zinc-300">Live Hook Metric</span>
    </div>
  );
};

/* ============================================================================
   RESPONSIVE 3D TILT HOVER TESTIMONIAL CARD
   ============================================================================ */

function InteractiveCard({
  item,
  isCurrent,
  isPast,
}: {
  item: Testimonial;
  isCurrent: boolean;
  isPast: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isCurrent) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      animate={{
        scale: isCurrent ? 1 : isPast ? 0.85 : 0.9,
        rotateY: isCurrent ? 0 : isPast ? 18 : -18,
        rotateZ: isCurrent ? 0 : isPast ? -3 : 3,
        z: isCurrent ? 0 : -150,
        opacity: isCurrent ? 1 : 0.3,
      }}
      transition={{ duration: 0.9, ease: EASE }}
      className="perspective-1000 w-full max-w-xl lg:max-w-2xl transform-gpu"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isCurrent ? rotateX : 0,
          rotateY: isCurrent ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className={`
          group relative w-full overflow-hidden rounded-2xl p-6 sm:p-10 lg:p-14
          bg-[#1a1a1a] shadow-2xl transition-all duration-500 transform-gpu
          ${isCurrent ? "border border-white/20 bg-[#202020] shadow-[0_4px_30px_rgba(0,0,0,0.6)]" : "border border-white/5 hover:border-white/10"}
        `}
      >
        {/* Dynamic Light Overlay on Hover */}
        <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(600px_circle_at_center,rgba(255,255,255,0.04),transparent_80%)]" />

        {/* Top Bar: Quote Icon & Badge */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-6 sm:pb-8">
          <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-zinc-500 transition-colors duration-300 group-hover:text-white" />
          <CardBadge type={item.badgeType} isCurrent={isCurrent} />
        </div>

        {/* Quote Content */}
        <blockquote className="relative z-10 text-lg sm:text-2xl lg:text-3xl font-light leading-relaxed text-zinc-100">
          <WordByWordText
            text={`"${item.quote}"`}
            wordDelay={0.025}
            startDelay={0.1}
            isCurrent={isCurrent}
          />
        </blockquote>

        {/* Author & Highlight Footer */}
        <div className="relative z-10 mt-6 sm:mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 pt-6 sm:pt-8 transition-colors duration-500">
          <div>
            <div className="flex items-center gap-2 text-base sm:text-lg font-medium text-white">
              <span>{item.author}</span>
              <CheckCircle2 className="h-4 w-4 text-zinc-400" />
            </div>
            <div className="text-xs sm:text-sm font-light text-zinc-400">
              {item.role},{" "}
              <span className="text-zinc-200">
                {item.company}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-zinc-500">
              Result
            </span>
            <span className="font-mono text-xs sm:text-sm font-medium text-white transition-transform duration-300 group-hover:scale-105">
              {item.highlight}
            </span>
          </div>
        </div>

        {/* Active Accent Line Bottom */}
        {isCurrent && (
          <motion.div
            layoutId="activeGlow"
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        )}
      </motion.div>
    </motion.div>
  );
}

/* ============================================================================
   MAIN TESTIMONIALS COMPONENT WITH INVIEW HEADING ANIMATION
   ============================================================================ */

export default function Testimonial() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const [activeIndex, setActiveIndex] = useState(0);

  // Vertical scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map vertical scroll progress to horizontal translation
  const xTransform = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(testimonials.length - 1) * 25}%`]
  );

  // Track active item
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const step = 1 / testimonials.length;
    const current = Math.min(
      Math.floor(latest / step),
      testimonials.length - 1
    );
    if (current !== activeIndex) {
      setActiveIndex(current);
    }
  });

  // Header Animation Variants
  const headerContainerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const headerItemVariants: Variants = {
    hidden: {
      y: "110%",
      opacity: 0,
      filter: "blur(10px)",
    },
    visible: {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.85,
        ease: EASE,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[400vh] bg-[#131313] font-sans text-zinc-100 selection:bg-white selection:text-[#131313]"
    >
      {/* Sticky Viewport Area */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-4 sm:px-6 lg:px-12">
        
      
        {/* TOP HEADER BAR */}
        <div ref={headerRef} className="relative z-20 mx-auto w-full max-w-7xl pt-12 sm:pt-16 lg:pt-20">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex items-center gap-2.5"
            >
              <Sparkles className="h-4 w-4 text-zinc-400" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
                Testimonials & Impact
              </span>
            </motion.div>

            {/* Kinetic Active Index Counter */}
            <div className="flex items-center gap-2 font-mono text-xs sm:text-sm tracking-widest text-zinc-400">
              <span className="text-white">
                {testimonials[activeIndex].number}
              </span>
              <span>/</span>
              <span>0{testimonials.length}</span>
            </div>
          </div>

          {/* Heading with Ultra-Smooth Masked InView Animation */}
          <motion.div
            variants={headerContainerVariants}
            initial="hidden"
            animate={isHeaderInView ? "visible" : "hidden"}
            className="mt-3 sm:mt-4 space-y-2 sm:space-y-3"
          >
            <h2 className="text-3xl font-normal tracking-tight text-white sm:text-5xl lg:text-6xl flex flex-wrap gap-x-[0.3em] overflow-hidden py-1">
              <motion.span variants={headerItemVariants} className="inline-block transform-gpu">
                Client
              </motion.span>
              <motion.span
                variants={headerItemVariants}
                className="inline-block text-[#f5c563] font-serif italic transform-gpu"
              >
                Perspectives
              </motion.span>
            </h2>

            <div className="overflow-hidden py-1">
              <motion.p
                variants={headerItemVariants}
                className="max-w-xl text-xs sm:text-base font-light leading-relaxed text-zinc-400 transform-gpu"
              >
                Direct insights from market leaders and enterprise founders scaling with our full-stack digital engine.
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* CENTER CARDS CONTAINER */}
        <div className="relative z-10 my-auto w-full py-4 sm:py-6 [perspective:1200px]">
          <motion.div
            style={{ x: xTransform }}
            className="flex w-[400%] items-center transform-gpu will-change-transform"
          >
            {testimonials.map((item, index) => {
              const isCurrent = index === activeIndex;
              const isPast = index < activeIndex;

              return (
                <div
                  key={item.id}
                  className="flex w-full justify-center px-2 sm:px-6 lg:px-12"
                >
                  <InteractiveCard
                    item={item}
                    isCurrent={isCurrent}
                    isPast={isPast}
                  />
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* BOTTOM NAVIGATION */}
        <div className="relative z-20 mx-auto w-full max-w-7xl pb-6 sm:pb-10 lg:pb-14">
          <div className="flex items-center justify-between border-t border-white/10 pt-4 sm:pt-6">
            
            {/* Step Progress Indicators */}
            <div className="flex items-center gap-4 sm:gap-6">
              {testimonials.map((t, idx) => (
                <div key={t.id} className="group cursor-pointer flex flex-col items-start gap-1.5">
                  <span
                    className={`font-mono text-[10px] sm:text-xs tracking-widest transition-colors duration-300 ${
                      idx === activeIndex
                        ? "text-white"
                        : "text-zinc-600 group-hover:text-zinc-400"
                    }`}
                  >
                    {t.number}
                  </span>
                  <div className="h-1 w-8 sm:w-12 overflow-hidden rounded-full bg-white/10 transition-all duration-300 group-hover:bg-white/20">
                    <motion.div
                      animate={{
                        width: idx === activeIndex ? "100%" : "0%",
                        backgroundColor: "#ffffff",
                      }}
                      transition={{ duration: 0.4 }}
                      className="h-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Navigation Helper */}
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-500">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              <span>Scroll down to navigate spatial sequence</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}