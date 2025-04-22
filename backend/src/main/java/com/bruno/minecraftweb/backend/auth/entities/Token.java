package com.bruno.minecraftweb.backend.auth.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("Tokens")
public class Token {

    @Id
    private String id;
    private String userId;
    private String token;
    private TokenType tokenType= TokenType.BEARER;
    private boolean revoked;
    private boolean expired;
    private enum TokenType{
        BEARER
    }
}
