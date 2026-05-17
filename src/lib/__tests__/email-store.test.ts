import { useEmailStore } from '../store/email-store';

describe('Email store (mock)', () => {
  test('loads accounts and sets active', async () => {
    const { loadAccounts, accounts, activeAccountId } = useEmailStore.getState();
    loadAccounts();
    expect(accounts.length).toBeGreaterThan(0);
    expect(activeAccountId).toBe(accounts[0].id);
  });

  test('fetches emails for active account', async () => {
    const { fetchEmails, emails } = useEmailStore.getState();
    await fetchEmails();
    expect(emails.length).toBeGreaterThan(0);
    expect(emails[0].accountId).toBeDefined();
  });
});
