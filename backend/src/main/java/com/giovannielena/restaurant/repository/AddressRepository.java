package com.giovannielena.restaurant.repository;
import com.giovannielena.restaurant.entity.Address; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface AddressRepository extends JpaRepository<Address,Long>{ List<Address> findByUserIdOrderByDefaultAddressDesc(Long userId); Optional<Address> findByIdAndUserId(Long id,Long userId); }