"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionValue,
  useSpring,
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

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

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
        <motion.span key={index} variants={wordVariants} className="inline-block">
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
      <div className="flex items-center gap-1.5 rounded-full border border-[#c5a880]/30 bg-[#c5a880]/10 px-3.5 py-1.5 backdrop-blur-md transition-all duration-300 group-hover:border-[#c5a880]/60 group-hover:bg-[#c5a880]/20">
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
            <Star className="h-3.5 w-3.5 fill-[#c5a880] text-[#c5a880]" />
          </motion.div>
        ))}
        <span className="ml-1 font-mono text-[11px] text-[#c5a880]">5.0 Verified</span>
      </div>
    );
  }

  if (type === "growth") {
    return (
      <div className="flex items-center gap-2 rounded-full border border-[#c5a880]/30 bg-[#c5a880]/10 px-3.5 py-1.5 backdrop-blur-md transition-all duration-300 group-hover:border-[#c5a880]/60 group-hover:bg-[#c5a880]/20">
        <Activity className="h-3.5 w-3.5 text-[#c5a880]" />
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
              className="h-full w-1 origin-bottom rounded-full bg-[#c5a880]"
            />
          ))}
        </div>
        <span className="font-mono text-[11px] text-[#c5a880]">Scale Spike</span>
      </div>
    );
  }

  if (type === "ai") {
    return (
      <div className="flex items-center gap-2 rounded-full border border-[#c5a880]/30 bg-[#c5a880]/10 px-3.5 py-1.5 backdrop-blur-md transition-all duration-300 group-hover:border-[#c5a880]/60 group-hover:bg-[#c5a880]/20">
        <Cpu className="h-3.5 w-3.5 text-[#c5a880]" />
        <motion.div
          animate={{
            rotate: isCurrent ? 360 : 0,
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="h-2 w-2 rounded-sm border border-[#c5a880] bg-[#c5a880]/40"
        />
        <span className="font-mono text-[11px] text-[#c5a880]">AI Neural Sync</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-full border border-[#c5a880]/30 bg-[#c5a880]/10 px-3.5 py-1.5 backdrop-blur-md transition-all duration-300 group-hover:border-[#c5a880]/60 group-hover:bg-[#c5a880]/20">
      <div className="relative flex h-2.5 w-2.5 items-center justify-center">
        <motion.div
          animate={{
            scale: isCurrent ? [1, 2.2] : 1,
            opacity: isCurrent ? [0.8, 0] : 0,
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-[#c5a880]"
        />
        <div className="h-1.5 w-1.5 rounded-full bg-[#c5a880]" />
      </div>
      <span className="font-mono text-[11px] text-[#c5a880]">Live Hook Metric</span>
    </div>
  );
};

/* ============================================================================
   3D TILT HOVER TESTIMONIAL CARD
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
      className="perspective-1000 w-full max-w-2xl"
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
          group relative w-full overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-14
          border border-[#c5a880]/20 bg-[#121210]/95 backdrop-blur-xl
          shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500
          hover:border-[#c5a880]/80 hover:shadow-[0_0_50px_rgba(197,168,128,0.2)]
          ${isCurrent ? "border-[#c5a880]/60 shadow-[0_0_40px_rgba(197,168,128,0.15)]" : ""}
        `}
      >
        {/* Dynamic Light Overlay on Hover */}
        <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(600px_circle_at_center,rgba(197,168,128,0.12),transparent_80%)]" />

        {/* Top Bar: Quote Icon & Card-Specific Badge */}
        <div className="relative z-10 flex items-center justify-between pb-8">
          <Quote className="h-8 w-8 text-[#c5a880]/40 transition-colors duration-300 group-hover:text-[#c5a880]" />
          <CardBadge type={item.badgeType} isCurrent={isCurrent} />
        </div>

        {/* Quote Content with Word-by-Word Animation */}
        <blockquote className="relative z-10 text-xl font-light leading-relaxed text-[#fbfaf7] sm:text-2xl lg:text-3xl">
          <WordByWordText
            text={`"${item.quote}"`}
            wordDelay={0.025}
            startDelay={0.1}
            isCurrent={isCurrent}
          />
        </blockquote>

        {/* Author & Highlight Footer */}
        <div className="relative z-10 mt-10 flex items-center justify-between border-t border-[#c5a880]/15 pt-8 transition-colors duration-500 group-hover:border-[#c5a880]/30">
          <div>
            <div className="flex items-center gap-2 text-lg font-medium text-[#fbfaf7]">
              <span>{item.author}</span>
              <CheckCircle2 className="h-4 w-4 text-[#c5a880]" />
            </div>
            <div className="text-sm font-light text-[#a1a09d]">
              {item.role},{" "}
              <span className="text-[#c5a880]">
                {item.company}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="font-mono text-xs uppercase tracking-widest text-[#a1a09d]/60">
              Result
            </span>
            <span className="font-mono text-sm font-medium text-[#c5a880] transition-transform duration-300 group-hover:scale-105">
              {item.highlight}
            </span>
          </div>
        </div>

        {/* Active Accent Border Bottom */}
        {isCurrent && (
          <motion.div
            layoutId="activeGlow"
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c5a880] to-transparent"
          />
        )}
      </motion.div>
    </motion.div>
  );
}

/* ============================================================================
   MAIN TESTIMONIALS COMPONENT
   ============================================================================ */

export default function Testimonial() {
  const containerRef = useRef<HTMLDivElement>(null);
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

  return (
    <section
      ref={containerRef}
      className="relative h-[400vh] bg-[#0a0a09] font-sans text-[#fbfaf7] selection:bg-[#c5a880] selection:text-[#0a0a09]"
    >
      {/* Sticky Viewport Area */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-6 lg:px-12">
        
        {/* Ambient Grid Background */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Ambient Glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[380px] w-[550px] rounded-full bg-[#c5a880]/10 blur-[130px]" />
        </div>

        {/* TOP HEADER BAR */}
        <div className="relative z-20 mx-auto w-full max-w-7xl pt-16 lg:pt-20">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex items-center gap-3"
            >
              <Sparkles className="h-4 w-4 text-[#c5a880]" />
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#c5a880]">
                Testimonials & Impact
              </span>
            </motion.div>

            {/* Kinetic Active Index Counter */}
            <div className="flex items-center gap-2 font-mono text-sm tracking-widest text-[#a1a09d]">
              <span className="text-[#c5a880]">
                {testimonials[activeIndex].number}
              </span>
              <span>/</span>
              <span>0{testimonials.length}</span>
            </div>
          </div>

          {/* Heading with Kinetic Word Animation */}
          <div className="mt-4">
            <h2 className="text-4xl font-extralight tracking-tight sm:text-6xl lg:text-7xl">
              <WordByWordText text="Client Perspectives" wordDelay={0.08} startDelay={0.1} />
            </h2>
            <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-[#a1a09d] sm:text-base">
              <WordByWordText
                text="Direct insights from market leaders and enterprise founders scaling with our full-stack digital engine."
                wordDelay={0.02}
                startDelay={0.3}
              />
            </p>
          </div>
        </div>

        {/* CENTER 3D CARDS IN SPACE CONTAINER */}
        <div className="relative z-10 my-auto w-full py-6 [perspective:1200px]">
          <motion.div
            style={{ x: xTransform }}
            className="flex w-[400%] items-center"
          >
            {testimonials.map((item, index) => {
              const isCurrent = index === activeIndex;
              const isPast = index < activeIndex;

              return (
                <div
                  key={item.id}
                  className="flex w-full justify-center px-4 sm:px-6 lg:px-12"
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

        {/* BOTTOM HUD NAVIGATION */}
        <div className="relative z-20 mx-auto w-full max-w-7xl pb-10 lg:pb-14">
          <div className="flex items-center justify-between border-t border-[#c5a880]/15 pt-6">
            
            {/* Step Progress Indicators */}
            <div className="flex items-center gap-6">
              {testimonials.map((t, idx) => (
                <div key={t.id} className="group cursor-pointer flex flex-col items-start gap-1.5">
                  <span
                    className={`font-mono text-xs tracking-widest transition-colors duration-500 ${
                      idx === activeIndex
                        ? "text-[#c5a880]"
                        : "text-[#a1a09d]/40 group-hover:text-[#a1a09d]"
                    }`}
                  >
                    {t.number}
                  </span>
                  <div className="h-1 w-12 overflow-hidden rounded-full bg-[#a1a09d]/20 transition-all duration-300 group-hover:bg-[#a1a09d]/40">
                    <motion.div
                      animate={{
                        width: idx === activeIndex ? "100%" : "0%",
                        backgroundColor: "#c5a880",
                      }}
                      transition={{ duration: 0.5 }}
                      className="h-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Navigation Helper */}
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#a1a09d]/60">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#c5a880]" />
              <span>Scroll down to navigate spatial sequence</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}