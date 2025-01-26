'use client';
import React, { useState } from 'react';
import MessageList from './AIBot/MessageList';
import MessageInput from './AIBot/MessageInput';

export default function AIChat() {
  const [messages, setMessages] = useState<{ sender: string; text: string; timestamp: Date }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (message: string) => {
    setIsLoading(true);
    const newMessages = [...messages, { sender: 'User', text: message, timestamp: new Date() }];
    setMessages(newMessages);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userMessage: message,
          messageHistory: messages.map((m) => `${m.sender}: ${m.text}`).join('\n'),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages([...newMessages, { sender: 'Therapist', text: data.aiResponse, timestamp: new Date() }]);
      } else {
        setMessages([
          ...newMessages,
          {
            sender: 'Therapist',
            text: "I apologize, but I'm experiencing some technical difficulties. Let's take a pause and try again in a moment.",
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      console.log(error);
      setMessages([
        ...newMessages,
        {
          sender: 'Therapist',
          text: "I apologize, but I'm experiencing some technical difficulties. Let's take a pause and try again in a moment.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-transparent">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto px-4 pb-32 w-full max-w-2xl mx-auto">
        <MessageList messages={messages} />
      </div>

      {/* Floating input area */}
      <div className="sticky bottom-4 mx-auto w-full max-w-2xl px-4">
        <div className="bg-card/95 backdrop-blur-sm rounded-xl border border-border/20 p-2 shadow-lg">
          <MessageInput onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}