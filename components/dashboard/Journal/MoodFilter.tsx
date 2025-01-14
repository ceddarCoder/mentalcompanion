// components/MoodFilter.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const moods = ['All', 'Happy', 'Neutral', 'Sad', 'Anxious', 'Excited'];

export const MoodFilter = ({ onMoodChange }: { onMoodChange: (mood: string) => void }) => {
  const [selectedMood, setSelectedMood] = useState('All');

  const handleMoodChange = (mood: string) => {
    setSelectedMood(mood);
    onMoodChange(mood);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Filter by Mood</h2>
      <div className="flex flex-wrap gap-2">
        {moods.map((mood) => (
          <Button
            key={mood}
            variant={selectedMood === mood ? 'default' : 'outline'}
            onClick={() => handleMoodChange(mood)}
          >
            {mood}
          </Button>
        ))}
      </div>
    </div>
  );
};