package com.SLAGuard.controllers;

import com.SLAGuard.dto.audit.AuditLogResponse;
import com.SLAGuard.dto.tickets.TicketAssignRequest;
import com.SLAGuard.dto.tickets.TicketRequest;
import com.SLAGuard.dto.tickets.TicketResponse;
import com.SLAGuard.dto.tickets.TicketStausUpdateDto;
import com.SLAGuard.enums.TicketStatus;
import com.SLAGuard.services.AuditLogService;
import com.SLAGuard.services.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;
    private final AuditLogService auditLogService;

    @GetMapping
    @PreAuthorize("hasAnyRole('CLIENT', 'AGENT', 'ADMIN')")
    public List<TicketResponse> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @GetMapping("/{ticketId}")
    @PreAuthorize("hasAnyRole('CLIENT', 'AGENT', 'ADMIN')")
    public TicketResponse getTicketById(@PathVariable Long ticketId) {
        return ticketService.getTicketById(ticketId);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('CLIENT', 'AGENT', 'ADMIN')")
    public TicketResponse createTicket(@RequestBody TicketRequest ticketRequest) {
        return ticketService.createTicket(ticketRequest);
    }

    @PutMapping("/{ticketId}/status")
    @PreAuthorize("hasAnyRole('AGENT', 'ADMIN')")
    public TicketResponse updateTicketStatus(@PathVariable Long ticketId,
                                             @RequestBody TicketStausUpdateDto statusDto) {
        return ticketService.updateTicketStatus(ticketId, TicketStatus.valueOf(statusDto.getTicketStatus()));
    }

    @PutMapping("/{ticketId}/assign")
    @PreAuthorize("hasAnyRole('AGENT', 'ADMIN')")
    public TicketResponse assignTicket(@PathVariable Long ticketId,
                                       @RequestBody TicketAssignRequest assignRequest) {
        return ticketService.assignTicket(ticketId, assignRequest.getAgentId());
    }

    @GetMapping("/{ticketId}/next-allowed-statuses")
    @PreAuthorize("hasAnyRole('CLIENT', 'AGENT', 'ADMIN')")
    public Set<TicketStatus> getAllowedNextStatuses(@PathVariable Long ticketId) {
        return ticketService.getAllowedNextStatuses(ticketId);
    }


    @GetMapping("/{ticketId}/audit-logs")
    @PreAuthorize("hasAnyRole('CLIENT', 'AGENT', 'ADMIN')")
    public List<AuditLogResponse> getTicketAuditLogs(@PathVariable Long ticketId) {
        return auditLogService.getLogsForTicket(ticketId);
    }

    @DeleteMapping("/{ticketId}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteTicketById(@PathVariable Long ticketId) {
        ticketService.deleteTicket(ticketId);
    }

}
