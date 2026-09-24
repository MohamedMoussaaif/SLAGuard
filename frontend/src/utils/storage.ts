const TOKEN_KEY = 'auth_token';

export const storage = {
  getToken: (): string | null => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string): void => localStorage.setItem(TOKEN_KEY, token),
  removeToken: (): void => localStorage.removeItem(TOKEN_KEY),
  clearAuth: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },
};