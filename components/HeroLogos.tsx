'use client';

import React, { useEffect, useState } from 'react';

export interface LogoCloudItem {
  name: string;
  shortName: string;
  imageSrc?: string;
  className?: string;
}

const LOGO_SETS: LogoCloudItem[][] = [
  [
    { name: 'University of Kerala', shortName: 'Kerala University' },
    { name: 'Mahatma Gandhi University', shortName: 'MG University' },
    { name: 'University of Calicut', shortName: 'Calicut University' },
    { name: 'APJ Abdul Kalam Technological University', shortName: 'KTU' },
    { name: 'Cochin University of Science and Technology', shortName: 'CUSAT' },
  ],
  [
    { name: 'National Institute of Technology Calicut', shortName: 'NIT Calicut' },
    { name: 'Kannur University', shortName: 'Kannur University' },
    { name: 'Amrita Vishwa Vidyapeetham', shortName: 'Amrita' },
    { name: 'Indian Institute of Space Science and Technology', shortName: 'IIST' },
    { name: 'Kerala Agricultural University', shortName: 'KAU' },
  ],
];

export const HeroLogos = () => {
  const [setIndex, setSetIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener('change', updateMotion);
    return () => media.removeEventListener('change', updateMotion);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => setSetIndex((index) => (index + 1) % LOGO_SETS.length), 2000);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  return (
    <section className="mt-24 mb-12 overflow-hidden px-6" aria-label="Trusted universities">
      <h2 className="mb-8 text-center text-sm font-semibold tracking-[0.18em] text-black">Trusted by the best</h2>
      <div className="mx-auto grid max-w-6xl grid-cols-5 gap-3 overflow-x-auto pb-2 sm:gap-6">
        {LOGO_SETS[setIndex].map((logo, index) => (
          <div key={`${logo.name}-${setIndex}`} className={`min-w-[132px] text-center text-xs text-black sm:min-w-0 sm:text-sm ${logo.className ?? ''} ${reducedMotion ? '' : 'logo-incoming'}`} style={{ animationDelay: `${index * 80}ms` }} title={logo.name}>
            {logo.imageSrc ? <img src={logo.imageSrc} alt={logo.name} className="mx-auto h-9 w-auto object-contain" /> : <span className="font-semibold leading-tight">{logo.shortName}</span>}
          </div>
        ))}
      </div>
    </section>
  );
};
