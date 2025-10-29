package com.example.demo.controller;

import com.example.demo.dto.SessionRequest;
import com.example.demo.model.Session;
import com.example.demo.service.SessionService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "*")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @PostMapping
    public ResponseEntity<?> createSession(@RequestBody SessionRequest request, HttpSession httpSession) {
        Long userId = (Long) httpSession.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body("Not authenticated");
        }

        Session session = sessionService.createSession(userId, request);
        return ResponseEntity.ok(session);
    }

    @GetMapping("/requested")
    public ResponseEntity<?> getRequestedSessions(HttpSession httpSession) {
        Long userId = (Long) httpSession.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body("Not authenticated");
        }

        List<Session> sessions = sessionService.getUserRequestedSessions(userId);
        return ResponseEntity.ok(sessions);
    }

    @GetMapping("/provided")
    public ResponseEntity<?> getProvidedSessions(HttpSession httpSession) {
        Long userId = (Long) httpSession.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body("Not authenticated");
        }

        List<Session> sessions = sessionService.getUserProvidedSessions(userId);
        return ResponseEntity.ok(sessions);
    }

    @GetMapping
    public ResponseEntity<List<Session>> getAllSessions() {
        List<Session> sessions = sessionService.getAllSessions();
        return ResponseEntity.ok(sessions);
    }

    @PutMapping("/{id}/confirm")
    public ResponseEntity<Session> confirmSession(@PathVariable Long id) {
        Session session = sessionService.confirmSession(id);
        return ResponseEntity.ok(session);
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<Session> completeSession(@PathVariable Long id) {
        Session session = sessionService.completeSession(id);
        return ResponseEntity.ok(session);
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Session> cancelSession(@PathVariable Long id) {
        Session session = sessionService.cancelSession(id);
        return ResponseEntity.ok(session);
    }
}

