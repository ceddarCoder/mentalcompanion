import React, { useState } from 'react';
import { Send, Loader2, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EMOTIONS = [
  '😊 Happy',
  '😔 Sad',
  '😟 Anxious',
  '😤 Angry',
  '😴 Tired',
  '😐 Neutral',
  '🤔 Confused',
  '🥺 Overwhelmed',
];

interface MessageInputProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSubmit, isLoading }) => {
  const [userMessage, setUserMessage] = useState('');
  const [showEmotions, setShowEmotions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMessage.trim()) return;
    onSubmit(userMessage);
    setUserMessage('');
  };

  return (
    <div>
      {showEmotions && (
        <div className="flex flex-wrap gap-2 mb-4">
          {EMOTIONS.map((emotion) => (
            <Button
              key={emotion}
              variant="outline"
              className="text-sm"
              onClick={() => {
                setUserMessage(`I'm feeling ${emotion.split(' ')[1]}`);
                setShowEmotions(false);
              }}
            >
              {emotion}
            </Button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setShowEmotions(!showEmotions)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex-1 relative">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Express your thoughts..."
            className="w-full rounded-full border border-gray-300 pl-4 pr-12 py-2 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !userMessage.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-teal-500 p-2 text-white transition-colors hover:bg-teal-600 disabled:bg-teal-300"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;