
import { supabase } from '@/lib/customSupabaseClient';
import { validateFullSchema } from './caseSchema';

export const caseSchemaService = {
  /**
   * Saves the structured schema to the database
   */
  saveCaseSchema: async (deliverableId, schema) => {
    try {
      // Validate first
      const validation = validateFullSchema(schema);
      if (!validation.valid) {
        throw new Error(`Schema Validation Failed: ${validation.error}`);
      }

      const { data, error } = await supabase
        .from('case_deliverables')
        .update({
          case_schema: schema,
          updated_at: new Date()
        })
        .eq('id', deliverableId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error saving case schema:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Retrieves the schema for a deliverable
   */
  getCaseSchema: async (deliverableId) => {
    try {
      const { data, error } = await supabase
        .from('case_deliverables')
        .select('case_schema, case_title')
        .eq('id', deliverableId)
        .single();

      if (error) throw error;
      return { success: true, schema: data.case_schema, title: data.case_title };
    } catch (error) {
      console.error('Error fetching case schema:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Export schema as downloadable JSON
   */
  exportSchemaAsJSON: (schema, filename = 'case_schema.json') => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(schema, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", filename);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  },

  /**
   * Import schema from JSON file
   */
  importSchemaFromJSON: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target.result);
          // Basic validation
          const validation = validateFullSchema(json);
          if (!validation.valid) reject(new Error(validation.error));
          resolve(json);
        } catch (e) {
          reject(new Error("Invalid JSON file"));
        }
      };
      reader.onerror = error => reject(error);
      reader.readAsText(file);
    });
  }
};
