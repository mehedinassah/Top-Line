package com.topline.api.controllers;

import com.topline.api.models.User;
import com.topline.api.repositories.UserRepository;
import com.topline.api.security.JwtService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final AuthenticationManager authManager;
    private final JwtService jwtService;

    public AuthController(UserRepository users,
                          PasswordEncoder encoder,
                          AuthenticationManager authManager,
                          JwtService jwtService) {
        this.users = users;
        this.encoder = encoder;
        this.authManager = authManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        if (users.findByEmail(req.email()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already registered"));
        }
        User u = new User();
        u.setName(req.name());
        u.setEmail(req.email());
        u.setPassword(encoder.encode(req.password()));
        u.setRole(User.Role.USER);
        users.save(u);
        String token = jwtService.generateToken(u.getEmail(), u.getRole().name());
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.email(), req.password())
        );
        User u = users.findByEmail(req.email()).orElseThrow();
        String token = jwtService.generateToken(u.getEmail(), u.getRole().name());
        return ResponseEntity.ok(Map.of("token", token));
    }

    public record RegisterRequest(String name, String email, String password) {}

    public record LoginRequest(String email, String password) {}
}

