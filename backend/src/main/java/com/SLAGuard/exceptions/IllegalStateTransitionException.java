package com.SLAGuard.exceptions;

import com.SLAGuard.enums.TicketStatus;

public class IllegalStateTransitionException extends RuntimeException {
    public IllegalStateTransitionException(TicketStatus current, TicketStatus target) {
        super(String.format("Invalid status transition from '%s' to '%s'", current, target));
    }
}
