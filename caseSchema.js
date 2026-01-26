
export const CASE_SCHEMA_VERSION = "1.0.0";

export const DEFAULT_CASE_SCHEMA = {
  version: CASE_SCHEMA_VERSION,
  case_id: "",
  created_at: new Date().toISOString(),
  client_information: {
    full_name: "",
    email: "",
    phone: "",
    address: "",
    country: ""
  },
  counterparty: {
    name: "",
    type: "business", // individual, business, government
    contact_info: "",
    relationship_to_client: ""
  },
  case_overview: {
    issue_type: "",
    issue_start_date: "",
    brief_description: "",
    is_urgent: false
  },
  chronology: [], // Array of { date: "", event: "", evidence_ref: "" }
  evidence: [], // Array of { filename: "", url: "", description: "" }
  previous_resolution_attempts: [], // Array of { date: "", method: "", outcome: "" }
  requested_outcome: {
    primary_request: "",
    specific_details: ""
  },
  // Admin filled fields
  normalized_summary: "",
  event_description_structured: "",
  structured_issue_statement: "",
  escalation_guidance: "",
  closing_statement: ""
};

// Validation helpers
export const validateSection = (sectionName, data) => {
  if (!data) return false;
  
  switch(sectionName) {
    case 'client_information':
      return !!(data.full_name && data.email);
    case 'counterparty':
      return !!(data.name);
    case 'case_overview':
      return !!(data.brief_description);
    default:
      return true;
  }
};

export const validateFullSchema = (schema) => {
  if (!schema || typeof schema !== 'object') return { valid: false, error: "Invalid schema object" };
  
  const requiredSections = ['client_information', 'counterparty', 'case_overview'];
  for (const section of requiredSections) {
    if (!validateSection(section, schema[section])) {
      return { valid: false, error: `Invalid or missing section: ${section}` };
    }
  }
  
  return { valid: true };
};
