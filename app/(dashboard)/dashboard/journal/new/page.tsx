// "use client";
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";

// // Main Journal New Entry Page Component
// const NewJournalPage = () => {
//   const [newEntry, setNewEntry] = useState('');
//   const [mood, setMood] = useState('neutral');
//   const router = useRouter();

//   const handleSubmit = async () => {
//     try {
//       const response = await fetch('/api/journal', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           content: newEntry,
//           mood: mood,
//         }),
//       });

//       if (response.ok) {
//         router.push('/dashboard/journal');
//       }
//     } catch (error) {
//       console.error('Error saving entry:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">New Journal Entry</h1>
//       <Card className="mb-8">
//         <CardHeader>
//           <CardTitle>Create New Entry</CardTitle>
//           <CardDescription>Write your thoughts and feelings...</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Textarea
//             value={newEntry}
//             onChange={(e) => setNewEntry(e.target.value)}
//             placeholder="What's on your mind?"
//             className="min-h-[200px] mb-4"
//           />
//           <select
//             value={mood}
//             onChange={(e) => setMood(e.target.value)}
//             className="w-full p-2 border rounded-md mb-4"
//           >
//             <option value="happy">Happy</option>
//             <option value="neutral">Neutral</option>
//             <option value="sad">Sad</option>
//             <option value="anxious">Anxious</option>
//             <option value="excited">Excited</option>
//           </select>
//         </CardContent>
//         <Button onClick={handleSubmit}>Save Entry</Button>
//       </Card>
//     </div>
//   );
// };

// export default NewJournalPage;


// app/dashboard/journal/add/page.tsx
"use client";

import { useRouter } from 'next/navigation';
import { JournalDialog } from '@/components/dashboard/Journal/JournalDialog';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function AddJournalPage() {
  const router = useRouter();
  const [isDialogOpen] = useState(true);

  const handleDialogSubmit = async (content: string, mood: string) => {
    try {
      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          mood,
        }),
      });

      if (response.ok) {
        toast.success('Entry created successfully!');
        router.push('/dashboard/journal');
      } else {
        toast.error('Failed to create entry.');
      }
    } catch (error) {
      console.error('Error creating entry:', error);
      toast.error('Failed to create entry.');
    }
  };

  return (
    <JournalDialog
      isOpen={isDialogOpen}
      onClose={() => router.push('/dashboard/journal')}
      onSubmit={handleDialogSubmit}
    />
  );
}