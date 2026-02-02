package com.klaus.gymtracker.controller;

import com.klaus.gymtracker.entity.User;
import com.klaus.gymtracker.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@AuthenticationPrincipal OAuth2User principal) {
        try {
            String oktaId = principal.getAttribute("sub");
            Optional<User> user = userService.findByOktaId(oktaId);
            
            if (user.isPresent()) {
                return ResponseEntity.ok(user.get());
            } else {
                // Create user if doesn't exist
                User newUser = userService.createOrUpdateUser(principal);
                return ResponseEntity.ok(newUser);
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/sync")
    public ResponseEntity<?> syncUser(@AuthenticationPrincipal OAuth2User principal) {
        try {
            User user = userService.createOrUpdateUser(principal);
            return ResponseEntity.ok(Map.of(
                "message", "User synced successfully",
                "user", user
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
