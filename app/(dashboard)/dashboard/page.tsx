import React from 'react';
import { Search, BookOpen, Users, MapPin, Plus, TrendingUp, Clock, Star, ShoppingBag, HelpCircle, Car, Lightbulb } from 'lucide-react';
import { createClientServer } from '@/lib/supabase-server';

const MOCK_LISTINGS = [
  { type: 'Resource', icon: ShoppingBag, title: 'ESP32 DevKit V1', price: 'Free', status: 'Borrow', badge: 'purple', user: 'Rahul K.', time: '2m ago' },
  { type: 'Ride', icon: Car, title: 'Campus → Ernakulam', price: '₹50', status: '3 Seats', badge: 'orange', user: 'Ananya M.', time: '15m ago' },
  { type: 'Skill', icon: Lightbulb, title: 'React & Next.js Tutoring', price: 'Exchange', status: 'Online', badge: 'blue', user: 'Joel P.', time: '1h ago' },
  { type: 'Resource', icon: ShoppingBag, title: 'Calculus Textbook (Kreyszig)', price: '₹120', status: 'Sell', badge: 'purple', user: 'Priya R.', time: '2h ago' },
  { type: 'Need', icon: HelpCircle, title: 'Need Arduino Uno for 2 days', price: 'Borrow', status: 'Urgent', badge: 'red', user: 'Arun S.', time: '3h ago' },
];

const BADGE_COLORS: Record<string, string> = {
  purple: 'bg-purple-100 text-purple-700',
  orange: 'bg-orange-100 text-orange-700',
  blue: 'bg-blue-100 text-blue-700',
  red: 'bg-red-100 text-red-700',
  green: 'bg-green-100 text-green-700',
};

export default async function DashboardHomePage() {
  const supabase = await createClientServer();
  const { data: { user } } = await supabase.auth.getUser();

  const displayName = user?.user_metadata?.full_name ?? user?.email?.split('@')[0] ?? 'Student';
  const firstName = displayName.split(' ')[0];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const initials = displayName.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {greeting}, {firstName}! 👋
          </h1>
          <p className="text-gray-500 mt-1">What do you need on campus today?</p>
        </div>
        <div className="flex gap-3">
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

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search resources, skills, rides, or people..."
          className="w-full pl-12 pr-6 py-4 bg-white border border-gray-200 rounded-2xl text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
        />
        <button className="absolute right-3 top-3 bottom-3 px-4 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
          Search
        </button>
      </div>

      {/* Quick Action Hubs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Resources', icon: BookOpen, color: 'purple', path: '/dashboard/resources', desc: 'Books, Tools, Gear', bg: 'bg-purple-50', iconColor: 'text-purple-600' },
          { title: 'Rides', icon: MapPin, color: 'orange', path: '/dashboard/rides', desc: 'Carpool to Campus', bg: 'bg-orange-50', iconColor: 'text-orange-600' },
          { title: 'Skills', icon: Users, color: 'blue', path: '/dashboard/skills', desc: 'Tutoring, Design, Code', bg: 'bg-blue-50', iconColor: 'text-blue-600' },
          { title: 'I Need', icon: Search, color: 'green', path: '/dashboard/requests', desc: 'Post a Request', bg: 'bg-green-50', iconColor: 'text-green-600' },
        ].map((hub) => (
          <a key={hub.title} href={hub.path} className="block">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-gray-300 hover:shadow-md transition-all group cursor-pointer">
              <div className={`w-11 h-11 ${hub.bg} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <hub.icon className={`w-5 h-5 ${hub.iconColor}`} />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-0.5">{hub.title}</h3>
              <p className="text-xs text-gray-500">{hub.desc}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gray-500" />
              Active on Campus
            </h2>
            <a href="/dashboard/resources" className="text-sm text-gray-500 hover:text-black font-medium transition-colors">
              View All →
            </a>
          </div>

          <div className="space-y-3">
            {MOCK_LISTINGS.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-gray-100 p-4 hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <item.icon className="w-4 h-4 text-gray-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${BADGE_COLORS[item.badge] || 'bg-gray-100 text-gray-600'}`}>
                          {item.type}
                        </span>
                        <span className="text-xs text-gray-400">{item.user}</span>
                        <span className="text-xs text-gray-300">·</span>
                        <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{item.time}</span>
                      </div>
                      <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-gray-900">{item.price}</p>
                    <p className="text-xs text-gray-400">{item.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <a href="/dashboard/resources" className="block w-full text-center py-3 text-sm text-gray-500 hover:text-black font-medium border border-dashed border-gray-200 rounded-2xl hover:border-gray-300 transition-all">
            See all listings on campus →
          </a>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Reputation Card */}
          <div className="bg-black text-white rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-base font-bold">
                {initials}
              </div>
              <div>
                <p className="font-semibold">{firstName}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-2xl font-bold">4.9</span>
              <span className="text-sm text-gray-400">/5.0</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">0 exchanges completed</p>
            <a href="/dashboard/profile" className="block w-full text-center py-2.5 bg-white text-black text-sm font-medium rounded-xl hover:bg-gray-100 transition-colors">
              View Profile
            </a>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { msg: 'Ananya accepted your ride request', time: '2m ago', color: 'bg-green-500' },
                { msg: 'New resource matching "ESP32"', time: '1h ago', color: 'bg-purple-500' },
                { msg: 'Rahul reviewed your skill exchange', time: '3h ago', color: 'bg-blue-500' },
              ].map((alert, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${alert.color}`} />
                  <div>
                    <p className="text-xs text-gray-700 leading-relaxed">{alert.msg}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Post */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <a href="/dashboard/resources/create" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Plus className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm text-gray-700 font-medium">Post a Resource</span>
              </a>
              <a href="/dashboard/rides/create" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <Plus className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-sm text-gray-700 font-medium">Offer a Ride</span>
              </a>
              <a href="/dashboard/skills/my-skills" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Plus className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700 font-medium">Add a Skill</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
