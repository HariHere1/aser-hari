'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, MessageSquare } from 'lucide-react';

type Message = { id: number; text: string; sender: 'me' | 'other'; time: string };

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ChatConversationPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setMessages(prev => [
      ...prev,
      { id: Date.now(), text: trimmed, sender: 'me', time: formatTime(new Date()) },
    ]);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex gap-4">
      {/* Sidebar */}
      <div className="hidden lg:flex w-72 flex-shrink-0 bg-white rounded-2xl border border-gray-100 flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Messages</h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
          <MessageSquare className="w-8 h-8 text-gray-200 mb-3" />
          <p className="text-xs text-gray-400">No other conversations yet.</p>
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-white">
          <a href="/dashboard/chat" className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500">
            <ArrowLeft className="w-4 h-4" />
          </a>
          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-sm text-gray-600 flex-shrink-0">
            ?
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-900">Conversation #{params.id}</p>
            <p className="text-xs text-gray-400">Start messaging below</p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 bg-gray-50/30">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-4 border border-gray-100 shadow-sm">
                <MessageSquare className="w-7 h-7 text-gray-200" />
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">No messages yet</p>
              <p className="text-xs text-gray-400 max-w-xs">
                Send a message below to get the conversation started.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] sm:max-w-[65%] p-3 rounded-2xl text-sm ${
                  msg.sender === 'me'
                    ? 'bg-black text-white rounded-tr-sm'
                    : 'bg-white text-gray-900 border border-gray-100 rounded-tl-sm shadow-sm'
                }`}>
                  <p>{msg.text}</p>
                  <p className={`text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-gray-400' : 'text-gray-300'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex items-center gap-2">
            <input
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim()}
              className="p-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
