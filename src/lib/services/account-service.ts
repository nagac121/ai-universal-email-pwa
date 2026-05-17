import { EmailAccount, ConnectionStatus, Provider } from '../types/email';

export interface AccountServiceConfig {
  mockMode?: boolean;
}

export class AccountService {
  private accounts: Record<string, EmailAccount> = {
    'mock-gmail': {
      id: 'mock-gmail',
      provider: Provider.GMAIL,
      email: 'mock@gmail.com',
      name: 'Mock Gmail Account',
      status: ConnectionStatus.CONNECTED,
      unreadCount: 15,
      totalEmails: 420,
    },
    'mock-outlook': {
      id: 'mock-outlook',
      provider: Provider.OUTLOOK,
      email: 'mock@outlook.com',
      name: 'Mock Outlook Account',
      status: ConnectionStatus.CONNECTED,
      unreadCount: 27,
      totalEmails: 810,
    },
    'mock-imap': {
      id: 'mock-imap',
      provider: Provider.IMAP,
      email: 'mock@imap.example',
      name: 'Mock IMAP Account',
      status: ConnectionStatus.CONNECTED,
      unreadCount: 8,
      totalEmails: 240,
    },
  };

  private activeAccountId: string = 'mock-gmail';

  constructor(config: AccountServiceConfig) {
    if (config.mockMode || process.env.MOCK_MODE === 'true') {
      // Already initialized with mock data
    }
  }

  getAccounts(): EmailAccount[] {
    return Object.values(this.accounts);
  }

  getAccount(accountId: string): EmailAccount | undefined {
    return this.accounts[accountId];
  }

  getActiveAccount(): EmailAccount {
    return this.accounts[this.activeAccountId] || this.accounts['mock-gmail'];
  }

  setActiveAccount(accountId: string): void {
    if (this.accounts[accountId]) {
      this.activeAccountId = accountId;
    }
  }

  async connectAccount(provider: Provider, email: string, credentials: unknown): Promise<EmailAccount> {
    const newAccount: EmailAccount = {
      id: `account-${Date.now()}`,
      provider,
      email,
      status: ConnectionStatus.CONNECTED,
      unreadCount: 0,
      totalEmails: 0,
    };
    this.accounts[newAccount.id] = newAccount;
    return newAccount;
  }

  async disconnectAccount(accountId: string): Promise<void> {
    if (this.accounts[accountId]) {
      this.accounts[accountId].status = ConnectionStatus.DISCONNECTED;
      if (this.activeAccountId === accountId) {
        this.activeAccountId = 'mock-gmail';
      }
    }
  }

  async refreshAllAccounts(): Promise<void> {
    // Mock refresh
    console.log('Refreshing all accounts...');
  }
}