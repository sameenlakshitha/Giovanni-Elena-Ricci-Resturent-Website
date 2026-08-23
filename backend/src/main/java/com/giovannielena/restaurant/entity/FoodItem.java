package com.giovannielena.restaurant.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "food_items")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class FoodItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "food_id") private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false) private Category category;
    @Column(nullable = false, length = 150) private String name;
    @Column(columnDefinition = "TEXT") private String description;
    @Column(nullable = false, precision = 10, scale = 2) private BigDecimal price;
    @Column(name = "image_url", length = 500) private String imageUrl;
    @Column(nullable = false) private boolean available = true;
    @Column(name = "created_at", nullable = false) private LocalDateTime createdAt = LocalDateTime.now();
}