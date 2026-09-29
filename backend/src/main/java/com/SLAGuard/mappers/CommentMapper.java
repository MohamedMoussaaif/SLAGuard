package com.SLAGuard.mappers;

import com.SLAGuard.dto.comments.CommentResponse;
import com.SLAGuard.entities.Comment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CommentMapper {

    private final TicketMapper ticketMapper;

    public CommentResponse toResponse(Comment comment) {
        if (comment == null) return null;

        return CommentResponse.builder()
                .id(comment.getId())
                .ticketId(comment.getTicket().getId())
                .author(ticketMapper.toUserSummaryResponse(comment.getAuthor()))
                .content(comment.getContent())
                .isInternal(comment.isInternal())
                .createdAt(comment.getCreatedAt())
                .build();
    }

    public List<CommentResponse> toResponseList(List<Comment> comments) {
        return comments.stream().map(this::toResponse).toList();
    }
}