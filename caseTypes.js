
/**
 * Case Status Enum
 * @readonly
 * @enum {string}
 */
export const CaseStatus = {
  INTAKE: 'intake',
  IN_PROGRESS: 'in_progress',
  DELIVERED: 'delivered',
  CLOSED: 'closed'
};

/**
 * Entity Type Enum
 * @readonly
 * @enum {string}
 */
export const EntityType = {
  INDIVIDUAL: 'individual',
  BUSINESS: 'business',
  GOVERNMENT: 'government'
};

/**
 * Issue Category Enum
 * @readonly
 * @enum {string}
 */
export const IssueCategory = {
  CONTRACT: 'contract',
  EMPLOYMENT: 'employment',
  PROPERTY: 'property',
  FAMILY: 'family',
  CONSUMER: 'consumer',
  OTHER: 'other'
};

/**
 * Evidence Type Enum
 * @readonly
 * @enum {string}
 */
export const EvidenceType = {
  DOCUMENT: 'document',
  EMAIL: 'email',
  PHOTO: 'photo',
  VIDEO: 'video',
  AUDIO: 'audio',
  OTHER: 'other'
};

/**
 * Primary Request Enum
 * @readonly
 * @enum {string}
 */
export const PrimaryRequest = {
  MONETARY: 'monetary',
  INJUNCTION: 'injunction',
  SPECIFIC_PERFORMANCE: 'specific_performance',
  DECLARATORY_RELIEF: 'declaratory_relief',
  OTHER: 'other'
};

// JSDoc Types for reference in IDEs
/**
 * @typedef {Object} ClientInformation
 * @property {string} full_name
 * @property {string} email
 * @property {string} [phone]
 * @property {string} [address]
 * @property {string} [country]
 */

/**
 * @typedef {Object} Counterparty
 * @property {string} name
 * @property {string} type - one of EntityType
 * @property {string} [contact_info]
 */

/**
 * @typedef {Object} CaseSchema
 * @property {string} version
 * @property {string} case_id
 * @property {string} created_at
 * @property {ClientInformation} client_information
 * @property {Counterparty} counterparty
 * @property {Object} case_overview
 * @property {Array} chronology
 * @property {Array} evidence
 * @property {Array} previous_resolution_attempts
 * @property {Object} requested_outcome
 * @property {string} [normalized_summary]
 * @property {string} [event_description_structured]
 * @property {string} [structured_issue_statement]
 * @property {string} [escalation_guidance]
 * @property {string} [closing_statement]
 */
