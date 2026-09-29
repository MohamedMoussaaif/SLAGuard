package com.SLAGuard.auth.dto;

import com.SLAGuard.enums.Role;
import lombok.Data;

@Data
public class UpdateRoleRequest {
    private Role role; // Automatically parsed by Jackson into the Enum
}