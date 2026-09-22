'use client';

import React from 'react';
import { CheckCircle2, ShieldCheck, Zap, Users, BookOpen, Rocket, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export const FeaturesSection = () => {
  const features = [
    {
      title: 'Verified Student Network',
      desc: 'Exclusive access for students with valid college emails. Trust is built-in from the start.',
      icon: <ShieldCheck className="w-6 h-6" />,
      delay: '0.1s'
    },
    {
      title: 'Intelligent Matching',
      desc: 'Post your needs and let our system find the perfect resource, ride, or skill on your campus.',
      icon: <Zap className="w-6 h-6" />,
      delay: '0.2s'
    },
    {
      title: 'Factual Reputation',
      desc: 'No more guessing. See real transaction history and ratings for every student you interact with.',
      icon: <Users className="w-6 h-6" />,
      delay: '0.3s'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div style={{ opacity: 0, animationDelay: '0.1s' }} className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-normal tracking-tight mb-4">Everything you need, <br />right on your campus.</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A unified ecosystem designed to eliminate the friction of student life.
              Share resources, find rides, and swap skills effortlessly.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={f.title}
              style={{ opacity: 0, animationDelay: f.delay }}
              className="animate-fade-in-up"
            >
              <Card className="p-8 h-full hover:border-gray-300 transition-all group">
                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const HowItWorksSection = () => {
  const steps = [
    { step: '01', title: 'Post a Need', desc: 'Say "I need an ESP32" or "Need a ride to downtown".', icon: <SearchIcon /> },
    { step: '02', title: 'Get Matched', desc: 'We find students who have exactly what you need.', icon: <ZapIcon /> },
    { step: '03', title: 'Connect & Share', desc: 'Coordinate via chat and meet on campus to exchange.', icon: <UsersIcon /> },
    { step: '04', title: 'Build Trust', desc: 'Confirm the handover and update your campus reputation.', icon: <CheckCircle2 className="w-6 h-6" /> },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div style={{ opacity: 0, animationDelay: '0.1s' }} className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-normal tracking-tight mb-4">How it works</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From a simple request to a completed exchange, we've streamlined the entire process.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((s, i) => (
            <div
              key={s.step}
              style={{ opacity: 0, animationDelay: `${0.2 + i * 0.1}s` }}
              className="animate-fade-in-up relative"
            >
              <div className="text-6xl font-bold text-gray-200 absolute -top-8 -left-4 z-0">{s.step}</div>
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-4">
                  {s.icon}
                </div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Small internal icons to avoid extra imports
const SearchIcon = () => <Search className="w-6 h-6" />;
const ZapIcon = () => <Zap className="w-6 h-6" />;
const UsersIcon = () => <Users className="w-6 h-6" />;
