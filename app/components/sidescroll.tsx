"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Sparkles, Compass, Eye, ShieldCheck, Cpu } from "lucide-react";

/* ============================================================================
   PROJECTS DATA
   ============================================================================ */
interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  gradient: string;
  accentColor: string;
  metrics: string;
  icon: React.ElementType;
}

const projects: Project[] = [
  {
    id: "01",
    number: "01 / 04",
    title: "Aetherial OS",
    category: "Spatial UI & Brand Identity",
    year: "2026",
    description: "Architecting a next-generation spatial computing framework for autonomous creative workflows.",
    gradient: "from-[#1a1815] via-[#2a2218] to-[#0d0d0c]",
    accentColor: "#c5a880",
    metrics: "+340% User Velocity",
    icon: Compass,
  },
  {
    id: "02",
    number: "02 / 04",
    title: "Vanguard Neural",
    category: "AI Engine & Design System",
    year: "2026",
    description: "Generative AI design engine built to orchestrate real-time luxury brand visual assets at scale.",
    gradient: "from-[#11161b] via-[#1a232c] to-[#070a0d]",
    accentColor: "#7ea0c5",
    metrics: "12ms Neural Latency",
    icon: Cpu,
  },
  {
    id: "03",
    number: "03 / 04",
    title: "Lumina Kinetics",
    category: "3D WebGL Experience",
    year: "2025",
    description: "Immersive WebGL microsite featuring interactive particle physics and real-time audio reactivity.",
    gradient: "from-[#19151c] via-[#281e2e] to-[#0e0a10]",
    accentColor: "#b280c5",
    metrics: "60 FPS Ray-Tracing",
    icon: Eye,
  },
  {
    id: "04",
    number: "04 / 04",
    title: "Solstice Vault",
    category: "Fintech Platform & GTM",
    year: "2025",
    description: "Enterprise liquidity dashboard built for institutional asset managers with zero-knowledge security.",
    gradient: "from-[#151a17] via-[#1f2a24] to-[#0a100d]",
    accentColor: "#80c59e",
    metrics: "$1.4B Volume Streamed",
    icon: ShieldCheck,
  },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ============================================================================
   MAIN SIDE SCROLLER COMPONENT
   ============================================================================ */
export default function SideScroller() {
  const targetRef = useRef<HTMLDivElement>(null);

  // Track vertical scroll within this 400vh container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the horizontal transformation with a fluid spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  // Map 0 -> 1 vertical scroll progress to 0% -> -75% horizontal offset
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);

  // Track progress bar width
  const scaleX = useTransform(smoothProgress, [0, 1], [0.25, 1]);

  return (
    <section
      ref={targetRef}
      className="relative h-[400vh] bg-[#070706] font-sans text-[#fbfaf7] selection:bg-[#c5a880] selection:text-[#0a0a09]"
    >
      {/* STICKY CONTAINER (PINNED IN VIEWPORT) */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden py-12 lg:py-16">
        
        {/* Ambient Grid Background */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* TOP HEADER HUD */}
        <div className="relative z-20 mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-[#c5a880]/30 bg-[#c5a880]/10 px-4 py-1.5 text-xs font-mono tracking-widest text-[#c5a880] uppercase backdrop-blur-md"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Selected Works</span>
            </motion.div>

            <div className="hidden sm:flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#a1a09d]">
              <span className="inline-block h-2 w-2 rounded-full bg-[#c5a880] animate-ping" />
              <span>Scroll down to navigate gallery</span>
            </div>
          </div>

          <h2 className="mt-4 text-4xl font-extralight tracking-tight sm:text-6xl lg:text-7xl">
            Featured <span className="font-serif italic text-[#c5a880]">Creations</span>
          </h2>
        </div>

        {/* HORIZONTAL SCROLLING TRACK */}
        <div className="relative z-10 my-auto flex w-full items-center">
          <motion.div style={{ x }} className="flex w-[400vw] gap-8 px-6 lg:px-12">
            {projects.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="w-[85vw] max-w-[850px] shrink-0"
                >
                  <div
                    data-cursor="button"
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0c] p-8 sm:p-12 lg:p-14 backdrop-blur-xl transition-all duration-700 hover:border-[#c5a880]/50 hover:shadow-[0_0_60px_rgba(197,168,128,0.15)]"
                  >
                    {/* Stylized Gradient Mesh Background */}
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-40 transition-opacity duration-700 group-hover:opacity-70`}
                    />

                    {/* Interactive Light Beam Glow */}
                    <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-[radial-gradient(800px_circle_at_center,rgba(197,168,128,0.12),transparent_80%)]" />

                    {/* Card Header Content */}
                    <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-8 transition-colors duration-500 group-hover:border-[#c5a880]/30">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#c5a880] transition-colors duration-500 group-hover:border-[#c5a880] group-hover:bg-[#c5a880] group-hover:text-[#0a0a09]">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <span className="block font-mono text-xs uppercase tracking-widest text-[#c5a880]">
                            {item.category}
                          </span>
                          <span className="font-mono text-xs text-[#a1a09d]">
                            Year // {item.year}
                          </span>
                        </div>
                      </div>

                      <span className="font-mono text-sm tracking-widest text-[#a1a09d]/60">
                        {item.number}
                      </span>
                    </div>

                    {/* Title & Narrative */}
                    <div className="relative z-10 mt-10">
                      <h3 className="text-3xl font-light tracking-tight text-[#fbfaf7] sm:text-5xl lg:text-6xl transition-colors duration-500 group-hover:text-[#c5a880]">
                        {item.title}
                      </h3>
                      <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-[#a1a09d] sm:text-lg">
                        {item.description}
                      </p>
                    </div>

                    {/* Card Footer Metric & Interactive CTA */}
                    <div className="relative z-10 mt-12 flex flex-wrap items-center justify-between gap-6 pt-6">
                      <div className="flex flex-col">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#a1a09d]/60">
                          Impact Benchmark
                        </span>
                        <span className="font-mono text-lg font-medium text-[#c5a880]">
                          {item.metrics}
                        </span>
                      </div>

                      <a
                        href={`#project-${item.id}`}
                        className="inline-flex items-center gap-3 rounded-full border border-[#c5a880]/30 bg-[#c5a880]/10 px-6 py-3 font-sans text-sm font-medium text-[#fbfaf7] transition-all duration-500 group-hover:border-[#c5a880] group-hover:bg-[#c5a880] group-hover:text-[#0a0a09]"
                      >
                        <span>Explore Case Study</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                      </a>
                    </div>

                    {/* Bottom Edge Accent Light */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c5a880]/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* BOTTOM PROGRESS HUD */}
        <div className="relative z-20 mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="flex items-center justify-between border-t border-white/10 pt-6">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#c5a880]">
                Sequence
              </span>
              <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  style={{ scaleX }}
                  className="h-full origin-left bg-[#c5a880]"
                />
              </div>
            </div>

            <div className="font-mono text-xs tracking-widest text-[#a1a09d]">
              01 — 04 // Interactive Gallery
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}