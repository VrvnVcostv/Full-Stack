package com.bruno.minecraftweb.backend.Service;

import com.bruno.minecraftweb.backend.Entities.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> getAllUsers();
    Optional<User> getUserById(String id);
    Optional<User> updateUser(String id, User user);
    User saveUser(User user);
    void deleteUserById(String id);
}
