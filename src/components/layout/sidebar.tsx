import React from 'react';
import { EmailAccount } from '../../lib/types/email';
import AccountSwitcher from '../email/account-switcher';

interface SidebarProps {
  accounts: EmailAccount[];
  activeAccountId: string;
}

export default function Sidebar({ accounts, activeAccountId }: SidebarProps) {
  return (
    <aside className="w-64 border-r bg-gray-50 dark:bg-slate-900 p-4 overflow-y-auto" style={{ borderColor: 'var(--tw-ring-color, #e5e7eb)' }}>
      <h2 className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase mb-2">Accounts</h2>
      <AccountSwitcher accounts={accounts} activeAccountId={activeAccountId} />
      <nav className="mt-6 space-y-2">
        <a href="/inbox" className="block text-gray-700 hover:text-blue-600">Inbox</a>
        <a href="/search" className="block text-gray-700 hover:text-blue-600">Search</a>
        <a href="/compose" className="block text-gray-700 hover:text-blue-600">Compose</a>
        <a href="/settings" className="block text-gray-700 hover:text-blue-600">Settings</a>
      </nav>
    </aside>
  );
}
