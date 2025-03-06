package com.klaus.gymtracker.controller;

import com.google.firebase.auth.UserRecord;
import com.klaus.gymtracker.entity.UserSignupRequest;
import com.klaus.gymtracker.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserSignupRequest request) {
        try {
            UserRecord userRecord = userService.createUser(request.getEmail(), request.getPassword());
            return ResponseEntity.ok(userRecord);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

}
