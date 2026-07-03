package com.topline.api.models;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

/**
 * Storefront product. Rich, frontend-shaped fields (description, colors,
 * variants, images, sizes) are stored as Postgres jsonb columns so the
 * catalogue keeps its full structure without a wide relational schema.
 */
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;
    private Double discountPrice;
    private Double rating = 0.0;
    private String category;
    private String collection; // "men" | "women" | "accessories"
    private Boolean inStock = true;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private ProductDescription description;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private List<String> images = new ArrayList<>();

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private List<String> sizes = new ArrayList<>();

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private List<ProductColor> colors = new ArrayList<>();

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private List<Variant> variants = new ArrayList<>();

    private Instant createdAt = Instant.now();

    public Product() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Double getDiscountPrice() { return discountPrice; }
    public void setDiscountPrice(Double discountPrice) { this.discountPrice = discountPrice; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getCollection() { return collection; }
    public void setCollection(String collection) { this.collection = collection; }

    public Boolean getInStock() { return inStock; }
    public void setInStock(Boolean inStock) { this.inStock = inStock; }

    public ProductDescription getDescription() { return description; }
    public void setDescription(ProductDescription description) { this.description = description; }

    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }

    public List<String> getSizes() { return sizes; }
    public void setSizes(List<String> sizes) { this.sizes = sizes; }

    public List<ProductColor> getColors() { return colors; }
    public void setColors(List<ProductColor> colors) { this.colors = colors; }

    public List<Variant> getVariants() { return variants; }
    public void setVariants(List<Variant> variants) { this.variants = variants; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
