package com.SLAGuard.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {

    private long totalTickets;
    private long openTickets;
    private long closedTickets;
    private long inProgressTickets;
    private long escalatedTickets;
    private long breachedTickets;

    private double slaComplianceRate;

    private Map<String, Long> ticketsByPriority;
    private Map<String, Long> ticketsByStatus;
}