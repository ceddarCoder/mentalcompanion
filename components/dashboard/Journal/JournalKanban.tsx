"use client";

import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { JournalEntryCard } from './JournalEntryCard';
import { JournalEntry } from '@/types/journal';
interface JournalKanbanProps {
  entries: JournalEntry[];
  onEdit: (entry: JournalEntry) => void;
  onDelete: (id: string) => void;
  onDragEnd: (result: DropResult) => void;
}

const moodColumns = [
  { mood: 'happy', title: 'Happy 😊', color: 'bg-yellow-50', icon: '😊' },
  { mood: 'neutral', title: 'Neutral 😐', color: 'bg-blue-50', icon: '😐' },
  { mood: 'sad', title: 'Sad 😢', color: 'bg-gray-50', icon: '😢' },
  { mood: 'anxious', title: 'Anxious 😰', color: 'bg-red-50', icon: '😰' },
  { mood: 'excited', title: 'Excited 🎉', color: 'bg-green-50', icon: '🎉' },
];

export const JournalKanban = ({ entries, onEdit, onDelete, onDragEnd }: JournalKanbanProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-6">
        {moodColumns.map((column) => (
          <div key={column.mood} className="flex flex-col space-y-4 min-w-[14rem]"> {/* Increased column width */}
            <div className="flex items-center space-x-2 p-4 rounded-lg bg-card shadow-sm">
              <h2 className="text-lg font-semibold text-foreground">{column.title}</h2>
            </div>
            <Droppable droppableId={column.mood}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-4 rounded-lg ${column.color} shadow-inner`}
                >
                  {entries
                    .filter((entry) => entry.mood === column.mood)
                    .map((entry, index) => (
                      <Draggable key={entry._id} draggableId={entry._id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <JournalEntryCard
                              entry={entry}
                              onEdit={onEdit}
                              onDelete={onDelete}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};