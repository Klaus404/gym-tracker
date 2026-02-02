package com.klaus.gymtracker.dao;

import com.klaus.gymtracker.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    Exercise findByExerciseName(String exerciseName);
    List<Exercise> findByUserId(String userId);
    Exercise findByExerciseNameAndUserId(String exerciseName, String userId);
}
