// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import { Send, Loader2, Menu } from 'lucide-react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import ReactMarkdown from 'react-markdown';
// import type { Components } from 'react-markdown';

// const EMOTIONS = [
//   '😊 Happy',
//   '😔 Sad',
//   '😟 Anxious',
//   '😤 Angry',
//   '😴 Tired',
//   '😐 Neutral',
//   '🤔 Confused',
//   '🥺 Overwhelmed'
// ];

// export default function Home() {
//   const [userMessage, setUserMessage] = useState('');
//   const [messages, setMessages] = useState<{ sender: string; text: string; timestamp: Date }[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showEmotions, setShowEmotions] = useState(false);
//   const [currentEmotion, setCurrentEmotion] = useState('');
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleEmotionSelect = (emotion: string) => {
//     setCurrentEmotion(emotion);
//     setUserMessage(`I'm feeling ${emotion.split(' ')[1]}`);
//     setShowEmotions(false);
//   };

//   const formatTimestamp = (date: Date) => {
//     return new Intl.DateTimeFormat('en-US', {
//       hour: 'numeric',
//       minute: 'numeric',
//       hour12: true
//     }).format(date);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!userMessage.trim()) return;
//     setIsLoading(true);
    
//     const newMessages = [...messages, { 
//       sender: 'User', 
//       text: userMessage,
//       timestamp: new Date()
//     }];
//     setMessages(newMessages);
//     setUserMessage('');

//     try {
//       const res = await fetch('/api/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ 
//           userMessage,
//           currentEmotion,
//           messageHistory: messages.map(m => `${m.sender}: ${m.text}`).join('\n')
//         }),
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setMessages([...newMessages, { 
//           sender: 'Therapist', 
//           text: data.aiResponse,
//           timestamp: new Date()
//         }]);
//       } else {
//         setMessages([
//           ...newMessages,
//           { 
//             sender: 'Therapist', 
//             text: 'I apologize, but I\'m experiencing some technical difficulties. Let&apos;s take a pause and try again in a moment.',
//             timestamp: new Date()
//           },
//         ]);
//       }
//     } catch (error) {
//       console.log(error)
//       setMessages([
//         ...newMessages,
//         { 
//           sender: 'Therapist', 
//           text: 'I apologize, but I&apos;m experiencing some technical difficulties. Let&apos;s take a pause and try again in a moment.',
//           timestamp: new Date()
//         },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const MessageContent = ({ text, isUser }: { text: string; isUser: boolean }) => {
//     if (isUser) {
//       return <p className="whitespace-pre-wrap">{text}</p>;
//     }
    
//     const components: Components = {
//       code: ({ className, children, ...props }) => {
//         const isBlock = className?.includes('language-') || children?.toString().includes('\n');

//         if (isBlock) {
//           return (
//             <div className="bg-gray-100 rounded-md p-3 my-2">
//               <code className="text-gray-800 text-sm font-mono" {...props}>
//                 {children}
//               </code>
//             </div>
//           );
//         }

//         return (
//           <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded" {...props}>
//             {children}
//           </code>
//         );
//       },
//       ul: ({ children }) => <ul className="list-disc pl-4 my-1">{children}</ul>,
//       ol: ({ children }) => <ol className="list-decimal pl-4 my-1">{children}</ol>,
//       a: ({ children, href }) => (
//         <a 
//           href={href} 
//           className="text-teal-600 hover:text-teal-700 underline" 
//           target="_blank" 
//           rel="noopener noreferrer"
//         >
//           {children}
//         </a>
//       ),
//       h1: ({ children }) => <h1 className="text-xl font-bold my-2">{children}</h1>,
//       h2: ({ children }) => <h2 className="text-lg font-bold my-2">{children}</h2>,
//       h3: ({ children }) => <h3 className="text-base font-bold my-1">{children}</h3>,
//     };

//     return (
//       <div className="markdown-content prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-ol:my-1 prose-li:my-0">
//         <ReactMarkdown components={components}>
//           {text}
//         </ReactMarkdown>
//       </div>
//     );
//   };

//   return (
//     <div className="flex flex-col h-screen bg-white">
//       {/* Minimal navbar */}
//       <div className="flex items-center px-4 py-2 bg-teal-500 text-white">
//         <Button
//           variant="ghost"
//           size="icon"
//           className="text-white hover:bg-teal-600"
//           onClick={() => {/* Add your hamburger menu handler */}}
//         >
//           <Menu className="h-6 w-6" />
//         </Button>
//         <h1 className="ml-4 text-lg font-semibold">Virtual Therapist</h1>
//       </div>

//       {/* Main chat area */}
//       <div className="flex-1 flex flex-col">
//         <div className="flex-1 overflow-y-auto px-4">
//           {messages.length === 0 && (
//             <div className="text-center text-gray-600 mt-8 space-y-4">
//               <p className="text-xl mb-2">Welcome to your safe space 🌿</p>
//               <p className="text-sm max-w-md mx-auto">
//                 I'm here to listen and support you in a judgment-free environment. 
//                 You can share anything that's on your mind, or start by telling me how you're feeling today.
//               </p>
//               <Alert className="bg-teal-50 border-teal-100 max-w-md mx-auto mt-4">
//                 <AlertDescription>
//                   Remember: While I'm here to support you, I'm an AI assistant. 
//                   For immediate crisis support, please contact emergency services or crisis helpline.
//                 </AlertDescription>
//               </Alert>
//             </div>
//           )}
          
//           <div className="space-y-6 py-4">
//             {messages.map((msg, idx) => (
//               <div
//                 key={idx}
//                 className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div className={`flex flex-col ${msg.sender === 'User' ? 'items-end' : 'items-start'} max-w-[85%]`}>
//                   <span className="text-xs text-gray-500 mb-1 px-2">
//                     {formatTimestamp(msg.timestamp)}
//                   </span>
//                   <div
//                     className={`rounded-2xl px-4 py-2 ${
//                       msg.sender === 'User'
//                         ? 'bg-teal-500 text-white rounded-tr-none'
//                         : 'bg-gray-100 text-gray-800 rounded-tl-none'
//                     }`}
//                   >
//                     <MessageContent text={msg.text} isUser={msg.sender === 'User'} />
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>
//         </div>

//         {/* Input area */}
//         <div className="border-t bg-white px-4 py-2">
//           {showEmotions && (
//             <div className="flex flex-wrap gap-2 mb-4">
//               {EMOTIONS.map((emotion) => (
//                 <Button
//                   key={emotion}
//                   variant="outline"
//                   className="text-sm"
//                   onClick={() => handleEmotionSelect(emotion)}
//                 >
//                   {emotion}
//                 </Button>
//               ))}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="flex gap-2">
//             <Button
//               type="button"
//               variant="outline"
//               className="rounded-full"
//               onClick={() => setShowEmotions(!showEmotions)}
//             >
//               <Menu className="h-5 w-5" />
//             </Button>
//             <input
//               type="text"
//               value={userMessage}
//               onChange={(e) => setUserMessage(e.target.value)}
//               placeholder="Express your thoughts..."
//               className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
//               disabled={isLoading}
//             />
//             <button
//               type="submit"
//               disabled={isLoading || !userMessage.trim()}
//               className="rounded-full bg-teal-500 p-2 text-white transition-colors hover:bg-teal-600 disabled:bg-teal-300"
//             >
//               {isLoading ? (
//                 <Loader2 className="h-6 w-6 animate-spin" />
//               ) : (
//                 <Send className="h-6 w-6" />
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';
import React, { useState } from 'react';
import MessageList from './AIBot/MessageList';
import MessageInput from './AIBot/MessageInput';

export default function AIChat() {
  const [messages, setMessages] = useState<{ sender: string; text: string; timestamp: Date }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (message: string) => {
    setIsLoading(true);
    const newMessages = [...messages, { sender: 'User', text: message, timestamp: new Date() }];
    setMessages(newMessages);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userMessage: message,
          messageHistory: messages.map((m) => `${m.sender}: ${m.text}`).join('\n'),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages([...newMessages, { sender: 'Therapist', text: data.aiResponse, timestamp: new Date() }]);
      } else {
        setMessages([
          ...newMessages,
          {
            sender: 'Therapist',
            text: "I apologize, but I'm experiencing some technical difficulties. Let's take a pause and try again in a moment.",
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      console.log(error);
      setMessages([
        ...newMessages,
        {
          sender: 'Therapist',
          text: "I apologize, but I'm experiencing some technical difficulties. Let's take a pause and try again in a moment.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-transparent">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto px-4 pb-32 w-full max-w-2xl mx-auto"> {/* Increased bottom padding */}
        <MessageList messages={messages} />
      </div>

      {/* Floating input area */}
      <div className="sticky bottom-20 md:bottom-4 mx-auto w-full max-w-2xl px-4"> {/* Responsive bottom positioning */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200/20 p-2 shadow-lg">
          <MessageInput onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}