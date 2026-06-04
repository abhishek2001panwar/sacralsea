'use client';

import { ArrowRight } from 'lucide-react';

const services = [
  {
    number: '01',
    category: 'Branding',
    title: 'Brand Strategy\n& Identity',
    description:
      'From positioning and voice to visual identity systems that scale across every touchpoint.',
  },
  {
    number: '02',
    category: 'Digital Marketing',
    title: 'Performance\nMarketing',
    description:
      'SEO, paid media, content, and CRM systems that build pipeline and grow revenue measurably.',
  },
  {
    number: '03',
    category: 'Web & Product',
    title: 'Digital\nExperience',
    description:
      'Websites, web apps, and product interfaces that convert visitors into customers.',
  },
  {
    number: '04',
    category: 'Strategy',
    title: 'Creative\nStrategy',
    description:
      'Campaign ideation, creative direction, and go-to-market strategy for ambitious brands.',
  },
];

export default function ServicesSection() {
  return (
    <section id='services' className="relative bg-[#0C0C0A] text-white py-10 overflow-hidden">
      {/* Grid Background */}
      <div
        className="
          absolute inset-0
          opacity-[0.05]
          [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]
          [background-size:100px_100px]
        "
      />

      {/* Glow */}
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-[#c7a86d]/10 blur-[180px]" />

      <div className="relative z-10 px-6 md:px-14">
        {/* Header */}
        <div className="flex items-center gap-4 mb-16">

          <span className="uppercase tracking-[0.35em] text-[11px] text-[#c7a86d]">
            What We Do
          </span>
        </div>

        {/* Grid */}
        <div className="border border-[#222] grid grid-cols-1 md:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={index}
              className="
                group
                relative
                min-h-[420px]
                p-10 md:p-14
                border-[#222]
                border-r
                border-b
                hover:bg-white/[0.02]
                transition-all
                duration-500
              "
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_center,rgba(199,168,109,0.08),transparent_70%)]" />

              <div className="relative z-10">
                {/* Number */}
                <div className="flex items-center gap-4 mb-12">
                  <span className="text-[#c7a86d] text-xs tracking-[0.3em]">
                    {service.number}
                  </span>


                  <span className="text-[#c7a86d] text-xs tracking-[0.2em] uppercase">
                    {service.category}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="
                    text-4xl
                    md:text-4xl
                    font-light
                    leading-[1.1]
                    whitespace-pre-line
                    mb-8
                  "
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p className="max-w-md text-[#7f7f7f] leading-8 mb-12">
                  {service.description}
                </p>

                {/* Link */}
                <button className="flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase text-[#8c8c8c] hover:text-[#c7a86d] transition">
                  Explore
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Circle */}
       

      
      </div>
    </section>
  );
}