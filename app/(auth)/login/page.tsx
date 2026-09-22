'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div style={{ opacity: 0, animationDelay: '0.1s' }} className="animate-fade-in-up">
            <h1 className="text-4xl font-normal tracking-tight mb-2">Welcome Back</h1>
            <p className="text-gray-500">Sign in to your campus network.</p>
          </div>
        </div>

        <Card className="p-8 shadow-2xl">
          <div className="space-y-6 animate-fade-in-up">
            <div className="space-y-4">
              <Input label="College Email" placeholder="john.doe@college.edu" />
              <Input label="Password" type="password" placeholder="••••••••" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-black" /> Remember me
              </label>
              <a href="#" className="text-black font-medium hover:underline">Forgot Password?</a>
            </div>
            <Button className="w-full py-4">Login</Button>
            <p className="text-center text-sm text-gray-500">
              Don't have an account? <a href="/signup" className="text-black font-medium underline">Sign up</a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
