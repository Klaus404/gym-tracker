package com.klaus.gymtracker.dao;

import com.klaus.gymtracker.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    Exercise findByExerciseName(String exerciseName);
}
