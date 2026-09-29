import type { Role } from './auth';

export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export type TicketStatus =
  | 'OPEN'
  | 'IN_PROGRESS'
  | 'WAITING_ON_CLIENT'
  | 'RESOLVED'
  | 'CLOSED'
  | 'ESCALATED'
  | 'CANCELLED';

export interface UserSummary {
  id: number;
  fullName: string;
  email: string;
  role: Role;
}

export interface Ticket {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  slaDeadline: string; // ISO date string
  isSlaBreached: boolean;
  resolvedAt?: string | null;
  createdBy: UserSummary;
  assignedTo?: UserSummary | null;
  createdAt: string;
}

export interface CreateTicketRequest {
  title: string;
  description: string;
  priority: TicketPriority;
  category: string;
}