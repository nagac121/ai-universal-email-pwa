import { EmailMessage, Provider } from '../types/email';

// Mock email data
const mockEmails: Record<string, EmailMessage> = {
  'mock-gmail-1': {
    id: 'mock-gmail-1',
    threadId: 'thread-1',
    accountId: 'mock-gmail',
    from: { name: 'Kelly Torres', email: 'kelly@torresmail.com' },
    to: [{ name: 'Michael Scott', email: 'michael@scottemail.com' }],
    subject: '[Urgent] Project Update Needed',
    body: { html: '<div>We need to finalize the Q3 budget by EOD. Please review the attached spreadsheet</div>', text: 'We need to finalize the Q3 budget by EOD. Please review the attached spreadsheet', snippet: 'We need to finalize the Q3 budget by EOD...' },
    date: new Date('2026-05-15T14:30:00Z'),
    labels: ['work', 'budget'],
    attachments: [{ id: 'attachment-1', name: 'budget-q3.xlsx', size: 245000, mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', content: 'base64 encoded data' }],
    read: true,
    starred: false,
    flagged: false,
    important: true,
  },
  'mock-gmail-2': {
    id: 'mock-gmail-2',
    threadId: 'thread-1',
    accountId: 'mock-gmail',
    from: { name: 'Kelly Torres', email: 'kelly@torresmail.com' },
    to: [{ name: 'Robert Johnson', email: 'robert@example.com' }],
    subject: 'Re: [Urgent] Project Update Needed',
    body: { html: '<div>I will finalize the budget by Thursday. Can we schedule a call to confirm details?</div>', text: 'I will finalize the budget by Thursday...', snippet: 'I will finalize the budget...' },
    date: new Date('2026-05-15T15:15:00Z'),
    labels: ['work', 'reply'],
    attachments: [{ id: 'attachment-2', name: 'confirmed-budget.xlsx', size: 210000, mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', content: 'base64 encoded data' }],
    read: true,
    starred: false,
    flagged: false,
    important: true,
  },
  // More emails across providers... Omit for brevity
};

export const getMockEmails = () => mockEmails;

export const getMockEmail = (emailId: string) => mockEmails[emailId];