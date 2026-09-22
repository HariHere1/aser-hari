'use client';

import React, { useState } from 'react';
import { Plus, Search, Filter, BookOpen, Wrench, Camera, Cpu, ShoppingBag, Package } from 'lucide-react';

const CATEGORIES = ['All', 'Books', 'Electronics', 'Equipment', 'Tools'];
const TYPES = ['All', 'Borrow', 'Sell', 'Rent', 'Lend'];

export default function ResourcesBrowsePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeType, setActiveType] = useState('All');
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campus Resources</h1>
          <p className="text-gray-500 text-sm mt-0.5">Browse items available to borrow, buy, or rent</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <a href="/dashboard/resources/manage">
            <button className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              My Listings
            </button>
          </a>
          <a href="/dashboard/resources/create">
            <button className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
              <Plus className="w-4 h-4" />
              Post Resource
            </button>
          </a>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search for books, tools, equipment..."
            className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-1.5 mr-1">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Category</span>
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeCategory === cat ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
          <div className="w-px h-5 bg-gray-200 mx-1 hidden sm:block" />
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide hidden sm:inline">Type</span>
          {TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hidden sm:inline-block ${
                activeType === type ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-violet-50 rounded-2xl flex items-center justify-center mb-5">
          <Package className="w-8 h-8 text-violet-300" />
        </div>
        <h3 className="text-base font-semibold text-gray-800 mb-2">No resources listed yet</h3>
        <p className="text-sm text-gray-400 mb-6 max-w-sm">
          Your campus resource board is empty. Post the first item — a book, component, tool, or anything you can share.
        </p>
        <a href="/dashboard/resources/create">
          <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
            <Plus className="w-4 h-4" />
            Post a Resource
          </button>
        </a>
      </div>
    </div>
  );
}
