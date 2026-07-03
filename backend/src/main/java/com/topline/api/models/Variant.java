package com.topline.api.models;

/** A size × colour variant with SKU and stock. Stored inside product JSON. */
public class Variant {
    private String size;
    private ProductColor color;
    private String sku;
    private Boolean inStock = true;
    private Integer quantity = 0;

    public Variant() {}

    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }

    public ProductColor getColor() { return color; }
    public void setColor(ProductColor color) { this.color = color; }

    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }

    public Boolean getInStock() { return inStock; }
    public void setInStock(Boolean inStock) { this.inStock = inStock; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}
