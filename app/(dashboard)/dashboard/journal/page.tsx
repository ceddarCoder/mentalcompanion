"use client";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Pencil, Trash2 } from "lucide-react";
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

// Types for our journal entry
interface JournalEntry {
  _id: string;
  content: string;
  mood: string;
  createdAt: string;
  userId: string;
}

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

// Component for individual journal entry
const JournalEntryCard = ({ entry, onDelete, onEdit }: {
  entry: JournalEntry;
  onDelete: (id: string) => void;
  onEdit: (entry: JournalEntry) => void;
}) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="mb-4"
    >
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-gray-800">
              <CalendarIcon className="inline mr-2 h-5 w-5 text-primary-500" />
              {format(new Date(entry.createdAt), 'MMMM d, yyyy')}
            </CardTitle>
            <div className="space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(entry)}
                className="text-gray-600 hover:text-gray-800"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(entry._id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardDescription className="text-sm text-gray-500">Mood: {entry.mood}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap text-gray-700">{entry.content}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Main Journal Page Component
const JournalPage = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const router = useRouter();

  // Fetch entries when component mounts
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
    router.push(`/dashboard/journal/edit/${entry._id}`);
  };


const handleCreate = async () => {
  const router = useRouter();

  try {
    const response = await fetch('/api/journal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: '',  // Leaving it blank for the user to fill in the new entry
        mood: 'neutral',
      }),
    });

    if (response.ok) {
      // Navigate to the new entry page after successful creation
      router.push('/dashboard/journal/new');
      toast.success('Entry created successfully!');
    } else {
      toast.error('Failed to create entry.');
    }
  } catch (error) {
    console.error('Error creating entry:', error);
    toast.error('Failed to create entry.');
  }
};


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-left text-gray-900">My Journal</h1>
        <Button
          variant="default"
          onClick={handleCreate}
          className="px-6 py-2 text-white bg-teal-600 rounded-lg shadow-md hover:bg-teal-700 transition duration-200"
        >
          New Entry
        </Button>
      </div>

      <div className="space-y-4">
        {entries.map((entry) => (
          <JournalEntryCard
            key={entry._id}
            entry={entry}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
