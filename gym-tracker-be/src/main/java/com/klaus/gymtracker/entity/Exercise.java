package com.klaus.gymtracker.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "exercise")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;

    @Column(name = "exercise_name")
    String exerciseName;

    @Column(name = "number_of_reps" )
    int numberOfReps;

    @Column(name = "weight")
    float weight;

    @Column(name = "mentions")
    String mentions;

    public Exercise(String exerciseName, int numberOfReps, float weight, String mentions) {
        this.exerciseName = exerciseName;
        this.numberOfReps = numberOfReps;
        this.weight = weight;
        this.mentions = mentions;
    }
}
