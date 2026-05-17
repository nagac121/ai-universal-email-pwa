import { BaseService } from './base-service';
import { EmailMessage, SearchQuery, PaginatedResult, ConnectionStatus, Provider } from '../types/email';

export interface EmailServiceConfig {
  provider: Provider;
  mockMode?: boolean;
  oauthEnabled?: boolean;
}

export class EmailService extends BaseService<PaginatedResult<EmailMessage>> {
  private mockEmails: EmailMessage[] = [];

  constructor(config: EmailServiceConfig) {
    super({
      ...config,
      mockMode: config.mockMode || !process.env.GOOGLE_CLIENT_ID || !process.env.MICROSOFT_CLIENT_ID || process.env.MOCK_MODE === 'true',
    });
    this.initializeMockData();
  }

  private initializeMockData(): void {
    this.mockEmails = [
      {
        id: 'mock-1',
        threadId: 'thread-1',
        accountId: 'mock-gmail',
        from: { name: 'Kelly Torres', email: 'kelly@torresmail.com' },
        to: [{ name: 'Michael Scott', email: 'michael@scottemail.com' }],
        subject: '[Urgent] Project Update Needed',
        body: { text: 'We need to finalize the Q3 budget by EOD. Please review the attached spreadsheet', snippet: 'We need to finalize the Q3 budget...' },
        date: new Date('2026-05-15T14:30:00Z'),
        labels: ['work', 'budget'],
        attachments: [],
        read: false,
        starred: false,
        flagged: false,
        important: true,
      },
      {
        id: 'mock-2',
        threadId: 'thread-1',
        accountId: 'mock-gmail',
        from: { name: 'Kelly Torres', email: 'kelly@torresmail.com' },
        to: [{ name: 'Robert Johnson', email: 'robert@example.com' }],
        subject: 'Re: [Urgent] Project Update Needed',
        body: { text: 'I will finalize the budget by Thursday. Can we schedule a call?', snippet: 'I will finalize...' },
        date: new Date('2026-05-15T15:15:00Z'),
        labels: ['work', 'reply'],
        attachments: [],
        read: true,
        starred: false,
        flagged: false,
        important: true,
      },
      {
        id: 'mock-3',
        threadId: 'thread-2',
        accountId: 'mock-gmail',
        from: { name: 'David Chen', email: 'david.chen@example.com' },
        to: [{ name: 'Michael Scott', email: 'michael@scottemail.com' }],
        subject: 'Team Meeting Thursday at 2pm',
        body: { text: 'Hi team, let\'s meet Thursday at 2pm to discuss the project timeline. Please bring your updates.', snippet: 'Hi team, let\'s meet...' },
        date: new Date('2026-05-14T10:00:00Z'),
        labels: ['work', 'meeting'],
        attachments: [],
        read: false,
        starred: false,
        flagged: false,
        important: false,
      },
      {
        id: 'mock-4',
        threadId: 'thread-3',
        accountId: 'mock-outlook',
        from: { name: 'Sarah Wilson', email: 'sarah.w@outlook.com' },
        to: [{ name: 'Admin', email: 'admin@example.com' }],
        subject: 'Re: Vacation Request Approved',
        body: { text: 'Great! Your vacation request has been approved for June 15-22.', snippet: 'Great! Your vacation...' },
        date: new Date('2026-05-13T16:45:00Z'),
        labels: ['personal', 'approved'],
        attachments: [],
        read: true,
        starred: true,
        flagged: false,
        important: false,
      },
      {
        id: 'mock-5',
        threadId: 'thread-4',
        accountId: 'mock-outlook',
        from: { name: 'IT Support', email: 'it-support@company.com' },
        to: [{ name: 'All Employees', email: 'all@company.com' }],
        subject: 'System Maintenance This Weekend',
        body: { text: 'The system will be down Saturday 6am-12pm for maintenance. Please plan accordingly.', snippet: 'The system will be...' },
        date: new Date('2026-05-12T09:00:00Z'),
        labels: ['work', 'announcement'],
        attachments: [],
        read: false,
        starred: false,
        flagged: false,
        important: false,
      },
    ];
  }

  getRequiredEnvVars(): string[] {
    return ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'IMAP_HOST', 'IMAP_PORT', 'IMAP_USER', 'IMAP_PASSWORD'];
  }

  performConnect(): Promise<void> {
    return Promise.resolve();
  }

  performDisconnect(): Promise<void> {
    return Promise.resolve();
  }

  performExecute(operation: string, data?: unknown): Promise<PaginatedResult<EmailMessage>> {
    console.log(`Email operation: ${operation}`, data);
    // Real implementation would call Gmail API, Microsoft Graph API, or IMAP
    return Promise.resolve({
      items: this.mockEmails,
      total: this.mockEmails.length,
      page: 1,
      limit: 20,
      hasNextPage: false,
    });
  }

  executeMock(operation: string, data?: unknown): Promise<PaginatedResult<EmailMessage>> {
    console.log(`Email mock operation: ${operation}`, data);
    return Promise.resolve({
      items: this.mockEmails,
      total: this.mockEmails.length,
      page: 1,
      limit: 20,
      hasNextPage: false,
    });
  }

  async fetchEmails(accountId: string, limit: number = 20, page: number = 1): Promise<PaginatedResult<EmailMessage>> {
    const filtered = this.mockEmails.filter(e => e.accountId === accountId);
    return this.execute('fetchEmails', { accountId, limit, page });
  }

  async searchEmails(query: SearchQuery): Promise<PaginatedResult<EmailMessage>> {
    let results = this.mockEmails;
    if (query.query) {
      const q = query.query.toLowerCase();
      results = results.filter(e =>
        e.subject.toLowerCase().includes(q) ||
        e.body.text?.toLowerCase().includes(q) ||
        e.from.name.toLowerCase().includes(q)
      );
    }
    if (query.unread) results = results.filter(e => !e.read);
    if (query.starred) results = results.filter(e => e.starred);
    return { items: results, total: results.length, page: 1, limit: 20, hasNextPage: false };
  }

  async markAsRead(emailId: string): Promise<void> {
    await this.execute('markAsRead', { emailId });
    const email = this.mockEmails.find(e => e.id === emailId);
    if (email) email.read = true;
  }

  async sendEmail(from: string, to: string, subject: string, body: string): Promise<void> {
    await this.execute('sendEmail', { from, to, subject, body });
  }

  async archiveEmail(emailId: string): Promise<void> {
    await this.execute('archiveEmail', { emailId });
    this.mockEmails = this.mockEmails.filter(e => e.id !== emailId);
  }

  async deleteEmail(emailId: string): Promise<void> {
    await this.execute('deleteEmail', { emailId });
    this.mockEmails = this.mockEmails.filter(e => e.id !== emailId);
  }
}