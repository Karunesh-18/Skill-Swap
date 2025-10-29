package com.example.demo.service;

import com.example.demo.dto.SessionRequest;
import com.example.demo.model.Session;
import com.example.demo.model.User;
import com.example.demo.repository.SessionRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionService {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private UserRepository userRepository;

    public Session createSession(Long requesterId, SessionRequest request) {
        User requester = userRepository.findById(requesterId)
                .orElseThrow(() -> new RuntimeException("Requester not found"));

        User provider = userRepository.findById(request.getProviderId())
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        Session session = new Session();
        session.setRequester(requester);
        session.setProvider(provider);
        session.setSkillName(request.getSkillName());
        session.setDescription(request.getDescription());
        session.setScheduledTime(request.getScheduledTime());
        session.setDurationMinutes(request.getDurationMinutes());
        session.setLocation(request.getLocation());
        session.setStatus(Session.SessionStatus.PENDING);

        return sessionRepository.save(session);
    }

    public List<Session> getUserRequestedSessions(Long userId) {
        return sessionRepository.findByRequesterId(userId);
    }

    public List<Session> getUserProvidedSessions(Long userId) {
        return sessionRepository.findByProviderId(userId);
    }

    public Session confirmSession(Long sessionId) {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        session.setStatus(Session.SessionStatus.CONFIRMED);
        return sessionRepository.save(session);
    }

    public Session completeSession(Long sessionId) {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        session.setStatus(Session.SessionStatus.COMPLETED);

        // Update session counts
        User requester = session.getRequester();
        User provider = session.getProvider();

        requester.setTotalSessions(requester.getTotalSessions() + 1);
        requester.setCompletedSessions(requester.getCompletedSessions() + 1);

        provider.setTotalSessions(provider.getTotalSessions() + 1);
        provider.setCompletedSessions(provider.getCompletedSessions() + 1);

        userRepository.save(requester);
        userRepository.save(provider);

        return sessionRepository.save(session);
    }

    public Session cancelSession(Long sessionId) {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        session.setStatus(Session.SessionStatus.CANCELLED);
        return sessionRepository.save(session);
    }

    public List<Session> getAllSessions() {
        return sessionRepository.findAll();
    }
}

