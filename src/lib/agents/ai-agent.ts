import { agentBus } from './agent-bus';
import { AIService } from '../services/ai-service';

export class AIAgent {
  private aiService: AIService;

  constructor() {
    this.aiService = new AIService({});
    // Subscriptions
    agentBus.subscribe('ai:summarize', async (payload: unknown) => {
      const { threadId } = payload as { threadId: string };
      const summary = await this.aiService.summarize(threadId);
      agentBus.publish('ai:summarize:result', summary);
    });

    agentBus.subscribe('ai:smartReply', async (payload: unknown) => {
      const { messageId } = payload as { messageId: string };
      const reply = await this.aiService.smartReply(messageId);
      agentBus.publish('ai:smartReply:result', reply);
    });

    agentBus.subscribe('ai:prioritize', async (payload: unknown) => {
      const { accountId } = payload as { accountId: string };
      const priorities = await this.aiService.prioritize(accountId);
      agentBus.publish('ai:prioritize:result', priorities);
    });
  }
}
