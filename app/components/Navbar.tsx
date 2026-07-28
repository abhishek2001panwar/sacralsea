'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollYProgress } = useScroll();

  // Scroll listener to toggle navbar visibility on scroll
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.20) {
      setIsVisible(true);
      setIsScrolled(false);
    } else if (latest >= 0.20 && latest < 0.45) {
      setIsVisible(false);
      if (isOpen) setIsOpen(false);
    } else {
      setIsVisible(true);
      setIsScrolled(true);
    }
  });

  // Lock body scroll when mobile fullscreen overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { href: '/#services', label: 'Services', number: '01' },
    { href: '/#industries', label: 'Industries', number: '02' },
    { href: '/#work', label: 'Work', number: '03' },
    { href: '/about', label: 'About', number: '04' },
  ];

  return (
    <>
      {/* HEADER BAR */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: EASE }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 selection:bg-white selection:text-[#131313] ${
          isScrolled && !isOpen
            ? 'bg-[#131313]/80 backdrop-blur-md border-b border-white/10 shadow-2xl'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <nav className="h-16 px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 z-50">
            <Image 
              src="/logo.png" 
              alt="SacralSea Logo"
              width={140}
              height={42}
              className="object-contain w-36 h-9 sm:w-40 sm:h-10"
            />
          </Link>

          {/* Desktop Menu Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[clamp(0.625rem,0.6vw,0.875rem)] font-mono uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <Link
            href="/#contact"
            className="hidden md:block"
          >
            <button className="group flex items-center gap-4 rounded-xl border border-white/15 bg-[#1a1a1a] px-5 py-2.5 shadow-2xl transition-all duration-300 hover:border-white hover:bg-white hover:text-[#131313] focus:outline-none">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-200 transition-colors duration-300 group-hover:text-[#131313]">
                Start A Project
              </span>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 group-hover:bg-[#131313] group-hover:text-white">
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </button>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden z-50 p-2.5 rounded-xl border border-white/10 bg-[#1a1a1a] text-zinc-300 hover:text-white transition active:scale-95"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </motion.header>

      {/* FULLSCREEN MOBILE OVERLAY MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-40 md:hidden bg-[#131313] flex flex-col justify-between px-6 py-20 overflow-y-auto selection:bg-white selection:text-[#131313]"
          >
            {/* Ambient Radial Top Glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,255,255,0.03),transparent_100%)]" />

            {/* Grid Pattern Background */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:2rem_2rem]" />

            {/* Top Indicator */}
            <div className="relative z-10 flex items-center justify-center gap-2 pt-2">
              <Sparkles className="h-3.5 w-3.5 text-zinc-400" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400">
                Navigation Directory
              </span>
            </div>

            {/* CENTER CONTAINER BOX WITH ELEVATED BACKDROP (#1a1a1a) */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative z-10 my-auto w-full max-w-sm mx-auto rounded-2xl border border-white/10 bg-[#1a1a1a] p-6 shadow-2xl space-y-3"
            >
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center justify-between rounded-xl border border-white/5 bg-[#222222] px-5 py-4 transition-all duration-300 hover:border-white/20 hover:bg-white hover:text-[#131313]"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-zinc-500 group-hover:text-[#131313]/60 transition-colors">
                        {item.number}
                      </span>
                      <span className="font-mono text-sm uppercase tracking-[0.15em] text-zinc-200 group-hover:text-[#131313] transition-colors">
                        {item.label}
                      </span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-[#131313] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA Button inside Center Box */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="pt-2"
              >
                <Link href="/#contact" onClick={() => setIsOpen(false)}>
                  <button className="group w-full flex items-center justify-center gap-3 rounded-xl border border-white/20 bg-white px-5 py-4 text-[#131313] shadow-2xl transition-all duration-300 active:scale-98">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] font-medium">
                      Start A Project
                    </span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Bottom Footer Info */}
           
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}