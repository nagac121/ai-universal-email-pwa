"use client";
import React, { useState } from 'react';
import AppShell from '../../components/layout/app-shell';
import { useEmailStore } from '../../lib/store/email-store';
import EmailList from '../../components/email/email-list';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const emails = useEmailStore(state => state.emails);
  const loading = useEmailStore(state => state.loading);
  const error = useEmailStore(state => state.error);
  const searchEmails = useEmailStore(state => state.searchEmails);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await searchEmails({ query });
  };

  return (
    <AppShell>
      <section className="h-full">
        <h1 className="text-2xl font-bold mb-4">Search</h1>
        <form onSubmit={handleSearch} className="mb-4">
          <input
            type="text"
            placeholder="Search emails..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </form>
        {loading && <p>Searching...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        <EmailList emails={emails} />
      </section>
    </AppShell>
  );
}
