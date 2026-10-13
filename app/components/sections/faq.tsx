"use client";

import React, { useState, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowUpRight, Sparkles } from "lucide-react";

/* ============================================================================
   TYPES & FAQ DATA
   ============================================================================ */

interface FAQItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "1",
    number: "01",
    question: "Why do businesses hire a creative agency?",
    answer:
      "Businesses hire creative agencies to gain specialized expertise, fresh external perspectives, and high-impact strategies that elevate their brand presence. Partnering with an agency allows companies to scale faster while focusing on their core operational strengths.",
  },
  {
    id: "2",
    number: "02",
    question: "How do I know if my business needs a creative agency?",
    answer:
      "You likely need a creative agency if your current branding feels outdated, marketing efforts lack consistent performance, or your in-house team is stretched thin. It becomes essential when you want to launch a new product or rebrand with precision and speed.",
  },
  {
    id: "3",
    number: "03",
    question: "Can I hire a creative agency for a single project instead of ongoing work?",
    answer:
      "Yes, creative agencies frequently offer project-based engagements tailored to specific goals like a website redesign or brand campaign. This provides flexibility to achieve high-value outcomes without committing to a long-term retainer.",
  },
  {
    id: "4",
    number: "04",
    question: "Who works at a creative agency?",
    answer:
      "A creative agency is powered by a multidisciplinary team including Creative Directors, Designers, Copywriters, Account Representatives, and Researchers. Together, these specialists blend strategic research, compelling narrative, and cutting-edge visual design to drive results.",
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
   MAIN FAQ COMPONENT
   ============================================================================ */

export default function FAQ() {
  const [openId, setOpenId] = useState<string>("1");

  const toggleAccordion = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  }, []);

  return (
    <section className="relative min-h-screen bg-[#131313] font-sans text-zinc-100 py-16 sm:py-20 selection:bg-white selection:text-[#131313]">
  {/* VERY LIGHT YELLOWISH AMBIENT GLOW (BORDERLESS) */}
      {/* Top Edge Ambient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[450px] bg-[radial-gradient(ellipse_70%_100%_at_50%_0%,rgba(245,197,99,0.14)_0%,transparent_70%)] z-[1]" />

      {/* Center Body Ambient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(245,197,99,0.08)_0%,transparent_75%)] z-[1]" />

      {/* Bottom Edge Ambient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[450px] bg-[radial-gradient(ellipse_70%_100%_at_50%_100%,rgba(245,197,99,0.12)_0%,transparent_70%)] z-[1]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        
        
        {/* HEADER SECTION (CENTERED) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 sm:mb-16 text-center flex flex-col items-center"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="flex items-center justify-center gap-2.5"
          >
           
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="mt-4 text-3xl font-normal tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Frequently Asked <span className="text-[#f5c563] font-serif">Questions</span>
          </motion.h2>
        </motion.div>

        {/* FAQ ACCORDION LIST (CENTERED & EXPANDED WIDTH) */}
        <div className="mx-auto w-full max-w-6xl space-y-3.5">
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
                  className="flex w-full items-center justify-between p-6 sm:p-7 text-left outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-4 sm:gap-6 pr-4">
                    {/* Number Tag */}
                    <motion.span
                      animate={{
                        color: isOpen ? "#ffffff" : "#71717a",
                      }}
                      transition={{ duration: 0.3 }}
                      className="font-mono text-sm sm:text-base font-medium tracking-wider shrink-0"
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
                      <div className="p-6 sm:p-7 pt-3 sm:pt-4 pl-14 sm:pl-16">
                        <WordByWordText text={item.answer} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* BOTTOM HELP SECTION (HEADINGS ABOVE BORDER, BORDER BELOW) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
          className="mx-auto w-full max-w-6xl mt-16 sm:mt-20"
        >
          {/* Headings Above Border */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 pb-6">
            <div>
             
              <h4 className="mt-1 text-lg sm:text-sm font-mono text-white">
                Still have questions in mind?
              </h4>
            </div>

              
            <motion.a
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
              href="#contact"
              className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
            >
              <span>Speak directly with our strategy team</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </motion.a>
          </div>

          {/* Border Divider Below Headings */}
          <div className="w-full h-[1px] bg-white/10" />

          
        </motion.div>

      </div>
    </section>
  );
}