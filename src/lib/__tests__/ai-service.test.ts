import { AIService } from '../services/ai-service';

describe('AIService (mock)', () => {
  const service = new AIService({});

  test('summarize returns mock summary', async () => {
    const summary = await service.summarize('thread-1');
    expect(summary).toBeDefined();
    expect(summary.summary).toContain('budget');
  });

  test('smartReply returns mock suggestions', async () => {
    const reply = await service.smartReply('mock-1');
    expect(reply).toBeDefined();
    expect(reply.suggestions.length).toBeGreaterThan(0);
  });

  test('prioritize returns mock priorities', async () => {
    const priorities = await service.prioritize('mock-gmail');
    expect(priorities.length).toBeGreaterThan(0);
  });
});
