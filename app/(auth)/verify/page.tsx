'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div style={{ opacity: 0, animationDelay: '0.1s' }} className="animate-fade-in-up">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-normal tracking-tight mb-2">Verify Your Student Status</h1>
            <p className="text-gray-500">We've sent a verification code to your college email.</p>
          </div>
        </div>

        <Card className="p-8 shadow-2xl">
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Input key={i} className="w-12 text-center py-4" maxLength={1} />
              ))}
            </div>
            <Button className="w-full py-4">Verify Now</Button>
            <p className="text-center text-sm text-gray-500">
              Didn't receive the code? <a href="#" className="text-black font-medium underline">Resend Code</a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
