package com.bruno.minecraftweb.backend.Entities;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Users")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User {

    @Id
    private String id;
    private String photo;
    private String username;
    private String email;
    private String password;
}
