package com.klaus.gymtracker.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "Endpoints for authentication and authorization")
public class AuthController {

    @GetMapping("/user")
    @Operation(summary = "Get authenticated user info", description = "Returns information about the currently authenticated user")
    @ApiResponse(responseCode = "200", description = "User information retrieved successfully")
    @SecurityRequirement(name = "oauth2")
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("email", principal.getAttribute("email"));
        userInfo.put("firstName", principal.getAttribute("given_name"));
        userInfo.put("lastName", principal.getAttribute("family_name"));
        userInfo.put("oktaId", principal.getAttribute("sub"));
        userInfo.put("name", principal.getAttribute("name"));
        return userInfo;
    }

    @GetMapping("/login-success")
    @Operation(summary = "Login success endpoint", description = "Confirms successful login")
    @ApiResponse(responseCode = "200", description = "Login was successful")
    public Map<String, String> loginSuccess() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Login successful!");
        response.put("status", "authenticated");
        return response;
    }
}
