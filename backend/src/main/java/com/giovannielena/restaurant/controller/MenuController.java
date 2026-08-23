package com.giovannielena.restaurant.controller;

import com.giovannielena.restaurant.entity.Category;
import com.giovannielena.restaurant.entity.FoodItem;
import com.giovannielena.restaurant.repository.CategoryRepository;
import com.giovannielena.restaurant.repository.FoodItemRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MenuController {
    private final CategoryRepository categoryRepository;
    private final FoodItemRepository foodItemRepository;

    public MenuController(CategoryRepository categoryRepository, FoodItemRepository foodItemRepository) {
        this.categoryRepository = categoryRepository;
        this.foodItemRepository = foodItemRepository;
    }

    @GetMapping("/categories")
    public List<Category> categories() { return categoryRepository.findByActiveTrueOrderByNameAsc(); }

    @GetMapping("/foods")
    public List<FoodItem> foods(@RequestParam(required = false) Long categoryId) {
        return categoryId == null
                ? foodItemRepository.findByAvailableTrueOrderByNameAsc()
                : foodItemRepository.findByCategoryIdAndAvailableTrueOrderByNameAsc(categoryId);
    }
}