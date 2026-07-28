"use client";

import React, { useRef, useState, useCallback, memo } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Sparkles,
  Check,
  Globe,
  TrendingUp,
  Search,
  Video,
  Layers,
  ArrowUpRight,
} from "lucide-react";

/* ============================================================================
   TYPES & DATA
   ============================================================================ */

type ServiceCategory = "branding" | "website" | "seo" | "content" | "performance";

interface ServiceOption {
  id: ServiceCategory;
  label: string;
  icon: React.ElementType;
}

const services: ServiceOption[] = [
  { id: "branding", label: "Brand Identity", icon: Layers },
  { id: "website", label: "Web Experience", icon: Globe },
  { id: "seo", label: "Organic Growth", icon: Search },
  { id: "content", label: "Content & Film", icon: Video },
  { id: "performance", label: "Paid Performance", icon: TrendingUp },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ============================================================================
   AGENCY MOODBOARD PREVIEW (RIGHT COLUMN)
   ============================================================================ */

const CapabilityVisualizer = memo(function CapabilityVisualizer({
  selected,
}: {
  selected: ServiceCategory | null;
}) {
  return (
    <div className="relative flex h-full min-h-[380px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-[#1a1a1a] p-8 shadow-2xl">
      {/* Background Soft Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_70%)]" />

      {/* Header Status */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
          Project Preview
        </span>
        <span className="font-mono text-xs text-[#f5c563]">
          {selected ? selected.toUpperCase() : "DISCOVERY"}
        </span>
      </div>

      {/* Dynamic Design Canvas Display */}
      <div className="relative z-10 my-auto flex h-48 w-full items-center justify-center">
        <AnimatePresence mode="wait">
          {!selected && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="text-center space-y-2 max-w-xs"
            >
              <div className="h-10 w-10 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400">
                <Sparkles className="h-4 w-4" />
              </div>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Select your project scope to generate tailored deliverables & process insights.
              </p>
            </motion.div>
          )}

          {selected === "branding" && (
            <motion.div
              key="branding"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="w-full space-y-3 p-4 rounded-xl border border-white/10 bg-[#222222]"
            >
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>IDENTITY SYSTEM</span>
                <span>V 1.0</span>
              </div>
              <div className="h-10 font-serif italic text-2xl text-white flex items-center">
                Sacral Branding
              </div>
              <div className="flex gap-2">
                <div className="h-3 w-8 rounded bg-white" />
                <div className="h-3 w-8 rounded bg-[#f5c563]" />
                <div className="h-3 w-8 rounded bg-zinc-600" />
              </div>
            </motion.div>
          )}

          {selected === "website" && (
            <motion.div
              key="website"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="w-full space-y-3 p-4 rounded-xl border border-white/10 bg-[#222222]"
            >
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>LAYOUT GRID</span>
                <span>60 FPS</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-2">
                <div className="h-12 rounded-lg bg-white/10 border border-white/10" />
                <div className="h-12 rounded-lg bg-white/5 border border-white/5 col-span-2" />
              </div>
            </motion.div>
          )}

          {selected === "seo" && (
            <motion.div
              key="seo"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="w-full space-y-3 p-4 rounded-xl border border-white/10 bg-[#222222]"
            >
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>SERP RANKING</span>
                <span>TOP 1%</span>
              </div>
              <div className="space-y-1.5 pt-1">
                <div className="h-2 w-full bg-white/20 rounded" />
                <div className="h-2 w-3/4 bg-white/10 rounded" />
                <div className="h-2 w-1/2 bg-[#f5c563] rounded" />
              </div>
            </motion.div>
          )}

          {selected === "content" && (
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="w-full space-y-3 p-4 rounded-xl border border-white/10 bg-[#222222]"
            >
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>FRAME RATE</span>
                <span>4K PRORES</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 py-3">
                {[40, 70, 30, 90, 50, 80].map((h, i) => (
                  <div
                    key={i}
                    className="w-2 bg-white/80 rounded-full"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {selected === "performance" && (
            <motion.div
              key="performance"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="w-full space-y-3 p-4 rounded-xl border border-white/10 bg-[#222222]"
            >
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>CONVERSION RATE</span>
                <span>+340%</span>
              </div>
              <div className="h-10 flex items-end gap-2 pt-2">
                <div className="h-1/3 flex-1 bg-white/20 rounded" />
                <div className="h-2/3 flex-1 bg-white/40 rounded" />
                <div className="h-full flex-1 bg-white rounded" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sub-label */}
      <div className="relative z-10 border-t border-white/10 pt-4 text-xs text-zinc-400 font-light flex justify-between">
        <span>Strategic Partnership</span>
        <span>SacralSea Studio</span>
      </div>
    </div>
  );
});

/* ============================================================================
   MAIN CONTACT SECTION COMPONENT
   ============================================================================ */

export default function InteractiveContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedServices, setSelectedServices] = useState<ServiceCategory[]>([]);
  const [lastSelected, setLastSelected] = useState<ServiceCategory | null>(null);
  const [formData, setFormData] = useState({ email: "", phone: "", hint: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Scroll Progress Header
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heading1Opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.3]);
  const heading2Opacity = useTransform(scrollYProgress, [0.15, 0.5], [0.3, 1]);
  const heading2Y = useTransform(scrollYProgress, [0.15, 0.5], [20, 0]);

  const toggleService = useCallback((id: ServiceCategory) => {
    setSelectedServices((prev) => {
      if (prev.includes(id)) {
        return prev.filter((s) => s !== id);
      } else {
        setLastSelected(id);
        return [...prev, id];
      }
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative min-h-[200vh] bg-[#131313] font-sans text-zinc-100 selection:bg-white selection:text-[#131313]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 min-h-screen w-full overflow-hidden px-6 py-12 lg:px-12 lg:py-20 flex flex-col justify-between">
        
      
        {/* SECTION HEADER TYPOGRAPHY */}
        <div className="relative z-20 mx-auto w-full max-w-7xl pt-2 lg:pt-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-zinc-400" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
              Start a Conversation
            </span>
          </div>

          <div className="relative text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-tight">
            <motion.div style={{ opacity: heading1Opacity }}>
              Give us a <span className="text-[#f5c563] font-serif italic">hint,</span>
            </motion.div>
            <motion.div
              style={{ opacity: heading2Opacity, y: heading2Y }}
              className="text-zinc-500 font-normal"
            >
              and we'll <span className="text-white underline decoration-white/20">contact you.</span>
            </motion.div>
          </div>
        </div>

        {/* MAIN FORM & MOODBOARD PREVIEW */}
        <div className="relative z-20 mx-auto my-auto w-full max-w-7xl py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* LEFT COLUMN: AGENCY FORM CARD */}
            <div className="lg:col-span-7">
              <div className="h-full rounded-2xl border border-white/5 bg-[#1a1a1a] p-6 sm:p-10 shadow-2xl flex flex-col justify-between">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* Step 1: Services Multi-Select */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="block font-mono text-xs uppercase tracking-widest text-zinc-400">
                          01 / Select Practice Area
                        </label>
                      </div>

                      <div className="flex flex-wrap gap-2.5">
                        {services.map((item) => {
                          const isSelected = selectedServices.includes(item.id);
                          const Icon = item.icon;

                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => toggleService(item.id)}
                              className={`
                                group flex items-center gap-2.5 rounded-xl border px-4 py-3 font-mono text-xs uppercase tracking-wider transition-all duration-300 outline-none
                                ${
                                  isSelected
                                    ? "border-white bg-white text-[#131313]"
                                    : "border-white/10 bg-[#222222] text-zinc-400 hover:border-white/20 hover:text-white"
                                }
                              `}
                            >
                              <Icon className={`h-3.5 w-3.5 ${isSelected ? "text-[#131313]" : "text-zinc-400"}`} />
                              <span>{item.label}</span>
                              {isSelected && <Check className="h-3.5 w-3.5 text-[#131313]" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 2: Clean Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                      <div className="relative">
                        <label className="block font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
                          02 / Work Email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="alex@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full border-b border-white/15 bg-transparent py-2.5 text-sm text-white placeholder-zinc-600 transition-colors focus:border-white focus:outline-none"
                        />
                      </div>

                      <div className="relative">
                        <label className="block font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
                          03 / Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full border-b border-white/15 bg-transparent py-2.5 text-sm text-white placeholder-zinc-600 transition-colors focus:border-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Step 3: Project Scope */}
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
                        04 / Tell us about your goal
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Preparing for series A launch next quarter..."
                        value={formData.hint}
                        onChange={(e) => setFormData({ ...formData, hint: e.target.value })}
                        className="w-full border-b border-white/15 bg-transparent py-2.5 text-sm text-white placeholder-zinc-600 transition-colors focus:border-white focus:outline-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="group flex items-center gap-3 rounded-xl border border-white/20 bg-[#252525] px-7 py-4 transition-all duration-300 hover:border-white hover:bg-white hover:text-[#131313]"
                    >
                      <span className="font-mono text-xs uppercase tracking-widest text-zinc-200 transition-colors group-hover:text-[#131313]">
                        Submit Inquiry
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-zinc-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#131313]" />
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-4 py-12"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white">
                      <Check className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-medium text-white">Inquiry Received</h3>
                    <p className="text-sm text-zinc-400 max-w-sm mx-auto">
                      Thank you. Our partners will review your project details and reach out within 24 hours.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: PREVIEW MOODBOARD */}
            <div className="lg:col-span-5 flex items-stretch">
              <CapabilityVisualizer selected={lastSelected} />
            </div>

          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <div className="relative z-20 mx-auto w-full max-w-7xl border-t border-white/10 pt-4 flex items-center justify-between font-mono text-xs text-zinc-500 uppercase tracking-widest">
          <span>Direct Contact</span>
          <span>Average Response &lt; 24h</span>
        </div>

      </div>
    </section>
  );
}