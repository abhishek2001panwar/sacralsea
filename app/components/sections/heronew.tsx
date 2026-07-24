// 'use client';

// import { motion, useScroll, useTransform } from 'framer-motion';
// import { useRef } from 'react';

// export default function CinematicHero() {
//   const containerRef = useRef<HTMLDivElement>(null);

//   // Track scroll progress
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ['start start', 'end end'],
//   });

//   // --- TRANSITION CONTROLS ---
//   // Phase 1 (Intro) fades OUT between 0% and 35% scroll
//   const phase1Opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
//   const phase1Scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.92]);

//   // Video Background fades IN between 35% and 60% scroll
//   const videoOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);

//   // Phase 2 (Video Content) fades IN between 50% and 75% scroll
//   const phase2Opacity = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
//   const phase2Y = useTransform(scrollYProgress, [0.5, 0.75], [40, 0]);

//   return (
//     <div ref={containerRef} className="relative h-[280vh] bg-[#080808] text-white font-sans selection:bg-[#c5a880] selection:text-black">
      
//       {/* Sticky Fullscreen Viewport */}
//       <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

//         {/* ========================================== */}
//         {/* VIDEO BACKGROUND (FADES IN ON SCROLL ONLY) */}
//         {/* ========================================== */}
//         <motion.div 
//           style={{ opacity: videoOpacity }}
//           className="absolute inset-0 z-0 pointer-events-none"
//         >
//           <video
//             autoPlay
//             loop
//             muted
//             playsInline
//             className="w-full h-full object-cover brightness-90 contrast-105"
//           >
//             {/* Replace with your video or GIF */}
//             <source src="https://player.vimeo.com/progressive_redirect/playback/1020697798/rendition/720p/file.mp4?loc=external&log_user=0&signature=cd45f23683db91c40f08a3f4a31ba153f1e93eac3d4f98cb3ca4b651b8830d04" type="video/mp4" />
//           </video>
//           {/* Subtle top/bottom gradient overlay for readability */}
//           <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80" />
//         </motion.div>


//         {/* ========================================== */}
//         {/* PHASE 1: RICH INTRO SECTION (INITIAL VIEW) */}
//         {/* ========================================== */}
//         <motion.div
//           style={{ opacity: phase1Opacity, scale: phase1Scale }}
//           className="relative z-10 w-full max-w-6xl px-6 flex flex-col items-center justify-between h-[80vh]"
//         >
//           {/* Ambient Glow behind Intro */}
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c5a880]/10 rounded-full blur-[140px] pointer-events-none" />

//           {/* Top Pill Accent */}
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="inline-flex items-center space-x-3 px-5 py-2 rounded-full border border-[#c5a880]/30 bg-[#c5a880]/5 backdrop-blur-md"
//           >
//             <span className="w-2 h-2 rounded-full bg-[#c5a880] animate-pulse" />
//             <span className="text-[#c5a880] text-xs uppercase tracking-[0.3em] font-medium">
//               You found us!
//             </span>
//           </motion.div>

//           {/* Center Main Copy */}
//           <div className="text-center space-y-6 my-auto">
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1, delay: 0.2 }}
//               className="text-4xl sm:text-7xl md:text-8xl font-extralight tracking-tight text-neutral-100 leading-[1.05]"
//             >
//               Together, we'll take it <br />
//               <span className="font-serif italic text-[#c5a880] font-normal">
//                 from here.
//               </span>
//             </motion.h1>
            
//             <motion.p 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.6 }}
//               transition={{ delay: 0.5, duration: 0.8 }}
//               className="text-sm md:text-base text-neutral-400 font-light tracking-wide max-w-lg mx-auto"
//             >
//               Crafting bespoke digital experiences, brand identity, and scalable code for visionary teams.
//             </motion.p>
//           </div>

//           {/* Bottom Grid Pillars (Fills up the empty hero space beautifully) */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.8, duration: 0.8 }}
//             className="w-full grid grid-cols-3 gap-4 border-t border-white/10 pt-6 text-center text-xs text-neutral-400 uppercase tracking-widest"
//           >
//             <div>[ Design ]</div>
//             <div>[ Development ]</div>
//             <div>[ Strategy ]</div>
//           </motion.div>

//           {/* Scroll Cue */}
//           <div className="absolute -bottom-8 flex flex-col items-center space-y-2">
//             <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a880]/70 font-mono">
//               Scroll Down
//             </span>
//             <div className="w-[1px] h-8 bg-gradient-to-b from-[#c5a880] to-transparent animate-pulse" />
//           </div>
//         </motion.div>


//         {/* ========================================== */}
//         {/* PHASE 2: VIDEO REVEAL SECTION (ON SCROLL) */}
//         {/* ========================================== */}
//         <motion.div
//           style={{ opacity: phase2Opacity, y: phase2Y }}
//           className="absolute z-10 text-center px-6 max-w-5xl flex flex-col items-center justify-center space-y-8"
//         >
//           {/* Section Tag */}
//           <div className="space-y-2">
//             <span className="text-[#c5a880] text-xs md:text-sm font-mono uppercase tracking-[0.4em] block">
//               You arrived
//             </span>
//             <span className="text-white/80 text-xl md:text-3xl font-serif italic block">
//               On the dot.
//             </span>
//           </div>

//           {/* Bold Impact Heading */}
//           <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none drop-shadow-2xl">
//             Get Full-Stack <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#c5a880] to-[#c5a880]">
//               Agency Services
//             </span>
//           </h2>

//           {/* Clean Call to Action */}
//           <motion.div 
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.98 }}
//             className="pt-6"
//           >
//             <a
//               href="#contact"
//               className="inline-flex items-center space-x-3 bg-[#c5a880] text-black font-semibold text-sm sm:text-base px-10 py-4 rounded-full shadow-[0_0_40px_rgba(197,168,128,0.4)] hover:shadow-[0_0_60px_rgba(197,168,128,0.7)] transition-all duration-300"
//             >
//               <span>Explore Services</span>
//               <span className="text-lg">→</span>
//             </a>
//           </motion.div>
//         </motion.div>

//       </div>
//     </div>
//   );
// }

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // =========================================================================
  // STRICT SCROLL TIMING MAP (Prevents overlapping/ghosting)
  // =========================================================================
  
  // PHASE 1 INTRO TEXT:
  const phase1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const phase1Y = useTransform(scrollYProgress, [0, 0.3], [0, -40]);

  // VIDEO BACKGROUND:
  const videoOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  // PHASE 2 VIDEO TEXT:
  const phase2Opacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const phase2Y = useTransform(scrollYProgress, [0.5, 0.7], [40, 0]);

  // =========================================================================
  // WORD-BY-WORD REVEAL ANIMATION VARIANTS
  // =========================================================================
  const sentenceContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariant = {
    hidden: { opacity: 0, y: 25, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: EASE,
      },
    },
  };

  const line1Words = ['Together,', "we'll", 'take', 'it'];
  const line2Words = ['from', 'here.'];

  return (
    <div ref={containerRef} className="relative h-[280vh] bg-[#050505] text-white font-sans selection:bg-[#c5a880] selection:text-black">
      
      {/* Sticky Fullscreen Wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* ==================================================== */}
        {/* CINEMATIC GRID BACKGROUND LAYER                      */}
        {/* ==================================================== */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #c5a880 1px, transparent 1px),
              linear-gradient(to bottom, #c5a880 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)',
          }}
        />

        {/* ==================================================== */}
        {/* VIDEO BACKGROUND (Fades in ONLY after Phase 1 hides) */}
        {/* ==================================================== */}
        <motion.div 
          style={{ opacity: videoOpacity }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover brightness-95 contrast-105"
          >
            {/* Replace with your MP4 or GIF path */}
            <source src="https://player.vimeo.com/progressive_redirect/playback/1020697798/rendition/720p/file.mp4?loc=external&log_user=0&signature=cd45f23683db91c40f08a3f4a31ba153f1e93eac3d4f98cb3ca4b651b8830d04" type="video/mp4" />
          </video>

          {/* Gradient overlay to maximize contrast for Phase 2 text */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
        </motion.div>


        {/* ==================================================== */}
        {/* PHASE 1: STATIC INTRO (Completely hides on scroll)    */}
        {/* ==================================================== */}
        <motion.div
          style={{ 
            opacity: phase1Opacity, 
            y: phase1Y,
            display: useTransform(scrollYProgress, (v) => (v >= 0.35 ? 'none' : 'flex'))
          }}
          className="relative z-10 w-full max-w-5xl px-6 flex-col items-center justify-between h-[75vh]"
        >
          {/* Background Subtle Accent Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#c5a880]/10 rounded-full blur-[150px] pointer-events-none" />

          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full border border-[#c5a880]/30 bg-[#c5a880]/5 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#c5a880] animate-pulse" />
            <span className="text-[#c5a880] text-xs uppercase tracking-[0.3em] font-medium">
              You found us!
            </span>
          </motion.div>

          {/* Word-by-Word Animated Heading */}
          <div className="text-center space-y-6 my-auto max-w-4xl">
            <motion.h1
              variants={sentenceContainer}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-neutral-100 leading-[1.08] flex flex-col items-center justify-center gap-y-2"
            >
              {/* First Line */}
              <div className="flex flex-wrap justify-center gap-x-[0.3em]">
                {line1Words.map((word, idx) => (
                  <motion.span key={idx} variants={wordVariant} className="inline-block">
                    {word}
                  </motion.span>
                ))}
              </div>

              {/* Second Line */}
              <div className="flex flex-wrap justify-center gap-x-[0.3em]">
                {line2Words.map((word, idx) => (
                  <motion.span 
                    key={idx} 
                    variants={wordVariant} 
                    className="inline-block font-serif italic font-light text-[#c5a880]"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-xs sm:text-sm md:text-base text-neutral-300 font-extralight tracking-wider max-w-md mx-auto"
            >
              Crafting high-end digital experiences, visual identity, and modern applications.
            </motion.p>
          </div>

          {/* Minimalist Bottom Pillars */}
        

          {/* Scroll Prompt */}
          <div className="absolute -bottom-10 flex flex-col items-center space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a880]/70 font-mono">
              Scroll Down
            </span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-[#c5a880] to-transparent animate-pulse" />
          </div>
        </motion.div>


        {/* ==================================================== */}
        {/* PHASE 2: VIDEO CONTENT (Appears when Video appears)  */}
        {/* ==================================================== */}
        <motion.div
          style={{ 
            opacity: phase2Opacity, 
            y: phase2Y,
            display: useTransform(scrollYProgress, (v) => (v < 0.35 ? 'none' : 'flex'))
          }}
          className="absolute z-10 text-center px-6 max-w-5xl flex-col items-center justify-center space-y-8"
        >
          {/* Subheading Badges */}
          <div className="space-y-2">
            <span className="text-[#c5a880] text-xs sm:text-sm font-mono uppercase tracking-[0.4em] block">
              You arrived
            </span>
            <span className="text-white/90 text-2xl sm:text-4xl font-serif italic font-light block">
              On the dot.
            </span>
          </div>

          {/* Hero Action Headline */}
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight text-white leading-none drop-shadow-2xl">
            Get Full-Stack <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#c5a880] to-[#c5a880]">
              Agency Services
            </span>
          </h2>

          {/* CTA Button */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="pt-4"
          >
            <button className="group relative inline-flex items-center gap-4 rounded-full border border-[#c5a880] bg-[#c5a880]/10 px-7 py-3 transition-all duration-500 hover:bg-[#c5a880]">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c5a880] transition-colors duration-500 group-hover:text-[#0d0d0c]">
                Get In Touch
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c5a880] text-[#0d0d0c] transition-transform duration-500 group-hover:scale-110">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </button>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}