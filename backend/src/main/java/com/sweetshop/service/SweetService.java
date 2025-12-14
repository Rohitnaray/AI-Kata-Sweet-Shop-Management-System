package com.sweetshop.service;

import com.sweetshop.model.Sweet;
import com.sweetshop.repository.SweetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SweetService {
    
    @Autowired
    private SweetRepository sweetRepository;
    
    public Sweet addSweet(Sweet sweet) {
        if (sweet.getPrice() < 0) {
            throw new RuntimeException("Price cannot be negative");
        }
        if (sweet.getQuantity() < 0) {
            throw new RuntimeException("Quantity cannot be negative");
        }
        return sweetRepository.save(sweet);
    }
    
    public List<Sweet> getAllSweets() {
        return sweetRepository.findAll();
    }
    
    public Sweet getSweetById(String id) {
        return sweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found"));
    }
    
    public List<Sweet> searchSweets(String keyword, String category, Double minPrice, Double maxPrice) {
        if (keyword != null && !keyword.isEmpty()) {
            return sweetRepository.searchSweets(keyword);
        }
        
        if (category != null && !category.isEmpty()) {
            return sweetRepository.findByCategory(category);
        }
        
        if (minPrice != null && maxPrice != null) {
            return sweetRepository.findByPriceBetween(minPrice, maxPrice);
        }
        
        return sweetRepository.findAll();
    }
    
    public Sweet updateSweet(String id, Sweet sweetDetails) {
        Sweet sweet = getSweetById(id);
        
        if (sweetDetails.getName() != null) {
            sweet.setName(sweetDetails.getName());
        }
        if (sweetDetails.getCategory() != null) {
            sweet.setCategory(sweetDetails.getCategory());
        }
        if (sweetDetails.getPrice() >= 0) {
            sweet.setPrice(sweetDetails.getPrice());
        }
        if (sweetDetails.getQuantity() >= 0) {
            sweet.setQuantity(sweetDetails.getQuantity());
        }
        if (sweetDetails.getDescription() != null) {
            sweet.setDescription(sweetDetails.getDescription());
        }
        
        return sweetRepository.save(sweet);
    }
    
    public void deleteSweet(String id) {
        Sweet sweet = getSweetById(id);
        sweetRepository.delete(sweet);
    }
    
    public Sweet purchaseSweet(String id, int quantity) {
        Sweet sweet = getSweetById(id);
        
        if (sweet.getQuantity() < quantity) {
            throw new RuntimeException("Insufficient quantity available");
        }
        
        sweet.setQuantity(sweet.getQuantity() - quantity);
        return sweetRepository.save(sweet);
    }
    
    public Sweet restockSweet(String id, int quantity) {
        Sweet sweet = getSweetById(id);
        sweet.setQuantity(sweet.getQuantity() + quantity);
        return sweetRepository.save(sweet);
    }
}