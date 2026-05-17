import { create } from "zustand";
import { AISummary, SmartReply, PrioritizedEmail } from "../types/ai";
import { AIService } from "../services/ai-service";

interface AIState {
  summaries: Record<string, AISummary>;
  smartReplies: Record<string, SmartReply>;
  priorities: Record<string, PrioritizedEmail>;
  loading: boolean;
  error?: string;
  // actions
  fetchSummary: (threadId: string) => Promise<void>;
  fetchSmartReply: (messageId: string) => Promise<void>;
  fetchPriorities: (accountId: string) => Promise<void>;
}

export const useAIStore = create<AIState>((set, get) => {
  const aiService = new AIService({});
  return {
    summaries: {},
    smartReplies: {},
    priorities: {},
    loading: false,
    error: undefined,
    fetchSummary: async (threadId: string) => {
      set({ loading: true, error: undefined });
      try {
        const summary = await aiService.summarize(threadId);
        set((state) => ({
          summaries: { ...state.summaries, [threadId]: summary as AISummary },
          loading: false,
        }));
      } catch (e: unknown) {
        const error = e instanceof Error ? e.message : String(e);
        set({ error, loading: false });
      }
    },
    fetchSmartReply: async (messageId: string) => {
      set({ loading: true, error: undefined });
      try {
        const reply = await aiService.smartReply(messageId);
        set((state) => ({
          smartReplies: {
            ...state.smartReplies,
            [messageId]: reply as SmartReply,
          },
          loading: false,
        }));
      } catch (e: unknown) {
        const error = e instanceof Error ? e.message : String(e);
        set({ error, loading: false });
      }
    },
    fetchPriorities: async (accountId: string) => {
      set({ loading: true, error: undefined });
      try {
        const priorities = await aiService.prioritize(accountId);
        const map: Record<string, PrioritizedEmail> = {};
        priorities.forEach((p) => (map[p.emailId] = p));
        set((state) => ({
          priorities: { ...state.priorities, ...map },
          loading: false,
        }));
      } catch (e: unknown) {
        const error = e instanceof Error ? e.message : String(e);
        set({ error, loading: false });
      }
    },
  };
});
