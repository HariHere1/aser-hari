'use client'
import React from 'react';
import { ShoppingBag, HelpCircle, Car, Lightbulb } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const TABS: Tab[] = [
  { id: 'resources', label: 'Resources', icon: <ShoppingBag className="w-4 h-4" /> },
  { id: 'needs', label: 'I Need', icon: <HelpCircle className="w-4 h-4" /> },
  { id: 'rides', label: 'Rides', icon: <Car className="w-4 h-4" /> },
  { id: 'skills', label: 'Skills', icon: <Lightbulb className="w-4 h-4" /> },
];

interface HeroTabBarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export const HeroTabBar = ({ activeTab, setActiveTab }: HeroTabBarProps) => {
  const moveTab = (id: string, direction: number) => {
    const currentIndex = TABS.findIndex((tab) => tab.id === id);
    const nextIndex = (currentIndex + direction + TABS.length) % TABS.length;
    setActiveTab(TABS[nextIndex].id);
  };

  return (
    <div className="mb-12 min-w-0 overflow-x-auto px-6 pb-1">
      <div role="tablist" aria-label="CampusNet categories" className="mx-auto flex w-max min-w-full justify-center rounded-2xl border border-gray-200 bg-gray-100 p-1 md:min-w-0">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            type="button"
            aria-selected={activeTab === tab.id}
            aria-controls="showcase-panel"
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight') { event.preventDefault(); moveTab(tab.id, 1); }
              if (event.key === 'ArrowLeft') { event.preventDefault(); moveTab(tab.id, -1); }
              if (event.key === 'Home') { event.preventDefault(); setActiveTab(TABS[0].id); }
              if (event.key === 'End') { event.preventDefault(); setActiveTab(TABS[TABS.length - 1].id); }
            }}
            className={`flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all md:px-7 ${
              activeTab === tab.id ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:bg-white/70 hover:text-black'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
