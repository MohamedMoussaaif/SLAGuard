package com.SLAGuard.controllers;

import com.SLAGuard.auth.entity.sec.CustomUserDetails;
import com.SLAGuard.dto.comments.CommentRequest;
import com.SLAGuard.dto.comments.CommentResponse;
import com.SLAGuard.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets/{ticketId}/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping
    @PreAuthorize("hasAnyRole('CLIENT', 'AGENT', 'ADMIN')")
    public List<CommentResponse> getComments(@PathVariable Long ticketId) {
        return commentService.getCommentsByTicketId(ticketId);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('CLIENT', 'AGENT', 'ADMIN')")
    public CommentResponse addComment(@PathVariable Long ticketId, @RequestBody CommentRequest commentRequest) {
        return commentService.addComment(ticketId, commentRequest);
    }
}