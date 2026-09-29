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