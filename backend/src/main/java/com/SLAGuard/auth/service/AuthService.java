package com.SLAGuard.auth.service;


import com.SLAGuard.auth.dto.AuthResponse;
import com.SLAGuard.auth.dto.LoginDTO;
import com.SLAGuard.auth.dto.RegisterDto;
import com.SLAGuard.auth.dto.UserResponse;
import com.SLAGuard.auth.entity.User;
import com.SLAGuard.auth.entity.sec.CustomUserDetails;
import com.SLAGuard.auth.exception.ExistedUserException;
import com.SLAGuard.auth.exception.UserNotFoundException;
import com.SLAGuard.auth.mapper.AuthMapper;
import com.SLAGuard.auth.repository.UserRepository;
import com.SLAGuard.auth.service.securityService.JWTService;
import com.SLAGuard.enums.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final AuthMapper authMapper;
    private final JWTService jWTService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Transactional
    public ResponseEntity<AuthResponse> registerUser(RegisterDto userData) {
        User user = authMapper.registerDtoToUser(userData);
        if(userRepository.findByUsername(userData.getUsername()).isPresent()){
            throw new ExistedUserException("Username already exists : " + userData.getUsername());
        }
        if(userRepository.findByEmail(userData.getEmail()).isPresent()){
            throw new ExistedUserException("Email already exists : " + userData.getEmail());
        }
        user.setPassword(encoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);

        userRepository.save(savedUser);

        LoginDTO loginRequestDTO = new LoginDTO();
        loginRequestDTO.setUsername(savedUser.getUsername());
        loginRequestDTO.setPassword(userData.getPassword());
        return login(loginRequestDTO);

    }

    @Transactional
    public ResponseEntity<AuthResponse> login(LoginDTO user) {

        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
                CustomUserDetails authUser = (CustomUserDetails) authentication.getPrincipal();
                UserResponse userResponse = authMapper.userToUserResponse(getUser(authUser.getUsername()));
                AuthResponse apiResponse =  new AuthResponse(jWTService.generateToken(user.getUsername()), userResponse);
                return ResponseEntity.ok(apiResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


    public User getUser(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = authMapper.toListUserResponse(userRepository.findAll());
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }

    public ResponseEntity<AuthResponse> removeUser(long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found with username: " + userId));
        userRepository.delete(user);
        UserResponse userResponse = authMapper.userToUserResponse(user);
        return new ResponseEntity<AuthResponse>(new AuthResponse(null, userResponse), HttpStatus.OK);
    }


    public ResponseEntity<AuthResponse> userById(long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found with Id : " + id));
        UserResponse userResponse = authMapper.userToUserResponse(user);
        AuthResponse apiResponse = new AuthResponse(null, userResponse);
        return ResponseEntity.ok(apiResponse);

    }

    public ResponseEntity<AuthResponse> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();
        UserResponse userResponse = authMapper.userToUserResponse(getUser(user.getUsername()));
        AuthResponse apiResponse = new AuthResponse(null, userResponse);
        return ResponseEntity.ok(apiResponse);
    }

    @Transactional
    public UserResponse updateUserRole(long userId, Role newRole) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with Id: " + userId));

        user.setRole(newRole);
        User updatedUser = userRepository.save(user);

        return authMapper.userToUserResponse(updatedUser);
    }
}
