package com.example.demo.service;

import com.example.demo.model.Skill;
import com.example.demo.model.User;
import com.example.demo.repository.SkillRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MatchingService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private UserRepository userRepository;

    public List<User> findMatches(Long userId) {
        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Get user's requested skills
        List<Skill> requestedSkills = skillRepository.findByUserId(userId).stream()
                .filter(skill -> skill.getType() == Skill.SkillType.REQUESTED)
                .collect(Collectors.toList());

        if (requestedSkills.isEmpty()) {
            return new ArrayList<>();
        }

        // Find users who offer those skills
        List<User> matches = new ArrayList<>();
        for (Skill requestedSkill : requestedSkills) {
            List<Skill> offeredSkills = skillRepository
                    .findBySkillNameContainingIgnoreCase(requestedSkill.getSkillName()).stream()
                    .filter(skill -> skill.getType() == Skill.SkillType.OFFERED)
                    .filter(skill -> !skill.getUser().getId().equals(userId))
                    .collect(Collectors.toList());

            for (Skill offeredSkill : offeredSkills) {
                if (!matches.contains(offeredSkill.getUser())) {
                    matches.add(offeredSkill.getUser());
                }
            }
        }

        return matches;
    }

    public List<User> findProviders(String skillName) {
        List<Skill> skills = skillRepository.findBySkillNameContainingIgnoreCase(skillName).stream()
                .filter(skill -> skill.getType() == Skill.SkillType.OFFERED)
                .collect(Collectors.toList());

        return skills.stream()
                .map(Skill::getUser)
                .distinct()
                .collect(Collectors.toList());
    }
}

