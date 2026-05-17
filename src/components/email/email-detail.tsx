import React from 'react';
import { EmailMessage } from '../../lib/types/email';
import EmailActions from './email-actions';

interface EmailDetailProps {
  email: EmailMessage;
}

export default function EmailDetail({ email }: EmailDetailProps) {
  return (
    <article className="prose max-w-none">
      <header className="mb-4">
        <h1 className="text-xl font-semibold">{email.subject}</h1>
        <p className="text-sm text-gray-600">
          From: {email.from.name} &lt;{email.from.email}&gt;
        </p>
        <p className="text-sm text-gray-600">Date: {email.date.toLocaleString()}</p>
      </header>
      <section className="mb-6">
        <div dangerouslySetInnerHTML={{ __html: email.body.html || '' }} />
        {!email.body.html && <p>{email.body.text}</p>}
      </section>
      <EmailActions email={email} />
    </article>
  );
}
