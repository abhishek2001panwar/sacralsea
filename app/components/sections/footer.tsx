"use client";

import Image from "next/image";
import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
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
      className="relative overflow-hidden bg-[#131313] font-sans text-zinc-100p py-10 pb-8 px-6 md:px-12 lg:px-24 selection:bg-white selection:text-[#131313]"
    >
      {/* Background Radial Glow */}

      {/* Background Motion Grid Overlay */}

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        
       

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
                <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#1a1a1a] px-4 py-2 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
                Systems Operational • 2026
              </span>
            </div>
              
            </div>

            {/* Live System Operational Indicator */}
          
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Navigation Links Columns */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {sections.map((section, idx) => (
              <div key={idx} className="flex flex-col gap-6">
                <h4 className="font-mono text-[10px] tracking-[0.25em] text-zinc-400 font-semibold uppercase">
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
                        className="text-zinc-400 font-sans text-xs md:text-sm transition-colors duration-300 group-hover:text-white tracking-wide flex items-center gap-1.5"
                      >
                        <span>{link.name}</span>
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-white" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* FOOTER SUB-BAR COPYRIGHT & SOCIALS */}
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-6 border-t border-white/10 pt-6">
          
          <p className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
            © 2026 SacralSea. All rights reserved.
          </p>

          {/* Social Nav Row with Hover Highlights */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                whileHover={{ y: -2 }}
                href={social.href}
                className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 hover:text-white transition-colors duration-200"
              >
                {social.name}
              </motion.a>
            ))}

            {/* Back To Top Orbit Button */}
            <button
              onClick={scrollToTop}
              className="group ml-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#1a1a1a] transition-all duration-300 hover:border-white hover:bg-white"
              aria-label="Back to Top"
            >
              <ArrowUp className="h-4 w-4 text-zinc-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-[#131313]" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;