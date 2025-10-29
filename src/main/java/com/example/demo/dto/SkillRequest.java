package com.example.demo.dto;

import com.example.demo.model.Skill;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SkillRequest {
    private String skillName;
    private String description;
    private Skill.SkillType type;
    private Skill.SkillLevel level;
}

