"use client";
import React, { useEffect } from 'react';
import AppShell from '../../components/layout/app-shell';
import EmailList from '../../components/email/email-list';
import { useEmailStore } from '../../lib/store/email-store';

export default function InboxPage() {
  const emails = useEmailStore(state => state.emails);
  const loading = useEmailStore(state => state.loading);
  const error = useEmailStore(state => state.error);
  const fetchEmails = useEmailStore(state => state.fetchEmails);

  useEffect(() => {
    fetchEmails();
  }, []);

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
