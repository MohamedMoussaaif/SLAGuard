# .gitignore

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

```

# eslint.config.js

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])

```

# index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>frontend</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

# package.json

```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "axios": "^1.20.0",
    "date-fns": "^4.4.0",
    "lucide-react": "^1.48.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-router-dom": "^7.18.4",
    "recharts": "^3.10.1",
    "tailwindcss": "^4.3.3"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/node": "^24.13.3",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "@vitejs/plugin-react": "^6.1.1",
    "eslint": "^10.10.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.6",
    "globals": "^17.12.0",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.69.0",
    "vite": "^8.3.0"
  }
}

```

# public\favicon.svg

This is a file of the type: SVG Image

# public\icons.svg

This is a file of the type: SVG Image

# README.md

```md
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

\`\`\`js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

\`\`\`

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

\`\`\`js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

\`\`\`

```

# src\api\auditApi.ts

```ts
import axiosClient from './axiosClient';
import type { AuditLog } from '../types/audit';

export const auditApi = {
  getAuditLogs: async (ticketId: number): Promise<AuditLog[]> => {
    const response = await axiosClient.get<AuditLog[]>(`/tickets/${ticketId}/audit-logs`);
    return response.data;
  },
};
```

# src\api\authApi.ts

```ts
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
```

# src\api\axiosClient.ts

```ts
import axios from 'axios';
import { storage } from '../utils/storage';

const axiosClient = axios.create({
  baseURL: 'http://localhost:9090/api', // Adjust backend URL/port if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token
axiosClient.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 Unauthorized
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storage.clearAuth();
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
```

# src\api\commentApi.ts

```ts
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
```

# src\api\dashboardApi.ts

```ts
import axiosClient from './axiosClient';
import type { DashboardStats } from '../types/dashboard';

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await axiosClient.get<DashboardStats>('/dashboard/stats');
    return response.data;
  },
};
```

# src\api\slaApi.ts

```ts

```

# src\api\ticketApi.ts

```ts
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
```

# src\App.css

```css
@import "tailwindcss";

```

# src\App.tsx

```tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { TicketListPage } from './pages/tickets/TicketListPage';
import { TicketDetailPage } from './pages/tickets/TicketDetailPage';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Application Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/tickets" element={<TicketListPage />} />
                <Route path="/tickets/:ticketId" element={<TicketDetailPage />} />
              </Route>
            </Route>

            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
```

# src\components\common\Badge.tsx

```tsx
import React from 'react';
import type { TicketPriority, TicketStatus } from '../../types/ticket';

interface BadgeProps {
  type: 'status' | 'priority';
  value: TicketStatus | TicketPriority;
}

export const Badge: React.FC<BadgeProps> = ({ type, value }) => {
  if (type === 'status') {
    const statusStyles: Record<TicketStatus, string> = {
      OPEN: 'bg-blue-50 text-blue-700 border-blue-200',
      IN_PROGRESS: 'bg-purple-50 text-purple-700 border-purple-200',
      WAITING_ON_CLIENT: 'bg-amber-50 text-amber-700 border-amber-200',
      RESOLVED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      CLOSED: 'bg-slate-100 text-slate-700 border-slate-200',
      ESCALATED: 'bg-rose-50 text-rose-700 border-rose-300 font-bold animate-pulse',
      CANCELLED: 'bg-slate-50 text-slate-500 border-slate-200',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[value as TicketStatus] || 'bg-slate-50 text-slate-700'}`}>
        {value.replace(/_/g, ' ')}
      </span>
    );
  }

  const priorityStyles: Record<TicketPriority, string> = {
    LOW: 'bg-slate-50 text-slate-600 border-slate-200',
    MEDIUM: 'bg-blue-50 text-blue-700 border-blue-200',
    HIGH: 'bg-amber-50 text-amber-800 border-amber-300 font-medium',
    URGENT: 'bg-red-50 text-red-700 border-red-300 font-bold',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs border ${priorityStyles[value as TicketPriority]}`}>
      {value}
    </span>
  );
};
```

# src\components\common\Button.tsx

```tsx

```

# src\components\common\Input.tsx

```tsx

```

# src\components\common\Modal.tsx

```tsx
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-150">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
```

# src\components\common\SlaBadge.tsx

```tsx
import React, { useEffect, useState } from 'react';
import { Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { differenceInMinutes, formatDistanceToNow, isPast } from 'date-fns';

interface SlaBadgeProps {
  deadline: string;
  isBreached: boolean;
  status: string;
}

export const SlaBadge: React.FC<SlaBadgeProps> = ({ deadline, isBreached, status }) => {
  const [, setTick] = useState(0);

  // Update timer every minute
  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(timer);
  }, []);

  if (status === 'RESOLVED' || status === 'CLOSED') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
        <CheckCircle2 className="h-3.5 w-3.5" /> Resolved
      </span>
    );
  }

  const deadlineDate = new Date(deadline);
  const breached = isBreached || isPast(deadlineDate);
  const minutesLeft = differenceInMinutes(deadlineDate, new Date());

  // 1. Breached (Red)
  if (breached) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-red-100 text-red-800 border border-red-300">
        <AlertTriangle className="h-3.5 w-3.5 text-red-600" />
        SLA Breached
      </span>
    );
  }

  // 2. Near Breach: Less than 2 hours left (Yellow/Amber)
  if (minutesLeft < 120) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300">
        <Clock className="h-3.5 w-3.5 text-amber-600 animate-spin" />
        {formatDistanceToNow(deadlineDate)} left
      </span>
    );
  }

  // 3. Safe (Green)
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
      <Clock className="h-3.5 w-3.5 text-emerald-500" />
      {formatDistanceToNow(deadlineDate)} left
    </span>
  );
};
```

# src\components\common\Spinner.tsx

```tsx

```

# src\components\layout\MainLayout.tsx

```tsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Modal } from '../common/Modal';
import { CreateTicketForm } from '../../pages/tickets/CreateTicketForm';

export const MainLayout: React.FC = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar onOpenCreateTicket={() => setIsCreateOpen(true)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet context={{ openCreateTicketModal: () => setIsCreateOpen(true) }} />
          </div>
        </main>
      </div>

      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create New Support Ticket"
      >
        <CreateTicketForm
          onSuccess={() => {
            setIsCreateOpen(false);
            window.dispatchEvent(new Event('ticketCreated'));
          }}
          onCancel={() => setIsCreateOpen(false)}
        />
      </Modal>
    </div>
  );
};
```

# src\components\layout\Navbar.tsx

```tsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Bell, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">System</span>
        <span className="h-4 w-px bg-slate-200" />
        <span className="text-sm font-medium text-slate-700">Support Ticket & SLA Control</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition">
          <Bell className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
          <div className="flex flex-col text-right">
            <span className="text-sm font-semibold text-slate-900">{user?.firstName} {user?.lastName}</span>
            <span className="flex items-center justify-end gap-1 text-xs text-brand font-medium">
              <Shield className="h-3 w-3" />
              {user?.role.replace('ROLE_', '')}
            </span>
          </div>

          <button
            onClick={logout}
            title="Sign out"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
```

# src\components\layout\ProtectedRoute.tsx

```tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { Role } from '../../types/auth';

interface ProtectedRouteProps {
  allowedRoles?: Role[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
```

# src\components\layout\Sidebar.tsx

```tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Ticket, PlusCircle, ShieldAlert, Users } from 'lucide-react';

interface SidebarProps {
  onOpenCreateTicket: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenCreateTicket }) => {
  const { user } = useAuth();
  const isAdmin = user?.role?.includes('ADMIN');
  const isAdminOrAgent = isAdmin || user?.role?.includes('AGENT');

  return (
    <aside className="flex flex-col w-64 border-r border-slate-200 bg-white min-h-screen">
      {/* Brand Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white font-black text-sm">
          SLA
        </div>
        <span className="text-lg font-bold tracking-tight text-slate-900">SLAGuard</span>
      </div>

      {/* Action Button */}
      <div className="p-4">
        <button
          onClick={onOpenCreateTicket}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-brand-hover transition cursor-pointer"
        >
          <PlusCircle className="h-4 w-4" />
          New Ticket
        </button>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 space-y-1 px-3 py-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isActive
                ? 'bg-brand-light text-brand font-semibold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`
          }
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </NavLink>

        <NavLink
          to="/tickets"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isActive
                ? 'bg-brand-light text-brand font-semibold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`
          }
        >
          <Ticket className="h-4 w-4" />
          All Tickets
        </NavLink>

        {/* Administration Section */}
        {isAdminOrAgent && (
          <div className="pt-4 mt-4 border-t border-slate-100">
            <span className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Administration
            </span>
            <div className="mt-2 space-y-1">
              <NavLink
                to="/tickets?status=ESCALATED"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50 transition"
              >
                <ShieldAlert className="h-4 w-4 text-rose-600" />
                Escalated SLA
              </NavLink>

              {/* User Management (Admins Only) */}
              {isAdmin && (
                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'bg-brand-light text-brand font-semibold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  <Users className="h-4 w-4 text-slate-500" />
                  User Roles
                </NavLink>
              )}
            </div>
          </div>
        )}
      </nav>
    </aside>
  );
};
```

# src\context\AuthContext.tsx

```tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, LoginRequest, RegisterRequest } from '../types/auth';
import { authApi } from '../api/authApi';
import { storage } from '../utils/storage';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(storage.getToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch the current user on app load if a token exists
  useEffect(() => {
    const fetchUser = async () => {
      const savedToken = storage.getToken();
      if (!savedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const authData = await authApi.getAuthenticatedUser();
        setUser(authData.user);
        setToken(savedToken);
      } catch {
        // If token is expired or invalid
        storage.clearAuth();
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials: LoginRequest) => {
    const res = await authApi.login(credentials);
    storage.setToken(res.token);
    setToken(res.token);
    
    // Fetch fresh user data using the new token
    const authData = await authApi.getAuthenticatedUser();
    setUser(authData.user);
  };

  const register = async (data: RegisterRequest) => {
    const res = await authApi.register(data);
    storage.setToken(res.token);
    setToken(res.token);

    // Fetch fresh user data using the new token
    const authData = await authApi.getAuthenticatedUser();
    setUser(authData.user);
  };

  const refreshUser = async () => {
    try {
      const authData = await authApi.getAuthenticatedUser();
      setUser(authData.user);
    } catch {
      logout();
    }
  };

  const logout = () => {
    storage.clearAuth();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

# src\context\ToastContext.tsx

```tsx
import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, title?: string) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = 'info', title?: string) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, type, title, message }]);

      // Auto dismiss after 4 seconds
      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  const success = (message: string, title?: string) => showToast(message, 'success', title);
  const error = (message: string, title?: string) => showToast(message, 'error', title);
  const warning = (message: string, title?: string) => showToast(message, 'warning', title);
  const info = (message: string, title?: string) => showToast(message, 'info', title);

  const icons = {
    success: <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />,
    warning: <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />,
    info: <Info className="h-4 w-4 text-blue-600 shrink-0" />,
  };

  const borders = {
    success: 'border-emerald-200 bg-emerald-50/90 text-emerald-950',
    error: 'border-rose-200 bg-rose-50/90 text-rose-950',
    warning: 'border-amber-200 bg-amber-50/90 text-amber-950',
    info: 'border-blue-200 bg-blue-50/90 text-blue-950',
  };

  return (
    <ToastContext.Provider value={{ showToast, success, error, warning, info }}>
      {children}

      {/* Floating Toasts Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5 ${borders[t.type]}`}
          >
            <div className="mt-0.5">{icons[t.type]}</div>
            <div className="flex-1 text-xs">
              {t.title && <p className="font-bold mb-0.5">{t.title}</p>}
              <p className="leading-relaxed opacity-90">{t.message}</p>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="rounded-md p-1 opacity-60 hover:opacity-100 transition"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
```

# src\hooks\useAuth.ts

```ts
export { useAuth } from '../context/AuthContext';
```

# src\hooks\useDebounce.ts

```ts

```

# src\hooks\useSlaTimer.ts

```ts

```

# src\index.css

```css
@import "tailwindcss";

@theme {
  --color-brand: #F05335;
  --color-brand-hover: #db4124;
  --color-brand-light: #fef2f0;
  --color-brand-subtle: #fde5e1;
}
```

# src\main.tsx

```tsx
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <App />
)

```

# src\pages\auth\LoginPage.tsx

```tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, User as UserIcon, AlertCircle, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login({ username, password });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid username or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light text-brand font-bold text-xl border border-brand-subtle">
            SLA
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">Sign in to your account</h2>
          <p className="mt-1 text-sm text-slate-500">Support & Ticket Management System</p>
        </div>

        {error && (
          <div className="mt-6 flex items-center gap-2.5 rounded-lg bg-red-50 p-3.5 text-sm text-red-700 border border-red-200">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
            <div className="relative">
              <UserIcon className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg bg-white border border-slate-300 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10 transition"
                placeholder="Enter your username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-white border border-slate-300 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10 transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-brand-hover focus:outline-none focus:ring-4 focus:ring-brand/20 disabled:opacity-60 transition"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
            {!isSubmitting && <ArrowRight className="h-4 w-4" />}
          </button>

          <p className="pt-2 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-brand hover:underline">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
```

# src\pages\auth\RegisterPage.tsx

```tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User as UserIcon, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await register({ username, email, password, firstName, lastName });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light text-brand font-bold text-xl border border-brand-subtle">
            SLA
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">Create an account</h2>
          <p className="mt-1 text-sm text-slate-500">Register to submit tickets and track resolution SLAs</p>
        </div>

        {error && (
          <div className="mt-6 flex items-center gap-2.5 rounded-lg bg-red-50 p-3.5 text-sm text-red-700 border border-red-200">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-lg bg-white border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10 transition"
                placeholder="John"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-lg bg-white border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10 transition"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
            <div className="relative">
              <UserIcon className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg bg-white border border-slate-300 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10 transition"
                placeholder="johndoe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-white border border-slate-300 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10 transition"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-white border border-slate-300 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10 transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-brand-hover focus:outline-none focus:ring-4 focus:ring-brand/20 disabled:opacity-60 transition"
          >
            {isSubmitting ? 'Creating account...' : 'Create Account'}
            {!isSubmitting && <ArrowRight className="h-4 w-4" />}
          </button>

          <p className="pt-2 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-brand hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
```

# src\pages\dashboard\DashboardPage.tsx

```tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { dashboardApi } from '../../api/dashboardApi';
import type { DashboardStats } from '../../types/dashboard';
import {
  Ticket as TicketIcon,
  AlertTriangle,
  Clock,
  CheckCircle2,
  TrendingUp,
  RefreshCw,
  ArrowUpRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isTeamMember =
    user?.role?.includes('ADMIN') || user?.role?.includes('AGENT');

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    if (!isTeamMember) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const data = await dashboardApi.getStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load dashboard metrics', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [isTeamMember]);

  // SLA Donut Chart Data
  const complianceData = stats
    ? [
        { name: 'SLA Compliant', value: stats.totalTickets - stats.breachedTickets, color: '#10b981' },
        { name: 'SLA Breached', value: stats.breachedTickets, color: '#f43f5e' },
      ]
    : [];

  // Priority Bar Chart Data
  const priorityData = stats?.ticketsByPriority
    ? Object.entries(stats.ticketsByPriority).map(([priority, count]) => ({
        priority,
        count,
      }))
    : [];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return '#ef4444';
      case 'HIGH': return '#f59e0b';
      case 'MEDIUM': return '#3b82f6';
      default: return '#64748b';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {isTeamMember ? 'Enterprise SLA & Support Overview' : 'Customer Support Center'}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Welcome back, <span className="font-semibold text-slate-800">{user?.firstName} {user?.lastName}</span> ({user?.role?.replace('ROLE_', '')})
          </p>
        </div>

        {isTeamMember && (
          <button
            onClick={fetchStats}
            className="flex items-center gap-2 self-start sm:self-auto px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        )}
      </div>

      {/* KPI Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Volume</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <TicketIcon className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-slate-900">{stats?.totalTickets ?? 0}</h3>
            <p className="text-xs text-slate-500 mt-0.5">Tickets across all categories</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Open & Active</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-purple-700">{stats?.openTickets ?? 0}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{stats?.inProgressTickets ?? 0} currently in progress</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">SLA Escalations</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-rose-600">{stats?.breachedTickets ?? 0}</h3>
            <p className="text-xs text-rose-600/80 font-medium mt-0.5">Breached resolution target</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">SLA Compliance</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-emerald-600">
              {stats ? `${stats.slaComplianceRate}%` : '100%'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Target: 95.0% compliance</p>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      {isTeamMember && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* SLA Compliance Donut Chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">SLA Compliance Ratio</h3>
                <p className="text-xs text-slate-500">Tickets within deadline vs breached</p>
              </div>
            </div>

            <div className="h-56 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={complianceData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {complianceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} Tickets`, '']}
                    contentStyle={{ borderRadius: '10px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-center gap-6 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="font-medium text-slate-700">Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500" />
                <span className="font-medium text-slate-700">Breached</span>
              </div>
            </div>
          </div>

          {/* Tickets by Priority Bar Chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4 lg:col-span-2">
            <div>
              <h3 className="text-base font-bold text-slate-900">Volume by Priority Matrix</h3>
              <p className="text-xs text-slate-500">Distribution of workload urgency</p>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priorityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="priority" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(value) => [`${value} Tickets`, 'Count']}
                    contentStyle={{ borderRadius: '10px', fontSize: '12px' }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {priorityData.map((entry) => (
                      <Cell key={entry.priority} fill={getPriorityColor(entry.priority)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-xs text-slate-500">Need to address urgent items first</span>
              <button
                onClick={() => navigate('/tickets?priority=URGENT')}
                className="flex items-center gap-1 text-xs font-bold text-brand hover:underline"
              >
                View Urgent Tickets
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Access Action Card */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white shadow-sm">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            Support Service Level Agreement
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            URGENT issues have a strict 2-hour resolution window. Escalations are automatically routed to Admins every 60 seconds.
          </p>
        </div>

        <button
          onClick={() => navigate('/tickets')}
          className="rounded-xl bg-brand px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-brand-hover transition shrink-0"
        >
          Go to Ticket Board
        </button>
      </div>
    </div>
  );
};
```

# src\pages\NotFoundPage.tsx

```tsx

```

# src\pages\sla\SlaManagementPage.tsx

```tsx

```

# src\pages\tickets\components\TicketAssigneeSelector.tsx

```tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { authApi } from '../../../api/authApi';
import { ticketApi } from '../../../api/ticketApi';
import type { UserSummary } from '../../../types/ticket';
import type { User } from '../../../types/auth';
import { UserCheck, UserPlus, User as UserIcon } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

interface Props {
    ticketId: number;
    currentAssignee?: UserSummary | null;
    onAssigned: () => void;
}

export const TicketAssigneeSelector: React.FC<Props> = ({
    ticketId,
    currentAssignee,
    onAssigned,
}) => {
    const { success, error } = useToast();
    const { user: currentUser } = useAuth();
    const [agents, setAgents] = useState<User[]>([]);
    const [isAssigning, setIsAssigning] = useState(false);

    const isTeamMember =
        currentUser?.role?.includes('ADMIN') || currentUser?.role?.includes('AGENT');

    useEffect(() => {
        if (isTeamMember) {
            authApi
                .getAllUsers()
                .then((users) => {
                    // Filter agents and admins
                    const staff = users.filter(
                        (u) => u.role?.includes('AGENT') || u.role?.includes('ADMIN')
                    );
                    setAgents(staff);
                })
                .catch((err) => {
                    console.error('Failed to fetch agents', err);
                });
        }
    }, [isTeamMember]);

    const handleAssign = async (agentId: number) => {
        setIsAssigning(true);
        try {
            await ticketApi.assignTicket(ticketId, agentId);
            success('Ticket has been successfully assigned.', 'Assigned');
            onAssigned();
        } catch (err: any) {
            error(err.response?.data?.message || 'Failed to assign ticket', 'Error');
        } finally {
            setIsAssigning(false);
        }
    };

    const isAssignedToMe = currentAssignee?.id === currentUser?.id;

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Assigned Agent
                </span>
            </div>

            {/* Current Assignee Card */}
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 border border-slate-200">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-light text-brand font-bold text-xs border border-brand-subtle">
                        {currentAssignee ? (
                            currentAssignee.fullName?.charAt(0)
                        ) : (
                            <UserIcon className="h-4 w-4 text-slate-400" />
                        )}
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-900">
                            {currentAssignee ? currentAssignee.fullName : 'Unassigned'}
                        </p>
                        <p className="text-[11px] text-slate-400">
                            {currentAssignee ? currentAssignee.email : 'No agent assigned yet'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Agent Dropdown Selector (Visible for Admin & Agent) */}
            {isTeamMember && (
                <div className="space-y-2 pt-1">
                    <label className="block text-[11px] font-semibold text-slate-500">
                        Select or Reassign to Agent:
                    </label>
                    <div className="relative">
                        <select
                            disabled={isAssigning}
                            value={currentAssignee?.id || ''}
                            onChange={(e) => {
                                if (e.target.value) {
                                    handleAssign(Number(e.target.value));
                                }
                            }}
                            className="w-full appearance-none rounded-lg bg-white border border-slate-300 py-2 pl-3 pr-8 text-xs font-medium text-slate-800 focus:border-brand focus:outline-none cursor-pointer"
                        >
                            <option value="" disabled>
                                -- Choose an Agent --
                            </option>
                            {agents.map((agent) => (
                                <option key={agent.id} value={agent.id}>
                                    {agent.firstName} {agent.lastName} ({agent.role.replace('ROLE_', '')})
                                </option>
                            ))}
                        </select>
                        <UserCheck className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                    </div>

                    {/* Quick "Assign to Me" button */}
                    {currentUser && !isAssignedToMe && (
                        <button
                            type="button"
                            disabled={isAssigning}
                            onClick={() => handleAssign(currentUser.id)}
                            className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-brand/40 bg-brand-light/50 py-1.5 text-xs font-semibold text-brand hover:bg-brand-light hover:border-brand transition"
                        >
                            <UserPlus className="h-3.5 w-3.5" />
                            {isAssigning ? 'Assigning...' : 'Assign to Me'}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
```

# src\pages\tickets\components\TicketComments.tsx

```tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { commentApi } from '../../../api/commentApi';
import type { Comment } from '../../../types/comment';
import { Lock, Send, MessageSquare, AlertCircle, Shield } from 'lucide-react';
import { format } from 'date-fns';

interface Props {
  ticketId: number;
}

export const TicketComments: React.FC<Props> = ({ ticketId }) => {
  const { user } = useAuth();
  // Fixed Role Check
  const isTeamMember =
    user?.role?.includes('ADMIN') || user?.role?.includes('AGENT');

  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      const data = await commentApi.getComments(ticketId);
      setComments(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load comments');
    } finally {
      setIsLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSending(true);
    setError(null);
    try {
      await commentApi.addComment(ticketId, {
        content,
        isInternal: isTeamMember ? isInternal : false,
      });
      setContent('');
      await fetchComments();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to post comment');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Comment List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="py-6 text-center text-xs text-slate-400">Loading conversation...</div>
        ) : comments.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 py-6 text-center text-xs text-slate-400">
            No messages yet.
          </div>
        ) : (
          comments.map((comment) => {
            const isNote = comment.isInternal;

            return (
              <div
                key={comment.id}
                className={`rounded-xl border p-4 transition ${
                  isNote
                    ? 'bg-amber-50/80 border-amber-300 shadow-2xs'
                    : 'bg-white border-slate-200 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/5">
                  <div className="flex items-center gap-2">
                    <span className={`h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs ${isNote ? 'bg-amber-200 text-amber-900' : 'bg-slate-200 text-slate-700'}`}>
                      {comment.author?.fullName?.charAt(0) || 'U'}
                    </span>
                    <div>
                      <span className="text-xs font-bold text-slate-900">
                        {comment.author?.fullName}
                      </span>
                      <span className="text-[10px] text-slate-400 ml-1.5">
                        ({comment.author?.role?.replace('ROLE_', '')})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isNote && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-amber-200/80 px-2 py-0.5 text-[11px] font-bold text-amber-900 border border-amber-400">
                        <Lock className="h-3 w-3" /> Internal Note
                      </span>
                    )}
                    <span className="text-xs text-slate-400">
                      {format(new Date(comment.createdAt), 'MMM dd, HH:mm')}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-800 whitespace-pre-line leading-relaxed">
                  {comment.content}
                </p>
              </div>
            );
          })
        )}
      </div>

      {/* Post Box */}
      <form onSubmit={handleSend} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        {error && (
          <div className="mb-3 flex items-center gap-2 rounded-lg bg-red-50 p-2.5 text-xs text-red-700 border border-red-200">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Public vs Internal Switch */}
        {isTeamMember ? (
          <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-brand" />
              Comment Mode:
            </span>
            <div className="flex rounded-lg bg-slate-100 p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setIsInternal(false)}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition cursor-pointer ${
                  !isInternal
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <MessageSquare className="h-3.5 w-3.5 text-blue-500" />
                Public Reply
              </button>
              <button
                type="button"
                onClick={() => setIsInternal(true)}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition cursor-pointer ${
                  isInternal
                    ? 'bg-amber-100 text-amber-900 shadow-xs border border-amber-300'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Lock className="h-3.5 w-3.5 text-amber-700" />
                Internal Note (Yellow)
              </button>
            </div>
          </div>
        ) : null}

        <textarea
          required
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={
            isInternal
              ? '🔒 Write an internal note (only visible to Agents & Admins)...'
              : 'Write a public reply to the client...'
          }
          className={`w-full rounded-xl border p-3 text-sm focus:outline-none transition ${
            isInternal
              ? 'border-amber-300 bg-amber-50/50 focus:border-amber-500 placeholder:text-amber-800/60'
              : 'border-slate-200 bg-slate-50 focus:border-brand'
          }`}
        />

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {isInternal ? '⚠️ Visible only to Support Team' : 'Visible to everyone'}
          </span>

          <button
            type="submit"
            disabled={isSending || !content.trim()}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold text-white transition disabled:opacity-50 cursor-pointer ${
              isInternal
                ? 'bg-amber-600 hover:bg-amber-700'
                : 'bg-brand hover:bg-brand-hover'
            }`}
          >
            <Send className="h-3.5 w-3.5" />
            {isSending ? 'Posting...' : isInternal ? 'Post Internal Note' : 'Send Public Reply'}
          </button>
        </div>
      </form>
    </div>
  );
};
```

# src\pages\tickets\components\TicketTimeline.tsx

```tsx
import React, { useEffect, useState, useCallback } from 'react';
import { auditApi } from '../../../api/auditApi';
import type { AuditLog } from '../../../types/audit';
import { History, ShieldAlert, ArrowRight, UserCheck, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';

interface Props {
  ticketId: number;
}

export const TicketTimeline: React.FC<Props> = ({ ticketId }) => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLogs = useCallback(async () => {
    try {
      const data = await auditApi.getAuditLogs(ticketId);
      setLogs(data);
    } catch {
      // Handle error gracefully
    } finally {
      setIsLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'TICKET_CREATED':
        return <PlusCircle className="h-4 w-4 text-blue-500" />;
      case 'STATUS_CHANGE':
        return <ArrowRight className="h-4 w-4 text-purple-500" />;
      case 'ASSIGNMENT':
        return <UserCheck className="h-4 w-4 text-emerald-500" />;
      case 'SLA_BREACH_ESCALATED':
        return <ShieldAlert className="h-4 w-4 text-red-600" />;
      default:
        return <History className="h-4 w-4 text-slate-400" />;
    }
  };

  if (isLoading) {
    return <div className="py-6 text-center text-xs text-slate-400">Loading audit trail...</div>;
  }

  if (logs.length === 0) {
    return <div className="py-6 text-center text-xs text-slate-400">No activity history recorded yet.</div>;
  }

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
      {logs.map((log) => (
        <div key={log.id} className="relative flex items-start gap-3 text-xs">
          <div className="absolute -left-6 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white border border-slate-200 shadow-xs">
            {getActionIcon(log.action)}
          </div>

          <div className="flex-1 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-slate-900">
                {log.performedBy ? log.performedBy.fullName : 'System Automation'}
              </span>
              <span className="text-slate-400">
                {format(new Date(log.timestamp), 'MMM dd, HH:mm:ss')}
              </span>
            </div>
            <p className="text-slate-600">{log.details}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
```

# src\pages\tickets\CreateTicketForm.tsx

```tsx
import React, { useState } from 'react';
import { ticketApi } from '../../api/ticketApi';
import type { TicketPriority } from '../../types/ticket';
import { AlertCircle, Clock } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface Props {
    onSuccess: () => void;
    onCancel: () => void;
}

export const CreateTicketForm: React.FC<Props> = ({ onSuccess, onCancel }) => {
    const { success } = useToast();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Technical Issue');
    const [priority, setPriority] = useState<TicketPriority>('MEDIUM');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const prioritySlaMap: Record<TicketPriority, string> = {
        LOW: '48 Hours SLA',
        MEDIUM: '24 Hours SLA',
        HIGH: '8 Hours SLA',
        URGENT: '2 Hours SLA',
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            await ticketApi.createTicket({ title, category, priority, description });
            success(`Ticket created successfully with ${priority} priority target!`, 'Ticket Created');
            onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create ticket.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                </div>
            )}

            <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Title</label>
                <input
                    type="text"
                    required
                    placeholder="Brief summary of the issue"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-lg bg-white border border-slate-300 py-2 px-3 text-sm focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-lg bg-white border border-slate-300 py-2 px-3 text-sm focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10"
                    >
                        <option value="Technical Issue">Technical Issue</option>
                        <option value="Billing & Account">Billing & Account</option>
                        <option value="Feature Request">Feature Request</option>
                        <option value="System Outage">System Outage</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Priority</label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as TicketPriority)}
                        className="w-full rounded-lg bg-white border border-slate-300 py-2 px-3 text-sm focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10"
                    >
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                        <option value="URGENT">URGENT</option>
                    </select>
                </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <Clock className="h-4 w-4 text-brand" />
                <span>Estimated resolution target: <strong>{prioritySlaMap[priority]}</strong></span>
            </div>

            <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Description</label>
                <textarea
                    required
                    rows={4}
                    placeholder="Provide detailed information regarding the problem..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-lg bg-white border border-slate-300 py-2 px-3 text-sm focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10"
                />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 rounded-lg bg-brand text-sm font-semibold text-white hover:bg-brand-hover disabled:opacity-60 transition"
                >
                    {isSubmitting ? 'Creating...' : 'Submit Ticket'}
                </button>
            </div>
        </form>
    );
};
```

# src\pages\tickets\CreateTicketPage.tsx

```tsx

```

# src\pages\tickets\TicketDetailPage.tsx

```tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ticketApi } from '../../api/ticketApi';
import type { Ticket, TicketStatus } from '../../types/ticket';
import { Badge } from '../../components/common/Badge';
import { SlaBadge } from '../../components/common/SlaBadge';
import { TicketComments } from './components/TicketComments';
import { TicketTimeline } from './components/TicketTimeline';
import { TicketAssigneeSelector } from './components/TicketAssigneeSelector';
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  CheckCircle,
  MessageSquare,
  History,
  AlertTriangle
} from 'lucide-react';
import { format } from 'date-fns';

export const TicketDetailPage: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [allowedStatuses, setAllowedStatuses] = useState<TicketStatus[]>([]);
  const [activeTab, setActiveTab] = useState<'discussion' | 'timeline'>('discussion');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fixed Role Check
  const isTeamMember =
    user?.role?.includes('ADMIN') || user?.role?.includes('AGENT');

  const loadTicket = useCallback(async () => {
    if (!ticketId) return;
    try {
      const data = await ticketApi.getTicketById(Number(ticketId));
      setTicket(data);

      const nextStates = await ticketApi.getNextAllowedStatuses(Number(ticketId));
      setAllowedStatuses(nextStates);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load ticket');
    }
  }, [ticketId]);

  useEffect(() => {
    loadTicket();
  }, [loadTicket]);

  const handleStatusChange = async (newStatus: TicketStatus) => {
    if (!ticket) return;
    setIsUpdatingStatus(true);
    try {
      await ticketApi.updateStatus(ticket.id, newStatus);
      await loadTicket();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Invalid state transition');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 p-6 text-center text-red-700 border border-red-200">
        <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-600" />
        <p className="font-semibold">{error}</p>
        <button
          onClick={() => navigate('/tickets')}
          className="mt-4 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50"
        >
          Back to Tickets
        </button>
      </div>
    );
  }

  if (!ticket) {
    return <div className="p-8 text-center text-slate-400">Loading ticket #{ticketId}...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/tickets')}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tickets
        </button>

        {/* State Machine Transition Dropdown */}
        {isTeamMember && allowedStatuses.length > 0 && (
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 pl-2">Transition to:</span>
            <select
              disabled={isUpdatingStatus}
              onChange={(e) => handleStatusChange(e.target.value as TicketStatus)}
              defaultValue=""
              className="py-1 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-brand focus:outline-none cursor-pointer"
            >
              <option value="" disabled>
                Select next state...
              </option>
              {allowedStatuses.map((st) => (
                <option key={st} value={st}>
                  {st.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Details + Comments / Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-400">#{ticket.id}</span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-semibold text-slate-500">{ticket.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge type="priority" value={ticket.priority} />
                <Badge type="status" value={ticket.status} />
              </div>
            </div>

            <h1 className="text-xl font-bold text-slate-900">{ticket.title}</h1>
            <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {ticket.description}
            </p>
          </div>

          {/* Tab Selection */}
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setActiveTab('discussion')}
              className={`flex items-center gap-2 py-3 px-4 text-sm font-semibold border-b-2 transition ${
                activeTab === 'discussion'
                  ? 'border-brand text-brand'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              Conversation & Notes
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-2 py-3 px-4 text-sm font-semibold border-b-2 transition ${
                activeTab === 'timeline'
                  ? 'border-brand text-brand'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <History className="h-4 w-4" />
              Audit Timeline
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'discussion' ? (
            <TicketComments ticketId={ticket.id} />
          ) : (
            <TicketTimeline ticketId={ticket.id} />
          )}
        </div>

        {/* Right Sidebar (1 Col): Assignee, SLA & Meta */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">SLA Tracking</h3>
            <div>
              <SlaBadge
                deadline={ticket.slaDeadline}
                isBreached={ticket.isSlaBreached}
                status={ticket.status}
              />
            </div>

            <div className="space-y-2.5 text-xs border-t border-slate-100 pt-3">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-slate-400" /> Deadline:</span>
                <span className="font-semibold text-slate-800">
                  {ticket.slaDeadline ? format(new Date(ticket.slaDeadline), 'MMM dd, HH:mm') : '—'}
                </span>
              </div>

              {ticket.resolvedAt && (
                <div className="flex items-center justify-between text-emerald-700">
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Resolved on:</span>
                  <span className="font-semibold">
                    {format(new Date(ticket.resolvedAt), 'MMM dd, HH:mm')}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-4">
            <div className="text-xs">
              <span className="text-slate-400 block mb-1">Requester (Client)</span>
              <div className="flex items-center gap-2 font-medium text-slate-800">
                <User className="h-4 w-4 text-slate-400" />
                <span>{ticket.createdBy?.fullName || 'Client'}</span>
              </div>
            </div>

            {/* Agent Assignee Selector */}
            <div className="border-t border-slate-100 pt-3">
              <TicketAssigneeSelector
                ticketId={ticket.id}
                currentAssignee={ticket.assignedTo}
                onAssigned={loadTicket}
              />
            </div>

            <div className="border-t border-slate-100 pt-3 flex items-center gap-1.5 text-xs text-slate-400">
              <Calendar className="h-3.5 w-3.5" />
              <span>Created {format(new Date(ticket.createdAt), 'MMM dd, yyyy HH:mm')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
```

# src\pages\tickets\TicketListPage.tsx

```tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ticketApi } from '../../api/ticketApi';
import type { Ticket } from '../../types/ticket';
import { Badge } from '../../components/common/Badge';
import { SlaBadge } from '../../components/common/SlaBadge';
import { Search, Filter, RefreshCw, AlertCircle, User, ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';

export const TicketListPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');

  const navigate = useNavigate();

  const fetchTickets = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await ticketApi.getAllTickets();
      setTickets(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load tickets.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
    const handleCreated = () => fetchTickets();
    window.addEventListener('ticketCreated', handleCreated);
    return () => window.removeEventListener('ticketCreated', handleCreated);
  }, [fetchTickets]);

  // Client-side Filtering
  useEffect(() => {
    let result = tickets;

    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.id.toString().includes(q) ||
          t.createdBy?.fullName?.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'ALL') {
      result = result.filter((t) => t.status === statusFilter);
    }

    if (priorityFilter !== 'ALL') {
      result = result.filter((t) => t.priority === priorityFilter);
    }

    setFilteredTickets(result);
  }, [tickets, searchTerm, statusFilter, priorityFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Tickets & SLA Monitor</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage and track all support queries and response targets</p>
        </div>
        <button
          onClick={fetchTickets}
          className="flex items-center gap-2 self-start sm:self-auto px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, ID, or user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:border-brand"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand"
          >
            <option value="ALL">All Statuses</option>
            <option value="OPEN">OPEN</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="WAITING_ON_CLIENT">WAITING ON CLIENT</option>
            <option value="RESOLVED">RESOLVED</option>
            <option value="ESCALATED">ESCALATED (Breached)</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-slate-400 shrink-0" />
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand"
          >
            <option value="ALL">All Priorities</option>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
            <option value="URGENT">URGENT</option>
          </select>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700 border border-red-200">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Ticket Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-6">ID</th>
                <th className="py-3.5 px-6">Ticket Title</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Priority</th>
                <th className="py-3.5 px-6">SLA Target</th>
                <th className="py-3.5 px-6">Created By</th>
                <th className="py-3.5 px-6">Created Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <RefreshCw className="h-6 w-6 animate-spin mx-auto text-brand mb-2" />
                    Loading tickets...
                  </td>
                </tr>
              ) : filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No tickets found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    onClick={() => navigate(`/tickets/${ticket.id}`)}
                    className="hover:bg-slate-50/80 cursor-pointer transition"
                  >
                    <td className="py-4 px-6 font-mono text-xs font-semibold text-slate-500">
                      #{ticket.id}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-900">{ticket.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{ticket.category}</div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge type="status" value={ticket.status} />
                    </td>
                    <td className="py-4 px-6">
                      <Badge type="priority" value={ticket.priority} />
                    </td>
                    <td className="py-4 px-6">
                      <SlaBadge
                        deadline={ticket.slaDeadline}
                        isBreached={ticket.isSlaBreached}
                        status={ticket.status}
                      />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-xs text-slate-700">
                        <User className="h-3.5 w-3.5 text-slate-400" />
                        {ticket.createdBy?.fullName || 'Client'}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-500 whitespace-nowrap">
                      {ticket.createdAt ? format(new Date(ticket.createdAt), 'MMM dd, HH:mm') : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
```

# src\pages\users\UserManagementPage.tsx

```tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../api/authApi';
import type { User, Role } from '../../types/auth';
import {
  Users,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  User as UserIcon,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export const UserManagementPage: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [updatingUserId, setUpdatingUserId] = useState<number | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authApi.getAllUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch users list');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Client-side search and filtering
  useEffect(() => {
    let result = users;

    if (searchTerm.trim() !== '') {
      const query = searchTerm.toLowerCase();
      result = result.filter(
        (u) =>
          u.username.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query) ||
          `${u.firstName} ${u.lastName}`.toLowerCase().includes(query)
      );
    }

    if (roleFilter !== 'ALL') {
      result = result.filter((u) => u.role === roleFilter || u.role === `ROLE_${roleFilter}`);
    }

    setFilteredUsers(result);
  }, [users, searchTerm, roleFilter]);

  const handleRoleChange = async (userId: number, newRole: Role) => {
    setUpdatingUserId(userId);
    setError(null);
    setSuccessMessage(null);

    try {
      await authApi.updateUserRole(userId, newRole);
      setSuccessMessage(`User role successfully updated to ${newRole.replace('ROLE_', '')}`);
      // Refresh local list
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update user role');
    } finally {
      setUpdatingUserId(null);
    }
  };

  const getRoleBadge = (role: Role) => {
    const roleStr = String(role);
    if (roleStr.includes('ADMIN')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
          <ShieldAlert className="h-3.5 w-3.5 text-purple-600" />
          ADMIN
        </span>
      );
    }
    if (roleStr.includes('AGENT')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
          AGENT
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
        <UserIcon className="h-3.5 w-3.5 text-slate-500" />
        CLIENT
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <Users className="h-6 w-6 text-brand" />
            User & Role Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage system users, support technicians, and grant access permissions.
          </p>
        </div>

        <button
          onClick={fetchUsers}
          className="flex items-center gap-2 self-start sm:self-auto px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Users
        </button>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 border border-emerald-200 animate-in fade-in duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          {successMessage}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-xs font-semibold text-red-800 border border-red-200 animate-in fade-in duration-200">
          <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
          {error}
        </div>
      )}

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative sm:col-span-2">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by full name, username, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:border-brand"
          />
        </div>

        <div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand"
          >
            <option value="ALL">All Roles</option>
            <option value="ROLE_ADMIN">Admins</option>
            <option value="ROLE_AGENT">Agents / Technicians</option>
            <option value="ROLE_CLIENT">Clients</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-6">User</th>
                <th className="py-3.5 px-6">Username</th>
                <th className="py-3.5 px-6">Email</th>
                <th className="py-3.5 px-6">Current Role</th>
                <th className="py-3.5 px-6">Assign New Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <RefreshCw className="h-6 w-6 animate-spin mx-auto text-brand mb-2" />
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isSelf = u.id === currentUser?.id;
                  const isUpdating = updatingUserId === u.id;

                  return (
                    <tr key={u.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-light text-brand font-bold text-xs border border-brand-subtle">
                            {u.firstName ? u.firstName.charAt(0) : u.username.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">
                              {u.firstName} {u.lastName}
                            </p>
                            {isSelf && (
                              <span className="text-[10px] font-bold text-brand bg-brand-light px-1.5 py-0.5 rounded">
                                You
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-mono text-xs text-slate-700">
                        @{u.username}
                      </td>
                      <td className="py-4 px-6 text-slate-600">{u.email}</td>
                      <td className="py-4 px-6">{getRoleBadge(u.role)}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <select
                            disabled={isUpdating || isSelf}
                            value={u.role}
                            onChange={(e) =>
                              handleRoleChange(u.id, e.target.value as Role)
                            }
                            className={`py-1.5 px-2.5 rounded-lg border text-xs font-semibold focus:outline-none transition ${
                              isSelf
                                ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                                : 'bg-white border-slate-300 text-slate-800 hover:border-brand cursor-pointer'
                            }`}
                          >
                            <option value="ROLE_CLIENT">ROLE_CLIENT</option>
                            <option value="ROLE_AGENT">ROLE_AGENT</option>
                            <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                          </select>

                          {isUpdating && (
                            <RefreshCw className="h-3.5 w-3.5 animate-spin text-brand" />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
```

# src\types\audit.ts

```ts
import type { UserSummary } from './ticket';

export interface AuditLog {
  id: number;
  ticketId: number;
  performedBy?: UserSummary | null;
  action: string;
  oldValue?: string | null;
  newValue?: string | null;
  details: string;
  timestamp: string;
}
```

# src\types\auth.ts

```ts
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
```

# src\types\comment.ts

```ts
import type { UserSummary } from './ticket';

export interface Comment {
  id: number;
  ticketId: number;
  content: string;
  isInternal: boolean;
  author: UserSummary;
  createdAt: string;
}

export interface CreateCommentRequest {
  content: string;
  isInternal: boolean;
}
```

# src\types\dashboard.ts

```ts
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
```

# src\types\sla.ts

```ts

```

# src\types\ticket.ts

```ts
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
```

# src\utils\dateUtils.ts

```ts

```

# src\utils\statusColors.ts

```ts

```

# src\utils\storage.ts

```ts
const TOKEN_KEY = 'auth_token';

export const storage = {
  getToken: (): string | null => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string): void => localStorage.setItem(TOKEN_KEY, token),
  removeToken: (): void => localStorage.removeItem(TOKEN_KEY),
  clearAuth: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },
};
```

# tsconfig.app.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}

```

# tsconfig.json

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}

```

# tsconfig.node.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "module": "nodenext",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}

```

# vite.config.ts

```ts
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})

```

