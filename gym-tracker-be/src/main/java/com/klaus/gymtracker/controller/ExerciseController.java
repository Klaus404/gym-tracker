package com.klaus.gymtracker.controller;

import com.klaus.gymtracker.dao.ExerciseRepository;
import com.klaus.gymtracker.entity.Exercise;
import com.klaus.gymtracker.service.ExerciseService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api")
public class ExerciseController {
    private final ExerciseService service;

    ExerciseController(ExerciseService service) {
        this.service = service;
    }

    @GetMapping("/exercises")
    public List<Exercise> listUserExercises(@AuthenticationPrincipal Jwt principal) {
        String userId = principal.getClaim("user_id"); // Extract user ID from Firebase token
        return service.getExercisesForUser(userId);
    }

    @GetMapping("/exercise/{exerciseName}")
    Exercise getExercise(@PathVariable String exerciseName){
        return service.getExerciseByName(exerciseName);
    }

    @PostMapping("/exercises")
    public ResponseEntity<String> createExercise(@AuthenticationPrincipal Jwt principal, @RequestBody Exercise exercise) {
        String userId = principal.getClaim("user_id");
        service.saveNewExercise(userId, exercise);
        return ResponseEntity.ok("Exercise added successfully.");
    }
}
