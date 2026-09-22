'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Star, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ReputationPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="flex items-center justify-between">
        <div style={{ opacity: 0, animationDelay: '0.1s' }} className="animate-fade-in-up">
          <h1 className="text-3xl font-normal tracking-tight">Trust & Reputation</h1>
          <p className="text-gray-500">Your factual contribution to the campus network.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="p-8 text-center space-y-6 lg:col-span-1 h-fit">
          <div className="w-24 h-24 rounded-full bg-gray-100 mx-auto flex items-center justify-center border-4 border-white shadow-xl relative">
            <span className="text-3xl font-bold">4.9</span>
            <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1 rounded-full border-2 border-white">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Verified Student</h3>
            <p className="text-sm text-gray-500">Top 5% of Contributors</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-xl text-center">
              <p className="text-lg font-bold">24</p>
              <p className="text-[10px] text-gray-400 uppercase">Shares</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl text-center">
              <p className="text-lg font-bold">18</p>
              <p className="text-[10px] text-gray-400 uppercase">Helped</p>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-semibold tracking-tight">Transaction History</h3>
          {[
            { user: 'Sarah K.', item: 'ESP32 DevKit', type: 'Lent', status: 'Completed', date: '2 days ago' },
            { user: 'David L.', item: 'Linear Algebra Book', type: 'Borrowed', status: 'Completed', date: '1 week ago' },
            { user: 'Emma W.', item: 'Solder Station', type: 'Lent', status: 'Completed', date: '2 weeks ago' },
          ].map((tx, i) => (
            <Card key={i} className="p-4 flex items-center justify-between hover:border-gray-300 transition-all animate-fade-in-up" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-medium text-gray-600">
                  {tx.user[0]}
                </div>
                <div>
                  <p className="font-medium text-sm">{tx.user}</p>
                  <p className="text-xs text-gray-500">{tx.item} • {tx.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400">{tx.date}</span>
                <Badge variant="green">{tx.status}</Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
