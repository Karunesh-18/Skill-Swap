package com.example.demo.service;

import com.example.demo.dto.ReviewRequest;
import com.example.demo.model.Review;
import com.example.demo.model.Session;
import com.example.demo.model.User;
import com.example.demo.repository.ReviewRepository;
import com.example.demo.repository.SessionRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    public Review createReview(Long reviewerId, ReviewRequest request) {
        User reviewer = userRepository.findById(reviewerId)
                .orElseThrow(() -> new RuntimeException("Reviewer not found"));

        User reviewee = userRepository.findById(request.getRevieweeId())
                .orElseThrow(() -> new RuntimeException("Reviewee not found"));

        Session session = sessionRepository.findById(request.getSessionId())
                .orElseThrow(() -> new RuntimeException("Session not found"));

        // Validate rating
        if (request.getRating() < 1 || request.getRating() > 5) {
            throw new RuntimeException("Rating must be between 1 and 5");
        }

        Review review = new Review();
        review.setReviewer(reviewer);
        review.setReviewee(reviewee);
        review.setSession(session);
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        Review savedReview = reviewRepository.save(review);

        // Update reviewee's rating
        userService.updateUserRating(reviewee.getId());

        return savedReview;
    }

    public List<Review> getUserReceivedReviews(Long userId) {
        return reviewRepository.findByRevieweeId(userId);
    }

    public List<Review> getUserGivenReviews(Long userId) {
        return reviewRepository.findByReviewerId(userId);
    }

    public List<Review> getSessionReviews(Long sessionId) {
        return reviewRepository.findBySessionId(sessionId);
    }
}

