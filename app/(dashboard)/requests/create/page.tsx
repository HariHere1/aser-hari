'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { AlertCircle, Calendar, DollarSign, Package } from 'lucide-react';

export default function CreateRequestPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <div style={{ opacity: 0, animationDelay: '0.1s' }} className="animate-fade-in-up">
          <h1 className="text-4xl font-normal tracking-tight mb-2">I Need Something</h1>
          <p className="text-gray-500">Post your requirement and let the campus help you out.</p>
        </div>
      </div>

      <Card className="p-8">
        <div className="flex justify-between items-center mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                step >= i ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                {i}
              </div>
              {i < 3 && <div className={`h-px flex-1 max-w-xs ${step > i ? 'bg-black' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="space-y-4">
              <Input label="What do you need?" placeholder="e.g. ESP32 DevKit, Linear Algebra Book" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Category" placeholder="Electronics, Books, etc." />
                <Input label="Budget (Optional)" placeholder="e.g. $10 or Free" />
              </div>
            </div>
            <Button className="w-full py-4">Next Step</Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Needed From" type="date" />
              <Input label="Needed Until" type="date" />
            </div>
            <Input label="Additional Details" placeholder="Any specific condition or version?" className="h-24" />
            <div className="flex gap-4">
              <Button variant="ghost" className="flex-1 py-4" onClick={() => setStep(1)}>Back</Button>
              <Button className="flex-1 py-4" onClick={() => setStep(3)}>Next Step</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
              <h4 className="text-sm font-semibold text-gray-900">Review Your Request</h4>
              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex justify-between">
                  <span>Item:</span> <span className="font-medium text-black">ESP32 DevKit</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span> <span className="font-medium text-black">3 Days</span>
                </div>
                <div className="flex justify-between">
                  <span>Budget:</span> <span className="font-medium text-black">Free</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" className="flex-1 py-4" onClick={() => setStep(2)}>Back</Button>
              <Button className="flex-1 py-4">Publish Request</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
