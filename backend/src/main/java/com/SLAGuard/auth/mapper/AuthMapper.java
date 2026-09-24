package com.SLAGuard.auth.mapper;


import com.SLAGuard.auth.dto.RegisterDto;
import com.SLAGuard.auth.dto.UserResponse;
import com.SLAGuard.auth.entity.User;
import org.springframework.stereotype.Component;

@Component
public class AuthMapper {

    public UserResponse userToUserResponse(User user) {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setFirstName(user.getFirstName());
        userResponse.setLastName(user.getLastName());
        userResponse.setUsername(user.getUsername());
        userResponse.setEmail(user.getEmail());
        userResponse.setRole(user.getRole());
        return userResponse;
    }

    public User registerDtoToUser(RegisterDto userData) {
        User user = new User();
        user.setFirstName(userData.getFirstName());
        user.setLastName(userData.getLastName());
        user.setUsername(userData.getUsername());
        user.setEmail(userData.getEmail());
        user.setPassword(userData.getPassword());
        return user;
    }
}
