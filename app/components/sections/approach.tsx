'use client';

import { motion } from 'framer-motion';

const approaches = [
  {
    number: '01',
    title: 'Strategy before craft',
    description:
      'Every visual decision is rooted in a strategic one. We understand your market, buyer, and position before a single pixel is placed.',
  },
  {
    number: '02',
    title: 'Specificity over scale',
    description:
      'We take fewer clients to give more. Deep collaboration, not factory production. Your brand deserves full attention.',
  },
  {
    number: '03',
    title: 'Proof, not promises',
    description:
      'We measure everything and share it. Revenue, pipeline, brand recall - real metrics tied to real business outcomes.',
  },
  {
    number: '04',
    title: 'Built to last',
    description:
      'We design systems, not moments. Brand identities, campaign frameworks, and growth infrastructure that compound value over years.',
  },
];

export default function OurApproach() {
  return (
    <section id='approach' className="relative bg-[#0C0C0A] text-white py-32 overflow-hidden">

      {/* Soft Grid */}
      <div className="absolute inset-0 opacity-[0.03]
        [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
        [background-size:140px_140px]"
      />

      {/* Ambient Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px]
        bg-[#c7a86d]/10 blur-[200px]"
      />

      {/* Noise (subtle only) */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/noise.png')]" />

      <div className="relative z-10 px-6 md:px-14 max-w-[1500px] mx-auto">

        {/* Header */}
        <div className="mb-24">
          <span className="uppercase tracking-[0.4em] text-[11px] text-[#c7a86d]">
            Our Approach
          </span>

          <h2 className="mt-8 text-[clamp(3rem,6vw,6.5rem)] leading-[0.95] font-light">
            We build for
            <br />
            <span className="italic text-[#c7a86d]">outcomes,</span>
            <br />
            not outputs.
          </h2>

          <p className="mt-10 max-w-2xl text-zinc-400 text-lg leading-relaxed">
            Most agencies optimise for deliverables. We optimise for
            growth, recognition, and brand equity that compounds over time.
          </p>
        </div>

        {/* Timeline Style Layout */}
        <div className="relative">

          {/* vertical line */}
          <div className="absolute left-[34px] top-0 bottom-0 w-px bg-white/10" />

          {approaches.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="
                relative flex gap-10 py-12
                group
              "
            >

              {/* dot */}
              <div className="relative z-10">
                <div className="
                  w-4 h-4 rounded-full
                  border border-[#c7a86d]
                  bg-[#0C0C0A]
                  group-hover:scale-125
                  transition-transform duration-500
                ">
                  <div className="w-1.5 h-1.5 bg-[#c7a86d] rounded-full mx-auto mt-[4px]" />
                </div>
              </div>

              {/* content */}
              <div className="max-w-3xl">

                <span className="text-[#c7a86d] text-xs tracking-[0.35em]">
                  {item.number}
                </span>

                <h3 className="
                  mt-3 text-2xl md:text-3xl
                  font-light
                  tracking-tight
                  group-hover:text-[#c7a86d]
                  transition-colors duration-500
                ">
                  {item.title}
                </h3>

                <p className="mt-4 text-zinc-400 leading-relaxed text-[15px]">
                  {item.description}
                </p>

              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}