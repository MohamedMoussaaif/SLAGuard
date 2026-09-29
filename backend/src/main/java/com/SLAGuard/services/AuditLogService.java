package com.SLAGuard.services;

import com.SLAGuard.auth.entity.User;
import com.SLAGuard.dto.audit.AuditLogResponse;
import com.SLAGuard.entities.AuditLog;
import com.SLAGuard.entities.Ticket;
import com.SLAGuard.mappers.AuditLogMapper;
import com.SLAGuard.repositories.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;
    private final AuditLogMapper auditLogMapper;

    @Transactional
    public void logAction(Ticket ticket, User performedBy, String action, String oldValue, String newValue, String details) {
        AuditLog auditLog = AuditLog.builder()
                .ticket(ticket)
                .performedBy(performedBy)
                .action(action)
                .oldValue(oldValue)
                .newValue(newValue)
                .details(details)
                .build();

        auditLogRepository.save(auditLog);
    }

    public List<AuditLogResponse> getLogsForTicket(Long ticketId) {
        List<AuditLog> logs = auditLogRepository.findByTicketIdOrderByTimestampDesc(ticketId);
        return auditLogMapper.toResponseList(logs);
    }
}