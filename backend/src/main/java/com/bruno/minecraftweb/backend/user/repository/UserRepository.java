package com.bruno.minecraftweb.backend.user.repository;

import com.bruno.minecraftweb.backend.user.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
}
