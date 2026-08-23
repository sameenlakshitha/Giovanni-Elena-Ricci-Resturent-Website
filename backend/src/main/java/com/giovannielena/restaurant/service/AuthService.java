package com.giovannielena.restaurant.service;

import com.giovannielena.restaurant.dto.AuthDtos.*;
import com.giovannielena.restaurant.entity.User;
import com.giovannielena.restaurant.repository.UserRepository;
import com.giovannielena.restaurant.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    private final UserRepository users; private final PasswordEncoder encoder; private final JwtService jwt;
    public AuthService(UserRepository users,PasswordEncoder encoder,JwtService jwt){this.users=users;this.encoder=encoder;this.jwt=jwt;}
    @Transactional public AuthResponse register(RegisterRequest r){
        String email=r.email().trim().toLowerCase(); if(users.existsByEmail(email)) throw new IllegalArgumentException("Email is already registered");
        User u=new User(); u.setFullName(r.fullName().trim()); u.setEmail(email); u.setPassword(encoder.encode(r.password())); u.setPhone(r.phone()); u.setRole(User.Role.CUSTOMER); users.save(u);
        return response(u);
    }
    public AuthResponse login(LoginRequest r){
        User u=users.findByEmail(r.email().trim().toLowerCase()).orElseThrow(()->new IllegalArgumentException("Invalid email or password"));
        if(!encoder.matches(r.password(),u.getPassword())) throw new IllegalArgumentException("Invalid email or password"); return response(u);
    }
    private AuthResponse response(User u){return new AuthResponse(jwt.generate(u.getEmail(),u.getRole().name()),u.getId(),u.getFullName(),u.getEmail(),u.getRole().name());}
}