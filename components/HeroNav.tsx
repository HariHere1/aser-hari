import React from 'react';
import { Star, ChevronDown } from 'lucide-react';

export const HeroNav = () => {
  return (
    <nav className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-2">
        <Star className="w-5 h-5 fill-black" />
        <span className="text-lg font-semibold">Stellar.ai</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <a href="#" className="text-sm text-gray-700 hover:text-black flex items-center gap-1 transition-colors">
          Solutions <ChevronDown className="w-4 h-4" />
        </a>
        <a href="#" className="text-sm text-gray-700 hover:text-black flex items-center gap-1 transition-colors">
          For Teams <ChevronDown className="w-4 h-4" />
        </a>
        <a href="#" className="text-sm text-gray-700 hover:text-black transition-colors">
          About Us
        </a>
        <a href="#" className="text-sm text-gray-700 hover:text-black transition-colors">
          Learn Hub
        </a>
      </div>

      <div className="flex items-center gap-6">
        <a href="#" className="text-sm text-gray-700 hover:text-black transition-colors">
          Login
        </a>
        <button className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
          Get started free
        </button>
      </div>
    </nav>
  );
};
