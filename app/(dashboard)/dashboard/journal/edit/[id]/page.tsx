// "use client";
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation'; 
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";
// import toast from 'react-hot-toast';

// // Main Journal Edit Entry Page Component
// const EditJournalPage = ({ params }: { params: { id: string } }) => {
//   const [entry, setEntry] = useState<any>(null);
//   const [newEntry, setNewEntry] = useState('');
//   const [mood, setMood] = useState('neutral');
//   const router = useRouter();
//   const { id } = params;  

//   useEffect(() => {
//     if (id) {
//       fetch(`/api/journal?id=${id}`)
//         .then(res => res.json())
//         .then(data => {
//           if (data) {
//             setEntry(data);  // Ensure entry data is being set
//             setNewEntry(data.content);  // Set original content as default
//             setMood(data.mood);  // Set original mood as default
//           }
//         })
//         .catch((error) => {
//           console.error('Error fetching entry:', error);
//         });
//     }
//   }, [id]);

//   const handleSubmit = async () => {
//     try {
//       const response = await fetch('/api/journal', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           id,
//           content: newEntry,
//           mood: mood,
//         }),
//       });

//       if (response.ok) {
//         toast.success('Entry updated successfully!');
//         router.push('/dashboard/journal');
//       } else {
//         toast.error('Failed to update entry.');
//       }
//     } catch (error) {
//       console.error('Error updating entry:', error);
//       toast.error('Failed to update entry.');
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Edit Journal Entry</h1>
//       {entry ? (
//         <Card className="mb-8">
//           <CardHeader>
//             <CardTitle>Edit Your Entry</CardTitle>
//             <CardDescription>Update your thoughts and feelings...</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Textarea
//               value={newEntry}
//               onChange={(e) => setNewEntry(e.target.value)}
//               placeholder="What's on your mind?"
//               className="min-h-[200px] mb-4"
//             />
//             <select
//               value={mood}
//               onChange={(e) => setMood(e.target.value)}
//               className="w-full p-2 border rounded-md mb-4"
//             >
//               <option value="happy">Happy</option>
//               <option value="neutral">Neutral</option>
//               <option value="sad">Sad</option>
//               <option value="anxious">Anxious</option>
//               <option value="excited">Excited</option>
//             </select>
//           </CardContent>
//           <Button onClick={handleSubmit}>Update Entry</Button>
//         </Card>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default EditJournalPage;


// app/dashboard/journal/edit/[id]/page.tsx
"use client";

import { useRouter, useParams } from 'next/navigation';
import { JournalDialog } from '@/components/dashboard/Journal/JournalDialog';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface JournalEntry {
  _id: string;
  content: string;
  mood: string;
  createdAt: string;
  userId: string;
}

export default function EditJournalPage() {
  const router = useRouter();
  const { id } = useParams();
  const [isDialogOpen] = useState(true);
  const [entry, setEntry] = useState<JournalEntry | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/journal?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setEntry(data);
        })
        .catch((error) => {
          console.error('Error fetching entry:', error);
        });
    }
  }, [id]);

  const handleDialogSubmit = async (content: string, mood: string) => {
    try {
      const response = await fetch(`/api/journal?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          mood,
        }),
      });

      if (response.ok) {
        toast.success('Entry updated successfully!');
        router.push('/dashboard/journal');
      } else {
        toast.error('Failed to update entry.');
      }
    } catch (error) {
      console.error('Error updating entry:', error);
      toast.error('Failed to update entry.');
    }
  };

  if (!entry) {
    return <p>Loading...</p>;
  }

  return (
    <JournalDialog
      isOpen={isDialogOpen}
      onClose={() => router.push('/dashboard/journal')}
      onSubmit={handleDialogSubmit}
      initialContent={entry.content}
      initialMood={entry.mood}
    />
  );
}