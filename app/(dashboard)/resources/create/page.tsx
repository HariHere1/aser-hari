'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Package, Camera, MapPin, Clock } from 'lucide-react';

export default function CreateResourcePage() {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <div style={{ opacity: 0, animationDelay: '0.1s' }} className="animate-fade-in-up">
          <h1 className="text-4xl font-normal tracking-tight mb-2">List a Resource</h1>
          <p className="text-gray-500">Share your tools, books, or gear with the campus.</p>
        </div>
      </div>

      <Card className="p-8">
        <div className="flex justify-between items-center mb-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                step >= i ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                {i}
              </div>
              {i < 4 && <div className={`h-px flex-1 max-w-xs ${step > i ? 'bg-black' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="aspect-square bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors cursor-pointer">
                  <Camera className="w-8 h-8 mb-2" />
                  <span className="text-xs font-medium">Add Photos</span>
                </div>
              </div>
              <div className="space-y-4">
                <Input label="Resource Name" placeholder="e.g. TI-84 Plus CE Calculator" />
                <Input label="Category" placeholder="Electronics, Books, Art..." />
                <Input label="Description" placeholder="Detailed condition and specs" className="h-24" />
              </div>
            </div>
            <Button className="w-full py-4" onClick={() => setStep(2)}>Next Step</Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">Sharing Method</p>
                {['Buy', 'Sell', 'Rent', 'Borrow', 'Free'].map(method => (
                  <label key={method} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-black cursor-pointer transition-all group">
                    <input type="radio" name="method" className="w-4 h-4 accent-black" />
                    <span className="text-sm text-gray-600 group-hover:text-black">{method}</span>
                  </label>
                ))}
              </div>
              <div className="space-y-4">
                <Input label="Price / Terms" placeholder="e.g. $10/day or Free" />
                <Input label="Condition" placeholder="Like New, Good, Fair" />
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" className="flex-1 py-4" onClick={() => setStep(1)}>Back</Button>
              <Button className="flex-1 py-4" onClick={() => setStep(3)}>Next Step</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Pickup Location" placeholder="e.g. Library West Wing" />
              <Input label="Availability" placeholder="e.g. Weekdays 4pm-8pm" />
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
              <h4 className="text-sm font-semibold text-gray-900">Safety Notice</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Only verified students can request your resource. We recommend meeting in public campus areas for exchanges.
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" className="flex-1 py-4" onClick={() => setStep(2)}>Back</Button>
              <Button className="flex-1 py-4" onClick={() => setStep(4)}>Next Step</Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-semibold text-gray-900">Final Review</h4>
                <Badge variant="purple">Resource</Badge>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                <div className="flex justify-between text-gray-500"><span>Name:</span> <span className="text-black font-medium">TI-84 Plus CE</span></div>
                <div className="flex justify-between text-gray-500"><span>Category:</span> <span className="text-black font-medium">Electronics</span></div>
                <div className="flex justify-between text-gray-500"><span>Method:</span> <span className="text-black font-medium">Rent</span></div>
                <div className="flex justify-between text-gray-500"><span>Price:</span> <span className="text-black font-medium">$5/day</span></div>
                <div className="flex justify-between text-gray-500"><span>Condition:</span> <span className="text-black font-medium">Like New</span></div>
                <div className="flex justify-between text-gray-500"><span>Location:</span> <span className="text-black font-medium">Library</span></div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" className="flex-1 py-4" onClick={() => setStep(3)}>Back</Button>
              <Button className="flex-1 py-4">Publish Resource</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
