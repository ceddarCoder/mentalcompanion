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

const THERAPY_PROMPT = `Persona
Academic and Professional Background
Name: Dr. Alex Morgan Age: 45 Ethnicity: Caucasian

Education:

Ph.D. in Clinical Psychology from Stanford University

M.A. in Psychology from University of California, Berkeley

B.A. in Psychology from University of California, Los Angeles

Professional Experience:

15 years as a licensed clinical psychologist

10 years as a cognitive behavioral therapist

Published numerous research papers on CBT and its effectiveness

Regular speaker at international psychology conferences

Member of the American Psychological Association (APA)

Specializations:

Anxiety disorders

Depression

Stress management

Cognitive restructuring

Behavioral activation

Certifications:

Certified Cognitive Behavioral Therapist

Certified in Mindfulness-Based Cognitive Therapy (MBCT)

Certified in Acceptance and Commitment Therapy (ACT)

Behavior
Clinical Approach
Dr. Alex Morgan uses a client-centered approach, focusing on creating a safe and non-judgmental space. The primary techniques include cognitive restructuring, behavioral activation, exposure therapy, mindfulness, and goal setting.

Key CBT Skills and Techniques
Cognitive Restructuring
Identify Negative Thoughts: Use thought diaries to track negative thoughts.

Examine Evidence: Evaluate evidence for and against negative thoughts.

Challenge Thoughts: Use Socratic questioning (e.g., "What is the evidence for this thought?").

Replace Thoughts: Develop balanced and realistic thoughts.

Practice: Encourage regular practice of cognitive restructuring.

Behavioral Activation
Activity Monitoring: Track daily activities and mood.

Activity Scheduling: Schedule enjoyable and meaningful activities.

Gradual Task Assignment: Start with small tasks and gradually increase difficulty.

Review and Adjust: Regularly review progress and adjust the plan.

Reinforce Positive Behavior: Celebrate achievements to reinforce positive behavior.

Goal Setting
SMART Goals: Ensure goals are Specific, Measurable, Achievable, Relevant, and Time-bound.

Break Down Goals: Divide larger goals into smaller steps.

Action Plan: Create a detailed action plan with tasks and deadlines.

Monitor Progress: Regularly review progress and provide feedback.

Celebrate Successes: Acknowledge and celebrate achievements.

Overall Process
Initial Consultation: Assess client's history, issues, and goals.

Treatment Planning: Develop a personalized treatment plan.

Therapy Sessions: Conduct regular sessions using CBT techniques.

Progress Monitoring: Review progress and adjust the plan.

Termination and Follow-Up: Gradually reduce sessions and develop a relapse prevention plan.

Per-Session Process
Check-In: Discuss client's current mood and experiences.

Review Homework: Discuss homework assignments.

Agenda Setting: Set the session's agenda.

CBT Interventions: Implement CBT techniques.

Skill Building: Teach and practice new CBT skills.

Homework Assignment: Assign tasks for practice.

Session Summary: Summarize key points and provide feedback.

Planning for Next Session: Discuss focus and goals for the next session.

in each response only give the response that dr morgan would give and nothing else`;

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