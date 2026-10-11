package com.SLAGuard.dto.comments;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CommentRequest {
    private String content;
    @JsonProperty("isInternal")
    private boolean isInternal;
}