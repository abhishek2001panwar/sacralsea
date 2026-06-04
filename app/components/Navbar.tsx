'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { href: '/#services', label: 'Services' },
    { href: '/#industries', label: 'Industries' },
    { href: '/#work', label: 'Work' },
    { href: '/#about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/5">
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
              className="text-[clamp(0.625rem,0.6vw,0.875rem)] uppercase tracking-[0.2em] text-[#B8B6AF] hover:text-[#D8C08A] transition duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <Link
          href="/contact"
          className="hidden md:block px-[clamp(.5rem,1.4vw,1.25rem)] py-2 bg-[#D2B47A] text-black text-[clamp(0.625rem,0.8vw,0.875rem)] uppercase tracking-[0.25em] hover:bg-[#e0c58f] transition duration-200 flex-shrink-0"
        >
          Start A Project
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-[#B8B6AF] hover:text-[#D8C08A] transition"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/5 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-[clamp(1rem,3vw,3.5rem)] py-6 flex flex-col gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm uppercase tracking-[0.2em] text-[#B8B6AF] hover:text-[#D8C08A] transition duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile CTA Button */}
            <Link
              href="/contact"
              className="w-full px-4 py-3 bg-[#D2B47A] text-black text-[12px] uppercase tracking-[0.25em] text-center hover:bg-[#e0c58f] transition duration-200"
              onClick={() => setIsOpen(false)}
            >
              Start A Project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}