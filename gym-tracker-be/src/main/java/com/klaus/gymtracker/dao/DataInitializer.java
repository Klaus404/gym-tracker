package com.klaus.gymtracker.dao;

import com.klaus.gymtracker.entity.Exercise;
import com.klaus.gymtracker.entity.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import jakarta.transaction.Transactional;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ExerciseRepository exerciseRepository;
    private final UserRepository userRepository; // Assuming you have a UserRepository

    public DataInitializer(ExerciseRepository exerciseRepository, UserRepository userRepository) {
        this.exerciseRepository = exerciseRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // Ensure users exist
        User user1 = userRepository.findById("vPL9Qs1JY2No86EinIB0WRbO5zB2").orElseGet(() ->
                userRepository.save(new User("vPL9Qs1JY2No86EinIB0WRbO5zB2", "user1@example.com"))
        );

        User user2 = userRepository.findById("nkvMSY98LvRqrGnkQKhiLUTBvC22").orElseGet(() ->
                userRepository.save(new User("nkvMSY98LvRqrGnkQKhiLUTBvC22", "user2@example.com"))
        );

        User user3 = userRepository.findById("KLdXTyHwEcStek1FmSUSV9hH9DJ3").orElseGet(() ->
                userRepository.save(new User("KLdXTyHwEcStek1FmSUSV9hH9DJ3", "user3@example.com"))
        );

        // Check if exercises exist before inserting
        if (exerciseRepository.count() == 0) {
            List<Exercise> exercises = Arrays.asList(
                    new Exercise(null, "Push Up", 10, 20f, "Standard push-up", user1),
                    new Exercise(null, "Pull Up", 8, 0f, "Wide grip pull-up", user1),
                    new Exercise(null, "Squat", 12, 40f, "Bodyweight squat", user2),
                    new Exercise(null, "Deadlift", 5, 60f, "Conventional deadlift", user2),
                    new Exercise(null, "Bench Press", 8, 50f, "Barbell bench press", user1),
                    new Exercise(null, "Bicep Curl", 12, 15f, "Dumbbell bicep curl", user2),

                    // New exercises for the third user
                    new Exercise(null, "Lat Pulldown", 10, 45f, "Cable machine lat pulldown", user3),
                    new Exercise(null, "Lunges", 12, 25f, "Dumbbell lunges", user3),
                    new Exercise(null, "Overhead Press", 8, 30f, "Standing overhead barbell press", user3)
            );

            exerciseRepository.saveAll(exercises);
            System.out.println("Dummy data inserted!");
        }
    }

}
