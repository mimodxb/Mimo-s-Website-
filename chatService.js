
import { supabase } from './customSupabaseClient';

/**
 * Sends a message to the AI concierge Edge Function.
 * @param {string} message - The user's message.
 * @param {Array} conversationHistory - Array of previous message objects {role, content}.
 * @returns {Promise<{response: string, toolCalls: Array, suggestedPages: Array}>}
 */
export async function chatWithMimo(message, conversationHistory) {
  try {
    const { data, error } = await supabase.functions.invoke('chat-with-mimo', {
      body: { message, conversationHistory }
    });

    if (error) {
      console.error('Edge Function Error:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Chat Service Error:', error);
    // Fallback response if service fails
    return {
      response: "I apologize, but I'm having trouble connecting to my neural network right now. Please try again later or use the standard contact form.",
      toolCalls: [],
      suggestedPages: []
    };
  }
}
