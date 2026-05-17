import React from "react";
import Link from "next/link";
import { EmailMessage } from "../../lib/types/email";
import { useEmailStore } from "../../lib/store/email-store";

interface EmailCardProps {
  email: EmailMessage;
}

import { useAIStore } from "../../lib/store/ai-store";

export default function EmailCard({ email }: EmailCardProps) {
  const markAsRead = useEmailStore((state) => state.markAsRead);

  const handleClick = () => {
    if (!email.read) {
      markAsRead(email.id);
    }
  };

  const priorities = useAIStore((state) => state.priorities);
  const summaries = useAIStore((state) => state.summaries);

  const priority = priorities[email.id];
  const summary = summaries[email.threadId];

  // Map priorityScore to label
  const getPriorityLabel = (score?: number) => {
    if (score === undefined) return null;
    if (score >= 90) return { text: "Urgent", color: "bg-red-500" };
    if (score >= 70) return { text: "High", color: "bg-orange-500" };
    if (score >= 50) return { text: "Medium", color: "bg-emerald-500" };
    return { text: "Low", color: "bg-indigo-500" };
  };

  const priorityLabel = getPriorityLabel(priority?.priorityScore);

  return (
    <Link
      href={`/email/${email.id}`}
      onClick={handleClick}
      className="block p-3 hover:bg-gray-100"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium text-sm text-gray-900">
            {email.from.name || email.from.email}
          </p>
          <p className="text-sm text-gray-600 truncate">{email.subject}</p>
          <p className="text-xs text-gray-500 truncate">
            {email.body.snippet || email.body.text?.slice(0, 50)}
            {priorityLabel && (
              <span
                className={`mt-1 inline-block px-2 py-0.5 text-xs font-medium text-white rounded ${priorityLabel.color}`}
              >
                {priorityLabel.text}
              </span>
            )}
            {summary && (
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {summary.summary}
              </p>
            )}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-400">
            {email.date.toLocaleDateString()}
          </span>
          {!email.read && (
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-1" />
          )}
        </div>
      </div>
    </Link>
  );
}
