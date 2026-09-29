package com.SLAGuard.auth.controller;


import com.SLAGuard.auth.dto.*;
import com.SLAGuard.auth.service.AuthService;
import com.SLAGuard.enums.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterDto userData) {
        return authService.registerUser(userData);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginDTO userData) {
        return authService.login(userData);
    }

    @GetMapping("/authenticated-user")
    public ResponseEntity<AuthResponse> getAuthenticatedUser() {
        return authService.authenticatedUser();
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return authService.getAllUsers();
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<AuthResponse> deleteUser(@PathVariable long userId) {
        return authService.removeUser(userId);
    }

    @PutMapping("/users/{userId}/role")
    @PreAuthorize("hasRole('ADMIN')") // Spring Security handles RBAC cleanly
    public ResponseEntity<UserResponse> updateRole(
            @PathVariable long userId,
            @RequestBody UpdateRoleRequest request) {

        UserResponse response = authService.updateUserRole(userId, request.getRole());
        return ResponseEntity.ok(response);
    }

}
