import { BaseService } from "./base-service";
import { Provider } from "../types/email";
import { AISummary, SmartReply, PrioritizedEmail } from "../types/ai";

export interface AIServiceConfig {
  mockMode?: boolean;
  apiKey?: string;
}

export class AIService extends BaseService<
  AISummary | SmartReply | PrioritizedEmail
> {
  private mockSummaries: Record<string, AISummary> = {
    "thread-1": {
      threadId: "thread-1",
      summary: "Budget discussion about Q3 spending. Need finalized by EOD.",
      keyPoints: [
        "Finalize Q3 budget",
        "Review spreadsheet",
        "Schedule call Thursday",
      ],
    },
    "thread-2": {
      threadId: "thread-2",
      summary:
        "Team meeting scheduled for Thursday at 2pm to discuss project timeline.",
      keyPoints: ["Meeting Thursday 2pm", "Bring project updates"],
    },
  };

  private mockSmartReplies: Record<string, SmartReply> = {
    "mock-1": {
      messageId: "mock-1",
      suggestions: [
        "I'll review the budget spreadsheet and get back to you.",
        "Let me check with the team first.",
        "Can we schedule a quick call to discuss?",
      ],
    },
  };

  private mockPriorities: Record<string, PrioritizedEmail> = {
    "mock-1": { emailId: "mock-1", priorityScore: 95 },
    "mock-2": { emailId: "mock-2", priorityScore: 80 },
    "mock-3": { emailId: "mock-3", priorityScore: 60 },
  };

  constructor(config: AIServiceConfig) {
    super({
      ...config,
      provider: Provider.GMAIL,
      mockMode:
        config.mockMode ||
        !process.env.ANTHROPIC_API_KEY ||
        process.env.MOCK_MODE === "true",
    });
  }

  getRequiredEnvVars(): string[] {
    return ["ANTHROPIC_API_KEY"];
  }

  performConnect(): Promise<void> {
    return Promise.resolve();
  }

  performDisconnect(): Promise<void> {
    return Promise.resolve();
  }

  performExecute(
    operation: string,
    data?: unknown,
  ): Promise<AISummary | SmartReply | PrioritizedEmail> {
    console.log(`AI operation: ${operation}`, data);
    // Real implementation would call Anthropic API
    return Promise.resolve(this.mockSummaries["thread-1"]);
  }

  executeMock(
    operation: string,
    data?: unknown,
  ): Promise<AISummary | SmartReply | PrioritizedEmail> {
    console.log(`AI mock operation: ${operation}`, data);

    switch (operation) {
      case "summarize":
        return Promise.resolve(this.mockSummaries["thread-1"]);
      case "smartReply":
        return Promise.resolve(this.mockSmartReplies["mock-1"]);
      case "prioritize":
        return Promise.resolve(this.mockPriorities["mock-1"]);
      default:
        return Promise.resolve(this.mockSummaries["thread-1"]);
    }
  }

  async summarize(threadId: string): Promise<AISummary> {
    return this.execute("summarize", { threadId }) as Promise<AISummary>;
  }

  async smartReply(messageId: string): Promise<SmartReply> {
    return this.execute("smartReply", { messageId }) as Promise<SmartReply>;
  }

  async prioritize(accountId: string): Promise<PrioritizedEmail[]> {
    const results: PrioritizedEmail[] = Object.values(this.mockPriorities);
    // Safely resolve as a Promise of PrioritizedEmail array
    return Promise.resolve(results);
  }
  async classify(emailId: string): Promise<string> {
    await this.execute("classify", { emailId });
    return "work";
  }

  async extract(emailId: string): Promise<string[]> {
    await this.execute("extract", { emailId });
    return ["key point 1", "key point 2"];
  }
}
