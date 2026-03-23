package com.topline.api.repositories;

import com.topline.api.models.CartItem;
import com.topline.api.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
    List<CartItem> findByUserId(Long userId);
    Optional<CartItem> findByUserIdAndProductIdAndSizeAndColor(Long userId, Long productId, String size, String color);
    void deleteByUserId(Long userId);
}
