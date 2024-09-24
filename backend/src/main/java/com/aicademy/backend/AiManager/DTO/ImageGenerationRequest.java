package com.aicademy.backend.AiManager.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
@AllArgsConstructor
@Data
public class ImageGenerationRequest {
    private String model;
    private String prompt;
    private int n;
    private String size;
}
