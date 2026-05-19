import React from 'react';
import { EmailMessage } from '../../lib/types/email';
import EmailActions from './email-actions';

interface EmailDetailProps {
  email: EmailMessage;
}

import { useAIStore } from '../../lib/store/ai-store';
import { useState } from 'react';

export default function EmailDetail({ email }: EmailDetailProps) {
  const [loading, setLoading] = useState(false);
  const fetchSmartReply = useAIStore(state => state.fetchSmartReply);
  const smartReply = useAIStore(state => state.smartReplies[email.id]);
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
        {/* AI Smart Reply */}
        <div className="mt-4">
          <button
            onClick={async () => {
              setLoading(true);
              await fetchSmartReply(email.id);
              setLoading(false);
            }}
            disabled={loading}
            className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate AI Reply'}
          </button>
          {smartReply && (
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl mt-4">
              <p className="font-medium mb-1">AI Suggested Replies:</p>
              <ul className="list-disc list-inside space-y-1">
                {smartReply.suggestions.map((s, i) => (
                  <li key={`summary-${i}`}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
    </article>
  );
}
