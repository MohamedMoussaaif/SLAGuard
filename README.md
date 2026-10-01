# SLAGuard — Enterprise Support Ticketing & SLA Management System

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/ReactJs%20(TypeScript)-blue.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue.svg)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38bdf8.svg)](https://tailwindcss.com/)
[![Security](https://img.shields.io/badge/Spring%20Security-JWT%20%26%20RBAC-red.svg)](https://spring.io/projects/spring-security)

SLAGuard is a mission-critical support ticketing and Service Level Agreement (SLA) management platform designed for high-accountability enterprise environments. It enforces strict ticket lifecycle state machines, automates background SLA breach escalation, and provides role-isolated communication channels (public customer replies vs. confidential internal team notes).

---

## 📌 Problem Statement & Core Solutions

| The Operational Problem | How SLAGuard Resolves It |
| :--- | :--- |
| **SLA Violations & Missed Deadlines:** Support teams fail to prioritize urgent issues, resulting in breached contractual SLAs without management visibility. | **Automated SLA Engine & Background Daemon:** Auto-calculates deadlines on ticket creation based on priority and runs an automated 60-second background worker to escalate breached tickets directly to Admins. |
| **Data Inconsistency & State Skipping:** Unregulated ticket state jumps (e.g., jumping from `OPEN` directly to `RESOLVED` without assignment) corrupt reporting and operational metrics. | **Strict Finite State Machine (FSM):** Domain-driven transition rules enforced at the entity level, disallowing unauthorized status changes. |
| **Confidential Data Leaks:** Support agents accidentally expose internal technical notes or debugging logs to external clients. | **Role-Filtered Dual-Channel Discussion:** Query-level isolation distinguishing public responses from encrypted/protected internal notes visible only to `AGENT` and `ADMIN` roles. |
| **Lack of Traceability:** Inability to audit who changed a ticket's priority, who reassigned it, or when an SLA breached. | **System-Wide Immutable Audit Trail:** Chronological event logs capturing every state change, agent handover, and automated escalation. |

---

## 🏗️ System Architecture & Workflow

### 1. Ticket Lifecycle State Machine
Tickets follow a strict transition lifecycle to preserve data integrity and accurate Mean Time to Resolution (MTTR) metrics:

```text
       ┌────────────────────────┐
       │          OPEN          │
       └────┬──────────────┬────┘
            │              │
            ▼              ▼
     [IN_PROGRESS]     [CANCELLED]
       │    ▲   ▲
       │    │   │ (Reopened)
       │    │   └──────────────────────┐
       │    ▼                          │
       │  [WAITING_ON_CLIENT]          │
       │                               │
       ├───────────────────────────────┤
       │ (SLA Breach Daemon)           │
       ▼                               │
  [ESCALATED] ─────────────────────────┤
       │                               │
       ▼                               │
  [RESOLVED] ──────────────────────────┘
       │
       ▼
    [CLOSED] (Terminal State)
