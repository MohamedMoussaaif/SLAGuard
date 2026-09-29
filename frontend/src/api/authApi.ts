import axiosClient from './axiosClient';
import type { AuthResponse, LoginRequest, RegisterRequest, User, Role } from '../types/auth';

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

  getAllUsers: async (): Promise<User[]> => {
    const response = await axiosClient.get<User[]>('/auth/users');
    return response.data;
  },

  // Updates role for a specific user
  updateUserRole: async (userId: number, role: Role): Promise<User> => {
    const response = await axiosClient.put<User>(`/auth/users/${userId}/role`, { role });
    return response.data;
  },
};