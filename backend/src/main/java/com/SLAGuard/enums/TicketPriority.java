package com.SLAGuard.enums;

import lombok.Getter;

@Getter
public enum TicketPriority {
    LOW(48),       // 48 hours
    MEDIUM(24),    // 24 hours
    HIGH(8),       // 8 hours
    URGENT(2);     // 2 hours

    private final int slaHours;

    TicketPriority(int slaHours) {
        this.slaHours = slaHours;
    }
}
