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