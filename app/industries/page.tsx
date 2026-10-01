'use client';

import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Navbar from '../components/Navbar';

// Quintic agency ease curve
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Stagger container
const containerVariants: Variants = {
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

export default function IndustriesSaaSTechPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeSegment, setActiveSegment] = useState<number | null>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const ambientGlowY = useTransform(heroProgress, [0, 1], ['0%', '30%']);
  const ambientGlowOpacity = useTransform(heroProgress, [0, 0.8], [0.18, 0]);

  const approachPoints = [
    'Cut through the noise and stand apart from every competitor selling the same story.',
    'Get sales and marketing pulling together to turn more demos into paying customers.',
    'Match content to every deal stage, so prospects get what they need when they need it.',
    'Tighten your sales playbook and scale nurturing workflows without adding more chaos.',
  ];

  const kpis = [
    'Product-Qualified Leads',
    'Qualified Lead Velocity Rate',
    'Trial-to-Purchase Conversion Rate',
    'Average Revenue Per Account',
    'Customer Acquisition Cost',
    'Monthly Recurring Revenue',
    'Support Tickets Created',
    'Number of Active Users',
    'Customer Retention Rate',
  ];

  const expertiseItems = [
    'Persona-Driven Content Marketing',
    'Lead-Converting Landing Pages',
    'Product Stories People Give a Damn About',
    'Client Engagement Workflows',
    'Mobile Shopping Experiences',
    'CRM Cleanup & Lead Segmentation',
    'SEO Built for SaaS',
  ];

  const engagementModelsList = [
    'Customer Acquisition Campaigns',
    'Project-Based Development & Integrations',
    'Accelerated Growth Engagements',
    'Agile Retainer Engagements',
    'HubSpot Onboarding & Training',
  ];

  return (
    <div className="relative bg-[#131313] text-zinc-100 font-sans selection:bg-[#f5c563] selection:text-[#131313] overflow-x-hidden">
        <Navbar />
      {/* ========================================================= */}
      {/* 1. HERO FOLD                                              */}
      {/* ========================================================= */}
     <section
  ref={heroRef}
  className="relative min-h-[92vh] flex flex-col justify-between items-center px-6 sm:px-8 pt-20 pb-12 border-b border-white/10 overflow-hidden"
>
  

  {/* Main Stage (Centered) */}
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="w-full max-w-4xl text-center space-y-8 my-auto py-12 z-10"
  >
    {/* Centered Main Title: SaaS & Tech */}
    <motion.h1 
      variants={cardVariant}
      className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl  tracking-wide text-white "
    >
      SaaS <span className="text-[#f2f2f2]">&amp;</span> Tech
    </motion.h1>

    {/* Kinetic Typography Paragraph Below */}
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-zinc-200 leading-[1.2] flex flex-wrap justify-center gap-x-[0.24em] select-none">
        <MotionWord word="Your" />
        <MotionWord word="product" />
        <MotionWord word="is" />
        <MotionWord word="ready." />
        <MotionWord word="Now" />
        <MotionWord word="let’s" />
        <MotionWord word="go" />
        <MotionWord word="find" isYellow={true} />
        <MotionWord word="the" />
        <MotionWord word="people" />
        <MotionWord word="who" />
        <MotionWord word="badly" />
        <MotionWord word="want" isYellow={true} />
        <MotionWord word="it." />
      </h2>
    </div>
  </motion.div>

  {/* Scroll Motion Indicator */}
  <div className="flex flex-col items-center space-y-2 opacity-60 z-10">
    <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-zinc-500">
      Scroll
    </span>
    <div className="w-[1px] h-6 bg-gradient-to-b from-[#f5c563] to-transparent animate-pulse" />
  </div>
</section>

      {/* ========================================================= */}
      {/* 2. SAAS MARKETING APPROACH                                */}
      {/* ========================================================= */}
      <section className="py-24 sm:py-28 px-6 sm:px-8 max-w-6xl mx-auto border-b border-white/10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
        >
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
            <motion.span
              variants={cardVariant}
              className="text-xs font-mono uppercase tracking-[0.3em] text-[#f5c563] block"
            >
              SaaS Marketing Approach
            </motion.span>
            <motion.h2
              variants={cardVariant}
              className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight"
            >
              An Agile SaaS Strategy Built to Sell
            </motion.h2>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <motion.p
              variants={cardVariant}
              className="text-lg sm:text-xl text-zinc-200 font-light leading-relaxed border-l-2 border-[#f5c563] pl-6"
            >
              We know the SaaS grind. You’re building the product, chasing growth, feeding the pipeline and somehow your team is expected to do everything else too. We step in to turn that chaos into a sharper revenue engine, from channel development and demand generation to engagement and optimization.
            </motion.p>

            <div className="space-y-4 pt-2">
              <motion.p
                variants={cardVariant}
                className="text-xs font-mono uppercase tracking-widest text-[#f5c563]"
              >
                Our SaaS demand generation specialists can help your platform:
              </motion.p>

              <div className="space-y-3">
                {approachPoints.map((text, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardVariant}
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 rounded-xl border border-white/10 bg-[#161616] hover:border-[#f5c563]/40 transition-all flex items-start gap-4 group"
                  >
                    <span className="text-xs font-mono text-[#f5c563] pt-0.5">
                      0{idx + 1}
                    </span>
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light group-hover:text-white transition-colors">
                      {text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ========================================================= */}
      {/* 3. INDUSTRY KPIS                                          */}
      {/* ========================================================= */}
      <section className="py-24 sm:py-28 px-6 sm:px-8 max-w-6xl mx-auto border-b border-white/10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-12"
        >
          <div className="max-w-3xl space-y-4">
            <motion.span
              variants={cardVariant}
              className="text-xs font-mono uppercase tracking-[0.3em] text-[#f5c563] block"
            >
              Industry KPIs
            </motion.span>
            <motion.h2
              variants={cardVariant}
              className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight"
            >
              Know What’s Growing. Know What’s Bleeding
            </motion.h2>
            <motion.p
              variants={cardVariant}
              className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed"
            >
              We’ve watched SaaS companies chase growth with every metric under the sun. The trick isn’t tracking everything. It’s knowing which numbers actually move the business. We track the KPIs that matter, the ones that tell you where growth is coming from, where money is leaking, and what needs fixing before it becomes expensive.
            </motion.p>
          </div>

          <div className="space-y-4">
            <motion.p
              variants={cardVariant}
              className="text-xs font-mono uppercase tracking-widest text-[#f5c563]"
            >
              Here are the numbers worth keeping an eye on:
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {kpis.map((kpi, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariant}
                  whileHover={{ y: -4, borderColor: 'rgba(245,197,99,0.5)' }}
                  transition={{ duration: 0.2 }}
                  className="p-6 rounded-xl border border-white/10 bg-[#161616] hover:bg-[#191919] transition-all flex flex-col justify-between group"
                >
                  <span className="text-[11px] font-mono text-zinc-500 group-hover:text-[#f5c563] mb-3 block transition-colors">
                    KPI // 0{idx + 1}
                  </span>
                  <p className="text-base sm:text-lg font-medium text-white tracking-tight">
                    {kpi}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ========================================================= */}
      {/* 4. SAAS INDUSTRY EXPERTISE                                */}
      {/* ========================================================= */}
      <section className="py-24 sm:py-28 px-6 sm:px-8 max-w-6xl mx-auto border-b border-white/10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-12"
        >
          <div className="max-w-3xl space-y-4">
            <motion.span
              variants={cardVariant}
              className="text-xs font-mono uppercase tracking-[0.3em] text-[#f5c563] block"
            >
              SaaS Industry Expertise
            </motion.span>
            <motion.h2
              variants={cardVariant}
              className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight"
            >
              Measure the velocity. Then make the revenue move faster.
            </motion.h2>
            <motion.p
              variants={cardVariant}
              className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed"
            >
              Let our specialists get into the machinery behind your growth. We build sharp, battle-tested strategies designed to bring in more traffic, turn more visitors into leads, and push more deals across the line.
            </motion.p>
          </div>

          <div className="divide-y divide-white/10">
            {expertiseItems.map((item, idx) => (
              <motion.div
                key={idx}
                variants={cardVariant}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.25 }}
                className="py-5 sm:py-6 flex items-center justify-between group cursor-pointer transition-colors hover:border-[#f5c563]"
              >
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span className="font-mono text-xs text-zinc-500 group-hover:text-[#f5c563] transition-colors">
                    0{idx + 1}
                  </span>
                  <h3 className="text-xl sm:text-3xl font-semibold tracking-tight text-zinc-200 group-hover:text-white transition-colors">
                    {item}
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#f5c563] group-hover:bg-[#f5c563] transition-all">
                  <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-[#131313] transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

    {/* ========================================================= */}
      {/* 5. ENGAGEMENT MODELS                                      */}
      {/* ========================================================= */}
      <section className="py-24 sm:py-28 px-6 sm:px-8 max-w-6xl mx-auto space-y-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-12"
        >
          {/* Section Header */}
          <div className="max-w-3xl space-y-4">
            <motion.span
              variants={cardVariant}
              className="text-xs font-mono uppercase tracking-[0.3em] text-[#f5c563] block"
            >
              Engagement Models
            </motion.span>
            <motion.h2
              variants={cardVariant}
              className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight"
            >
              Pick Your Weapon. We’ll Help You Scale.
            </motion.h2>
            <motion.p
              variants={cardVariant}
              className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed"
            >
              As B2B SaaS growth specialists, we plug into your team without the overhead of another full-time hire. We help you acquire better customers, build a steadier pipeline, and squeeze more ROI out of the marketing machine you already have.
            </motion.p>
          </div>

          {/* TWO COLUMN GRID: INSPIRATION DIAGRAM (LEFT) + LIST & COPY (RIGHT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center pt-4">

            {/* LEFT: THE INTERACTIVE CIRCULAR ENGAGEMENT MODEL */}
            <div className="lg:col-span-6 flex justify-center items-center relative">
              <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#f5c563]/10 blur-3xl pointer-events-none" />

              <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full border border-white/10 flex items-center justify-center p-6 bg-[#161616]/70 backdrop-blur-sm shadow-2xl">
                
                {/* SVG Rotating Flow Arrows */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 400 400"
                  fill="none"
                >
                  <defs>
                    <marker
                      id="arrow"
                      viewBox="0 0 10 10"
                      refX="5"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f5c563" />
                    </marker>
                  </defs>

                 

                  {/* Divider lines */}
                  <line x1="200" y1="140" x2="200" y2="70" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                  <line x1="150" y1="230" x2="80" y2="280" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                  <line x1="250" y1="230" x2="320" y2="280" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                </svg>

                {/* Center Core Hub */}
                <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-[#f5c563]/40 bg-[#121212] flex flex-col items-center justify-center text-center p-2 shadow-[0_0_20px_rgba(245,197,99,0.15)]">
                
                  <h1 className="text-[9px] font-mono uppercase tracking-widest text-[#f5c563]">
                    Engagement Models
                  </h1>
                </div>

                {/* Top Node: Customer Acquisition Campaigns */}
                <div
                  onMouseEnter={() => setActiveSegment(1)}
                  onMouseLeave={() => setActiveSegment(null)}
                  className={`absolute top-6 left-1/2 -translate-x-1/2 text-center max-w-[150px] transition-all duration-300 cursor-pointer ${
                    activeSegment === 1 ? 'scale-105 text-[#f5c563]' : 'text-zinc-200 hover:text-white'
                  }`}
                >
                  <h1 className="text-xs sm:text-sm font-semibold tracking-tight leading-snug">
                    Customer Acquisition Campaigns
                  </h1>
                </div>

                {/* Right Node: Project-Based Development & Integrations */}
                <div
                  onMouseEnter={() => setActiveSegment(2)}
                  onMouseLeave={() => setActiveSegment(null)}
                  className={`absolute bottom-16 right-4 sm:right-6 text-center max-w-[140px] transition-all duration-300 cursor-pointer ${
                    activeSegment === 2 ? 'scale-105 text-[#f5c563]' : 'text-zinc-200 hover:text-white'
                  }`}
                >
                  <h1 className="text-xs sm:text-sm font-semibold tracking-tight leading-snug">
                    Project-Based Development & Integrations
                  </h1>
                </div>

                {/* Left Node: Agile Retainer Engagements */}
                <div
                  onMouseEnter={() => setActiveSegment(3)}
                  onMouseLeave={() => setActiveSegment(null)}
                  className={`absolute bottom-16 left-4 sm:left-6 text-center max-w-[140px] transition-all duration-300 cursor-pointer ${
                    activeSegment === 3 ? 'scale-105 text-[#f5c563]' : 'text-zinc-200 hover:text-white'
                  }`}
                >
                  <h1 className="text-xs sm:text-sm font-semibold tracking-tight leading-snug">
                    Agile Retainer Engagements
                  </h1>
                </div>

              </div>
            </div>

            {/* RIGHT: LIST & CALL TO ACTION */}
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-mono uppercase tracking-widest text-[#f5c563]">
                Here’s how we can get into the fight:
              </p>

              {/* Exact 5 Engagement Models */}
              <div className="space-y-3">
                {[
                  'Customer Acquisition Campaigns',
                  'Project-Based Development & Integrations',
                  'Accelerated Growth Engagements',
                  'Agile Retainer Engagements',
                  'HubSpot Onboarding & Training',
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardVariant}
                    whileHover={{ x: 6 }}
                    className="p-4 rounded-xl border border-white/10 bg-[#161616] hover:border-[#f5c563]/50 flex items-center justify-between transition-colors group cursor-default"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f5c563]" />
                      <span className="text-sm sm:text-base text-zinc-200 font-medium group-hover:text-white transition-colors">
                        {item}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-zinc-600 group-hover:text-[#f5c563] transition-colors">
                      [0{idx + 1}]
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Paragraph & Button */}
              <div className="pt-4 space-y-4">
                <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
                  Book a conversation below. Let’s figure out what’s holding back your SaaS growth and what it’ll take to fix it.
                </p>

                <Link href="/contact" className="inline-block">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-4 rounded-xl border border-[#f5c563]/30 bg-[#1a1a1a] px-8 py-4 shadow-xl transition-all duration-300 hover:border-[#f5c563] hover:bg-[#f5c563] hover:text-[#131313]"
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.2em] font-semibold text-zinc-200 group-hover:text-[#131313] transition-colors">
                      Book a conversation
                    </span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 group-hover:bg-[#131313] group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </motion.button>
                </Link>
              </div>

            </div>

          </div>
        </motion.div>
      </section>

    </div>
  );
}