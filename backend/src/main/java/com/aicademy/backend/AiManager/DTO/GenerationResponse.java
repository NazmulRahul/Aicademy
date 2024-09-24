package com.aicademy.backend.AiManager.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
public class GenerationResponse {
    private List<Data> data;

    @lombok.Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Data {
        private String url;
    }
}
