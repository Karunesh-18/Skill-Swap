package com.example.demo.controller;

import com.example.demo.dto.SkillRequest;
import com.example.demo.model.Skill;
import com.example.demo.service.SkillService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "*")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @PostMapping
    public ResponseEntity<?> addSkill(@RequestBody SkillRequest request, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body("Not authenticated");
        }

        Skill skill = skillService.addSkill(userId, request);
        return ResponseEntity.ok(skill);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Skill>> getUserSkills(@PathVariable Long userId) {
        List<Skill> skills = skillService.getUserSkills(userId);
        return ResponseEntity.ok(skills);
    }

    @GetMapping("/offered")
    public ResponseEntity<List<Skill>> getOfferedSkills() {
        List<Skill> skills = skillService.getOfferedSkills();
        return ResponseEntity.ok(skills);
    }

    @GetMapping("/requested")
    public ResponseEntity<List<Skill>> getRequestedSkills() {
        List<Skill> skills = skillService.getRequestedSkills();
        return ResponseEntity.ok(skills);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Skill>> searchSkills(@RequestParam String skillName) {
        List<Skill> skills = skillService.searchSkills(skillName);
        return ResponseEntity.ok(skills);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Skill> updateSkill(@PathVariable Long id, @RequestBody SkillRequest request) {
        Skill skill = skillService.updateSkill(id, request);
        return ResponseEntity.ok(skill);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSkill(@PathVariable Long id) {
        skillService.deleteSkill(id);
        return ResponseEntity.ok("Skill deleted successfully");
    }
}

