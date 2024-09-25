package com.aicademy.backend.security.JWT;
import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

@Component
public class JWTDecoder {
    public static String getEmailFromJWT(String authorizationHeader) throws Exception {

        if (authorizationHeader == null) throw new Exception("authorization Header is null. Unable to decode JWT");

        String token = authorizationHeader.startsWith("Bearer ") ? authorizationHeader.substring(7) : authorizationHeader;

        try {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(JWTGenerator.key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        String userEmail = claims.getSubject(); // Assuming the user's email is stored in the "subject" claim
        return userEmail;
    } catch (JwtException e) {
        return "Invalid token";
    }
    }
}
