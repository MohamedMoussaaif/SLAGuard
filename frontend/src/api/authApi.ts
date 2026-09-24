import axiosClient from './axiosClient';
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types/auth';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  getAuthenticatedUser: async (): Promise<AuthResponse> => {
    const response = await axiosClient.get<AuthResponse>('/auth/authenticated-user');
    return response.data;
  },
};