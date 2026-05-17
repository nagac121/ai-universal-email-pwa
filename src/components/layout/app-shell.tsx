import React, { ReactNode } from 'react';
import { useEmailStore } from '../../lib/store/email-store';
import Sidebar from './sidebar';
import BottomNav from './bottom-nav';

export default function AppShell({ children }: { children: ReactNode }) {
  const { accounts, activeAccountId, loadAccounts } = useEmailStore(state => ({
    accounts: state.accounts,
    activeAccountId: state.activeAccountId,
    loadAccounts: state.loadAccounts,
  }));

  React.useEffect(() => {
    loadAccounts();
  }, [loadAccounts]);

  return (
    <div className="flex flex-col h-screen">
      {/* Desktop layout */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        <Sidebar accounts={accounts} activeAccountId={activeAccountId} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">{children}</main>
      </div>
      {/* Mobile layout */}
      <div className="flex flex-col flex-1 md:hidden overflow-hidden">
        <main className="flex-1 overflow-y-auto p-2">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}
