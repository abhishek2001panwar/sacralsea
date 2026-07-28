"use client";

import React, { useRef, useState } from "react";
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
  Send,
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
  { id: "branding", label: "Branding", icon: Layers },
  { id: "website", label: "Website", icon: Globe },
  { id: "seo", label: "SEO Engine", icon: Search },
  { id: "content", label: "Content Creation", icon: Video },
  { id: "performance", label: "Performance Growth", icon: TrendingUp },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ============================================================================
   DYNAMIC MOTION GRAPHIC CANVAS (MATCHING IMAGE BOX THEME)
   ============================================================================ */

const SelectionVisualizer = ({ selected }: { selected: ServiceCategory | null }) => {
  return (
    <div className="relative flex h-80 w-full items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-[#1a1a1a] p-8 shadow-2xl">
      {/* Background Soft Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />

      {/* Grid Pattern Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />

      <AnimatePresence mode="wait">
        {!selected && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-col items-center gap-3 text-center"
          >
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <Sparkles className="h-5 w-5 text-white" />
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full border border-white/20"
              />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
              Select a capability to trigger visual canvas
            </span>
          </motion.div>
        )}

        {selected === "branding" && (
          <motion.div
            key="branding"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative h-32 w-32 rounded-full border border-dashed border-white/20"
            >
              {[0, 90, 180, 270].map((deg, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.2, 1],
                    borderRadius: ["20%", "50%", "20%"],
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
                  className="absolute h-10 w-10 border border-white/30 bg-white/10 backdrop-blur-sm"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, -50%) rotate(${deg}deg) translate(36px)`,
                  }}
                />
              ))}
            </motion.div>
            <div className="absolute h-6 w-6 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)]" />
          </motion.div>
        )}

        {selected === "website" && (
          <motion.div
            key="website"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative h-44 w-72 rounded-xl border border-white/10 bg-[#222222] p-3 shadow-2xl"
          >
            <div className="flex items-center gap-1.5 border-b border-white/10 pb-2">
              <div className="h-2 w-2 rounded-full bg-white/80" />
              <div className="h-2 w-2 rounded-full bg-white/40" />
              <div className="h-2 w-2 rounded-full bg-white/20" />
              <div className="ml-2 h-2 w-24 rounded-full bg-white/10" />
            </div>
            <div className="mt-3 space-y-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "80%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-3 rounded-md bg-white/20"
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "50%" }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="h-3 rounded-md bg-white/10"
              />
              <div className="mt-4 grid grid-cols-2 gap-2 pt-1">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="h-10 rounded-lg border border-white/10 bg-white/5"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="h-10 rounded-lg border border-white/10 bg-white/5"
                />
              </div>
            </div>
          </motion.div>
        )}

        {selected === "seo" && (
          <motion.div
            key="seo"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative flex h-40 w-40 items-center justify-center"
          >
            {[1, 2, 3].map((ring) => (
              <div
                key={ring}
                className="absolute rounded-full border border-white/10"
                style={{ width: `${ring * 33}%`, height: `${ring * 33}%` }}
              />
            ))}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(255,255,255,0.2)_360deg)]"
            />
            <Search className="relative z-10 h-6 w-6 text-white" />
          </motion.div>
        )}

        {selected === "content" && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2"
          >
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scaleY: [0.3, 1.2, 0.4],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1,
                }}
                className="h-20 w-2 rounded-full bg-white/80"
              />
            ))}
          </motion.div>
        )}

        {selected === "performance" && (
          <motion.div
            key="performance"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-end gap-3 h-32"
          >
            {[0.3, 0.5, 0.4, 0.8, 0.6, 1].map((height, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: height }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                className="w-4 rounded-t-md bg-white origin-bottom shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                style={{ height: "100%" }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ============================================================================
   MAIN CONTACT SECTION COMPONENT
   ============================================================================ */

export default function InteractiveContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedServices, setSelectedServices] = useState<ServiceCategory[]>([]);
  const [lastSelected, setLastSelected] = useState<ServiceCategory | null>(null);
  const [formData, setFormData] = useState({ email: "", phone: "", hint: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Scroll Progress to drive header transition
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heading1Opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.3]);
  const heading2Opacity = useTransform(scrollYProgress, [0.15, 0.5], [0.3, 1]);
  const heading2Y = useTransform(scrollYProgress, [0.15, 0.5], [20, 0]);

  const toggleService = (id: ServiceCategory) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter((s) => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
      setLastSelected(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative min-h-[200vh] bg-[#131313] font-sans text-zinc-100  selection:bg-white selection:text-[#131313]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 min-h-screen w-full overflow-hidden px-6 py-12 lg:px-12 lg:py-20 flex flex-col justify-between">
        
        {/* Background Ambient Overlay */}

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

        {/* MAIN INTERACTIVE FORM & GRAPHIC CONTAINER */}
        <div className="relative z-20 mx-auto my-auto w-full max-w-7xl py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* LEFT COLUMN: FORM WRAPPED IN IMAGE BOX STYLE (#1a1a1a) */}
            <div className="lg:col-span-7">
              <div className="h-full rounded-2xl p-4 flex flex-col justify-center">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* Step 1: Capability Multi-Select */}
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-widest text-zinc-400 mb-4">
                        01 / What do you need help with?
                      </label>
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
                                group flex items-center gap-2.5 rounded-xl border px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-300 outline-none
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

                    {/* Step 2: Minimalist Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="relative">
                        <label className="block font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
                          02 / What's your email?
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full border-b border-white/15 bg-transparent py-2.5 text-sm text-white placeholder-zinc-600 transition-colors focus:border-white focus:outline-none"
                        />
                      </div>

                      <div className="relative">
                        <label className="block font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
                          03 / Your phone number?
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

                    {/* Step 3: Quick Hint Input */}
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
                        04 / Give us a quick hint
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Redesigning our enterprise portal next quarter..."
                        value={formData.hint}
                        onChange={(e) => setFormData({ ...formData, hint: e.target.value })}
                        className="w-full border-b border-white/15 bg-transparent py-2.5 text-sm text-white placeholder-zinc-600 transition-colors focus:border-white focus:outline-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-3 rounded-xl border border-white/20 bg-[#252525] px-6 py-3.5 transition-all duration-300 hover:border-white hover:bg-white hover:text-[#131313]"
                    >
                      <span className="font-mono text-xs uppercase tracking-widest text-zinc-200 transition-colors group-hover:text-[#131313]">
                        Transmit Signal
                      </span>
                      <Send className="h-3.5 w-3.5 text-zinc-400 transition-colors group-hover:text-[#131313]" />
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-4 py-8"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white">
                      <Check className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-medium text-white">Signal Received</h3>
                    <p className="text-sm text-zinc-400 max-w-sm mx-auto">
                      We've captured your hint. Our team will review your selection and respond shortly.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: DYNAMIC MOTION GRAPHIC CANVAS IN MATCHING DARK BOX */}
            <div className="lg:col-span-5 flex items-stretch">
              <SelectionVisualizer selected={lastSelected} />
            </div>

          </div>
        </div>

        {/* BOTTOM STATUS BAR */}
        <div className="relative z-20 mx-auto w-full max-w-7xl border-t border-white/10 pt-4 flex items-center justify-between font-mono text-xs text-zinc-500 uppercase tracking-widest">
          <span>Encrypted Connection</span>
          <span>Response Time &lt; 24h</span>
        </div>

      </div>
    </section>
  );
}