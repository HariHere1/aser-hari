'use client';

import React from 'react';
import { Search, Rocket, BookOpen, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Search Section */}
      <div className="text-center max-w-3xl mx-auto py-12">
        <div style={{ opacity: 0, animationDelay: '0.1s' }} className="animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-normal tracking-tight leading-[1.1] mb-6">
            What do you <span className="text-gray-400">need today?</span>
          </h1>
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" />
            </div>
            <Input
              placeholder="Search for textbooks, rides, PCB design, etc..."
              className="pl-12 py-6 text-lg rounded-full bg-gray-100 border-none shadow-sm focus:shadow-md"
            />
            <Button className="absolute right-2 top-2 bottom-2 px-6">
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Hubs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Find Resource', icon: <BookOpen />, color: 'purple', path: '/resources', desc: 'Books, Tools, Gear' },
          { title: 'Find Ride', icon: <Rocket />, color: 'orange', path: '/rides', desc: 'Carpool to Campus' },
          { title: 'Find Skill', icon: <Users />, color: 'purple', path: '/skills', desc: 'Tutoring, Design, Code' },
          { title: 'I Need', icon: <Search />, color: 'orange', path: '/requests', desc: 'Post a Request' },
        ].map((hub, i) => (
          <div
            key={hub.title}
            style={{ opacity: 0, animationDelay: `${0.2 + i * 0.1}s` }}
            className="animate-fade-in-up"
          >
            <Card className="p-6 h-full cursor-pointer hover:border-gray-300 transition-all group">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors [&>svg]:w-6 [&>svg]:h-6 ${
                hub.color === 'purple' ? 'bg-purple-100 text-purple-600' : 'bg-orange-100 text-orange-600'
              }`}>
                {hub.icon}
              </div>
              <h3 className="text-lg font-semibold mb-1 group-hover:text-black transition-colors">{hub.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{hub.desc}</p>
              <Button variant="ghost" size="sm" className="p-0 h-auto text-xs font-bold uppercase tracking-wider">
                Explore →
              </Button>
            </Card>
          </div>
        ))}
      </div>

      {/* Feed Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Active on Campus</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>

          {/* Mock Listings */}
          {[
            { type: 'Resource', title: 'ESP32 DevKit V1', price: 'Free', status: 'Available', badge: 'purple', user: 'Alex J.' },
            { type: 'Ride', title: 'Main St $\rightarrow$ Campus', price: '$2', status: '3 Seats', badge: 'orange', user: 'Sarah K.' },
            { type: 'Skill', title: 'React & Tailwind', price: 'Exchange', status: 'Online', badge: 'purple', user: 'Mike R.' },
          ].map((item, i) => (
            <div
              key={item.title}
              style={{ opacity: 0, animationDelay: `${0.4 + i * 0.1}s` }}
              className="animate-fade-in-up"
            >
              <Card className="p-4 flex items-center justify-between hover:border-gray-300 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={item.badge as any}>{item.type}</Badge>
                      <span className="text-xs text-gray-400">• {item.user}</span>
                    </div>
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{item.price}</p>
                  <p className="text-xs text-gray-500">{item.status}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div style={{ opacity: 0, animationDelay: '0.5s' }} className="animate-fade-in-up">
            <Card className="p-6 bg-black text-white border-none">
              <h3 className="text-lg font-semibold mb-2">Your Reputation</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl font-bold">4.9</div>
                <div className="flex gap-0.5 text-orange-400">
                  {[...Array(5)].map((_, i) => <div key={i} className="w-1 h-4 bg-orange-400 rounded-full" />)}
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-6">
                You have completed 12 successful exchanges this month.
              </p>
              <Button variant="secondary" size="sm" className="w-full bg-white text-black">
                View Profile
              </Button>
            </Card>
          </div>

          <div style={{ opacity: 0, animationDelay: '0.6s' }} className="animate-fade-in-up">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Alerts</h3>
              <div className="space-y-4">
                {[
                  { msg: 'Sarah accepted your ride request', time: '2m ago', color: 'green' },
                  { msg: 'New matching resource for "PCB"', time: '1h ago', color: 'purple' },
                ].map((alert, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${
                      alert.color === 'green' ? 'bg-green-500' : 'bg-purple-500'
                    }`} />
                    <div>
                      <p className="text-sm text-gray-800">{alert.msg}</p>
                      <p className="text-xs text-gray-400">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
