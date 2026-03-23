package com.topline.api.controllers;

import com.topline.api.models.Wishlist;
import com.topline.api.services.WishlistService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "*")
public class WishlistController {
    private static final Logger logger = LoggerFactory.getLogger(WishlistController.class);
    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    private Long getCurrentUserId() {
        // Placeholder for extracting user ID from JWT token
        // This would be implemented based on your JWT/Security configuration
        return 1L;
    }

    @GetMapping
    public ResponseEntity<?> getWishlist() {
        try {
            logger.info("GET /api/wishlist - Fetching user wishlist");
            Long userId = getCurrentUserId();
            
            Wishlist wishlist = wishlistService.getOrCreateWishlist(userId);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", wishlist
            ));
        } catch (Exception e) {
            logger.error("Error fetching wishlist: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error fetching wishlist: " + e.getMessage()
            ));
        }
    }

    @PostMapping
    public ResponseEntity<?> addProductToWishlist(@RequestBody Map<String, Object> request) {
        try {
            logger.info("POST /api/wishlist - Adding product to wishlist");
            
            Long productId = ((Number) request.get("productId")).longValue();
            if (productId == null) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "Product ID is required"
                ));
            }
            
            Long userId = getCurrentUserId();
            Wishlist wishlist = wishlistService.addProductToWishlist(userId, productId);
            
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", wishlist,
                    "message", "Product added to wishlist"
            ));
        } catch (Exception e) {
            logger.error("Error adding product to wishlist: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error adding product to wishlist: " + e.getMessage()
            ));
        }
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<?> removeProductFromWishlist(@PathVariable Long productId) {
        try {
            logger.info("DELETE /api/wishlist/{} - Removing product from wishlist", productId);
            
            Long userId = getCurrentUserId();
            Wishlist wishlist = wishlistService.removeProductFromWishlist(userId, productId);
            
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", wishlist,
                    "message", "Product removed from wishlist"
            ));
        } catch (Exception e) {
            logger.error("Error removing product from wishlist: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error removing product from wishlist: " + e.getMessage()
            ));
        }
    }

    @PostMapping("/share")
    public ResponseEntity<?> shareWishlist() {
        try {
            logger.info("POST /api/wishlist/share - Generating share token");
            
            Long userId = getCurrentUserId();
            String shareToken = wishlistService.generateShareToken(userId);
            
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "shareToken", shareToken,
                    "shareUrl", "/api/wishlist/shared/" + shareToken,
                    "message", "Wishlist share link generated successfully"
            ));
        } catch (Exception e) {
            logger.error("Error generating share token: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error generating share token: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/shared/{shareToken}")
    public ResponseEntity<?> getSharedWishlist(@PathVariable String shareToken) {
        try {
            logger.info("GET /api/wishlist/shared/{} - Fetching shared wishlist", shareToken);
            
            Wishlist wishlist = wishlistService.getSharedWishlist(shareToken);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", wishlist
            ));
        } catch (RuntimeException e) {
            logger.error("Shared wishlist not found: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        } catch (Exception e) {
            logger.error("Error fetching shared wishlist: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error fetching shared wishlist: " + e.getMessage()
            ));
        }
    }

    @DeleteMapping
    public ResponseEntity<?> clearWishlist() {
        try {
            logger.info("DELETE /api/wishlist - Clearing wishlist");
            
            Long userId = getCurrentUserId();
            wishlistService.clearWishlist(userId);
            
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Wishlist cleared successfully"
            ));
        } catch (Exception e) {
            logger.error("Error clearing wishlist: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error clearing wishlist: " + e.getMessage()
            ));
        }
    }
}
