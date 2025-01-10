'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, ChevronDown, Menu } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Predefined emotional states for quick selection
const EMOTIONS = [
  '😊 Happy',
  '😔 Sad',
  '😟 Anxious',
  '😤 Angry',
  '😴 Tired',
  '😐 Neutral',
  '🤔 Confused',
  '🥺 Overwhelmed'
];

export default function Home() {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState<{ sender: string; text: string; timestamp: Date }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmotions, setShowEmotions] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleEmotionSelect = (emotion: string) => {
    setCurrentEmotion(emotion);
    setUserMessage(`I'm feeling ${emotion.split(' ')[1]}`);
    setShowEmotions(false);
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    setIsLoading(true);
    const newMessages = [...messages, { 
      sender: 'User', 
      text: userMessage,
      timestamp: new Date()
    }];
    setMessages(newMessages);
    setUserMessage('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userMessage,
          currentEmotion,
          messageHistory: messages.map(m => `${m.sender}: ${m.text}`).join('\n')
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages([...newMessages, { 
          sender: 'Therapist', 
          text: data.aiResponse,
          timestamp: new Date()
        }]);
      } else {
        setMessages([
          ...newMessages,
          { 
            sender: 'Therapist', 
            text: 'I apologize, but I\'m experiencing some technical difficulties. Lets take a pause and try again in a moment.',
            timestamp: new Date()
          },
        ]);
      }
    } catch (error) {
      setMessages([
        ...newMessages,
        { 
          sender: 'Therapist', 
          text: 'I apologize, but I\'m experiencing some technical difficulties. Let\'s take a pause and try again in a moment.',
          timestamp: new Date()
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <Card className="bg-white shadow-xl">
        <div className="border-b border-gray-100 p-4 bg-teal-50">
          <h1 className="text-2xl font-semibold text-teal-800">Virtual Therapist</h1>
          <p className="text-sm text-teal-600">A safe space to share your thoughts and feelings</p>
        </div>
        
        <CardContent className="p-4">
          <div className="h-[500px] overflow-y-auto mb-4 space-y-4 pr-2">
            {messages.length === 0 && (
              <div className="text-center text-gray-600 mt-8 space-y-4">
                <p className="text-xl mb-2">Welcome to your safe space 🌿</p>
                <p className="text-sm max-w-md mx-auto">
                  I'm here to listen and support you in a judgment-free environment. 
                  You can share anything that's on your mind, or start by telling me how you're feeling today.
                </p>
                <Alert className="bg-teal-50 border-teal-100 max-w-md mx-auto mt-4">
                  <AlertDescription>
                    Remember: While I'm here to support you, I'm an AI assistant. 
                    For immediate crisis support, please contact emergency services or crisis helpline.
                  </AlertDescription>
                </Alert>
              </div>
            )}
            
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 mb-1 mx-2">
                    {formatTimestamp(msg.timestamp)}
                  </span>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.sender === 'User'
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="space-y-4">
            {showEmotions && (
              <div className="flex flex-wrap gap-2 mb-4">
                {EMOTIONS.map((emotion) => (
                  <Button
                    key={emotion}
                    variant="outline"
                    className="text-sm"
                    onClick={() => handleEmotionSelect(emotion)}
                  >
                    {emotion}
                  </Button>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={() => setShowEmotions(!showEmotions)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Express your thoughts... (Press Enter to send)"
                className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-full bg-teal-500 p-2 text-white transition-colors hover:bg-teal-600 disabled:bg-teal-300"
              >
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <Send className="h-6 w-6" />
                )}
              </button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}