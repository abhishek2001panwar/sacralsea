'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollYProgress } = useScroll();

  // Controls visibility based on scroll depth to sync with the Hero section phases
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // Phase 1 (0% to 20% scroll): Visible & Fully Transparent
    if (latest < 0.20) {
      setIsVisible(true);
      setIsScrolled(false);
    } 
    // Transition Phase (20% to 45% scroll): Hide Navbar while scrolling down
    else if (latest >= 0.20 && latest < 0.45) {
      setIsVisible(false);
      setIsOpen(false); // Close mobile menu if open
    } 
    // Phase 2 (45%+ scroll): Show Navbar with dark glassmorphism styling
    else {
      setIsVisible(true);
      setIsScrolled(true);
    }
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { href: '/#services', label: 'Services' },
    { href: '/#industries', label: 'Industries' },
    { href: '/#work', label: 'Work' },
    { href: '/about', label: 'About' },
  ];

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        isScrolled || isOpen
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10 shadow-2xl'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="h-16 px-[clamp(1rem,3vw,3.5rem)] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image 
            src="/logo.png" 
            alt="SacralSea Logo"
            width={140}
            height={42}
            className="object-contain w-40 h-10"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[clamp(0.625rem,0.6vw,0.875rem)] uppercase tracking-[0.2em] text-[#B8B6AF] hover:text-[#c5a880] transition duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <Link
          href="/contact"
          className="hidden md:block"
        >
         <button className="group relative inline-flex items-center gap-4 rounded-full border border-[#c5a880] bg-[#c5a880]/10 px-5 py-2 transition-all duration-500 hover:bg-[#c5a880]">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c5a880] transition-colors duration-500 group-hover:text-[#0d0d0c]">
               Start A Project
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c5a880] text-[#0d0d0c] transition-transform duration-500 group-hover:scale-110">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </button>
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-[#B8B6AF] hover:text-[#c5a880] transition"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-[clamp(1rem,3vw,3.5rem)] py-6 flex flex-col gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm uppercase tracking-[0.2em] text-[#B8B6AF] hover:text-[#c5a880] transition duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile CTA Button */}
            <Link
              href="/contact"
              className="w-full px-4 py-3"
              onClick={() => setIsOpen(false)}
            >
              <button className="group relative inline-flex items-center gap-4 rounded-full border border-[#c5a880] bg-[#c5a880]/10 px-7 py-3 transition-all duration-500 hover:bg-[#c5a880]">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c5a880] transition-colors duration-500 group-hover:text-[#0d0d0c]">
               Start A Project
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c5a880] text-[#0d0d0c] transition-transform duration-500 group-hover:scale-110">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </button>
            </Link>
          </div>
        </div>
      )}
    </motion.header>
  );
}