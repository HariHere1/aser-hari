'use client'
import React from 'react';
import { BarChart3, BookOpen, Users, Rocket } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const TABS: Tab[] = [
  { id: 'analyse', label: 'Analyse', icon: <BarChart3 className="w-4 h-4" /> },
  { id: 'train', label: 'Train', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'testing', label: 'Testing', icon: <Users className="w-4 h-4" /> },
  { id: 'deploy', label: 'Deploy', icon: <Rocket className="w-4 h-4" /> },
];

interface HeroTabBarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export const HeroTabBar = ({ activeTab, setActiveTab }: HeroTabBarProps) => {
  return (
    <div className="flex justify-center mb-12 px-6">
      <div className="bg-gray-100 rounded-lg p-1 flex items-center">
        {/* Mobile: 2x2 Grid */}
        <div className="grid grid-cols-2 gap-1 md:hidden">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                ? 'bg-white text-black shadow-sm'
                : 'text-gray-600 hover:text-black'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Desktop: Row with Dividers */}
        <div className="hidden md:flex items-center">
          {TABS.map((tab, index) => (
            <React.Fragment key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                  ? 'bg-white text-black shadow-sm'
                  : 'text-gray-600 hover:text-black'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
              {index < TABS.length - 1 && (
                <div className="w-px h-5 bg-gray-300" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
