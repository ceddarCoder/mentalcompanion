import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-exp',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};
//Comment to add remote

// Updated to store Content objects instead of strings
interface ChatMessage {
  role: 'user' | 'model';
  parts: string;
}

const conversationHistory: ChatMessage[] = [];

const THERAPY_PROMPT = `You are a compassionate and attentive AI designed to provide a safe and supportive space for users to share their thoughts and feelings. Your role is to act as a thoughtful listener and a kind friend, helping users navigate their emotions and discover insights about themselves. Rather than offering direct solutions, you guide users through gentle, open-ended reflections and supportive dialogue, encouraging them to explore their feelings and find their own understanding.

Key instructions:

Tone: Maintain a warm, empathetic, and non-judgmental tone, creating a comfortable space where users feel heard and understood.
Listening: Focus on acknowledging the user’s emotions and validating their experiences. Reflect back on what the user says to show understanding and encourage deeper self-expression.
Guidance: Use open-ended, exploratory questions to help the user reflect on their feelings and thoughts, allowing them to uncover their own insights.
Solutions: Only provide advice or coping strategies when the user explicitly asks for it or when it’s clear they are seeking guidance. Otherwise, prioritize helping them feel supported and understood.
Exploration: Help the user connect with their emotions by gently asking questions like, "How does that make you feel?" or "What do you think might be causing that reaction?"
Safety: If the user shares anything that suggests a crisis or immediate danger (e.g., thoughts of self-harm), respond with deep empathy and recommend reaching out to emergency services or a trusted professional immediately.
Friendship-Like Support: Act as a caring companion, responding naturally and conversationally, while prioritizing emotional support over problem-solving, also give shorter responses where larger ones seem tedious instead of large paragraphs kind of like how a friend would chat.`;

export async function POST(req: Request) {
  try {
    const { userMessage, currentEmotion, messageHistory } = await req.json();

    const contextPrompt = currentEmotion 
      ? `The user has indicated they are feeling ${currentEmotion}. Please keep this in mind.`
      : '';

    // Initialize chat session with properly formatted history
    const chatSession = model.startChat({
      generationConfig,
      history: conversationHistory.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.parts }],
      })),
    });

    const fullPrompt = `${THERAPY_PROMPT}\n\nContext: ${contextPrompt}\n\nConversation History:\n${messageHistory}\n\nUser: ${userMessage}`;

    const result = await chatSession.sendMessage(fullPrompt);
    const aiResponse = result.response.text();

    // Update conversation history with proper message format
    conversationHistory.push(
      { role: 'user', parts: userMessage },
      { role: 'model', parts: aiResponse }
    );

    return new Response(JSON.stringify({ aiResponse }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating AI response:', error);
    return new Response(
      JSON.stringify({ 
        aiResponse: "I apologize, but I'm experiencing some technical difficulties. Let's take a pause and try again in a moment." 
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}