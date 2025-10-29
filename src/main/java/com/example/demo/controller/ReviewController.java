package com.example.demo.controller;

import com.example.demo.dto.ReviewRequest;
import com.example.demo.model.Review;
import com.example.demo.service.ReviewService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<?> createReview(@RequestBody ReviewRequest request, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body("Not authenticated");
        }

        Review review = reviewService.createReview(userId, request);
        return ResponseEntity.ok(review);
    }

    @GetMapping("/user/{userId}/received")
    public ResponseEntity<List<Review>> getUserReceivedReviews(@PathVariable Long userId) {
        List<Review> reviews = reviewService.getUserReceivedReviews(userId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/user/{userId}/given")
    public ResponseEntity<List<Review>> getUserGivenReviews(@PathVariable Long userId) {
        List<Review> reviews = reviewService.getUserGivenReviews(userId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/session/{sessionId}")
    public ResponseEntity<List<Review>> getSessionReviews(@PathVariable Long sessionId) {
        List<Review> reviews = reviewService.getSessionReviews(sessionId);
        return ResponseEntity.ok(reviews);
    }
}

