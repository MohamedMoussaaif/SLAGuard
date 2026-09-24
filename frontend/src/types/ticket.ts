export type Role = 'ADMIN' | 'AGENT' | 'CLIENT';

export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export type TicketStatus = 
  | 'OPEN' 
  | 'ASSIGNED' 
  | 'IN_PROGRESS' 
  | 'WAITING_ON_CLIENT' 
  | 'RESOLVED' 
  | 'CLOSED' 
  | 'ESCALATED';

export interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdBy: { id: number; name: string; email: string };
  assignedTo?: { id: number; name: string; email: string } | null;
  slaDeadline: string; // ISO date string
  isSlaBreached: boolean;
  createdAt: string;
  resolvedAt?: string | null;
}