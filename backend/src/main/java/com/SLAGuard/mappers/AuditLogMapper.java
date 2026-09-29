package com.SLAGuard.mappers;

import com.SLAGuard.dto.audit.AuditLogResponse;
import com.SLAGuard.entities.AuditLog;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class AuditLogMapper {

    private final TicketMapper ticketMapper;

    public AuditLogResponse toResponse(AuditLog log) {
        if (log == null) return null;

        return AuditLogResponse.builder()
                .id(log.getId())
                .ticketId(log.getTicket().getId())
                .performedBy(log.getPerformedBy() != null ? ticketMapper.toUserSummaryResponse(log.getPerformedBy()) : null)
                .action(log.getAction())
                .oldValue(log.getOldValue())
                .newValue(log.getNewValue())
                .details(log.getDetails())
                .timestamp(log.getTimestamp())
                .build();
    }

    public List<AuditLogResponse> toResponseList(List<AuditLog> logs) {
        return logs.stream().map(this::toResponse).toList();
    }
}