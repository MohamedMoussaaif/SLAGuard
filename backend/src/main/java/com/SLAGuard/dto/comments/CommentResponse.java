package com.SLAGuard.dto.comments;

import com.SLAGuard.dto.tickets.UserSummaryResponse;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponse {
    private Long id;
    private Long ticketId;
    private UserSummaryResponse author;
    private String content;
    @JsonProperty("isInternal")
    private boolean isInternal;
    private LocalDateTime createdAt;
}