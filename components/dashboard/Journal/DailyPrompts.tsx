// components/DailyPrompts.tsx
import { Button } from "@/components/ui/button";

const prompts = [
  "What are you grateful for today?",
  "What made you smile today?",
  "What’s one thing you learned today?",
];

export const DailyPrompts = ({ onSelectPrompt }: { onSelectPrompt: (prompt: string) => void }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Daily Prompts</h2>
      <div className="space-y-2">
        {prompts.map((prompt, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full text-left"
            onClick={() => onSelectPrompt(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
};