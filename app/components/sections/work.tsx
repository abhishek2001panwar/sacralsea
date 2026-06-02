'use client';

import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Axion Labs',
    category: 'Branding',
    type: 'SaaS',
    size: 'large',
    gradient:
      'from-[#6a4318]/90 via-[#241406] to-black',
  },
  {
    title: 'Northpeak',
    category: 'Digital Marketing',
    type: 'B2B',
    size: 'small',
    gradient:
      'from-[#08254b] via-[#04111f] to-black',
  },
  {
    title: 'Solace AI',
    category: 'Web',
    type: 'Product',
    size: 'small',
    gradient:
      'from-[#37145a] via-[#170729] to-black',
  }
];

function ProjectCard({
  title,
  category,
  type,
  gradient,
  className,
}: {
  title: string;
  category: string;
  type: string;
  gradient: string;
  className?: string;
}) {
  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        border
        border-[#1f1f1f]
        bg-[#070707]
        hover:border-[#c7a86d]/40
        hover:-translate-y-2
        transition-all
        duration-700
        ${className}
      `}
    >
      {/* Glow */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-all
          duration-700
          bg-[radial-gradient(circle_at_center,rgba(199,168,109,0.15),transparent_70%)]
        "
      />

      {/* Gradient Area */}
      <div
        className={`
          absolute
          inset-0
          bg-gradient-to-br
          ${gradient}
          opacity-80
        `}
      />

      {/* Pattern */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.08]
          [background-image:radial-gradient(#c7a86d_1px,transparent_1px)]
          [background-size:80px_80px]
        "
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-8 lg:p-10">
        <div className="mb-5">
          <span className="text-[#c7a86d] text-[10px] uppercase tracking-[0.35em]">
            {category}
          </span>

          <span className="mx-3 text-[#8f7747]">•</span>

          <span className="text-[#c7a86d] text-[10px] uppercase tracking-[0.35em]">
            {type}
          </span>
        </div>

        <h3
          className="
            text-4xl
            lg:text-5xl
            font-light
            tracking-tight
            leading-none
            group-hover:translate-y-[-4px]
            transition-all
            duration-500
          "
        >
          {title}
        </h3>

        <div className="mt-8 flex items-center gap-2 text-[#8a8a8a] group-hover:text-[#c7a86d] transition">
          <span className="text-xs uppercase tracking-[0.3em]">
            View Case Study
          </span>

          <ArrowUpRight size={14} />
        </div>
      </div>
    </div>
  );
}

export default function SelectedWorkSection() {
  return (
    <section id='work' className="relative bg-[#0C0C0A] text-white py-10 overflow-hidden">
      {/* Grid Background */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.04]
          [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
          [background-size:120px_120px]
        "
      />

      {/* Gold Glow */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#c7a86d]/10 blur-[200px]" />

      <div className="relative z-10 px-6 md:px-14">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between mb-20">
          <div>
            <div className="flex items-center gap-4 mb-8">

              <span className="uppercase tracking-[0.35em] text-[11px] text-[#c7a86d]">
                Selected Work
              </span>
            </div>

            <h2
              className="
                text-[clamp(4rem,6vw,8rem)]
                leading-[0.88]
                tracking-tight
                font-light
              "
            >
              What we've
              <br />

              <span className="italic text-[#c7a86d]">
                built together
              </span>
            </h2>
          </div>

          <div className="mt-10 lg:mt-0 text-right text-[#8a8a8a] text-sm leading-7">
            120+ projects
            <br />
            delivered globally
          </div>
        </div>

        {/* Portfolio Layout */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Left Side */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <ProjectCard
              {...projects[0]}
              className="h-[520px]"
            />

            <ProjectCard
              {...projects[3]}
              className="h-[240px]"
            />
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-4">
            <ProjectCard
              {...projects[1]}
              className="h-[250px]"
            />

            <ProjectCard
              {...projects[2]}
              className="h-[510px]"
            />
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex justify-end mt-12">
          <button
            className="
              flex
              items-center
              gap-3
              text-[#8a8a8a]
              hover:text-[#c7a86d]
              transition-all
              uppercase
              tracking-[0.35em]
              text-xs
            "
          >
            View All Work
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}