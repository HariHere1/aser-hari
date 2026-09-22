'use client';

import React, { useState } from 'react';
import {
  ArrowLeft, BookOpen, Cpu, Wrench, Camera, ShoppingBag,
  Upload, ChevronDown, Info, CheckCircle2,
} from 'lucide-react';

const CATEGORIES = [
  { label: 'Books & Notes', value: 'books', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Electronics', value: 'electronics', icon: Cpu, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Tools & Kits', value: 'tools', icon: Wrench, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Equipment', value: 'equipment', icon: Camera, color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: 'Other', value: 'other', icon: ShoppingBag, color: 'text-gray-600', bg: 'bg-gray-50' },
];

const LISTING_TYPES = ['Borrow', 'Sell', 'Rent', 'Lend'];
const CONDITIONS = ['Brand New', 'Like New', 'Good', 'Fair', 'Working'];

export default function CreateResourcePage() {
  const [category, setCategory] = useState('');
  const [listingType, setListingType] = useState('');
  const [condition, setCondition] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-20 space-y-4">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Resource Posted!</h2>
        <p className="text-gray-500">Your listing is now live on the campus network.</p>
        <div className="flex justify-center gap-3 pt-2">
          <a
            href="/dashboard/resources"
            className="px-5 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors"
          >
            Browse Resources
          </a>
          <button
            onClick={() => setSubmitted(false)}
            className="px-5 py-2.5 bg-white border border-gray-200 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Post Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <a
          href="/dashboard/resources"
          className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:text-black hover:bg-gray-50 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </a>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Post a Resource</h1>
          <p className="text-sm text-gray-500 mt-0.5">Share something with your campus community</p>
        </div>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
        className="space-y-6"
      >
        {/* Category */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setCategory(cat.value)}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                  category === cat.value
                    ? 'border-black bg-black text-white'
                    : 'border-gray-100 hover:border-gray-300'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  category === cat.value ? 'bg-white/10' : cat.bg
                }`}>
                  <cat.icon className={`w-4 h-4 ${category === cat.value ? 'text-white' : cat.color}`} />
                </div>
                <span className="text-sm font-medium">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Details</h2>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Item Name <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              placeholder="e.g. ESP32 DevKit V1, Kreyszig Calculus..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows={3}
              placeholder="Describe the item — edition, specs, accessories included, pickup location..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Listing Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  required
                  value={listingType}
                  onChange={(e) => setListingType(e.target.value)}
                  className="w-full appearance-none px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all pr-10"
                >
                  <option value="">Select type</option>
                  {LISTING_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Condition <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  required
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full appearance-none px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all pr-10"
                >
                  <option value="">Select condition</option>
                  {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Price
              <span className="ml-2 text-xs text-gray-400 font-normal">Leave blank for free items</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">₹</span>
              <input
                type="text"
                placeholder="e.g. 120  or  Free"
                className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Pickup Location</label>
              <input
                type="text"
                placeholder="e.g. Library, Block B..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Availability</label>
              <input
                type="text"
                placeholder="e.g. Weekdays after 4pm"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* Photo Upload */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Photos</h2>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
              dragOver ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-400'
            }`}
          >
            <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-600">Drag & drop photos here</p>
            <p className="text-xs text-gray-400 mt-1">
              or <span className="text-black underline">browse files</span> · PNG, JPG up to 5MB
            </p>
          </div>
          <div className="flex items-start gap-2 bg-blue-50 text-blue-700 text-xs px-3 py-2.5 rounded-lg">
            <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <span>Good photos get 3× more responses. Include all angles and any damage.</span>
          </div>
        </div>

        {/* Contact Preference */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Contact Preference</h2>
          <div className="grid grid-cols-3 gap-3">
            {['Chat', 'WhatsApp', 'Email'].map((method) => (
              <label
                key={method}
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <input
                  type="checkbox"
                  defaultChecked={method === 'Chat'}
                  className="w-4 h-4 accent-black"
                />
                <span className="text-sm font-medium text-gray-700">{method}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <a
            href="/dashboard/resources"
            className="flex-1 py-3.5 text-center text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </a>
          <button
            type="submit"
            className="flex-1 py-3.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors"
          >
            Post Resource
          </button>
        </div>
      </form>
    </div>
  );
}
