"use client";
import React, { useEffect } from 'react';
import { useAIStore } from '../../lib/store/ai-store';
import { useEmailStore } from '../../lib/store/email-store';
import AppShell from '../../components/layout/app-shell';
import EmailList from '../../components/email/email-list';

export default function InboxPage() {
  const activeAccountId = useEmailStore(state => state.activeAccountId);
  const loadAccounts = useEmailStore(state => state.loadAccounts);
  const fetchPriorities = useAIStore(state => state.fetchPriorities);
  const emails = useEmailStore(state => state.emails);
  const loading = useEmailStore(state => state.loading);
  const error = useEmailStore(state => state.error);
  const fetchEmails = useEmailStore(state => state.fetchEmails);

  // Load accounts on mount to set activeAccountId
  useEffect(() => {
    loadAccounts();
  }, []);

  // Whenever activeAccountId is set, fetch emails and AI priorities for that account
  useEffect(() => {
    if (activeAccountId) {
      fetchEmails();
      fetchPriorities(activeAccountId);
    }
  }, [activeAccountId]);

  return (
    <AppShell>
      <section className="h-full">
        <h1 className="text-2xl font-bold mb-4">Inbox</h1>
        {loading && <p>Loading emails...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        <EmailList emails={emails} />
      </section>
    </AppShell>
  );
}
