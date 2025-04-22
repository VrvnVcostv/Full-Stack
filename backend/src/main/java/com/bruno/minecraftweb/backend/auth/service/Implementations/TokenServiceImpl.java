package com.bruno.minecraftweb.backend.auth.service.Implementations;


import com.bruno.minecraftweb.backend.auth.entities.Token;
import com.bruno.minecraftweb.backend.auth.repository.TokenRepository;
import com.bruno.minecraftweb.backend.auth.service.TokenService;
import com.bruno.minecraftweb.backend.user.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TokenServiceImpl implements TokenService {

    @Autowired
    private TokenRepository tokenRepository;


    @Override
    public void saveToken(User user, String jwtToken) {
        Token token = new Token();
        token.setToken(jwtToken);
        token.setUserId(user.getId());
        token.setRevoked(false);
        token.setExpired(false);
        tokenRepository.save(token);
    }

    @Override
    public List<Token> getValidTokensByUser(String userId) {
        return tokenRepository.findByRevokedFalseAndExpiredFalseAndUserId(userId);
    }

    @Override
    public void revokeAllUserToken(String id) {
        List<Token> validTokens = tokenRepository.findAllByUserId(id);
        validTokens.forEach(token -> {
            token.setRevoked(true);
            token.setExpired(true);
        });
        tokenRepository.saveAll(validTokens);
    }
}
