'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ShieldAlert, AlertTriangle, Trash2, CheckCircle2 } from 'lucide-react';

export default function ReportsPage() {
  const mockReports = [
    {
      id: 'REP-001',
      reporter: 'Alex J.',
      target: 'Sarah K.',
      reason: 'Resource not returned',
      details: 'Borrowed a calculator 2 weeks ago, not responding to messages.',
      severity: 'High',
      status: 'Open',
    },
    {
      id: 'REP-002',
      reporter: 'Emma W.',
      target: 'David L.',
      reason: 'Fake listing',
      details: 'Item described as "Like New" but arrived broken.',
      severity: 'Medium',
      status: 'Resolved',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div style={{ opacity: 0, animationDelay: '0.1s' }} className="animate-fade-in-up">
          <h1 className="text-3xl font-normal tracking-tight">Report Center</h1>
          <p className="text-gray-500">Moderating scams, harassment, and unsafe behavior.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {mockReports.map((report, i) => (
            <div key={report.id} style={{ opacity: 0, animationDelay: `${0.2 + i * 0.1}s` }} className="animate-fade-in-up">
              <Card className="p-6 hover:border-gray-300 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{report.reason}</h3>
                      <p className="text-xs text-gray-400">Report ID: {report.id}</p>
                    </div>
                  </div>
                  <Badge variant={report.severity === 'High' ? 'orange' : 'gray'}>
                    {report.severity} Severity
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-8 mb-6 text-sm">
                  <div>
                    <p className="text-gray-400 mb-1">Reporter</p>
                    <p className="font-medium">{report.reporter}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Target</p>
                    <p className="font-medium">{report.target}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-6 italic">"{report.details}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <div className={`w-2 h-2 rounded-full ${report.status === 'Open' ? 'bg-orange-500' : 'bg-green-500'}`} />
                    {report.status}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-xs h-8">Ignore</Button>
                    <Button variant="ghost" size="sm" className="text-xs h-8 text-red-600 hover:bg-red-50">Ban User</Button>
                    <Button size="sm" className="text-xs h-8">Resolve</Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-gray-50 border-none">
            <h3 className="font-semibold mb-4">Moderation Guidelines</h3>
            <ul className="space-y-3 text-xs text-gray-600">
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                Verify identity before banning.
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                Check transaction history for patterns.
              </li>
              <li className="flex gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                Escalate scams to college security.
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
