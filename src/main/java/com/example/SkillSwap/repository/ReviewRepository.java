package com.example.SkillSwap.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SkillSwap.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

}

UserRepository extends JpaRepository<User, Long> {}
public interface SkillRepository extends JpaRepository<Skill, Long> {}
public interface SessionRepository extends JpaRepository<Session, Long> {}
public interface ReviewRepository