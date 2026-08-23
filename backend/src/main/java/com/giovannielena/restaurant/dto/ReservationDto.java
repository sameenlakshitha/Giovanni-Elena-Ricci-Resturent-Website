package com.giovannielena.restaurant.dto;
import jakarta.validation.constraints.*; import java.time.*;
public record ReservationDto(@NotBlank String customerName,@Email String customerEmail,@Size(max=20) String customerPhone,@NotNull @FutureOrPresent LocalDate reservationDate,@NotNull LocalTime reservationTime,@Min(1) @Max(50) int guestCount,@Size(max=500) String specialRequest) {}