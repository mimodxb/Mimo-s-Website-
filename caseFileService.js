
import { supabase } from '@/lib/customSupabaseClient';

export const caseFileService = {
  uploadCasePDF: async (pdfBlob, intakeId) => {
    try {
      // Validate size (max 50MB)
      if (pdfBlob.size > 50 * 1024 * 1024) {
        throw new Error('File size exceeds 50MB limit.');
      }

      const filename = `case_${intakeId}_${Date.now()}.pdf`;
      const filePath = `${intakeId}/${filename}`;

      const { error: uploadError } = await supabase.storage
        .from('case-deliverables')
        .upload(filePath, pdfBlob, {
          contentType: 'application/pdf',
          upsert: true
        });

      if (uploadError) throw uploadError;

      return {
        filePath,
        fileName: filename,
        fileSize: pdfBlob.size
      };
    } catch (error) {
      console.error('Error uploading case PDF:', error);
      throw error;
    }
  },

  generateFileUrl: (filePath) => {
    const { data } = supabase.storage
      .from('case-deliverables')
      .getPublicUrl(filePath);
    return data.publicUrl;
  },

  deleteFile: async (filePath) => {
    try {
      const { error } = await supabase.storage
        .from('case-deliverables')
        .remove([filePath]);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }
};
