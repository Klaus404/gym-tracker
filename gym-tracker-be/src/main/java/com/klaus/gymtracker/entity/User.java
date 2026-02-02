package com.klaus.gymtracker.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {

    @Id
    private String id; // Okta user ID (sub claim)

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Exercise> exercises;

    public User(String userId, String email, String firstName, String lastName) {
        this.id = userId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public User(String userId, String email) {
        this.id = userId;
        this.email = email;
    }
}
