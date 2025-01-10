// helpers/gemini.ts
import { ChatSession, GoogleGenerativeAI } from "@google/generative-ai";

let conversation: ChatSession | null = null;

export function initializeChat(message: string) {
  const geminiApiKey = process.env.GOOGLE_API_KEY;
  const model = new GoogleGenerativeAI(geminiApiKey!).getGenerativeModel({ model: 'gemini-pro' });

  const initHistory = [
    { role: 'user', parts: [{ text: message }] },
    { role: 'model', parts: [{ text: 'Hi, I am Sam. How can I help you today about Vinit?' }] },
  ];

  conversation = model.startChat({
    history: initHistory,
    generationConfig: { maxOutputTokens: 350 },
  });
  
  return conversation;
}

export async function sendMessage(message: string) {
  const geminiApiKey = process.env.GOOGLE_API_KEY;
  if (!conversation) {
    console.error('Conversation not initialized');
    return { text: 'Conversation error', conversation: null };
  }

  try {
    const result = await conversation.sendMessage(message);
    return {
      text: result,
      conversation,
    };
  } catch (error) {
    console.error('Error sending message:', error);
    return { text: 'Something went wrong', conversation };
  }
}
