'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, Megaphone } from 'lucide-react';

export type Announcement = {
  id: string;
  title: string;
  body: string;
  cta_label: string | null;
  cta_url: string | null;
  emoji: string | null;
};

export function AnnouncementBanner({ announcement }: { announcement: Announcement | null }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!announcement) return;
    const key = `announcement_dismissed_${announcement.id}`;
    if (typeof window !== 'undefined' && !sessionStorage.getItem(key)) {
      setVisible(true);
    }
  }, [announcement]);

  if (!announcement || !visible) return null;

  const dismiss = () => {
    const key = `announcement_dismissed_${announcement.id}`;
    sessionStorage.setItem(key, '1');
    setVisible(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm animate-fade-in-overlay"
        onClick={dismiss}
      />

      {/* Modal Card */}
      <div
        className="fixed z-[1000] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-slide-up-overlay"
        style={{ width: 'min(92vw, 440px)' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="announcement-title"
      >
        <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden">
          {/* Top accent strip */}
          <div className="h-1 w-full bg-gradient-to-r from-black via-gray-700 to-gray-400" />

          <div className="p-7 sm:p-8">
            {/* Header row */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center flex-shrink-0">
                  {announcement.emoji ? (
                    <span className="text-lg leading-none">{announcement.emoji}</span>
                  ) : (
                    <Megaphone className="w-4.5 h-4.5 text-white" />
                  )}
                </div>
                <div>
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
