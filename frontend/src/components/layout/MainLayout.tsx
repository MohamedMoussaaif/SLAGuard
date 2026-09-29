import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Modal } from '../common/Modal';
import { CreateTicketForm } from '../../pages/tickets/CreateTicketForm';

export const MainLayout: React.FC = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar onOpenCreateTicket={() => setIsCreateOpen(true)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet context={{ openCreateTicketModal: () => setIsCreateOpen(true) }} />
          </div>
        </main>
      </div>

      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create New Support Ticket"
      >
        <CreateTicketForm
          onSuccess={() => {
            setIsCreateOpen(false);
            window.dispatchEvent(new Event('ticketCreated'));
          }}
          onCancel={() => setIsCreateOpen(false)}
        />
      </Modal>
    </div>
  );
};