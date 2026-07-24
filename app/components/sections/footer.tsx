"use client";

import Image from "next/image";
import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowUpRight, ArrowUp, Send, Sparkles } from "lucide-react";

interface FooterLink {
  name: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Progress for Big Backdrop Kinetic Typography
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const bigTextX = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  const sections: FooterSection[] = [
    {
      title: "SERVICES",
      links: [
        { name: "Brand Strategy", href: "#" },
        { name: "Visual Identity", href: "#" },
        { name: "Digital Marketing", href: "#" },
        { name: "Web & Product", href: "#" },
        { name: "Creative Strategy", href: "#" },
      ],
    },
    {
      title: "INDUSTRIES",
      links: [
        { name: "SaaS", href: "#" },
        { name: "B2B", href: "#" },
        { name: "Fintech", href: "#" },
        { name: "E-commerce", href: "#" },
        { name: "Healthcare", href: "#" },
      ],
    },
    {
      title: "COMPANY",
      links: [
        { name: "Our Work", href: "#" },
        { name: "About", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Contact", href: "#" },
      ],
    },
  ];

  const socialLinks: FooterLink[] = [
    { name: "INSTAGRAM", href: "#" },
    { name: "LINKEDIN", href: "#" },
    { name: "DRIBBBLE", href: "#" },
    { name: "TWITTER / X", href: "#" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={containerRef}
      className="relative overflow-hidden bg-[#0a0a09] font-sans text-[#fbfaf7] pb-8 px-6 md:px-12 lg:px-24 selection:bg-[#c5a880] selection:text-[#0a0a09]"
    >
      {/* Background Motion Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Ambient Gold Glow Spotlight */}
      <div className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-[#c5a880]/10 blur-[140px]" />

      <div className="relative z-10 mx-auto w-full max-w-8xl">
        
        {/* TOP INTERACTIVE NEWSLETTER & SYSTEM STATUS BAR */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#c5a880]/15 pb-10">
          
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#c5a880]" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#c5a880]">
                Stay Ahead
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extralight tracking-tight">
              Receive our <span className="font-serif italic text-[#c5a880]">monthly dispatch</span> on digital craft.
            </h3>
          </div>

          {/* Kinetic Motion Input */}
          <div className="lg:col-span-6">
            <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="w-full border-b border-[#c5a880]/30 bg-transparent py-4 text-sm text-[#fbfaf7] placeholder-[#a1a09d]/40 transition-colors focus:border-[#c5a880] focus:outline-none"
              />
              <button
                type="submit"
                className="group absolute right-0 flex items-center gap-2 rounded-full border border-[#c5a880]/40 bg-[#c5a880]/10 px-5 py-2.5 transition-all duration-500 hover:border-[#c5a880] hover:bg-[#c5a880]"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#c5a880] transition-colors duration-500 group-hover:text-[#0a0a09]">
                  Subscribe
                </span>
                <Send className="h-3.5 w-3.5 text-[#c5a880] transition-transform duration-500 group-hover:translate-x-0.5 group-hover:text-[#0a0a09]" />
              </button>
            </form>
          </div>

        </div>

        {/* MAIN FOOTER CONTENT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-20">
          
          {/* Brand/Bio Column */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="w-fit"
              >
                <Image
                  src="/logo.png"
                  alt="SacralSea Logo"
                  width={160}
                  height={50}
                  className="object-contain"
                />
              </motion.div>
              <p className="text-[#a1a09d] font-sans text-xs md:text-sm leading-relaxed max-w-sm tracking-wide">
                We build brands, campaigns, and digital experiences for companies that refuse to be ordinary.
              </p>
            </div>

            {/* Live System Operational Indicator */}
            <div className="flex items-center gap-2.5 rounded-full border border-[#c5a880]/20 bg-[#121210] px-4 py-2 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a880] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c5a880]" />
              </span>
              <span className="font-mono text-[10px] tracking-widest text-[#a1a09d] uppercase">
                Systems Operational • 2026
              </span>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Navigation Links Columns with Hover Motion */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {sections.map((section, idx) => (
              <div key={idx} className="flex flex-col gap-6">
                <h4 className="font-mono text-[10px] tracking-[0.35em] text-[#c5a880] font-semibold uppercase">
                  {section.title}
                </h4>

                <ul className="flex flex-col gap-4">
                  {section.links.map((link, linkIdx) => (
                    <motion.li
                      key={linkIdx}
                      whileHover={{ x: 6 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="relative group flex items-center w-fit"
                    >
                      <a
                        href={link.href}
                        className="text-[#a1a09d] font-sans text-xs md:text-sm transition-colors duration-300 group-hover:text-[#fbfaf7] tracking-wide flex items-center gap-1.5"
                      >
                        <span>{link.name}</span>
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-[#c5a880]" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* GIANT KINETIC WATERMARK TYPOGRAPHY */}
       

        {/* FOOTER SUB-BAR COPYRIGHT & SOCIALS */}
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-6 pt-6">
          
          <p className="font-mono text-[10px] tracking-widest text-[#a1a09d]/60 uppercase">
            © 2026 SacralSea. All rights reserved.
          </p>

          {/* Social Nav Row with Hover Highlights */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                whileHover={{ y: -2 }}
                href={social.href}
                className="font-mono text-[10px] tracking-[0.2em] text-[#a1a09d] hover:text-[#c5a880] transition-colors duration-200"
              >
                {social.name}
              </motion.a>
            ))}

            {/* Back To Top Kinetic Orbit Button */}
            <button
              onClick={scrollToTop}
              className="group ml-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#c5a880]/30 bg-[#121210] transition-all duration-500 hover:border-[#c5a880] hover:bg-[#c5a880]"
              aria-label="Back to Top"
            >
              <ArrowUp className="h-4 w-4 text-[#c5a880] transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:text-[#0a0a09]" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;