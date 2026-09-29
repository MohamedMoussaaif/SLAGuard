package com.SLAGuard.dto.audit;

import com.SLAGuard.dto.tickets.UserSummaryResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuditLogResponse {
    private Long id;
    private Long ticketId;
    private UserSummaryResponse performedBy;
    private String action;
    private String oldValue;
    private String newValue;
    private String details;
    private LocalDateTime timestamp;
}