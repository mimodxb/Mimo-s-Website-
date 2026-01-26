
import { supabase } from '@/lib/customSupabaseClient';

export const caseDeliverableService = {
  getCaseDeliverable: async (intakeId) => {
    try {
      const { data, error } = await supabase
        .from('case_deliverables')
        .select('*')
        .eq('intake_id', intakeId)
        .maybeSingle();
        
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching case deliverable:', error);
      throw error;
    }
  },

  createCaseDeliverable: async (intakeId, conversationId, data) => {
    try {
      const { data: result, error } = await supabase
        .from('case_deliverables')
        .insert([{
          intake_id: intakeId,
          conversation_id: conversationId,
          ...data
        }])
        .select()
        .single();
        
      if (error) throw error;
      return result;
    } catch (error) {
      console.error('Error creating case deliverable:', error);
      throw error;
    }
  },

  updateCaseDeliverable: async (deliverableId, data) => {
    try {
      const { data: result, error } = await supabase
        .from('case_deliverables')
        .update({
          ...data,
          updated_at: new Date()
        })
        .eq('id', deliverableId)
        .select()
        .single();
        
      if (error) throw error;
      return result;
    } catch (error) {
      console.error('Error updating case deliverable:', error);
      throw error;
    }
  },

  markAsDelivered: async (deliverableId) => {
    try {
      const { data: result, error } = await supabase
        .from('case_deliverables')
        .update({
          delivery_status: 'delivered',
          delivered_at: new Date(),
          updated_at: new Date()
        })
        .eq('id', deliverableId)
        .select()
        .single();
        
      if (error) throw error;
      return result;
    } catch (error) {
      console.error('Error marking deliverable as delivered:', error);
      throw error;
    }
  },

  recordDownload: async (deliverableId) => {
    try {
      const { error } = await supabase
        .from('case_deliverables')
        .update({
          client_downloaded_at: new Date()
        })
        .eq('id', deliverableId);
        
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error recording download:', error);
      // We don't throw here to avoid blocking the user download if tracking fails
      return false;
    }
  }
};
