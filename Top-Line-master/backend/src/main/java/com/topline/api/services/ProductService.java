package com.topline.api.services;

import com.topline.api.models.Product;
import com.topline.api.repositories.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private static final Logger logger = LoggerFactory.getLogger(ProductService.class);
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        logger.info("Fetching all products");
        return productRepository.findAll();
    }

    public List<Product> getProducts(String category, String collection, String sortBy, String order) {
        logger.info("Fetching products with filters - category: {}, collection: {}", category, collection);
        
        List<Product> products;
        if (category != null && collection != null) {
            products = productRepository.findByCategoryAndCollection(category, collection);
        } else if (category != null) {
            products = productRepository.findByCategory(category);
        } else if (collection != null) {
            products = productRepository.findByCollection(collection);
        } else {
            products = productRepository.findAll();
        }

        // Apply sorting
        if (sortBy != null) {
            products = sortProducts(products, sortBy, "desc".equalsIgnoreCase(order));
        }

        return products;
    }

    public Product getProductById(Long id) {
        logger.info("Fetching product with id: {}", id);
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public List<Product> searchProducts(String searchTerm) {
        logger.info("Searching products with term: {}", searchTerm);
        return productRepository.searchByNameOrDescription(searchTerm);
    }

    public Product createProduct(Product product) {
        logger.info("Creating new product: {}", product.getName());
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        logger.info("Updating product with id: {}", id);
        Product product = getProductById(id);
        
        if (productDetails.getName() != null) product.setName(productDetails.getName());
        if (productDetails.getDescription() != null) product.setDescription(productDetails.getDescription());
        if (productDetails.getPrice() != null) product.setPrice(productDetails.getPrice());
        if (productDetails.getDiscountPrice() != null) product.setDiscountPrice(productDetails.getDiscountPrice());
        if (productDetails.getCategory() != null) product.setCategory(productDetails.getCategory());
        if (productDetails.getCollection() != null) product.setCollection(productDetails.getCollection());
        if (productDetails.getInStock() != null) product.setInStock(productDetails.getInStock());
        if (productDetails.getImages() != null) product.setImages(productDetails.getImages());
        if (productDetails.getSizes() != null) product.setSizes(productDetails.getSizes());
        if (productDetails.getColors() != null) product.setColors(productDetails.getColors());
        if (productDetails.getVariants() != null) product.setVariants(productDetails.getVariants());

        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        logger.info("Deleting product with id: {}", id);
        productRepository.deleteById(id);
    }

    private List<Product> sortProducts(List<Product> products, String sortBy, boolean descending) {
        List<Product> sorted = products.stream()
                .collect(Collectors.toList());

        if ("price".equalsIgnoreCase(sortBy)) {
            sorted.sort((p1, p2) -> {
                Double price1 = p1.getDiscountPrice() != null ? p1.getDiscountPrice() : p1.getPrice();
                Double price2 = p2.getDiscountPrice() != null ? p2.getDiscountPrice() : p2.getPrice();
                return descending ? price2.compareTo(price1) : price1.compareTo(price2);
            });
        } else if ("rating".equalsIgnoreCase(sortBy)) {
            sorted.sort((p1, p2) -> descending ? 
                    p2.getRating().compareTo(p1.getRating()) : 
                    p1.getRating().compareTo(p2.getRating()));
        } else if ("name".equalsIgnoreCase(sortBy)) {
            sorted.sort((p1, p2) -> descending ? 
                    p2.getName().compareTo(p1.getName()) : 
                    p1.getName().compareTo(p2.getName()));
        }

        return sorted;
    }
}
