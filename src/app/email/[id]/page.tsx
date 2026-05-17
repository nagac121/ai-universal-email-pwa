"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import AppShell from '../../../components/layout/app-shell';
import { useEmailStore } from '../../../lib/store/email-store';
import EmailDetail from '../../../components/email/email-detail';

export default function EmailDetailPage() {
  const { id } = useParams() as { id: string };
  const emails = useEmailStore(state => state.emails);
  const loading = useEmailStore(state => state.loading);
  const error = useEmailStore(state => state.error);

  const email = emails.find(e => e.id === id);

  return (
    <AppShell>
      <section className="h-full">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {email ? (
          <EmailDetail email={email} />
        ) : (
          <p className="text-gray-500">Email not found.</p>
        )}
      </section>
    </AppShell>
  );
}
