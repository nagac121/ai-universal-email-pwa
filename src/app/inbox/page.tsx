"use client";
import React, { useEffect } from 'react';
import AppShell from '../../components/layout/app-shell';
import EmailList from '../../components/email/email-list';
import { useEmailStore } from '../../lib/store/email-store';

export default function InboxPage() {
  const { emails, loading, error, fetchEmails } = useEmailStore(state => ({
    emails: state.emails,
    loading: state.loading,
    error: state.error,
    fetchEmails: state.fetchEmails,
  }));

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

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
