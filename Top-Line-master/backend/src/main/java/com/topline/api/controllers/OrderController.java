package com.topline.api.controllers;

import com.topline.api.models.Order;
import com.topline.api.services.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {
    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    private Long getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof org.springframework.security.core.userdetails.User) {
            // For JWT-based auth, you would extract the user ID from the JWT token
            // This is a placeholder - adjust based on your JWT implementation
            return 1L; // For demo purposes
        }
        return null;
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        try {
            logger.info("POST /api/orders - Creating new order");
            
            if (order.getItems() == null || order.getItems().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "Order must contain at least one item"
                ));
            }
            
            if (order.getTotalAmount() == null || order.getTotalAmount() <= 0) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "Order total amount must be greater than 0"
                ));
            }
            
            Long userId = getCurrentUserId();
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                        "success", false,
                        "message", "User not authenticated"
                ));
            }
            
            Order created = orderService.createOrder(userId, order);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "success", true,
                    "data", created,
                    "message", "Order created successfully"
            ));
        } catch (Exception e) {
            logger.error("Error creating order: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error creating order: " + e.getMessage()
            ));
        }
    }

    @GetMapping
    public ResponseEntity<?> getUserOrders() {
        try {
            logger.info("GET /api/orders - Fetching user orders");
            
            Long userId = getCurrentUserId();
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                        "success", false,
                        "message", "User not authenticated"
                ));
            }
            
            List<Order> orders = orderService.getUserOrders(userId);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", orders,
                    "count", orders.size()
            ));
        } catch (Exception e) {
            logger.error("Error fetching orders: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error fetching orders: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderDetails(@PathVariable Long id) {
        try {
            logger.info("GET /api/orders/{} - Fetching order details", id);
            Order order = orderService.getOrderDetails(id);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", order
            ));
        } catch (RuntimeException e) {
            logger.error("Order not found: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        } catch (Exception e) {
            logger.error("Error fetching order: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error fetching order: " + e.getMessage()
            ));
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        try {
            logger.info("PUT /api/orders/{}/status - Updating order status", id);
            
            String status = request.get("status");
            if (status == null || status.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "Status is required"
                ));
            }
            
            Order.Status newStatus = Order.Status.valueOf(status.toUpperCase());
            Order updated = orderService.updateOrderStatus(id, newStatus);
            
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", updated,
                    "message", "Order status updated successfully"
            ));
        } catch (IllegalArgumentException e) {
            logger.error("Invalid status: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Invalid status. Valid values: PENDING, SHIPPED, DELIVERED, CANCELLED"
            ));
        } catch (RuntimeException e) {
            logger.error("Order not found: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        } catch (Exception e) {
            logger.error("Error updating order status: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error updating order status: " + e.getMessage()
            ));
        }
    }

    @PostMapping("/{id}/reorder")
    public ResponseEntity<?> reorderFromPreviousOrder(@PathVariable Long id) {
        try {
            logger.info("POST /api/orders/{}/reorder - Reordering from previous order", id);
            
            Long userId = getCurrentUserId();
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                        "success", false,
                        "message", "User not authenticated"
                ));
            }
            
            Order newOrder = orderService.reorderFromPreviousOrder(id, userId);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "success", true,
                    "data", newOrder,
                    "message", "Order created from previous order successfully"
            ));
        } catch (RuntimeException e) {
            logger.error("Error reordering: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        } catch (Exception e) {
            logger.error("Error reordering: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error reordering: " + e.getMessage()
            ));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        try {
            logger.info("DELETE /api/orders/{} - Deleting order", id);
            orderService.deleteOrder(id);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Order deleted successfully"
            ));
        } catch (Exception e) {
            logger.error("Error deleting order: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error deleting order: " + e.getMessage()
            ));
        }
    }
}
