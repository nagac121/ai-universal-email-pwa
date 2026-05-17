import React from 'react';
import { EmailMessage } from '../../lib/types/email';
import { useEmailStore } from '../../lib/store/email-store';
import { Trash2, Archive, Reply, Forward } from 'lucide-react';

export default function EmailActions({ email }: { email: EmailMessage }) {
  const archiveEmail = useEmailStore(state => state.archiveEmail);
  const deleteEmail = useEmailStore(state => state.deleteEmail);
  const sendEmail = useEmailStore(state => state.sendEmail);

  const handleArchive = async () => {
    await archiveEmail(email.id);
  };

  const handleDelete = async () => {
    await deleteEmail(email.id);
  };

  const handleReply = async () => {
    // navigate to compose with prefilled data - for now just console.log
    console.log('Reply to', email.id);
  };

  const handleForward = async () => {
    console.log('Forward email', email.id);
  };

  return (
    <div className="flex space-x-4 mt-4">
      <button onClick={handleReply} className="flex items-center text-blue-600">
        <Reply size={20} className="mr-1" /> Reply
      </button>
      <button onClick={handleForward} className="flex items-center text-blue-600">
        <Forward size={20} className="mr-1" /> Forward
      </button>
      <button onClick={handleArchive} className="flex items-center text-gray-600">
        <Archive size={20} className="mr-1" /> Archive
      </button>
      <button onClick={handleDelete} className="flex items-center text-red-600">
        <Trash2 size={20} className="mr-1" /> Delete
      </button>
    </div>
  );
}
