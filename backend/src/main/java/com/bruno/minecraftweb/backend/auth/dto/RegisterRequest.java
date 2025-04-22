package com.bruno.minecraftweb.backend.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RegisterRequest {
    private String id;
    private String photo;
    private String username;
    private String email;
    private String password;
}
