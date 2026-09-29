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