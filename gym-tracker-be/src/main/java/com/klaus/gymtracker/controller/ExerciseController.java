package com.klaus.gymtracker.controller;

import com.klaus.gymtracker.dao.ExerciseRepository;
import com.klaus.gymtracker.entity.Exercise;
import com.klaus.gymtracker.service.ExerciseService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api")
public class ExerciseController {
    private final ExerciseService service;

    ExerciseController(ExerciseService service) {
        this.service = service;
    }

    @GetMapping("/exercises")
    List<String> listExercises(){
        return service.getExerciseNameList();
    }

    @GetMapping("/exercise/{exerciseName}")
    Exercise getExercise(@PathVariable String exerciseName){
        return service.getExerciseByName(exerciseName);
    }

    @PostMapping("/exercise")
    void createExercise(Exercise newExercise){
        service.saveNewExercise(newExercise);
    }
}
