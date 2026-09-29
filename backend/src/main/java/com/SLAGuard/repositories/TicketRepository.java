package com.SLAGuard.repositories;

import com.SLAGuard.entities.Ticket;
import com.SLAGuard.enums.TicketStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByCreatedById(Long clientId);
    List<Ticket> findByAssignedToId(Long agentId);

    List<Ticket> findByIsSlaBreachedFalseAndStatusNotInAndSlaDueDateBefore(
            List<TicketStatus> terminalStatuses,
            LocalDateTime now
    );
}
