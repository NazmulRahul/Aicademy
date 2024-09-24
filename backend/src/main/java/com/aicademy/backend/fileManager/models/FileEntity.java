package com.aicademy.backend.fileManager.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileEntity {
    private String fileName;
    private String filePath;
}
