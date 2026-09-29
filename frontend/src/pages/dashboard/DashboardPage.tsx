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