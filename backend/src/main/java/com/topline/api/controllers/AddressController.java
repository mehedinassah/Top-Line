package com.topline.api.controllers;

import com.topline.api.models.User;
import com.topline.api.models.UserAddress;
import com.topline.api.repositories.UserRepository;
import com.topline.api.services.AddressService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class AddressController {
    private static final Logger logger = LoggerFactory.getLogger(AddressController.class);
    private final AddressService addressService;
    private final UserRepository userRepository;

    public AddressController(AddressService addressService, UserRepository userRepository) {
        this.addressService = addressService;
        this.userRepository = userRepository;
    }

    private Long getCurrentUserId() {
        // Placeholder for extracting user ID from JWT token
        return 1L;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        try {
            logger.info("GET /api/user/profile - Fetching user profile");
            
            Long userId = getCurrentUserId();
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", Map.of(
                            "id", user.getId(),
                            "name", user.getName(),
                            "email", user.getEmail(),
                            "role", user.getRole()
                    )
            ));
        } catch (Exception e) {
            logger.error("Error fetching user profile: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error fetching user profile: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/addresses")
    public ResponseEntity<?> getUserAddresses() {
        try {
            logger.info("GET /api/user/addresses - Fetching user addresses");
            
            Long userId = getCurrentUserId();
            List<UserAddress> addresses = addressService.getUserAddresses(userId);
            
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", addresses,
                    "count", addresses.size()
            ));
        } catch (Exception e) {
            logger.error("Error fetching addresses: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error fetching addresses: " + e.getMessage()
            ));
        }
    }

    @PostMapping("/addresses")
    public ResponseEntity<?> saveAddress(@RequestBody UserAddress address) {
        try {
            logger.info("POST /api/user/addresses - Saving new address");
            
            if (address.getStreet() == null || address.getStreet().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "Street address is required"
                ));
            }
            
            if (address.getCity() == null || address.getCity().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "City is required"
                ));
            }
            
            if (address.getZip() == null || address.getZip().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "ZIP code is required"
                ));
            }
            
            Long userId = getCurrentUserId();
            UserAddress saved = addressService.saveAddress(userId, address);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "success", true,
                    "data", saved,
                    "message", "Address saved successfully"
            ));
        } catch (Exception e) {
            logger.error("Error saving address: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error saving address: " + e.getMessage()
            ));
        }
    }

    @PutMapping("/addresses/{id}")
    public ResponseEntity<?> updateAddress(@PathVariable Long id, @RequestBody UserAddress addressDetails) {
        try {
            logger.info("PUT /api/user/addresses/{} - Updating address", id);
            
            UserAddress updated = addressService.updateAddress(id, addressDetails);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", updated,
                    "message", "Address updated successfully"
            ));
        } catch (RuntimeException e) {
            logger.error("Address not found: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        } catch (Exception e) {
            logger.error("Error updating address: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error updating address: " + e.getMessage()
            ));
        }
    }

    @DeleteMapping("/addresses/{id}")
    public ResponseEntity<?> deleteAddress(@PathVariable Long id) {
        try {
            logger.info("DELETE /api/user/addresses/{} - Deleting address", id);
            
            addressService.deleteAddress(id);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Address deleted successfully"
            ));
        } catch (Exception e) {
            logger.error("Error deleting address: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error deleting address: " + e.getMessage()
            ));
        }
    }
}
