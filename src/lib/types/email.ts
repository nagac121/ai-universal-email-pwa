export interface EmailAccount {
  id: string;
  provider: Provider;
  email: string;
  name?: string;
  status: ConnectionStatus;
  connectedAt?: Date;
  lastSync?: Date;
  unreadCount: number;
  totalEmails: number;
}

export interface EmailMessage {
  id: string;
  threadId: string;
  accountId: string;
  from: EmailContact;
  to: EmailContact[];
  cc?: EmailContact[];
  bcc?: EmailContact[];
  subject: string;
  body: EmailBody;
  date: Date;
  labels: string[];
  attachments: EmailAttachment[];
  read: boolean;
  starred: boolean;
  flagged: boolean;
  important: boolean;
  conversationId?: string;
  references?: string[];
}

export interface EmailContact {
  name: string;
  email: string;
}

export interface EmailBody {
  html?: string;
  text?: string;
  snippet?: string;
}

export interface EmailAttachment {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  content?: string; // base64 encoded
}

export interface EmailThread {
  id: string;
  subject: string;
  messages: EmailMessage[];
  lastMessageDate: Date;
  hasUnread: boolean;
}

export interface Mailbox {
  id: string;
  name: string;
  type: MailboxType;
  unreadCount: number;
  totalEmails: number;
}

export enum Provider {
  GMAIL = 'gmail',
  OUTLOOK = 'outlook',
  IMAP = 'imap',
}

export enum ConnectionStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  ERROR = 'error',
}

export enum MailboxType {
  INBOX = 'inbox',
  SENT = 'sent',
  DRAFTS = 'drafts',
  TRASH = 'trash',
  SPAM = 'spam',
  CUSTOM = 'custom',
}

export interface SearchQuery {
  query: string;
  labels?: string[];
  fromDate?: Date;
  toDate?: Date;
  unread?: boolean;
  starred?: boolean;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
}