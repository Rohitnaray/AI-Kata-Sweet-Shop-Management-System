package com.sweetshop.controller;

import com.sweetshop.model.Sweet;
import com.sweetshop.security.JwtUtil;
import com.sweetshop.service.SweetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sweets")
@CrossOrigin(origins = "http://localhost:5173")
public class SweetController {
    
    @Autowired
    private SweetService sweetService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @GetMapping
    public ResponseEntity<List<Sweet>> getAllSweets() {
        return ResponseEntity.ok(sweetService.getAllSweets());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getSweetById(@PathVariable String id) {
        try {
            Sweet sweet = sweetService.getSweetById(id);
            return ResponseEntity.ok(sweet);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Sweet>> searchSweets(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {
        
        List<Sweet> sweets = sweetService.searchSweets(keyword, category, minPrice, maxPrice);
        return ResponseEntity.ok(sweets);
    }
    
    @PostMapping
    public ResponseEntity<?> addSweet(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Sweet sweet) {
        try {
            String token = authHeader.substring(7); // Remove "Bearer "
            
            if (!jwtUtil.validateToken(token)) {
                return ResponseEntity.status(401).body("Invalid token");
            }
            
            Sweet savedSweet = sweetService.addSweet(sweet);
            return ResponseEntity.ok(savedSweet);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSweet(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable String id,
            @RequestBody Sweet sweet) {
        try {
            String token = authHeader.substring(7);
            
            if (!jwtUtil.validateToken(token)) {
                return ResponseEntity.status(401).body("Invalid token");
            }
            
            Sweet updatedSweet = sweetService.updateSweet(id, sweet);
            return ResponseEntity.ok(updatedSweet);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSweet(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable String id) {
        try {
            String token = authHeader.substring(7);
            
            if (!jwtUtil.validateToken(token)) {
                return ResponseEntity.status(401).body("Invalid token");
            }
            
            if (!jwtUtil.isAdmin(token)) {
                return ResponseEntity.status(403).body("Admin access required");
            }
            
            sweetService.deleteSweet(id);
            return ResponseEntity.ok("Sweet deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/{id}/purchase")
    public ResponseEntity<?> purchaseSweet(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable String id,
            @RequestBody Map<String, Integer> request) {
        try {
            String token = authHeader.substring(7);
            
            if (!jwtUtil.validateToken(token)) {
                return ResponseEntity.status(401).body("Invalid token");
            }
            
            int quantity = request.get("quantity");
            Sweet sweet = sweetService.purchaseSweet(id, quantity);
            return ResponseEntity.ok(sweet);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/{id}/restock")
    public ResponseEntity<?> restockSweet(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable String id,
            @RequestBody Map<String, Integer> request) {
        try {
            String token = authHeader.substring(7);
            
            if (!jwtUtil.validateToken(token)) {
                return ResponseEntity.status(401).body("Invalid token");
            }
            
            if (!jwtUtil.isAdmin(token)) {
                return ResponseEntity.status(403).body("Admin access required");
            }
            
            int quantity = request.get("quantity");
            Sweet sweet = sweetService.restockSweet(id, quantity);
            return ResponseEntity.ok(sweet);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}