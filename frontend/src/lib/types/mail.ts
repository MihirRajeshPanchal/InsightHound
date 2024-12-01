export type MailRequestBody = {
    subject: string;
    body: string;
    senderMail?: string; 
    senderPassword?: string;
    recipientMail: string;
    attachments: Attachment[];
  };

export type Attachment = {
    filename: string;
    content: string; 
  };
  