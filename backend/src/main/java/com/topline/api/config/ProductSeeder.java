package com.topline.api.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.topline.api.models.Product;
import com.topline.api.repositories.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;

/**
 * Seeds the catalogue from resources/seed/products.json the first time the
 * app starts against an empty products table. Idempotent: skips if any
 * product already exists.
 */
@Component
@Order(1)
public class ProductSeeder implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(ProductSeeder.class);

    private final ProductRepository products;
    private final ObjectMapper mapper;

    public ProductSeeder(ProductRepository products, ObjectMapper mapper) {
        this.products = products;
        this.mapper = mapper;
    }

    @Override
    public void run(String... args) throws Exception {
        if (products.count() > 0) {
            logger.info("Products already present ({}), skipping seed.", products.count());
            return;
        }
        ClassPathResource res = new ClassPathResource("seed/products.json");
        if (!res.exists()) {
            logger.warn("seed/products.json not found — nothing to seed.");
            return;
        }
        try (InputStream in = res.getInputStream()) {
            List<Product> catalogue = mapper.readValue(in, new TypeReference<List<Product>>() {});
            products.saveAll(catalogue);
            logger.info("Seeded {} products from products.json.", catalogue.size());
        }
    }
}
