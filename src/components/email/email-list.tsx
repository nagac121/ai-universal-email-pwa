import React from 'react';
import { EmailMessage } from '../../lib/types/email';
import EmailCard from './email-card';

interface EmailListProps {
  emails: EmailMessage[];
}

import { useEmailStore } from '../../lib/store/email-store';

export default function EmailList({ emails }: EmailListProps) {
  const activeAccountId = useEmailStore(state => state.activeAccountId);
  const filteredEmails = activeAccountId === 'unified' ? emails : emails.filter(email => email.accountId === activeAccountId);
  if (!filteredEmails.length) {
    return <p className="text-gray-500">No emails to display.</p>;
  }

  return (
    <ul className="divide-y">
      {filteredEmails.map((email, index) => (
        <li key={`${email.accountId || 'acc'}-${email.id || 'mail'}-${index}`}>
          <EmailCard email={email} />
        </li>
      ))}
    </ul>
  );
}
