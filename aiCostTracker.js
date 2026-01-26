
import { supabase } from '@/lib/customSupabaseClient';

/**
 * AI Cost Tracking Service
 */
export const aiCostTracker = {
  /**
   * Formats cost for display.
   */
  formatCost: (cost) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 4
    }).format(cost || 0);
  },

  /**
   * Retrieves usage stats for a case.
   */
  getAIUsageStats: async (caseId) => {
    const { data, error } = await supabase
      .from('ai_usage_logs')
      .select('tokens_used, cost')
      .eq('case_id', caseId);

    if (error) {
      console.error('Error fetching stats:', error);
      return { totalTokens: 0, totalCost: 0 };
    }

    const totalTokens = data.reduce((sum, log) => sum + (log.tokens_used || 0), 0);
    const totalCost = data.reduce((sum, log) => sum + (log.cost || 0), 0);

    return { totalTokens, totalCost };
  }
};
