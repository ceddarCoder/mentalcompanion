"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { JournalKanban } from '@/components/dashboard/Journal/JournalKanban';
import { JournalTimeline } from '@/components/dashboard/Journal/JournalTimeline';
import { JournalDialog } from '@/components/dashboard/Journal/JournalDialog';
import { ViewToggle } from '@/components/dashboard/Journal/ViewToggle';
import toast from 'react-hot-toast';
import { DropResult } from 'react-beautiful-dnd';

interface JournalEntry {
  _id: string;
  content: string;
  mood: string;
  createdAt: string;
  userId: string;
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [view, setView] = useState<'kanban' | 'timeline'>('kanban');

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
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to save entry.');
      }
    } catch (error) {
      console.error('Error saving entry:', error);
      toast.error('Failed to save entry.');
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const entry = entries.find((e) => e._id === draggableId);
    if (!entry) return;

    const updatedEntry = { ...entry, mood: destination.droppableId };
    const newEntries = entries.filter((e) => e._id !== draggableId);
    newEntries.splice(destination.index, 0, updatedEntry);

    setEntries(newEntries);
    updateEntryMood(updatedEntry);
  };

  const updateEntryMood = async (entry: JournalEntry) => {
    try {
      const response = await fetch(`/api/journal?id=${entry._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: entry.content,
          mood: entry.mood,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update entry mood.');
      }
    } catch (error) {
      console.error('Error updating entry mood:', error);
      toast.error('Failed to update entry mood.');
    }
  };

  return (
<div className="min-h-screen bg-background text-foreground py-8">
  <div className="container mx-auto px-4">
    {/* Header with Illustration */}
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center space-x-4">
        
        <h1 className="text-3xl font-bold">📔 My Journal</h1>
      </div>
      <Button
        variant="default"
        onClick={handleCreate}
        className="bg-primary text-primary-foreground hover:bg-accent transition-transform hover:scale-105"
      >
        ✨ New Entry
      </Button>
    </div>

    {/* View Toggle */}
    <ViewToggle view={view} setView={setView} />

    {/* Kanban or Timeline View */}
    <div className="mt-6">
      {view === 'kanban' ? (
        <JournalKanban
          entries={entries}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDragEnd={onDragEnd}
        />
      ) : (
        <JournalTimeline
          entries={entries}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
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
</div>
  );
}
