import React from 'react';
import { Plus, Search, MapPin, Clock, Navigation, Car } from 'lucide-react';

export default function RidesBrowsePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campus Rides</h1>
          <p className="text-sm text-gray-500 mt-0.5">Find or offer rides to and from campus</p>
        </div>
        <a href="/dashboard/rides/create">
          <button className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
            <Plus className="w-4 h-4" />
            Offer a Ride
          </button>
        </a>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="From..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="To..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
            />
          </div>
          <button className="flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
            <Search className="w-4 h-4" />
            Search Rides
          </button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        {['All', 'Today', 'Tomorrow', 'This Week', '1 Seat', '2+ Seats'].map((f) => (
          <button key={f} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${f === 'All' ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-5">
          <Car className="w-8 h-8 text-amber-300" />
        </div>
        <h3 className="text-base font-semibold text-gray-800 mb-2">No rides listed yet</h3>
        <p className="text-sm text-gray-400 mb-6 max-w-sm">
          Going somewhere? Post a ride and split fuel costs with verified campus mates.
        </p>
        <a href="/dashboard/rides/create">
          <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
            <Plus className="w-4 h-4" />
            Offer a Ride
          </button>
        </a>
      </div>
    </div>
  );
}
