package com.aicademy.backend.fileManager.DTO;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class FirebaseUploadDTO {
    private String email;
    private String subject;
    private String topic;
    private String fileName;
    private MultipartFile file;
}
