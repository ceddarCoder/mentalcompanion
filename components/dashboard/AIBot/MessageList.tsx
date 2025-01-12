import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Message {
  sender: string;
  text: string;
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div>
      {messages.length === 0 ? (
        <div className="text-center text-gray-600 mt-8 space-y-4">
          <p className="text-xl mb-2">Welcome to your safe space 🌿</p>
          <p className="text-sm max-w-md mx-auto">
            I'm here to listen and support you in a judgment-free environment. You can share anything that's on your
            mind, or start by telling me how you're feeling today.
          </p>
          <Alert className="bg-teal-50 border-teal-100 max-w-md mx-auto mt-4">
            <AlertDescription>
              Remember: While I'm here to support you, I'm an AI assistant. For immediate crisis support, please contact
              emergency services or crisis helpline.
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <div className="space-y-6 py-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
              <MessageBubble text={msg.text} isUser={msg.sender === 'User'} timestamp={msg.timestamp} />
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default MessageList;