
import { supabase } from '@/lib/customSupabaseClient';
import { aiPrompts } from '@/lib/aiPrompts';

/**
 * Frontend Service for AI Case Structuring.
 * Orchestrates calls to the 'process-case-with-ai' Edge Function.
 */
export const aiCaseStructuringService = {
  
  /**
   * Generates a normalized summary using AI.
   */
  generateNormalizedSummary: async (caseId, caseOverview) => {
    return await invokeAIFunction(caseId, 'normalized_summary', {
      prompt: aiPrompts.normalizedSummaryPrompt(caseOverview)
    });
  },

  /**
   * Generates structured event descriptions.
   */
  generateStructuredEventDescriptions: async (caseId, rawEvents) => {
    return await invokeAIFunction(caseId, 'event_descriptions', {
      prompt: aiPrompts.structuredEventPrompt(rawEvents)
    });
  },

  /**
   * Generates the core issue statement.
   */
  generateStructuredIssueStatement: async (caseId, issueDesc, chronology, evidence) => {
    return await invokeAIFunction(caseId, 'issue_statement', {
      prompt: aiPrompts.structuredIssuePrompt(issueDesc, chronology, evidence)
    });
  },

  /**
   * Generates escalation guidance.
   */
  generateEscalationGuidance: async (caseId, category, type, country) => {
    return await invokeAIFunction(caseId, 'escalation_guidance', {
      prompt: aiPrompts.escalationGuidancePrompt(category, type, country)
    });
  },

  /**
   * Generates a closing statement.
   */
  generateClosingStatement: async (caseId) => {
    return await invokeAIFunction(caseId, 'closing_statement', {
      prompt: aiPrompts.closingStatementPrompt()
    });
  },

  /**
   * Fallback templates for when AI services are unavailable.
   */
  fallbacks: {
    normalizedSummary: (desc) => `<p><strong>Summary:</strong> ${desc || 'Client reports an issue requiring resolution.'} (Auto-generated fallback)</p>`,
    structuredEvent: (events) => `<ul><li>${events || 'No specific events recorded.'}</li></ul>`,
    structuredIssue: (issue) => `<p>The client asserts a failure regarding: ${issue || 'Unspecified issue'}.</p>`,
    escalationGuidance: () => `<ul><li>Contact Customer Support</li><li>Escalate to Manager</li><li>File Formal Complaint</li></ul>`,
    closingStatement: () => `<p>We request a formal response to this matter within 14 business days. Sincerely, The Claimant.</p>`
  }
};

// Helper to call Edge Function
async function invokeAIFunction(caseId, field, payload) {
  try {
    const { data, error } = await supabase.functions.invoke('process-case-with-ai', {
      body: {
        caseId,
        sections: [field],
        payload // Pass specific prompt or data context
      }
    });

    if (error) throw error;
    
    // The edge function returns { success: true, results: { [field]: { content, ... } } }
    if (data && data.results && data.results[field]) {
      return {
        success: true,
        content: data.results[field].content,
        tokensUsed: data.results[field].tokensUsed,
        model: data.results[field].model
      };
    }
    
    throw new Error("Invalid response format from AI service");

  } catch (err) {
    console.error(`AI Service Error (${field}):`, err);
    return {
      success: false,
      error: err.message,
      content: null
    };
  }
}
