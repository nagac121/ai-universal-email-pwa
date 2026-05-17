import React from 'react';
import Link from 'next/link';
import { Mail, Search, Edit, Settings } from 'lucide-react';

export default function BottomNav() {
  return (
    <nav className="flex justify-around items-center h-14 border-t bg-white">
      <Link href="/inbox" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
        <Mail size={20} />
        <span className="text-xs">Inbox</span>
      </Link>
      <Link href="/search" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
        <Search size={20} />
        <span className="text-xs">Search</span>
      </Link>
      <Link href="/compose" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
        <Edit size={20} />
        <span className="text-xs">Compose</span>
      </Link>
      <Link href="/settings" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
        <Settings size={20} />
        <span className="text-xs">Settings</span>
      </Link>
    </nav>
  );
}
