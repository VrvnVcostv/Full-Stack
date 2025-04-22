package com.bruno.minecraftweb.backend.auth.service;


import com.bruno.minecraftweb.backend.user.entities.User;

public interface JwtService {
    String generateToken(final User user);
    String generateRefreshToken(final User user);
    String buildToken(final User user, long expiration);
    String extractUsername(String token);
    boolean isTokenValid(String refreshToken, User user);
}
