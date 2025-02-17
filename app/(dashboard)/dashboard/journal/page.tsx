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
  const [view, setView] = useState<'kanban' | 'timeline'>('timeline');
  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const wideScreen = window.innerWidth >= 1024;
      setIsWideScreen(wideScreen);
      setView(wideScreen ? 'kanban' : 'timeline');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, mood }),
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
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: entry.content, mood: entry.mood }),
      });

      if (!response.ok) throw new Error('Failed to update entry mood.');
    } catch (error) {
      console.error('Error updating entry mood:', error);
      toast.error('Failed to update entry mood.');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-6">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
            <span className="text-primary">📔</span>
            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              My Journal
            </span>
          </h1>
          <Button
            variant="default"
            onClick={handleCreate}
            className="px-4 py-2 h-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/30 transition-all justify-end"
          >
            <span className="mr-2">✨</span>
            New Entry
          </Button>
        </div>

        {/* View Toggle Button (Separate Row) */}
        {isWideScreen && (
          <div className="flex justify-start pt-3">
            <ViewToggle view={view} setView={setView} />
          </div>
        )}

        {/* Main Content */}
        <div className="mt-3 mx-auto translate-x-[-1rem]">
          {view === 'kanban' && isWideScreen ? (
            <JournalKanban entries={entries} onEdit={handleEdit} onDelete={handleDelete} onDragEnd={onDragEnd} />
          ) : (
            <JournalTimeline entries={entries} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </div>
        

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
