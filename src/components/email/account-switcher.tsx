import React from 'react';
import { EmailAccount } from '../../lib/types/email';
import { useEmailStore } from '../../lib/store/email-store';

interface AccountSwitcherProps {
  accounts: EmailAccount[];
  activeAccountId: string;
}

export default function AccountSwitcher({ accounts, activeAccountId }: AccountSwitcherProps) {
  const setActiveAccount = useEmailStore(state => state.setActiveAccount);

  return (
    <select id="account-selector" name="account-selector"
      value={activeAccountId}
      onChange={e => setActiveAccount(e.target.value)}
      className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer transition-all"
    >
      {accounts.map(acc => (
        <option key={acc.id} value={acc.id}>
          {acc.name || acc.email}
        </option>
      ))}
    </select>
  );
}
