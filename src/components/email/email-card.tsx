import React from 'react';
import Link from 'next/link';
import { EmailMessage } from '../../lib/types/email';
import { useEmailStore } from '../../lib/store/email-store';

interface EmailCardProps {
  email: EmailMessage;
}

export default function EmailCard({ email }: EmailCardProps) {
  const markAsRead = useEmailStore(state => state.markAsRead);

  const handleClick = () => {
    if (!email.read) {
      markAsRead(email.id);
    }
  };

  return (
    <Link href={`/email/${email.id}`} onClick={handleClick} className="block p-3 hover:bg-gray-100">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium text-sm text-gray-900">
            {email.from.name || email.from.email}
          </p>
          <p className="text-sm text-gray-600 truncate">{email.subject}</p>
          <p className="text-xs text-gray-500 truncate">
            {email.body.snippet || email.body.text?.slice(0, 50)}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-400">{email.date.toLocaleDateString()}</span>
          {!email.read && <span className="w-2 h-2 bg-blue-500 rounded-full mt-1" />}
        </div>
      </div>
    </Link>
  );
}
