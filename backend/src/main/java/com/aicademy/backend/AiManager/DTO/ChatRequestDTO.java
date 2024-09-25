package com.aicademy.backend.AiManager.DTO;

import lombok.Data;

import java.util.List;

@Data
public class ChatRequestDTO {
    List<String> history;
    private String prompt;
}
