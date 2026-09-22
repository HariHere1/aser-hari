'use client';

import React, { useState } from 'react';
import { Plus, Search, Users, Lightbulb } from 'lucide-react';

const CATEGORIES = ['All', 'Coding', 'Design', 'Music', 'Academic', 'Soft Skills', 'Other'];

export default function SkillsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Skills Exchange</h1>
          <p className="text-gray-500 text-sm mt-0.5">Learn from peers or share your expertise</p>
        </div>
        <a href="/dashboard/skills/my-skills">
          <button className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
            <Plus className="w-4 h-4" />
            Add a Skill
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
          placeholder="Search skills, subjects, tutors..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeCategory === cat ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-5">
          <Lightbulb className="w-8 h-8 text-sky-300" />
        </div>
        <h3 className="text-base font-semibold text-gray-800 mb-2">No skills listed yet</h3>
        <p className="text-sm text-gray-400 mb-6 max-w-sm">
          Share what you know — coding, design, music, or anything else. Help your campus mates grow.
        </p>
        <a href="/dashboard/skills/my-skills">
          <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
            <Plus className="w-4 h-4" />
            Add Your First Skill
          </button>
        </a>
      </div>
    </div>
  );
}
