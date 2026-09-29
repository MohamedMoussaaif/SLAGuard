export type Role = 'ROLE_ADMIN' | 'ROLE_AGENT' | 'ROLE_CLIENT' | 'ADMIN' | 'AGENT' | 'CLIENT';

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}