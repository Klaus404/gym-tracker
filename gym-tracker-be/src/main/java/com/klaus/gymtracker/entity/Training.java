package com.klaus.gymtracker.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;
import java.util.List;

@Table(name = "training")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Schema(name = "Training", description = "Represents a workout session with multiple sets")
public class Training {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Schema(description = "Training ID", example = "1")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "exercise_name", nullable = false)
    @Schema(description = "Name of the exercise", example = "Bench Press")
    private String exerciseName;

    @Column(name = "workout_date", nullable = false)
    @Schema(description = "Date and time of the workout", example = "2026-04-30T10:30:00")
    private LocalDateTime workoutDate;

    @Column(name = "notes")
    @Schema(description = "Additional notes about the training session", example = "Good form today")
    private String notes;

    @OneToMany(mappedBy = "training", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Schema(description = "List of sets for this training")
    private List<Set> sets;

    @Column(name = "created_at", nullable = true, updatable = false)
    @Schema(description = "When the training record was created", example = "2026-04-30T10:30:00")
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

    public Training(User user, String exerciseName, LocalDateTime workoutDate) {
        this.user = user;
        this.exerciseName = exerciseName;
        this.workoutDate = workoutDate;
    }
}
