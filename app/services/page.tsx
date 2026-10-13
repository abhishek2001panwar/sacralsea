'use client';

import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import Navbar from '../components/Navbar';

// Quintic agency ease
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Stagger container
const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Word reveal
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
      duration: 0.75,
      ease: EASE,
    },
  },
};

// Item reveal
const cardVariant: Variants = {
  hidden: { opacity: 0, y: 25, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: EASE },
  },
};

interface MotionWordProps {
  word: string;
  isYellow?: boolean;
}

const MotionWord: React.FC<MotionWordProps> = ({ word, isYellow = false }) => (
  <span className="inline-block overflow-hidden py-1">
    <motion.span
      variants={wordVariant}
      className={`inline-block transform-gpu will-change-transform ${
        isYellow ? 'text-[#f5c563]' : 'text-white'
      }`}
    >
      {word}
    </motion.span>
  </span>
);

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const ambientGlowY = useTransform(heroProgress, [0, 1], ['0%', '30%']);
  const ambientGlowOpacity = useTransform(heroProgress, [0, 0.8], [0.15, 0]);

  const servicesList = [
    { num: '01', title: 'BRANDING', sub: '(PACKAGING)' },
    { num: '02', title: 'DESIGN', sub: '' },
    { num: '03', title: 'CONTENT', sub: '' },
    { num: '04', title: 'GROWTH', sub: '-AI/SEO- PERFORMANCE' },
    { num: '05', title: 'SOCIAL MEDIA', sub: '' },
    { num: '06', title: 'PRODUCTION', sub: '' },
    { num: '07', title: 'ACCOUNT-BASED MARKETING', sub: '' },
  ];

  const inboundItems = [
    "Generates better leads by attracting prospects already hunting for solutions, not random clicks and digital window-shoppers.",
    "Reduces acquisition costs over time as organic traffic compounds and good content keeps doing the heavy lifting.",
    "Increases conversion rates with sharper content, smarter nurturing, and buyer journeys built around what people actually need.",
    "Creates long-term marketing assets that keep driving pipeline and revenue long after the campaign has left the building.",
    "Improves sales and marketing alignment with measurable engagement data and buyer intent insights, so both teams know where to look."
  ];

  return (
    <>
<Navbar />
    <div className="relative bg-[#131313] text-zinc-100 font-sans selection:bg-[#f5c563] selection:text-[#131313] overflow-x-hidden">
      {/* ========================================================= */}
      {/* 1ST FOLD: HERO                                            */}
      {/* ========================================================= */}
      <section
        ref={heroRef}
        className="relative min-h-[92vh] flex flex-col justify-between items-center px-6 sm:px-8 pt-20 pb-10 border-b border-white/10 overflow-hidden"
      >
       

        {/* Minimal coordinates bar */}
        <div className="w-full max-w-6xl flex justify-between items-center text-[11px] font-mono text-zinc-500 uppercase tracking-[0.25em] z-10">
          
        </div>

        {/* Main Stage */}
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-3xl text-center space-y-8 my-auto py-8 z-10"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight leading-[1.08] flex flex-wrap justify-center gap-x-[0.22em] select-none">
            <MotionWord word="We’re" />
            <MotionWord word="not" />
            <MotionWord word="just" />
            <MotionWord word="another" />
            <MotionWord word="brick" isYellow={true} />
            <MotionWord word="in" />
            <MotionWord word="the" />
            <MotionWord word="wall" isYellow={true} />
          </h1>

          <motion.div
            variants={cardVariant}
            className="flex justify-center pt-2"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-4 rounded-xl border border-white/15 bg-[#1a1a1a] px-8 py-4 shadow-xl transition-all duration-300 hover:border-[#f5c563] hover:bg-[#f5c563] hover:text-[#131313]"
              >
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-200 transition-colors duration-300 group-hover:text-[#131313] font-semibold">
                  Connect with us
                </span>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 group-hover:bg-[#131313] group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Bottom indicator */}
        <div className="flex flex-col items-center space-y-2 opacity-50 z-10">
        
          <div className="w-[1px] h-6 bg-gradient-to-b from-[#f5c563] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2ND FOLD: SERVICES LIST                                   */}
      {/* ========================================================= */}
      <section className="py-24 sm:py-28 px-6 sm:px-8 max-w-6xl mx-auto border-b border-white/10">
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="divide-y divide-white/10"
        >
          {servicesList.map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardVariant}
              whileHover={{ x: 10 }}
              transition={{ duration: 0.25 }}
              className="group py-6 sm:py-7 flex flex-col md:flex-row md:items-baseline justify-between cursor-pointer transition-colors duration-300 hover:border-[#f5c563]"
            >
              <div className="flex items-baseline gap-5 sm:gap-8">
                <span className="font-mono text-xs text-zinc-500 group-hover:text-[#f5c563] transition-colors">
                  {item.num}
                </span>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white group-hover:text-[#f5c563] transition-colors">
                    {item.title}
                  </h2>
                  {item.sub && (
                    <span className="text-xs sm:text-base font-mono text-[#f5c563] tracking-wide uppercase">
                      {item.sub}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-3 md:mt-0 flex items-center">
                <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#f5c563] group-hover:bg-[#f5c563] transition-all duration-300">
                  <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-[#131313] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA: Contact page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="pt-16 flex justify-center"
        >
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-4 rounded-xl border border-white/15 bg-[#1a1a1a] px-8 py-4 shadow-xl transition-all duration-300 hover:border-white hover:bg-white hover:text-[#131313]"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-200 transition-colors duration-300 group-hover:text-[#131313] font-semibold">
                Contact page
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 group-hover:bg-[#131313] group-hover:text-white">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* ========================================================= */}
      {/* 3RD FOLD: HOW DO WE DO IT? — THE BIG IDEA                 */}
      {/* ========================================================= */}
      <section className="py-24 sm:py-28 px-6 sm:px-8 max-w-6xl mx-auto border-b border-white/10">
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start"
        >
          {/* Left Column Hook */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
            <motion.span
              variants={cardVariant}
              className="text-xs font-mono uppercase tracking-[0.3em] text-[#f5c563] block"
            >
              How do we do it?
            </motion.span>

            <motion.h2
              variants={cardVariant}
              className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight"
            >
              We still believe in the <br />
              <span className="text-[#f5c563]">Big Idea.</span>
            </motion.h2>
          </div>

          {/* Right Column Body */}
          <div className="lg:col-span-7 space-y-8">
            <motion.p
              variants={cardVariant}
              className="text-lg sm:text-xl text-zinc-100 font-light leading-relaxed border-l-2 border-[#f5c563] pl-6"
            >
              That old, stubborn belief that great brands aren’t built just by chasing algorithms, stuffing feeds, or shouting louder than everyone else. They’re built around an idea worth giving a shout about.
            </motion.p>

            <motion.p
              variants={cardVariant}
              className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed pl-6"
            >
              We find the idea, let it marinate, and then build the digital machinery around it. Turn it into communication that travels, sharp enough to cut through, strange enough to be remembered, and relevant enough to make people stop scrolling.
            </motion.p>

            <motion.div
              variants={cardVariant}
              className="pl-6"
            >
              <div className="p-6 rounded-xl bg-[#171717] border border-white/10">
                <h1 className="text-base sm:text-lg font-mono text-[#f5c563] leading-relaxed">
                  Because a Big Idea sitting in a deck is just decoration. We’d rather let it loose.
                </h1>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ========================================================= */}
      {/* 4TH FOLD: INBOUND READINESS & REVENUE PLAYBOOK            */}
      {/* ========================================================= */}
      <section className="py-24 sm:py-28 px-6 sm:px-8 max-w-6xl mx-auto space-y-20">
        
        {/* Intro */}
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
        >
          {/* Main Title Left */}
          <div className="lg:col-span-6 space-y-4">
            <motion.h2
              variants={cardVariant}
              className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight"
            >
              Is Your Marketing Strategy <br />
              <span className="text-[#f5c563]">Not Delivering Enough ROI?</span>
            </motion.h2>

            <motion.p
              variants={cardVariant}
              className="text-base sm:text-lg text-zinc-200 font-light leading-relaxed"
            >
              Build an inbound engine that brings the right people in and keeps the pipeline moving.
            </motion.p>
          </div>

          {/* Core Body Right */}
          <div className="lg:col-span-6 space-y-6">
            <motion.p
              variants={cardVariant}
              className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed"
            >
              Our inbound marketing playbook is built to attract qualified prospects, bring down customer acquisition costs, improve conversion rates, and turn attention into a pipeline you can actually forecast.
            </motion.p>

            <motion.div
              variants={cardVariant}
              className="p-6 sm:p-7 rounded-xl bg-[#171717] border border-white/10 space-y-2"
            >
              <p className="text-sm sm:text-base text-zinc-300 font-light">
                The goal isn’t more traffic. It isn’t more content.
              </p>
              <p className="text-sm sm:text-base text-zinc-400 font-light">
                And it sure isn’t another report celebrating a 14% increase in impressions.
              </p>
              <h1 className="text-lg sm:text-xl font-bold text-[#f5c563] pt-1">
                It’s sustainable revenue.
              </h1>
            </motion.div>

            <motion.p
              variants={cardVariant}
              className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed"
            >
              We build the strategy, content and engagement engine that keeps bringing the right prospects through the door so your sales team spends less time hunting and more time closing.
            </motion.p>
          </div>
        </motion.div>

        {/* Inbound readiness helps list */}
        <div className="space-y-8 pt-10 border-t border-white/10">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-2xl font-bold text-[#f5c563] tracking-tight uppercase"
          >
            Inbound readiness helps:
          </motion.h3>

          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="space-y-3"
          >
            {inboundItems.map((text, idx) => (
              <motion.div
                key={idx}
                variants={cardVariant}
                whileHover={{ x: 8 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-xl border border-white/10 bg-[#161616] hover:border-[#f5c563] transition-all flex items-start gap-4"
              >
                <span className="text-base sm:text-lg font-mono text-[#f5c563] font-bold">
                  0{idx + 1}
                </span>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
                  {text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </section>

    </div></>
  );
}