package com.bruno.minecraftweb.backend.auth.repository;

import com.bruno.minecraftweb.backend.auth.entities.Token;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TokenRepository extends MongoRepository<Token, String> {
    List<Token> findAllByUserId(String userId);
    List<Token> findByRevokedFalseAndExpiredFalseAndUserId(String userId);
}
