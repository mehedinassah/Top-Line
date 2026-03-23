package com.topline.api.services;

import com.topline.api.models.Order;
import com.topline.api.models.OrderItem;
import com.topline.api.models.User;
import com.topline.api.repositories.OrderRepository;
import com.topline.api.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public class OrderService {
    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    public Order createOrder(Long userId, Order order) {
        logger.info("Creating order for user: {}", userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        order.setUser(user);
        order.setCreatedDate(Instant.now());
        order.setStatus(Order.Status.PENDING);
        
        return orderRepository.save(order);
    }

    public List<Order> getUserOrders(Long userId) {
        logger.info("Fetching orders for user: {}", userId);
        return orderRepository.findByUserId(userId);
    }

    public Order getOrderById(Long orderId) {
        logger.info("Fetching order with id: {}", orderId);
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
    }

    public Order getOrderDetails(Long orderId) {
        return getOrderById(orderId);
    }

    @Transactional
    public Order updateOrderStatus(Long orderId, Order.Status newStatus) {
        logger.info("Updating order {} status to: {}", orderId, newStatus);
        Order order = getOrderById(orderId);
        
        order.setStatus(newStatus);
        if (newStatus == Order.Status.DELIVERED) {
            order.setDeliveryDate(Instant.now());
        }
        
        return orderRepository.save(order);
    }

    @Transactional
    public Order cancelOrder(Long orderId) {
        logger.info("Cancelling order: {}", orderId);
        return updateOrderStatus(orderId, Order.Status.CANCELLED);
    }

    @Transactional
    public Order reorderFromPreviousOrder(Long orderId, Long userId) {
        logger.info("Reordering from previous order: {} for user: {}", orderId, userId);
        
        Order previousOrder = getOrderById(orderId);
        
        // Verify order belongs to user
        if (!previousOrder.getUser().getId().equals(userId)) {
            throw new RuntimeException("Order does not belong to user");
        }
        
        // Create new order with same items
        Order newOrder = new Order();
        newOrder.setUser(previousOrder.getUser());
        newOrder.setStatus(Order.Status.PENDING);
        newOrder.setCreatedDate(Instant.now());
        newOrder.setTotalAmount(previousOrder.getTotalAmount());
        
        // Copy items (don't modify original items)
        for (OrderItem item : previousOrder.getItems()) {
            OrderItem newItem = new OrderItem();
            newItem.setProduct(item.getProduct());
            newItem.setQuantity(item.getQuantity());
            newItem.setSize(item.getSize());
            newItem.setColor(item.getColor());
            newItem.setPrice(item.getPrice());
            newItem.setOrder(newOrder);
            newOrder.getItems().add(newItem);
        }
        
        return orderRepository.save(newOrder);
    }

    public void deleteOrder(Long orderId) {
        logger.info("Deleting order: {}", orderId);
        orderRepository.deleteById(orderId);
    }
}
