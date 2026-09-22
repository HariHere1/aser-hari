import React from 'react';
import { Plus, Search, MapPin, Clock, Users, ArrowRight, Car, Navigation } from 'lucide-react';

const RIDES = [
  { id: 1, from: 'Campus Gate', to: 'Ernakulam Junction', date: 'Today', time: '5:30 PM', seats: 3, price: '₹50', driver: 'Ananya M.', dept: 'CS 3rd Year', vehicle: 'Swift Dzire', rating: 4.8 },
  { id: 2, from: 'Campus', to: 'Kottayam Bus Stand', date: 'Today', time: '7:00 PM', seats: 2, price: '₹80', driver: 'Rahul K.', dept: 'ECE 4th Year', vehicle: 'Honda City', rating: 4.9 },
  { id: 3, from: 'Thrissur', to: 'Campus', date: 'Tomorrow', time: '8:00 AM', seats: 4, price: '₹60', driver: 'Priya S.', dept: 'Mech 2nd Year', vehicle: 'Wagon R', rating: 4.7 },
  { id: 4, from: 'Campus', to: 'Trivandrum Central', date: 'Tomorrow', time: '6:00 PM', seats: 1, price: '₹150', driver: 'Joel P.', dept: 'IT 3rd Year', vehicle: 'Indica', rating: 4.6 },
  { id: 5, from: 'Calicut', to: 'Campus', date: 'Sep 24', time: '7:30 AM', seats: 3, price: '₹70', driver: 'Meera V.', dept: 'Civil 1st Year', vehicle: 'Maruti Alto', rating: 5.0 },
];

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
          <button key={f} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${f === 'All' ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {f}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500">{RIDES.length} rides available</p>

      {/* Ride Cards */}
      <div className="space-y-3">
        {RIDES.map((ride) => (
          <div key={ride.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-gray-300 hover:shadow-sm transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Route */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="font-semibold text-gray-900">{ride.from}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="font-semibold text-gray-900">{ride.to}</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{ride.date} at {ride.time}</span>
                  <span className="flex items-center gap-1"><Car className="w-3.5 h-3.5" />{ride.vehicle}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{ride.seats} seat{ride.seats > 1 ? 's' : ''} left</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                    {ride.driver[0]}
                  </div>
                  <span className="text-xs text-gray-600">{ride.driver}</span>
                  <span className="text-xs text-gray-400">·</span>
                  <span className="text-xs text-gray-400">{ride.dept}</span>
                  <span className="text-xs text-gray-400">·</span>
                  <span className="text-xs text-yellow-600">★ {ride.rating}</span>
                </div>
              </div>

              {/* Price + Action */}
              <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2">
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">{ride.price}</p>
                  <p className="text-xs text-gray-400">per person</p>
                </div>
                <button className="px-5 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors whitespace-nowrap">
                  Request Seat
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Offer ride CTA */}
      <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-300 p-8 text-center">
        <Car className="w-8 h-8 text-gray-400 mx-auto mb-3" />
        <h3 className="font-semibold text-gray-900 mb-1">Going somewhere?</h3>
        <p className="text-sm text-gray-500 mb-4">Offer a ride and split fuel costs with verified campus mates.</p>
        <a href="/dashboard/rides/create">
          <button className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors">
            Offer a Ride
          </button>
        </a>
      </div>
    </div>
  );
}
