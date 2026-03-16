package com.topline.api.services;

import com.topline.api.models.UserAddress;
import com.topline.api.models.User;
import com.topline.api.repositories.UserAddressRepository;
import com.topline.api.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AddressService {
    private static final Logger logger = LoggerFactory.getLogger(AddressService.class);
    private final UserAddressRepository addressRepository;
    private final UserRepository userRepository;

    public AddressService(UserAddressRepository addressRepository, UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    public List<UserAddress> getUserAddresses(Long userId) {
        logger.info("Fetching addresses for user: {}", userId);
        return addressRepository.findByUserId(userId);
    }

    public UserAddress getAddressById(Long addressId) {
        logger.info("Fetching address with id: {}", addressId);
        return addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found with id: " + addressId));
    }

    @Transactional
    public UserAddress saveAddress(Long userId, UserAddress address) {
        logger.info("Saving address for user: {}", userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        address.setUser(user);
        
        // If this is set as default, unset other defaults
        if (Boolean.TRUE.equals(address.getIsDefault())) {
            List<UserAddress> userAddresses = addressRepository.findByUserId(userId);
            userAddresses.forEach(addr -> addr.setIsDefault(false));
            addressRepository.saveAll(userAddresses);
        }
        
        return addressRepository.save(address);
    }

    @Transactional
    public UserAddress updateAddress(Long addressId, UserAddress addressDetails) {
        logger.info("Updating address with id: {}", addressId);
        UserAddress address = getAddressById(addressId);
        
        if (addressDetails.getName() != null) address.setName(addressDetails.getName());
        if (addressDetails.getEmail() != null) address.setEmail(addressDetails.getEmail());
        if (addressDetails.getStreet() != null) address.setStreet(addressDetails.getStreet());
        if (addressDetails.getCity() != null) address.setCity(addressDetails.getCity());
        if (addressDetails.getState() != null) address.setState(addressDetails.getState());
        if (addressDetails.getZip() != null) address.setZip(addressDetails.getZip());
        
        if (addressDetails.getIsDefault() != null) {
            if (Boolean.TRUE.equals(addressDetails.getIsDefault())) {
                // Unset other defaults
                List<UserAddress> userAddresses = addressRepository.findByUserId(address.getUser().getId());
                userAddresses.forEach(addr -> addr.setIsDefault(false));
                addressRepository.saveAll(userAddresses);
            }
            address.setIsDefault(addressDetails.getIsDefault());
        }
        
        return addressRepository.save(address);
    }

    public void deleteAddress(Long addressId) {
        logger.info("Deleting address with id: {}", addressId);
        addressRepository.deleteById(addressId);
    }

    public UserAddress getDefaultAddress(Long userId) {
        logger.info("Fetching default address for user: {}", userId);
        List<UserAddress> addresses = getUserAddresses(userId);
        return addresses.stream()
                .filter(addr -> Boolean.TRUE.equals(addr.getIsDefault()))
                .findFirst()
                .orElse(null);
    }
}
