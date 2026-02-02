package com.klaus.gymtracker.service;

import com.klaus.gymtracker.dao.UserRepository;
import com.klaus.gymtracker.entity.User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    UserRepository userRepository;

    UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createOrUpdateUser(OAuth2User oauth2User) {
        String oktaId = oauth2User.getAttribute("sub");
        String email = oauth2User.getAttribute("email");
        String firstName = oauth2User.getAttribute("given_name");
        String lastName = oauth2User.getAttribute("family_name");

        Optional<User> existingUser = userRepository.findById(oktaId);
        
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setEmail(email);
            user.setFirstName(firstName);
            user.setLastName(lastName);
            return userRepository.save(user);
        } else {
            User newUser = new User(oktaId, email, firstName, lastName);
            return userRepository.save(newUser);
        }
    }

    public Optional<User> findByOktaId(String oktaId) {
        return userRepository.findById(oktaId);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findAll().stream()
                .filter(user -> user.getEmail().equals(email))
                .findFirst();
    }
}
