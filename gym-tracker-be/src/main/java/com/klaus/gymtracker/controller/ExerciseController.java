package com.klaus.gymtracker.controller;

import com.klaus.gymtracker.entity.Exercise;
import com.klaus.gymtracker.service.ExerciseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api")
@Tag(name = "Exercises", description = "Endpoints for managing exercise templates/definitions")
public class ExerciseController {
    private final ExerciseService service;

    ExerciseController(ExerciseService service) {
        this.service = service;
    }

    @GetMapping("/public/exercises")
    @Operation(summary = "Get all public exercise names", description = "Retrieves a list of all available exercise names (public, no authentication required)")
    @ApiResponse(responseCode = "200", description = "List of exercise names retrieved successfully")
    @Tag(name = "Public")
    List<String> listPublicExercises(){
        return service.getExerciseNameList();
    }

    @GetMapping("/exercises")
    @Operation(summary = "Get user's exercise library", description = "Retrieves all exercises in the authenticated user's exercise library")
    @ApiResponse(responseCode = "200", description = "User exercises retrieved successfully")
    @SecurityRequirement(name = "oauth2")
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
    @Operation(summary = "Get a specific exercise by name", description = "Retrieves a specific exercise from the user's library by exercise name")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Exercise found and retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Exercise not found")
    })
    @SecurityRequirement(name = "oauth2")
    ResponseEntity<?> getExercise(
            @Parameter(description = "Exercise name", example = "Bench Press")
            @PathVariable String exerciseName,
            @AuthenticationPrincipal OAuth2User principal){
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
    @Operation(summary = "Create a new exercise", description = "Creates a new exercise in the user's exercise library")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Exercise created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request")
    })
    @SecurityRequirement(name = "oauth2")
    ResponseEntity<?> createExercise(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Exercise details", required = true)
            @RequestBody Exercise newExercise,
            @AuthenticationPrincipal OAuth2User principal){
        try {
            service.saveNewExercise(principal, newExercise);
            return ResponseEntity.ok("Exercise created successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/exercise/{exerciseName}")
    @Operation(summary = "Update an existing exercise", description = "Updates the details of an existing exercise in the user's library")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Exercise updated successfully"),
            @ApiResponse(responseCode = "404", description = "Exercise not found"),
            @ApiResponse(responseCode = "400", description = "Invalid request")
    })
    @SecurityRequirement(name = "oauth2")
    ResponseEntity<?> updateExercise(
            @Parameter(description = "Exercise name", example = "Bench Press")
            @PathVariable String exerciseName,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Updated exercise details", required = true)
            @RequestBody Exercise updatedExercise,
            @AuthenticationPrincipal OAuth2User principal){
        try {
            String userId = principal.getAttribute("sub");
            Exercise exercise = service.getExerciseByNameForUser(exerciseName, userId);
            if (exercise != null) {
                if (updatedExercise.getExerciseName() != null) {
                    exercise.setExerciseName(updatedExercise.getExerciseName());
                }
                if (updatedExercise.getNumberOfReps() > 0) {
                    exercise.setNumberOfReps(updatedExercise.getNumberOfReps());
                }
                if (updatedExercise.getWeight() >= 0) {
                    exercise.setWeight(updatedExercise.getWeight());
                }
                if (updatedExercise.getMentions() != null) {
                    exercise.setMentions(updatedExercise.getMentions());
                }
                service.saveNewExercise(principal, exercise);
                return ResponseEntity.ok("Exercise updated successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/exercise/{exerciseName}")
    @Operation(summary = "Delete an exercise", description = "Removes an exercise from the user's exercise library")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Exercise deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Exercise not found"),
            @ApiResponse(responseCode = "400", description = "Invalid request")
    })
    @SecurityRequirement(name = "oauth2")
    ResponseEntity<?> deleteExercise(
            @Parameter(description = "Exercise name", example = "Bench Press")
            @PathVariable String exerciseName,
            @AuthenticationPrincipal OAuth2User principal){
        try {
            String userId = principal.getAttribute("sub");
            Exercise exercise = service.getExerciseByNameForUser(exerciseName, userId);
            if (exercise != null) {
                service.deleteExercise(exercise.getId());
                return ResponseEntity.ok("Exercise deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
