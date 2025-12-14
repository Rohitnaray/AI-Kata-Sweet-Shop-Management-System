package com.sweetshop.repository;

import com.sweetshop.model.Sweet;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SweetRepository extends MongoRepository<Sweet, String> {
    
    List<Sweet> findByCategory(String category);
    
    // Search by name or category (case-insensitive)
    @Query("{ $or: [ {'name': {$regex: ?0, $options: 'i'}}, {'category': {$regex: ?0, $options: 'i'}} ] }")
    List<Sweet> searchSweets(String keyword);
    
    // Find sweets within price range
    List<Sweet> findByPriceBetween(double minPrice, double maxPrice);
}