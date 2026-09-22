'use client';

import React from 'react';
import { Search, Filter, CheckCircle2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

export default function BrowseRequestsPage() {
  const mockRequests = [
    {
      id: 1,
      user: 'David L.',
      item: 'Arduino Uno R3',
      duration: '2 days',
      budget: 'Free',
      category: 'Electronics',
      urgency: 'High',
      time: '10m ago'
    },
    {
      id: 2,
      user: 'Emma W.',
      item: 'Psychology 101 Textbook',
      duration: '1 semester',
      budget: '$15',
      category: 'Books',
      urgency: 'Medium',
      time: '1h ago'
    },
    {
      id: 3,
      user: 'Chris P.',
      item: 'Sony A7III Lens',
      duration: '1 weekend',
      budget: 'Paid',
      category: 'Photography',
      urgency: 'Low',
      time: '4h ago'
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-normal tracking-tight">Campus Needs</h1>
          <p className="text-gray-500">See what your fellow students are looking for.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" className="flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter
          </Button>
          <Button size="sm">Post a Need</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Filters Sidebar */}
        <div className="space-y-6">
          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <Input placeholder="Filter by item..." />
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Categories</p>
                {['Electronics', 'Books', 'Software', 'Tools', 'Rides'].map(cat => (
                  <label key={cat} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-black transition-colors">
                    <input type="checkbox" className="w-4 h-4 accent-black" /> {cat}
                  </label>
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Terms</p>
                {['Free', 'Rent', 'Buy', 'Exchange'].map(term => (
                  <label key={term} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-black transition-colors">
                    <input type="checkbox" className="w-4 h-4 accent-black" /> {term}
                  </label>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Requests Feed */}
        <div className="lg:col-span-2 space-y-4">
          {mockRequests.map((req, i) => (
            <div key={req.id} style={{ opacity: 0, animationDelay: `${0.1 + i * 0.1}s` }} className="animate-fade-in-up">
              <Card className="p-6 hover:border-gray-300 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-medium text-gray-600">
                      {req.user[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{req.user}</p>
                      <p className="text-xs text-gray-400">{req.time}</p>
                    </div>
                  </div>
                  <Badge variant={req.urgency === 'High' ? 'orange' : 'gray'}>
                    {req.urgency} Urgency
                  </Badge>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-medium text-black mb-1">{req.item}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Badge variant="purple">{req.category}</Badge>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-gray-400">Budget:</span> {req.budget}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-gray-400">Duration:</span> {req.duration}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" /> I can help
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
