import React from 'react';
import { Plus, Search, Filter, Package, MapPin, Clock, Star } from 'lucide-react';
import { createClientServer } from '@/lib/supabase-server';
import type { Resource } from '@/lib/database.types';

const METHOD_COLORS: Record<string, string> = {
  Sell: 'bg-violet-100 text-violet-700',
  Rent: 'bg-amber-100 text-amber-700',
  Borrow: 'bg-sky-100 text-sky-700',
  Lend: 'bg-emerald-100 text-emerald-700',
  Free: 'bg-green-100 text-green-700',
};

function ResourceCard({ resource }: { resource: Resource }) {
  const owner = resource.owner;
  const img = resource.image_urls?.[0];
  const methodColor = METHOD_COLORS[resource.method ?? ''] ?? 'bg-gray-100 text-gray-700';

  return (
    <a
      href={`/dashboard/resources/${resource.id}`}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
    >
      <div>
        {/* Image */}
        <div className="h-44 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
          {img ? (
            <img
              src={img}
              alt={resource.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <Package className="w-12 h-12 text-gray-200 group-hover:text-gray-300 transition-colors" />
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${methodColor}`}>
              {resource.method ?? 'Listed'}
            </span>
            {resource.created_at && (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(resource.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </span>
            )}
          </div>

          <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{resource.title}</h3>

          {owner && (
            <p className="text-xs text-gray-500 mb-3">
              {owner.full_name}
              {owner.department ? ` · ${owner.department}` : ''}
              {owner.year ? ` ${owner.year}` : ''}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-900 text-sm">
                {resource.price ? `₹${resource.price}${resource.price_unit === 'per_day' ? '/day' : ''}` : 'Free'}
              </p>
              {resource.condition && (
                <p className="text-xs text-gray-400 capitalize">{resource.condition.replace('_', ' ')} condition</p>
              )}
            </div>
            {owner?.rating && owner.rating > 0 ? (
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-medium text-gray-700">{owner.rating.toFixed(1)}</span>
              </div>
            ) : null}
          </div>

          {resource.location && (
            <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {resource.location}
            </p>
          )}
        </div>
      </div>

      <div className="p-4 pt-0">
        <span className="block text-center w-full py-2 bg-black text-white text-xs font-medium rounded-lg group-hover:bg-gray-800 transition-colors">
          View & Request
        </span>
      </div>
    </a>
  );
}

const CATEGORIES = ['All', 'Books', 'Electronics', 'Tools', 'Lab Equipment', 'Cameras', 'Other'];
const METHODS = ['All', 'Borrow', 'Sell', 'Rent', 'Lend'];

export default async function ResourcesBrowsePage() {
  const supabase = await createClientServer();

  const { data: resources, error } = await supabase
    .from('resources')
    .select(`
      *,
      owner:profiles!owner_id(id, full_name, department, year, is_verified, rating, avatar_url),
      category:categories(id, name, slug)
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error('[ResourcesPage] Failed to load resources:', error);
  }

  const items = (resources ?? []) as Resource[];

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

      {/* Search + Filters — static UI, dynamic filtering requires client component */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search for books, tools, equipment..."
            className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-1.5 mr-1">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Type</span>
          </div>
          {METHODS.map((m) => (
            <span key={m} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${m === 'All' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          Unable to load resources. Please try refreshing.
        </div>
      )}

      {/* Count */}
      {!error && (
        <p className="text-sm text-gray-500">
          {items.length > 0 ? `${items.length} resource${items.length !== 1 ? 's' : ''} available` : ''}
        </p>
      )}

      {/* Grid or Empty */}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : !error ? (
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
      ) : null}
    </div>
  );
}
