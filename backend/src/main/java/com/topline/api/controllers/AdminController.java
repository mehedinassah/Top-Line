package com.topline.api.controllers;

import com.topline.api.models.Order;
import com.topline.api.models.User;
import com.topline.api.repositories.OrderRepository;
import com.topline.api.repositories.ProductRepository;
import com.topline.api.repositories.UserRepository;
import com.topline.api.services.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Admin-only endpoints. Access is restricted to ROLE_ADMIN in SecurityConfig
 * (all requests under /api/admin/**).
 */
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final OrderService orderService;

    public AdminController(ProductRepository productRepository,
                          OrderRepository orderRepository,
                          UserRepository userRepository,
                          OrderService orderService) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.orderService = orderService;
    }

    /** Dashboard summary: counts, revenue, orders grouped by status, recent orders. */
    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        logger.info("GET /api/admin/stats");
        List<Order> orders = orderRepository.findAll();

        double revenue = orders.stream()
                .filter(o -> o.getStatus() != Order.Status.CANCELLED)
                .mapToDouble(o -> o.getTotalAmount() != null ? o.getTotalAmount() : 0.0)
                .sum();

        Map<String, Long> ordersByStatus = orders.stream()
                .collect(Collectors.groupingBy(o -> o.getStatus().name(), Collectors.counting()));

        List<Map<String, Object>> recentOrders = orders.stream()
                .sorted(Comparator.comparing(Order::getCreatedDate,
                        Comparator.nullsLast(Comparator.reverseOrder())))
                .limit(5)
                .map(this::orderSummary)
                .collect(Collectors.toList());

        Map<String, Object> data = new LinkedHashMap<>();
        data.put("totalProducts", productRepository.count());
        data.put("totalOrders", (long) orders.size());
        data.put("totalUsers", userRepository.count());
        data.put("totalRevenue", revenue);
        data.put("ordersByStatus", ordersByStatus);
        data.put("recentOrders", recentOrders);

        return ResponseEntity.ok(Map.of("success", true, "data", data));
    }

    /** All orders, newest first, with an optional ?status= filter. */
    @GetMapping("/orders")
    public ResponseEntity<?> getAllOrders(@RequestParam(required = false) String status) {
        logger.info("GET /api/admin/orders status={}", status);
        List<Order> orders = orderRepository.findAll();

        List<Map<String, Object>> data = orders.stream()
                .filter(o -> status == null || status.isBlank()
                        || o.getStatus().name().equalsIgnoreCase(status))
                .sorted(Comparator.comparing(Order::getCreatedDate,
                        Comparator.nullsLast(Comparator.reverseOrder())))
                .map(this::orderSummary)
                .collect(Collectors.toList());

        return ResponseEntity.ok(Map.of("success", true, "data", data, "count", data.size()));
    }

    /** Update an order's status (PENDING / SHIPPED / DELIVERED / CANCELLED). */
    @PutMapping("/orders/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id,
                                               @RequestBody Map<String, String> body) {
        try {
            Order.Status newStatus = Order.Status.valueOf(body.getOrDefault("status", "").toUpperCase());
            Order updated = orderService.updateOrderStatus(id, newStatus);
            return ResponseEntity.ok(Map.of("success", true, "data", orderSummary(updated)));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("success", false,
                    "message", "Invalid status. Use PENDING, SHIPPED, DELIVERED or CANCELLED."));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    /** All registered users (passwords never included). */
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        logger.info("GET /api/admin/users");
        List<Map<String, Object>> data = userRepository.findAll().stream()
                .map(this::userSummary)
                .collect(Collectors.toList());
        return ResponseEntity.ok(Map.of("success", true, "data", data, "count", data.size()));
    }

    private Map<String, Object> orderSummary(Order o) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", o.getId());
        m.put("status", o.getStatus());
        m.put("totalAmount", o.getTotalAmount());
        m.put("shippingInfo", o.getShippingInfo());
        m.put("createdDate", o.getCreatedDate());
        m.put("deliveryDate", o.getDeliveryDate());
        m.put("itemCount", o.getItems() != null ? o.getItems().size() : 0);
        if (o.getUser() != null) {
            m.put("customerName", o.getUser().getName());
            m.put("customerEmail", o.getUser().getEmail());
        }
        return m;
    }

    private Map<String, Object> userSummary(User u) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", u.getId());
        m.put("name", u.getName());
        m.put("email", u.getEmail());
        m.put("role", u.getRole());
        m.put("createdAt", u.getCreatedAt());
        return m;
    }
}
