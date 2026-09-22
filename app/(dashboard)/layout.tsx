import React from 'react';
import { Bell, Network } from 'lucide-react';
import { createClientServer } from '@/lib/supabase-server';
import { signOut } from '@/app/actions/auth';
import { MobileMenuWrapper } from '@/app/(dashboard)/MobileMenuWrapper';


export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClientServer();
  const { data: { user } } = await supabase.auth.getUser();

  const displayName = user?.user_metadata?.full_name ?? user?.email?.split('@')[0] ?? 'Student';
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/dashboard" className="flex items-center gap-2">
              <Network className="w-4 h-4" />
              <span className="text-base font-bold tracking-tight">CampusNet</span>
            </a>

            <div className="hidden md:flex items-center gap-6">
              <a href="/dashboard/resources" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Resources</a>
              <a href="/dashboard/requests" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">I Need</a>
              <a href="/dashboard/rides" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Rides</a>
              <a href="/dashboard/skills" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Skills</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-black transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white" />
            </button>

            {/* User avatar + sign out */}
            <form action={signOut}>
              <button
                type="submit"
                title="Sign out"
                className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold hover:bg-gray-800 transition-colors cursor-pointer"
              >
                {initials}
              </button>
            </form>

            {/* Mobile hamburger */}
            <MobileMenuWrapper />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
