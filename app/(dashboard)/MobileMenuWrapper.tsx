'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function MobileMenuWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden p-2 text-gray-600"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-16 md:hidden animate-fade-in-overlay">
          <div className="flex flex-col p-6 gap-6">
            <a href="/dashboard/resources" className="text-lg font-medium py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>Resources</a>
            <a href="/dashboard/requests" className="text-lg font-medium py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>I Need</a>
            <a href="/dashboard/rides" className="text-lg font-medium py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>Rides</a>
            <a href="/dashboard/skills" className="text-lg font-medium py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>Skills</a>
            <a href="/dashboard/profile" className="text-lg font-medium py-2" onClick={() => setIsOpen(false)}>My Profile</a>
          </div>
        </div>
      )}
    </>
  );
}
