package com.example.SkillSwap.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SkillSwap.entity.Session;

public interface SessionRepository extends JpaRepository<Session, Long> {

}
