import axiosClient from './axiosClient';
import type { AuditLog } from '../types/audit';

export const auditApi = {
  getAuditLogs: async (ticketId: number): Promise<AuditLog[]> => {
    const response = await axiosClient.get<AuditLog[]>(`/tickets/${ticketId}/audit-logs`);
    return response.data;
  },
};