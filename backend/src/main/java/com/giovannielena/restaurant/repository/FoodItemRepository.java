package com.giovannielena.restaurant.repository;

import com.giovannielena.restaurant.entity.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {
    List<FoodItem> findByAvailableTrueOrderByNameAsc();
    List<FoodItem> findByCategoryIdAndAvailableTrueOrderByNameAsc(Long categoryId);
}