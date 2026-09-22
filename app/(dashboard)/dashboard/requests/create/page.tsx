'use client';

import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, CheckCircle2, AlertCircle, BookOpen, Cpu, Car, Wrench, Camera, ShoppingBag } from 'lucide-react';

const CATEGORIES = [
  { label: 'Books & Notes', value: 'books', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Electronics', value: 'electronics', icon: Cpu, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Tools & Kits', value: 'tools', icon: Wrench, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Rides', value: 'rides', icon: Car, color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: 'Equipment', value: 'equipment', icon: Camera, color: 'text-red-600', bg: 'bg-red-50' },
  { label: 'Other', value: 'other', icon: ShoppingBag, color: 'text-gray-600', bg: 'bg-gray-50' },
];

export default function CreateRequestPage() {
  const [category, setCategory] = useState('');
  const [urgency, setUrgency] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-20 space-y-4">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Need Posted!</h2>
        <p className="text-gray-500">Your request is live — someone will reach out soon.</p>
        <div className="flex justify-center gap-3 pt-2">
          <a href="/dashboard/requests" className="px-5 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors">
            View All Requests
          </a>
          <button onClick={() => setSubmitted(false)} className="px-5 py-2.5 bg-white border border-gray-200 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
            Post Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <a href="/dashboard/requests" className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:text-black hover:bg-gray-50 transition-all">
          <ArrowLeft className="w-4 h-4" />
        </a>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Post a Need</h1>
          <p className="text-sm text-gray-500 mt-0.5">Tell the campus what you are looking for</p>
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">What do you need?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CATEGORIES.map((cat) => (
              <button key={cat.value} type="button" onClick={() => setCategory(cat.value)}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${category === cat.value ? 'border-black bg-black text-white' : 'border-gray-100 hover:border-gray-300'}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${category === cat.value ? 'bg-white/10' : cat.bg}`}>
                  <cat.icon className={`w-4 h-4 ${category === cat.value ? 'text-white' : cat.color}`} />
                </div>
                <span className="text-sm font-medium">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Details</h2>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">What exactly do you need? <span className="text-red-500">*</span></label>
            <input required type="text" placeholder="e.g. Need Arduino Uno for 2 days for a project..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">More details</label>
            <textarea rows={3} placeholder="When do you need it? For how long? Any specific specs?"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Urgency</label>
              <div className="relative">
                <select value={urgency} onChange={e => setUrgency(e.target.value)}
                  className="w-full appearance-none px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all pr-10">
                  <option value="">Select urgency</option>
                  <option value="urgent">Urgent (Today/Tomorrow)</option>
                  <option value="soon">Soon (This Week)</option>
                  <option value="flexible">Flexible</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Duration needed</label>
              <input type="text" placeholder="e.g. 2 days, 1 week..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all" />
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 bg-amber-50 text-amber-700 text-xs px-4 py-3 rounded-xl border border-amber-100">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>Only verified college students can see and respond to your request. Stay safe and meet in campus public areas.</span>
        </div>

        <div className="flex gap-3">
          <a href="/dashboard/requests" className="flex-1 py-3.5 text-center text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            Cancel
          </a>
          <button type="submit" className="flex-1 py-3.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors">
            Post Need
          </button>
        </div>
      </form>
    </div>
  );
}
