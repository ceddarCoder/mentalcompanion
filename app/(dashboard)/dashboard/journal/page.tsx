
// "use client";

// import { useState, useEffect } from 'react';
// import { Button } from "@/components/ui/button";
// import { useRouter } from 'next/navigation';
// import { JournalKanban } from '@/components/dashboard/Journal/JournalKanban';
// import { JournalDialog } from '@/components/dashboard/Journal/JournalDialog';
// import toast from 'react-hot-toast';

// interface JournalEntry {
//   _id: string;
//   content: string;
//   mood: string;
//   createdAt: string;
//   userId: string;
// }

// export default function JournalPage() {
//   const [entries, setEntries] = useState<JournalEntry[]>([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     fetchEntries();
//   }, []);

//   const fetchEntries = async () => {
//     try {
//       const response = await fetch('/api/journal');
//       const data = await response.json();
//       setEntries(data);
//     } catch (error) {
//       console.error('Error fetching entries:', error);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       const response = await fetch(`/api/journal?id=${id}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         fetchEntries();
//         toast.success('Entry deleted successfully!');
//       } else {
//         toast.error('Failed to delete entry.');
//       }
//     } catch (error) {
//       console.error('Error deleting entry:', error);
//       toast.error('Failed to delete entry.');
//     }
//   };

//   const handleEdit = (entry: JournalEntry) => {
//     setEditingEntry(entry);
//     setIsDialogOpen(true);
//   };

//   const handleCreate = () => {
//     setEditingEntry(null);
//     setIsDialogOpen(true);
//   };

//   const handleDialogSubmit = async (content: string, mood: string) => {
//     try {
//       const url = editingEntry ? `/api/journal?id=${editingEntry._id}` : '/api/journal';
//       const method = editingEntry ? 'PUT' : 'POST';
  
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           content,
//           mood,
//         }),
//       });
  
//       if (response.ok) {
//         fetchEntries();
//         toast.success(editingEntry ? 'Entry updated successfully!' : 'Entry created successfully!');
//       } else {
//         const errorData = await response.json();
//         toast.error(errorData.error || 'Failed to save entry.');
//       }
//     } catch (error) {
//       console.error('Error saving entry:', error);
//       toast.error('Failed to save entry.');
//     }
//   };
//   return (
//     <div className="min-h-screen bg-white py-8">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-800">My Journal</h1>
//           <Button
//             variant="default"
//             onClick={handleCreate}
//             className="px-6 py-2 text-white bg-purple-500 rounded-lg shadow-md hover:bg-purple-600 transition duration-200"
//           >
//             New Entry
//           </Button>
//         </div>

//         <JournalKanban entries={entries} onEdit={handleEdit} onDelete={handleDelete} />

//         <JournalDialog
//           isOpen={isDialogOpen}
//           onClose={() => setIsDialogOpen(false)}
//           onSubmit={handleDialogSubmit}
//           initialContent={editingEntry?.content}
//           initialMood={editingEntry?.mood}
//         />
//       </div>
//     </div>
//   );
// }

// app/dashboard/journal/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { JournalTimeline } from '@/components/dashboard/Journal/JournalTimeline';
import { JournalDialog } from '@/components/dashboard/Journal/JournalDialog';
import { MoodTracker } from '@/components/dashboard/Journal/MoodTracker';
import { DailyPrompts } from '@/components/dashboard/Journal/DailyPrompts';
import { AIInsights } from '@/components/dashboard/Journal/AIInsights';
import { JournalFilters } from '@/components/dashboard/Journal/JournalFilters';
import toast from 'react-hot-toast';
import { JournalEntry } from '@/types/journal';


export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/journal');
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/journal?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchEntries();
        toast.success('Entry deleted successfully!');
      } else {
        toast.error('Failed to delete entry.');
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
      toast.error('Failed to delete entry.');
    }
  };

  const handleEdit = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingEntry(null);
    setIsDialogOpen(true);
  };

  const handleDialogSubmit = async (content: string, mood: string) => {
    try {
      const url = editingEntry ? `/api/journal?id=${editingEntry._id}` : '/api/journal';
      const method = editingEntry ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          mood,
        }),
      });

      if (response.ok) {
        fetchEntries();
        toast.success(editingEntry ? 'Entry updated successfully!' : 'Entry created successfully!');
      } else {
        toast.error(editingEntry ? 'Failed to update entry.' : 'Failed to create entry.');
      }
    } catch (error) {
      console.error('Error saving entry:', error);
      toast.error(editingEntry ? 'Failed to update entry.' : 'Failed to create entry.');
    }
  };

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">My Journal</h1>
        <Button
          variant="default"
          onClick={handleCreate}
          className="px-6 py-2 text-white bg-purple-500 rounded-lg shadow-md hover:bg-purple-600 transition duration-200"
        >
          New Entry
        </Button>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Journal Entries */}
        <div className="lg:col-span-2">
          <JournalFilters onSearch={(query) => console.log(query)} />
          <JournalTimeline entries={entries} onEdit={handleEdit} onDelete={handleDelete} />
        </div>

        {/* Right Column: Mood Tracker, Daily Prompts, AI Insights */}
        <div className="space-y-6">
          <MoodTracker />
          <DailyPrompts onSelectPrompt={(prompt) => console.log(prompt)} />
          <AIInsights />
        </div>
      </div>

      {/* Journal Dialog */}
      <JournalDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleDialogSubmit}
        initialContent={editingEntry?.content}
        initialMood={editingEntry?.mood}
      />
    </div>
  );
}