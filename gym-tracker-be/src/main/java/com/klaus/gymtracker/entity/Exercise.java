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
}
