package com.codeclan.example.application_server.models;

public enum Role {

    PRODUCT_OWNER("Product Owner"),
    SCRUM_MASTER("Scrum Master"),
    DEVELOPER("Developer"),
    ADMIN("Administrator");

    private final String roleName;

    Role(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleName() {
        return roleName;
    }
}
