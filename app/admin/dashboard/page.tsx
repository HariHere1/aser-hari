'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Users, ShieldAlert, CheckCircle2, XCircle, Search, Filter, Clock } from 'lucide-react';


export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');

  const stats = [
    { label: 'Total Students', value: '1,284', icon: <Users className="w-5 h-5" />, color: 'gray' },
    { label: 'Pending Verifications', value: '42', icon: <Clock className="w-5 h-5" />, color: 'orange' },
    { label: 'Active Reports', value: '12', icon: <ShieldAlert className="w-5 h-5" />, color: 'red' },
    { label: 'Verifieds', value: '1,210', icon: <CheckCircle2 className="w-5 h-5" />, color: 'green' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div style={{ opacity: 0, animationDelay: '0.1s' }} className="animate-fade-in-up">
          <h1 className="text-3xl font-normal tracking-tight">Admin Moderation</h1>
          <p className="text-gray-500">Oversee the campus network and ensure safety.</p>
        </div>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={stat.label} style={{ opacity: 0, animationDelay: `${0.2 + i * 0.1}s` }} className="p-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                stat.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                stat.color === 'red' ? 'bg-red-100 text-red-600' :
                stat.color === 'green' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
              }`}>
                {stat.icon}
              </div>
              <Badge variant={stat.color === 'orange' ? 'orange' : stat.color === 'green' ? 'green' : 'gray'}>
                {stat.color === 'red' ? 'Critical' : 'Stable'}
              </Badge>
            </div>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Moderation Tabs */}
      <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
        {['users', 'resources', 'reports', 'verifications'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm font-medium capitalize transition-colors ${
              activeTab === tab ? 'text-black border-b-2 border-black pb-4 -mb-4.5' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table View */}
      <Card className="overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Search users or IDs..."
              />
            </div>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filter
            </Button>
          </div>
          <Button variant="secondary" size="sm">Export CSV</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-3">Student</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Reputation</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { name: 'John Doe', dept: 'CS', status: 'Verified', rep: '4.8', color: 'green' },
                { name: 'Jane Smith', dept: 'Physics', status: 'Pending', rep: 'N/A', color: 'orange' },
                { name: 'Bob Wilson', dept: 'Math', status: 'Flagged', rep: '2.1', color: 'red' },
              ].map((user, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 font-medium">{user.name}</td>
                  <td className="px-6 py-4 text-gray-500">{user.dept}</td>
                  <td className="px-6 py-4">
                    <Badge variant={user.color as any}>{user.status}</Badge>
                  </td>
                  <td className="px-6 py-4">{user.rep}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button variant="ghost" size="sm" className="p-2 h-8 w-8 rounded-full">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2 h-8 w-8 rounded-full">
                      <XCircle className="w-4 h-4 text-red-600" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
