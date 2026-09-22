'use client';

import React, { useState, useEffect } from 'react';
import { HeroNav } from './HeroNav';
import { HeroContent } from './HeroContent';
import { HeroTabBar } from './HeroTabBar';
import { HeroVideoSection } from './HeroVideoSection';
import { HeroLogos } from './HeroLogos';
import { FeaturesSection, HowItWorksSection } from './LandingDetails';

export const Hero = () => {
  const [activeTab, setActiveTab] = useState('analyse');

  useEffect(() => {
    const tabs = ['analyse', 'train', 'testing', 'deploy'];
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = tabs.indexOf(prev);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div style={{ opacity: 0, animationDelay: '0.1s' }} className="animate-fade-in-up">
        <HeroNav />
      </div>

      <div className="max-w-7xl mx-auto">
        <div style={{ opacity: 0, animationDelay: '0.2s' }} className="animate-fade-in-up">
          <HeroContent />
        </div>

        <div style={{ opacity: 0, animationDelay: '0.3s' }} className="animate-fade-in-up">
          <HeroTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div style={{ opacity: 0, animationDelay: '0.4s' }} className="animate-fade-in-up">
          <HeroVideoSection activeTab={activeTab} />
        </div>

        <div style={{ opacity: 0, animationDelay: '0.5s' }} className="animate-fade-in-up">
          <HeroLogos />
        </div>
      </div>

      {/* Extended Landing Page Sections */}
      <FeaturesSection />
      <HowItWorksSection />

      {/* Final CTA Section */}
      <section className="py-24 bg-white text-center px-6">
        <div style={{ opacity: 0, animationDelay: '0.1s' }} className="animate-fade-in-up max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-normal tracking-tight mb-6">Ready to simplify <br />your campus life?</h2>
          <p className="text-gray-600 text-lg mb-10">Join thousands of students already sharing and connecting.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-black text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all w-full sm:w-auto">
              Get Started Free
            </button>
            <button className="bg-white text-black border border-gray-200 px-10 py-4 rounded-full text-lg font-medium hover:bg-gray-50 transition-all w-full sm:w-auto">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
