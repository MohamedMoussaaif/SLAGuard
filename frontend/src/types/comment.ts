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