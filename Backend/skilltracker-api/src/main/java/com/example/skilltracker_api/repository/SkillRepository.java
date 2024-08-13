package com.example.skilltracker_api.repository;

import com.example.skilltracker_api.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skill, Long> {
}

