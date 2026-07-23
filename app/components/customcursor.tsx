"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<"default" | "hoverText" | "hoverButton">("default");
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for smooth fluid trailing
  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Hide cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Global Event Listener for Hover Targets
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if hovering interactive text or headings
      const isText =
        target.closest("h1, h2, h3, h4, h5, h6, p, span, blockquote, [data-cursor='text']");
      
      // Check if hovering buttons, links, or clickable elements
      const isButton =
        target.closest("button, a, input, select, textarea, [role='button'], [data-cursor='button']");

      if (isButton) {
        setCursorState("hoverButton");
      } else if (isText) {
        setCursorState("hoverText");
      } else {
        setCursorState("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  // Variants for cursor sizes & blend modes
  const variants = {
    default: {
      height: 16,
      width: 16,
      backgroundColor: "rgba(197, 168, 128, 0.9)", // Warm Champagne Accent
      border: "0px solid rgba(197, 168, 128, 0)",
      mixBlendMode: "normal" as const,
    },
    hoverText: {
      height: 72,
      width: 72,
      backgroundColor: "#ffffff",
      border: "0px solid rgba(255, 255, 255, 0)",
      mixBlendMode: "difference" as const, // Inverts text underneath
    },
    hoverButton: {
      height: 48,
      width: 48,
      backgroundColor: "rgba(197, 168, 128, 0.15)",
      border: "1px solid rgba(197, 168, 128, 0.8)",
      mixBlendMode: "normal" as const,
    },
  };

  return (
    <>
      {/* Hide native browser cursor across the page */}
      <style jsx global>{`
        @media (pointer: fine) {
          body, a, button, input, textarea {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Main Dynamic Cursor Dot/Disc */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={variants}
        animate={cursorState}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 25,
        }}
      />

      {/* Outer Ambient Trail Ring (Displays on default state) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border border-[#c5a880]/30"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          height: cursorState === "default" ? 36 : 0,
          width: cursorState === "default" ? 36 : 0,
          opacity: cursorState === "default" ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 22,
        }}
      />
    </>
  );
}