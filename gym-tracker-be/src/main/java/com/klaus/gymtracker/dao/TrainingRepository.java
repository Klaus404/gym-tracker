package com.klaus.gymtracker.dao;

import com.klaus.gymtracker.entity.Training;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TrainingRepository extends JpaRepository<Training, Long> {

    @Query("SELECT t FROM Training t WHERE t.user.id = :userId ORDER BY t.workoutDate DESC")
    List<Training> findByUserId(@Param("userId") String userId);

    @Query("SELECT t FROM Training t WHERE t.user.id = :userId AND t.exerciseName = :exerciseName ORDER BY t.workoutDate DESC")
    List<Training> findByUserIdAndExerciseName(@Param("userId") String userId, @Param("exerciseName") String exerciseName);

    @Query("SELECT t FROM Training t WHERE t.user.id = :userId AND t.workoutDate BETWEEN :startDate AND :endDate ORDER BY t.workoutDate DESC")
    List<Training> findByUserIdAndDateRange(@Param("userId") String userId, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    @Query("SELECT DISTINCT t.exerciseName FROM Training t WHERE t.user.id = :userId ORDER BY t.exerciseName")
    List<String> findDistinctExerciseNamesByUserId(@Param("userId") String userId);
}
