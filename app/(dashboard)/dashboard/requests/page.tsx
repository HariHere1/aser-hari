'use client';

import React, { useState } from 'react';
import { Plus, Search, HelpCircle } from 'lucide-react';

export default function RequestsPage() {
  const [search, setSearch] = useState('');

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

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {['All', 'Electronics', 'Books', 'Rides', 'Equipment', 'Other'].map(cat => (
          <button
            key={cat}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              cat === 'All' ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-5">
          <HelpCircle className="w-8 h-8 text-emerald-300" />
        </div>
        <h3 className="text-base font-semibold text-gray-800 mb-2">No requests yet</h3>
        <p className="text-sm text-gray-400 mb-6 max-w-sm">
          Need something from campus? Post a request — your peers can help with resources, rides, and more.
        </p>
        <a href="/dashboard/requests/create">
          <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
            <Plus className="w-4 h-4" />
            Post a Need
          </button>
        </a>
      </div>
    </div>
  );
}
