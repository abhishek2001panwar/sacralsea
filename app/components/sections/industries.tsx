'use client';

import { motion, type Variants } from 'framer-motion';
import {
  Hexagon,
  Diamond,
  Circle,
  Pentagon,
} from 'lucide-react';

const industries = [
  { icon: Hexagon, title: 'SaaS', projects: '34 Projects' },
  { icon: Diamond, title: 'B2B', projects: '28 Projects' },
  { icon: Circle, title: 'Fintech', projects: '18 Projects' },
  { icon: Pentagon, title: 'E-commerce', projects: '22 Projects' },
  { icon: Circle, title: 'Healthcare', projects: '11 Projects' },
  { icon: Diamond, title: 'Consumer', projects: '15 Projects' },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function Industries() {
  return (
    <section id='industries' className="relative overflow-hidden bg-[#0B0B09] py-28 text-white">
      
      {/* Soft Grid */}
      <div className="absolute inset-0 opacity-[0.04]
        [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
        [background-size:120px_120px]"
      />

      {/* Subtle Glow */}
      <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px]
        -translate-x-1/2 -translate-y-1/2 rounded-full
        bg-[#c7a86d]/10 blur-[200px]"
      />

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 md:px-12 lg:px-20">

        {/* Header */}
        <div className="mb-20">
          <span className="block text-[11px] uppercase tracking-[0.35em] text-[#c7a86d]">
            Industries
          </span>

          <h2 className="mt-6 text-[clamp(2.5rem,6vw,5.5rem)] font-extralight leading-[1] tracking-tight">
            Vertical expertise,
            <br />
            <span className="italic text-[#c7a86d]">not generalism.</span>
          </h2>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {industries.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                className="
                  group relative rounded-2xl
                  border border-white/10
                  bg-white/[0.02]
                  p-7
                  transition-all duration-500
                  hover:border-[#c7a86d]/40
                  hover:bg-white/[0.04]
                "
              >
                {/* Soft hover glow */}
                <div className="
                  absolute inset-0 opacity-0
                  group-hover:opacity-100
                  transition-opacity duration-500
                  bg-[radial-gradient(circle_at_top,rgba(199,168,109,0.12),transparent_70%)]
                " />

                <div className="relative z-10">
                  <Icon
                    size={22}
                    className="
                      text-[#c7a86d]
                      mb-8
                      opacity-90
                      transition-transform duration-500
                      group-hover:scale-110
                    "
                  />

                  <h3 className="
                    text-[22px]
                    font-light
                    tracking-tight
                    mb-2
                    transition-colors
                    group-hover:text-[#c7a86d]
                  ">
                    {item.title}
                  </h3>

                  <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500">
                    {item.projects}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}