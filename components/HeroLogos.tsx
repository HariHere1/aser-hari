import React from 'react';

const LOGOS = [
  { name: 'INTERSCOPE', style: 'font-bold tracking-widest' },
  { name: 'SPOTIFY', style: 'font-black italic' },
  { name: 'Nexera', style: 'font-medium' },
  { name: 'M3', style: 'font-serif italic font-bold' },
  { name: 'LAURA COLE', style: 'font-light tracking-tighter' },
  { name: 'vertex', style: 'font-semibold' },
];

export const HeroLogos = () => {
  return (
    <div className="mt-24 mb-12 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
      {LOGOS.map((logo) => (
        <span key={logo.name} className={`text-sm md:text-base text-gray-600 ${logo.style}`}>
          {logo.name}
        </span>
      ))}
    </div>
  );
};
