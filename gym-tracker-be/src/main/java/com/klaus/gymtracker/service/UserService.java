package com.klaus.gymtracker.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.auth.UserRecord.CreateRequest;
import com.klaus.gymtracker.dao.UserRepository;
import com.klaus.gymtracker.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    UserRepository userRepository;

    UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserRecord createUser(String email, String password) {
        try {
            UserRecord.CreateRequest request = new UserRecord.CreateRequest()
                    .setEmail(email)
                    .setPassword(password);

            UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);
            System.out.println("Successfully created user: " + userRecord.getUid());
            return userRecord;
        } catch (Exception e) {
            System.err.println("Error creating Firebase user: " + e.getMessage());
            throw new RuntimeException("Firebase error: " + e.getMessage(), e);
        }
    }

    User createNewUser(String userId) {
        // Retrieve user details from Firebase
        try {
            UserRecord userRecord = FirebaseAuth.getInstance().getUser(userId);
            User newUser = new User(userRecord.getUid(), userRecord.getEmail(), List.of());
            return userRepository.save(newUser);
        } catch (FirebaseAuthException e) {
            throw new RuntimeException("Failed to fetch user from Firebase", e);
        }
    }

}
