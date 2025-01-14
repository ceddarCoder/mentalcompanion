// components/JournalFilters.tsx
import { Input } from "@/components/ui/input";

export const JournalFilters = ({ onSearch }: { onSearch: (query: string) => void }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Search and Filter</h2>
      <Input
        placeholder="Search entries..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};