
export const messagingEmailTemplates = {
  newMessageNotification: (recipientEmail, senderName, messagePreview, conversationLink) => ({
    subject: `New Message from ${senderName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; color: #333;">
        <h2 style="color: #E0A995;">New Message</h2>
        <p>You have received a new message from <strong>${senderName}</strong> regarding your case.</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #E0A995; margin: 20px 0;">
          <p style="font-style: italic; color: #555;">"${messagePreview.substring(0, 100)}${messagePreview.length > 100 ? '...' : ''}"</p>
        </div>
        <a href="${conversationLink}" style="display: inline-block; padding: 12px 24px; background-color: #E0A995; color: #000; text-decoration: none; border-radius: 4px; font-weight: bold;">View Conversation</a>
        <p style="font-size: 12px; color: #999; margin-top: 30px;">
          Please do not reply directly to this email. Use the link above to respond.
        </p>
      </div>
    `
  }),

  conversationCreatedEmail: (clientEmail, intakeReference, messagingLink) => ({
    subject: `Case Opened: ${intakeReference}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; color: #333;">
        <h2 style="color: #E0A995;">Case Opened</h2>
        <p>Your legal complaint case (<strong>${intakeReference}</strong>) has been successfully initialized.</p>
        <p>We have opened a secure messaging channel for this case where you can communicate directly with our team, upload additional evidence, and track progress.</p>
        <br/>
        <a href="${messagingLink}" style="display: inline-block; padding: 12px 24px; background-color: #E0A995; color: #000; text-decoration: none; border-radius: 4px; font-weight: bold;">Access Messaging Portal</a>
        
        <p style="font-size: 11px; color: #999; margin-top: 30px;">
          Subject to <a href="https://movsummirzazada.com/terms-and-conditions">Terms & Conditions</a>. No legal advice provided.
        </p>
      </div>
    `
  }),

  conversationArchivedEmail: (clientEmail, intakeReference) => ({
    subject: `Case Archived: ${intakeReference}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; color: #333;">
        <h2 style="color: #E0A995;">Conversation Archived</h2>
        <p>The messaging thread for case <strong>${intakeReference}</strong> has been archived.</p>
        <p>You can still view the history in your dashboard, but new messages cannot be sent unless the case is reopened.</p>
      </div>
    `
  }),
  
  caseDeliveredEmail: (clientEmail, intakeReference, caseTitle, downloadLink) => ({
    subject: `Case Delivered: ${intakeReference}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; color: #333;">
        <h2 style="color: #E0A995;">Case Deliverable Ready</h2>
        <p>Great news! Your structured legal complaint case <strong>${caseTitle}</strong> (Ref: ${intakeReference}) is ready for review and download.</p>
        
        <div style="margin: 30px 0; text-align: center;">
           <a href="${downloadLink}" style="display: inline-block; padding: 14px 28px; background-color: #E0A995; color: #000; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">Download Case PDF</a>
        </div>
        
        <p>You can also access this document anytime from your messaging dashboard.</p>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        
        <p style="font-size: 11px; color: #999;">
          <strong>Confidentiality Notice:</strong> The documents provided are strictly confidential and intended solely for the use of the individual to whom they are addressed. This service provides structured documentation based on your input and does not constitute legal representation or advice from a licensed attorney.
          <br/><br/>
          Governed by our <a href="https://movsummirzazada.com/terms-and-conditions">Terms & Conditions</a>.
        </p>
      </div>
    `
  })
};
