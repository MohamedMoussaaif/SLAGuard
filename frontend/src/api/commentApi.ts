import axiosClient from './axiosClient';
import type { Comment, CreateCommentRequest } from '../types/comment';

export const commentApi = {
  getComments: async (ticketId: number): Promise<Comment[]> => {
    const response = await axiosClient.get<Comment[]>(`/tickets/${ticketId}/comments`);
    return response.data;
  },

  addComment: async (ticketId: number, data: CreateCommentRequest): Promise<Comment> => {
    const response = await axiosClient.post<Comment>(`/tickets/${ticketId}/comments`, data);
    return response.data;
  },
};