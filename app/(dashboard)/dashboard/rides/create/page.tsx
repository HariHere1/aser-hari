'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { MapPin, Calendar, Car, Users } from 'lucide-react';

export default function CreateRidePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <div style={{ opacity: 0, animationDelay: '0.1s' }} className="animate-fade-in-up">
          <h1 className="text-4xl font-normal tracking-tight mb-2">Offer a Ride</h1>
          <p className="text-gray-500">Help fellow students get to campus or home.</p>
        </div>
      </div>

      <Card className="p-8">
        <div className="space-y-6 animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Origin" placeholder="e.g. Downtown Station" />
            <Input label="Destination" placeholder="e.g. Campus North Gate" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Input label="Date" type="date" />
            <Input label="Departure Time" type="time" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Available Seats</label>
              <Input type="number" placeholder="3" />
            </div>
            <Input label="Vehicle Model" placeholder="e.g. Honda Civic" />
          </div>
          <Input label="Estimated Cost per Person" placeholder="e.g. $2 or Free" />

          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex gap-3 items-start">
            <div className="w-5 h-5 rounded-full bg-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-orange-700 leading-relaxed">
              Ride creators are responsible for passenger safety. Please ensure your vehicle is registered and insured.
            </p>
          </div>

          <Button className="w-full py-4">Publish Ride</Button>
        </div>
      </Card>
    </div>
  );
}
