'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Circle } from 'lucide-react';

interface HeroVideoSectionProps {
  activeTab: string;
}

const SHOWCASE = {
  resources: { eyebrow: 'Resources', title: 'Find what you need, close to home.', action: 'Browse shared resources', items: ['ESP32 DevKit', 'Calculus textbook', 'DSLR camera'] },
  needs: { eyebrow: 'I Need', title: 'Ask once. Get help from your campus.', action: 'Post a request', items: ['Need an ESP32 for a project', 'Looking for a quiet study group', 'Borrow a tripod this weekend'] },
  rides: { eyebrow: 'Rides', title: 'Make the commute lighter together.', action: 'Find a ride', items: ['Campus Gate to Ernakulam', 'Hostel to Kakkanad', 'Library to Aluva'] },
  skills: { eyebrow: 'Skills', title: 'Learn from the people next door.', action: 'Explore student skills', items: ['Flutter development', 'PCB design', 'UI/UX design'] },
} as const;

export const HeroVideoSection = ({ activeTab }: HeroVideoSectionProps) => {
  const content = SHOWCASE[activeTab as keyof typeof SHOWCASE];
  const [current, setCurrent] = useState(0);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => setCurrent(0), [activeTab]);
  useEffect(() => {
    cardRefs.current[current]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [current]);
  if (!content) return null;

  return (
    <section id="showcase-panel" role="tabpanel" aria-labelledby={`tab-${activeTab}`} className="mx-4 mb-20 min-w-0 overflow-hidden rounded-[2rem] bg-[#080d18] text-white shadow-2xl sm:mx-6">
      <div className="grid min-w-0 items-center gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:p-14">
        <div className="min-w-0">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">{content.eyebrow}</p>
          <h2 className="max-w-xl text-3xl font-semibold leading-tight sm:text-5xl">{content.title}</h2>
          <button type="button" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#080d18] transition hover:bg-cyan-100">{content.action}<ArrowRight className="h-4 w-4" /></button>
        </div>
        <div className="min-w-0 overflow-hidden">
          <div className="flex min-w-0 items-stretch gap-3">
            <button type="button" aria-label="Previous card" onClick={() => setCurrent((current + content.items.length - 1) % content.items.length)} className="my-auto shrink-0 rounded-full border border-white/20 p-2 text-white/70 transition hover:bg-white/10 hover:text-white"><ArrowLeft className="h-4 w-4" /></button>
            <div className="min-w-0 flex-1 overflow-hidden">
              <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {content.items.map((item, index) => (
                  <article ref={(element) => { cardRefs.current[index] = element; }} key={item} className={`w-[82%] shrink-0 snap-center rounded-3xl border p-5 transition-all duration-500 sm:w-[68%] ${index === current ? 'border-cyan-300/60 bg-white/15' : 'border-white/10 bg-white/[0.06] opacity-45'}`}>
                    <div className="mb-12 flex items-center justify-between"><span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">CampusNet</span><Check className="h-4 w-4 text-cyan-300" /></div>
                    <h3 className="text-lg font-medium leading-snug">{item}</h3>
                    <p className="mt-3 text-sm text-white/50">Verified student listing</p>
                  </article>
                ))}
              </div>
            </div>
            <button type="button" aria-label="Next card" onClick={() => setCurrent((current + 1) % content.items.length)} className="my-auto shrink-0 rounded-full border border-white/20 p-2 text-white/70 transition hover:bg-white/10 hover:text-white"><ArrowRight className="h-4 w-4" /></button>
          </div>
          <div className="mt-5 flex justify-center gap-2" aria-label="Showcase pagination">{content.items.map((item, index) => <button key={item} type="button" aria-label={`Show ${item}`} onClick={() => setCurrent(index)} className={index === current ? 'text-cyan-300' : 'text-white/30'}><Circle className="h-2.5 w-2.5 fill-current" /></button>)}</div>
        </div>
      </div>
    </section>
  );
};
