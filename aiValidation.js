
import { supabase } from '@/lib/customSupabaseClient';

export const aiValidation = {
  validateAIOutput: (field, content) => {
    if (!content) return { valid: false, score: 0, reason: 'Empty content' };
    
    let score = 100;
    const issues = [];

    // Length Check
    if (content.length < 20) {
      score -= 50;
      issues.push('Content too short');
    }

    // Placeholder Check
    if (content.includes('[') || content.includes('INSERT')) {
      score -= 30;
      issues.push('Contains placeholders');
    }

    // HTML Check
    if (field !== 'normalized_summary' && !content.includes('<')) {
      // Just a heuristic, not strict
      score -= 10;
      issues.push('Missing HTML formatting');
    }

    return {
      valid: score > 50,
      score,
      issues
    };
  },

  flagForReview: async (caseId, field, reason) => {
    await supabase.from('ai_review_flags').insert([{
      case_id: caseId,
      field_type: field,
      reason
    }]);
  }
};
