package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(Long id, User updatedUser) {
        User user = getUserById(id);
        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setBio(updatedUser.getBio());
        user.setMajor(updatedUser.getMajor());
        user.setYear(updatedUser.getYear());
        return userRepository.save(user);
    }

    public void updateUserRating(Long userId) {
        User user = getUserById(userId);
        // Calculate average rating from received reviews
        Double avgRating = user.getReceivedReviews().stream()
                .mapToInt(review -> review.getRating())
                .average()
                .orElse(0.0);
        user.setRating(avgRating);
        userRepository.save(user);
    }
}

