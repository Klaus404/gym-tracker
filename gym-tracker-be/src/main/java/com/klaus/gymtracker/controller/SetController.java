package com.klaus.gymtracker.controller;

import com.klaus.gymtracker.entity.Set;
import com.klaus.gymtracker.service.SetService;
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
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sets")
@Tag(name = "Sets", description = "Endpoints for managing individual sets within training sessions")
@SecurityRequirement(name = "oauth2")
public class SetController {

    @Autowired
    private SetService setService;

    @GetMapping("/{setId}")
    @Operation(summary = "Get a specific set by ID", description = "Retrieves details of a single set")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Set found and retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Set not found")
    })
    public ResponseEntity<?> getSetById(
            @Parameter(description = "Set ID", example = "1")
            @PathVariable Long setId) {
        try {
            Optional<Set> set = setService.getSetById(setId);
            if (set.isPresent()) {
                return ResponseEntity.ok(set.get());
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/training/{trainingId}")
    @Operation(summary = "Get all sets for a training", description = "Retrieves all sets for a specific training session, ordered by set number")
    @ApiResponse(responseCode = "200", description = "Sets retrieved successfully")
    public ResponseEntity<?> getSetsByTraining(
            @Parameter(description = "Training ID", example = "1")
            @PathVariable Long trainingId) {
        try {
            List<Set> sets = setService.getSetsByTraining(trainingId);
            return ResponseEntity.ok(sets);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/training/{trainingId}")
    @Operation(summary = "Create a new set for a training", description = "Adds a new set to an existing training session")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Set created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request or training not found")
    })
    public ResponseEntity<?> createSet(
            @Parameter(description = "Training ID", example = "1")
            @PathVariable Long trainingId,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Set details (setNumber, weight, reps, notes)", required = true)
            @RequestBody Set set) {
        try {
            Set createdSet = setService.createSet(trainingId, set);
            return ResponseEntity.ok(createdSet);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/{setId}")
    @Operation(summary = "Update an existing set", description = "Updates weight, reps, set number, or notes for an existing set")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Set updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request or set not found")
    })
    public ResponseEntity<?> updateSet(
            @Parameter(description = "Set ID", example = "1")
            @PathVariable Long setId,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Updated set details", required = true)
            @RequestBody Set set) {
        try {
            Set updatedSet = setService.updateSet(setId, set);
            return ResponseEntity.ok(updatedSet);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{setId}")
    @Operation(summary = "Delete a set", description = "Removes a single set from a training session")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Set deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid set ID")
    })
    public ResponseEntity<?> deleteSet(
            @Parameter(description = "Set ID", example = "1")
            @PathVariable Long setId) {
        try {
            setService.deleteSet(setId);
            return ResponseEntity.ok("Set deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
