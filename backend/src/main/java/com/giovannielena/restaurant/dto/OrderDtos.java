package com.giovannielena.restaurant.dto;
import jakarta.validation.constraints.*; import java.util.*;
public final class OrderDtos { private OrderDtos(){}
 public record AddressRequest(@NotBlank String addressLine,@NotBlank String city,@Size(max=20) String postalCode,boolean defaultAddress){}
 public record ItemRequest(@NotNull Long foodId,@Min(1) @Max(50) int quantity){}
 public record CreateOrderRequest(@NotEmpty List<ItemRequest> items,Long addressId,@NotBlank String orderType,String specialInstructions){}
}