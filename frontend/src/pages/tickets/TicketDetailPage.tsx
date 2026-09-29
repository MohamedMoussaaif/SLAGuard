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