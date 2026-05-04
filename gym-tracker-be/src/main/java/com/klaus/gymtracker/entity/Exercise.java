package com.klaus.gymtracker.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@Table(name = "exercise")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Schema(name = "Exercise", description = "Exercise template/definition for a user's exercise library")
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Schema(description = "Exercise ID", example = "1")
    Long id;

    @Column(name = "exercise_name")
    @Schema(description = "Name of the exercise", example = "Bench Press")
    String exerciseName;

    @Column(name = "number_of_reps" )
    @Schema(description = "Default number of reps (optional)", example = "10")
    int numberOfReps;

    @Column(name = "weight")
    @Schema(description = "Default weight in kg or lbs (optional)", example = "80.0")
    float weight;

    @Column(name = "mentions")
    @Schema(description = "Notes or mentions about the exercise", example = "Full range of motion")
    String mentions;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    @Column(name = "created_at", nullable = true, updatable = false)
    @Schema(description = "When the exercise was created", example = "2026-04-30T10:30:00")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @Schema(description = "Last update time", example = "2026-04-30T10:30:00")
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Exercise(String exerciseName, int numberOfReps, float weight, String mentions) {
        this.exerciseName = exerciseName;
        this.numberOfReps = numberOfReps;
        this.weight = weight;
        this.mentions = mentions;
    }
}
