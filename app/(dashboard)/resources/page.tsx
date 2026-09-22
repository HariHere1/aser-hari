import React from 'react';
import { Plus, Search, Filter, ShoppingBag, BookOpen, Wrench, Camera, Cpu, Star, Clock } from 'lucide-react';

const RESOURCES = [
  { id: 1, title: 'ESP32 DevKit V1', category: 'Electronics', type: 'Borrow', price: 'Free', condition: 'Good', user: 'Rahul K.', dept: 'ECE 3rd Year', rating: 4.9, reviews: 12, time: '2m ago', icon: Cpu, badge: 'purple' },
  { id: 2, title: 'Calculus Textbook (Kreyszig 10th Ed)', category: 'Books', type: 'Sell', price: '₹120', condition: 'Like New', user: 'Ananya M.', dept: 'Maths 2nd Year', rating: 5.0, reviews: 3, time: '15m ago', icon: BookOpen, badge: 'blue' },
  { id: 3, title: 'DSLR Camera (Canon 200D)', category: 'Equipment', type: 'Rent', price: '₹200/day', condition: 'Excellent', user: 'Joel P.', dept: 'CS 4th Year', rating: 4.8, reviews: 7, time: '1h ago', icon: Camera, badge: 'orange' },
  { id: 4, title: 'Arduino Uno + Starter Kit', category: 'Electronics', type: 'Borrow', price: 'Free', condition: 'Good', user: 'Priya R.', dept: 'EEE 2nd Year', rating: 4.7, reviews: 5, time: '2h ago', icon: Cpu, badge: 'purple' },
  { id: 5, title: 'Engineering Drawing Kit (Full Set)', category: 'Tools', type: 'Lend', price: 'Free', condition: 'Good', user: 'Arun S.', dept: 'Civil 1st Year', rating: 4.6, reviews: 9, time: '3h ago', icon: Wrench, badge: 'green' },
  { id: 6, title: 'Data Structures (Cormen)', category: 'Books', type: 'Sell', price: '₹200', condition: 'Good', user: 'Meera V.', dept: 'CS 3rd Year', rating: 4.9, reviews: 14, time: '4h ago', icon: BookOpen, badge: 'blue' },
  { id: 7, title: 'Soldering Iron + Accessories', category: 'Tools', type: 'Borrow', price: 'Free', condition: 'Working', user: 'Kiran T.', dept: 'ECE 4th Year', rating: 4.5, reviews: 6, time: '5h ago', icon: Wrench, badge: 'green' },
  { id: 8, title: 'Scientific Calculator (Casio FX)', category: 'Equipment', type: 'Rent', price: '₹20/day', condition: 'Good', user: 'Divya N.', dept: 'Physics 2nd Year', rating: 4.8, reviews: 22, time: '6h ago', icon: ShoppingBag, badge: 'orange' },
];

const CATEGORIES = ['All', 'Books', 'Electronics', 'Equipment', 'Tools'];
const TYPES = ['All', 'Borrow', 'Sell', 'Rent', 'Lend'];

const BADGE_BG: Record<string, string> = {
  purple: 'bg-purple-100 text-purple-700',
  blue: 'bg-blue-100 text-blue-700',
  orange: 'bg-orange-100 text-orange-700',
  green: 'bg-green-100 text-green-700',
};

export default function ResourcesBrowsePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campus Resources</h1>
          <p className="text-gray-500 text-sm mt-0.5">Browse items available to borrow, buy, or rent</p>
        </div>
        <div className="flex gap-3">
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
            placeholder="Search for books, tools, equipment..."
            className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Category</span>
          </div>
          {CATEGORIES.map((cat) => (
            <button key={cat} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${cat === 'All' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {cat}
            </button>
          ))}
          <div className="w-px h-6 bg-gray-200 self-center mx-1" />
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide self-center">Type</span>
          {TYPES.map((type) => (
            <button key={type} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${type === 'All' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500">{RESOURCES.length} resources available near you</p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {RESOURCES.map((res) => (
          <div key={res.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-300 hover:shadow-md transition-all cursor-pointer group">
            <div className="h-32 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center group-hover:from-gray-100 group-hover:to-gray-200 transition-all">
              <res.icon className="w-12 h-12 text-gray-300 group-hover:text-gray-400 transition-colors" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${BADGE_BG[res.badge]}`}>{res.type}</span>
                <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{res.time}</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{res.title}</h3>
              <p className="text-xs text-gray-500 mb-3">{res.user} · {res.dept}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900">{res.price}</p>
                  <p className="text-xs text-gray-400">{res.condition} condition</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-medium text-gray-700">{res.rating}</span>
                </div>
              </div>
              <button className="w-full mt-3 py-2 bg-black text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors">
                Request
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="px-6 py-3 bg-white border border-gray-200 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
          Load More Resources
        </button>
      </div>
    </div>
  );
}
