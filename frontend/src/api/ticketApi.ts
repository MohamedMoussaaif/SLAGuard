import axiosClient from './axiosClient';
import type { Ticket, CreateTicketRequest, TicketStatus } from '../types/ticket';

export const ticketApi = {
  getAllTickets: async (): Promise<Ticket[]> => {
    const response = await axiosClient.get<Ticket[]>('/tickets');
    return response.data;
  },

  getTicketById: async (id: number): Promise<Ticket> => {
    const response = await axiosClient.get<Ticket>(`/tickets/${id}`);
    return response.data;
  },

  createTicket: async (data: CreateTicketRequest): Promise<Ticket> => {
    const response = await axiosClient.post<Ticket>('/tickets', data);
    return response.data;
  },

  updateStatus: async (id: number, status: TicketStatus): Promise<Ticket> => {
    const response = await axiosClient.put<Ticket>(`/tickets/${id}/status`, { ticketStatus: status });
    return response.data;
  },

  assignTicket: async (id: number, agentId: number): Promise<Ticket> => {
    const response = await axiosClient.put<Ticket>(`/tickets/${id}/assign`, { agentId });
    return response.data;
  },

  getNextAllowedStatuses: async (id: number): Promise<TicketStatus[]> => {
    const response = await axiosClient.get<TicketStatus[]>(`/tickets/${id}/next-allowed-statuses`);
    return response.data;
  },

  deleteTicket: async (id: number): Promise<void> => {
    await axiosClient.delete(`/tickets/${id}`);
  },
};