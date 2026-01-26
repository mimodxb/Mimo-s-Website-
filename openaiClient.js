
import { supabase } from '@/lib/customSupabaseClient';

/**
 * OpenAI Client Wrapper
 * 
 * Note: Direct use of OpenAI SDK in the browser is insecure as it exposes API keys.
 * This client acts as a bridge to the secure Supabase Edge Function 'process-case-with-ai'.
 */
export const openaiClient = {
  /**
   * Calls OpenAI via the secure backend proxy.
   * @param {string} prompt - The prompt to send
   * @param {string} model - The model to use (default gpt-3.5-turbo)
   * @param {number} temperature - Randomness (0-1)
   */
  callOpenAI: async (prompt, model = 'gpt-3.5-turbo', temperature = 0.7) => {
    try {
      const { data, error } = await supabase.functions.invoke('process-case-with-ai', {
        body: {
          directCall: true, // Flag to indicate direct prompt mode
          prompt,
          model,
          temperature
        }
      });

      if (error) throw error;
      return data.content;

    } catch (error) {
      console.error('OpenAI Bridge Error:', error);
      throw error;
    }
  }
};
