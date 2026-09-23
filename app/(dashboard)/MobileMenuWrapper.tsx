'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, BookOpen, Car, Users, HelpCircle, MessageSquare, User, Shield, LogOut } from 'lucide-react';
import { signOut } from '@/app/actions/auth';

const NAV_LINKS = [
  { href: '/dashboard/resources', label: 'Resources', icon: BookOpen },
  { href: '/dashboard/requests', label: 'I Need', icon: HelpCircle },
  { href: '/dashboard/rides', label: 'Rides', icon: Car },
  { href: '/dashboard/skills', label: 'Skills', icon: Users },
  { href: '/dashboard/chat', label: 'Chat', icon: MessageSquare },
  { href: '/dashboard/profile', label: 'My Profile', icon: User },
];

export function MobileMenuWrapper({
  isAdmin = false,
  userName,
  userEmail,
  userInitials,
}: {
  isAdmin?: boolean;
  userName?: string;
  userEmail?: string;
  userInitials?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      <button
        className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden animate-fade-in-overlay"
          onClick={close}
        />
      )}

      {/* Drawer — slides in from right */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 max-w-[80vw] bg-white shadow-2xl md:hidden flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <span className="font-bold text-gray-900">Menu</span>
          <button
            onClick={close}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User card */}
        {userName && (
          <div className="px-4 pt-4 pb-2 flex-shrink-0">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
              <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                {userInitials || 'S'}
              </div>
              <div className="min-w-0 flex-1 overflow-hidden">
                <p className="text-sm font-bold text-gray-900 truncate leading-tight">{userName}</p>
                {userEmail && (
                  <p className="text-xs text-gray-500 truncate leading-tight mt-0.5">{userEmail}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Nav links — scrollable */}
        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <div className="space-y-0.5">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={close}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-700 hover:bg-gray-100 hover:text-black transition-colors font-medium text-sm"
              >
                <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="truncate">{label}</span>
              </Link>
            ))}

            {isAdmin && (
              <div className="pt-2 mt-2 border-t border-gray-100">
                <Link
                  href="/admin/dashboard"
                  onClick={close}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition-colors font-semibold text-sm"
                >
                  <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="truncate">Admin Portal</span>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Sign out — pinned to bottom */}
        <div className="px-4 py-4 border-t border-gray-100 flex-shrink-0">
          <form action={signOut}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 active:scale-95 transition-all"
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
