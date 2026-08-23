package com.giovannielena.restaurant.dto;

import jakarta.validation.constraints.*;

public final class AuthDtos {
    private AuthDtos() {}
    public record RegisterRequest(@NotBlank @Size(max=100) String fullName,@NotBlank @Email @Size(max=150) String email,@NotBlank @Size(min=8,max=100) String password,@Size(max=20) String phone) {}
    public record LoginRequest(@NotBlank @Email String email,@NotBlank String password) {}
    public record AuthResponse(String token,Long userId,String fullName,String email,String role) {}
}