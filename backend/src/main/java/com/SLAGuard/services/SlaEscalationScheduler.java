package com.SLAGuard.services;

import com.SLAGuard.auth.entity.User;
import com.SLAGuard.auth.repository.UserRepository;
import com.SLAGuard.entities.Ticket;
import com.SLAGuard.enums.Role;
import com.SLAGuard.enums.TicketStatus;
import com.SLAGuard.repositories.TicketRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SlaEscalationScheduler {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final AuditLogService auditLogService;

    // Runs every 60 seconds (fixedRate = 60000 ms)
    @Scheduled(fixedRate = 60000)
    @Transactional
    public void monitorAndEscalateTickets() {
        LocalDateTime now = LocalDateTime.now();

        // 1. Terminal statuses to ignore (Resolved and Closed tickets don't breach SLA)
        List<TicketStatus> terminalStatuses = List.of(TicketStatus.RESOLVED, TicketStatus.CLOSED, TicketStatus.CANCELLED);

        // 2. Query expired, active tickets
        List<Ticket> breachedTickets = ticketRepository
                .findByIsSlaBreachedFalseAndStatusNotInAndSlaDueDateBefore(terminalStatuses, now);

        if (breachedTickets.isEmpty()) {
            return;
        }

        log.warn("SLA Engine: Found {} ticket(s) breaching SLA deadline!", breachedTickets.size());

        // 3. Find default Admin for escalation fallback
        User defaultAdmin = userRepository.findFirstByRole(Role.ROLE_ADMIN).orElse(null);

        // 4. Process each breached ticket
        for (Ticket ticket : breachedTickets) {
            TicketStatus oldStatus = ticket.getStatus();

            ticket.setSlaBreached(true);
            ticket.setStatus(TicketStatus.ESCALATED);

            // Reassign to Admin if unassigned or escalation rule requires
            if (defaultAdmin != null) {
                ticket.setAssignedTo(defaultAdmin);
            }

            ticketRepository.save(ticket);

            // 5. System Audit Log (performedBy is null because this is an automated system event)
            auditLogService.logAction(
                    ticket,
                    null,
                    "SLA_BREACH_ESCALATED",
                    oldStatus.name(),
                    TicketStatus.ESCALATED.name(),
                    "SLA Breached! Deadline was: " + ticket.getSlaDueDate() + ". Automatically escalated to Admin."
            );

            log.info("Ticket #{} escalated due to SLA breach.", ticket.getId());
        }
    }
}