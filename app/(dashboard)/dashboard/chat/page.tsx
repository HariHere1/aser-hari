'use client';

import React, { useState } from 'react';
import { Send, Search, MessageSquare } from 'lucide-react';

const CONVERSATIONS = [
  { id: 1, name: 'Rahul K.', lastMsg: 'Is the ESP32 still available?', time: '2m', unread: 2, initials: 'RK', color: 'bg-purple-500' },
  { id: 2, name: 'Ananya M.', lastMsg: 'Sure, I can give a ride on Friday!', time: '15m', unread: 0, initials: 'AM', color: 'bg-orange-500' },
  { id: 3, name: 'Joel P.', lastMsg: 'The React session went great 🙌', time: '1h', unread: 0, initials: 'JP', color: 'bg-blue-500' },
  { id: 4, name: 'Priya R.', lastMsg: 'Can I borrow it this weekend?', time: '3h', unread: 1, initials: 'PR', color: 'bg-green-500' },
];

const MESSAGES: Record<number, { from: 'me' | 'them'; text: string }[]> = {
  1: [
    { from: 'them', text: 'Hey! Is the ESP32 still available?' },
    { from: 'me', text: 'Yes, it is! When do you need it?' },
    { from: 'them', text: 'This weekend would be great.' },
  ],
  2: [
    { from: 'me', text: 'Hi! Are you still offering a ride on Friday?' },
    { from: 'them', text: 'Sure, I can give a ride on Friday!' },
  ],
  3: [
    { from: 'them', text: 'The React session went great 🙌' },
    { from: 'me', text: 'Glad it helped! Let me know if you need more.' },
  ],
  4: [
    { from: 'them', text: 'Can I borrow it this weekend?' },
  ],
};

export default function ChatPage() {
  const [activeId, setActiveId] = useState(1);
  const [input, setInput] = useState('');
  const active = CONVERSATIONS.find(c => c.id === activeId)!;
  const msgs = MESSAGES[activeId] || [];

  return (
    <div className="h-[calc(100vh-10rem)] flex gap-4">
      {/* Sidebar */}
      <div className="w-72 flex-shrink-0 bg-white rounded-2xl border border-gray-100 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              placeholder="Search chats..."
              className="w-full pl-9 pr-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {CONVERSATIONS.map(conv => (
            <button
              key={conv.id}
              onClick={() => setActiveId(conv.id)}
              className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 ${activeId === conv.id ? 'bg-gray-50' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full ${conv.color} text-white flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                {conv.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-900">{conv.name}</span>
                  <span className="text-xs text-gray-400">{conv.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{conv.lastMsg}</p>
              </div>
              {conv.unread > 0 && (
                <span className="w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center flex-shrink-0">
                  {conv.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full ${active.color} text-white flex items-center justify-center text-sm font-bold`}>
            {active.initials}
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-900">{active.name}</p>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {msgs.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm ${
                msg.from === 'me'
                  ? 'bg-black text-white rounded-br-sm'
                  : 'bg-gray-100 text-gray-900 rounded-bl-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && setInput('')}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all"
            />
            <button
              onClick={() => setInput('')}
              className="p-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
