import { agentBus } from './agent-bus';
import { EmailService } from '../services/email-service';
import { EmailMessage, SearchQuery, Provider } from '../types/email';

// EmailAgent encapsulates high‑level email operations and communicates via the bus.
export class EmailAgent {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService({ provider: undefined as unknown as Provider });
    // Subscribe to commands
    agentBus.subscribe('email:fetch', async payload => {
      const { accountId, limit, page } = payload as { accountId: string; limit?: number; page?: number };
      const result = await this.emailService.fetchEmails(accountId, limit, page);
      agentBus.publish('email:fetch:result', result);
    });

    agentBus.subscribe('email:search', async (payload: unknown) => {
      const query = payload as SearchQuery;
      const result = await this.emailService.searchEmails(query);
      agentBus.publish('email:search:result', result);
    });
  }

  // Direct method usage (fallback) – optional
  async fetch(accountId: string, limit = 20, page = 1) {
    return this.emailService.fetchEmails(accountId, limit, page);
  }

  async search(query: SearchQuery) {
    return this.emailService.searchEmails(query);
  }
}
