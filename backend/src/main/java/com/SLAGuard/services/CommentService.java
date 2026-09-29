package com.SLAGuard.services;

import com.SLAGuard.auth.entity.User;
import com.SLAGuard.auth.service.AuthService;
import com.SLAGuard.dto.comments.CommentRequest;
import com.SLAGuard.dto.comments.CommentResponse;
import com.SLAGuard.entities.Comment;
import com.SLAGuard.entities.Ticket;
import com.SLAGuard.enums.Role;
import com.SLAGuard.mappers.CommentMapper;
import com.SLAGuard.repositories.CommentRepository;
import com.SLAGuard.repositories.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final TicketRepository ticketRepository;
    private final CommentMapper commentMapper;
    private final AuditLogService auditLogService;
    private final AuthService authService;

    // 1. Fetch comments with role filtering
    public List<CommentResponse> getCommentsByTicketId(Long ticketId) {

        User currentUser = authService.getUser(Objects.requireNonNull(authService.authenticatedUser().getBody()).getUser().getUsername());

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + ticketId));

        if (currentUser.getRole() == Role.ROLE_CLIENT && !ticket.getCreatedBy().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You are not allowed to view comments for this ticket");
        }

        List<Comment> comments;
        if (currentUser.getRole() == Role.ROLE_CLIENT) {
            comments = commentRepository.findByTicketIdAndIsInternalFalseOrderByCreatedAtAsc(ticketId);
        } else {
            comments = commentRepository.findByTicketIdOrderByCreatedAtAsc(ticketId);
        }

        return commentMapper.toResponseList(comments);
    }

    @Transactional
    public CommentResponse addComment(Long ticketId, CommentRequest request) {

        User currentUser = authService.getUser(Objects.requireNonNull(authService.authenticatedUser().getBody()).getUser().getUsername());

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + ticketId));

        if (currentUser.getRole() == Role.ROLE_CLIENT && !ticket.getCreatedBy().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You cannot comment on someone else's ticket");
        }

        boolean isInternal = request.isInternal();
        if (currentUser.getRole() == Role.ROLE_CLIENT) {
            isInternal = false; // Force to false for clients
        }

        Comment comment = Comment.builder()
                .ticket(ticket)
                .author(currentUser)
                .content(request.getContent())
                .isInternal(isInternal)
                .build();

        Comment savedComment = commentRepository.save(comment);

        String noteType = isInternal ? "INTERNAL_NOTE" : "PUBLIC_COMMENT";
        auditLogService.logAction(
                ticket,
                currentUser,
                "COMMENT_ADDED",
                null,
                noteType,
                currentUser.getFirstName() + " added a " + (isInternal ? "private internal note" : "public comment")
        );

        return commentMapper.toResponse(savedComment);
    }
}