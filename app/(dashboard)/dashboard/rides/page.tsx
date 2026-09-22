import React from 'react';
import { Plus, Search, MapPin, Clock, Users, ArrowRight, Car } from 'lucide-react';
import { createClientServer } from '@/lib/supabase-server';
import type { Ride } from '@/lib/database.types';

function RideCard({ ride, currentUserId }: { ride: Ride; currentUserId?: string }) {
  const creator = ride.creator;
  const isOwner = !!currentUserId && ride.creator_id === currentUserId;

  return (
    <a
      href={`/dashboard/rides/${ride.id}`}
      className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-gray-300 hover:shadow-sm transition-all block group"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Route */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
              <span className="font-semibold text-gray-900">{ride.from_location}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
              <span className="font-semibold text-gray-900">{ride.to_location}</span>
            </div>
            {isOwner && (
              <span className="text-xs font-semibold px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                You are Host
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {new Date(ride.ride_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} at {ride.ride_time?.slice(0, 5)}
            </span>
            {ride.vehicle_type && (
              <span className="flex items-center gap-1 capitalize">
                <Car className="w-3.5 h-3.5" />
                {ride.vehicle_type}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {ride.available_seats} seat{ride.available_seats !== 1 ? 's' : ''} left
            </span>
          </div>

          {creator && (
            <div className="flex items-center gap-2 mt-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0">
                {creator.full_name[0]}
              </div>
              <span className="text-xs text-gray-600">
                {isOwner ? 'You (Driver)' : creator.full_name}
              </span>
              {creator.department && (
                <>
                  <span className="text-xs text-gray-300">·</span>
                  <span className="text-xs text-gray-400">{creator.department}{creator.year ? ` ${creator.year}` : ''}</span>
                </>
              )}
              {creator.is_verified && (
                <span className="text-xs text-emerald-600 font-medium">✓ Verified</span>
              )}
            </div>
          )}

          {ride.notes && (
            <p className="text-xs text-gray-400 mt-1.5 italic">{ride.notes}</p>
          )}
        </div>

        {/* Price + CTA */}
        <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 flex-shrink-0">
          <div className="text-right">
            <p className="text-xl font-bold text-gray-900">
              {ride.estimated_cost ? `₹${ride.estimated_cost}` : 'Free'}
            </p>
            <p className="text-xs text-gray-400">per person</p>
          </div>
          <span
            className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-colors whitespace-nowrap ${
              isOwner
                ? 'bg-gray-100 text-gray-800 border border-gray-200 group-hover:bg-gray-200'
                : 'bg-black text-white group-hover:bg-gray-800'
            }`}
          >
            {isOwner ? 'Your Ride' : ride.available_seats === 0 ? 'View Details' : 'View / Request Seat'}
          </span>
        </div>
      </div>
    </a>
  );
}

export default async function RidesBrowsePage() {
  const supabase = await createClientServer();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: rides, error } = await supabase
    .from('rides')
    .select(`
      *,
      creator:profiles!creator_id(id, full_name, department, year, is_verified, rating, avatar_url)
    `)
    .eq('status', 'active')
    .gte('ride_date', new Date().toISOString().split('T')[0])
    .order('ride_date', { ascending: true })
    .order('ride_time', { ascending: true })
    .limit(50);

  if (error) {
    console.error('[RidesPage] Failed to load rides:', error);
  }

  const items = (rides ?? []) as Ride[];

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
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="From..." className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all" />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="To..." className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all" />
          </div>
          <button className="flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
            <Search className="w-4 h-4" />
            Search Rides
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {['All', 'Today', 'Tomorrow', 'This Week', '1 Seat', '2+ Seats'].map((f) => (
          <button key={f} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${f === 'All' ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {f}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          Unable to load rides. Please try refreshing.
        </div>
      )}

      {!error && items.length > 0 && (
        <p className="text-sm text-gray-500">{items.length} ride{items.length !== 1 ? 's' : ''} available</p>
      )}

      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map((ride) => <RideCard key={ride.id} ride={ride} currentUserId={user?.id} />)}
        </div>
      ) : !error ? (
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
      ) : null}
    </div>
  );
}
