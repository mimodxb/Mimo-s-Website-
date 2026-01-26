
/**
 * AI Configuration Settings
 * These settings control the behavior of the AI case structuring features.
 */
export const AI_CONFIG = {
  // Model to use for generation. GPT-3.5-turbo is faster and cheaper. 
  // GPT-4 can be used for complex reasoning if budget allows.
  MODEL: 'gpt-3.5-turbo',
  
  // Controls randomness. 0.2 is focused/deterministic, 0.8 is creative.
  // For legal documents, we prefer lower temperature for consistency.
  TEMPERATURE: 0.3,
  
  // Max tokens for the response. 2000 is ~1500 words.
  MAX_TOKENS: 2000,
  
  // API Timeout in milliseconds
  TIMEOUT_MS: 30000,
  
  // Number of times to retry failed API calls
  MAX_RETRIES: 3,
  
  // Feature flags
  ENABLE_COST_TRACKING: true,
  ENABLE_LOGGING: true
};
