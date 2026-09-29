package com.SLAGuard.controllers;

import com.SLAGuard.dto.dashboard.DashboardStatsResponse;
import com.SLAGuard.services.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    // Only Agents and Admins have access to the business metrics dashboard
    @GetMapping("/stats")
    @PreAuthorize("hasAnyRole('AGENT', 'ADMIN')")
    public DashboardStatsResponse getStats() {
        return dashboardService.getDashboardStats();
    }
}