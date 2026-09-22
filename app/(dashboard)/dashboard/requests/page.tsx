'use client';

import React, { useState } from 'react';
import { Plus, Search, HelpCircle, Clock, Zap, BookOpen, Cpu, Car } from 'lucide-react';

const REQUESTS = [
  { id: 1, title: 'Need Arduino Uno for 2 days', category: 'Electronics', icon: Cpu, urgency: 'Urgent', user: 'Arun S.', dept: 'ECE 2nd Year', time: '3h ago', badge: 'red' },
  { id: 2, title: 'Looking for Kreyszig Calculus textbook', category: 'Books', icon: BookOpen, urgency: 'Normal', user: 'Priya R.', dept: 'Maths 1st Year', time: '5h ago', badge: 'blue' },
  { id: 3, title: 'Ride to Ernakulam on Friday evening', category: 'Rides', icon: Car, urgency: 'Normal', user: 'Joel P.', dept: 'CS 3rd Year', time: '1d ago', badge: 'orange' },
  { id: 4, title: 'Need soldering iron for a weekend project', category: 'Electronics', icon: Cpu, urgency: 'Normal', user: 'Meera V.', dept: 'ECE 4th Year', time: '1d ago', badge: 'red' },
  { id: 5, title: 'DSLR camera for college fest shoot', category: 'Equipment', icon: Zap, urgency: 'Urgent', user: 'Rahul K.', dept: 'CS 2nd Year', time: '2d ago', badge: 'purple' },
];

const BADGE_BG: Record<string, string> = {
  red: 'bg-red-100 text-red-700',
  blue: 'bg-blue-100 text-blue-700',
  orange: 'bg-orange-100 text-orange-700',
  purple: 'bg-purple-100 text-purple-700',
  green: 'bg-green-100 text-green-700',
};

export default function RequestsPage() {
  const [search, setSearch] = useState('');
  const filtered = REQUESTS.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">I Need…</h1>
          <p className="text-gray-500 text-sm mt-0.5">Help a fellow student find what they need</p>
        </div>
        <a href="/dashboard/requests/create">
          <button className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
            <Plus className="w-4 h-4" />
            Post a Need
          </button>
        </a>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search requests..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all"
        />
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {filtered.map(req => (
          <div key={req.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <req.icon className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${BADGE_BG[req.badge]}`}>
                      {req.category}
                    </span>
                    {req.urgency === 'Urgent' && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-500 text-white">
                        Urgent
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{req.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                    {req.user} · {req.dept}
                    <span className="text-gray-300">·</span>
                    <Clock className="w-3 h-3" />{req.time}
                  </p>
                </div>
              </div>
              <button className="flex-shrink-0 px-4 py-2 bg-black text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors">
                I Can Help
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
