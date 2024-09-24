package com.aicademy.backend.AiManager.Controller;

import com.aicademy.backend.AiManager.DTO.ImageToTextResponseDTO;
import com.aicademy.backend.AiManager.Service.ImageToTextService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping("/public/image")
public class ImageToTextController {

    @Autowired
    ImageToTextService imageToTextService;

    @PostMapping("/upload")
    public ResponseEntity<ImageToTextResponseDTO> uploadFile(@RequestParam("image") MultipartFile file) throws IOException {
        System.out.println("image to text api called");

        return ResponseEntity.ok().body(
                ImageToTextResponseDTO.builder().text(imageToTextService.extractImage(file)).build());
    }

}
