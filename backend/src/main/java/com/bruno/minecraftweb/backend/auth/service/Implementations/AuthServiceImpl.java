package com.bruno.minecraftweb.backend.auth.service.Implementations;

import com.bruno.minecraftweb.backend.auth.dto.LoginRequest;
import com.bruno.minecraftweb.backend.auth.dto.RegisterRequest;
import com.bruno.minecraftweb.backend.auth.dto.TokenResponse;
import com.bruno.minecraftweb.backend.auth.service.AuthService;
import com.bruno.minecraftweb.backend.auth.service.JwtService;
import com.bruno.minecraftweb.backend.auth.service.TokenService;
import com.bruno.minecraftweb.backend.user.entities.User;
import com.bruno.minecraftweb.backend.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestHeader;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public TokenResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        tokenService.revokeAllUserToken(user.getId());
        tokenService.saveToken(user, jwtToken);
        return new TokenResponse(jwtToken, refreshToken);
    }

    @Override
    public TokenResponse register(RegisterRequest request) {
        User user = User.builder()
                .id(request.getId())
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .photo(request.getPhoto())
                .build();
        User saved = userRepository.save(user);
        String jwtToken = jwtService.generateToken(saved);
        String refreshToken = jwtService.generateRefreshToken(saved);
        tokenService.saveToken(saved, jwtToken);
        return new TokenResponse( jwtToken, refreshToken);
    }

    @Override
    public TokenResponse refresh(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")){
            System.out.println("Invalid Bearer");
        }
        String refreshToken = authHeader.substring(7);
        String email = jwtService.extractUsername(refreshToken);
        if (email == null){
            System.out.println("Invalid Refresh token");
        }
        User user = userRepository.findByEmail(email)
                .orElseThrow();
        if(!jwtService.isTokenValid(refreshToken, user)){
            System.out.println("Invalid Refresh token");
        }
        String accessToken = jwtService.generateToken(user);
        tokenService.revokeAllUserToken(user.getId());
        tokenService.saveToken(user, accessToken);
        return new TokenResponse(accessToken, refreshToken);
    }
}
