package com.SLAGuard.dto.tickets;

import com.SLAGuard.enums.TicketPriority;
import com.SLAGuard.enums.TicketStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketResponse {

    // Identifiers & Core Info
    private Long id;
    private String title;
    private String description;
    private String category;

    // Enums for State Machine & Urgency
    private TicketStatus status;
    private TicketPriority priority;

    // SLA & Escalation Details
    private LocalDateTime slaDeadline;
    private boolean isSlaBreached;
    private LocalDateTime resolvedAt;

    // User References (Embedded Clean DTOs)
    private UserSummaryResponse createdBy;
    private UserSummaryResponse assignedTo;

    // Audit Timestamps
    private LocalDateTime createdAt;
}
