package com.sweetshop.service;

import com.sweetshop.model.Sweet;
import com.sweetshop.repository.SweetRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SweetServiceTest {

    @Mock
    private SweetRepository sweetRepository;

    @InjectMocks
    private SweetService sweetService;

    @Test
    void addSweet_ValidData_ShouldReturnSweet() {
        // Arrange
        Sweet sweet = new Sweet();
        sweet.setName("Chocolate Bar");
        sweet.setPrice(2.99);
        sweet.setQuantity(100);
        
        when(sweetRepository.save(any(Sweet.class))).thenReturn(sweet);

        // Act
        Sweet result = sweetService.addSweet(sweet);

        // Assert
        assertNotNull(result);
        assertEquals("Chocolate Bar", result.getName());
        verify(sweetRepository, times(1)).save(sweet);
    }

    @Test
    void addSweet_NegativePrice_ShouldThrowException() {
        // Arrange
        Sweet sweet = new Sweet();
        sweet.setPrice(-5.0);

        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            sweetService.addSweet(sweet);
        });
    }

    @Test
    void purchaseSweet_SufficientQuantity_ShouldDecreaseStock() {
        // Arrange
        Sweet sweet = new Sweet();
        sweet.setId("1");
        sweet.setQuantity(10);
        
        when(sweetRepository.findById("1")).thenReturn(Optional.of(sweet));
        when(sweetRepository.save(any(Sweet.class))).thenReturn(sweet);

        // Act
        Sweet result = sweetService.purchaseSweet("1", 3);

        // Assert
        assertEquals(7, result.getQuantity());
    }

    @Test
    void purchaseSweet_InsufficientQuantity_ShouldThrowException() {
        // Arrange
        Sweet sweet = new Sweet();
        sweet.setId("1");
        sweet.setQuantity(2);
        
        when(sweetRepository.findById("1")).thenReturn(Optional.of(sweet));

        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            sweetService.purchaseSweet("1", 5);
        });
    }
}