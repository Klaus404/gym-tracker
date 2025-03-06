package com.klaus.gymtracker.config.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.Base64;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

public class FirebaseTokenDecoder implements JwtDecoder {

    @Override
    public Jwt decode(String token) throws JwtException {
        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);

            // Convert Firebase token to Spring Security JWT
            return createJwt(token, decodedToken);

        } catch (FirebaseAuthException e) {
            throw new JwtException("Invalid Firebase token", e);
        } catch (Exception e) {
            throw new JwtException("Error processing Firebase token", e);
        }
    }

    private Jwt createJwt(String token, FirebaseToken firebaseToken) {
        // Get claims from FirebaseToken
        Map<String, Object> claims = firebaseToken.getClaims();

        // Extract timestamps from claims (values are in SECONDS)
        Long issuedAtSeconds = (Long) claims.get("iat");
        Long expiresAtSeconds = (Long) claims.get("exp");

        // Convert to Instant
        Instant issuedAt = Instant.ofEpochSecond(issuedAtSeconds);
        Instant expiresAt = Instant.ofEpochSecond(expiresAtSeconds);

        // Build Spring Security JWT
        return new Jwt(
                token,
                issuedAt,
                expiresAt,
                parseJwtHeaders(token),  // Get headers from token
                claims
        );
    }

    private Map<String, Object> parseJwtHeaders(String token) {
        try {
            // Manually parse JWT headers
            String[] parts = token.split("\\.");
            String headerJson = new String(Base64.getUrlDecoder().decode(parts[0]));
            return new ObjectMapper().readValue(headerJson, new TypeReference<>() {});
        } catch (Exception e) {
            return Map.of("alg", "RS256", "typ", "JWT");
        }
    }

    
}