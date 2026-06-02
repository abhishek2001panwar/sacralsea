import React from 'react';

interface FooterLink {
  name: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const Footer: React.FC = () => {
  const sections: FooterSection[] = [
    {
      title: 'SERVICES',
      links: [
        { name: 'Brand Strategy', href: '#' },
        { name: 'Visual Identity', href: '#' },
        { name: 'Digital Marketing', href: '#' },
        { name: 'Web & Product', href: '#' },
        { name: 'Creative Strategy', href: '#' },
      ],
    },
    {
      title: 'INDUSTRIES',
      links: [
        { name: 'SaaS', href: '#' },
        { name: 'B2B', href: '#' },
        { name: 'Fintech', href: '#' },
        { name: 'E-commerce', href: '#' },
        { name: 'Healthcare', href: '#' },
      ],
    },
    {
      title: 'COMPANY',
      links: [
        { name: 'Our Work', href: '#' },
        { name: 'About', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Contact', href: '#' },
      ],
    },
  ];

  const socialLinks: FooterLink[] = [
    { name: 'INSTAGRAM', href: '#' },
    { name: 'LINKEDIN', href: '#' },
    { name: 'DRIBBBLE', href: '#' },
    { name: 'TWITTER / X', href: '#' },
  ];

  return (
    <footer className="bg-[#0b0b0a] text-[#f5f5f3] w-full px-6 md:px-12 lg:px-24 pt-10 pb-4 selection:bg-neutral-800">
      <div className="w-full">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
          
          {/* Brand/Bio Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="font-serif text-xl md:text-2xl tracking-wide font-medium">
              Sacral<span className="text-[#c5a880]">Sea</span>
            </h3>
            <p className="text-neutral-500 font-sans text-xs md:text-sm leading-relaxed max-w-sm tracking-wide">
              We build brands, campaigns, and digital experiences for companies that refuse to be ordinary.
            </p>
          </div>

          {/* Spacer for Desktop Layout structural balance */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* Navigation Links Columns */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {sections.map((section, idx) => (
              <div key={idx} className="flex flex-col gap-6">
                {/* Column Heading */}
                <h4 className="font-mono text-[10px] tracking-[0.3em] text-[#c5a880] font-semibold">
                  {section.title}
                </h4>
                
                {/* Link Items Layout */}
                <ul className="flex flex-col gap-4">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="relative group flex items-center w-fit">
                      <a 
                        href={link.href} 
                        className="text-neutral-400 font-sans text-xs md:text-sm transition-colors duration-200 hover:text-neutral-100 tracking-wide"
                      >
                        {link.name}
                      </a>
                      
                      {/* Interactive Cursor Indicator (Matches the Gold Target ring on your item) */}
                      {link.name === 'Digital Marketing' && (
                        <div className="absolute -right-8 flex items-center justify-center pointer-events-none">
                          <div className="w-4 h-4 rounded-full border border-neutral-800 flex items-center justify-center animate-pulse">
                            <div className="w-1 h-1 rounded-full bg-[#c5a880]"></div>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Bar Divider Line */}
        <div className="w-full h-[1px] bg-neutral-900/60 mb-8"></div>

        {/* Footer Sub-Bar Copyright & Socials */}
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-6">
          {/* Copyright Notice */}
          <p className="font-mono text-[10px] tracking-widest text-neutral-600">
            © 2026 SacralSea. All rights reserved.
          </p>

          {/* Social Nav Row */}
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="font-mono text-[10px] tracking-[0.2em] text-neutral-500 hover:text-[#c5a880] transition-colors duration-200"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;