package com.klaus.gymtracker.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.klaus.gymtracker.dao.ExerciseRepository;
import com.klaus.gymtracker.dao.UserRepository;
import com.klaus.gymtracker.entity.Exercise;
import com.klaus.gymtracker.entity.User;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseService {
    private final ExerciseRepository exerciseRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public ExerciseService(ExerciseRepository exerciseRepository, UserRepository userRepository, UserService userService) {
        this.exerciseRepository = exerciseRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    public List<Exercise> getExercisesForUser(String userId) {
        return exerciseRepository.findByUserId(userId);
    }

    public void saveNewExercise(String userId, Exercise exercise) {
        User user = userRepository.findById(userId)
                .orElseGet(() -> userService.createNewUser(userId)); // Create user if not exists

        exercise.setUser(user);
        exerciseRepository.save(exercise);
    }


    public Exercise getExerciseByName(String exerciseName) {
        return exerciseRepository.findByExerciseName(exerciseName);
    }
}
