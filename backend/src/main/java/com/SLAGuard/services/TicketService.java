package com.SLAGuard.services;

import com.SLAGuard.auth.entity.User;
import com.SLAGuard.auth.exception.UserNotFoundException;
import com.SLAGuard.auth.mapper.AuthMapper;
import com.SLAGuard.auth.repository.UserRepository;
import com.SLAGuard.auth.service.AuthService;
import com.SLAGuard.dto.tickets.TicketRequest;
import com.SLAGuard.dto.tickets.TicketResponse;
import com.SLAGuard.entities.Ticket;
import com.SLAGuard.enums.Role;
import com.SLAGuard.enums.TicketStatus;
import com.SLAGuard.exceptions.IllegalStateTransitionException;
import com.SLAGuard.mappers.TicketMapper;
import com.SLAGuard.repositories.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final TicketMapper ticketMapper;
    private final AuthService authService;
    private final UserRepository userRepository;
    private final AuditLogService auditLogService;

    public List<TicketResponse> getAllTickets() {
        List<Ticket> tickets;
        User currentUser = authService.getUser(Objects.requireNonNull(authService.authenticatedUser().getBody()).getUser().getUsername());
        if (currentUser.getRole() == Role.ROLE_CLIENT) {
            tickets = ticketRepository.findByCreatedById(currentUser.getId());
        } else {
            tickets = ticketRepository.findAll();
        }
        return ticketMapper.toListTicketResponse(tickets);
    }


    public TicketResponse getTicketById(Long ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + ticketId));

        User currentUser = authService.getUser(Objects.requireNonNull(authService.authenticatedUser().getBody()).getUser().getUsername());

        // RBAC: Client cannot view another user's ticket
        if (currentUser.getRole() == Role.ROLE_CLIENT && !ticket.getCreatedBy().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You are not allowed to view this ticket");
        }

        return ticketMapper.toTicketResponse(ticket);
    }

    public TicketResponse createTicket(TicketRequest ticketRequest) {
        User currentUser = authService.getUser(Objects.requireNonNull(authService.authenticatedUser().getBody()).getUser().getUsername());
        Ticket savedTicket = ticketMapper.toTicket(ticketRequest);
        savedTicket.setStatus(TicketStatus.OPEN);
        savedTicket.setCreatedBy(currentUser);

        LocalDateTime deadline = LocalDateTime.now().plusHours(savedTicket.getPriority().getSlaHours());
        savedTicket.setSlaDueDate(deadline);
        savedTicket.setSlaBreached(false);

        savedTicket = ticketRepository.save(savedTicket);
        auditLogService.logAction(savedTicket, currentUser, "CREATE_TICKET", null, savedTicket.getTitle(), "Ticket created");
        return ticketMapper.toTicketResponse(savedTicket);
    }

    @Transactional
    public TicketResponse updateTicketStatus(Long ticketId, TicketStatus newStatus) {
        User currentUser = authService.getUser(Objects.requireNonNull(authService.authenticatedUser().getBody()).getUser().getUsername());
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        TicketStatus currentStatus = ticket.getStatus();

        if (!currentStatus.canTransitionTo(newStatus)) {
            throw new IllegalStateTransitionException(currentStatus, newStatus);
        }

        if (newStatus == TicketStatus.RESOLVED) {
            ticket.setResolvedAt(LocalDateTime.now());
        } else if (newStatus == TicketStatus.IN_PROGRESS && ticket.getAssignedTo() == null) {
            ticket.setAssignedTo(currentUser);
        }

        ticket.setStatus(newStatus);
        Ticket updatedTicket = ticketRepository.save(ticket);

        auditLogService.logAction(updatedTicket, currentUser, "UPDATE_TICKET", currentStatus.name(), newStatus.name(), updatedTicket.getTitle());

        return ticketMapper.toTicketResponse(updatedTicket);
    }


    @Transactional
    public TicketResponse assignTicket(Long ticketId, Long agentId) {

        User currentUser = authService.getUser(Objects.requireNonNull(authService.authenticatedUser().getBody()).getUser().getUsername());

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + ticketId));

        User agent = userRepository.findById(agentId)
                .orElseThrow(() -> new UserNotFoundException("Agent not found with id: " + agentId));

        if (agent.getRole() == Role.ROLE_CLIENT) {
            throw new IllegalArgumentException("Cannot assign a ticket to a CLIENT");
        }

        String oldAgentName = ticket.getAssignedTo() != null
                ? ticket.getAssignedTo().getFirstName() + " " + ticket.getAssignedTo().getLastName()
                : "Unassigned";

        String newAgentName = agent.getFirstName() + " " + agent.getLastName();

        ticket.setAssignedTo(agent);
        if (ticket.getStatus() == TicketStatus.OPEN) {
            ticket.setStatus(TicketStatus.IN_PROGRESS);
        }

        Ticket savedTicket = ticketRepository.save(ticket);

        // AUDIT LOG: Assignment
        auditLogService.logAction(
                savedTicket,
                currentUser,
                "ASSIGNMENT",
                oldAgentName,
                newAgentName,
                "Ticket assigned to " + newAgentName + " by " + currentUser.getFirstName()
        );

        return ticketMapper.toTicketResponse(savedTicket);
    }

    public Set<TicketStatus> getAllowedNextStatuses(Long ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        return ticket.getStatus().getNextAllowedStates();
    }

    // 6. Delete Ticket (Admins only)
    public void deleteTicket(Long ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + ticketId));
        ticketRepository.delete(ticket);
    }


}
