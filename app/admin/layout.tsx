import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Shield, ArrowLeft, Users, ShieldAlert, LogOut } from 'lucide-react';
import { createClientServer } from '@/lib/supabase-server';
import { isAdmin } from '@/lib/admin';
import { signOut } from '@/app/actions/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClientServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  if (!isAdmin(user)) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-50 bg-black text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin/dashboard" className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight leading-none">CampusNet Admin</span>
                <span className="text-[10px] text-gray-400 leading-none mt-1">Moderator Portal</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1 pl-4 border-l border-gray-800">
              <Link
                href="/admin/dashboard"
                className="px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all flex items-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5" />
                Moderation
              </Link>
              <Link
                href="/admin/reports"
                className="px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all flex items-center gap-1.5"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                Reports
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="truncate max-w-[200px]">{user.email}</span>
            </div>

            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>CampusNet</span>
            </Link>

            <form action={signOut}>
              <button
                type="submit"
                className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  );
}
