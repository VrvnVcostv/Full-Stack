package com.bruno.minecraftweb.backend.auth.controller;

import com.bruno.minecraftweb.backend.auth.dto.LoginRequest;
import com.bruno.minecraftweb.backend.auth.dto.RegisterRequest;
import com.bruno.minecraftweb.backend.auth.dto.TokenResponse;
import com.bruno.minecraftweb.backend.auth.service.AuthService;
import com.bruno.minecraftweb.backend.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest request) {
        TokenResponse token = authService.login(request);
        return ResponseEntity.ok(token);
    }

    @PostMapping("/register")
    private ResponseEntity<TokenResponse> register(@RequestBody RegisterRequest request){
        TokenResponse token = authService.register(request);
        return ResponseEntity.ok(token);
    }

    @PostMapping("/refresh")
    private TokenResponse refreshToken(@RequestHeader(HttpHeaders.AUTHORIZATION)  String authHeader){
        return authService.refresh(authHeader);
    }

}
