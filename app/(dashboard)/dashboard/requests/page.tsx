import React from 'react';
import { Plus, Search, HelpCircle, Clock, AlertCircle } from 'lucide-react';
import { createClientServer } from '@/lib/supabase-server';
import type { Need } from '@/lib/database.types';

const STATUS_COLORS: Record<string, string> = {
  open: 'bg-emerald-100 text-emerald-700',
  matched: 'bg-sky-100 text-sky-700',
  closed: 'bg-gray-100 text-gray-500',
};

function NeedCard({ need }: { need: Need }) {
  const poster = need.poster;
  const statusColor = STATUS_COLORS[need.status] ?? 'bg-gray-100 text-gray-600';

  const budgetLabel =
    need.budget_min && need.budget_max
      ? `₹${need.budget_min}–₹${need.budget_max}`
      : need.budget_max
      ? `Up to ₹${need.budget_max}`
      : need.budget_min
      ? `From ₹${need.budget_min}`
      : null;

  const isUrgent =
    need.deadline &&
    new Date(need.deadline) < new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

  return (
    <a
      href={`/dashboard/requests/${need.id}`}
      className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer block group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 transition-colors">
            <HelpCircle className="w-5 h-5 text-gray-500" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColor}`}>
                {need.category?.name ?? 'General'}
              </span>
              {isUrgent && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-500 text-white flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Urgent
                </span>
              )}
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{need.title}</h3>
            {need.description && (
              <p className="text-xs text-gray-400 line-clamp-2 mb-1">{need.description}</p>
            )}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
              {poster && <span>{poster.full_name}</span>}
              {poster?.department && <span>· {poster.department}{poster.year ? ` ${poster.year}` : ''}</span>}
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(need.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
              {need.duration && (
                <span className="text-gray-500">Duration: {need.duration}</span>
              )}
              {budgetLabel && (
                <span className="font-medium text-gray-700">{budgetLabel}</span>
              )}
              {need.deadline && (
                <span className="text-amber-600">
                  Needed by {new Date(need.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </span>
              )}
            </div>
          </div>
        </div>
        <span className="flex-shrink-0 px-4 py-2 bg-black text-white text-xs font-medium rounded-lg group-hover:bg-gray-800 transition-colors">
          View & Help
        </span>
      </div>
    </a>
  );
}

const CATEGORIES_FILTER = ['All', 'Electronics', 'Books', 'Rides', 'Tools', 'Other'];

export default async function RequestsPage() {
  const supabase = await createClientServer();

  const { data: needs, error } = await supabase
    .from('needs')
    .select(`
      *,
      poster:profiles!poster_id(id, full_name, department, year, is_verified, rating),
      category:categories(id, name, slug)
    `)
    .eq('status', 'open')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error('[RequestsPage] Failed to load needs:', error);
  }

  const items = (needs ?? []) as Need[];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">I Need…</h1>
          <p className="text-gray-500 text-sm mt-0.5">Help a fellow student find what they need</p>
        </div>
        <a href="/dashboard/requests/create">
          <button className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
            <Plus className="w-4 h-4" />
            Post a Need
          </button>
        </a>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search requests..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES_FILTER.map(cat => (
          <button key={cat} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${cat === 'All' ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {cat}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          Unable to load requests. Please try refreshing.
        </div>
      )}

      {!error && items.length > 0 && (
        <p className="text-sm text-gray-500">{items.length} open request{items.length !== 1 ? 's' : ''}</p>
      )}

      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map((need) => <NeedCard key={need.id} need={need} />)}
        </div>
      ) : !error ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-5">
            <HelpCircle className="w-8 h-8 text-emerald-300" />
          </div>
          <h3 className="text-base font-semibold text-gray-800 mb-2">No requests yet</h3>
          <p className="text-sm text-gray-400 mb-6 max-w-sm">
            Need something from campus? Post a request — your peers can help.
          </p>
          <a href="/dashboard/requests/create">
            <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
              <Plus className="w-4 h-4" />
              Post a Need
            </button>
          </a>
        </div>
      ) : null}
    </div>
  );
}
