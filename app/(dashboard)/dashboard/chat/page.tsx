'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Search, MessageSquare } from 'lucide-react';

type Message = { id: number; text: string; from: 'me' | 'them' };

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages(prev => [...prev, { id: Date.now(), text: trimmed, from: 'me' }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex gap-4">
      {/* Sidebar — no conversations */}
      <div className="hidden sm:flex w-64 lg:w-72 flex-shrink-0 bg-white rounded-2xl border border-gray-100 flex-col overflow-hidden">
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
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-3 border border-gray-100">
            <MessageSquare className="w-5 h-5 text-gray-300" />
          </div>
          <p className="text-sm font-medium text-gray-600 mb-1">No conversations</p>
          <p className="text-xs text-gray-400">Message someone from a listing to start chatting.</p>
        </div>
      </div>

      {/* Chat window */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-gray-400" />
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-900">Campus Chat</p>
            <p className="text-xs text-gray-400">Select a conversation to start</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100">
                <MessageSquare className="w-7 h-7 text-gray-200" />
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">No messages yet</p>
              <p className="text-xs text-gray-400 max-w-xs">
                Start a conversation by messaging someone about a resource, ride, or skill listing.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs sm:max-w-sm px-4 py-2.5 rounded-2xl text-sm ${
                  msg.from === 'me'
                    ? 'bg-black text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="p-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
