package com.giovannielena.restaurant.controller;

import com.giovannielena.restaurant.dto.AuthDtos.*;
import com.giovannielena.restaurant.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/auth")
public class AuthController {
    private final AuthService service;
    public AuthController(AuthService service){this.service=service;}
    @PostMapping("/register") public AuthResponse register(@Valid @RequestBody RegisterRequest request){return service.register(request);}
    @PostMapping("/login") public AuthResponse login(@Valid @RequestBody LoginRequest request){return service.login(request);}
}