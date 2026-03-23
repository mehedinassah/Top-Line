package com.topline.api.controllers;

import com.topline.api.models.Product;
import com.topline.api.services.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {
    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<?> getProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String collection,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String order) {
        try {
            logger.info("GET /api/products - Fetching products with filters");
            List<Product> products = productService.getProducts(category, collection, sortBy, order);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", products,
                    "count", products.size()
            ));
        } catch (Exception e) {
            logger.error("Error fetching products: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error fetching products: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        try {
            logger.info("GET /api/products/{} - Fetching product details", id);
            Product product = productService.getProductById(id);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", product
            ));
        } catch (RuntimeException e) {
            logger.error("Product not found: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        } catch (Exception e) {
            logger.error("Error fetching product: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error fetching product: " + e.getMessage()
            ));
        }
    }

    @PostMapping("/search")
    public ResponseEntity<?> searchProducts(@RequestBody Map<String, String> request) {
        try {
            String searchTerm = request.get("query");
            if (searchTerm == null || searchTerm.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "Search query is required"
                ));
            }
            
            logger.info("POST /api/products/search - Searching products with term: {}", searchTerm);
            List<Product> results = productService.searchProducts(searchTerm);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", results,
                    "count", results.size()
            ));
        } catch (Exception e) {
            logger.error("Error searching products: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error searching products: " + e.getMessage()
            ));
        }
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody Product product) {
        try {
            logger.info("POST /api/products - Creating new product: {}", product.getName());
            
            if (product.getName() == null || product.getName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "Product name is required"
                ));
            }
            
            if (product.getPrice() == null || product.getPrice() <= 0) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "Product price must be greater than 0"
                ));
            }
            
            Product created = productService.createProduct(product);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "success", true,
                    "data", created,
                    "message", "Product created successfully"
            ));
        } catch (Exception e) {
            logger.error("Error creating product: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error creating product: " + e.getMessage()
            ));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        try {
            logger.info("PUT /api/products/{} - Updating product", id);
            Product updated = productService.updateProduct(id, productDetails);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", updated,
                    "message", "Product updated successfully"
            ));
        } catch (RuntimeException e) {
            logger.error("Product not found: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        } catch (Exception e) {
            logger.error("Error updating product: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error updating product: " + e.getMessage()
            ));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        try {
            logger.info("DELETE /api/products/{} - Deleting product", id);
            productService.deleteProduct(id);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Product deleted successfully"
            ));
        } catch (Exception e) {
            logger.error("Error deleting product: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error deleting product: " + e.getMessage()
            ));
        }
    }
}
