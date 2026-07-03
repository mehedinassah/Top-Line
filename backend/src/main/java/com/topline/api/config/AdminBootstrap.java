package com.topline.api.config;

import com.topline.api.models.User;
import com.topline.api.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Ensures an admin account exists on startup so the admin panel is usable.
 * Configure via env: ADMIN_EMAIL and ADMIN_PASSWORD. If ADMIN_EMAIL is unset,
 * seeding is skipped. If the user already exists, it is promoted to ADMIN
 * (password is left untouched).
 */
@Component
public class AdminBootstrap implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(AdminBootstrap.class);

    private final UserRepository users;
    private final PasswordEncoder encoder;

    @Value("${admin.email:}")
    private String adminEmail;

    @Value("${admin.password:}")
    private String adminPassword;

    @Value("${admin.name:Store Admin}")
    private String adminName;

    public AdminBootstrap(UserRepository users, PasswordEncoder encoder) {
        this.users = users;
        this.encoder = encoder;
    }

    @Override
    public void run(String... args) {
        if (adminEmail == null || adminEmail.isBlank()) {
            logger.info("ADMIN_EMAIL not set — skipping admin bootstrap.");
            return;
        }

        users.findByEmail(adminEmail).ifPresentOrElse(existing -> {
            if (existing.getRole() != User.Role.ADMIN) {
                existing.setRole(User.Role.ADMIN);
                users.save(existing);
                logger.info("Promoted existing user {} to ADMIN.", adminEmail);
            } else {
                logger.info("Admin user {} already present.", adminEmail);
            }
        }, () -> {
            if (adminPassword == null || adminPassword.isBlank()) {
                logger.warn("ADMIN_EMAIL set but ADMIN_PASSWORD missing — cannot create admin.");
                return;
            }
            User admin = new User();
            admin.setName(adminName);
            admin.setEmail(adminEmail);
            admin.setPassword(encoder.encode(adminPassword));
            admin.setRole(User.Role.ADMIN);
            users.save(admin);
            logger.info("Created admin user {}.", adminEmail);
        });
    }
}
