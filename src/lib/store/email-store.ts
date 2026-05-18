import { create } from "zustand";
import {
  EmailAccount,
  EmailMessage,
  PaginatedResult,
  SearchQuery,
  Provider,
} from "../types/email";
import { EmailService } from "../services/email-service";
import { AccountService } from "../services/account-service";

interface EmailState {
  accounts: EmailAccount[];
  activeAccountId: string;
  emails: EmailMessage[];
  total: number;
  loading: boolean;
  error?: string;
  searchQuery?: SearchQuery;
  // actions
  loadAccounts: () => void;
  setActiveAccount: (accountId: string) => void;
  fetchEmails: (limit?: number, page?: number) => Promise<void>;
  searchEmails: (query: SearchQuery) => Promise<void>;
  markAsRead: (emailId: string) => Promise<void>;
  archiveEmail: (emailId: string) => Promise<void>;
  deleteEmail: (emailId: string) => Promise<void>;
  sendEmail: (
    from: string,
    to: string,
    subject: string,
    body: string,
  ) => Promise<void>;
}

export const useEmailStore = create<EmailState>((set, get) => {
  const accountService = new AccountService({});
  const emailService = new EmailService({
    provider: undefined as unknown as Provider,
  }); // provider not used in mock mode

  return {
    accounts: [],
    activeAccountId: "",
    emails: [],
    total: 0,
    loading: false,
    error: undefined,
    searchQuery: undefined,
    loadAccounts: async () => {
      const accounts = accountService.getAccounts();
      set({ accounts, activeAccountId: accounts[0].id });
    },
    setActiveAccount: (accountId: string) => {
      set({ activeAccountId: accountId });
      // reload emails for new account
      get().fetchEmails();
    },
    fetchEmails: async (limit = 20, page = 1) => {
      set({ loading: true, error: undefined });
      try {
        const activeAccountId = get().activeAccountId;
        if (activeAccountId === 'unified') {
          // Fetch emails from all accounts
          const allEmails: EmailMessage[] = [];
          for (const account of get().accounts) {
            const result = await emailService.fetchEmails(account.id, limit, page);
            allEmails.push(...result.items);
          }
          // Sort all emails globally by date (newest first)
          allEmails.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          set({ emails: allEmails, total: allEmails.length, loading: false });
        } else {
          const result: PaginatedResult<EmailMessage> =
            await emailService.fetchEmails(activeAccountId, limit, page);
          set({ emails: result.items, total: result.total, loading: false });
        }
      } catch (e: unknown) {
        set({
          error: e instanceof Error ? e.message : String(e),
          loading: false,
        });
      }
    },
    searchEmails: async (query: SearchQuery) => {
      set({ loading: true, error: undefined, searchQuery: query });
      try {
        const result = await emailService.searchEmails(query);
        set({ emails: result.items, total: result.total, loading: false });
      } catch (e: unknown) {
        set({
          error: e instanceof Error ? e.message : String(e),
          loading: false,
        });
      }
    },
    markAsRead: async (emailId: string) => {
      await emailService.markAsRead(emailId);
      const emails = get().emails.map((e) =>
        e.id === emailId ? { ...e, read: true } : e,
      );
      set({ emails });
    },
    archiveEmail: async (emailId: string) => {
      await emailService.archiveEmail(emailId);
      const emails = get().emails.filter((e) => e.id !== emailId);
      set({ emails });
    },
    deleteEmail: async (emailId: string) => {
      await emailService.deleteEmail(emailId);
      const emails = get().emails.filter((e) => e.id !== emailId);
      set({ emails });
    },
    sendEmail: async (
      from: string,
      to: string,
      subject: string,
      body: string,
    ) => {
      await emailService.sendEmail(from, to, subject, body);
      // after sending, optionally refetch
      await get().fetchEmails();
    },
  };
});
