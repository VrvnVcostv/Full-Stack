package com.bruno.minecraftweb.backend.auth.service;

import com.bruno.minecraftweb.backend.auth.entities.Token;
import com.bruno.minecraftweb.backend.user.entities.User;
import org.springframework.stereotype.Service;

import java.util.List;

public interface TokenService {
    void saveToken(User user, String jwtToken);
    List<Token> getValidTokensByUser(String userId);
    void revokeAllUserToken(String id);
}
