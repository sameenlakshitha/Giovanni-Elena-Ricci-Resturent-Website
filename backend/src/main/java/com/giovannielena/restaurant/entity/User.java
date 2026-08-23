package com.giovannielena.restaurant.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity @Table(name="users") @Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class User {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(name="user_id") private Long id;
    @Column(name="full_name", nullable=false, length=100) private String fullName;
    @Column(nullable=false, unique=true, length=150) private String email;
    @Column(nullable=false, length=255) private String password;
    @Column(length=20) private String phone;
    @Enumerated(EnumType.STRING) @Column(nullable=false) private Role role=Role.CUSTOMER;
    @Column(name="created_at", nullable=false) private LocalDateTime createdAt=LocalDateTime.now();
    public enum Role { CUSTOMER, ADMIN }
}