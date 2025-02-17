"use client";

import { CalendarIcon, Pencil, Trash2, Smile, Meh, Frown, AlertCircle, Zap } from "lucide-react";
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';
interface JournalEntry {
  _id: string;
  content: string;
  mood: string;
  createdAt: string;
  userId: string;
}

interface JournalEntryCardProps {
  entry: JournalEntry;
  onEdit: (entry: JournalEntry) => void;
  onDelete: (id: string) => void;
}

const moodIcons = {
  happy: <Smile className="mood-icon text-yellow-500" />,
  neutral: <Meh className="mood-icon text-blue-500" />,
  sad: <Frown className="mood-icon text-gray-500" />,
  anxious: <AlertCircle className="mood-icon text-red-500" />,
  excited: <Zap className="mood-icon text-green-500" />,
};

export const JournalEntryCard = ({ entry, onEdit, onDelete }: JournalEntryCardProps) => {
  // Extract the first line of the content
  const firstLine = entry.content.split('\n')[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-4"
    >
      <Card className="card max-w-full lg:max-w-[245px] h-auto relative">
        

        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">
                <CalendarIcon className="inline mr-2 h-5 w-5 text-primary" />
                {format(new Date(entry.createdAt), 'MMMM d, yyyy')}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground flex items-center">
                Mood: {moodIcons[entry.mood as keyof typeof moodIcons]} {entry.mood}
              </CardDescription>
            </div>
            <div className="flex flex-col space-y-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(entry)}
                className="text-muted-foreground hover:text-foreground transition-transform hover:scale-110"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(entry._id)}
                className="text-destructive hover:text-destructive-foreground transition-transform hover:scale-110"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="overflow-y-auto">
          <p className="whitespace-pre-wrap text-foreground">{firstLine}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};