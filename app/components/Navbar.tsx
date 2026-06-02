'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md ">
      <nav className="h-20 px-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-[#F2E5C0] text-2xl font-serif tracking-wide"
        >
        <Image 
            src="/logo.png" 
            alt="SacralSea Logo"
            width={120}
            height={40}
            className="object-contain"
            />
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-12">
          <Link
            href="/#services"
            className="text-[10px] uppercase tracking-[0.2em] text-[#B8B6AF] hover:text-[#D8C08A] transition"
          >
            Services
          </Link>

          <Link
            href="/#industries"
            className="text-[10px] uppercase tracking-[0.2em] text-[#B8B6AF] hover:text-[#D8C08A] transition"
          >
            Industries
          </Link>

          <Link
            href="/#work"
            className="text-[10px] uppercase tracking-[0.2em] text-[#B8B6AF] hover:text-[#D8C08A] transition"
          >
            Work
          </Link>

          <Link
            href="/#about"
            className="text-[10px] uppercase tracking-[0.2em] text-[#B8B6AF] hover:text-[#D8C08A] transition"
          >
            About
          </Link>
        </div>

        {/* Button */}
        <Link
          href="/contact"
          className="
            px-5
            py-2
            bg-[#D2B47A]
            text-black
            text-[10px]
            uppercase
            tracking-[0.25em]
            hover:bg-[#e0c58f]
            transition
          "
        >
          Start A Project
        </Link>
      </nav>
    </header>
  );
}