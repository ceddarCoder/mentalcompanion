import { JournalEntry } from '@/types/journal';
import { JournalEntryCard } from './JournalEntryCard';

export const JournalTimeline = ({ entries, onEdit, onDelete }: {
  entries: JournalEntry[];
  onEdit: (entry: JournalEntry) => void;
  onDelete: (id: string) => void;
}) => {
  return (
    <div className="space-y-4 mt-4">
      {entries.map((entry) => (
        <JournalEntryCard
          key={entry._id}
          entry={entry}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};