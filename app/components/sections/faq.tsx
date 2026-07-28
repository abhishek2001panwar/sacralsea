"use client";

import React, { useState, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  ArrowUpRight,
  Sparkles,
  Layers,
  Compass,
  Briefcase,
  Users,
} from "lucide-react";

/* ============================================================================
   TYPES & FAQ DATA
   ============================================================================ */

interface FAQItem {
  id: string;
  number: string;
  question: string;
  answer: string;
  visualType: "strategy" | "signals" | "project" | "team";
}

const faqData: FAQItem[] = [
  {
    id: "1",
    number: "01",
    question: "Why do businesses hire a creative agency?",
    answer:
      "Businesses hire creative agencies to gain specialized expertise, fresh external perspectives, and high-impact strategies that elevate their brand presence. Partnering with an agency allows companies to scale faster while focusing on their core operational strengths.",
    visualType: "strategy",
  },
  {
    id: "2",
    number: "02",
    question: "How do I know if my business needs a creative agency?",
    answer:
      "You likely need a creative agency if your current branding feels outdated, marketing efforts lack consistent performance, or your in-house team is stretched thin. It becomes essential when you want to launch a new product or rebrand with precision and speed.",
    visualType: "signals",
  },
  {
    id: "3",
    number: "03",
    question: "Can I hire a creative agency for a single project instead of ongoing work?",
    answer:
      "Yes, creative agencies frequently offer project-based engagements tailored to specific goals like a website redesign or brand campaign. This provides flexibility to achieve high-value outcomes without committing to a long-term retainer.",
    visualType: "project",
  },
  {
    id: "4",
    number: "04",
    question: "Who works at a creative agency?",
    answer:
      "A creative agency is powered by a multidisciplinary team including Creative Directors, Designers, Copywriters, Account Representatives, and Researchers. Together, these specialists blend strategic research, compelling narrative, and cutting-edge visual design to drive results.",
    visualType: "team",
  },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ============================================================================
   ANIMATION VARIANTS
   ============================================================================ */

const wordContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.01,
      staggerDirection: -1,
    },
  },
};

const wordChildVariants = {
  hidden: {
    opacity: 0,
    y: 4,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.35,
      ease: EASE,
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    filter: "blur(2px)",
    transition: {
      duration: 0.15,
    },
  },
};

/* ============================================================================
   WORD-BY-WORD TEXT ANIMATED COMPONENT (MEMOIZED)
   ============================================================================ */

const WordByWordText = memo(function WordByWordText({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <motion.p
      variants={wordContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-wrap gap-x-[0.32em] gap-y-1 text-sm sm:text-base font-light leading-relaxed text-zinc-400"
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={wordChildVariants}
          className="inline-block transform-gpu"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
});

/* ============================================================================
   DYNAMIC MOTION GRAPHIC CANVAS (GPU ACCELERATED)
   ============================================================================ */

const DynamicVisualCanvas = memo(function DynamicVisualCanvas({
  activeType,
}: {
  activeType: FAQItem["visualType"];
}) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#1c1c1c] p-8 shadow-2xl transform-gpu">
      {/* Subtle Background Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

      {/* Grid Pattern Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />

      <AnimatePresence mode="wait">
        {activeType === "strategy" && (
          <motion.div
            key="strategy"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative flex items-center justify-center transform-gpu"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="relative h-48 w-48 rounded-full border border-dashed border-white/20 flex items-center justify-center transform-gpu"
            >
              <div className="h-32 w-32 rounded-full border border-white/10" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute h-16 w-16 rounded-2xl bg-[#242424] border border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.05)] transform-gpu"
            >
              <Layers className="h-7 w-7 text-white" />
            </motion.div>
          </motion.div>
        )}

        {activeType === "signals" && (
          <motion.div
            key="signals"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-col items-center gap-4 transform-gpu"
          >
            <div className="relative flex h-36 w-36 items-center justify-center">
              {[1, 2, 3].map((ring) => (
                <motion.div
                  key={ring}
                  animate={{
                    scale: [0.6, 1.4],
                    opacity: [0.6, 0],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    delay: ring * 0.5,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 rounded-full border border-white/20 transform-gpu"
                />
              ))}
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#131313] shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <Compass className="h-7 w-7" />
              </div>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
              Diagnostic Radar
            </span>
          </motion.div>
        )}

        {activeType === "project" && (
          <motion.div
            key="project"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="w-full space-y-4 max-w-xs transform-gpu"
          >
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <div className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, ease: EASE }}
                  className="h-full bg-white"
                />
              </div>
              <span className="font-mono text-[10px] text-zinc-400">100%</span>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-[#242424] space-y-2.5 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-zinc-200">Single Sprint</span>
                <Briefcase className="h-4 w-4 text-zinc-400" />
              </div>
              <div className="h-1.5 w-3/4 rounded-full bg-white/20" />
              <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
            </div>
          </motion.div>
        )}

        {activeType === "team" && (
          <motion.div
            key="team"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative flex items-center justify-center transform-gpu"
          >
            <div className="relative flex h-40 w-40 items-center justify-center">
              <Users className="h-8 w-8 text-white relative z-10" />
              {[0, 72, 144, 216, 288].map((deg, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                  className="absolute h-full w-full transform-gpu"
                >
                  <motion.div
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    className="h-3.5 w-3.5 rounded-full border border-white/40 bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                    style={{
                      position: "absolute",
                      top: "0%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

/* ============================================================================
   MAIN FAQ COMPONENT
   ============================================================================ */

export default function FAQ() {
  const [openId, setOpenId] = useState<string>("1");

  const activeFAQ = faqData.find((item) => item.id === openId) || faqData[0];

  const toggleAccordion = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  }, []);

  return (
    <section className="relative min-h-screen bg-[#131313] font-sans text-zinc-100 py-10 selection:bg-white selection:text-[#131313]">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
        
        {/* HEADER SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-16 lg:mb-20"
        >
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="flex items-center gap-2.5"
          >
            <Sparkles className="h-4 w-4 text-zinc-400" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
              Most Asked, Always Answered
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="mt-4 text-4xl font-normal tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Frequently Asked <span className="text-[#f5c563] font-serif">Questions</span>
          </motion.h2>
        </motion.div>

        {/* FAQ ACCORDION + MOTION GRAPHIC GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ACCORDION LIST (LEFT COLUMN) */}
          <div className="lg:col-span-7 space-y-3">
            {faqData.map((item, index) => {
              const isOpen = openId === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
                  className={`
                    group relative overflow-hidden rounded-xl border transition-all duration-300 transform-gpu
                    ${
                      isOpen
                        ? "border-white/20 bg-[#202020] shadow-[0_4px_25px_rgba(0,0,0,0.5)]"
                        : "border-white/10 bg-[#1c1c1c] hover:border-white/20 hover:bg-[#222222]"
                    }
                  `}
                >
                  {/* TRIGGER HEADER */}
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className="flex w-full items-center justify-between p-6 text-left outline-none cursor-pointer"
                  >
                    <div className="flex items-center gap-5 pr-4">
                      {/* Number Tag */}
                      <motion.span
                        animate={{
                          color: isOpen ? "#ffffff" : "#71717a",
                        }}
                        transition={{ duration: 0.3 }}
                        className="font-mono text-sm font-medium tracking-wider"
                      >
                        {item.number}
                      </motion.span>

                      {/* Question Text */}
                      <h3
                        className={`text-base sm:text-lg font-medium transition-colors duration-300 ${
                          isOpen ? "text-white" : "text-zinc-300 group-hover:text-white"
                        }`}
                      >
                        {item.question}
                      </h3>
                    </div>

                    {/* CIRCULAR TOGGLE BUTTON */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    >
                      {/* Background Fill on Open */}
                      <motion.div
                        initial={false}
                        animate={{
                          scale: isOpen ? 1 : 0,
                          opacity: isOpen ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="absolute inset-0 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.3)]"
                      />

                      {/* Outline Ring */}
                      <motion.div
                        animate={{
                          borderColor: isOpen ? "transparent" : "rgba(255, 255, 255, 0.15)",
                        }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 rounded-full border group-hover:border-white/30"
                      />

                      {/* Plus / Rotate Icon */}
                      <motion.div
                        animate={{
                          rotate: isOpen ? 135 : 0,
                          color: isOpen ? "#131313" : "#a1a1aa",
                        }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="relative z-10"
                      >
                        <Plus className="h-4 w-4" />
                      </motion.div>
                    </motion.div>
                  </button>

                  {/* ACCENT LINE DIVIDER */}
                  {isOpen && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="h-[1px] w-full origin-left bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                  )}

                  {/* EXPANDABLE ANSWER BODY */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden transform-gpu"
                      >
                        <div className="p-6 pt-3">
                          <WordByWordText text={item.answer} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* DYNAMIC MOTION GRAPHIC DISPLAY (RIGHT COLUMN) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="hidden lg:block lg:col-span-5 sticky top-28 h-[400px]"
          >
            <DynamicVisualCanvas activeType={activeFAQ.visualType} />
          </motion.div>

        </div>

        {/* BOTTOM HELP FOOTER */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          className="mt-16 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs tracking-wider text-zinc-500"
        >
          <span>Still have questions?</span>
          <motion.a
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
            href="#contact"
            className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
          >
            <span>Speak directly with our strategy team</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}