package com.SLAGuard.auth.repository;

import com.SLAGuard.auth.entity.User;
import com.SLAGuard.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findFirstByRole(Role role);
}
