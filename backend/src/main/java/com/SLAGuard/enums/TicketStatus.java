package com.SLAGuard.enums;

import java.util.Collections;
import java.util.EnumSet;
import java.util.Set;

public enum TicketStatus {

    CLOSED(Collections.emptySet()),
    RESOLVED(Collections.emptySet()),
    WAITING_ON_CLIENT(Collections.emptySet()),
    IN_PROGRESS(Collections.emptySet()),
    ESCALATED(Collections.emptySet()),
    OPEN(Collections.emptySet()),
    CANCELLED(Collections.emptySet());


    private Set<TicketStatus> nextAllowedStates;

    TicketStatus(Set<TicketStatus> nextAllowedStates) {
        this.nextAllowedStates = nextAllowedStates;
    }


    static {
        OPEN.nextAllowedStates = EnumSet.of(IN_PROGRESS, CANCELLED, ESCALATED);
        IN_PROGRESS.nextAllowedStates = EnumSet.of(WAITING_ON_CLIENT, RESOLVED, ESCALATED);
        WAITING_ON_CLIENT.nextAllowedStates = EnumSet.of(IN_PROGRESS, RESOLVED);
        RESOLVED.nextAllowedStates = EnumSet.of(CLOSED, IN_PROGRESS);
        ESCALATED.nextAllowedStates = EnumSet.of(IN_PROGRESS, RESOLVED);
        CLOSED.nextAllowedStates = Collections.emptySet();
        CANCELLED.nextAllowedStates = Collections.emptySet();
    }

    public boolean canTransitionTo(TicketStatus nextStatus) {
        return this.nextAllowedStates.contains(nextStatus);
    }

    public Set<TicketStatus> getNextAllowedStates() {
        return nextAllowedStates;
    }

}
