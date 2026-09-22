import React from 'react';
import { BookOpen, Users, MapPin, Plus, Clock, HelpCircle, Car, Lightbulb, Package, ArrowRight } from 'lucide-react';
import { createClientServer } from '@/lib/supabase-server';

export default async function DashboardHomePage() {
  const supabase = await createClientServer();
  const { data: { user } } = await supabase.auth.getUser();

  const displayName = user?.user_metadata?.full_name ?? user?.email?.split('@')[0] ?? 'Student';
  const firstName = displayName.split(' ')[0];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const initials = displayName.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase();

  const hubs = [
    { title: 'Resources', icon: BookOpen, path: '/dashboard/resources', desc: 'Books, tools & gear', bg: 'bg-violet-50', iconColor: 'text-violet-600', border: 'hover:border-violet-200' },
    { title: 'Rides', icon: Car, path: '/dashboard/rides', desc: 'Carpool to campus', bg: 'bg-amber-50', iconColor: 'text-amber-600', border: 'hover:border-amber-200' },
    { title: 'Skills', icon: Users, path: '/dashboard/skills', desc: 'Tutoring & mentoring', bg: 'bg-sky-50', iconColor: 'text-sky-600', border: 'hover:border-sky-200' },
    { title: 'I Need', icon: HelpCircle, path: '/dashboard/requests', desc: 'Post a request', bg: 'bg-emerald-50', iconColor: 'text-emerald-600', border: 'hover:border-emerald-200' },
  ];

  const quickActions = [
    { label: 'Post a Resource', icon: Package, href: '/dashboard/resources/create', bg: 'bg-violet-100', iconColor: 'text-violet-600', hoverBg: 'hover:bg-violet-200' },
    { label: 'Offer a Ride', icon: MapPin, href: '/dashboard/rides/create', bg: 'bg-amber-100', iconColor: 'text-amber-600', hoverBg: 'hover:bg-amber-200' },
    { label: 'Add a Skill', icon: Lightbulb, href: '/dashboard/skills/my-skills', bg: 'bg-sky-100', iconColor: 'text-sky-600', hoverBg: 'hover:bg-sky-200' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            {greeting}, {firstName}! 👋
          </h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">What do you need on campus today?</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <a href="/dashboard/resources/create">
            <button className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
              <Plus className="w-4 h-4" />
              Post Resource
            </button>
          </a>
          <a href="/dashboard/requests/create">
            <button className="flex items-center gap-2 bg-white text-black border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
              <HelpCircle className="w-4 h-4" />
              Post Need
            </button>
          </a>
        </div>
      </div>

      {/* Quick Action Hubs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {hubs.map((hub) => (
          <a key={hub.title} href={hub.path} className="block">
            <div className={`bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 ${hub.border} hover:shadow-md transition-all group cursor-pointer`}>
              <div className={`w-10 h-10 sm:w-11 sm:h-11 ${hub.bg} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <hub.icon className={`w-5 h-5 ${hub.iconColor}`} />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-0.5">{hub.title}</h3>
              <p className="text-xs text-gray-500 hidden sm:block">{hub.desc}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Empty feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              Recent Listings
            </h2>
            <a href="/dashboard/resources" className="text-sm text-gray-500 hover:text-black font-medium transition-colors flex items-center gap-1">
              Browse all <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-10 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100">
              <Package className="w-7 h-7 text-gray-300" />
            </div>
            <h3 className="text-sm font-semibold text-gray-800 mb-1">No listings yet</h3>
            <p className="text-xs text-gray-400 mb-5 max-w-xs">
              Be the first to post — share a resource, offer a skill, or list a ride for your campus mates.
            </p>
            <a href="/dashboard/resources/create">
              <button className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                <Plus className="w-4 h-4" />
                Post First Listing
              </button>
            </a>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* User card */}
          <div className="bg-black text-white rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-base font-bold flex-shrink-0">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="font-semibold truncate">{firstName}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-xl font-bold">0</p>
                <p className="text-xs text-gray-400 mt-0.5">Exchanges</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-xl font-bold">0</p>
                <p className="text-xs text-gray-400 mt-0.5">Listings</p>
              </div>
            </div>
            <a href="/dashboard/profile" className="block w-full text-center py-2.5 bg-white text-black text-sm font-medium rounded-xl hover:bg-gray-100 transition-colors">
              View Profile
            </a>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-1">
              {quickActions.map((action) => (
                <a key={action.label} href={action.href} className={`flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group`}>
                  <div className={`w-8 h-8 ${action.bg} rounded-lg flex items-center justify-center ${action.hoverBg} transition-colors`}>
                    <action.icon className={`w-4 h-4 ${action.iconColor}`} />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">{action.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-300 ml-auto group-hover:text-gray-500 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Get started guide */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Getting Started</h3>
            <div className="space-y-3">
              {[
                { step: '1', text: 'Complete your profile', href: '/dashboard/profile/settings' },
                { step: '2', text: 'Post your first resource', href: '/dashboard/resources/create' },
                { step: '3', text: 'Browse what\'s on campus', href: '/dashboard/resources' },
              ].map((item) => (
                <a key={item.step} href={item.href} className="flex items-center gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0 group-hover:bg-black group-hover:text-white transition-colors">
                    {item.step}
                  </div>
                  <span className="text-xs text-gray-600 group-hover:text-black transition-colors">{item.text}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
