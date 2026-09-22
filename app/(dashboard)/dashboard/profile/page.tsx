import React from 'react';
import { createClientServer } from '@/lib/supabase-server';
import { Star, Package, Car, Lightbulb, Settings, Edit3 } from 'lucide-react';

export default async function ProfilePage() {
  const supabase = await createClientServer();
  const { data: { user } } = await supabase.auth.getUser();

  const displayName = user?.user_metadata?.full_name ?? user?.email?.split('@')[0] ?? 'Student';
  const initials = displayName.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase();
  const dept = user?.user_metadata?.department ?? 'Campus';
  const year = user?.user_metadata?.year ?? '';
  const studentId = user?.user_metadata?.student_id ?? '';

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{displayName}</h1>
                <p className="text-gray-500 text-sm mt-0.5">{dept}{year ? ` · ${year}` : ''}</p>
                {studentId && <p className="text-gray-400 text-xs mt-0.5">ID: {studentId}</p>}
                <p className="text-gray-400 text-xs mt-0.5">{user?.email}</p>
              </div>
              <a href="/dashboard/profile/settings">
                <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-5">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">4.9</p>
                <div className="flex items-center gap-1 justify-center mt-0.5">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs text-gray-500">Rating</span>
                </div>
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
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'My Resources', icon: Package, href: '/dashboard/resources/manage', color: 'bg-purple-50 text-purple-600' },
          { label: 'My Rides', icon: Car, href: '/dashboard/rides', color: 'bg-orange-50 text-orange-600' },
          { label: 'My Skills', icon: Lightbulb, href: '/dashboard/skills/my-skills', color: 'bg-blue-50 text-blue-600' },
        ].map(item => (
          <a key={item.label} href={item.href} className="block">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center hover:border-gray-300 hover:shadow-sm transition-all group cursor-pointer">
              <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-gray-700">{item.label}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Bio / About */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">About</h2>
          <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors">
            <Edit3 className="w-3.5 h-3.5" />
            Edit
          </button>
        </div>
        <p className="text-sm text-gray-500 italic">No bio yet. Add one to let people know who you are!</p>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="text-center py-8 text-gray-400">
          <Package className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p className="text-sm">No activity yet — start by posting a resource!</p>
          <a href="/dashboard/resources/create">
            <button className="mt-4 px-5 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors">
              Post a Resource
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
