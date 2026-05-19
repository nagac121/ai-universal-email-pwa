"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { useEmailStore } from '../../lib/store/email-store';

interface FormValues {
  to: string;
  subject: string;
  body: string;
}

export default function ComposeForm() {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const sendEmail = useEmailStore(state => state.sendEmail);
  const activeAccount = useEmailStore(state => state.accounts.find(a => a.id === state.activeAccountId));

  const onSubmit = async (data: FormValues) => {
    if (!activeAccount) return;
    await sendEmail(activeAccount.email, data.to, data.subject, data.body);
    reset();
    alert('Email sent (mock)');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <div>
        <label htmlFor="to-field" className="block text-sm font-medium mb-1">To</label>
        <input
          id="to-field"
          type="email"
          {...register('to', { required: true })}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label htmlFor="subject-field" className="block text-sm font-medium mb-1">Subject</label>
        <input
          id="subject-field"
          type="text"
          {...register('subject', { required: true })}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label htmlFor="body-field" className="block text-sm font-medium mb-1">Body</label>
        <textarea
          id="body-field"
          {...register('body', { required: true })}
          rows={8}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Send
      </button>
    </form>
  );
}
