package com.aicademy.backend.topics;

import lombok.Data;

@Data
public class topicRegisterDTO {
    topicEntity topic;
    String email;
    String subject;
}
