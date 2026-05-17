import { agentBus } from './agent-bus';
import { AccountService } from '../services/account-service';
import { EmailAccount } from '../types/email';

export class AccountAgent {
  private accountService: AccountService;

  constructor() {
    this.accountService = new AccountService({});

    agentBus.subscribe('account:list', () => {
      const accounts = this.accountService.getAccounts();
      agentBus.publish('account:list:result', accounts);
    });

    agentBus.subscribe('account:switch', (payload: unknown) => {
      const { accountId } = payload as { accountId: string };
      this.accountService.setActiveAccount(accountId);
      agentBus.publish('account:switch:done', { accountId });
    });
  }

  getActiveAccount(): EmailAccount | undefined {
    return this.accountService.getActiveAccount();
  }
}
