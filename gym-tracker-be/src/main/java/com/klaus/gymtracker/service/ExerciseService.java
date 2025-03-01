package com.klaus.gymtracker.service;

import com.klaus.gymtracker.dao.ExerciseRepository;
import com.klaus.gymtracker.entity.Exercise;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseService {

    private final ExerciseRepository repository;

    ExerciseService(ExerciseRepository repository) {
        this.repository = repository;
    }

    public List<String> getExerciseNameList(){
        return repository
                .findAll()
                .stream()
                .map(Exercise::getExerciseName)
                .toList();
    }

    public void saveNewExercise(Exercise newExercise) {
        repository.save(newExercise);
    }

    public Exercise getExerciseByName(String exerciseName) {
        return repository.findByExerciseName(exerciseName);
    }
}
