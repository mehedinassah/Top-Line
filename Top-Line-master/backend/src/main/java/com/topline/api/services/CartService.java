package com.topline.api.services;

import com.topline.api.models.CartItem;
import com.topline.api.models.Product;
import com.topline.api.models.User;
import com.topline.api.repositories.CartItemRepository;
import com.topline.api.repositories.ProductRepository;
import com.topline.api.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    private static final Logger logger = LoggerFactory.getLogger(CartService.class);
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public CartService(CartItemRepository cartItemRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    public List<CartItem> getCartItems(Long userId) {
        logger.info("Fetching cart items for user: {}", userId);
        return cartItemRepository.findByUserId(userId);
    }

    @Transactional
    public CartItem addItemToCart(Long userId, CartItem cartItem) {
        logger.info("Adding item to cart for user: {}", userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        Product product = productRepository.findById(cartItem.getProduct().getId())
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + cartItem.getProduct().getId()));

        // Check if item already exists in cart
        Optional<CartItem> existingItem = cartItemRepository
                .findByUserIdAndProductIdAndSizeAndColor(userId, product.getId(), cartItem.getSize(), cartItem.getColor());

        if (existingItem.isPresent()) {
            logger.info("Updating existing cart item quantity");
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + cartItem.getQuantity());
            return cartItemRepository.save(item);
        } else {
            cartItem.setUser(user);
            cartItem.setProduct(product);
            return cartItemRepository.save(cartItem);
        }
    }

    @Transactional
    public CartItem updateCartItemQuantity(Long cartItemId, Integer quantity) {
        logger.info("Updating cart item {} quantity to: {}", cartItemId, quantity);
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found with id: " + cartItemId));
        
        if (quantity <= 0) {
            cartItemRepository.deleteById(cartItemId);
            return null;
        }
        
        cartItem.setQuantity(quantity);
        return cartItemRepository.save(cartItem);
    }

    public void removeItemFromCart(Long cartItemId) {
        logger.info("Removing cart item: {}", cartItemId);
        cartItemRepository.deleteById(cartItemId);
    }

    @Transactional
    public void clearCart(Long userId) {
        logger.info("Clearing cart for user: {}", userId);
        cartItemRepository.deleteByUserId(userId);
    }

    public Double getCartTotal(Long userId) {
        logger.info("Calculating cart total for user: {}", userId);
        List<CartItem> items = getCartItems(userId);
        return items.stream()
                .mapToDouble(item -> {
                    Double price = item.getProduct().getDiscountPrice() != null ?
                            item.getProduct().getDiscountPrice() : item.getProduct().getPrice();
                    return price * item.getQuantity();
                })
                .sum();
    }

    public Integer getCartItemCount(Long userId) {
        logger.info("Getting cart item count for user: {}", userId);
        List<CartItem> items = getCartItems(userId);
        return items.stream()
                .mapToInt(CartItem::getQuantity)
                .sum();
    }
}
