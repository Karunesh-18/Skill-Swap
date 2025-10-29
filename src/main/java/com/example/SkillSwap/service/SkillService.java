package com.example.demo.service;

import com.example.demo.dto.SkillRequest;
import com.example.demo.model.Skill;
import com.example.demo.model.User;
import com.example.demo.repository.SkillRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private UserRepository userRepository;

    public Skill addSkill(Long userId, SkillRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Skill skill = new Skill();
        skill.setSkillName(request.getSkillName());
        skill.setDescription(request.getDescription());
        skill.setType(request.getType());
        skill.setLevel(request.getLevel());
        skill.setUser(user);

        return skillRepository.save(skill);
    }

    public List<Skill> getUserSkills(Long userId) {
        return skillRepository.findByUserId(userId);
    }

    public List<Skill> getOfferedSkills() {
        return skillRepository.findByType(Skill.SkillType.OFFERED);
    }

    public List<Skill> getRequestedSkills() {
        return skillRepository.findByType(Skill.SkillType.REQUESTED);
    }

    public List<Skill> searchSkills(String skillName) {
        return skillRepository.findBySkillNameContainingIgnoreCase(skillName);
    }

    public Skill updateSkill(Long skillId, SkillRequest request) {
        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        skill.setSkillName(request.getSkillName());
        skill.setDescription(request.getDescription());
        skill.setLevel(request.getLevel());

        return skillRepository.save(skill);
    }

    public void deleteSkill(Long skillId) {
        skillRepository.deleteById(skillId);
    }
}

