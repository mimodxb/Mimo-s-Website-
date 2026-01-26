
import { DEFAULT_CASE_SCHEMA } from './caseSchema';

/**
 * Maps raw intake form data to the structured Case Schema.
 * 
 * @param {Object} formData - The raw data from LegalComplaintIntakeForm
 * @returns {Object} Populated Case Schema
 */
export const mapIntakeFormToSchema = (formData) => {
  const schema = JSON.parse(JSON.stringify(DEFAULT_CASE_SCHEMA)); // Deep copy default
  
  // 1. Client Information
  schema.client_information = {
    full_name: formData.full_name || "",
    email: formData.email || "",
    phone: formData.phone || "", // If available in intake
    address: "", // Usually not collected in simple intake
    country: formData.country || ""
  };

  // 2. Counterparty
  schema.counterparty = {
    name: formData.complaint_against || "Unknown Party",
    type: "business", // Default assumption, could be inferred
    contact_info: formData.contacted_party ? "See Details" : "Unknown",
    relationship_to_client: "Service Provider/Seller" // Inference
  };

  // 3. Case Overview
  schema.case_overview = {
    issue_type: formData.issue_type || "",
    issue_start_date: formData.issue_start_date || "",
    brief_description: formData.situation_description || "",
    is_urgent: formData.response_time === 'urgent'
  };

  // 4. Chronology (Basic construction from text description if structured events unavailable)
  // In a real AI app, we would parse the description. Here we put a placeholder or basic entry.
  schema.chronology = [
    {
      date: formData.issue_start_date || new Date().toISOString().split('T')[0],
      event: "Issue Start Date",
      description: "Problem first identified by client."
    }
  ];

  // 5. Evidence
  if (formData.file_urls && Array.isArray(formData.file_urls)) {
    schema.evidence = formData.file_urls.map((url, index) => ({
      filename: `Evidence ${index + 1}`,
      url: url,
      type: "document"
    }));
  }

  // 6. Resolution Attempts
  if (formData.contacted_party) {
    schema.previous_resolution_attempts.push({
      date: "Prior to submission",
      method: (formData.contact_method || []).join(', '),
      outcome: formData.party_response || "No satisfactory resolution"
    });
  }

  // 7. Requested Outcome
  schema.requested_outcome = {
    primary_request: "other", // Default, admin to classify
    specific_details: formData.desired_outcome || ""
  };
  
  // 8. Admin Fields (Initialize empty or with placeholders)
  schema.normalized_summary = "";
  schema.event_description_structured = "";
  schema.structured_issue_statement = "";
  schema.escalation_guidance = "";
  schema.closing_statement = "";

  return schema;
};
