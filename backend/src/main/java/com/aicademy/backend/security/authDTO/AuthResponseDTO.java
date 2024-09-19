package com.aicademy.backend.security.authDTO;

import com.aicademy.backend.topics.UserTopicMap;
import lombok.Data;

@Data
public class AuthResponseDTO {
    private String accessToken;
    private String tokenType = "Bearer ";
    private UserTopicMap topics;

    public AuthResponseDTO(String accessToken, UserTopicMap topics) {
        this.accessToken = accessToken;
        this.topics= topics;
    }
}
