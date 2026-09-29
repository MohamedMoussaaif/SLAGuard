import type { UserSummary } from './ticket';

export interface AuditLog {
  id: number;
  ticketId: number;
  performedBy?: UserSummary | null;
  action: string;
  oldValue?: string | null;
  newValue?: string | null;
  details: string;
  timestamp: string;
}