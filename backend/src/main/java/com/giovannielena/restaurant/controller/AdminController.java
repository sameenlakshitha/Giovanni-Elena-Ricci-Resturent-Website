package com.giovannielena.restaurant.controller;
import com.giovannielena.restaurant.entity.*; import com.giovannielena.restaurant.repository.*; import org.springframework.web.bind.annotation.*; import java.util.*;
@RestController @RequestMapping("/api/admin") public class AdminController { private final OrderRepository orders; private final FoodItemRepository foods; private final CategoryRepository categories; private final ReservationRepository reservations; public AdminController(OrderRepository o,FoodItemRepository f,CategoryRepository c,ReservationRepository r){orders=o;foods=f;categories=c;reservations=r;}
 @GetMapping("/orders") public List<Order> orders(){return orders.findAll();}
 @PutMapping("/orders/{id}/status") public Order status(@PathVariable Long id,@RequestParam Order.Status value){Order o=orders.findById(id).orElseThrow();o.setStatus(value);return orders.save(o);}
 @GetMapping("/reservations") public List<Reservation> reservations(){return reservations.findAll();}
 @PutMapping("/reservations/{id}/status") public Reservation reservationStatus(@PathVariable Long id,@RequestParam Reservation.Status value){Reservation r=reservations.findById(id).orElseThrow();r.setStatus(value);return reservations.save(r);}
 @GetMapping("/foods") public List<FoodItem> foods(){return foods.findAll();}
 @DeleteMapping("/foods/{id}") public void deleteFood(@PathVariable Long id){foods.deleteById(id);}
 @GetMapping("/categories") public List<Category> categories(){return categories.findAll();}
}