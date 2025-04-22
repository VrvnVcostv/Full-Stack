package com.bruno.minecraftweb.backend.user.service;


import com.bruno.minecraftweb.backend.user.entities.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> getAllUsers();
    Optional<User> getUserById(String id);
    Optional<User> updateUser(String id, User user);
    User saveUser(User user);
    void deleteUserById(String id);
}
