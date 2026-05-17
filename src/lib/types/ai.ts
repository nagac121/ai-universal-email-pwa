export interface AISummary {
  threadId: string;
  summary: string;
  keyPoints?: string[];
}

export interface SmartReply {
  messageId: string;
  suggestions: string[];
}

export interface PrioritizedEmail {
  emailId: string;
  priorityScore: number; // 0-100, higher means more important
}

export interface AIConfig {
  model: string; // e.g., 'claude-3-opus-20240229'
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponse<T> {
  data: T;
  usage?: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
  };
}