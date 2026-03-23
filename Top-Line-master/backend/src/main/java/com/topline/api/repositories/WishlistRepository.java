package com.topline.api.repositories;

import com.topline.api.models.Wishlist;
import com.topline.api.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    Optional<Wishlist> findByUser(User user);
    Optional<Wishlist> findByUserId(Long userId);
    Optional<Wishlist> findByShareToken(String shareToken);
}
