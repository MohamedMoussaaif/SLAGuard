package com.SLAGuard.mappers;

import com.SLAGuard.auth.entity.User;
import com.SLAGuard.dto.tickets.TicketRequest;
import com.SLAGuard.dto.tickets.TicketResponse;
import com.SLAGuard.dto.tickets.UserSummaryResponse;
import com.SLAGuard.entities.Ticket;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TicketMapper {

    public TicketResponse toTicketResponse(Ticket ticket) {
        if (ticket == null) return null;

        TicketResponse response = new TicketResponse();
        response.setId(ticket.getId());
        response.setTitle(ticket.getTitle());
        response.setDescription(ticket.getDescription());
        response.setPriority(ticket.getPriority());
        response.setCategory(ticket.getCategory());
        response.setStatus(ticket.getStatus());
        response.setSlaDeadline(ticket.getSlaDueDate());
        response.setSlaBreached(ticket.isSlaBreached());
        response.setResolvedAt(ticket.getResolvedAt());
        response.setCreatedAt(ticket.getCreatedAt());

        if (ticket.getCreatedBy() != null) {
            response.setCreatedBy(toUserSummaryResponse(ticket.getCreatedBy()));
        }
        if (ticket.getAssignedTo() != null) {
            response.setAssignedTo(toUserSummaryResponse(ticket.getAssignedTo()));
        }

        return response;
    }

    public UserSummaryResponse toUserSummaryResponse(User user) {
        return UserSummaryResponse.builder()
                .id(user.getId())
                .fullName(user.getFirstName() + " " + user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    public List<TicketResponse> toListTicketResponse(List<Ticket> tickets) {
        return tickets.stream()
                .map(this::toTicketResponse)
                .toList();
    }

    public Ticket toTicket(TicketRequest ticketRequest) {
        Ticket ticket = new Ticket();
        ticket.setCategory(ticketRequest.getCategory());
        ticket.setDescription(ticketRequest.getDescription());
        ticket.setPriority(ticketRequest.getPriority());
        ticket.setTitle(ticketRequest.getTitle());
        return ticket;
    }
}