export interface DashboardStats {
  totalTickets: number;
  openTickets: number;
  closedTickets: number;
  inProgressTickets: number;
  escalatedTickets: number;
  breachedTickets: number;
  slaComplianceRate: number; // e.g. 85.5
  ticketsByPriority: Record<string, number>;
  ticketsByStatus: Record<string, number>;
}