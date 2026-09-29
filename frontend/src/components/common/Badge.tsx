import React from 'react';
import type { TicketPriority, TicketStatus } from '../../types/ticket';

interface BadgeProps {
  type: 'status' | 'priority';
  value: TicketStatus | TicketPriority;
}

export const Badge: React.FC<BadgeProps> = ({ type, value }) => {
  if (type === 'status') {
    const statusStyles: Record<TicketStatus, string> = {
      OPEN: 'bg-blue-50 text-blue-700 border-blue-200',
      IN_PROGRESS: 'bg-purple-50 text-purple-700 border-purple-200',
      WAITING_ON_CLIENT: 'bg-amber-50 text-amber-700 border-amber-200',
      RESOLVED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      CLOSED: 'bg-slate-100 text-slate-700 border-slate-200',
      ESCALATED: 'bg-rose-50 text-rose-700 border-rose-300 font-bold animate-pulse',
      CANCELLED: 'bg-slate-50 text-slate-500 border-slate-200',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[value as TicketStatus] || 'bg-slate-50 text-slate-700'}`}>
        {value.replace(/_/g, ' ')}
      </span>
    );
  }

  const priorityStyles: Record<TicketPriority, string> = {
    LOW: 'bg-slate-50 text-slate-600 border-slate-200',
    MEDIUM: 'bg-blue-50 text-blue-700 border-blue-200',
    HIGH: 'bg-amber-50 text-amber-800 border-amber-300 font-medium',
    URGENT: 'bg-red-50 text-red-700 border-red-300 font-bold',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs border ${priorityStyles[value as TicketPriority]}`}>
      {value}
    </span>
  );
};