package com.aicademy.backend.fileManager.DTO;

import com.aicademy.backend.fileManager.models.topicEntity;
import lombok.Data;

@Data
public class topicRegisterDTO {
    String email;
    String subject;
    String level;
    topicEntity topic;
}
