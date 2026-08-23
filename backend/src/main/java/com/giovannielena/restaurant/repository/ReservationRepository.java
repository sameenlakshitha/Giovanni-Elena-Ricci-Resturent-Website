package com.giovannielena.restaurant.repository;
import com.giovannielena.restaurant.entity.Reservation; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface ReservationRepository extends JpaRepository<Reservation,Long>{ List<Reservation> findByUserIdOrderByCreatedAtDesc(Long userId); }