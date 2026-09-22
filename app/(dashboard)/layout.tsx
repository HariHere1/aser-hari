'use client';

import React, { useState } from 'react';
import { Search, Bell, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="text-lg font-bold tracking-tight">CampusNet</a>

            <div className="hidden md:flex items-center gap-6">
              <a href="/resources" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Resources</a>
              <a href="/requests" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">I Need</a>
              <a href="/rides" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Rides</a>
              <a href="/skills" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Skills</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-black transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden cursor-pointer">
              <User className="w-5 h-5 text-gray-500" />
            </div>
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-16 md:hidden animate-fade-in-overlay">
          <div className="flex flex-col p-6 gap-6">
            <a href="/resources" className="text-lg font-medium py-2 border-b border-gray-100">Resources</a>
            <a href="/requests" className="text-lg font-medium py-2 border-b border-gray-100">I Need</a>
            <a href="/rides" className="text-lg font-medium py-2 border-b border-gray-100">Rides</a>
            <a href="/skills" className="text-lg font-medium py-2 border-b border-gray-100">Skills</a>
            <a href="/profile" className="text-lg font-medium py-2">My Profile</a>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
