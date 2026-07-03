package com.topline.api.models;

/** A selectable colour: display name + hex code. Stored inside product JSON. */
public class ProductColor {
    private String name;
    private String code;

    public ProductColor() {}

    public ProductColor(String name, String code) {
        this.name = name;
        this.code = code;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
}
