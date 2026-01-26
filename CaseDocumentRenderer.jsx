
import React from 'react';
import DOMPurify from 'dompurify';

/**
 * Renders the structured case schema as a professional HTML document.
 * Designed to be used on-screen and for PDF generation.
 */
const CaseDocumentRenderer = ({ schema }) => {
  if (!schema) return <div className="p-8 text-center text-gray-500">No case data available.</div>;

  const {
    case_id,
    created_at,
    client_information,
    counterparty,
    normalized_summary,
    event_description_structured,
    structured_issue_statement,
    evidence,
    previous_resolution_attempts,
    requested_outcome,
    escalation_guidance,
    closing_statement
  } = schema;

  const styles = {
    container: {
      fontFamily: '"Times New Roman", Times, serif',
      lineHeight: '1.6',
      color: '#000',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#fff',
      padding: '40px',
      boxSizing: 'border-box'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
      borderBottom: '2px solid #000',
      paddingBottom: '20px'
    },
    h1: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '10px',
      textTransform: 'uppercase'
    },
    meta: {
      fontSize: '12px',
      color: '#666',
      marginBottom: '5px'
    },
    section: {
      marginBottom: '30px'
    },
    sectionTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      borderBottom: '1px solid #ddd',
      paddingBottom: '5px',
      marginBottom: '15px',
      color: '#333',
      textTransform: 'uppercase'
    },
    p: {
      marginBottom: '12px',
      textAlign: 'justify'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '15px',
      fontSize: '14px'
    },
    th: {
      borderBottom: '1px solid #000',
      textAlign: 'left',
      padding: '8px',
      fontWeight: 'bold'
    },
    td: {
      borderBottom: '1px solid #eee',
      padding: '8px',
      verticalAlign: 'top'
    },
    disclaimer: {
      marginTop: '60px',
      paddingTop: '20px',
      borderTop: '1px solid #ccc',
      fontSize: '10px',
      color: '#888',
      textAlign: 'center',
      fontStyle: 'italic'
    }
  };

  return (
    <div id="case-document-root" style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.h1}>Formal Complaint & Case Statement</h1>
        <div style={styles.meta}>Case Reference: {case_id || 'PENDING'}</div>
        <div style={styles.meta}>Date Generated: {new Date().toLocaleDateString()}</div>
      </div>

      {/* 1. Parties */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>1. Parties Involved</h2>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={{...styles.td, width: '30%', fontWeight: 'bold'}}>Claimant (Client)</td>
              <td style={styles.td}>
                {client_information.full_name}<br/>
                {client_information.email}<br/>
                {client_information.country}
              </td>
            </tr>
            <tr>
              <td style={{...styles.td, fontWeight: 'bold'}}>Respondent</td>
              <td style={styles.td}>
                {counterparty.name}<br/>
                Type: {counterparty.type}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 2. Executive Summary */}
      {normalized_summary && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>2. Executive Summary</h2>
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(normalized_summary) }} style={styles.p} />
        </div>
      )}

      {/* 3. Chronology */}
      {event_description_structured && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>3. Chronology of Events</h2>
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(event_description_structured) }} style={styles.p} />
        </div>
      )}

      {/* 4. Core Issue */}
      {structured_issue_statement && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>4. Core Legal/Service Issue</h2>
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(structured_issue_statement) }} style={styles.p} />
        </div>
      )}

      {/* 5. Evidence */}
      {evidence && evidence.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>5. Supporting Evidence</h2>
          <ul style={{paddingLeft: '20px', margin: '0'}}>
            {evidence.map((item, i) => (
              <li key={i} style={{marginBottom: '5px'}}>
                <strong>Exhibit {String.fromCharCode(65 + i)}:</strong> {item.filename} <br/>
                <span style={{fontSize: '12px', color: '#666'}}>{item.url}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 6. Resolution Attempts */}
      {previous_resolution_attempts && previous_resolution_attempts.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>6. Previous Resolution Attempts</h2>
          <table style={styles.table}>
             <thead>
               <tr>
                 <th style={styles.th}>Date</th>
                 <th style={styles.th}>Method</th>
                 <th style={styles.th}>Outcome</th>
               </tr>
             </thead>
             <tbody>
               {previous_resolution_attempts.map((att, i) => (
                 <tr key={i}>
                   <td style={styles.td}>{att.date}</td>
                   <td style={styles.td}>{att.method}</td>
                   <td style={styles.td}>{att.outcome}</td>
                 </tr>
               ))}
             </tbody>
          </table>
        </div>
      )}

      {/* 7. Requested Outcome */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>7. Requested Outcome</h2>
        <p style={styles.p}>The Claimant formally requests the following relief:</p>
        <div style={{...styles.p, backgroundColor: '#f9f9f9', padding: '15px', borderLeft: '3px solid #333'}}>
          {requested_outcome.specific_details}
        </div>
      </div>

      {/* 8. Escalation Guidance (Optional) */}
      {escalation_guidance && (
         <div style={styles.section}>
           <h2 style={styles.sectionTitle}>8. Recommended Next Steps & Escalation</h2>
           <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(escalation_guidance) }} style={styles.p} />
         </div>
      )}

      {/* 9. Closing Statement */}
      {closing_statement && (
        <div style={styles.section}>
           <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(closing_statement) }} style={styles.p} />
        </div>
      )}

      {/* Disclaimer */}
      <div style={styles.disclaimer}>
        <p><strong>DISCLAIMER:</strong> This document is a structured summary of a complaint based on information provided by the Claimant. It is intended for negotiation and record-keeping purposes only. Movsum Mirzazada is not a law firm and does not provide legal representation or legal advice. Parties are advised to consult with qualified legal counsel for court proceedings.</p>
        <p>© {new Date().getFullYear()} Movsum Mirzazada. All Rights Reserved. Confidential & Privileged.</p>
      </div>
    </div>
  );
};

export default CaseDocumentRenderer;
