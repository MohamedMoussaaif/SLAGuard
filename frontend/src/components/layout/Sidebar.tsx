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