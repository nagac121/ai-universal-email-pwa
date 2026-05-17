import { Provider, ConnectionStatus } from '../types/email';

import { EmailAccount } from '../types/email';

// Mock account data
const mockAccounts: Record<string, EmailAccount> = {
  'mock-gmail': {
    id: 'mock-gmail',
    provider: Provider.GMAIL,
    email: 'mock@gmail.com',
    name: 'Mock Gmail Account',
    status: ConnectionStatus.CONNECTED,
    connectedAt: new Date(Date.now() - 300000),
    lastSync: new Date(Date.now() - 60000),
    unreadCount: 15,
    totalEmails: 420,
  },
  'mock-outlook': {
    id: 'mock-outlook',
    provider: Provider.OUTLOOK,
    email: 'mock@outlook.com',
    name: 'Mock Outlook Account',
    status: ConnectionStatus.CONNECTED,
    connectedAt: new Date(Date.now() - 900000),
    lastSync: new Date(Date.now() - 300000),
    unreadCount: 27,
    totalEmails: 810,
  },
  'mock-imap': {
    id: 'mock-imap',
    provider: Provider.IMAP,
    email: 'mock@imap.example',
    name: 'Mock IMAP Account',
    status: ConnectionStatus.CONNECTED,
    connectedAt: new Date(Date.now() - 1800000),
    lastSync: new Date(Date.now() - 900000),
    unreadCount: 8,
    totalEmails: 240,
  }
};

export const getMockAccounts = () => mockAccounts;

export const getMockAccount = (accountId: string) => mockAccounts[accountId];