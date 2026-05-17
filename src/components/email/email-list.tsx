import React from 'react';
import { EmailMessage } from '../../lib/types/email';
import EmailCard from './email-card';

interface EmailListProps {
  emails: EmailMessage[];
}

export default function EmailList({ emails }: EmailListProps) {
  if (!emails.length) {
    return <p className="text-gray-500">No emails to display.</p>;
  }

  return (
    <ul className="divide-y">
      {emails.map(email => (
        <li key={email.id}>
          <EmailCard email={email} />
        </li>
      ))}
    </ul>
  );
}
