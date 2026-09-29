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