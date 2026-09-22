'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Code, PenTool, Camera, Cpu } from 'lucide-react';

const MOCK_SKILLS = [
  { id: '1', user: 'Sarah K.', skill: 'Python & ML', level: 'Expert', rate: 'Free', color: 'purple' },
  { id: '2', user: 'James W.', skill: 'PCB Design', level: 'Intermediate', rate: 'Exchange', color: 'purple' },
  { id: '3', user: 'Leo M.', skill: 'Video Editing', level: 'Expert', rate: 'Paid', color: 'purple' },
];

export default function MySkillsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="flex items-center justify-between">
        <div style={{ opacity: 0, animationDelay: '0.1s' }} className="animate-fade-in-up">
          <h1 className="text-3xl font-normal tracking-tight">My Skill Profile</h1>
          <p className="text-gray-500">Manage the expertise you offer to the network.</p>
        </div>
        <Button>Add New Skill</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User's own skills */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'Flutter', level: 'Expert', rate: 'Exchange', icon: <Code className="w-5 h-5" /> },
              { name: 'Arduino', level: 'Intermediate', rate: 'Free', icon: <Cpu className="w-5 h-5" /> },
            ].map((skill, i) => (
              <Card key={skill.name} style={{ opacity: 0, animationDelay: `${0.2 + i * 0.1}s` }} className="p-6 animate-fade-in-up group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2">
                  <Badge variant="purple">{skill.rate}</Badge>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                  {skill.icon}
                </div>
                <h3 className="font-semibold text-lg mb-1">{skill.name}</h3>
                <p className="text-sm text-gray-500">{skill.level}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Skill Suggestions */}
        <div style={{ opacity: 0, animationDelay: '0.4s' }} className="animate-fade-in-up">
          <Card className="p-6 space-y-6">
            <h3 className="font-semibold text-lg">Recommended for You</h3>
            <div className="space-y-4">
              {MOCK_SKILLS.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div>
                    <p className="text-sm font-medium">{skill.skill}</p>
                    <p className="text-xs text-gray-400">{skill.user}</p>
                  </div>
                  <Badge variant="gray">{skill.rate}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
