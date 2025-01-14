// components/JournalTimeline.tsx
import { JournalEntry } from '@/types/journal';
import { format } from 'date-fns';
import { CalendarIcon, Pencil, Trash2, Smile, Meh, Frown, AlertCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const moodIcons = {
  happy: <Smile className="h-5 w-5 text-yellow-500" />,
  neutral: <Meh className="h-5 w-5 text-blue-500" />,
  sad: <Frown className="h-5 w-5 text-gray-500" />,
  anxious: <AlertCircle className="h-5 w-5 text-red-500" />,
  excited: <Zap className="h-5 w-5 text-green-500" />,
};

export const JournalTimeline = ({ entries, onEdit, onDelete }: {
  entries: JournalEntry[];
  onEdit: (entry: JournalEntry) => void;
  onDelete: (id: string) => void;
}) => {
  return (
    <div className="space-y-4 mt-4">
      {entries.map((entry) => (
        <Card key={entry._id} className="shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold text-gray-800">
                <CalendarIcon className="inline mr-2 h-5 w-5 text-purple-500" />
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
            <CardDescription className="text-sm text-gray-500 flex items-center">
              Mood: {moodIcons[entry.mood as keyof typeof moodIcons]} {entry.mood}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-gray-700">{entry.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};