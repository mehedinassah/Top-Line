package com.topline.api.controllers;

import com.topline.api.models.CartItem;
import com.topline.api.services.CartService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {
    private static final Logger logger = LoggerFactory.getLogger(CartController.class);
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    private Long getCurrentUserId() {
        // Placeholder for extracting user ID from JWT token
        return 1L;
    }

    @GetMapping
    public ResponseEntity<?> getCart() {
        try {
            logger.info("GET /api/cart - Fetching user cart");
            
            Long userId = getCurrentUserId();
            List<CartItem> items = cartService.getCartItems(userId);
            Double total = cartService.getCartTotal(userId);
            Integer itemCount = cartService.getCartItemCount(userId);
            
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", Map.of(
                            "items", items,
                            "total", total,
                            "itemCount", itemCount,
                            "count", items.size()
                    )
            ));
        } catch (Exception e) {
            logger.error("Error fetching cart: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error fetching cart: " + e.getMessage()
            ));
        }
    }

    @PostMapping
    public ResponseEntity<?> addItemToCart(@RequestBody CartItem cartItem) {
        try {
            logger.info("POST /api/cart - Adding item to cart");
            
            if (cartItem.getProduct() == null || cartItem.getProduct().getId() == null) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "Product ID is required"
                ));
            }
            
            if (cartItem.getQuantity() == null || cartItem.getQuantity() <= 0) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "Quantity must be greater than 0"
                ));
            }
            
            Long userId = getCurrentUserId();
            CartItem added = cartService.addItemToCart(userId, cartItem);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "success", true,
                    "data", added,
                    "message", "Item added to cart"
            ));
        } catch (Exception e) {
            logger.error("Error adding item to cart: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error adding item to cart: " + e.getMessage()
            ));
        }
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<?> updateCartItemQuantity(@PathVariable Long itemId, @RequestBody Map<String, Integer> request) {
        try {
            logger.info("PUT /api/cart/{} - Updating item quantity", itemId);
            
            Integer quantity = request.get("quantity");
            if (quantity == null) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "Quantity is required"
                ));
            }
            
            if (quantity <= 0) {
                cartService.removeItemFromCart(itemId);
                return ResponseEntity.ok(Map.of(
                        "success", true,
                        "message", "Item removed from cart"
                ));
            }
            
            CartItem updated = cartService.updateCartItemQuantity(itemId, quantity);
            
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", updated,
                    "message", "Item quantity updated"
            ));
        } catch (Exception e) {
            logger.error("Error updating cart item: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error updating cart item: " + e.getMessage()
            ));
        }
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<?> removeItemFromCart(@PathVariable Long itemId) {
        try {
            logger.info("DELETE /api/cart/{} - Removing item from cart", itemId);
            
            cartService.removeItemFromCart(itemId);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Item removed from cart"
            ));
        } catch (Exception e) {
            logger.error("Error removing item from cart: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error removing item from cart: " + e.getMessage()
            ));
        }
    }

    @DeleteMapping
    public ResponseEntity<?> clearCart() {
        try {
            logger.info("DELETE /api/cart - Clearing cart");
            
            Long userId = getCurrentUserId();
            cartService.clearCart(userId);
            
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Cart cleared successfully"
            ));
        } catch (Exception e) {
            logger.error("Error clearing cart: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error clearing cart: " + e.getMessage()
            ));
        }
    }
}
