package com.SLAGuard.dto.tickets;

import com.SLAGuard.enums.TicketPriority;
import lombok.Data;

@Data
public class TicketRequest {

    private Long createdById;

    private String title;

    private String description;

    private TicketPriority priority;

    private String category;
}