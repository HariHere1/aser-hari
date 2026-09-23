'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, Megaphone } from 'lucide-react';
import { createClient } from '@/lib/supabase';

export type Announcement = {
  id: string;
  title: string;
  body: string;
  cta_label: string | null;
  cta_url: string | null;
  emoji: string | null;
};

// Check sessionStorage dismissal for a given announcement id
function isDismissed(id: string) {
  try {
    return !!sessionStorage.getItem(`announcement_dismissed_${id}`);
  } catch {
    return false;
  }
}

function setDismissed(id: string) {
  try {
    sessionStorage.setItem(`announcement_dismissed_${id}`, '1');
  } catch { /* ignore */ }
}

export function AnnouncementBanner({ announcement: initialAnnouncement }: { announcement: Announcement | null }) {
  const [announcement, setAnnouncement] = useState<Announcement | null>(initialAnnouncement);
  const [visible, setVisible] = useState(false);

  // Show the popup if not already dismissed in this session
  const tryShow = (ann: Announcement | null) => {
    if (!ann) return;
    if (!isDismissed(ann.id)) {
      setAnnouncement(ann);
      setVisible(true);
    }
  };

  // On mount: show SSR-provided announcement if not dismissed
  useEffect(() => {
    tryShow(initialAnnouncement);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Realtime: listen for new active announcements pushed by admin
  // This fires for ALL currently-open sessions the moment admin clicks Send
  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel('announcements-live')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'announcements',
          filter: 'is_active=eq.true',
        },
        (payload) => {
          const newAnn = payload.new as Announcement;
          tryShow(newAnn);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!announcement || !visible) return null;

  const dismiss = () => {
    setDismissed(announcement.id);
    setVisible(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm animate-fade-in-overlay"
        onClick={dismiss}
      />

      {/* Modal Card — always truly centered via inline style so no Tailwind/keyframe conflict */}
      <div
        className="fixed z-[1000] animate-slide-up-overlay"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(92vw, 440px)',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="announcement-title"
      >
        <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden">
          {/* Top accent strip */}
          <div className="h-1 w-full bg-gradient-to-r from-black via-gray-700 to-gray-400" />

          <div className="p-6 sm:p-8">
            {/* Header row */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center flex-shrink-0">
                  {announcement.emoji ? (
                    <span className="text-lg leading-none">{announcement.emoji}</span>
                  ) : (
                    <Megaphone className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    From CampusNet Admin
                  </span>
                  <h2
                    id="announcement-title"
                    className="text-base sm:text-lg font-bold text-gray-900 leading-snug"
                  >
                    {announcement.title}
                  </h2>
                </div>
              </div>

              <button
                onClick={dismiss}
                className="flex-shrink-0 p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              {announcement.body}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {announcement.cta_label && announcement.cta_url && (
                <Link
                  href={announcement.cta_url}
                  onClick={dismiss}
                  className="flex-1 text-center px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-800 active:scale-95 transition-all shadow-sm"
                >
                  {announcement.cta_label}
                </Link>
              )}
              <button
                onClick={dismiss}
                className={`${
                  announcement.cta_label && announcement.cta_url
                    ? 'px-5 py-2.5 border border-gray-200 text-gray-600 hover:bg-gray-50'
                    : 'flex-1 px-5 py-2.5 bg-black text-white hover:bg-gray-800 shadow-sm'
                } text-sm font-semibold rounded-xl active:scale-95 transition-all`}
              >
                {announcement.cta_label && announcement.cta_url ? 'Dismiss' : 'Got it'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
