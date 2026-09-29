import React, { useEffect, useState, useCallback } from 'react';
import { auditApi } from '../../../api/auditApi';
import type { AuditLog } from '../../../types/audit';
import { History, ShieldAlert, ArrowRight, UserCheck, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';

interface Props {
  ticketId: number;
}

export const TicketTimeline: React.FC<Props> = ({ ticketId }) => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLogs = useCallback(async () => {
    try {
      const data = await auditApi.getAuditLogs(ticketId);
      setLogs(data);
    } catch {
      // Handle error gracefully
    } finally {
      setIsLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'TICKET_CREATED':
        return <PlusCircle className="h-4 w-4 text-blue-500" />;
      case 'STATUS_CHANGE':
        return <ArrowRight className="h-4 w-4 text-purple-500" />;
      case 'ASSIGNMENT':
        return <UserCheck className="h-4 w-4 text-emerald-500" />;
      case 'SLA_BREACH_ESCALATED':
        return <ShieldAlert className="h-4 w-4 text-red-600" />;
      default:
        return <History className="h-4 w-4 text-slate-400" />;
    }
  };

  if (isLoading) {
    return <div className="py-6 text-center text-xs text-slate-400">Loading audit trail...</div>;
  }

  if (logs.length === 0) {
    return <div className="py-6 text-center text-xs text-slate-400">No activity history recorded yet.</div>;
  }

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
      {logs.map((log) => (
        <div key={log.id} className="relative flex items-start gap-3 text-xs">
          <div className="absolute -left-6 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white border border-slate-200 shadow-xs">
            {getActionIcon(log.action)}
          </div>

          <div className="flex-1 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-slate-900">
                {log.performedBy ? log.performedBy.fullName : 'System Automation'}
              </span>
              <span className="text-slate-400">
                {format(new Date(log.timestamp), 'MMM dd, HH:mm:ss')}
              </span>
            </div>
            <p className="text-slate-600">{log.details}</p>
          </div>
        </div>
      ))}
    </div>
  );
};