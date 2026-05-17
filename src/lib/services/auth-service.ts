import { BaseService } from './base-service';
import { EmailAccount, ConnectionStatus, Provider } from '../types/email';

export interface AuthServiceConfig {
  provider: Provider;
  mockMode?: boolean;
  clientId?: string;
  clientSecret?: string;
}

export class AuthService extends BaseService<EmailAccount> {
  private mockAccounts: Record<string, EmailAccount> = {
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
  };

  constructor(config: AuthServiceConfig) {
    super({ ...config, mockMode: config.mockMode || !process.env.GOOGLE_CLIENT_ID || !process.env.MICROSOFT_CLIENT_ID });
  }

  getRequiredEnvVars(): string[] {
    return ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'];
  }

  performConnect(): Promise<void> {
    return Promise.resolve();
  }

  performDisconnect(): Promise<void> {
    return Promise.resolve();
  }

  performExecute(operation: string, data?: unknown): Promise<EmailAccount> {
    // In real implementation, this would call actual OAuth APIs
    console.log(`Auth operation: ${operation}`, data);
    return Promise.resolve(this.mockAccounts['mock-gmail']);
  }

  executeMock(operation: string, data?: unknown): Promise<EmailAccount> {
    console.log(`Auth mock operation: ${operation}`, data);
    return Promise.resolve(this.mockAccounts['mock-gmail']);
  }

  async connectAccount(provider: Provider, email: string): Promise<EmailAccount> {
    return this.execute('connectAccount', { provider, email });
  }

  async disconnectAccount(accountId: string): Promise<void> {
    await this.execute('disconnectAccount', { accountId });
  }

  async refreshToken(accountId: string): Promise<EmailAccount> {
    return this.execute('refreshToken', { accountId });
  }
}