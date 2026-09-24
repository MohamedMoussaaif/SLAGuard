import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, UserCheck, ShieldCheck, Mail, User } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header Bar */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Support & SLA Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">
              Welcome back, <span className="font-semibold text-slate-800">{user?.firstName} {user?.lastName}</span> ({user?.username})
            </p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-slate-100 text-slate-700 border border-slate-200 px-4 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-sm font-medium transition"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>

        {/* Profile Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm md:col-span-1 space-y-4">
            <h3 className="text-base font-semibold flex items-center gap-2 text-slate-900 border-b border-slate-100 pb-3">
              <UserCheck className="h-5 w-5 text-brand" />
              User Information
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2.5 text-slate-600">
                <User className="h-4 w-4 text-slate-400" />
                <span>{user?.firstName} {user?.lastName}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-600">
                <Mail className="h-4 w-4 text-slate-400" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-600 pt-1">
                <ShieldCheck className="h-4 w-4 text-slate-400" />
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-light text-brand border border-brand-subtle">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};