package com.SLAGuard.services;

import com.SLAGuard.dto.dashboard.DashboardStatsResponse;
import com.SLAGuard.entities.Ticket;
import com.SLAGuard.enums.TicketPriority;
import com.SLAGuard.enums.TicketStatus;
import com.SLAGuard.repositories.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.EnumMap;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final TicketRepository ticketRepository;

    public DashboardStatsResponse getDashboardStats() {
        List<Ticket> allTickets = ticketRepository.findAll();
        long totalTickets = allTickets.size();

        if (totalTickets == 0) {
            return DashboardStatsResponse.builder()
                    .totalTickets(0)
                    .openTickets(0)
                    .closedTickets(0)
                    .inProgressTickets(0)
                    .escalatedTickets(0)
                    .breachedTickets(0)
                    .slaComplianceRate(100.0)
                    .ticketsByPriority(Map.of())
                    .ticketsByStatus(Map.of())
                    .build();
        }

        // 1. Grouping by Status
        Map<String, Long> ticketsByStatus = new HashMap<>();
        for (TicketStatus status : TicketStatus.values()) {
            ticketsByStatus.put(status.name(), 0L);
        }
        for (Ticket t : allTickets) {
            ticketsByStatus.put(t.getStatus().name(), ticketsByStatus.get(t.getStatus().name()) + 1);
        }

        // 2. Grouping by Priority
        Map<String, Long> ticketsByPriority = new HashMap<>();
        for (TicketPriority priority : TicketPriority.values()) {
            ticketsByPriority.put(priority.name(), 0L);
        }
        for (Ticket t : allTickets) {
            ticketsByPriority.put(t.getPriority().name(), ticketsByPriority.get(t.getPriority().name()) + 1);
        }

        // 3. Counts
        long openTickets = ticketsByStatus.getOrDefault(TicketStatus.OPEN.name(), 0L);
        long closedTickets = ticketsByStatus.getOrDefault(TicketStatus.CLOSED.name(), 0L)
                + ticketsByStatus.getOrDefault(TicketStatus.RESOLVED.name(), 0L);
        long inProgressTickets = ticketsByStatus.getOrDefault(TicketStatus.IN_PROGRESS.name(), 0L);
        long escalatedTickets = ticketsByStatus.getOrDefault(TicketStatus.ESCALATED.name(), 0L);

        long breachedCount = allTickets.stream().filter(Ticket::isSlaBreached).count();

        // 4. SLA Compliance Formula: (Total - Breached) / Total * 100
        double complianceRate = ((double) (totalTickets - breachedCount) / totalTickets) * 100.0;
        complianceRate = Math.round(complianceRate * 100.0) / 100.0; // Round to 2 decimal places

        return DashboardStatsResponse.builder()
                .totalTickets(totalTickets)
                .openTickets(openTickets)
                .closedTickets(closedTickets)
                .inProgressTickets(inProgressTickets)
                .escalatedTickets(escalatedTickets)
                .breachedTickets(breachedCount)
                .slaComplianceRate(complianceRate)
                .ticketsByPriority(ticketsByPriority)
                .ticketsByStatus(ticketsByStatus)
                .build();
    }
}