// components/JournalDialog.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface JournalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string, mood: string) => void;
  initialContent?: string;
  initialMood?: string;
}

export const JournalDialog = ({
  isOpen,
  onClose,
  onSubmit,
  initialContent = '',
  initialMood = 'neutral',
}: JournalDialogProps) => {
  const [content, setContent] = useState(initialContent);
  const [mood, setMood] = useState(initialMood);

  // Reset state when the dialog is opened or closed
  useEffect(() => {
    if (isOpen) {
      setContent(initialContent);
      setMood(initialMood);
    }
  }, [isOpen, initialContent, initialMood]);

  const handleSubmit = () => {
    onSubmit(content, mood);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{initialContent ? 'Edit Journal Entry' : 'New Journal Entry'}</DialogTitle>
          <DialogDescription>
            {initialContent ? 'Update your thoughts and feelings.' : 'Write your thoughts and feelings.'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="min-h-[200px]"
          />
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="happy">Happy</option>
            <option value="neutral">Neutral</option>
            <option value="sad">Sad</option>
            <option value="anxious">Anxious</option>
            <option value="excited">Excited</option>
          </select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {initialContent ? 'Update' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};