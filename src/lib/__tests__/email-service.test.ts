import { EmailService } from '../services/email-service';
import { Provider } from '../types/email';

describe('EmailService (mock)', () => {
  const service = new EmailService({ provider: undefined as unknown as Provider });

  test('fetches mock emails', async () => {
    const result = await service.fetchEmails('mock-gmail');
    expect(result.items.length).toBeGreaterThan(0);
    expect(result.items[0].accountId).toBe('mock-gmail');
  });

  test('search filters correctly', async () => {
    const result = await service.searchEmails({ query: 'budget' });
    expect(result.items.every(e => e.subject.toLowerCase().includes('budget'))).toBe(true);
  });
});
