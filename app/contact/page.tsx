'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  companyName: "",
  email: "",
  challenge: "",
  role: "",
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE },
  },
};

export default function MarketingAssessmentPage() {


  const [formData, setFormData] = useState(INITIAL_FORM);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
 const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus("loading");
  setErrorMessage("");

  try {
    const res = await fetch(
      `${STRAPI_URL.replace(/\/+$/, "")}/api/leads`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: formData,
        }),
      }
    );

    const responseText = await res.text();

    let result: any;
    try {
      result = responseText ? JSON.parse(responseText) : {};
    } catch {
      throw new Error(
        `Strapi returned a non-JSON response: ${responseText}`
      );
    }

    if (!res.ok) {
      console.error("Strapi lead submission failed:", {
        status: res.status,
        result,
      });

      throw new Error(
        result.error?.message ||
          `Failed to submit request (${res.status})`
      );
    }

    setStatus("success");
    setFormData(INITIAL_FORM);
  } catch (err: unknown) {
    setStatus("error");
    setErrorMessage(
      err instanceof Error
        ? err.message
        : "Something went wrong. Please try again."
    );
  }
};


  const discoveryPoints = [
    'Where your current marketing funnel is leaking good prospects.',
    'What’s working in your marketing strategy and what’s burning money.',
    'How to turn more of your website traffic into actual leads.',
    'Whether your sales and marketing teams are pulling in the same direction.',
    'How to make your lead nurturing work harder and cost less.',
    'How to measure what your marketing investment is actually bringing back.',
    'Real, practical solutions to get your marketing where it needs to go.',
  ];

  return (
    <div className="relative w-full bg-[#131313] text-zinc-100 font-sans selection:bg-[#f5c563] selection:text-[#131313] overflow-x-hidden">
 <Navbar />
      {/* ========================================================================= */}
      {/* 1. TOP HERO SECTION: PROPOSAL & ARROW-FREE CONCENTRIC FLYWHEEL            */}
      {/* ========================================================================= */}
      <section className="relative w-full border-b border-white/10 py-24 sm:py-28 px-6 sm:px-10 lg:px-14 overflow-hidden">
        
        {/* Soft Ambient Gold Glow */}
        <div className="pointer-events-none absolute -top-20 right-1/4 w-[650px] h-[400px] bg-[#f5c563]/10 blur-[170px] rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Copy & 4 Stage Pillars */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 space-y-6"
          >
            {/* Header Badge & Divider */}
            <div className="space-y-3">
              <span className="text-[#f5c563] text-xs sm:text-sm font-mono uppercase tracking-[0.28em] block">
                Marketing ROI Assessment
              </span>
              <div className="w-36 h-[2px] bg-[#f5c563]" />
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.1]">
              Free Marketing <span className="text-[#f5c563] font-normal">Proposal</span>
            </h1>

            {/* Subtext description */}
            <div className="space-y-3 max-w-xl text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              <p>
                Let’s talk about who you’re trying to reach, what you want to sell, and where you want the business to go.
              </p>
              <p>
                We’ll tear into your current marketing strategy, demand generation, and customer acquisition to find what’s working, what’s wasting money, and where the opportunities are.
              </p>
              <p>
                Then we’ll build an actionable revenue-generation playbook around it, along with a clear cost estimate to make it happen.
              </p>
            </div>

            {/* 4 Pillars Grid with Line-Art SVG Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-4 border-t border-white/10">
              
              {/* 1. GET NOTICED (Magnet Icon) */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-[#f5c563] group-hover:border-[#f5c563]/60 transition-colors">
                  <svg className="w-5 h-5 stroke-current stroke-[1.5] fill-none" viewBox="0 0 24 24">
                    <path d="M4 4v7a8 8 0 0 0 16 0V4" />
                    <line x1="4" y1="8" x2="8" y2="8" />
                    <line x1="16" y1="8" x2="20" y2="8" />
                    <line x1="4" y1="4" x2="8" y2="4" />
                    <line x1="16" y1="4" x2="20" y2="4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-mono font-bold tracking-wider uppercase text-white group-hover:text-[#f5c563] transition-colors">
                    GET NOTICED
                  </h3>
                  <p className="text-[11px] sm:text-xs text-zinc-400 mt-1 leading-snug font-light">
                    Website, blog, video, SEO, social, paid media & retargeting.
                  </p>
                </div>
              </div>

              {/* 2. GET INTEREST (Workflow Nodes Icon) */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-[#f5c563] group-hover:border-[#f5c563]/60 transition-colors">
                  <svg className="w-5 h-5 stroke-current stroke-[1.5] fill-none" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="3 3" />
                    <circle cx="8" cy="8" r="2" />
                    <circle cx="16" cy="9" r="2" />
                    <circle cx="11" cy="16" r="2" />
                    <path d="M8 8 L11 16 L16 9" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-mono font-bold tracking-wider uppercase text-white group-hover:text-[#f5c563] transition-colors">
                    GET INTEREST
                  </h3>
                  <p className="text-[11px] sm:text-xs text-zinc-400 mt-1 leading-snug font-light">
                    Workflows, landing pages, forms & calls to action.
                  </p>
                </div>
              </div>

              {/* 3. GET THE DEAL (Funnel Icon) */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-[#f5c563] group-hover:border-[#f5c563]/60 transition-colors">
                  <svg className="w-5 h-5 stroke-current stroke-[1.5] fill-none" viewBox="0 0 24 24">
                    <path d="M2 4h20l-8 9.5v6.5l-4-2v-4.5z" />
                    <line x1="6" y1="1" x2="6" y2="3" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="18" y1="1" x2="18" y2="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-mono font-bold tracking-wider uppercase text-white group-hover:text-[#f5c563] transition-colors">
                    GET THE DEAL
                  </h3>
                  <p className="text-[11px] sm:text-xs text-zinc-400 mt-1 leading-snug font-light">
                    Email, marketing automation, lead scoring & CRM.
                  </p>
                </div>
              </div>

              {/* 4. KEEP THEM CLOSE (Summit Flag Icon) */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-[#f5c563] group-hover:border-[#f5c563]/60 transition-colors">
                  <svg className="w-5 h-5 stroke-current stroke-[1.5] fill-none" viewBox="0 0 24 24">
                    <path d="M3 21l8-14 8 14z" />
                    <path d="M11 7V2l4 2.5L11 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-mono font-bold tracking-wider uppercase text-white group-hover:text-[#f5c563] transition-colors">
                    KEEP THEM CLOSE
                  </h3>
                  <p className="text-[11px] sm:text-xs text-zinc-400 mt-1 leading-snug font-light">
                    Smart content, integrations, analytics & reporting.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

    {/* Right Column: MATHEMATICALLY PERFECT CURVED SVG FLYWHEEL */}
          <div className="lg:col-span-6 flex justify-center items-center select-none">
            <div className="relative w-[380px] h-[380px] sm:w-[520px] sm:h-[520px] flex items-center justify-center">
              
              <svg 
                className="w-full h-full" 
                viewBox="0 0 560 560" 
                fill="none"
              >
                <defs>
                  {/* ======================================================== */}
                  {/* 1. OUTER RING ARCS (Radius: 242, Center: 280, 280)       */}
                  {/* ======================================================== */}
                  
                  {/* Quadrant 1 (Top-Right): 295° to 335° */}
                  <path
                    id="outerPathTopRight"
                    d="M 280 38 A 242 242 0 0 1 522 280"
                    fill="none"
                  />

                  {/* Quadrant 2 (Bottom-Right): Drawn counter-clockwise so text stays upright under line */}
                  <path
                    id="outerPathBottomRight"
                    d="M 522 280 A 242 242 0 0 1 280 522"
                    fill="none"
                  />

                  {/* Quadrant 3 (Bottom-Left): Inverted arc so letters sit upright under the curve */}
                  <path
                    id="outerPathBottomLeft"
                    d="M 280 522 A 242 242 0 0 1 38 280"
                    fill="none"
                  />

                  {/* Quadrant 4 (Top-Left): 205° to 245° */}
                  <path
                    id="outerPathTopLeft"
                    d="M 38 280 A 242 242 0 0 1 280 38"
                    fill="none"
                  />


                  {/* ======================================================== */}
                  {/* 2. INNER RING ARCS (Radius: 165, Center: 280, 280)       */}
                  {/* ======================================================== */}

                  {/* Mid Quadrant 1 (Top-Right) */}
                  <path
                    id="midPathTopRight"
                    d="M 280 115 A 165 165 0 0 1 445 280"
                    fill="none"
                  />

                  {/* Mid Quadrant 2 (Bottom-Right) */}
                  <path
                    id="midPathBottomRight"
                    d="M 445 280 A 165 165 0 0 1 280 445"
                    fill="none"
                  />

                  {/* Mid Quadrant 3 (Bottom-Left) */}
                  <path
                    id="midPathBottomLeft"
                    d="M 280 445 A 165 165 0 0 1 115 280"
                    fill="none"
                  />

                  {/* Mid Quadrant 4 (Top-Left) */}
                  <path
                    id="midPathTopLeft"
                    d="M 115 280 A 165 165 0 0 1 280 115"
                    fill="none"
                  />
                </defs>

                {/* Concentric Structural Circles */}
                {/* Outermost Boundary Ring */}
                <circle cx="280" cy="280" r="260" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                
                {/* Primary Outer Track (Where outer text sits right under) */}

                {/* Subtle Dashed Orbital Accent Track */}
                <circle cx="280" cy="280" r="202" stroke="rgba(245,197,99,0.22)" strokeWidth="1.5" strokeDasharray="5 5" />
                
                {/* Mid Lifecycle Track (Where inner text sits right under) */}
                <circle cx="280" cy="280" r="165" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />

                {/* Inner Core Enclosure */}
                <circle cx="280" cy="280" r="105" stroke="rgba(245,197,99,0.35)" strokeWidth="1.5" />

                {/* Precision Clean Radial Crosshairs (Clean divider notches, zero arrows) */}
                <line x1="280" y1="20" x2="280" y2="56" stroke="rgba(245,197,99,0.7)" strokeWidth="1.5" />
                <line x1="540" y1="280" x2="504" y2="280" stroke="rgba(245,197,99,0.7)" strokeWidth="1.5" />
                <line x1="280" y1="540" x2="280" y2="504" stroke="rgba(245,197,99,0.7)" strokeWidth="1.5" />
                <line x1="20" y1="280" x2="56" y2="280" stroke="rgba(245,197,99,0.7)" strokeWidth="1.5" />


                {/* ======================================================== */}
                {/* OUTER STAGE TEXT (dy="14" puts text right under line)   */}
                {/* ======================================================== */}
                
                {/* DEMAND GENERATION */}
                <text 
                  fill="#f5c563" 
                  fontSize="10" 
                  fontFamily="monospace" 
                  letterSpacing="0.28em" 
                  dy="15"
                >
                  <textPath href="#outerPathTopRight" startOffset="50%" textAnchor="middle">
                    DEMAND GENERATION
                  </textPath>
                </text>

                {/* CUSTOMER ACQUISITION */}
                <text 
                  fill="#a1a1aa" 
                  fontSize="10" 
                  fontFamily="monospace" 
                  letterSpacing="0.28em" 
                  dy="15"
                >
                  <textPath href="#outerPathBottomRight" startOffset="50%" textAnchor="middle">
                    CUSTOMER ACQUISITION
                  </textPath>
                </text>

                {/* LTV OPTIMIZATION */}
                <text 
                  fill="#a1a1aa" 
                  fontSize="10" 
                  fontFamily="monospace" 
                  letterSpacing="0.28em" 
                  dy="15"
                >
                  <textPath href="#outerPathBottomLeft" startOffset="50%" textAnchor="middle">
                    LTV OPTIMIZATION
                  </textPath>
                </text>

                {/* RETENTION & REFERRAL */}
                <text 
                  fill="#f5c563" 
                  fontSize="10" 
                  fontFamily="monospace" 
                  letterSpacing="0.28em" 
                  dy="15"
                >
                  <textPath href="#outerPathTopLeft" startOffset="50%" textAnchor="middle">
                    RETENTION &amp; REFERRAL
                  </textPath>
                </text>


                {/* ======================================================== */}
                {/* INNER LIFECYCLE TEXT (Sitting right under inner line)     */}
                {/* ======================================================== */}
                
                {/* PROSPECTING • QUALIFYING */}
                <text 
                  fill="#71717a" 
                  fontSize="8" 
                  fontFamily="monospace" 
                  letterSpacing="0.18em" 
                  dy="13"
                >
                  <textPath href="#midPathTopRight" startOffset="50%" textAnchor="middle">
                    PROSPECTING • QUALIFYING
                  </textPath>
                </text>

                {/* NURTURING • CLOSING */}
                <text 
                  fill="#71717a" 
                  fontSize="8" 
                  fontFamily="monospace" 
                  letterSpacing="0.18em" 
                  dy="13"
                >
                  <textPath href="#midPathBottomRight" startOffset="50%" textAnchor="middle">
                    NURTURING • CLOSING
                  </textPath>
                </text>

                {/* UPSELL • EXPANSION */}
                <text 
                  fill="#71717a" 
                  fontSize="8" 
                  fontFamily="monospace" 
                  letterSpacing="0.18em" 
                  dy="13"
                >
                  <textPath href="#midPathBottomLeft" startOffset="50%" textAnchor="middle">
                    UPSELL • EXPANSION
                  </textPath>
                </text>

                {/* BUILD RELATIONSHIPS • REFERRALS */}
                <text 
                  fill="#71717a" 
                  fontSize="8" 
                  fontFamily="monospace" 
                  letterSpacing="0.18em" 
                  dy="13"
                >
                  <textPath href="#midPathTopLeft" startOffset="50%" textAnchor="middle">
                    BUILD RELATIONSHIPS • REFERRALS
                  </textPath>
                </text>
              </svg>

              {/* Center Core: REVENUE GROWTH */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-[#f5c563]/40 bg-[#161616] flex flex-col items-center justify-center text-center p-3 shadow-[0_0_40px_rgba(245,197,99,0.15)] cursor-default"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#f5c563] animate-ping mb-2" />
                <span className="text-[10px] sm:text-xs font-mono font-light tracking-widest text-zinc-400 uppercase leading-snug">
                  REVENUE <br />
                  <strong className="font-bold text-white text-xs sm:text-sm">GROWTH</strong>
                </span>
              </motion.div>

            </div>
          </div>

        </div>
      </section>

    <section className="relative w-full bg-[#131313] text-zinc-100 py-24 sm:py-28 px-6 sm:px-10 lg:px-14 selection:bg-[#f5c563] selection:text-[#131313] overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="pointer-events-none absolute -bottom-24 left-1/4 w-[550px] h-[350px] bg-[#f5c563]/5 blur-[160px] rounded-full" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: AGENDA & DISCOVERY CALL DETAILS              */}
        {/* ========================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="lg:col-span-5 space-y-6"
        >
          {/* Section Eyebrow */}
          <motion.div variants={cardVariant} className="flex items-center space-x-3">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#f5c563]">
              Strategy Alignment
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2 
            variants={cardVariant}
            className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight"
          >
            Grow Your <span className="text-[#f5c563] font-normal">Revenue</span>
          </motion.h2>

          {/* Lead Paragraph */}
          <motion.p 
            variants={cardVariant}
            className="text-sm sm:text-base font-medium text-[#f5c563] leading-relaxed border-l-2 border-[#f5c563] pl-5"
          >
            Let’s start with a discovery call to talk about your marketing, your revenue goals, and what’s getting in the way. This helps us see where you are now, where you want to go, and what needs to happen to get you there.
          </motion.p>

          {/* Agenda Divider & Subheading */}
          <motion.div variants={cardVariant} className="pt-2 space-y-4">
            <div className="w-full h-[1px] bg-white/10" />
            <h3 className="text-sm sm:text-base font-mono font-bold uppercase tracking-wider text-white">
              In our call, we’ll talk about:
            </h3>

            {/* Bullets */}
            <ul className="space-y-3.5 text-xs sm:text-sm text-zinc-400 leading-relaxed list-disc pl-5">
              {discoveryPoints.map((point, idx) => (
                <li key={idx} className="marker:text-[#f5c563]">
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: MODERN PREMIUM ASSESSMENT FORM              */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="lg:col-span-7 relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#181818] via-[#151515] to-[#121212] p-8 sm:p-12 shadow-2xl backdrop-blur-xl"
        >
          {/* Subtle Ambient Inner Glow */}
          <div className="pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full bg-[#f5c563]/10 blur-3xl" />

     <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
      {/* Success Notification */}
      {status === 'success' && (
        <div className="flex items-center gap-3 p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/30 text-emerald-300 text-sm">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
          <span>Thank you! Your request has been received. Our team will be in touch shortly.</span>
        </div>
      )}

      {/* Error Notification */}
      {status === 'error' && (
        <div className="flex items-center gap-3 p-4 rounded-xl border border-rose-500/30 bg-rose-950/30 text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Row 1: First Name & Last Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400 block">
            First Name <span className="text-[#f5c563]">*</span>
          </label>
          <input
            type="text"
            required
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Jane"
            className="w-full h-12 px-4 rounded-xl bg-[#0e0e0e]/80 border border-white/10 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#f5c563]/80 focus:ring-1 focus:ring-[#f5c563]/40 transition-all duration-300"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400 block">
            Last Name <span className="text-[#f5c563]">*</span>
          </label>
          <input
            type="text"
            required
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Doe"
            className="w-full h-12 px-4 rounded-xl bg-[#0e0e0e]/80 border border-white/10 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#f5c563]/80 focus:ring-1 focus:ring-[#f5c563]/40 transition-all duration-300"
          />
        </div>
      </div>

      {/* Row 2: Company Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400 block">
            Company Name <span className="text-[#f5c563]">*</span>
          </label>
          <input
            type="text"
            required
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Acme Corp"
            className="w-full h-12 px-4 rounded-xl bg-[#0e0e0e]/80 border border-white/10 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#f5c563]/80 focus:ring-1 focus:ring-[#f5c563]/40 transition-all duration-300"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400 block">
            Email <span className="text-[#f5c563]">*</span>
          </label>
          <input
            type="email"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@company.com"
            className="w-full h-12 px-4 rounded-xl bg-[#0e0e0e]/80 border border-white/10 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#f5c563]/80 focus:ring-1 focus:ring-[#f5c563]/40 transition-all duration-300"
          />
        </div>
      </div>

      {/* Row 3: Role Selector */}
      <div className="space-y-2">
        <label className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400 block">
          Which Best Describes Your Role? <span className="text-[#f5c563]">*</span>
        </label>
        <div className="relative">
          <select
            required
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl bg-[#0e0e0e]/80 border border-white/10 text-zinc-200 text-sm focus:outline-none focus:border-[#f5c563]/80 focus:ring-1 focus:ring-[#f5c563]/40 transition-all duration-300 appearance-none cursor-pointer"
          >
            <option value="">Please Select</option>
            <option value="CEO or CMO looking for more sales">CEO or CMO looking for more sales</option>
            <option value="Marketing manager looking to boost ROI">Marketing manager looking to boost ROI</option>
            <option value="Marketer at a marketing or ad agency">Marketer at a marketing or ad agency</option>
            <option value="HubSpot customer who needs help">HubSpot customer who needs help</option>
          </select>
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Row 4: Challenge Selector */}
      <div className="space-y-2">
        <label className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400 block">
          What Is Your Biggest Marketing Challenge? <span className="text-[#f5c563]">*</span>
        </label>
        <div className="relative">
          <select
            required
            name="challenge"
            value={formData.challenge}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl bg-[#0e0e0e]/80 border border-white/10 text-zinc-200 text-sm focus:outline-none focus:border-[#f5c563]/80 focus:ring-1 focus:ring-[#f5c563]/40 transition-all duration-300 appearance-none cursor-pointer"
          >
            <option value="">Please Select</option>
            <option value="Ineffective Marketing Strategy">Ineffective Marketing Strategy</option>
            <option value="Ineffective Messaging Across Buyer's Journey">Ineffective Messaging Across Buyer's Journey</option>
            <option value="Website Not Producing Enough Quality Leads">Website Not Producing Enough Quality Leads</option>
            <option value="Website Leads Not Converting Into Customers">Website Leads Not Converting Into Customers</option>
          </select>
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <motion.button
          type="submit"
          disabled={status === 'loading'}
          whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
          whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
          className="group flex w-full sm:w-auto items-center justify-between sm:justify-start gap-5 rounded-xl border border-white/20 bg-[#161616] px-8 py-4 transition-all duration-300 hover:border-[#f5c563] hover:bg-white hover:text-[#131313] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="font-mono text-xs uppercase tracking-[0.22em] font-semibold text-zinc-100 transition-colors duration-300 group-hover:text-[#131313]">
            {status === 'loading' ? 'Submitting...' : 'Get Free Marketing Proposal'}
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 group-hover:bg-[#131313] group-hover:text-white">
            {status === 'loading' ? (
              <Loader2 className="h-4 w-4 animate-spin text-zinc-300" />
            ) : (
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            )}
          </div>
        </motion.button>
      </div>
    </form>
        </motion.div>

      </div>
    </section>

    </div>
  );
}