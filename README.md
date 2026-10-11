
# SLAGuard — Enterprise Ticket and SLA Enforcement System

SLAGuard is an incident management platform built to enforce Service Level Agreements (SLAs). It includes an automated background escalation engine, deterministic ticket lifecycle state transitions, dual-channel communication, and compliance auditing.

---

## Core Features

- Automated SLA Escalation Engine:
  A background worker evaluates active tickets every 60 seconds against priority deadlines (URGENT: 2h, HIGH: 8h, MEDIUM: 24h, LOW: 48h). Breached tickets are automatically flagged, transitioned to ESCALATED, and reassigned to system administrators.

- Finite State Machine (FSM):
  Tickets follow explicit lifecycle transitions: OPEN -> IN_PROGRESS -> WAITING_ON_CLIENT -> RESOLVED -> CLOSED. Invalid transitions are blocked at the service level via an IllegalStateTransitionException.

- Role-Based Access Control (RBAC):
  Secured with stateless JWT authentication and Spring Security method annotations (@PreAuthorize). Supports ROLE_CLIENT, ROLE_AGENT, and ROLE_ADMIN. Scoped database queries ensure clients only see their own tickets.

- Dual-Channel Discussions:
  Support agents and administrators can publish public replies or private internal notes. Internal notes are excluded at the query level for client accounts.

- Audit Logging:
  Every status change, assignment update, and system escalation is captured in an append-only audit log.

- Operational Metrics Dashboard:
  Provides SLA compliance rates, priority distribution, and status breakdowns.

---

## Tech Stack

### Backend
- Language and Runtime: Java 21
- Framework: Spring Boot 4
- Security: Spring Security 6 (Stateless JWT Authentication and RBAC)
- Persistence: Spring Data JPA, Hibernate, PostgreSQL
- Task Scheduling: Spring @Scheduled Background Tasks
- Mapping: MapStruct and Lombok

### Frontend
- Framework: React 19, TypeScript, Vite
- Styling: Tailwind CSS
- Data Visualization: Recharts
- Icons: Lucide React
- HTTP Client: Axios (with Bearer Token interceptors)

### Infrastructure
- Multi-stage Docker builds (Alpine JRE runtime and Nginx static file serving)
- Orchestration via Docker Compose

---

## Ticket State Machine

```text
              +---------------+
              |     OPEN      |
              +-------+-------+
                      |
           +----------+----------+
           v                     v
    +--------------+      +-------------+
    | IN_PROGRESS  |<---->|  ESCALATED  | (Automated SLA breach)
    +------+-------+      +------+------+
           |                     |
    +------+----------+          |
    v                 v          v
+------------------+  +-------------+
| WAITING_ON_CLIENT|  |  RESOLVED   |
+------------------+  +------+------+
                             |
                             v
                      +-------------+
                      |   CLOSED    |
                      +-------------+
```

---

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Or: JDK 21, Maven 3.9+, and Node.js 22+

---

### Running with Docker Compose

1. Clone the repository:
   ```bash
   git clone https://github.com/MohameddMoussaaif/SLAGuard.git
   cd SLAGuard
   ```

2. Create a `.env` file in the project root:
   ```env
   POSTGRES_USER=.............................................
   POSTGRES_PASSWORD=........................................
   POSTGRES_DB=slaguard
   SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/slaguard
   SPRING_DATASOURCE_USERNAME=................................
   SPRING_DATASOURCE_PASSWORD=................................
   JWT_SECRET=................................................
   ```

3. Build and run containers:
   ```bash
   docker-compose up --build -d
   ```

4. Service URLs:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:9090
   - PostgreSQL: localhost:5432

---


## Role Permissions Matrix

| Capability | CLIENT | AGENT | ADMIN |
|---|:---:|:---:|:---:|
| Create Tickets | Yes | Yes | Yes |
| View Own Tickets | Yes | Yes | Yes |
| View All Tickets | No | Yes | Yes |
| Update Status / Assign | No | Yes (Assign to himself only) | Yes |
| View / Add Internal Notes | No | Yes | Yes |
| View SLA Dashboard Metrics | No | Yes | Yes |
