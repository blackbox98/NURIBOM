package com.autonomous.nuribom.common.config.security.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtUtil {
    @Value("${token.secret}")
    private String SecretKey;

    @Value("${token.expiration_time}")
    private long expirationTime;

    public String createToken(Long workerId) {
        Date now = new Date();
        String id = String.valueOf(workerId);
        return Jwts.builder()
                .setSubject(id)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + expirationTime))
                .signWith(SignatureAlgorithm.HS256, SecretKey)
                .compact();
    }

    public String getSubject(String jwtToken) {
        return Jwts.parser().setSigningKey(SecretKey).parseClaimsJws(jwtToken).getBody().getSubject();
    }

    public boolean isValidToken(String jwtToken) {
        try {
            Jwts.parser().setSigningKey(SecretKey).parseClaimsJws(jwtToken);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
