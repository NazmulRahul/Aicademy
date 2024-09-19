package com.aicademy.backend.security.authDTO;

import lombok.Data;

@Data
public class RegisterDto {
    private String email;
    private String password;
}
