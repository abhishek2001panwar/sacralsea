'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowUpRight, Calculator, ClipboardCheck, Newspaper, Trophy, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../components/Navbar';

// Agency quintic ease
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

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

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
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

export default function ResourcesPage() {
  const resourceCards = [
    {
      num: '01',
      title: 'ROI CALCULATOR',
      desc: 'Use our free ROI calculator to help set realistic goals must be defined and aligned against financial targets',
      cta: 'Start ROI Calculator',
      href: '/roi-calculator',
      icon: Calculator,
    },
    {
      num: '02',
      title: 'ASSESSMENT',
      desc: 'Let’s talk about the future of your company, ideal customers along with sales and marketing goals.',
      cta: 'Start Assessment',
      href: '/contact',
      icon: ClipboardCheck,
    },
    {
      num: '03',
      title: 'NEWS & INSIGHTS',
      desc: 'Browse our blog for insight and advice on leveraging inbound marketing, sales enablement and growth-driven design',
      cta: 'View Blog Posts',
      href: '/blogs',
      icon: Newspaper,
    },
    {
      num: '04',
      title: 'FEATURED RESULTS',
      desc: 'Browse featured websites that we have redesigned over the years.',
      cta: 'View Client Results',
      href: '/results',
      icon: Trophy,
    },
  ];

  return (
    <div className="relative w-full bg-[#131313] text-zinc-100 font-sans selection:bg-[#f5c563] selection:text-[#131313] overflow-x-hidden">
      <Navbar />
      {/* ========================================================= */}
      {/* 1. HERO FOLD                                              */}
      {/* ========================================================= */}
      <section className="relative min-h-[72vh] flex flex-col justify-between items-center px-6 sm:px-10 lg:px-14 pt-24 pb-12 border-b border-white/10 overflow-hidden">
        
       
        {/* Minimal Category Header */}
        <div className="w-full max-w-6xl flex justify-between items-center text-[11px] font-mono text-zinc-500 uppercase tracking-[0.25em] z-10">
          </div>

        {/* Main Kinetic Typography */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-5xl text-center space-y-6 my-auto py-10 z-10"
        >
          {/* Eyebrow Pill */}
          <motion.div
            variants={cardVariant}
            className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-[#f5c563]/25 bg-[#1a1a1a]"
          >
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#f5c563]">
              Browse free online resources
            </span>
          </motion.div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-white leading-[1.08] flex flex-wrap justify-center gap-x-[0.25em] select-none">
            <MotionWord word="Free" />
            <MotionWord word="Resources" isYellow={true} />
          </h1>

          {/* Subtitle */}
          <motion.p
            variants={cardVariant}
            className="text-base sm:text-xl text-zinc-400 font-light max-w-xl mx-auto leading-relaxed"
          >
            Browse featured inbound marketing insights, tools and guides.
          </motion.p>
        </motion.div>

        {/* Scroll Motion Pin */}
        <div className="flex flex-col items-center space-y-2 opacity-50 z-10">
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-zinc-500">
            Scroll
          </span>
          <div className="w-[1px] h-6 bg-gradient-to-b from-[#f5c563] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. THE 4 RESOURCE TILES                                   */}
      {/* ========================================================= */}
      <section className="py-24 sm:py-28 px-6 sm:px-10 lg:px-14 max-w-6xl mx-auto border-b border-white/10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          {resourceCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariant}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="group relative p-8 sm:p-10 rounded-2xl border border-white/10 bg-[#161616] hover:border-[#f5c563]/50 transition-all duration-300 flex flex-col justify-between min-h-[300px]"
              >
                {/* Top Bar: Identifier & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs text-zinc-500 group-hover:text-[#f5c563] transition-colors">
                      // {card.num}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-[#202020] border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-[#f5c563] group-hover:border-[#f5c563]/30 transition-all duration-300">
                      <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Card Title */}
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3 uppercase group-hover:text-[#f5c563] transition-colors">
                    {card.title}
                  </h2>

                  {/* Card Description */}
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-8 mt-6 border-t border-white/5">
                  <Link href={card.href} className="inline-flex items-center gap-3 group/link">
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-300 group-hover/link:text-white transition-colors font-medium">
                      {card.cta}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 group-hover/link:bg-[#f5c563] group-hover/link:text-[#131313] transition-all duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ========================================================= */}
      {/* 3. BOTTOM CONVERSION SECTION: NEED TO INCREASE REVENUE?   */}
      {/* ========================================================= */}
      <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-14 max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#181818] via-[#151515] to-[#121212] p-8 sm:p-14 lg:p-16 shadow-2xl overflow-hidden"
        >
          {/* Ambient Inner Corner Glow */}
          <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 bg-[#f5c563]/10 blur-3xl rounded-full" />

          <div className="relative z-10 max-w-3xl space-y-6">
            
            {/* Eyebrow Callout */}
            <motion.span
              variants={cardVariant}
              className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400 block"
            >
              Need to increase revenue &amp; marketing ROI?
            </motion.span>

            {/* Headline */}
            <motion.h2
              variants={cardVariant}
              className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
            >
              Free <span className="text-[#f5c563]">Assessment</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={cardVariant}
              className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed"
            >
              We can help your company leverage HubSpot to build growth engines to create a predictable and repeatable stream of new leads, customers and revenue. Let’s talk and see how we can help convert more leads and increase revenue.
            </motion.p>

            {/* Modern Action Button */}
            <motion.div variants={cardVariant} className="pt-4">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative flex items-center justify-center gap-4 rounded-xl bg-[#f5c563] px-9 py-4 font-mono text-xs uppercase tracking-[0.2em] font-bold text-[#131313] transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(245,197,99,0.35)]"
                >
                  <span>GET A PROPOSAL</span>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#131313] text-[#f5c563] transition-all duration-300 group-hover:bg-[#f5c563] group-hover:text-[#131313]">
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </motion.button>
              </Link>
            </motion.div>

          </div>
        </motion.div>
      </section>

    </div>
  );
}