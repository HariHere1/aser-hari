import React from 'react';
import { createClientServer } from '@/lib/supabase-server';
import { Package, Car, Lightbulb, Settings, Edit3, MessageSquare } from 'lucide-react';

export default async function ProfilePage() {
  const supabase = await createClientServer();
  const { data: { user } } = await supabase.auth.getUser();

  const displayName = user?.user_metadata?.full_name ?? user?.email?.split('@')[0] ?? 'Student';
  const initials = displayName.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase();
  const dept = user?.user_metadata?.department ?? null;
  const year = user?.user_metadata?.year ?? null;
  const studentId = user?.user_metadata?.student_id ?? null;
  const bio = user?.user_metadata?.bio ?? null;

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black text-white flex items-center justify-center text-xl sm:text-2xl font-bold flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{displayName}</h1>
                {(dept || year) && (
                  <p className="text-gray-500 text-sm mt-0.5">
                    {dept ?? 'Campus'}{year ? ` · ${year}` : ''}
                  </p>
                )}
                {studentId && <p className="text-gray-400 text-xs mt-0.5">ID: {studentId}</p>}
                <p className="text-gray-400 text-xs mt-0.5">{user?.email}</p>
              </div>
              <a href="/dashboard/profile/settings" className="flex-shrink-0">
                <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-5 mt-5">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">—</p>
                <p className="text-xs text-gray-400 mt-0.5">Rating</p>
              </div>
              <div className="w-px bg-gray-100" />
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-xs text-gray-500 mt-0.5">Exchanges</p>
              </div>
              <div className="w-px bg-gray-100" />
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-xs text-gray-500 mt-0.5">Listings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: 'My Resources', icon: Package, href: '/dashboard/resources/manage', bg: 'bg-violet-50', iconColor: 'text-violet-500' },
          { label: 'My Rides', icon: Car, href: '/dashboard/rides', bg: 'bg-amber-50', iconColor: 'text-amber-500' },
          { label: 'My Skills', icon: Lightbulb, href: '/dashboard/skills/my-skills', bg: 'bg-sky-50', iconColor: 'text-sky-500' },
        ].map(item => (
          <a key={item.label} href={item.href} className="block">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 text-center hover:border-gray-300 hover:shadow-sm transition-all group cursor-pointer">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 ${item.bg} rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform`}>
                <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${item.iconColor}`} />
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-700 leading-tight">{item.label}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Bio */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">About</h2>
          <a href="/dashboard/profile/settings" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors">
            <Edit3 className="w-3.5 h-3.5" />
            Edit
          </a>
        </div>
        {bio ? (
          <p className="text-sm text-gray-700 leading-relaxed">{bio}</p>
        ) : (
          <p className="text-sm text-gray-400 italic">
            No bio yet.{' '}
            <a href="/dashboard/profile/settings" className="underline underline-offset-2 hover:text-black transition-colors">
              Add one
            </a>{' '}
            to let people know who you are.
          </p>
        )}
      </div>

      {/* Activity */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="flex flex-col items-center justify-center text-center py-8">
          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100">
            <MessageSquare className="w-5 h-5 text-gray-300" />
          </div>
          <p className="text-sm text-gray-500 mb-4">No activity yet — start by posting a resource!</p>
          <a href="/dashboard/resources/create">
            <button className="px-5 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors">
              Post a Resource
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
