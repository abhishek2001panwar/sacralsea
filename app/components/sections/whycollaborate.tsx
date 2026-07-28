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
   WORD-BY-WORD KINETIC TYPOGRAPHY (GPU ACCELERATED)
   ============================================================================ */
function EditorialText({
  text,
  className = "",
  wordDelay = 0.04,
  startDelay = 0,
  italicWords = [],
  yellowWords = [],
}: {
  text: string;
  className?: string;
  wordDelay?: number;
  startDelay?: number;
  italicWords?: string[];
  yellowWords?: string[];
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
        const isYellow = yellowWords.includes(cleanWord);

        return (
          <motion.span
            key={index}
            variants={wordVariants}
            className={`inline-block transform-gpu will-change-transform ${
              isItalic ? "font-serif italic tracking-normal font-normal" : ""
            } ${isYellow ? "text-[#f5c563] font-normal" : ""}`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
}

/* ============================================================================
   AMBIENT CANVAS (VIEWPORT OBSERVED FOR ZERO OFF-SCREEN LAG)
   ============================================================================ */
function AmbientGrainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = false;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    const stars = Array.from({ length: 20 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.3 + 0.1,
    }));

    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0 || star.x > width) star.vx *= -1;
        if (star.y < 0 || star.y > height) star.vy *= -1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause rendering when canvas is scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          render();
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
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
      className="group relative inline-flex items-center gap-4 overflow-hidden rounded-xl border border-white/15 bg-[#1a1a1a] px-8 py-4 shadow-2xl transition-all duration-300 hover:border-white hover:bg-white hover:text-[#131313] transform-gpu"
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 group-hover:bg-[#131313] group-hover:text-white">
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-200 transition-colors duration-300 group-hover:text-[#131313]">
        {label}
      </span>
    </motion.a>
  );
}

/* ============================================================================
   MAIN WHY COLLABORATE SECTION
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
      className="relative w-full overflow-hidden bg-[#131313] py-20 font-sans text-zinc-100 selection:bg-white selection:text-[#131313]"
    >
      {/* Ambient Canvas */}
      <AmbientGrainCanvas />

      {/* Cursor Light Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-20 transition-opacity duration-500 transform-gpu"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(800px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.03), transparent 80%)`
          ),
        }}
      />

      {/* Watermark Typography */}
      <div className="pointer-events-none absolute inset-0 flex items-center opacity-[0.015] select-none font-bold text-[16vw] uppercase leading-none tracking-tighter">
        <motion.div style={{ x: tickerX }} className="whitespace-nowrap transform-gpu">
          COLLABORATE AGILITY STRATEGY IMPACT CREATIVITY
        </motion.div>
      </div>

      {/* MAIN TEXT CONTAINER */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        {/* Subtle Decorative Line Accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          className="mb-12 h-[1px] w-24 bg-gradient-to-r from-white/30 to-transparent origin-left"
        />

        {/* 1. Main Headline */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-normal  font-serif tracking-tight leading-[1.02] text-white">
          <EditorialText
            text="Why collaborate?"
            wordDelay={0.12}
            yellowWords={["collaborate?"]}
          />
        </h2>

        {/* 2. Primary Statement */}
        <div className="mt-14 text-2xl sm:text-4xl lg:text-5xl font-light leading-[1.2] tracking-tight text-zinc-100">
          <EditorialText
            text="We are what happens when a bunch of passionate folks come together to form a full-stack agency."
            wordDelay={0.04}
            startDelay={0.25}
            italicWords={["passionate", "folks"]}
          />
        </div>

        {/* 3. Secondary Narrative Lines */}
        <div className="mt-12 space-y-4 max-w-4xl text-lg sm:text-2xl lg:text-3xl font-light leading-relaxed text-zinc-400">
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
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#131313] to-transparent z-20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#131313] to-transparent z-20" />
    </section>
  );
}