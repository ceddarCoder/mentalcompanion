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
      <div className="flex w-full gap-4 p-4 overflow-x-auto"> {/* Ensure overflow handling */}
        {moodColumns.map((column) => (
          <div 
            key={column.mood} 
            className="flex flex-col w-[245px] lg:w-[245px] " // Ensure responsive width for larger screens
          >
            {/* Column Header */}
            <div className="flex items-center space-x-2 p-3 mb-2 rounded-xl bg-card shadow-sm border">
              <span className="text-2xl">{column.icon}</span>
              <h2 className="text-base font-semibold">{column.title}</h2>
            </div>
            
            {/* Droppable Area */}
            <Droppable droppableId={column.mood}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gradient-to-b from-background/30 to-card/50 rounded-xl shadow-inner p-2 h-full min-h-[400px] overflow-y-auto"
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
                            className="mb-2 last:mb-0"
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
