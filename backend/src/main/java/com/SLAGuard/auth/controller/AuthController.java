package com.SLAGuard.auth.controller;


import com.SLAGuard.auth.dto.AuthResponse;
import com.SLAGuard.auth.dto.LoginDTO;
import com.SLAGuard.auth.dto.RegisterDto;
import com.SLAGuard.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<AuthResponse> deleteUser(@PathVariable long userId) {
        return authService.removeUser(userId);
    }

}
