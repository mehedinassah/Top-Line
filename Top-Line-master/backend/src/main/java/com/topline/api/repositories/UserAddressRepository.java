package com.topline.api.repositories;

import com.topline.api.models.UserAddress;
import com.topline.api.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAddressRepository extends JpaRepository<UserAddress, Long> {
    List<UserAddress> findByUser(User user);
    List<UserAddress> findByUserId(Long userId);
}
