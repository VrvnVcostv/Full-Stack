package com.bruno.minecraftweb.backend.user.entities;


import com.bruno.minecraftweb.backend.auth.dto.TokenResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "Users")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class User {

    @Id
    private String id;
    private String photo;
    private String username;
    private String email;
    private String password;
}
