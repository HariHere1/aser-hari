import React from 'react';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin, Clock, Star, ShieldCheck, HelpCircle, MessageSquare, AlertCircle } from 'lucide-react';
import { createClientServer } from '@/lib/supabase-server';
import { startConversation } from '@/app/actions/chat';

export default async function NeedDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClientServer();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: need, error } = await supabase
    .from('needs')
    .select(`
      *,
      poster:profiles!poster_id(*),
      category:categories(*)
    `)
    .eq('id', params.id)
    .single();

  if (error || !need) {
    return notFound();
  }

  const poster = need.poster;
  const isPoster = user?.id === need.poster_id;

  async function handleContact() {
    'use server';
    await startConversation({
      targetUserId: need.poster_id,
      needId: need.id,
    });
  }

  const budgetLabel =
    need.budget_min && need.budget_max
      ? `₹${need.budget_min} – ₹${need.budget_max}`
      : need.budget_max
      ? `Up to ₹${need.budget_max}`
      : need.budget_min
      ? `From ₹${need.budget_min}`
      : 'Open / Free';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <a
          href="/dashboard/requests"
          className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:text-black hover:bg-gray-50 transition-all flex items-center gap-2 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Requests</span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
            {need.image_url ? (
              <img
                src={need.image_url}
                alt={need.title}
                className="w-full h-72 object-cover"
              />
            ) : null}

            <div className="p-6 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold px-3 py-1 bg-amber-100 text-amber-800 rounded-full uppercase tracking-wider">
                  Need Request
                </span>
                {need.category && (
                  <span className="text-xs font-medium px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                    {need.category.name}
                  </span>
                )}
                {need.status && (
                  <span className="text-xs font-medium px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full capitalize">
                    {need.status}
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-bold text-gray-900">{need.title}</h1>

              <div className="flex items-baseline gap-2">
                <span className="text-sm text-gray-500">Budget:</span>
                <span className="text-2xl font-extrabold text-gray-900">{budgetLabel}</span>
              </div>

              {need.description && (
                <div className="pt-4 border-t border-gray-100">
                  <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">Details</h2>
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{need.description}</p>
                </div>
              )}

              <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-600">
                {need.duration && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Duration:</span>
                    <span className="font-semibold text-gray-800">{need.duration}</span>
                  </div>
                )}
                {need.deadline && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span className="text-amber-800 font-medium">Needed by {new Date(need.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                )}
                {need.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>Location: {need.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Posted:</span>
                  <span>{new Date(need.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Poster Info & CTA */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-5">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Posted By</h2>

            {poster ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {poster.avatar_url ? (
                    <img src={poster.avatar_url} alt={poster.full_name} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-base">
                      {poster.full_name?.[0]?.toUpperCase() ?? 'U'}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-bold text-gray-900 text-base">{poster.full_name}</p>
                      {poster.is_verified && (
                        <span title="Verified Student">
                          <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        </span>
                      )}
                    </div>
                    {poster.department && (
                      <p className="text-xs text-gray-500">
                        {poster.department} {poster.year ? `· ${poster.year}` : ''}
                      </p>
                    )}
                    {poster.college && (
                      <p className="text-xs text-gray-400 mt-0.5">{poster.college}</p>
                    )}
                  </div>
                </div>

                {poster.rating && poster.rating > 0 ? (
                  <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-xl border border-yellow-100 w-fit">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold text-yellow-900">{poster.rating.toFixed(1)}</span>
                    <span className="text-xs text-yellow-700">({poster.rating_count ?? 1} reviews)</span>
                  </div>
                ) : null}

                {poster.bio && (
                  <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-xl italic">"{poster.bio}"</p>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Campus Student</p>
            )}

            {!isPoster ? (
              <form action={handleContact}>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-black hover:bg-gray-800 text-white rounded-2xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contact Poster</span>
                </button>
              </form>
            ) : (
              <div className="p-3 bg-gray-50 border border-gray-200 text-gray-600 text-xs rounded-xl text-center">
                This is your request
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
