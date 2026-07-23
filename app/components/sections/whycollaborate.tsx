"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* ============================================================================
   CUSTOM BEZIER CURVES
   ============================================================================ */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ============================================================================
   WORD-BY-WORD KINETIC TYPOGRAPHY
   ============================================================================ */
function EditorialText({
  text,
  className = "",
  wordDelay = 0.04,
  startDelay = 0,
  italicWords = [],
  goldWords = [],
}: {
  text: string;
  className?: string;
  wordDelay?: number;
  startDelay?: number;
  italicWords?: string[];
  goldWords?: string[];
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
    hidden: { opacity: 0, x: -35, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: EASE,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={`inline-flex flex-wrap gap-x-[0.3em] gap-y-[0.12em] ${className}`}
    >
      {words.map((word, index) => {
        const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
        const isItalic = italicWords.includes(cleanWord);
        const isGold = goldWords.includes(cleanWord);

        return (
          <motion.span
            key={index}
            variants={wordVariants}
            className={`inline-block ${
              isItalic ? "font-serif italic tracking-normal font-normal" : ""
            } ${
              isGold
                ? "text-transparent bg-clip-text bg-gradient-to-r from-[#f3e5ce] via-[#c5a880] to-[#997a51]"
                : ""
            }`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
}

/* ============================================================================
   AMBEINT LUXURY CANVAS (FAINT NOISE & GRAIN)
   ============================================================================ */
function LuxuryGrainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Dynamic Nodes
    const stars = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0 || star.x > width) star.vx *= -1;
        if (star.y < 0 || star.y > height) star.vy *= -1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197, 168, 128, ${star.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
    />
  );
}

/* ============================================================================
   MAGNETIC CTA BUTTON COMPONENT
   ============================================================================ */
function MagneticButton({ href, label }: { href: string; label: string }) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={btnRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="group relative inline-flex items-center gap-6 overflow-hidden rounded-full border border-[#c5a880]/30 bg-[#0d0d0c]/80 px-10 py-5 text-lg font-light text-[#fbfaf7] backdrop-blur-xl transition-all duration-700 hover:border-[#c5a880] hover:shadow-[0_0_50px_rgba(197,168,128,0.25)]"
    >
      {/* Background Hover Sweep */}
      <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#c5a880] via-[#e6c594] to-[#c5a880] opacity-0 transition-opacity duration-700 group-hover:opacity-10" />

      <span className="relative z-10 font-sans tracking-wide">{label}</span>
      <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#c5a880]/40 bg-[#c5a880]/10 text-[#c5a880] transition-transform duration-500 group-hover:rotate-45 group-hover:bg-[#c5a880] group-hover:text-[#0a0a09]">
        <ArrowUpRight className="h-5 w-5" />
      </span>
    </motion.a>
  );
}

/* ============================================================================
   MAIN LUXURY WHY COLLABORATE SECTION
   ============================================================================ */
export default function UltraPremiumWhyCollaborate() {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const tickerX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden bg-[#050505] py-36 lg:py-56 font-sans text-[#fbfaf7] selection:bg-[#c5a880] selection:text-[#050505]"
    >
      {/* Luxury Stars Canvas */}
      <LuxuryGrainCanvas />

      {/* Radial Cursor Glow Light */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-25 transition-opacity duration-500"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(900px circle at ${x}px ${y}px, rgba(197, 168, 128, 0.15), transparent 80%)`
          ),
        }}
      />

      {/* Cinematic Watermark Typography */}
      <div className="pointer-events-none absolute inset-0 flex items-center opacity-[0.015] select-none font-bold text-[16vw] uppercase leading-none tracking-tighter">
        <motion.div style={{ x: tickerX }} className="whitespace-nowrap">
          COLLABORATE AGILITY STRATEGY IMPACT CREATIVITY
        </motion.div>
      </div>

      {/* Ambient Radial Accent Lighting */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[600px] w-[600px] rounded-full bg-[#c5a880]/5 blur-[160px]" />

      {/* MAIN TEXT CONTAINER */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        {/* Subtle Decorative Line Accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          className="mb-12 h-[1px] w-24 bg-gradient-to-r from-[#c5a880] to-transparent origin-left"
        />

        {/* 1. Main Headline */}
        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-extralight tracking-tight leading-[1.02]">
          <EditorialText
            text="Why collaborate?"
            wordDelay={0.12}
            italicWords={["collaborate?"]}
            goldWords={["collaborate?"]}
          />
        </h2>

        {/* 2. Primary Statement */}
        <div className="mt-14 text-2xl sm:text-4xl lg:text-5xl font-extralight leading-[1.2] tracking-tight text-[#f2f0eb]">
          <EditorialText
            text="We are what happens when a bunch of passionate folks come together to form a full-stack agency."
            wordDelay={0.04}
            startDelay={0.25}
            italicWords={["passionate", "folks"]}
            goldWords={["full-stack"]}
          />
        </div>

        {/* 3. Secondary Narrative Lines */}
        <div className="mt-12 space-y-4 max-w-4xl text-lg sm:text-2xl lg:text-3xl font-light leading-relaxed text-[#8e8d88]">
          <div>
            <EditorialText
              text="Ever since we started, we have worked, built, and grown alongside brands."
              wordDelay={0.03}
              startDelay={0.65}
              italicWords={["worked,", "built,", "grown"]}
            />
          </div>

          <div>
            <EditorialText
              text="Whether you’re looking to start, transform, or grow your brand, we’re with you."
              wordDelay={0.03}
              startDelay={0.95}
              italicWords={["start,", "transform,", "grow"]}
              goldWords={["with", "you."]}
            />
          </div>
        </div>

        {/* 4. Call to Action */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.35, ease: EASE }}
          className="mt-20 pt-4"
        >
          <MagneticButton href="#contact" label="Get in touch!" />
        </motion.div>
      </div>

      {/* Top and Bottom Fade Gradient Mask */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050505] to-transparent z-20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent z-20" />
    </section>
  );
}