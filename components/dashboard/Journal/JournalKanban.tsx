// app/dashboard/journal/components/JournalKanban.tsx
"use client";

import { JournalEntryCard } from './JournalEntryCard';
import { JournalEntry } from '@/types/journal'; // Define this type if not already defined

interface JournalKanbanProps {
  entries: JournalEntry[];
  onEdit: (entry: JournalEntry) => void;
  onDelete: (id: string) => void;
}

const moodColumns = [
  { mood: 'happy', title: 'Happy', color: 'bg-yellow-50' },
  { mood: 'neutral', title: 'Neutral', color: 'bg-blue-50' },
  { mood: 'sad', title: 'Sad', color: 'bg-gray-50' },
  { mood: 'anxious', title: 'Anxious', color: 'bg-red-50' },
  { mood: 'excited', title: 'Excited', color: 'bg-green-50' },
];

export const JournalKanban = ({ entries, onEdit, onDelete }: JournalKanbanProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-6">
      {moodColumns.map((column) => (
        <div key={column.mood} className="flex flex-col space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">{column.title}</h2>
          <div className={`p-4 rounded-lg ${column.color}`}>
            {entries
              .filter((entry) => entry.mood === column.mood)
              .map((entry) => (
                <JournalEntryCard
                  key={entry._id}
                  entry={entry}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};