'use client';

import React, { useState } from 'react';
import { Plus, Search, Star, Users, Code, Paintbrush, Music, Calculator } from 'lucide-react';

const SKILLS = [
  { id: 1, title: 'React & Next.js Tutoring', category: 'Coding', icon: Code, type: 'Exchange', user: 'Joel P.', dept: 'CS 4th Year', rating: 4.9, sessions: 12, badge: 'blue' },
  { id: 2, title: 'UI/UX Design Mentoring', category: 'Design', icon: Paintbrush, type: 'Free', user: 'Ananya M.', dept: 'Design 3rd Year', rating: 5.0, sessions: 7, badge: 'purple' },
  { id: 3, title: 'Guitar Lessons (Beginner)', category: 'Music', icon: Music, type: '₹200/hr', user: 'Kiran T.', dept: 'ECE 2nd Year', rating: 4.8, sessions: 20, badge: 'orange' },
  { id: 4, title: 'Advanced Mathematics Coaching', category: 'Academic', icon: Calculator, type: 'Exchange', user: 'Priya R.', dept: 'Maths 4th Year', rating: 4.7, sessions: 35, badge: 'green' },
  { id: 5, title: 'Python & Data Science', category: 'Coding', icon: Code, type: '₹150/hr', user: 'Rahul K.', dept: 'CS 3rd Year', rating: 4.9, sessions: 18, badge: 'blue' },
  { id: 6, title: 'Public Speaking & Debate', category: 'Soft Skills', icon: Users, type: 'Free', user: 'Divya N.', dept: 'English 3rd Year', rating: 4.6, sessions: 9, badge: 'red' },
];

const BADGE_BG: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700',
  purple: 'bg-purple-100 text-purple-700',
  orange: 'bg-orange-100 text-orange-700',
  green: 'bg-green-100 text-green-700',
  red: 'bg-red-100 text-red-700',
};

export default function SkillsPage() {
  const [search, setSearch] = useState('');
  const filtered = SKILLS.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(skill => (
          <div key={skill.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <skill.icon className="w-5 h-5 text-gray-600" />
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${BADGE_BG[skill.badge]}`}>
                {skill.category}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">{skill.title}</h3>
            <p className="text-xs text-gray-500 mb-3">{skill.user} · {skill.dept}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900 text-sm">{skill.type}</p>
                <p className="text-xs text-gray-400">{skill.sessions} sessions done</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-medium text-gray-700">{skill.rating}</span>
              </div>
            </div>
            <button className="w-full mt-3 py-2 bg-black text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors">
              Request Session
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
