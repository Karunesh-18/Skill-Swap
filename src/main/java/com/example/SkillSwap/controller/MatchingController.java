package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.MatchingService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matching")
@CrossOrigin(origins = "*")
public class MatchingController {

    @Autowired
    private MatchingService matchingService;

    @GetMapping("/matches")
    public ResponseEntity<?> findMatches(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body("Not authenticated");
        }

        List<User> matches = matchingService.findMatches(userId);
        return ResponseEntity.ok(matches);
    }

    @GetMapping("/providers")
    public ResponseEntity<List<User>> findProviders(@RequestParam String skillName) {
        List<User> providers = matchingService.findProviders(skillName);
        return ResponseEntity.ok(providers);
    }
}

