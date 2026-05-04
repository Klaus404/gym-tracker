package com.klaus.gymtracker.controller;

import com.klaus.gymtracker.entity.Training;
import com.klaus.gymtracker.service.TrainingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/trainings")
@Tag(name = "Trainings", description = "Endpoints for managing training sessions")
@SecurityRequirement(name = "oauth2")
public class TrainingController {

    @Autowired
    private TrainingService trainingService;

    @GetMapping
    @Operation(summary = "Get all trainings for the authenticated user", description = "Retrieves all training sessions for the current user, sorted by date (newest first)")
    @ApiResponse(responseCode = "200", description = "List of trainings retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Training.class)))
    public ResponseEntity<?> getAllTrainings(Authentication authentication) {
        try {
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            String userId = oauth2User.getAttribute("sub");
            List<Training> trainings = trainingService.getTrainingsForUser(userId);
            return ResponseEntity.ok(trainings);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/{trainingId}")
    @Operation(summary = "Get a specific training by ID", description = "Retrieves details of a single training session")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Training found and retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Training not found")
    })
    public ResponseEntity<?> getTrainingById(
            @Parameter(description = "Training ID", example = "1")
            @PathVariable Long trainingId) {
        try {
            Optional<Training> training = trainingService.getTrainingById(trainingId);
            if (training.isPresent()) {
                return ResponseEntity.ok(training.get());
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/exercise/{exerciseName}")
    @Operation(summary = "Get training history for a specific exercise", description = "Retrieves all training sessions for a specific exercise for the current user")
    @ApiResponse(responseCode = "200", description = "Training history retrieved successfully")
    public ResponseEntity<?> getTrainingsByExercise(
            @Parameter(description = "Exercise name", example = "Bench Press")
            @PathVariable String exerciseName,
            Authentication authentication) {
        try {
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            String userId = oauth2User.getAttribute("sub");
            List<Training> trainings = trainingService.getTrainingsByExercise(userId, exerciseName);
            return ResponseEntity.ok(trainings);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/date-range")
    @Operation(summary = "Get trainings within a date range", description = "Retrieves training sessions between two dates for the current user")
    @ApiResponse(responseCode = "200", description = "Trainings retrieved successfully")
    public ResponseEntity<?> getTrainingsByDateRange(
            @Parameter(description = "Start date (ISO format)", example = "2026-04-01T00:00:00")
            @RequestParam LocalDateTime startDate,
            @Parameter(description = "End date (ISO format)", example = "2026-04-30T23:59:59")
            @RequestParam LocalDateTime endDate,
            Authentication authentication) {
        try {
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            String userId = oauth2User.getAttribute("sub");
            List<Training> trainings = trainingService.getTrainingsByDateRange(userId, startDate, endDate);
            return ResponseEntity.ok(trainings);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/exercises")
    @Operation(summary = "Get all exercise names from user's history", description = "Retrieves a list of unique exercise names trained by the current user")
    @ApiResponse(responseCode = "200", description = "Exercise names retrieved successfully")
    public ResponseEntity<?> getExerciseNames(Authentication authentication) {
        try {
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            String userId = oauth2User.getAttribute("sub");
            List<String> exercises = trainingService.getExerciseNamesForUser(userId);
            return ResponseEntity.ok(exercises);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping
    @Operation(summary = "Create a new training session", description = "Creates a new training session for the current user. Sets can be added separately.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Training created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request or user not found")
    })
    public ResponseEntity<?> createTraining(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Training details", required = true)
            @RequestBody Training training,
            Authentication authentication) {
        try {
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            String userId = oauth2User.getAttribute("sub");
            Training createdTraining = trainingService.createTraining(userId, training);
            return ResponseEntity.ok(createdTraining);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/{trainingId}")
    @Operation(summary = "Update an existing training", description = "Updates exercise name, workout date, or notes for an existing training")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Training updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request or training not found")
    })
    public ResponseEntity<?> updateTraining(
            @Parameter(description = "Training ID", example = "1")
            @PathVariable Long trainingId,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Updated training details", required = true)
            @RequestBody Training training) {
        try {
            Training updatedTraining = trainingService.updateTraining(trainingId, training);
            return ResponseEntity.ok(updatedTraining);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{trainingId}")
    @Operation(summary = "Delete a training session", description = "Deletes a training session and all its associated sets")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Training deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid training ID")
    })
    public ResponseEntity<?> deleteTraining(
            @Parameter(description = "Training ID", example = "1")
            @PathVariable Long trainingId) {
        try {
            trainingService.deleteTraining(trainingId);
            return ResponseEntity.ok("Training deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
