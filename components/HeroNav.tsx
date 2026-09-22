import React from 'react';
import Link from 'next/link';
import { Network } from 'lucide-react';
import { createClientServer } from '@/lib/supabase-server';
import { signOut } from '@/app/actions/auth';

export const HeroNav = async () => {
  const supabase = await createClientServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-2">
        <Network className="w-5 h-5" />
        <span className="text-lg font-semibold">Campus Resource Network</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <a href="#features" className="text-sm text-gray-700 hover:text-black transition-colors">
          Features
        </a>
        <a href="#how-it-works" className="text-sm text-gray-700 hover:text-black transition-colors">
          How It Works
        </a>
        <a href="#about" className="text-sm text-gray-700 hover:text-black transition-colors">
          About
        </a>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link
              href="/dashboard"
              className="text-sm text-gray-700 hover:text-black transition-colors font-medium"
            >
              Dashboard
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Sign Out
              </button>
            </form>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm text-gray-700 hover:text-black transition-colors">
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Join Campus
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
