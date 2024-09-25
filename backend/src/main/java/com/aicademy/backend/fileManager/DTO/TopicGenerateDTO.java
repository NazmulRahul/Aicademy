package com.aicademy.backend.fileManager.DTO;

import lombok.Data;

@Data
public class TopicGenerateDTO {
    private String email;
    private String subject;
    private String topic;
    private String level;
    private String instruction;
}
