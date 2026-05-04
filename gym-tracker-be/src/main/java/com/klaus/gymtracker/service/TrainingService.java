package com.klaus.gymtracker.service;

import com.klaus.gymtracker.dao.TrainingRepository;
import com.klaus.gymtracker.entity.Training;
import com.klaus.gymtracker.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TrainingService {

    @Autowired
    private TrainingRepository trainingRepository;

    @Autowired
    private UserService userService;

    public List<Training> getTrainingsForUser(String userId) {
        return trainingRepository.findByUserId(userId);
    }

    public Optional<Training> getTrainingById(Long trainingId) {
        return trainingRepository.findById(trainingId);
    }

    public List<Training> getTrainingsByExercise(String userId, String exerciseName) {
        return trainingRepository.findByUserIdAndExerciseName(userId, exerciseName);
    }

    public List<Training> getTrainingsByDateRange(String userId, LocalDateTime startDate, LocalDateTime endDate) {
        return trainingRepository.findByUserIdAndDateRange(userId, startDate, endDate);
    }

    public List<String> getExerciseNamesForUser(String userId) {
        return trainingRepository.findDistinctExerciseNamesByUserId(userId);
    }

    public Training createTraining(String userId, Training training) {
        Optional<User> user = userService.findByOktaId(userId);
        if (user.isPresent()) {
            training.setUser(user.get());
            if (training.getWorkoutDate() == null) {
                training.setWorkoutDate(LocalDateTime.now());
            }
            return trainingRepository.save(training);
        }
        throw new IllegalArgumentException("User not found with ID: " + userId);
    }

    public Training updateTraining(Long trainingId, Training updatedTraining) {
        Optional<Training> existingTraining = trainingRepository.findById(trainingId);
        if (existingTraining.isPresent()) {
            Training training = existingTraining.get();
            if (updatedTraining.getExerciseName() != null) {
                training.setExerciseName(updatedTraining.getExerciseName());
            }
            if (updatedTraining.getWorkoutDate() != null) {
                training.setWorkoutDate(updatedTraining.getWorkoutDate());
            }
            if (updatedTraining.getNotes() != null) {
                training.setNotes(updatedTraining.getNotes());
            }
            return trainingRepository.save(training);
        }
        throw new IllegalArgumentException("Training not found with ID: " + trainingId);
    }

    public void deleteTraining(Long trainingId) {
        trainingRepository.deleteById(trainingId);
    }
}
