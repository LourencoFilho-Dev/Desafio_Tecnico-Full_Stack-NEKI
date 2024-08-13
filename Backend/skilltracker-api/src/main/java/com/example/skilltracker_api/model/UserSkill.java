package com.example.skilltracker_api.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user_skills")
@Data
public class UserSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Column(nullable = false)
    private int level;
}
