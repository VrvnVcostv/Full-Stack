package com.bruno.minecraftweb.backend.auth.service;


import com.bruno.minecraftweb.backend.auth.dto.LoginRequest;
import com.bruno.minecraftweb.backend.auth.dto.RegisterRequest;
import com.bruno.minecraftweb.backend.auth.dto.TokenResponse;

public interface AuthService {

    TokenResponse login(LoginRequest request);
    TokenResponse register(RegisterRequest request);
    TokenResponse refresh(String authHeader);
}
