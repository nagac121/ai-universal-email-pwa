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
      className="w-full p-2 border rounded"
    >
      {accounts.map(acc => (
        <option key={acc.id} value={acc.id}>
          {acc.name || acc.email}
        </option>
      ))}
    </select>
  );
}
