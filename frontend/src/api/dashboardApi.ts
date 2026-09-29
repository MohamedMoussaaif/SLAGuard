import axiosClient from './axiosClient';
import type { DashboardStats } from '../types/dashboard';

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await axiosClient.get<DashboardStats>('/dashboard/stats');
    return response.data;
  },
};