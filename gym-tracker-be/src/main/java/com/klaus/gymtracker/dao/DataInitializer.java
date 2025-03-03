package com.klaus.gymtracker.dao;

import com.klaus.gymtracker.entity.Exercise;
import com.klaus.gymtracker.dao.ExerciseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ExerciseRepository exerciseRepository;

    public DataInitializer(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Check if the database already has data
        if (exerciseRepository.count() == 0) {
            List<Exercise> exercises = Arrays.asList(
                    new Exercise(null, "Push Up", 10, 20f, "Standard push-up"),
                    new Exercise(null, "Pull Up", 8, 0f, "Wide grip pull-up"),
                    new Exercise(null, "Squat", 12, 40f, "Bodyweight squat"),
                    new Exercise(null, "Deadlift", 5, 60f, "Conventional deadlift"),
                    new Exercise(null, "Bench Press", 8, 50f, "Barbell bench press"),
                    new Exercise(null, "Bicep Curl", 12, 15f, "Dumbbell bicep curl"),
                    new Exercise(null, "Leg Press", 10, 100f, "Leg press machine"),
                    new Exercise(null, "Lunges", 10, 25f, "Walking lunges"),
                    new Exercise(null, "Shoulder Press", 8, 40f, "Dumbbell shoulder press"),
                    new Exercise(null, "Triceps Pushdown", 15, 25f, "Cable triceps pushdown"),
                    new Exercise(null, "Plank", 1, 0f, "Static plank"),
                    new Exercise(null, "Mountain Climber", 20, 0f, "Mountain climber exercise"),
                    new Exercise(null, "Russian Twist", 20, 0f, "Seated Russian twist"),
                    new Exercise(null, "Leg Raises", 15, 0f, "Lying leg raises"),
                    new Exercise(null, "Lat Pulldown", 10, 40f, "Machine lat pulldown"),
                    new Exercise(null, "Chest Fly", 12, 30f, "Machine chest fly"),
                    new Exercise(null, "Glute Bridge", 15, 0f, "Bodyweight glute bridge"),
                    new Exercise(null, "Kettlebell Swing", 20, 16f, "Kettlebell swing"),
                    new Exercise(null, "Farmer's Walk", 10, 40f, "Dumbbell farmer's walk"),
                    new Exercise(null, "Burpees", 10, 0f, "Bodyweight burpees")
            );

            // Save exercises to the database
            exerciseRepository.saveAll(exercises);
            System.out.println("Dummy data inserted!");
        }
    }
}
