"use client";
import React from 'react';
import AppShell from '../../components/layout/app-shell';
import ComposeForm from '../../components/email/compose-form';

export default function ComposePage() {
  return (
    <AppShell>
      <section className="h-full">
        <h1 className="text-2xl font-bold mb-4">Compose Email</h1>
        <ComposeForm />
      </section>
    </AppShell>
  );
}
