package com.example.skilltracker_api.web;

import com.example.skilltracker_api.model.Skill;
import com.example.skilltracker_api.model.User;
import com.example.skilltracker_api.model.UserSkill;
import com.example.skilltracker_api.repository.SkillRepository;
import com.example.skilltracker_api.repository.UserRepository;
import com.example.skilltracker_api.repository.UserSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user-skills")
public class UserSkillController {

    @Autowired
    private UserSkillRepository userSkillRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<List<UserSkill>> getUserSkills(@PathVariable Long userId) {
        return userRepository.findById(userId)
                .map(user -> ResponseEntity.ok(userSkillRepository.findByUserId(userId)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{userId}/add")
    public ResponseEntity<UserSkill> addUserSkill(@PathVariable Long userId, @RequestBody UserSkill userSkill) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = optionalUser.get();
        userSkill.setUser(user);

        Optional<Skill> optionalSkill = skillRepository.findById(userSkill.getSkill().getId());
        if (optionalSkill.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Skill not found");
        }

        Skill skill = optionalSkill.get();
        userSkill.setSkill(skill);

        UserSkill savedUserSkill = userSkillRepository.save(userSkill);
        return ResponseEntity.ok(savedUserSkill);
    }

    @PutMapping("/{userId}/update/{userSkillId}")
    public ResponseEntity<UserSkill> updateUserSkillLevel(@PathVariable Long userId,
                                                          @PathVariable Long userSkillId,
                                                          @RequestParam int level) { // Use @RequestParam para o nível
        return userSkillRepository.findById(userSkillId)
                .map(userSkill -> {
                    if (userSkill.getUser().getId().equals(userId)) {
                        userSkill.setLevel(level);
                        userSkillRepository.save(userSkill);
                        return ResponseEntity.ok(userSkill); // Retorna o UserSkill atualizado
                    } else {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
                    }
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{userId}/delete/{userSkillId}")
    public ResponseEntity<Void> deleteUserSkill(@PathVariable Long userId, @PathVariable Long userSkillId) {
        return userSkillRepository.findById(userSkillId)
                .map(userSkill -> {
                    if (userSkill.getUser().getId().equals(userId)) {
                        userSkillRepository.delete(userSkill);
                        return ResponseEntity.noContent().build();
                    } else {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
                    }
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
