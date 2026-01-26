
/**
 * AI Prompts for Legal Complaint Structuring
 * These prompts are designed to produce professional, objective, and structured content.
 */

export const aiPrompts = {
  normalizedSummaryPrompt: (rawDescription) => `
    You are a professional legal case manager. Your task is to write a "Normalized Executive Summary" based on the raw client description below.
    
    Guidelines:
    - Tone: Objective, professional, non-emotional, factual.
    - Format: HTML paragraph (<p> tags).
    - Length: 3-5 concise sentences.
    - Content: Summarize who the parties are, the core issue, the financial impact, and the desired outcome.
    - Do NOT use phrases like "The client claims" or "allegedly" unless necessary. State the facts as presented.
    - Disclaimer: This is for administrative documentation only.
    
    Raw Description:
    "${rawDescription}"
  `,

  structuredEventPrompt: (rawEvents) => `
    You are a professional legal case manager. Transform the following raw event list into a "Structured Chronology".

    Guidelines:
    - Tone: Strict chronological order, factual, objective.
    - Format: HTML list (<ul> with <li>).
    - Style: "Date: Event description."
    - Remove emotional language (e.g., "I was so angry", "They rudely said").
    - Focus on actions, communications, and transactions.
    
    Raw Events:
    "${rawEvents}"
  `,

  structuredIssuePrompt: (issueDescription, chronology, evidence) => `
    You are a professional legal case manager. Draft a "Core Legal/Service Issue Statement" based on the provided details.

    Guidelines:
    - Tone: Formal, persuasive but grounded in fact.
    - Format: HTML content.
    - Identify the specific breach (contract, service failure, product defect).
    - Reference the provided evidence where applicable.
    - Clearly state why the counterparty is at fault.
    
    Context:
    Issue: ${issueDescription}
    Chronology Summary: ${chronology}
    Evidence Available: ${evidence}
  `,

  escalationGuidancePrompt: (issueCategory, counterpartyType, country) => `
    You are a professional legal case manager. Provide "Escalation Guidance" for a dispute involving a ${counterpartyType} regarding ${issueCategory} in ${country}.

    Guidelines:
    - Format: HTML bullet points.
    - Suggest 3-4 standard escalation steps (e.g., Formal Complaint -> Regulatory Body -> Small Claims).
    - Name specific regulators for ${country} if known (e.g., BBB in USA, Ombudsman in UK).
    - Include a disclaimer that this is process guidance, not legal advice.
  `,

  closingStatementPrompt: () => `
    Write a standard, professional "Closing Statement" for a formal complaint letter.
    
    Guidelines:
    - Tone: Firm, polite, expectant of resolution.
    - Format: HTML paragraph.
    - Request a response within a standard timeframe (e.g., 14 days).
    - State that further action will be taken if unresolved.
    - Sign off with "Sincerely, [Client Name]".
  `
};
