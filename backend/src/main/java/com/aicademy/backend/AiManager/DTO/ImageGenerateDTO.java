package com.aicademy.backend.AiManager.DTO;

import lombok.Data;

@Data
public class ImageGenerateDTO {
    String email;
    String subject;
    String topic;
    String prompt;
}
