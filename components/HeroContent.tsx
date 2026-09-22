import React from 'react';
import { Star } from 'lucide-react';

export const HeroContent = () => {
  return (
    <div className="px-6 pt-24 pb-32 max-w-7xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 mb-8">
        <div className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center">
          <Star className="w-3 h-3 fill-black" />
        </div>
        <span className="text-sm font-medium text-black">4.9 rating from 18.3K+ users</span>
      </div>

      <h1 className="text-6xl md:text-7xl lg:text-[80px] font-normal leading-[1.1] tracking-tight mb-5">
        Work Smarter. Move Faster.<br />
        <span className="bg-gradient-to-r from-black via-gray-500 to-gray-400 bg-clip-text text-transparent">
          AI Powers You Up.
        </span>
      </h1>

      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Intelligent automation syncs with the tools you love to streamline tasks, boost output, and save time.
      </p>

      <button className="bg-black text-white px-8 py-3 rounded-full text-base font-medium hover:bg-gray-800 transition-colors mb-12">
        Begin Free Trial
      </button>
    </div>
  );
};
