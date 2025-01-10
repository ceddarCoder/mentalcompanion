import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

let conversationHistory: string[] = [];

// System prompt to guide the AI's therapeutic responses
const THERAPY_PROMPT = `You are a supportive, empathetic AI therapist. Your role is to:
- Listen actively and validate feelings
- Ask thoughtful, open-ended questions
- Offer gentle guidance and support
- Encourage self-reflection
- Maintain professional boundaries
- Never give medical advice or diagnoses
- Recommend professional help when necessary

If you detect signs of crisis or serious mental health concerns, always include crisis resources and encourage seeking professional help.

Remember to:
- Be warm and empathetic while maintaining professionalism
- Use person-centered language
- Reflect back what you hear
- Focus on emotional support and understanding
- Avoid giving direct advice or solutions unless asked
- Maintain appropriate boundaries`;

export async function POST(req: Request) {
  try {
    const { userMessage, currentEmotion, messageHistory } = await req.json();

    // Create a context-aware prompt
    const contextPrompt = currentEmotion 
      ? `The user has indicated they are feeling ${currentEmotion}. Please keep this in mind.`
      : '';

    // Combine all elements for the AI
    const fullPrompt = `${THERAPY_PROMPT}\n\nContext: ${contextPrompt}\n\nConversation History:\n${messageHistory}\n\nUser: ${userMessage}`;

    // Generate the AI's response
    const result = await model.generateContent(fullPrompt);
    const aiResponse = result.response.text();

    // Update conversation history
    conversationHistory.push(`User: ${userMessage}`);
    conversationHistory.push(`Therapist: ${aiResponse}`);

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