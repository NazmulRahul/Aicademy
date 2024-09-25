package com.aicademy.backend.fileManager.DTO;

import com.aicademy.backend.fileManager.models.FileEntity;
import lombok.Data;

@Data
public class DeleteReqDTO {
    private String email;
    private String subject;
    private String topic;
    private FileEntity file;
}
