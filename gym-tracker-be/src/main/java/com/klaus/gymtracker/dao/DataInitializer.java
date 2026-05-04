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
            Exercise ex1 = new Exercise("Push Up", 10, 20f, "Standard push-up");
            ex1.setUser(user1);
            
            Exercise ex2 = new Exercise("Pull Up", 8, 0f, "Wide grip pull-up");
            ex2.setUser(user1);
            
            Exercise ex3 = new Exercise("Squat", 12, 40f, "Bodyweight squat");
            ex3.setUser(user2);
            
            Exercise ex4 = new Exercise("Deadlift", 5, 60f, "Conventional deadlift");
            ex4.setUser(user2);
            
            Exercise ex5 = new Exercise("Bench Press", 8, 50f, "Barbell bench press");
            ex5.setUser(user1);
            
            Exercise ex6 = new Exercise("Bicep Curl", 12, 15f, "Dumbbell bicep curl");
            ex6.setUser(user2);
            
            Exercise ex7 = new Exercise("Lat Pulldown", 10, 45f, "Cable machine lat pulldown");
            ex7.setUser(user3);
            
            Exercise ex8 = new Exercise("Lunges", 12, 25f, "Dumbbell lunges");
            ex8.setUser(user3);
            
            Exercise ex9 = new Exercise("Overhead Press", 8, 30f, "Standing overhead barbell press");
            ex9.setUser(user3);
            
            List<Exercise> exercises = Arrays.asList(ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8, ex9);
            exerciseRepository.saveAll(exercises);
            System.out.println("Dummy data inserted!");
        }
    }

}
