'use client';

import React, { useState, useEffect } from 'react';
import { Send, Image as ImageIcon, MoreVertical, ArrowLeft, CheckCircle2, Clock, Package } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

export default function ChatPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! I saw you have the ESP32 DevKit. Is it still available?", sender: 'other', time: '10:00 AM', type: 'text' },
    { id: 2, text: "Yes it is! I can meet you at the Library tomorrow around 4pm.", sender: 'me', time: '10:05 AM', type: 'text' },
    { id: 3, text: "That works for me. I'll bring the $5 for the rental.", sender: 'other', time: '10:10 AM', type: 'text' },
  ]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    setMessages([...messages, { id: Date.now(), text: inputValue, sender: 'me', time: 'Now', type: 'text' }]);
    setInputValue('');
  };

  return (
    <div className="h-[calc(100vh-120px)] flex gap-6">
      {/* Chat List (Simplified for this view) */}
      <div className="hidden lg:block w-80 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold tracking-tight">Messages</h2>
          <Button size="sm" variant="ghost">New</Button>
        </div>
        {[
          { name: 'Sarah K.', lastMsg: 'See you tomorrow!', time: '2m ago', active: true },
          { name: 'David L.', lastMsg: 'Is it still available?', time: '1h ago', active: false },
          { name: 'Emma W.', lastMsg: 'Thanks for the book!', time: '4h ago', active: false },
        ].map((chat, i) => (
          <Card key={i} className={`p-4 cursor-pointer transition-all ${chat.active ? 'border-black' : 'hover:border-gray-300'}`}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium">{chat.name}</span>
              <span className="text-xs text-gray-400">{chat.time}</span>
            </div>
            <p className="text-sm text-gray-500 truncate">{chat.lastMsg}</p>
          </Card>
        ))}
      </div>

      {/* Main Chat Window */}
      <Card className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="p-2 rounded-full mr-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-medium">S</div>
            <div>
              <p className="font-semibold text-sm">Sarah K.</p>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="purple">Resource: ESP32</Badge>
            <Button variant="ghost" size="sm" className="p-2 rounded-full">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                msg.sender === 'me'
                ? 'bg-black text-white rounded-tr-none'
                : 'bg-white text-gray-900 border border-gray-100 rounded-tl-none shadow-sm'
              }`}>
                <p>{msg.text}</p>
                <p className={`text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-gray-400' : 'text-gray-300'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Transaction Overlay / Footer */}
        <div className="p-4 border-t border-gray-100 bg-white space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-100 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                <Package className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xs font-semibold">Resource Exchange</p>
                <p className="text-[10px] text-gray-500">ESP32 DevKit • Reserved</p>
              </div>
            </div>
            <Button size="sm" className="text-xs h-8">Confirm Handover</Button>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="p-2 h-10 w-10 rounded-full">
              <ImageIcon className="w-5 h-5 text-gray-400" />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="Type a message..."
                className="rounded-full pr-12 py-3"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                onClick={sendMessage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all active:scale-90"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
