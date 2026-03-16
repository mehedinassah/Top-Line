package com.topline.api.services;

import com.topline.api.models.Wishlist;
import com.topline.api.models.User;
import com.topline.api.repositories.WishlistRepository;
import com.topline.api.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class WishlistService {
    private static final Logger logger = LoggerFactory.getLogger(WishlistService.class);
    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;

    public WishlistService(WishlistRepository wishlistRepository, UserRepository userRepository) {
        this.wishlistRepository = wishlistRepository;
        this.userRepository = userRepository;
    }

    public Wishlist getWishlistByUserId(Long userId) {
        logger.info("Fetching wishlist for user: {}", userId);
        return wishlistRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Wishlist not found for user: " + userId));
    }

    public Wishlist getOrCreateWishlist(Long userId) {
        logger.info("Getting or creating wishlist for user: {}", userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        return wishlistRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Wishlist wishlist = new Wishlist(user);
                    return wishlistRepository.save(wishlist);
                });
    }

    @Transactional
    public Wishlist addProductToWishlist(Long userId, Long productId) {
        logger.info("Adding product {} to wishlist for user: {}", productId, userId);
        Wishlist wishlist = getOrCreateWishlist(userId);
        
        if (!wishlist.getProductIds().contains(productId)) {
            wishlist.getProductIds().add(productId);
            wishlist = wishlistRepository.save(wishlist);
        }
        
        return wishlist;
    }

    @Transactional
    public Wishlist removeProductFromWishlist(Long userId, Long productId) {
        logger.info("Removing product {} from wishlist for user: {}", productId, userId);
        Wishlist wishlist = getWishlistByUserId(userId);
        wishlist.getProductIds().remove(productId);
        return wishlistRepository.save(wishlist);
    }

    @Transactional
    public String generateShareToken(Long userId) {
        logger.info("Generating share token for wishlist of user: {}", userId);
        Wishlist wishlist = getWishlistByUserId(userId);
        String token = UUID.randomUUID().toString();
        wishlist.setShareToken(token);
        wishlistRepository.save(wishlist);
        return token;
    }

    public Wishlist getSharedWishlist(String shareToken) {
        logger.info("Fetching shared wishlist with token: {}", shareToken);
        return wishlistRepository.findByShareToken(shareToken)
                .orElseThrow(() -> new RuntimeException("Shared wishlist not found with token: " + shareToken));
    }

    @Transactional
    public void clearWishlist(Long userId) {
        logger.info("Clearing wishlist for user: {}", userId);
        Wishlist wishlist = getWishlistByUserId(userId);
        wishlist.getProductIds().clear();
        wishlistRepository.save(wishlist);
    }
}
