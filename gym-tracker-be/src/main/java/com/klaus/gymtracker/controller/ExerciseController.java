package com.klaus.gymtracker.controller;

import com.klaus.gymtracker.entity.Exercise;
import com.klaus.gymtracker.service.ExerciseService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api")
public class ExerciseController {
    private final ExerciseService service;

    ExerciseController(ExerciseService service) {
        this.service = service;
    }

    @GetMapping("/public/exercises")
    List<String> listPublicExercises(){
        return service.getExerciseNameList();
    }

    @GetMapping("/exercises")
    ResponseEntity<?> listUserExercises(@AuthenticationPrincipal OAuth2User principal){
        try {
            String userId = principal.getAttribute("sub");
            List<Exercise> exercises = service.getExercisesForUser(userId);
            return ResponseEntity.ok(exercises);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/exercise/{exerciseName}")
    ResponseEntity<?> getExercise(@PathVariable String exerciseName, @AuthenticationPrincipal OAuth2User principal){
        try {
            String userId = principal.getAttribute("sub");
            Exercise exercise = service.getExerciseByNameForUser(exerciseName, userId);
            if (exercise != null) {
                return ResponseEntity.ok(exercise);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/exercise")
    ResponseEntity<?> createExercise(@RequestBody Exercise newExercise, @AuthenticationPrincipal OAuth2User principal){
        try {
            service.saveNewExercise(principal, newExercise);
            return ResponseEntity.ok("Exercise created successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
