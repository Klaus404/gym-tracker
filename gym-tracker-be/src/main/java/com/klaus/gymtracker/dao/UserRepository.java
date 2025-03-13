package com.klaus.gymtracker.dao;

import com.klaus.gymtracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findById(String userId);
    Optional<User> findByEmail(String email);
}
