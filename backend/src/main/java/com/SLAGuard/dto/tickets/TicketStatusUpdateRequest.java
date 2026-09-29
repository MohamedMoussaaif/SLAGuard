package com.SLAGuard.dto.tickets;

import com.SLAGuard.enums.TicketStatus;
import lombok.Data;

@Data
public class TicketStatusUpdateRequest {

    private TicketStatus status;

}
