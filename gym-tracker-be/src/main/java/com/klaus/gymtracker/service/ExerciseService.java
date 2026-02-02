package com.klaus.gymtracker.service;

import com.klaus.gymtracker.dao.ExerciseRepository;
import com.klaus.gymtracker.dao.UserRepository;
import com.klaus.gymtracker.entity.Exercise;
import com.klaus.gymtracker.entity.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public void saveNewExercise(OAuth2User principal, Exercise exercise) {
        String oktaId = principal.getAttribute("sub");
        User user = userRepository.findById(oktaId)
                .orElseGet(() -> userService.createOrUpdateUser(principal));

        exercise.setUser(user);
        exerciseRepository.save(exercise);
    }

    public List<String> getExerciseNameListForUser(String userId) {
        return exerciseRepository.findByUserId(userId).stream()
                .map(Exercise::getExerciseName)
                .toList();
    }

    public Exercise getExerciseByNameForUser(String exerciseName, String userId) {
        return exerciseRepository.findByExerciseNameAndUserId(exerciseName, userId);
    }

    // Legacy methods for backward compatibility
    public List<String> getExerciseNameList() {
        return exerciseRepository.findAll().stream()
                .map(Exercise::getExerciseName)
                .toList();
    }

    public Exercise getExerciseByName(String exerciseName) {
        return exerciseRepository.findByExerciseName(exerciseName);
    }
}
