package com.klaus.gymtracker.controller;

import com.klaus.gymtracker.entity.User;
import com.klaus.gymtracker.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@Tag(name = "Users", description = "Endpoints for user profile management")
@SecurityRequirement(name = "oauth2")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    @Operation(summary = "Get user profile", description = "Retrieves the authenticated user's profile. Creates user if doesn't exist.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User profile retrieved successfully"),
            @ApiResponse(responseCode = "400", description = "Error retrieving profile")
    })
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
    @Operation(summary = "Sync user data", description = "Synchronizes the authenticated user's data with the system. Updates or creates user record.")
    @ApiResponse(responseCode = "200", description = "User synced successfully")
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
