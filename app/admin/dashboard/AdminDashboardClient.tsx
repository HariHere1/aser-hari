'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { 
  Users, 
  CheckCircle2, 
  ShieldAlert, 
  Search, 
  Package, 
  Car, 
  Lightbulb, 
  HelpCircle, 
  ShieldCheck, 
  Trash2, 
  ExternalLink,
  Loader2,
  Phone,
  Megaphone,
  BellOff,
  Send,
} from 'lucide-react';
import { toggleVerifyStudent, deleteListingAdmin, sendAnnouncement, deactivateAnnouncement } from '@/app/actions/admin';

interface AdminDashboardClientProps {
  initialStudents: any[];
  initialResources: any[];
  initialRides: any[];
  initialNeeds: any[];
  initialSkills: any[];
  reportsCount: number;
}

export function AdminDashboardClient({
  initialStudents,
  initialResources,
  initialRides,
  initialNeeds,
  initialSkills,
  reportsCount,
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<'students' | 'resources' | 'rides' | 'needs' | 'skills'>('students');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Broadcast state
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastBody, setBroadcastBody] = useState('');
  const [broadcastEmoji, setBroadcastEmoji] = useState('📢');
  const [broadcastCtaLabel, setBroadcastCtaLabel] = useState('');
  const [broadcastCtaUrl, setBroadcastCtaUrl] = useState('');
  const [broadcastStatus, setBroadcastStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [broadcastError, setBroadcastError] = useState<string | null>(null);

  // Filter lists based on search
  const q = searchQuery.toLowerCase().trim();

  const filteredStudents = initialStudents.filter(s => 
    !q || 
    s.full_name?.toLowerCase().includes(q) ||
    s.student_id?.toLowerCase().includes(q) ||
    s.department?.toLowerCase().includes(q)
  );

  const filteredResources = initialResources.filter(r =>
    !q ||
    r.title?.toLowerCase().includes(q) ||
    r.owner?.full_name?.toLowerCase().includes(q)
  );

  const filteredRides = initialRides.filter(rd =>
    !q ||
    rd.origin?.toLowerCase().includes(q) ||
    rd.destination?.toLowerCase().includes(q) ||
    rd.creator?.full_name?.toLowerCase().includes(q)
  );

  const filteredNeeds = initialNeeds.filter(n =>
    !q ||
    n.title?.toLowerCase().includes(q) ||
    n.poster?.full_name?.toLowerCase().includes(q)
  );

  const filteredSkills = initialSkills.filter(sk =>
    !q ||
    sk.title?.toLowerCase().includes(q) ||
    sk.owner?.full_name?.toLowerCase().includes(q)
  );

  const handleToggleVerify = (studentId: string, currentStatus: boolean, studentName: string) => {
    startTransition(async () => {
      const res = await toggleVerifyStudent(studentId, currentStatus);
      if (res.success) {
        setActionMessage(`Updated verification for ${studentName}`);
        setTimeout(() => setActionMessage(null), 3000);
      }
    });
  };

  const handleDeleteListing = (type: 'resource' | 'need' | 'ride' | 'skill', id: string, title: string) => {
    if (!confirm(`Are you sure you want to remove listing "${title}"?`)) return;
    startTransition(async () => {
      const res = await deleteListingAdmin(type, id);
      if (res.success) {
        setActionMessage(`Removed listing "${title}"`);
        setTimeout(() => setActionMessage(null), 3000);
      }
    });
  };

  const handleSendAnnouncement = async () => {
    if (!broadcastTitle.trim() || !broadcastBody.trim()) return;
    setBroadcastStatus('sending');
    setBroadcastError(null);
    const res = await sendAnnouncement({
      title: broadcastTitle,
      body: broadcastBody,
      emoji: broadcastEmoji,
      cta_label: broadcastCtaLabel,
      cta_url: broadcastCtaUrl,
    });
    if (res.success) {
      setBroadcastStatus('success');
      setTimeout(() => setBroadcastStatus('idle'), 4000);
    } else {
      setBroadcastStatus('error');
      setBroadcastError(res.error ?? 'Something went wrong.');
    }
  };

  const handleDeactivate = async () => {
    setBroadcastStatus('sending');
    const res = await deactivateAnnouncement();
    if (res.success) {
      setBroadcastStatus('idle');
      setActionMessage('Announcement deactivated — popup removed for all users.');
      setTimeout(() => setActionMessage(null), 4000);
    }
  };

  const verifiedCount = initialStudents.filter(s => s.is_verified).length;
  const totalListings = initialResources.length + initialRides.length + initialNeeds.length + initialSkills.length;

  return (
    <div className="space-y-10">
      {/* Hero-style Section Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-gray-300 rounded-full text-xs font-medium text-black bg-white shadow-2xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-black" />
          <span>Verified Student-Only Ecosystem Oversight</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-normal leading-[1.15] tracking-tight text-black">
          Moderation Console.<br />
          <span className="gradient-text">Real-Time Campus Safety.</span>
        </h1>

        <p className="text-base text-gray-600 max-w-2xl">
          Oversee verified student profiles, moderate physical resources, ride offers, and campus skill collaborations in real time.
        </p>

        {actionMessage && (
          <div className="px-4 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium rounded-xl inline-flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {actionMessage}
          </div>
        )}
      </div>

      {/* Broadcast Notification Panel */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
            <Megaphone className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900">Broadcast Notification</h2>
            <p className="text-xs text-gray-500">Send a popup announcement to all logged-in users</p>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="space-y-4">
            {/* Emoji + Title */}
            <div className="flex gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Icon</label>
                <input
                  type="text"
                  value={broadcastEmoji}
                  onChange={(e) => setBroadcastEmoji(e.target.value)}
                  maxLength={2}
                  className="w-14 h-10 text-center text-xl border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors bg-gray-50"
                  placeholder="📢"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Title <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  placeholder="e.g. Add your WhatsApp number!"
                  className="h-10 px-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-900 transition-colors"
                />
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Message <span className="text-red-400">*</span></label>
              <textarea
                value={broadcastBody}
                onChange={(e) => setBroadcastBody(e.target.value)}
                placeholder="e.g. Add your phone number to your profile to receive direct WhatsApp messages from other students about your listings."
                rows={3}
                className="px-3.5 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-900 transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Optional CTA */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Button Label <span className="text-gray-400">(optional)</span></label>
                <input
                  type="text"
                  value={broadcastCtaLabel}
                  onChange={(e) => setBroadcastCtaLabel(e.target.value)}
                  placeholder="e.g. Add Phone Number"
                  className="h-10 px-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-900 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Button URL <span className="text-gray-400">(optional)</span></label>
                <input
                  type="text"
                  value={broadcastCtaUrl}
                  onChange={(e) => setBroadcastCtaUrl(e.target.value)}
                  placeholder="/dashboard/profile"
                  className="h-10 px-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-900 transition-colors"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <button
                onClick={handleSendAnnouncement}
                disabled={!broadcastTitle.trim() || !broadcastBody.trim() || broadcastStatus === 'sending'}
                className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-800 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              >
                {broadcastStatus === 'sending' ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                {broadcastStatus === 'sending' ? 'Sending...' : 'Send to All Users'}
              </button>
              <button
                onClick={handleDeactivate}
                disabled={broadcastStatus === 'sending'}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 hover:text-red-600 hover:border-red-200 active:scale-95 transition-all"
              >
                <BellOff className="w-3.5 h-3.5" />
                Deactivate
              </button>
            </div>

            {/* Status feedback */}
            {broadcastStatus === 'success' && (
              <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Announcement sent! All users will see the popup on their next page load.
              </div>
            )}
            {broadcastStatus === 'error' && broadcastError && (
              <div className="px-4 py-2.5 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-xl">
                {broadcastError}
              </div>
            )}
          </div>

          {/* Live Preview */}
          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Live Preview</p>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-center justify-center min-h-[220px]">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden w-full max-w-xs">
                <div className="h-0.5 w-full bg-gradient-to-r from-black via-gray-700 to-gray-400" />
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
                      <span className="text-base leading-none">{broadcastEmoji || '📢'}</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">From CampusNet Admin</p>
                      <p className="text-sm font-bold text-gray-900 leading-snug">
                        {broadcastTitle || <span className="text-gray-300 font-normal italic">Your title here</span>}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">
                    {broadcastBody || <span className="italic text-gray-300">Your message will appear here...</span>}
                  </p>
                  <div className="flex gap-2">
                    {broadcastCtaLabel && (
                      <div className="flex-1 text-center px-3 py-2 bg-black text-white text-xs font-semibold rounded-lg">
                        {broadcastCtaLabel}
                      </div>
                    )}
                    <div className={`${broadcastCtaLabel ? '' : 'flex-1'} text-center px-3 py-2 ${broadcastCtaLabel ? 'border border-gray-200 text-gray-600' : 'bg-black text-white'} text-xs font-semibold rounded-lg`}>
                      {broadcastCtaLabel ? 'Dismiss' : 'Got it'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-gray-400 text-center">This is how users will see the popup</p>
          </div>
        </div>
      </div>

      {/* Hero Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:border-gray-200 transition-all space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Registered Students</span>
            <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center text-gray-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{initialStudents.length}</p>
          <p className="text-xs text-gray-400">Total campus student profiles</p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:border-gray-200 transition-all space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Verified Students</span>
            <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-emerald-950">{verifiedCount}</p>
          <p className="text-xs text-gray-400">{initialStudents.length > 0 ? `${Math.round((verifiedCount / initialStudents.length) * 100)}% verified rate` : '0%'}</p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:border-gray-200 transition-all space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Listings</span>
            <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center text-gray-700">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalListings}</p>
          <p className="text-xs text-gray-400">Across resources, rides, skills & needs</p>
        </div>

        <Link href="/admin/reports" className="block">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:border-gray-200 transition-all space-y-2 group cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Reports</span>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                reportsCount > 0 ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'
              }`}>
                <ShieldAlert className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{reportsCount}</p>
            <p className="text-xs text-gray-400 group-hover:text-black transition-colors flex items-center gap-1">
              <span>{reportsCount === 0 ? 'All clear · Good standing' : 'Requires moderator review'}</span>
              <ExternalLink className="w-3 h-3" />
            </p>
          </div>
        </Link>
      </div>

      {/* Hero Tab Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="bg-gray-100/90 rounded-2xl p-1.5 flex items-center overflow-x-auto border border-gray-200/60">
          <button
            onClick={() => setActiveTab('students')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'students'
                ? 'bg-white text-black shadow-sm'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Students ({initialStudents.length})</span>
          </button>

          <div className="w-px h-4 bg-gray-300 mx-1" />

          <button
            onClick={() => setActiveTab('resources')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'resources'
                ? 'bg-white text-black shadow-sm'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Resources ({initialResources.length})</span>
          </button>

          <div className="w-px h-4 bg-gray-300 mx-1" />

          <button
            onClick={() => setActiveTab('rides')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'rides'
                ? 'bg-white text-black shadow-sm'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>Rides ({initialRides.length})</span>
          </button>

          <div className="w-px h-4 bg-gray-300 mx-1" />

          <button
            onClick={() => setActiveTab('needs')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'needs'
                ? 'bg-white text-black shadow-sm'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Requests ({initialNeeds.length})</span>
          </button>

          <div className="w-px h-4 bg-gray-300 mx-1" />

          <button
            onClick={() => setActiveTab('skills')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'skills'
                ? 'bg-white text-black shadow-sm'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Skills ({initialSkills.length})</span>
          </button>
        </div>

        {/* Hero Search Bar */}
        <div className="relative w-full sm:w-80">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2.5 gap-2.5 border border-gray-200">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, ID, title..."
              className="bg-transparent text-xs text-gray-900 placeholder-gray-400 focus:outline-none w-full"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {/* TAB 1: STUDENTS */}
        {activeTab === 'students' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Student ID</th>
                  <th className="px-6 py-4">Department & Year</th>
                  <th className="px-6 py-4">WhatsApp Contact</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Moderation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                            {s.full_name?.[0]?.toUpperCase() || 'U'}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{s.full_name || 'Anonymous Student'}</p>
                            <p className="text-xs text-gray-400">ID: {s.id.slice(0, 8)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-gray-700">
                        {s.student_id ? s.student_id : <span className="text-gray-400 italic">Not set</span>}
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-600">
                        {s.department || s.year ? (
                          <span>{s.department ?? 'General'}{s.year ? ` · ${s.year}` : ''}</span>
                        ) : (
                          <span className="text-gray-400 italic">Unspecified</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {s.whatsapp_enabled ? (
                          <div>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-xs font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Enabled
                            </span>
                            {s.phone_number && (
                              <p className="text-[11px] font-mono text-gray-500 mt-1">{s.phone_number}</p>
                            )}
                          </div>
                        ) : s.phone_number ? (
                          <div>
                            <span className="text-xs text-amber-600 font-medium">Disabled (Phone added)</span>
                            <p className="text-[11px] font-mono text-gray-400 mt-1">{s.phone_number}</p>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">Not provided</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {s.is_verified ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-xs font-semibold">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                            Unverified
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleToggleVerify(s.id, s.is_verified, s.full_name)}
                          disabled={isPending}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                            s.is_verified
                              ? 'text-red-600 border border-red-200 hover:bg-red-50'
                              : 'bg-black text-white hover:bg-gray-800'
                          }`}
                        >
                          {s.is_verified ? 'Revoke Verification' : 'Verify Student'}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-400 text-sm">
                      No student records found matching "{searchQuery}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: RESOURCES */}
        {activeTab === 'resources' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Resource Listing</th>
                  <th className="px-6 py-4">Offered By</th>
                  <th className="px-6 py-4">Method & Condition</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredResources.length > 0 ? (
                  filteredResources.map((res) => (
                    <tr key={res.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-6 py-4">
                        <Link href={`/dashboard/resources/${res.id}`} className="font-semibold text-gray-900 hover:underline flex items-center gap-1.5">
                          <span>{res.title}</span>
                          <ExternalLink className="w-3 h-3 text-gray-400" />
                        </Link>
                        <p className="text-xs text-gray-400">ID: {res.id.slice(0, 8)}</p>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-800">
                        {res.owner?.full_name || 'Campus Student'}
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-600 capitalize">
                        {res.method} • {res.condition || 'Good'}
                      </td>
                      <td className="px-6 py-4 font-semibold text-xs text-gray-900">
                        {res.price ? `₹${res.price}` : 'Free'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 capitalize">
                          {res.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteListing('resource', res.id, res.title)}
                          disabled={isPending}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove Listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-400 text-sm">
                      No active resources found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: RIDES */}
        {activeTab === 'rides' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Route</th>
                  <th className="px-6 py-4">Driver</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Available Seats</th>
                  <th className="px-6 py-4">Fare</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRides.length > 0 ? (
                  filteredRides.map((ride) => (
                    <tr key={ride.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-6 py-4">
                        <Link href={`/dashboard/rides/${ride.id}`} className="font-semibold text-gray-900 hover:underline flex items-center gap-1.5">
                          <span>{ride.origin} → {ride.destination}</span>
                          <ExternalLink className="w-3 h-3 text-gray-400" />
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-800">
                        {ride.creator?.full_name || 'Campus Driver'}
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-600">
                        {ride.departure_date ? new Date(ride.departure_date).toLocaleDateString() : 'Today'} {ride.departure_time || ''}
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-gray-800">
                        {ride.available_seats} seats
                      </td>
                      <td className="px-6 py-4 font-semibold text-xs text-gray-900">
                        {ride.price ? `₹${ride.price}` : 'Shared split'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteListing('ride', ride.id, `${ride.origin} to ${ride.destination}`)}
                          disabled={isPending}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove Ride"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-400 text-sm">
                      No active rides found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: NEEDS */}
        {activeTab === 'needs' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Requested Item</th>
                  <th className="px-6 py-4">Poster</th>
                  <th className="px-6 py-4">Deadline</th>
                  <th className="px-6 py-4">Budget Range</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredNeeds.length > 0 ? (
                  filteredNeeds.map((need) => (
                    <tr key={need.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-6 py-4">
                        <Link href={`/dashboard/requests/${need.id}`} className="font-semibold text-gray-900 hover:underline flex items-center gap-1.5">
                          <span>{need.title}</span>
                          <ExternalLink className="w-3 h-3 text-gray-400" />
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-800">
                        {need.poster?.full_name || 'Campus Student'}
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-600">
                        {need.deadline ? new Date(need.deadline).toLocaleDateString() : 'Flexible'}
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-gray-900">
                        {need.budget_min || need.budget_max ? `₹${need.budget_min || 0} - ₹${need.budget_max || ''}` : 'Open'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteListing('need', need.id, need.title)}
                          disabled={isPending}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove Request"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-400 text-sm">
                      No active requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 5: SKILLS */}
        {activeTab === 'skills' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Skill Offering</th>
                  <th className="px-6 py-4">Mentor</th>
                  <th className="px-6 py-4">Experience Level</th>
                  <th className="px-6 py-4">Rate / Exchange</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredSkills.length > 0 ? (
                  filteredSkills.map((skill) => (
                    <tr key={skill.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-6 py-4">
                        <Link href={`/dashboard/skills/${skill.id}`} className="font-semibold text-gray-900 hover:underline flex items-center gap-1.5">
                          <span>{skill.title}</span>
                          <ExternalLink className="w-3 h-3 text-gray-400" />
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-800">
                        {skill.owner?.full_name || 'Campus Student'}
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-600 capitalize">
                        {skill.experience_level || 'Intermediate'}
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-gray-900">
                        {skill.rate ? `₹${skill.rate}/${skill.rate_unit}` : 'Exchange / Free'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteListing('skill', skill.id, skill.title)}
                          disabled={isPending}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove Skill"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-400 text-sm">
                      No active skills listed.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
