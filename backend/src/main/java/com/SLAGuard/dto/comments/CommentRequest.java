package com.SLAGuard.dto.comments;

import lombok.Data;

@Data
public class CommentRequest {
    private String content;
    private boolean isInternal;
}