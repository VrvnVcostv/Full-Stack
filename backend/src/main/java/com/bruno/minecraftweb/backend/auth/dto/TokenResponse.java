package com.bruno.minecraftweb.backend.auth.dto;

public record TokenResponse(
        String accessToken,
        String refreshToken
) {
}
