package com.example.SkillSwap.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SkillSwap.entity.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {

}
