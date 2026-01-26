
import { supabase } from '@/lib/customSupabaseClient';

export const messageFileService = {
  validateFile: (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return { valid: false, error: 'File size exceeds 5MB limit.' };
    }
    return { valid: true };
  },

  uploadMessageFile: async (file, conversationId) => {
    const validation = messageFileService.validateFile(file);
    if (!validation.valid) throw new Error(validation.error);

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `${conversationId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('message-attachments')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('message-attachments')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  deleteFile: async (fileUrl) => {
    // Extract path from URL roughly
    const path = fileUrl.split('message-attachments/')[1];
    if (!path) return;

    const { error } = await supabase.storage
      .from('message-attachments')
      .remove([path]);
    
    return { error };
  }
};
