'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, Mail, Lock, User, GraduationCap } from 'lucide-react';

export default function SignUpPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div style={{ opacity: 0, animationDelay: '0.1s' }} className="animate-fade-in-up">
            <h1 className="text-4xl font-normal tracking-tight mb-2">Join the Network</h1>
            <p className="text-gray-500">Create your verified student account.</p>
          </div>
        </div>

        <Card className="p-8 shadow-2xl">
          {step === 1 ? (
            <div className="space-y-6 animate-fade-in-up">
              <div className="space-y-4">
                <Input label="Full Name" placeholder="John Doe" />
                <Input label="College Email" placeholder="john.doe@college.edu" />
                <Input label="Password" type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full py-4">Continue</Button>
              <p className="text-center text-sm text-gray-500">
                Already have an account? <a href="/login" className="text-black font-medium underline">Login</a>
              </p>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in-up">
              <div className="space-y-4">
                <Input label="Student ID Number" placeholder="STU-12345678" />
                <Input label="Department" placeholder="Computer Science" />
                <Input label="Graduation Year" type="number" placeholder="2026" />
              </div>
              <Button className="w-full py-4">Complete Profile</Button>
              <Button variant="ghost" className="w-full py-2 text-sm" onClick={() => setStep(1)}>Back</Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
