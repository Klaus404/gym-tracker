package com.klaus.gymtracker.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@Table(name = "set")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Schema(name = "Set", description = "Represents a single set within a training session")
public class Set {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Schema(description = "Set ID", example = "1")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "training_id", nullable = false)
    private Training training;

    @Column(name = "set_number", nullable = false)
    @Schema(description = "Set number in the training session", example = "1")
    private int setNumber;

    @Column(name = "weight")
    @Schema(description = "Weight used in this set (in kg or lbs)", example = "80.5")
    private float weight;

    @Column(name = "reps", nullable = false)
    @Schema(description = "Number of repetitions completed", example = "10")
    private int reps;

    @Column(name = "notes")
    @Schema(description = "Notes about this set", example = "Good form, felt strong")
    private String notes;

    @Column(name = "created_at", nullable = true, updatable = false)
    @Schema(description = "When the set record was created", example = "2026-04-30T10:30:00")
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    public Set(Training training, int setNumber, float weight, int reps) {
        this.training = training;
        this.setNumber = setNumber;
        this.weight = weight;
        this.reps = reps;
    }

    public Set(Training training, int setNumber, float weight, int reps, String notes) {
        this.training = training;
        this.setNumber = setNumber;
        this.weight = weight;
        this.reps = reps;
        this.notes = notes;
    }
}
