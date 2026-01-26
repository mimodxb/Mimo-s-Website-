
import { supabase } from '@/lib/customSupabaseClient';

export const aiProcessingLogger = {
  getProcessingLogs: async (caseId) => {
    const { data, error } = await supabase
      .from('ai_processing_logs')
      .select('*')
      .eq('case_id', caseId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching logs:', error);
      return [];
    }
    return data;
  },

  logAdminAction: async (caseId, field, action) => {
    // This can be called from frontend to log "Accept", "Discard" actions
    const { error } = await supabase
      .from('ai_processing_logs')
      .insert([{
        case_id: caseId,
        field_type: field,
        action: action,
        details: { source: 'frontend_admin' }
      }]);
      
    if (error) console.error('Error logging admin action:', error);
  }
};
