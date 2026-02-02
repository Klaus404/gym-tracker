package com.klaus.gymtracker.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping("/user")
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
    public Map<String, String> loginSuccess() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Login successful!");
        response.put("status", "authenticated");
        return response;
    }
}