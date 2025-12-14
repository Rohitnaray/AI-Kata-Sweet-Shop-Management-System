package com.sweetshop.controller;

import com.sweetshop.model.User;
import com.sweetshop.security.JwtUtil;
import com.sweetshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String password = request.get("password");
            
            // Validation
            if (email == null || !email.contains("@")) {
                return ResponseEntity.badRequest().body("Invalid email format");
            }
            
            if (password == null || password.length() < 6) {
                return ResponseEntity.badRequest().body("Password must be at least 6 characters");
            }
            
            User user = userService.registerUser(email, password);
            String token = jwtUtil.generateToken(user.getEmail(), user.isAdmin());
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("email", user.getEmail());
            response.put("isAdmin", user.isAdmin());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String password = request.get("password");
            
            User user = userService.loginUser(email, password);
            String token = jwtUtil.generateToken(user.getEmail(), user.isAdmin());
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("email", user.getEmail());
            response.put("isAdmin", user.isAdmin());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}