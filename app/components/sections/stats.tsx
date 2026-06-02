import React from 'react';

interface StatItem {
  value: string;
  label: string;
}

const StatsGrid: React.FC = () => {
  const stats: StatItem[] = [
    { value: '120+', label: 'BRANDS BUILT' },
    { value: '4.2B', label: 'REVENUE INFLUENCED' },
    { value: '18', label: 'COUNTRIES SERVED' },
    { value: '97%', label: 'CLIENT RETENTION' },
  ];

  return (
    <div className="bg-[#0b0b0a] w-full px-6 md:px-12 lg:px-24 py-16 selection:bg-neutral-800">
      <div className="max-w-7xl mx-auto border border-neutral-800/40 divide-y divide-neutral-800/40 md:divide-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:divide-x">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center justify-center text-center p-12 lg:p-16 transition-colors duration-300 hover:bg-neutral-900/20"
          >
            {/* Elegant Gold/Bronze Serif Number */}
            <span className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#c5a880] tracking-tight mb-4 font-light">
              {stat.value}
            </span>
            
            {/* Spaced Monospace Label */}
            <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-neutral-500 font-medium whitespace-nowrap">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsGrid;