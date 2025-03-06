package com.klaus.gymtracker.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.auth.UserRecord.CreateRequest;
import org.springframework.stereotype.Service;

@Service
public class UserService {

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
}
